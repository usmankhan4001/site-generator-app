'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { DeviceMockupHeroProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

export default function DeviceMockupHero({
  props,
  content,
}: {
  props: DeviceMockupHeroProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    deviceType = 'both',
    screenshotUrl = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    mobileScreenshotUrl = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    primaryCta = { label: 'Launch Console', href: '/checkout' },
    secondaryCta = { label: 'Book Live Demo', href: '/contact' },
    tiltAngle = 'subtle',
    badge = 'v4.2 Cloud Release',
    trustLogos = ['Acme Global', 'Stripe Capital', 'Vercel Labs', 'Linear Tech'],
    floatingMetrics = [
      { label: 'Settlement Speed', value: '99.98% Same Day', position: 'left' },
      { label: 'Monthly Volume', value: '$84.2M+', position: 'right' },
    ],
  } = props;

  const style = resolveArchetypeStyle(content);

  const tiltClass = {
    none: '[transform:none]',
    subtle: 'lg:[transform:rotateX(6deg)_rotateY(-4deg)] hover:lg:[transform:rotateX(0deg)_rotateY(0deg)]',
    dramatic: 'lg:[transform:rotateX(14deg)_rotateY(-10deg)] hover:lg:[transform:rotateX(0deg)_rotateY(0deg)]',
  }[tiltAngle];

  return (
    <section className={cn(sectionPadding(style), 'relative overflow-hidden bg-background pt-12 md:pt-20')}>
      {/* Background radial spotlight glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden"
      >
        <div className="w-[50rem] h-[30rem] rounded-full bg-primary/10 blur-[130px] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        {badge && (
          <div className="glow-badge mb-6 animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
        )}

        {/* Section Heading */}
        {title && (
          <h1
            data-edit-prop="title"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.08] mb-6"
          >
            {title}
          </h1>
        )}

        {description && (
          <p
            data-edit-prop="description"
            className="text-base sm:text-xl text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {description}
          </p>
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {primaryCta && (
              <Button asChild size="lg" className="gap-2 h-13 px-8 text-sm font-bold shadow-xl shadow-primary/25 rounded-full">
                <Link href={primaryCta.href}>
                  <span>{primaryCta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild variant="outline" size="lg" className="h-13 px-8 text-sm font-semibold rounded-full border-border/80 bg-card/40 backdrop-blur-md hover:bg-card">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        )}

        {/* 3D Mockup Container */}
        <div className="relative max-w-5xl mx-auto [perspective:1400px] mb-12">
          {/* Floating Metric Badge (Left) */}
          {floatingMetrics.find((m) => m.position === 'left' || !m.position) && (
            <div className="hidden md:flex absolute -left-6 top-1/4 z-30 p-4 rounded-2xl bg-card/90 backdrop-blur-xl border border-border shadow-2xl flex-col items-start text-left animate-in fade-in slide-in-from-left-4">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                {floatingMetrics.find((m) => m.position === 'left' || !m.position)?.label}
              </span>
              <span className="text-xl font-black text-primary mt-0.5">
                {floatingMetrics.find((m) => m.position === 'left' || !m.position)?.value}
              </span>
            </div>
          )}

          {/* Floating Metric Badge (Right) */}
          {floatingMetrics.find((m) => m.position === 'right') && (
            <div className="hidden md:flex absolute -right-6 top-1/3 z-30 p-4 rounded-2xl bg-card/90 backdrop-blur-xl border border-border shadow-2xl flex-col items-start text-left animate-in fade-in slide-in-from-right-4">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                {floatingMetrics.find((m) => m.position === 'right')?.label}
              </span>
              <span className="text-xl font-black text-foreground mt-0.5">
                {floatingMetrics.find((m) => m.position === 'right')?.value}
              </span>
            </div>
          )}

          {/* Main 3D Tilted Wrapper */}
          <div
            className={cn(
              'relative transition-transform duration-700 transform-gpu ease-out',
              tiltClass
            )}
          >
            {/* 1. MacBook Display Bezel Frame */}
            {(deviceType === 'macbook' || deviceType === 'both') && (
              <div className="relative rounded-2xl p-2.5 sm:p-3.5 bg-neutral-900 border border-neutral-700 shadow-2xl">
                {/* Camera Notch dot */}
                <div className="w-2 h-2 rounded-full bg-neutral-700 mx-auto mb-2" />

                {/* Display Screen */}
                <div className="relative rounded-lg overflow-hidden aspect-[16/10] bg-neutral-950 border border-neutral-800">
                  {screenshotUrl && !screenshotUrl.includes('photo-1551288049') ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={screenshotUrl}
                      alt={title || 'Product Dashboard UI'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <HeroDashboardMockup />
                  )}
                </div>

                {/* MacBook Aluminum Base Chin */}
                <div className="h-3 sm:h-4 w-full bg-neutral-800 rounded-b-xl mt-2 border-t border-neutral-700 flex justify-center">
                  <div className="w-16 h-1 rounded-b-md bg-neutral-900" />
                </div>
              </div>
            )}

            {/* 2. Floating iPhone Frame (Overlaid on bottom-right when deviceType === 'both') */}
            {(deviceType === 'iphone' || deviceType === 'both') && (
              <div
                className={cn(
                  deviceType === 'both'
                    ? 'absolute -bottom-6 sm:-bottom-10 -right-4 sm:-right-8 w-44 sm:w-56 z-20 shadow-2xl rounded-[2.5rem] p-2 bg-neutral-900 border-2 border-neutral-700'
                    : 'max-w-xs mx-auto shadow-2xl rounded-[2.5rem] p-2.5 bg-neutral-900 border-2 border-neutral-700'
                )}
              >
                {/* Dynamic Island Pill */}
                <div className="w-16 h-3 rounded-full bg-black mx-auto mb-2" />

                {/* iPhone Screen */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[9/19] bg-neutral-950">
                  {mobileScreenshotUrl && !mobileScreenshotUrl.includes('photo-1563986768') ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={mobileScreenshotUrl}
                      alt="Mobile App Interface"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <MobileAppMockup />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges / Logos Footer */}
        {trustLogos.length > 0 && (
          <div className="mt-14 pt-8 border-t border-border/60">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Trusted by infrastructure engineers & finance teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {trustLogos.map((logo, idx) => (
                <span
                  key={idx}
                  className="text-sm sm:text-base font-bold text-muted-foreground/70 hover:text-foreground transition-colors"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function HeroDashboardMockup() {
  return (
    <div className="w-full h-full bg-neutral-950 text-white p-3 sm:p-5 flex flex-col justify-between text-left select-none overflow-hidden font-sans">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[11px] font-mono text-white/40 ml-2 hidden sm:inline">aether-cloud.edge.internal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Global Edge
          </span>
          <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">18ms TTFB</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Settlement Volume</div>
          <div className="text-sm sm:text-xl font-bold text-white mt-1">$4,892,100</div>
          <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">+38.4% vs last period</div>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Treasury Rails</div>
          <div className="text-sm sm:text-xl font-bold text-white mt-1">50+ Corridors</div>
          <div className="text-[10px] text-indigo-400 mt-0.5 font-medium">Airwallex T+0 Fast Track</div>
        </div>
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Edge Requests</div>
          <div className="text-sm sm:text-xl font-bold text-white mt-1">99.999% SLA</div>
          <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">Cloudflare + Vercel</div>
        </div>
      </div>

      {/* Center SVG Chart */}
      <div className="flex-1 min-h-[90px] sm:min-h-[130px] rounded-xl bg-white/[0.02] border border-white/5 p-2 sm:p-3 flex flex-col justify-between mb-3 relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
          <span className="font-semibold text-white/80">Cross-Border Autonomous Clearing Volume</span>
          <span className="text-[10px] text-primary font-bold">Interbank FX Spreads 0.2%</span>
        </div>
        <svg viewBox="0 0 600 120" className="w-full h-full max-h-[90px] text-primary" fill="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M0,100 Q80,95 120,70 T240,55 T360,35 T480,20 T600,10 L600,120 L0,120 Z" fill="url(#chartGrad)" />
          <path d="M0,100 Q80,95 120,70 T240,55 T360,35 T480,20 T600,10" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Activity Table snippet */}
      <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.03]">
        <div className="grid grid-cols-4 px-3 py-1.5 text-[10px] font-semibold text-white/40 border-b border-white/10 uppercase">
          <span>Counterparty</span>
          <span>Settlement Rail</span>
          <span>Amount</span>
          <span className="text-right">Status</span>
        </div>
        <div className="grid grid-cols-4 px-3 py-2 text-[11px] text-white/80 items-center">
          <span className="font-semibold text-white">Stripe Treasury SG</span>
          <span className="text-white/50 text-[10px]">FAST Clearing</span>
          <span className="font-bold text-white">$142,500.00</span>
          <span className="text-right"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">Settled (T+0)</span></span>
        </div>
      </div>
    </div>
  );
}

function MobileAppMockup() {
  return (
    <div className="w-full h-full bg-neutral-950 text-white p-3.5 flex flex-col justify-between text-left select-none overflow-hidden font-sans">
      <div className="flex items-center justify-between text-[10px] text-white/60 mb-2">
        <span className="font-bold">Aether Pay</span>
        <span className="text-emerald-400 font-semibold">• Active</span>
      </div>

      <div className="rounded-xl p-3 bg-gradient-to-br from-primary/30 to-purple-900/40 border border-primary/40 shadow-lg mb-2">
        <div className="text-[9px] text-white/60 uppercase tracking-wider font-semibold">Corporate Visa</div>
        <div className="text-sm font-black text-white mt-1">$48,250.00</div>
        <div className="text-[9px] text-white/50 mt-2 font-mono">•••• 8920</div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/5">
          <div>
            <div className="text-[10px] font-bold text-white">AWS Cloud Services</div>
            <div className="text-[8px] text-white/40">Infrastructure</div>
          </div>
          <div className="text-[10px] font-bold text-white">-$1,420</div>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04] border border-white/5">
          <div>
            <div className="text-[10px] font-bold text-white">Cloudflare Pages Edge</div>
            <div className="text-[8px] text-white/40">CDN Rail</div>
          </div>
          <div className="text-[10px] font-bold text-emerald-400">+$2,800</div>
        </div>
      </div>
    </div>
  );
}
