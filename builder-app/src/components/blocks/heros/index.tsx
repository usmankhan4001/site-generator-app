// Auto-generated Untitled UI Heros Block Registry (45 components)
'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  ChevronRight, 
  Layers, 
  Zap, 
  Code2, 
  Globe, 
  Copy, 
  Check, 
  Laptop, 
  Smartphone, 
  Tablet,
  Search
} from 'lucide-react';
import { HeroBlockProps, PuckComponentConfig } from '../types';

export interface HeroProps extends HeroBlockProps {
  className?: string;
}

export function BaseHeroRenderer({
  variant = 'split-screen',
  badge = 'v2.4 Just Released',
  badgeHref = '#updates',
  headline = 'Scale your global operations without friction',
  accentText = 'without friction',
  subtitle = 'Everything your modern enterprise needs to manage global treasury, instant multi-currency accounts, and automated cross-border settlements with 99.99% uptime.',
  primaryCtaText = 'Start Free Trial',
  primaryCtaHref = '#get-started',
  secondaryCtaText = 'Book Executive Demo',
  secondaryCtaHref = '#demo',
  primaryImageUrl = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
  secondaryImageUrl = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  videoUrl,
  stats = [
    { label: 'Annualized Volume', value: '$50B+' },
    { label: 'Global Settlement SLA', value: '<15s' },
    { label: 'Enterprise Uptime', value: '99.999%' }
  ],
  trustText = 'Trusted by 10,000+ high-growth tech leaders',
  ratingScore = '4.9/5',
  reviewCount = '2,400+ reviews',
  codeSnippet = `// Initialize Dokploy Deployment
import { DokployPaaS } from '@airwallex/cloner';

const client = new DokployPaaS({
  apiKey: process.env.DOKPLOY_API_KEY,
  cluster: 'us-east-metal'
});

await client.deploy({
  project: 'global-treasury-v2',
  branch: 'main',
  env: 'production'
});`,
  deviceType = 'browser',
  className = ''
}: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isSplit = variant.startsWith('split-screen');
  const isCentered = variant.startsWith('centered-badge');
  const isAppMockup = variant.startsWith('app-mockup');
  const isVideo = variant.startsWith('video-backdrop');
  const isMultiDevice = variant.startsWith('multi-device');
  const isBento = variant.startsWith('bento-hero');
  const isMinimal = variant.startsWith('minimal-headline');

  return (
    <section className={`relative overflow-hidden py-16 sm:py-24 lg:py-32 ${
      isVideo ? 'bg-slate-950 text-white' : 'bg-background text-foreground'
    } ${className}`}>
      
      {/* Background Ambience Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* 1. CENTERED HEROES (Centered Badge, Minimal Headline) */}
        {/* ============================================================== */}
        {(isCentered || isMinimal) && (
          <div className="text-center max-w-4xl mx-auto">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-8 hover:bg-primary/15 transition-colors cursor-pointer">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{badge}</span>
                <ChevronRight className="w-3.5 h-3.5 text-primary/70" />
              </div>
            )}

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {headline.replace(accentText, '')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-primary/80">
                {accentText}
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {primaryCtaText && (
                <a
                  href={primaryCtaHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm sm:text-base hover:bg-primary/90 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-card border border-border text-foreground font-semibold text-sm sm:text-base hover:bg-muted/70 transition-all"
                >
                  <Play className="w-4 h-4 text-primary fill-primary" />
                  <span>{secondaryCtaText}</span>
                </a>
              )}
            </div>

            {/* Social Proof Rating */}
            {ratingScore && (
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-foreground">{ratingScore}</span>
                <span>•</span>
                <span>{reviewCount}</span>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. SPLIT-SCREEN HEROES */}
        {/* ============================================================== */}
        {isSplit && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              {badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/25 mb-6">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{badge}</span>
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                {headline.replace(accentText, '')}{' '}
                <span className="text-primary">{accentText}</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {subtitle}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={primaryCtaHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm sm:text-base hover:bg-primary/90 shadow-md transition-transform hover:scale-[1.02]"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-muted/60 border border-border text-foreground font-medium text-sm sm:text-base hover:bg-muted"
                >
                  <span>{secondaryCtaText}</span>
                </a>
              </div>

              {/* Stat Counters */}
              {stats && stats.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border/60 grid grid-cols-3 gap-6">
                  {stats.map((st, idx) => (
                    <div key={idx}>
                      <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{st.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{st.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Interactive Asset: Terminal or Mockup */}
            <div className="lg:col-span-5">
              {variant.includes('Terminal') ? (
                <div className="rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
                  <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-slate-400 text-[11px]">bash - dokploy-agent</span>
                    <button 
                      type="button" 
                      onClick={handleCopyCode}
                      className="p-1 rounded text-slate-400 hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <pre className="p-5 text-slate-200 overflow-x-auto leading-relaxed">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              ) : (
                <div className="relative rounded-2xl p-2 bg-gradient-to-b from-border to-border/40 shadow-2xl">
                  <div className="rounded-xl overflow-hidden bg-card border border-border/50">
                    <img 
                      src={primaryImageUrl} 
                      alt="App Dashboard Preview" 
                      className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Floating Notification Badge */}
                  <div className="absolute -bottom-4 -left-4 p-3.5 rounded-xl bg-card/95 border border-border shadow-xl backdrop-blur-md flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Global Payout Settled</p>
                      <p className="text-[10px] text-muted-foreground">+$14,250.00 via SEPA Instant</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. APP MOCKUP CONTAINER HERO */}
        {/* ============================================================== */}
        {isAppMockup && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{badge}</span>
              <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                {headline}
              </h1>
              <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
              <div className="mt-8 flex justify-center gap-4">
                <a href={primaryCtaHref} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90">
                  {primaryCtaText}
                </a>
              </div>
            </div>

            {/* Browser Frame Mockup */}
            <div className="max-w-6xl mx-auto rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="px-4 py-3 bg-muted/60 border-b border-border flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="w-full max-w-sm mx-auto px-3 py-1 rounded-md bg-background/80 border border-border/80 text-[11px] text-muted-foreground text-center">
                  https://app.airwallex-cloud.io/dashboard/v2
                </div>
              </div>
              <div className="p-4 sm:p-8 bg-background/40">
                <img 
                  src={primaryImageUrl} 
                  alt="App interface" 
                  className="w-full h-auto rounded-xl border border-border shadow-md object-cover" 
                />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. MULTI-DEVICE PREVIEW HERO */}
        {/* ============================================================== */}
        {isMultiDevice && (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{badge}</span>
              <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                {headline}
              </h1>
              <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Laptop Frame */}
              <div className="w-full md:w-2/3 rounded-2xl border border-border bg-card p-2 shadow-xl">
                <div className="flex items-center gap-1.5 pb-2 px-2">
                  <Laptop className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">Desktop Core</span>
                </div>
                <img src={primaryImageUrl} alt="Desktop display" className="rounded-xl w-full h-64 sm:h-80 object-cover" />
              </div>

              {/* Mobile Phone Mockup Overlay */}
              <div className="w-48 sm:w-56 rounded-3xl border-4 border-foreground/20 bg-card p-1 shadow-2xl -mt-8 md:mt-0 md:-ml-12 z-20">
                <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto my-1.5" />
                <img src={secondaryImageUrl} alt="Mobile display" className="rounded-2xl w-full h-72 sm:h-88 object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 5. BENTO HERO */}
        {/* ============================================================== */}
        {isBento && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-8 rounded-3xl bg-card border border-border shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{badge}</span>
                <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-foreground">{headline}</h1>
                <p className="mt-4 text-base text-muted-foreground max-w-xl">{subtitle}</p>
              </div>
              <div className="mt-8 flex gap-4">
                <a href={primaryCtaHref} className="px-5 py-3 bg-primary text-primary-foreground font-medium rounded-xl text-sm">
                  {primaryCtaText}
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-card border border-border shadow-md">
                <p className="text-xs text-muted-foreground">Total Global Settlement</p>
                <p className="text-3xl font-bold text-foreground mt-1">$50.8B</p>
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-emerald-500 rounded-full" />
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-primary text-primary-foreground shadow-md">
                <ShieldCheck className="w-8 h-8 mb-2" />
                <h4 className="font-semibold text-base">Bank-Grade Security</h4>
                <p className="text-xs opacity-90 mt-1">Direct SWIFT, SEPA & FedNow integration with full SOC2 Type II compliance.</p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 6. VIDEO BACKDROP HERO */}
        {/* ============================================================== */}
        {isVideo && (
          <div className="text-center max-w-3xl mx-auto py-12">
            <button 
              type="button" 
              onClick={() => setIsVideoModalOpen(true)}
              className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 text-primary flex items-center justify-center mx-auto mb-8 hover:scale-110 transition-transform shadow-lg group"
            >
              <Play className="w-6 h-6 fill-primary ml-1" />
            </button>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">{headline}</h1>
            <p className="mt-6 text-slate-300 text-lg">{subtitle}</p>
            <div className="mt-8 flex justify-center gap-4">
              <a href={primaryCtaHref} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium">
                {primaryCtaText}
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export const heroPuckConfig: PuckComponentConfig<HeroProps> = {
  label: 'Hero Section Block',
  defaultProps: {
    badge: 'v2.4 Just Released',
    headline: 'Scale your global operations without friction',
    accentText: 'without friction',
    subtitle: 'Everything your modern enterprise needs to manage global treasury, instant multi-currency accounts, and automated cross-border settlements.',
    primaryCtaText: 'Start Free Trial',
    secondaryCtaText: 'Book Executive Demo',
    primaryImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
    ratingScore: '4.9/5',
    reviewCount: '2,400+ reviews'
  },
  fields: {
    badge: { type: 'text', label: 'Badge Text' },
    headline: { type: 'text', label: 'Headline' },
    accentText: { type: 'text', label: 'Accent Gradient Text' },
    subtitle: { type: 'textarea', label: 'Subtitle Description' },
    primaryCtaText: { type: 'text', label: 'Primary CTA Text' },
    primaryCtaHref: { type: 'text', label: 'Primary CTA Link' },
    secondaryCtaText: { type: 'text', label: 'Secondary CTA Text' },
    secondaryCtaHref: { type: 'text', label: 'Secondary CTA Link' },
    primaryImageUrl: { type: 'text', label: 'Primary Image URL' },
    ratingScore: { type: 'text', label: 'Rating Score' },
    reviewCount: { type: 'text', label: 'Review Count' }
  },
  render: (props) => <BaseHeroRenderer {...props} />
};

// Hero Split Default (split-screen)
export function HeroSplitDefault(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="split-screen"
      headline="Split Default"
      {...props}
    />
  );
}

export const HeroSplitDefaultConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Split Default',
  render: (props) => <HeroSplitDefault {...props} />
};

// Hero Split Reverse (split-screen)
export function HeroSplitReverse(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="split-screen"
      headline="Split Reverse"
      {...props}
    />
  );
}

export const HeroSplitReverseConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Split Reverse',
  render: (props) => <HeroSplitReverse {...props} />
};

// Hero Split Lead Form (split-screen)
export function HeroSplitForm(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="split-screen"
      headline="Split Lead Form"
      {...props}
    />
  );
}

export const HeroSplitFormConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Split Lead Form',
  render: (props) => <HeroSplitForm {...props} />
};

// Hero Split Feature Stack (split-screen)
export function HeroSplitCards(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="split-screen"
      headline="Split Feature Stack"
      {...props}
    />
  );
}

export const HeroSplitCardsConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Split Feature Stack',
  render: (props) => <HeroSplitCards {...props} />
};

// Hero Split Metrics (split-screen)
export function HeroSplitStats(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="split-screen"
      headline="Split Metrics"
      {...props}
    />
  );
}

export const HeroSplitStatsConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Split Metrics',
  render: (props) => <HeroSplitStats {...props} />
};

// Hero Split Code Terminal (split-screen)
export function HeroSplitTerminal(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="split-screen"
      headline="Split Code Terminal"
      {...props}
    />
  );
}

export const HeroSplitTerminalConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Split Code Terminal',
  render: (props) => <HeroSplitTerminal {...props} />
};

// Hero Split Checkout Preview (split-screen)
export function HeroSplitCheckout(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="split-screen"
      headline="Split Checkout Preview"
      {...props}
    />
  );
}

export const HeroSplitCheckoutConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Split Checkout Preview',
  render: (props) => <HeroSplitCheckout {...props} />
};

// Hero Split Aurora Glow (split-screen)
export function HeroSplitGradient(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="split-screen"
      headline="Split Aurora Glow"
      {...props}
    />
  );
}

export const HeroSplitGradientConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Split Aurora Glow',
  render: (props) => <HeroSplitGradient {...props} />
};

// Hero Centered Badge Default (centered-badge)
export function HeroCenteredBadgeDefault(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="centered-badge"
      headline="Centered Badge Default"
      {...props}
    />
  );
}

export const HeroCenteredBadgeDefaultConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Centered Badge Default',
  render: (props) => <HeroCenteredBadgeDefault {...props} />
};

// Hero Centered Badge Glow (centered-badge)
export function HeroCenteredBadgeGlow(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="centered-badge"
      headline="Centered Badge Glow"
      {...props}
    />
  );
}

export const HeroCenteredBadgeGlowConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Centered Badge Glow',
  render: (props) => <HeroCenteredBadgeGlow {...props} />
};

// Hero Centered Badge Minimal (centered-badge)
export function HeroCenteredBadgeMinimal(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="centered-badge"
      headline="Centered Badge Minimal"
      {...props}
    />
  );
}

export const HeroCenteredBadgeMinimalConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Centered Badge Minimal',
  render: (props) => <HeroCenteredBadgeMinimal {...props} />
};

// Hero Centered Badge Ratings (centered-badge)
export function HeroCenteredBadgeRatings(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="centered-badge"
      headline="Centered Badge Ratings"
      {...props}
    />
  );
}

export const HeroCenteredBadgeRatingsConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Centered Badge Ratings',
  render: (props) => <HeroCenteredBadgeRatings {...props} />
};

// Hero Centered Badge Dual CTA (centered-badge)
export function HeroCenteredBadgeDualCta(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="centered-badge"
      headline="Centered Badge Dual CTA"
      {...props}
    />
  );
}

export const HeroCenteredBadgeDualCtaConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Centered Badge Dual CTA',
  render: (props) => <HeroCenteredBadgeDualCta {...props} />
};

// Hero Centered Badge Search (centered-badge)
export function HeroCenteredBadgeSearch(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="centered-badge"
      headline="Centered Badge Search"
      {...props}
    />
  );
}

export const HeroCenteredBadgeSearchConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Centered Badge Search',
  render: (props) => <HeroCenteredBadgeSearch {...props} />
};

// Hero Centered Badge Product Hunt (centered-badge)
export function HeroCenteredBadgeLaunch(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="centered-badge"
      headline="Centered Badge Product Hunt"
      {...props}
    />
  );
}

export const HeroCenteredBadgeLaunchConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Centered Badge Product Hunt',
  render: (props) => <HeroCenteredBadgeLaunch {...props} />
};

// Hero App Mockup Browser (app-mockup)
export function HeroAppMockupBrowser(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="app-mockup"
      headline="App Mockup Browser"
      {...props}
    />
  );
}

export const HeroAppMockupBrowserConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero App Mockup Browser',
  render: (props) => <HeroAppMockupBrowser {...props} />
};

// Hero App Mockup Dashboard (app-mockup)
export function HeroAppMockupDashboard(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="app-mockup"
      headline="App Mockup Dashboard"
      {...props}
    />
  );
}

export const HeroAppMockupDashboardConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero App Mockup Dashboard',
  render: (props) => <HeroAppMockupDashboard {...props} />
};

// Hero App Mockup Dark Studio (app-mockup)
export function HeroAppMockupDarkStudio(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="app-mockup"
      headline="App Mockup Dark Studio"
      {...props}
    />
  );
}

export const HeroAppMockupDarkStudioConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero App Mockup Dark Studio',
  render: (props) => <HeroAppMockupDarkStudio {...props} />
};

// Hero App Mockup Floating Cards (app-mockup)
export function HeroAppMockupFloatingCards(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="app-mockup"
      headline="App Mockup Floating Cards"
      {...props}
    />
  );
}

export const HeroAppMockupFloatingCardsConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero App Mockup Floating Cards',
  render: (props) => <HeroAppMockupFloatingCards {...props} />
};

// Hero App Mockup 3D Isometric (app-mockup)
export function HeroAppMockupIsometric(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="app-mockup"
      headline="App Mockup 3D Isometric"
      {...props}
    />
  );
}

export const HeroAppMockupIsometricConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero App Mockup 3D Isometric',
  render: (props) => <HeroAppMockupIsometric {...props} />
};

// Hero App Mockup Glass Canvas (app-mockup)
export function HeroAppMockupGlass(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="app-mockup"
      headline="App Mockup Glass Canvas"
      {...props}
    />
  );
}

export const HeroAppMockupGlassConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero App Mockup Glass Canvas',
  render: (props) => <HeroAppMockupGlass {...props} />
};

// Hero App Mockup Interactive Tabs (app-mockup)
export function HeroAppMockupInteractive(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="app-mockup"
      headline="App Mockup Interactive Tabs"
      {...props}
    />
  );
}

export const HeroAppMockupInteractiveConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero App Mockup Interactive Tabs',
  render: (props) => <HeroAppMockupInteractive {...props} />
};

// Hero Video Cinematic (video-backdrop)
export function HeroVideoBackdropCinematic(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="video-backdrop"
      headline="Video Cinematic"
      {...props}
    />
  );
}

export const HeroVideoBackdropCinematicConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Video Cinematic',
  render: (props) => <HeroVideoBackdropCinematic {...props} />
};

// Hero Video Modal Trigger (video-backdrop)
export function HeroVideoBackdropModal(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="video-backdrop"
      headline="Video Modal Trigger"
      {...props}
    />
  );
}

export const HeroVideoBackdropModalConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Video Modal Trigger',
  render: (props) => <HeroVideoBackdropModal {...props} />
};

// Hero Video Split Showcase (video-backdrop)
export function HeroVideoBackdropSplit(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="video-backdrop"
      headline="Video Split Showcase"
      {...props}
    />
  );
}

export const HeroVideoBackdropSplitConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Video Split Showcase',
  render: (props) => <HeroVideoBackdropSplit {...props} />
};

// Hero Video Subtle Loop (video-backdrop)
export function HeroVideoBackdropMinimal(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="video-backdrop"
      headline="Video Subtle Loop"
      {...props}
    />
  );
}

export const HeroVideoBackdropMinimalConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Video Subtle Loop',
  render: (props) => <HeroVideoBackdropMinimal {...props} />
};

// Hero Video Product Reel (video-backdrop)
export function HeroVideoBackdropProduct(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="video-backdrop"
      headline="Video Product Reel"
      {...props}
    />
  );
}

export const HeroVideoBackdropProductConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Video Product Reel',
  render: (props) => <HeroVideoBackdropProduct {...props} />
};

// Hero Video Founder Story (video-backdrop)
export function HeroVideoBackdropTestimonial(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="video-backdrop"
      headline="Video Founder Story"
      {...props}
    />
  );
}

export const HeroVideoBackdropTestimonialConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Video Founder Story',
  render: (props) => <HeroVideoBackdropTestimonial {...props} />
};

// Hero Desktop & Mobile Pair (multi-device)
export function HeroMultiDeviceDesktopMobile(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="multi-device"
      headline="Desktop & Mobile Pair"
      {...props}
    />
  );
}

export const HeroMultiDeviceDesktopMobileConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Desktop & Mobile Pair',
  render: (props) => <HeroMultiDeviceDesktopMobile {...props} />
};

// Hero Device Ecosystem Trio (multi-device)
export function HeroMultiDeviceTrio(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="multi-device"
      headline="Device Ecosystem Trio"
      {...props}
    />
  );
}

export const HeroMultiDeviceTrioConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Device Ecosystem Trio',
  render: (props) => <HeroMultiDeviceTrio {...props} />
};

// Hero Floating Device Stack (multi-device)
export function HeroMultiDeviceFloating(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="multi-device"
      headline="Floating Device Stack"
      {...props}
    />
  );
}

export const HeroMultiDeviceFloatingConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Floating Device Stack',
  render: (props) => <HeroMultiDeviceFloating {...props} />
};

// Hero Tablet POS Showcase (multi-device)
export function HeroMultiDeviceTabletFocus(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="multi-device"
      headline="Tablet POS Showcase"
      {...props}
    />
  );
}

export const HeroMultiDeviceTabletFocusConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Tablet POS Showcase',
  render: (props) => <HeroMultiDeviceTabletFocus {...props} />
};

// Hero Adaptive Layout Demo (multi-device)
export function HeroMultiDeviceResponsive(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="multi-device"
      headline="Adaptive Layout Demo"
      {...props}
    />
  );
}

export const HeroMultiDeviceResponsiveConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Adaptive Layout Demo',
  render: (props) => <HeroMultiDeviceResponsive {...props} />
};

// Hero Multi-Device Micro-Screens (multi-device)
export function HeroMultiDeviceCardGrid(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="multi-device"
      headline="Multi-Device Micro-Screens"
      {...props}
    />
  );
}

export const HeroMultiDeviceCardGridConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Multi-Device Micro-Screens',
  render: (props) => <HeroMultiDeviceCardGrid {...props} />
};

// Hero Bento Asymmetric 3-Tile (bento-hero)
export function HeroBentoAsymmetric(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="bento-hero"
      headline="Bento Asymmetric 3-Tile"
      {...props}
    />
  );
}

export const HeroBentoAsymmetricConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Bento Asymmetric 3-Tile',
  render: (props) => <HeroBentoAsymmetric {...props} />
};

// Hero Bento Interactive Matrix (bento-hero)
export function HeroBentoInteractive(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="bento-hero"
      headline="Bento Interactive Matrix"
      {...props}
    />
  );
}

export const HeroBentoInteractiveConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Bento Interactive Matrix',
  render: (props) => <HeroBentoInteractive {...props} />
};

// Hero Bento Treasury Grid (bento-hero)
export function HeroBentoFintech(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="bento-hero"
      headline="Bento Treasury Grid"
      {...props}
    />
  );
}

export const HeroBentoFintechConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Bento Treasury Grid',
  render: (props) => <HeroBentoFintech {...props} />
};

// Hero Bento Growth Engine (bento-hero)
export function HeroBentoSaaS(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="bento-hero"
      headline="Bento Growth Engine"
      {...props}
    />
  );
}

export const HeroBentoSaaSConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Bento Growth Engine',
  render: (props) => <HeroBentoSaaS {...props} />
};

// Hero Bento Dark Cyberpunk (bento-hero)
export function HeroBentoDarkGrid(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="bento-hero"
      headline="Bento Dark Cyberpunk"
      {...props}
    />
  );
}

export const HeroBentoDarkGridConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Bento Dark Cyberpunk',
  render: (props) => <HeroBentoDarkGrid {...props} />
};

// Hero Bento Clean Bento (bento-hero)
export function HeroBentoMinimal(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="bento-hero"
      headline="Bento Clean Bento"
      {...props}
    />
  );
}

export const HeroBentoMinimalConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Bento Clean Bento',
  render: (props) => <HeroBentoMinimal {...props} />
};

// Hero Minimal Editorial (minimal-headline)
export function HeroMinimalEditorial(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="minimal-headline"
      headline="Minimal Editorial"
      {...props}
    />
  );
}

export const HeroMinimalEditorialConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Minimal Editorial',
  render: (props) => <HeroMinimalEditorial {...props} />
};

// Hero Minimal Pure Sans (minimal-headline)
export function HeroMinimalSans(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="minimal-headline"
      headline="Minimal Pure Sans"
      {...props}
    />
  );
}

export const HeroMinimalSansConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Minimal Pure Sans',
  render: (props) => <HeroMinimalSans {...props} />
};

// Hero Minimal Bold Statement (minimal-headline)
export function HeroMinimalStatement(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="minimal-headline"
      headline="Minimal Bold Statement"
      {...props}
    />
  );
}

export const HeroMinimalStatementConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Minimal Bold Statement',
  render: (props) => <HeroMinimalStatement {...props} />
};

// Hero Minimal Tagged Headline (minimal-headline)
export function HeroMinimalBadgeOnly(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="minimal-headline"
      headline="Minimal Tagged Headline"
      {...props}
    />
  );
}

export const HeroMinimalBadgeOnlyConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Minimal Tagged Headline',
  render: (props) => <HeroMinimalBadgeOnly {...props} />
};

// Hero Minimal Split Typography (minimal-headline)
export function HeroMinimalSplitText(props: HeroProps) {
  return (
    <BaseHeroRenderer
      variant="minimal-headline"
      headline="Minimal Split Typography"
      {...props}
    />
  );
}

export const HeroMinimalSplitTextConfig: PuckComponentConfig<HeroProps> = {
  ...heroPuckConfig,
  label: 'Hero Minimal Split Typography',
  render: (props) => <HeroMinimalSplitText {...props} />
};
