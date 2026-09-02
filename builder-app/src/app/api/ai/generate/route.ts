import { NextRequest, NextResponse } from 'next/server';
import {
  generateBlockCopy,
  generateFullSiteCopy,
  auditAirwallexCompliance,
  getOpenRouterApiKey,
  isOpenRouterConfigured,
  DEFAULT_OPENROUTER_MODEL,
} from '@/lib/openrouter';
import { BusinessDetails } from '@/types/builder';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface AiGenerateRequestBody {
  action: 'rewrite-block' | 'generate-site' | 'audit-compliance';
  apiKey?: string;
  model?: string;
  tone?: string;
  business?: Partial<BusinessDetails>;
  // For rewrite-block
  sectionType?: string;
  currentContent?: any;
  // For generate-site
  prompt?: string;
  industry?: string;
  legalName?: string;
  jurisdiction?: string;
  // For audit-compliance
  textContent?: string;
  currency?: string;
}

export async function POST(request: NextRequest) {
  let body: AiGenerateRequestBody;

  try {
    body = await request.json();
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid JSON request payload',
        details: err?.message,
      },
      { status: 400 }
    );
  }

  const {
    action,
    apiKey,
    model = DEFAULT_OPENROUTER_MODEL,
    tone = 'Enterprise Corporate',
    business = {},
    sectionType = 'hero',
    currentContent,
    prompt = '',
    industry = 'Software Development & Cloud Consulting',
    legalName,
    jurisdiction = 'Republic of Singapore',
    textContent = '',
    currency = business.currency || 'USD',
  } = body;

  const resolvedApiKey = getOpenRouterApiKey(apiKey);
  const isKeyPresent = !!resolvedApiKey;

  try {
    switch (action) {
      case 'rewrite-block': {
        const result = await generateBlockCopy({
          sectionType,
          business,
          tone,
          currentContent,
          apiKey: resolvedApiKey,
          model,
        });

        return NextResponse.json({
          success: true,
          action: 'rewrite-block',
          isFallback: !isKeyPresent,
          model: isKeyPresent ? model : 'preset-fallback-v1',
          data: result.data,
          summary: result.markdownSummary,
        });
      }

      case 'generate-site': {
        const effectiveLegalName =
          legalName || business.companyName || 'Vantage Cloud Systems Ltd';
        const effectiveJurisdiction =
          jurisdiction || business.governingLaw || 'Republic of Singapore';

        const result = await generateFullSiteCopy({
          prompt,
          industry,
          legalName: effectiveLegalName,
          jurisdiction: effectiveJurisdiction,
          business,
          tone,
          apiKey: resolvedApiKey,
          model,
        });

        return NextResponse.json({
          success: true,
          action: 'generate-site',
          isFallback: !isKeyPresent,
          model: isKeyPresent ? model : 'preset-fallback-v1',
          data: result,
        });
      }

      case 'audit-compliance': {
        const effectiveJurisdiction =
          jurisdiction || business.governingLaw || 'Republic of Singapore';

        const result = await auditAirwallexCompliance({
          textContent,
          jurisdiction: effectiveJurisdiction,
          currency,
          business,
          apiKey: resolvedApiKey,
          model,
        });

        return NextResponse.json({
          success: true,
          action: 'audit-compliance',
          isFallback: !isKeyPresent,
          model: isKeyPresent ? model : 'compliance-engine-v2',
          data: result,
        });
      }

      default: {
        return NextResponse.json(
          {
            success: false,
            error: `Unsupported action: "${action}". Supported actions: 'rewrite-block', 'generate-site', 'audit-compliance'.`,
          },
          { status: 400 }
        );
      }
    }
  } catch (error: any) {
    console.error('[API /api/ai/generate] Unexpected execution error:', error);

    // Provide emergency graceful fallback so front-end never crashes
    let emergencyData: any = {};
    if (action === 'audit-compliance') {
      emergencyData = await auditAirwallexCompliance({
        textContent,
        jurisdiction,
        currency,
        business,
      });
    } else if (action === 'generate-site') {
      emergencyData = await generateFullSiteCopy({
        prompt,
        industry,
        legalName,
        jurisdiction,
        business,
        tone,
      });
    } else {
      emergencyData = (
        await generateBlockCopy({
          sectionType,
          business,
          tone,
          currentContent,
        })
      ).data;
    }

    return NextResponse.json({
      success: true,
      action,
      isFallback: true,
      warning: 'Executed in safe offline fallback mode due to upstream connection interruption.',
      data: emergencyData,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    endpoint: '/api/ai/generate',
    openRouterConfigured: isOpenRouterConfigured(),
    supportedActions: ['rewrite-block', 'generate-site', 'audit-compliance'],
    defaultModel: DEFAULT_OPENROUTER_MODEL,
  });
}
