// Auto-generated Untitled UI Bento Feature Grid Registry (60 components)
'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Copy, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Layers, 
  Activity, 
  Cpu, 
  BarChart3, 
  Lock, 
  Sparkles, 
  ArrowUpRight,
  Database,
  Code2
} from 'lucide-react';
import { BentoBlockProps, PuckComponentConfig } from '../types';

export interface BentoProps extends BentoBlockProps {
  className?: string;
}

const DEFAULT_CARDS = [
  {
    title: 'High-Throughput Global Treasury',
    description: 'Direct programmatic connectivity into 180+ countries with automated multi-currency FX conversions and sub-minute settlement speeds.',
    badge: 'Core Engine',
    colSpan: 2,
    statValue: '$50B+',
    statLabel: 'Annualized Processing Volume'
  },
  {
    title: 'Bank-Grade Automated KYC',
    description: 'Zero-friction identity verification, automated sanctions registry scanning, and enterprise KYB underwriting out of the box.',
    badge: 'Compliance',
    colSpan: 1,
    statValue: '99.8%',
    statLabel: 'Pass Rate SLA'
  },
  {
    title: 'Developer SDK & Webhooks',
    description: 'Robust TypeScript, Go, and Python libraries with cryptographically signed webhook delivery and full sandbox telemetry.',
    badge: 'Developer First',
    colSpan: 1,
    codeSnippet: `// Listen to verified webhook
webhook.on('payout.completed', async (event) => {
  await ledger.credit(event.accountId, event.amount);
});`
  },
  {
    title: 'Isolated Cloud Deployments',
    description: 'One-click Dokploy container management orchestrating staging, production, and automated SSL certificate renewals.',
    badge: 'Infrastructure',
    colSpan: 2,
    statValue: '12ms',
    statLabel: 'Global Edge Latency'
  }
];

export function BaseBentoRenderer({
  variant = 'asymmetric-2col',
  badge = 'COMPREHENSIVE PLATFORM',
  headline = 'Engineered for modern financial scale',
  accentText = 'financial scale',
  description = 'Everything your technical team and finance operations require to execute, monitor, and scale international commerce without technical bottlenecks.',
  cards = DEFAULT_CARDS,
  className = ''
}: BentoProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const isAsym = variant.startsWith('asymmetric-2col');
  const is3x3 = variant.startsWith('3x3-grids');
  const isTabs = variant.startsWith('interactive-tabs');
  const isMetric = variant.startsWith('metric-highlight');
  const isCode = variant.startsWith('code-window');

  const handleCopy = (snippet: string, idx: number) => {
    navigator.clipboard?.writeText(snippet);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const tabsList = ['Global Treasury', 'Developer APIs', 'Automated KYC', 'Cloud PaaS'];

  return (
    <section className={`py-16 sm:py-24 bg-background relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {badge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-3">
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            {headline.replace(accentText, '')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">
              {accentText}
            </span>
          </h2>
          {description && (
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}

          {/* Interactive Tabs Header */}
          {isTabs && (
            <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-muted/60 rounded-xl max-w-fit mx-auto border border-border">
              {tabsList.map((tab, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    activeTab === idx
                      ? 'bg-card text-foreground shadow-xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 1. ASYMMETRIC 2-COLUMN BENTO GRID */}
        {isAsym && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dominant 2-col left card */}
            <div className="lg:col-span-2 p-8 rounded-3xl bg-card border border-border/80 shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                    {cards[0]?.badge || 'Enterprise Grade'}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {cards[0]?.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {cards[0]?.description}
                </p>
              </div>

              {cards[0]?.statValue && (
                <div className="mt-8 pt-6 border-t border-border/60 flex items-baseline gap-4">
                  <span className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                    {cards[0]?.statValue}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {cards[0]?.statLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Stacked 1-col right cards */}
            <div className="space-y-6">
              {cards.slice(1, 3).map((card, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-card border border-border/80 shadow-md hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {card.badge || 'Capability'}
                    </span>
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground">{card.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                  {card.statValue && (
                    <div className="mt-4 pt-3 border-t border-border/40 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">{card.statValue}</span>
                      <span className="text-[11px] text-muted-foreground">{card.statLabel}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. 3x3 FEATURE MATRIX */}
        {is3x3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...cards, ...cards].slice(0, 9).map((card, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-3xl bg-card border transition-all hover:shadow-md ${
                  idx === 4 ? 'border-primary/60 shadow-lg bg-card/90 ring-1 ring-primary/20' : 'border-border/80 hover:border-border'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-foreground">{card.title}</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-primary">{card.badge || 'Verified'}</span>
                  <span className="text-[10px] text-muted-foreground">Active SLA</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. CODE WINDOW PREVIEW BENTO */}
        {(isCode || variant.includes('Code')) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-card border border-border">
                <span className="text-xs font-bold uppercase text-primary tracking-wider">Developer SDK</span>
                <h3 className="text-xl font-bold text-foreground mt-2">Zero-Config API Integration</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Call our cryptographic multi-currency settlement endpoints using native TypeScript bindings or direct HTTP REST.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-card border border-border">
                <span className="text-xs font-bold uppercase text-emerald-500 tracking-wider">Sub-second Webhooks</span>
                <h3 className="text-xl font-bold text-foreground mt-2">Real-time Event Streaming</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Every transaction triggers an HMAC-SHA256 verified event payload with automatic exponential backoff retries.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
                <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-slate-400 text-xs ml-2">checkout-session.ts</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(cards[2]?.codeSnippet || '// Code', 99)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    {copiedIndex === 99 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === 99 ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-6 text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{cards[2]?.codeSnippet || `// Production Ready
const session = await airwallex.sessions.create({
  amount: 49900,
  currency: 'USD',
  merchantOrderReference: 'ORD-98214'
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* 4. METRIC HIGHLIGHT BENTO */}
        {isMetric && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: '$50B+', lbl: 'Annual Volume Processed', sub: 'Verified across 180 countries' },
              { val: '99.999%', lbl: 'Zero Downtime SLA', sub: 'Audited high-availability cluster' },
              { val: '<15s', lbl: 'Average Settlement Speed', sub: 'Real-time SEPA & FedNow rails' },
              { val: '12,000+', lbl: 'Active Global Merchants', sub: 'Growing 40% quarter over quarter' }
            ].map((m, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm text-center">
                <p className="text-4xl font-extrabold text-foreground tracking-tight">{m.val}</p>
                <p className="text-sm font-semibold text-foreground mt-2">{m.lbl}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export const bentoPuckConfig: PuckComponentConfig<BentoProps> = {
  label: 'Bento Feature Grid Block',
  defaultProps: {
    badge: 'COMPREHENSIVE PLATFORM',
    headline: 'Engineered for modern financial scale',
    accentText: 'financial scale',
    description: 'Everything your technical team and finance operations require to execute, monitor, and scale international commerce.',
    cards: DEFAULT_CARDS
  },
  fields: {
    badge: { type: 'text', label: 'Badge Text' },
    headline: { type: 'text', label: 'Headline' },
    accentText: { type: 'text', label: 'Accent Text' },
    description: { type: 'textarea', label: 'Description' }
  },
  render: (props) => <BaseBentoRenderer {...props} />
};

// Bento Asym Large Left Hero Card (asymmetric-2col)
export function BentoAsymLargeLeft(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Large Left Hero Card"
      {...props}
    />
  );
}

export const BentoAsymLargeLeftConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Large Left Hero Card',
  render: (props) => <BentoAsymLargeLeft {...props} />
};

// Bento Asym Large Right Feature (asymmetric-2col)
export function BentoAsymLargeRight(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Large Right Feature"
      {...props}
    />
  );
}

export const BentoAsymLargeRightConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Large Right Feature',
  render: (props) => <BentoAsymLargeRight {...props} />
};

// Bento Asym Diagonal Flow (asymmetric-2col)
export function BentoAsymSplitDiagonal(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Diagonal Flow"
      {...props}
    />
  );
}

export const BentoAsymSplitDiagonalConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Diagonal Flow',
  render: (props) => <BentoAsymSplitDiagonal {...props} />
};

// Bento Asym Hero Metric Left (asymmetric-2col)
export function BentoAsymStatHighlight(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Hero Metric Left"
      {...props}
    />
  );
}

export const BentoAsymStatHighlightConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Hero Metric Left',
  render: (props) => <BentoAsymStatHighlight {...props} />
};

// Bento Asym Overhanging Asset (asymmetric-2col)
export function BentoAsymCardOverhang(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Overhanging Asset"
      {...props}
    />
  );
}

export const BentoAsymCardOverhangConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Overhanging Asset',
  render: (props) => <BentoAsymCardOverhang {...props} />
};

// Bento Asym Multi-Currency Flow (asymmetric-2col)
export function BentoAsymFintechFlow(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Multi-Currency Flow"
      {...props}
    />
  );
}

export const BentoAsymFintechFlowConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Multi-Currency Flow',
  render: (props) => <BentoAsymFintechFlow {...props} />
};

// Bento Asym Webhook Debugger (asymmetric-2col)
export function BentoAsymDeveloperSplit(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Webhook Debugger"
      {...props}
    />
  );
}

export const BentoAsymDeveloperSplitConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Webhook Debugger',
  render: (props) => <BentoAsymDeveloperSplit {...props} />
};

// Bento Asym Zero-Knowledge Vault (asymmetric-2col)
export function BentoAsymSecurityVault(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Zero-Knowledge Vault"
      {...props}
    />
  );
}

export const BentoAsymSecurityVaultConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Zero-Knowledge Vault',
  render: (props) => <BentoAsymSecurityVault {...props} />
};

// Bento Asym Conversion Funnel (asymmetric-2col)
export function BentoAsymAnalyticsSplit(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Conversion Funnel"
      {...props}
    />
  );
}

export const BentoAsymAnalyticsSplitConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Conversion Funnel',
  render: (props) => <BentoAsymAnalyticsSplit {...props} />
};

// Bento Asym Multi-Tenant Access (asymmetric-2col)
export function BentoAsymTeamCollab(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Multi-Tenant Access"
      {...props}
    />
  );
}

export const BentoAsymTeamCollabConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Multi-Tenant Access',
  render: (props) => <BentoAsymTeamCollab {...props} />
};

// Bento Asym Global Edge Routing (asymmetric-2col)
export function BentoAsymSpeedLatency(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Global Edge Routing"
      {...props}
    />
  );
}

export const BentoAsymSpeedLatencyConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Global Edge Routing',
  render: (props) => <BentoAsymSpeedLatency {...props} />
};

// Bento Asym Smart Stock Sync (asymmetric-2col)
export function BentoAsymEcomInventory(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Smart Stock Sync"
      {...props}
    />
  );
}

export const BentoAsymEcomInventoryConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Smart Stock Sync',
  render: (props) => <BentoAsymEcomInventory {...props} />
};

// Bento Asym No-Code Workflow (asymmetric-2col)
export function BentoAsymAutomationRules(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym No-Code Workflow"
      {...props}
    />
  );
}

export const BentoAsymAutomationRulesConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym No-Code Workflow',
  render: (props) => <BentoAsymAutomationRules {...props} />
};

// Bento Asym Automated Billing (asymmetric-2col)
export function BentoAsymInvoiceEngine(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Automated Billing"
      {...props}
    />
  );
}

export const BentoAsymInvoiceEngineConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Automated Billing',
  render: (props) => <BentoAsymInvoiceEngine {...props} />
};

// Bento Asym Automated KYC/KYB (asymmetric-2col)
export function BentoAsymComplianceShield(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="asymmetric-2col"
      headline="Asym Automated KYC/KYB"
      {...props}
    />
  );
}

export const BentoAsymComplianceShieldConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Asym Automated KYC/KYB',
  render: (props) => <BentoAsymComplianceShield {...props} />
};

// Bento 3x3 Universal Grid (3x3-grids)
export function Bento3x3Classic(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Universal Grid"
      {...props}
    />
  );
}

export const Bento3x3ClassicConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Universal Grid',
  render: (props) => <Bento3x3Classic {...props} />
};

// Bento 3x3 Center Anchor Card (3x3-grids)
export function Bento3x3CenterHighlight(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Center Anchor Card"
      {...props}
    />
  );
}

export const Bento3x3CenterHighlightConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Center Anchor Card',
  render: (props) => <Bento3x3CenterHighlight {...props} />
};

// Bento 3x3 Top Banner Span (3x3-grids)
export function Bento3x3TopSpan(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Top Banner Span"
      {...props}
    />
  );
}

export const Bento3x3TopSpanConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Top Banner Span',
  render: (props) => <Bento3x3TopSpan {...props} />
};

// Bento 3x3 Bottom Summary Span (3x3-grids)
export function Bento3x3BottomSpan(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Bottom Summary Span"
      {...props}
    />
  );
}

export const Bento3x3BottomSpanConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Bottom Summary Span',
  render: (props) => <Bento3x3BottomSpan {...props} />
};

// Bento 3x3 Mosaic Irregular (3x3-grids)
export function Bento3x3Mosaic(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Mosaic Irregular"
      {...props}
    />
  );
}

export const Bento3x3MosaicConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Mosaic Irregular',
  render: (props) => <Bento3x3Mosaic {...props} />
};

// Bento 3x3 High-Contrast Slate (3x3-grids)
export function Bento3x3DarkCyber(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 High-Contrast Slate"
      {...props}
    />
  );
}

export const Bento3x3DarkCyberConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 High-Contrast Slate',
  render: (props) => <Bento3x3DarkCyber {...props} />
};

// Bento 3x3 Performance KPI Board (3x3-grids)
export function Bento3x3MetricsGrid(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Performance KPI Board"
      {...props}
    />
  );
}

export const Bento3x3MetricsGridConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Performance KPI Board',
  render: (props) => <Bento3x3MetricsGrid {...props} />
};

// Bento 3x3 Ecosystem Stack (3x3-grids)
export function Bento3x3Integrations(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Ecosystem Stack"
      {...props}
    />
  );
}

export const Bento3x3IntegrationsConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Ecosystem Stack',
  render: (props) => <Bento3x3Integrations {...props} />
};

// Bento 3x3 Defense in Depth (3x3-grids)
export function Bento3x3SecurityStack(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Defense in Depth"
      {...props}
    />
  );
}

export const Bento3x3SecurityStackConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Defense in Depth',
  render: (props) => <Bento3x3SecurityStack {...props} />
};

// Bento 3x3 Omnichannel Suite (3x3-grids)
export function Bento3x3EcommerceTools(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Omnichannel Suite"
      {...props}
    />
  );
}

export const Bento3x3EcommerceToolsConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Omnichannel Suite',
  render: (props) => <Bento3x3EcommerceTools {...props} />
};

// Bento 3x3 AI Copilot Capabilities (3x3-grids)
export function Bento3x3AIAssistant(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 AI Copilot Capabilities"
      {...props}
    />
  );
}

export const Bento3x3AIAssistantConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 AI Copilot Capabilities',
  render: (props) => <Bento3x3AIAssistant {...props} />
};

// Bento 3x3 DX Toolchain (3x3-grids)
export function Bento3x3DevExperience(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 DX Toolchain"
      {...props}
    />
  );
}

export const Bento3x3DevExperienceConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 DX Toolchain',
  render: (props) => <Bento3x3DevExperience {...props} />
};

// Bento 3x3 Cross-Border Engine (3x3-grids)
export function Bento3x3GlobalReach(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Cross-Border Engine"
      {...props}
    />
  );
}

export const Bento3x3GlobalReachConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Cross-Border Engine',
  render: (props) => <Bento3x3GlobalReach {...props} />
};

// Bento 3x3 Concierge Support (3x3-grids)
export function Bento3x3CustomerCare(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Concierge Support"
      {...props}
    />
  );
}

export const Bento3x3CustomerCareConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Concierge Support',
  render: (props) => <Bento3x3CustomerCare {...props} />
};

// Bento 3x3 Clean Minimal Mono (3x3-grids)
export function Bento3x3MinimalMono(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="3x3-grids"
      headline="3x3 Clean Minimal Mono"
      {...props}
    />
  );
}

export const Bento3x3MinimalMonoConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento 3x3 Clean Minimal Mono',
  render: (props) => <Bento3x3MinimalMono {...props} />
};

// Bento Tabs Solutions Matrix (interactive-tabs)
export function BentoTabsSolutions(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Solutions Matrix"
      {...props}
    />
  );
}

export const BentoTabsSolutionsConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Solutions Matrix',
  render: (props) => <BentoTabsSolutions {...props} />
};

// Bento Tabs Language SDKs (interactive-tabs)
export function BentoTabsDevelopers(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Language SDKs"
      {...props}
    />
  );
}

export const BentoTabsDevelopersConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Language SDKs',
  render: (props) => <BentoTabsDevelopers {...props} />
};

// Bento Tabs Industry Verticals (interactive-tabs)
export function BentoTabsIndustries(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Industry Verticals"
      {...props}
    />
  );
}

export const BentoTabsIndustriesConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Industry Verticals',
  render: (props) => <BentoTabsIndustries {...props} />
};

// Bento Tabs Customer Journey (interactive-tabs)
export function BentoTabsLifecycle(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Customer Journey"
      {...props}
    />
  );
}

export const BentoTabsLifecycleConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Customer Journey',
  render: (props) => <BentoTabsLifecycle {...props} />
};

// Bento Tabs Cloud Infrastructure (interactive-tabs)
export function BentoTabsArchitecture(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Cloud Infrastructure"
      {...props}
    />
  );
}

export const BentoTabsArchitectureConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Cloud Infrastructure',
  render: (props) => <BentoTabsArchitecture {...props} />
};

// Bento Tabs Global Regulations (interactive-tabs)
export function BentoTabsCompliance(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Global Regulations"
      {...props}
    />
  );
}

export const BentoTabsComplianceConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Global Regulations',
  render: (props) => <BentoTabsCompliance {...props} />
};

// Bento Tabs Payment Rails (interactive-tabs)
export function BentoTabsPaymentMethods(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Payment Rails"
      {...props}
    />
  );
}

export const BentoTabsPaymentMethodsConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Payment Rails',
  render: (props) => <BentoTabsPaymentMethods {...props} />
};

// Bento Tabs Tier Comparison Bento (interactive-tabs)
export function BentoTabsPricingTiers(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Tier Comparison Bento"
      {...props}
    />
  );
}

export const BentoTabsPricingTiersConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Tier Comparison Bento',
  render: (props) => <BentoTabsPricingTiers {...props} />
};

// Bento Tabs Real-Time Reports (interactive-tabs)
export function BentoTabsDataAnalytics(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Real-Time Reports"
      {...props}
    />
  );
}

export const BentoTabsDataAnalyticsConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Real-Time Reports',
  render: (props) => <BentoTabsDataAnalytics {...props} />
};

// Bento Tabs Workflow Blueprints (interactive-tabs)
export function BentoTabsAutomationTemplates(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="interactive-tabs"
      headline="Tabs Workflow Blueprints"
      {...props}
    />
  );
}

export const BentoTabsAutomationTemplatesConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Tabs Workflow Blueprints',
  render: (props) => <BentoTabsAutomationTemplates {...props} />
};

// Bento Metric $50B+ Volume (metric-highlight)
export function BentoMetricProcessingVolume(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric $50B+ Volume"
      {...props}
    />
  );
}

export const BentoMetricProcessingVolumeConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric $50B+ Volume',
  render: (props) => <BentoMetricProcessingVolume {...props} />
};

// Bento Metric 99.999% SLA (metric-highlight)
export function BentoMetricUptimeSLA(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 99.999% SLA"
      {...props}
    />
  );
}

export const BentoMetricUptimeSLAConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 99.999% SLA',
  render: (props) => <BentoMetricUptimeSLA {...props} />
};

// Bento Metric 180+ Countries (metric-highlight)
export function BentoMetricGlobalCountries(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 180+ Countries"
      {...props}
    />
  );
}

export const BentoMetricGlobalCountriesConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 180+ Countries',
  render: (props) => <BentoMetricGlobalCountries {...props} />
};

// Bento Metric 10x Velocity (metric-highlight)
export function BentoMetricCustomerGrowth(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 10x Velocity"
      {...props}
    />
  );
}

export const BentoMetricCustomerGrowthConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 10x Velocity',
  render: (props) => <BentoMetricCustomerGrowth {...props} />
};

// Bento Metric 40% Lower Fees (metric-highlight)
export function BentoMetricCostSavings(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 40% Lower Fees"
      {...props}
    />
  );
}

export const BentoMetricCostSavingsConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 40% Lower Fees',
  render: (props) => <BentoMetricCostSavings {...props} />
};

// Bento Metric 12ms Response (metric-highlight)
export function BentoMetricSubMillisecond(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 12ms Response"
      {...props}
    />
  );
}

export const BentoMetricSubMillisecondConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 12ms Response',
  render: (props) => <BentoMetricSubMillisecond {...props} />
};

// Bento Metric 99.4% Fraud Block (metric-highlight)
export function BentoMetricFraudPrevention(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 99.4% Fraud Block"
      {...props}
    />
  );
}

export const BentoMetricFraudPreventionConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 99.4% Fraud Block',
  render: (props) => <BentoMetricFraudPrevention {...props} />
};

// Bento Metric 500k+ Developers (metric-highlight)
export function BentoMetricDeveloperAdoption(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 500k+ Developers"
      {...props}
    />
  );
}

export const BentoMetricDeveloperAdoptionConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 500k+ Developers',
  render: (props) => <BentoMetricDeveloperAdoption {...props} />
};

// Bento Metric 100% Green Energy (metric-highlight)
export function BentoMetricCarbonNeutral(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 100% Green Energy"
      {...props}
    />
  );
}

export const BentoMetricCarbonNeutralConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 100% Green Energy',
  render: (props) => <BentoMetricCarbonNeutral {...props} />
};

// Bento Metric 320% Average ROI (metric-highlight)
export function BentoMetricROIExecutive(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="metric-highlight"
      headline="Metric 320% Average ROI"
      {...props}
    />
  );
}

export const BentoMetricROIExecutiveConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Metric 320% Average ROI',
  render: (props) => <BentoMetricROIExecutive {...props} />
};

// Bento Code REST API Quickstart (code-window)
export function BentoCodeRestAPI(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code REST API Quickstart"
      {...props}
    />
  );
}

export const BentoCodeRestAPIConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code REST API Quickstart',
  render: (props) => <BentoCodeRestAPI {...props} />
};

// Bento Code Webhook Event Payload (code-window)
export function BentoCodeWebhooks(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code Webhook Event Payload"
      {...props}
    />
  );
}

export const BentoCodeWebhooksConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code Webhook Event Payload',
  render: (props) => <BentoCodeWebhooks {...props} />
};

// Bento Code React SDK Snippet (code-window)
export function BentoCodeReactComponent(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code React SDK Snippet"
      {...props}
    />
  );
}

export const BentoCodeReactComponentConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code React SDK Snippet',
  render: (props) => <BentoCodeReactComponent {...props} />
};

// Bento Code GraphQL Explorer (code-window)
export function BentoCodeGraphQLQuery(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code GraphQL Explorer"
      {...props}
    />
  );
}

export const BentoCodeGraphQLQueryConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code GraphQL Explorer',
  render: (props) => <BentoCodeGraphQLQuery {...props} />
};

// Bento Code Python Data Client (code-window)
export function BentoCodePythonData(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code Python Data Client"
      {...props}
    />
  );
}

export const BentoCodePythonDataConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code Python Data Client',
  render: (props) => <BentoCodePythonData {...props} />
};

// Bento Code iOS Swift SDK (code-window)
export function BentoCodeMobileSwift(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code iOS Swift SDK"
      {...props}
    />
  );
}

export const BentoCodeMobileSwiftConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code iOS Swift SDK',
  render: (props) => <BentoCodeMobileSwift {...props} />
};

// Bento Code Go High-Concurrency (code-window)
export function BentoCodeGoMicroservice(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code Go High-Concurrency"
      {...props}
    />
  );
}

export const BentoCodeGoMicroserviceConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code Go High-Concurrency',
  render: (props) => <BentoCodeGoMicroservice {...props} />
};

// Bento Code Dokploy / Docker Spec (code-window)
export function BentoCodeDockerCompose(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code Dokploy / Docker Spec"
      {...props}
    />
  );
}

export const BentoCodeDockerComposeConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code Dokploy / Docker Spec',
  render: (props) => <BentoCodeDockerCompose {...props} />
};

// Bento Code SQL Ledger Audit (code-window)
export function BentoCodeSQLReconciliation(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code SQL Ledger Audit"
      {...props}
    />
  );
}

export const BentoCodeSQLReconciliationConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code SQL Ledger Audit',
  render: (props) => <BentoCodeSQLReconciliation {...props} />
};

// Bento Code JWT Bearer Auth (code-window)
export function BentoCodeAuthTokens(props: BentoProps) {
  return (
    <BaseBentoRenderer
      variant="code-window"
      headline="Code JWT Bearer Auth"
      {...props}
    />
  );
}

export const BentoCodeAuthTokensConfig: PuckComponentConfig<BentoProps> = {
  ...bentoPuckConfig,
  label: 'Bento Code JWT Bearer Auth',
  render: (props) => <BentoCodeAuthTokens {...props} />
};
