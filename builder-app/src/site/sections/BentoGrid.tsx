'use client';

import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import type { BentoGridProps, BentoTile, BentoGridVariant, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

function getTileIcon(name?: string) {
  if (name && (Icons as any)[name]) {
    return (Icons as any)[name];
  }
  return Sparkles;
}

function getVariantCardClass(variant: BentoGridVariant = 'modern'): string {
  switch (variant) {
    case 'minimal':
      return 'card-elevated bg-card text-card-foreground border border-border/70 hover:border-foreground/30 transition-all duration-300';
    case 'glass':
      return 'card-elevated bg-card/60 backdrop-blur-xl text-card-foreground border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl hover:bg-card/75 transition-all duration-300';
    case 'luxury':
      return 'card-elevated bg-gradient-to-b from-amber-500/[0.05] via-card to-card text-card-foreground border border-amber-500/30 hover:border-amber-500/70 shadow-md shadow-amber-500/5 hover:shadow-amber-500/10 transition-all duration-300';
    case 'modern':
    default:
      return 'card-elevated bg-card/80 backdrop-blur-md text-card-foreground border border-border/80 hover:border-primary/50 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300';
  }
}

export default function BentoGrid({
  props,
  content,
}: {
  props: BentoGridProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    variant = 'modern',
    items = [],
    spotlightCard: customSpotlight,
    featureCards: customFeatures,
    metricBadges: customBadges,
  } = props;

  const style = resolveArchetypeStyle(content);
  const variantClass = getVariantCardClass(variant);

  // Decompose tiles into spotlight, features, and metric badges
  const spotlight = customSpotlight || items.find((i) => i.size === 'large') || items[0];
  const remaining = items.filter((i) => i !== spotlight);
  const features =
    customFeatures ||
    (remaining.filter((i) => i.size === 'medium').length > 0
      ? remaining.filter((i) => i.size === 'medium')
      : remaining.slice(0, 2));
  const badges =
    customBadges ||
    (remaining.filter((i) => i.size === 'badge').length > 0
      ? remaining.filter((i) => i.size === 'badge')
      : remaining.slice(2, 4));

  if (!spotlight && features.length === 0 && badges.length === 0) {
    return null;
  }

  const SpotlightIcon = getTileIcon(spotlight?.icon);

  return (
    <section className={cn(sectionPadding(style), 'relative overflow-hidden bg-background')}>
      {/* Background ambient decorative glow for modern variant */}
      {variant === 'modern' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <SectionHeader
            system={style.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="start"
            className="mb-12 lg:mb-16"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 1. Large Spotlight Card (Left 2 cols on lg, or 2 rows tall) */}
          {spotlight && (
            <div
              className={cn(
                'group relative rounded-2xl p-8 lg:p-10 flex flex-col justify-between overflow-hidden lg:col-span-2 lg:row-span-2',
                variantClass,
                'hover:-translate-y-1'
              )}
            >
              {/* Subtle radial glow inside card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-50"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    {spotlight.tag && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20">
                        {spotlight.tag}
                      </span>
                    )}
                    {spotlight.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        {spotlight.badge}
                      </span>
                    )}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                    <SpotlightIcon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
                  {spotlight.title}
                </h3>
                {spotlight.description && (
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
                    {spotlight.description}
                  </p>
                )}
              </div>

              {/* Spotlight Visual & Metric Highlight */}
              <div className="relative z-10 pt-6 mt-6 border-t border-border/50">
                {spotlight.metric && (
                  <div className="mb-6">
                    <div className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                      {spotlight.metric}
                    </div>
                    {spotlight.metricLabel && (
                      <div className="text-sm font-medium text-muted-foreground mt-1">
                        {spotlight.metricLabel}
                      </div>
                    )}
                  </div>
                )}

                {spotlight.image && (
                  <div className="relative rounded-xl overflow-hidden border border-border/60 aspect-[16/9] mb-6 shadow-md bg-muted/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={spotlight.image}
                      alt={spotlight.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                {spotlight.ctaLabel && spotlight.ctaHref && (
                  <div className="flex items-center">
                    <Button asChild variant="default" size="default" className="gap-2">
                      <Link href={spotlight.ctaHref}>
                        {spotlight.ctaLabel}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. Medium Feature Cards (Right Column Top & Middle) */}
          {features.map((feat, idx) => {
            const FeatIcon = getTileIcon(feat.icon);
            return (
              <div
                key={feat.id || `feature-${idx}`}
                className={cn(
                  'group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden',
                  variantClass,
                  'hover:-translate-y-1'
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {feat.badge ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                        {feat.badge}
                      </span>
                    ) : (
                      <span />
                    )}
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                      <FeatIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold tracking-tight text-foreground mb-2">
                    {feat.title}
                  </h4>
                  {feat.description && (
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  )}
                </div>

                {feat.metric && (
                  <div className="mt-6 pt-4 border-t border-border/40">
                    <div className="text-2xl font-bold text-foreground">{feat.metric}</div>
                    {feat.metricLabel && (
                      <div className="text-xs text-muted-foreground mt-0.5">{feat.metricLabel}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* 3. Compact Metric Badges (Bottom row / grid filling) */}
          {badges.map((badge, idx) => {
            const BadgeIcon = getTileIcon(badge.icon);
            return (
              <div
                key={badge.id || `badge-${idx}`}
                className={cn(
                  'group relative rounded-2xl p-6 flex flex-col justify-center overflow-hidden',
                  variantClass,
                  'hover:-translate-y-1'
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform">
                    <BadgeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                      {badge.metric || badge.title}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
                      {badge.metricLabel || badge.description || badge.title}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
