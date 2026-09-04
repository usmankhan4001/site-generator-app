import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { getProject, updateProject } from '@/lib/studio/projects';
import { dokploy } from '@/lib/dokploy';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const domain = project.customDomain || project.domain;
  if (!domain) {
    return NextResponse.json({
      configured: false,
      isLive: false,
      message: 'No custom domain configured for this project.',
    });
  }

  const cleanDomain = domain
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .trim()
    .toLowerCase();

  try {
    // 1. Check DNS propagation
    const dnsResult = await dokploy.checkDnsReadiness({ domain: cleanDomain });

    // 2. If DNS is configured or resolving, check live HTTP/HTTPS status
    let liveResult: { verified: boolean; allOk: boolean; verifiedRoutes: Record<string, any> } = {
      verified: false,
      allOk: false,
      verifiedRoutes: {},
    };

    if (dnsResult.resolvedValues.length > 0) {
      try {
        liveResult = await dokploy.verifyLiveEndpoint({
          domain: cleanDomain,
          routes: ['/', '/about', '/contact'],
          maxRetries: 2,
          timeoutMs: 4000,
        });
      } catch {
        // Non-blocking probe failure
      }
    }

    return NextResponse.json({
      success: true,
      domain: cleanDomain,
      dns: dnsResult,
      live: {
        isLive: liveResult.verified,
        allOk: liveResult.allOk,
        routes: liveResult.verifiedRoutes,
      },
      status: liveResult.verified ? 'live' : dnsResult.configured ? 'ready_to_provision' : 'pending_dns',
    });
  } catch (err: unknown) {
    console.error('[domain:verify] Error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Domain verification check failed',
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  let body: { domain?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const rawDomain = body.domain?.trim() || null;
  const cleanDomain = rawDomain
    ? rawDomain
        .replace(/^https?:\/\//i, '')
        .replace(/\/.*$/, '')
        .trim()
        .toLowerCase()
    : null;

  try {
    const updated = await updateProject(
      id,
      {
        customDomain: cleanDomain,
        domainStatus: cleanDomain ? 'pending_dns' : null,
      },
      actor,
    );

    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({
      success: true,
      project: updated,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update domain' },
      { status: 500 },
    );
  }
}