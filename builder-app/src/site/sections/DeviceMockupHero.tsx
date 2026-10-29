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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-6 animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            {badge}
          </div>
        )}

        {/* Section Heading */}
        {(title || eyebrow || description) && (
          <SectionHeader
            system={style.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-8 max-w-3xl mx-auto"
          />
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            {primaryCta && (
              <Button asChild size="lg" className="gap-2 h-12 px-6 font-bold shadow-lg shadow-primary/20">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild variant="outline" size="lg" className="h-12 px-6">
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshotUrl}
                    alt={title || 'Product Dashboard UI'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mobileScreenshotUrl}
                    alt="Mobile App Interface"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
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
