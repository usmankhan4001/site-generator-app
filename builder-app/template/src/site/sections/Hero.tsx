'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Star,
  ShieldCheck,
  Zap,
  Play,
  Check,
  Sparkles,
  Layers,
  Activity,
} from 'lucide-react';
import type { HeroProps, HeroVariant, SiteContent, StatItem } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { resolveVariant, resolveLayoutSystem } from '@/site/layoutSystems';
import { resolveArchetype, archetypeHeroVariant, hasArchetype } from '@/site/archetypes';

type HeroLayout = HeroVariant;

/**
 * Hero — primary landing page opener.
 * Supported variants:
 * - lead_form: Left column (H1, subtitle, bullet points) + Right column (interactive lead/consultation form)
 * - asymmetric_bento_collage: Centered headline + dual CTAs above a 3-frame collage with floating metric glass chips
 * - fullbleed_display: 72px editorial display headline with luxury CTA and centered video/graphic preview window
 * - stats_banner_split / stats_split: Left headline + CTA; Right 4-box metric counter grid
 * - default / split: 50/50 split layout
 * - centered, stacked, editorial, editorial_center: legacy & archetype layouts
 */
export default function Hero({ props, content }: { props: HeroProps; content: SiteContent }) {
  const {
    badge,
    headline,
    accentText,
    subtitle,
    primaryCta,
    secondaryCta,
    image,
    images,
    bulletPoints,
    features,
    trustBadges,
    leadForm,
    stats,
    videoUrl,
  } = props;

  // State for interactive lead form
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formInterest, setFormInterest] = useState('Enterprise Solutions');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const rawVariant = props.variant ?? props.layout;
  const layout: HeroLayout = !image && !rawVariant
    ? 'centered'
    : (rawVariant ??
      (hasArchetype(content)
        ? archetypeHeroVariant(resolveArchetype(content))
        : (['split', 'centered', 'stacked'] as const)[resolveVariant(content, 'hero', 3)]));

  const isAtelier = resolveLayoutSystem(content) === 'atelier';

  const ctaButtons = (
    <>
      {primaryCta && (
        <Button asChild size="lg" className="h-12 px-7 text-base shadow-sm font-semibold">
          <Link href={primaryCta.href}>
            {primaryCta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {secondaryCta && (
        <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
          <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
        </Button>
      )}
    </>
  );

  const badgePill = badge ? (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold border border-border shadow-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span>{badge}</span>
    </div>
  ) : null;

  const trust = trustBadges?.length ? trustBadges : null;

  const defaultBullets = [
    'Enterprise-grade infrastructure with 99.99% SLA guarantee',
    'Dedicated onboarding and technical concierge support',
    'Seamless compliance & zero hidden setup costs',
  ];
  const activeBullets = bulletPoints?.length ? bulletPoints : features?.length ? features : defaultBullets;

  const defaultStats: StatItem[] = [
    { value: '99.99%', label: 'Uptime SLA', subtext: 'Guaranteed by contract' },
    { value: '< 15ms', label: 'Global Latency', subtext: 'Across 40+ edge regions' },
    { value: '$2.4B+', label: 'Volume Processed', subtext: 'Annualized flow' },
    { value: '24/7/365', label: 'Expert Support', subtext: 'Live technical concierge' },
  ];
  const activeStats = stats && stats.length >= 4 ? stats.slice(0, 4) : stats && stats.length > 0 ? stats : defaultStats;

  // --------------------------------------------------------------------------
  // Variant: Lead Form
  // --------------------------------------------------------------------------
  if (layout === 'lead_form') {
    return (
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Copy & Bullet Points */}
            <div className="lg:col-span-7 text-left space-y-6">
              {badgePill}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
                {headline}
                {accentText && (
                  <>
                    {' '}
                    <span className="text-primary">{accentText}</span>
                  </>
                )}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal">
                {subtitle}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3.5 pt-2">
                {activeBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full p-1 bg-primary/10 text-primary shrink-0">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground font-medium">{bullet}</span>
                  </div>
                ))}
              </div>

              {trust && (
                <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground pt-4 border-t border-border/60">
                  {trust.map((t, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Interactive Consultation / Lead Request Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-2xl p-6 sm:p-8 space-y-5">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Direct Concierge Access</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    {leadForm?.title ?? 'Request a Consultation'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {leadForm?.description ?? 'Speak with a solution specialist within 2 business hours.'}
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="py-8 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground">
                      {leadForm?.successMessage ?? 'Inquiry Received!'}
                    </h4>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                      Thank you. An assigned enterprise specialist will reach out to {formEmail || 'your email'} shortly.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => setFormSubmitted(false)}
                    >
                      Send another inquiry
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="s.jenkins@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">
                        Area of Interest
                      </label>
                      <select
                        value={formInterest}
                        onChange={(e) => setFormInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                      >
                        <option value="Enterprise Solutions">Enterprise Platform &amp; Integration</option>
                        <option value="Custom Implementation">Custom Implementation &amp; Architecture</option>
                        <option value="Consulting & Advisory">Strategic Advisory &amp; Support</option>
                        <option value="Pricing & Plans">Volume Pricing &amp; SLA Terms</option>
                      </select>
                    </div>

                    <Button type="submit" className="w-full h-11 text-sm font-semibold shadow-xs">
                      {leadForm?.submitLabel ?? 'Request Proposal'}
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>Confidential &amp; 256-bit encrypted. Zero spam.</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Asymmetric Bento Collage
  // --------------------------------------------------------------------------
  if (layout === 'asymmetric_bento_collage') {
    const mainImg = image || 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80';
    const subImg1 = images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80';
    const subImg2 = images?.[1] || 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80';

    return (
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Top Headline & Dual CTAs */}
          <div className="text-center max-w-4xl mx-auto space-y-6 mb-12 md:mb-16">
            {badgePill && <div className="flex justify-center">{badgePill}</div>}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
              {headline}
              {accentText && (
                <>
                  {' '}
                  <span className="text-primary">{accentText}</span>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {ctaButtons}
            </div>
          </div>

          {/* 3-Frame Collage with Floating Metric Glass Chips */}
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
              {/* Main Primary Frame (Spans 7 cols on desktop) */}
              <div className="md:col-span-7 relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg group">
                <img
                  src={mainImg}
                  alt={headline}
                  className="w-full h-full min-h-[320px] max-h-[460px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

                {/* Floating Metric Glass Chip (Top-Left of main frame) */}
                <div className="absolute top-4 left-4 z-10 rounded-xl border border-border/80 dark:border-white/15 bg-background/85 dark:bg-card/85 backdrop-blur-md px-3.5 py-2 shadow-lg flex items-center gap-2.5">
                  <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground leading-none">+99.98%</div>
                    <div className="text-[10px] text-muted-foreground">Latency Reduction</div>
                  </div>
                </div>
              </div>

              {/* Right Secondary Stacked Frames (Spans 5 cols on desktop) */}
              <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6">
                {/* Frame 2: Top Right */}
                <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-md group min-h-[160px] max-h-[220px]">
                  <img
                    src={subImg1}
                    alt="Analytics preview"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/80 dark:bg-card/80 backdrop-blur-md border border-border/70 text-[11px] font-semibold text-foreground">
                    <Activity className="h-3.5 w-3.5 text-primary" />
                    <span>Real-time Telemetry</span>
                  </div>
                </div>

                {/* Frame 3: Bottom Right */}
                <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-md group min-h-[160px] max-h-[220px]">
                  <img
                    src={subImg2}
                    alt="Infrastructure view"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/80 dark:bg-card/80 backdrop-blur-md border border-border/70 text-[11px] font-semibold text-foreground">
                    <Layers className="h-3.5 w-3.5 text-primary" />
                    <span>Multi-Region Mesh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Glass Chip Overlay (Bottom Left of Collage) */}
            <div className="absolute -bottom-5 right-4 sm:right-8 z-20 rounded-xl border border-border/80 dark:border-white/15 bg-background/90 dark:bg-card/90 backdrop-blur-lg px-4 py-2.5 shadow-xl flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">4.9/5 TrustScore</div>
                <div className="text-[10px] text-muted-foreground">Verified Merchant Grade</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Fullbleed Display (72px editorial display headline)
  // --------------------------------------------------------------------------
  if (layout === 'fullbleed_display') {
    const previewImage = image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80';

    return (
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Editorial Display Copy */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {badge && (
              <span
                className="inline-block text-xs sm:text-sm uppercase tracking-[0.25em] text-primary font-semibold"
                style={{ fontFamily: 'var(--font-display, inherit)' }}
              >
                {badge}
              </span>
            )}

            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-normal tracking-tight text-foreground leading-[1.04]"
              style={{ fontFamily: 'var(--font-display, inherit)' }}
            >
              {headline}
              {accentText && (
                <>
                  {' '}
                  <span className="italic text-primary font-light">{accentText}</span>
                </>
              )}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-8 text-sm uppercase tracking-widest font-semibold shadow-md"
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 px-8 text-sm uppercase tracking-widest font-semibold"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Centered Video / Graphic Preview Window */}
          <div className="relative max-w-5xl mx-auto mt-12 md:mt-16">
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-card shadow-2xl">
              {/* Chrome Top Bar */}
              <div className="px-4 py-3 bg-muted/60 border-b border-border/80 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground hidden sm:inline-block">
                    {content.business?.website || 'preview.network'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Interactive Demonstration</span>
                </div>
              </div>

              {/* Media Content */}
              {videoUrl ? (
                <div className="relative aspect-16/9 w-full bg-black">
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-16/9 sm:aspect-21/9 max-h-[540px] w-full group">
                  <img
                    src={previewImage}
                    alt={headline}
                    className="w-full h-full object-cover object-center group-hover:scale-101 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Stats Banner Split (Left Headline + CTA; Right 4-box Metric Grid)
  // --------------------------------------------------------------------------
  if (layout === 'stats_banner_split' || layout === 'stats_split') {
    return (
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 text-left space-y-6">
              {badgePill}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
                {headline}
                {accentText && (
                  <>
                    {' '}
                    <span className="text-primary">{accentText}</span>
                  </>
                )}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal">
                {subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">{ctaButtons}</div>
              {trust && (
                <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground pt-4 border-t border-border/60">
                  {trust.map((t, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: 4-Box Dark Metric Counter Grid */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {activeStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-2xl border border-border/80 bg-card/90 dark:bg-muted/30 p-5 sm:p-6 shadow-md hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-foreground">
                        {stat.label}
                      </div>
                    </div>
                    {stat.subtext && (
                      <div className="text-[11px] text-muted-foreground pt-2 mt-2 border-t border-border/40">
                        {stat.subtext}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Editorial / Editorial Center (Legacy/Archetype)
  // --------------------------------------------------------------------------
  if (layout === 'editorial' || layout === 'editorial_center' || layout === 'editorial_centered') {
    const isCentered = layout === 'editorial_center' || layout === 'editorial_centered';
    return (
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={isCentered ? 'max-w-4xl mx-auto text-center space-y-6 md:space-y-8' : 'max-w-4xl space-y-6 md:space-y-8'}>
            {badge &&
              (isAtelier ? (
                <span
                  className="block text-sm italic text-primary tracking-wide"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {badge}
                </span>
              ) : (
                badgePill
              ))}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-foreground leading-[1.05]"
              style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
            >
              {headline}
              {accentText && (
                <>
                  {' '}
                  <span className={isAtelier ? 'italic text-primary' : 'text-primary'}>
                    {accentText}
                  </span>
                </>
              )}
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light ${isCentered ? 'mx-auto' : ''}`}>
              {subtitle}
            </p>
            <div className={`flex flex-wrap items-center gap-4 pt-2 ${isCentered ? 'justify-center' : ''}`}>{ctaButtons}</div>
            {trust && (
              <div className={`flex flex-wrap items-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border/40 ${isCentered ? 'justify-center' : ''}`}>
                {trust.map((t, idx) => (
                  <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {image && (
            <div className="mt-12 md:mt-16 w-full overflow-hidden bg-muted rounded-2xl border border-border shadow-xl">
              <img
                src={image}
                alt={headline}
                className="w-full h-auto max-h-[640px] md:max-h-[720px] object-cover object-center"
                loading="eager"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Stacked (Full-width Media + Floating Card)
  // --------------------------------------------------------------------------
  if (layout === 'stacked') {
    return (
      <section className="relative pb-16 md:pb-24 overflow-hidden bg-background">
        {image && (
          <div className="w-full aspect-21/9 max-h-[520px] overflow-hidden">
            <img
              src={image}
              alt={headline}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center -mt-10 md:-mt-16 relative">
            <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-lg">
              {badgePill && <div className="mb-5 flex justify-center">{badgePill}</div>}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
                {headline}
                {accentText && (
                  <>
                    {' '}
                    <span className="text-primary">{accentText}</span>
                  </>
                )}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7">
                {subtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3.5">{ctaButtons}</div>
              {trust && (
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-6 mt-6 border-t border-border/60">
                  {trust.map((t, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Centered (Centered Copy + Centered Media)
  // --------------------------------------------------------------------------
  if (layout === 'centered') {
    return (
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {badgePill && <div className="mb-6">{badgePill}</div>}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
              {headline}
              {accentText && (
                <>
                  {' '}
                  <span className="text-primary">{accentText}</span>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">{ctaButtons}</div>
            {trust && (
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
                {trust.map((t, idx) => (
                  <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {image && (
            <div className="mt-12 md:mt-16 rounded-2xl overflow-hidden border border-border bg-card max-w-5xl mx-auto shadow-xl">
              <img
                src={image}
                alt={headline}
                className="w-full h-auto max-h-[540px] object-cover object-center"
                loading="eager"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Default / Split 50/50
  // --------------------------------------------------------------------------
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 text-left space-y-6">
            {badgePill}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
              {headline}
              {accentText && (
                <>
                  {' '}
                  <span className="text-primary">{accentText}</span>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl font-normal">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3.5 pt-2">{ctaButtons}</div>
            {trust && (
              <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground pt-4 border-t border-border/60">
                {trust.map((t, idx) => (
                  <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            {image && (
              <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
                <img
                  src={image}
                  alt={headline}
                  className="w-full h-auto aspect-4/3 object-cover object-center"
                  loading="eager"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

