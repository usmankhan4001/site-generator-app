'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowRight, CheckCircle2, Sparkles, ChevronRight, Layers } from 'lucide-react';
import type { FeatureGridProps, FeatureGridItem, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { cn } from '@/site/lib/cn';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import {
  resolveArchetypeStyle,
  sectionPadding,
  cardClass,
  gridGap,
  imageWrapClass,
  dividerClass,
  ctaProps,
} from '@/site/archetypes';

/** Helper to resolve icon from lucide-react dynamically or fallback */
function getIcon(name?: string) {
  if (name && (Icons as any)[name]) {
    return (Icons as any)[name];
  }
  return Sparkles;
}

/** Grid column class that adapts to the item count for standard layout. */
function gridColsClass(count: number, customCols?: number): string {
  if (customCols) {
    switch (customCols) {
      case 1:
        return 'md:grid-cols-1 max-w-xl mx-auto';
      case 2:
        return 'md:grid-cols-2';
      case 4:
        return 'md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'md:grid-cols-3';
    }
  }
  switch (count) {
    case 1:
      return 'md:grid-cols-1 max-w-xl mx-auto';
    case 2:
      return 'md:grid-cols-2';
    case 4:
      return 'md:grid-cols-2 lg:grid-cols-4';
    default:
      return 'md:grid-cols-3';
  }
}

/**
 * FeatureGrid — capability grid supporting:
 * - `asymmetric_bento`: 1 large 2x2 featured box with mockup preview + 2 vertically stacked 1x1 feature cards with tags and icons.
 * - `sticky_scroll`: Left column locks sticky while right column scrolls through detailed feature cards with photos and bullet points.
 * - `tabbed_showcase`: Interactive pill tabs on top that dynamically switch the active showcase panel with state.
 * - `zigzag_rows`: Alternating Z-pattern rows with large visual on left/right + detailed checklist.
 * - `default` (even): Standard card grid.
 */
export default function FeatureGrid({
  props,
  content,
}: {
  props: FeatureGridProps;
  content: SiteContent;
}) {
  if (!props.items?.length) return null;

  const {
    eyebrow = 'Engineered Capabilities',
    title = 'Designed for Speed, Security & Precision',
    description = 'Explore our purpose-built technical foundations engineered to deliver unmatched reliability and performance.',
    items,
    variant,
    tabs,
    columns,
  } = props;

  const s = resolveArchetypeStyle(content);
  const isAtelier = s.treatment === 'atelier';
  const ctaBtn = ctaProps(s);

  // Tabbed state for tabbed_showcase
  const defaultTabs = tabs?.length
    ? tabs
    : items.slice(0, 3).map((item, idx) => ({
        id: item.id || `tab-${idx}`,
        label:
          idx === 0
            ? 'For Enterprises'
            : idx === 1
            ? 'For Scaleups'
            : 'For Startups',
        tag: item.tag || item.category,
      }));

  const [activeTabIdx, setActiveTabIdx] = useState(0);

  // Resolve layout mode
  const effectiveVariant = variant ?? (s.grid === 'stagger' ? 'zigzag_rows' : s.grid === 'asymmetric' ? 'asymmetric_bento' : 'even');

  /* =========================================================================
   * 1. TABBED SHOWCASE
   * ========================================================================= */
  if (effectiveVariant === 'tabbed_showcase') {
    const activeItem = items[activeTabIdx] ?? items[0];
    const ActiveIcon = getIcon(activeItem?.icon);

    return (
      <section id="features" className={sectionPadding(s)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-10 md:mb-14 text-center max-w-3xl mx-auto"
          />

          {/* Interactive Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {defaultTabs.map((tab, idx) => {
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={tab.id || idx}
                  type="button"
                  onClick={() => setActiveTabIdx(idx)}
                  className={cn(
                    'relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer flex items-center gap-2',
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]'
                      : 'bg-card text-muted-foreground border-border hover:text-foreground hover:bg-muted/60',
                  )}
                >
                  <span>{tab.label}</span>
                  {tab.tag && (
                    <span
                      className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider',
                        isActive
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {tab.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Showcase Panel */}
          {activeItem && (
            <div
              className={cn(
                'overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10 lg:p-12 shadow-xl shadow-foreground/5 transition-all duration-300',
                cardClass(s),
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Visual / Mockup Preview */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="relative rounded-xl overflow-hidden border border-border/70 bg-muted/40 shadow-inner group">
                    {/* Window Controls Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-muted/80 border-b border-border/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground truncate max-w-[200px]">
                        {activeItem.title.toLowerCase().replace(/\s+/g, '-')}.app
                      </span>
                      <div className="w-8" />
                    </div>

                    {activeItem.image ? (
                      <div className="relative aspect-16/10 overflow-hidden bg-muted">
                        <img
                          src={activeItem.image}
                          alt={activeItem.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {activeItem.badge && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-background/95 text-foreground backdrop-blur-md rounded-md shadow-md border border-border/80">
                              {activeItem.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-16/10 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted/20 to-primary/5">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-sm">
                          <ActiveIcon className="w-10 h-10" />
                        </div>
                        <p className="text-sm font-semibold text-foreground/80 max-w-sm text-center">
                          {activeItem.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-lg bg-primary/10 text-primary">
                        <ActiveIcon className="w-5 h-5" />
                      </span>
                      {activeItem.badge && (
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          {activeItem.badge}
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-tight"
                      style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                    >
                      {activeItem.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Bullets / Highlights */}
                  {(activeItem.bullets || activeItem.highlights) && (
                    <ul className="space-y-2.5 pt-2 border-t border-border/60">
                      {(activeItem.bullets || activeItem.highlights)?.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Stat or CTA */}
                  <div className="pt-4 flex items-center gap-4">
                    {activeItem.stat ? (
                      <div className="p-4 rounded-xl bg-muted/50 border border-border flex-1">
                        <div className="text-2xl font-bold text-foreground">{activeItem.stat}</div>
                        {activeItem.statLabel && (
                          <div className="text-xs text-muted-foreground">{activeItem.statLabel}</div>
                        )}
                      </div>
                    ) : null}

                    {activeItem.cta ? (
                      <Button asChild size={ctaBtn.size} variant={ctaBtn.variant}>
                        <Link href={activeItem.cta.href}>
                          <span>{activeItem.cta.label}</span>
                          <ArrowRight className="ml-1.5 w-4 h-4" />
                        </Link>
                      </Button>
                    ) : (
                      <Button asChild size={ctaBtn.size} variant="default">
                        <Link href="/contact">
                          <span>Explore Solution</span>
                          <ArrowRight className="ml-1.5 w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 2. ASYMMETRIC BENTO GRID
   * ========================================================================= */
  if (effectiveVariant === 'asymmetric_bento') {
    const featured = items[0];
    const sideItems = items.slice(1, 3);
    const restItems = items.slice(3);
    const FeaturedIcon = getIcon(featured?.icon);

    return (
      <section id="features" className={sectionPadding(s)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={s.headerAlign}
            className="mb-14"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* 1 Large 2x2 Featured Box with Mockup Preview */}
            {featured && (
              <div
                className={cn(
                  'lg:col-span-2 lg:row-span-2 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow group',
                  cardClass(s),
                )}
              >
                {/* Mockup Preview Area */}
                <div className="relative overflow-hidden bg-muted/50 border-b border-border/80">
                  {/* Mockup Window Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-background/80 backdrop-blur-xs border-b border-border/50">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground/80">
                      feature-preview.dashboard
                    </span>
                    <div className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-muted-foreground/60" />
                    </div>
                  </div>

                  {featured.image ? (
                    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {featured.badge && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-md text-xs font-semibold bg-background/90 text-foreground backdrop-blur-sm border border-border/60 shadow-xs">
                            {featured.badge}
                          </span>
                        </div>
                      )}
                      {featured.tag && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground shadow-xs">
                            {featured.tag}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-64 sm:h-80 md:h-96 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted/30 via-background to-primary/10">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xs mb-4">
                        <FeaturedIcon className="w-10 h-10" />
                      </div>
                      <span className="text-sm font-semibold text-foreground/80">{featured.title}</span>
                    </div>
                  )}
                </div>

                {/* Content info */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <FeaturedIcon className="w-5 h-5" />
                    </div>
                    <div>
                      {featured.category && (
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {featured.category}
                        </span>
                      )}
                      <h3
                        className="text-xl sm:text-2xl font-bold text-foreground tracking-tight"
                        style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                      >
                        {featured.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {featured.description}
                  </p>

                  {(featured.bullets || featured.highlights) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {(featured.bullets || featured.highlights)?.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/85">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2 Vertically Stacked 1x1 Feature Cards with Tags & Icons */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {sideItems.map((item, idx) => {
                const SideIcon = getIcon(item.icon);
                return (
                  <div
                    key={idx}
                    className={cn(
                      'flex-1 flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border bg-card shadow-xs hover:shadow-md transition-all group',
                      cardClass(s),
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <SideIcon className="w-6 h-6" />
                        </div>
                        {item.tag || item.badge ? (
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-accent text-accent-foreground border border-border/60">
                            {item.tag || item.badge}
                          </span>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <h4
                          className="text-lg font-bold text-foreground leading-snug"
                          style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                        >
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {(item.bullets || item.stat) && (
                      <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
                        {item.stat && (
                          <span className="text-xs font-semibold text-foreground">
                            {item.stat} {item.statLabel ? `• ${item.statLabel}` : ''}
                          </span>
                        )}
                        {item.cta && (
                          <Link
                            href={item.cta.href}
                            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                          >
                            <span>{item.cta.label}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Any remaining items in a 3-col grid */}
          {restItems.length > 0 && (
            <div className={cn('grid grid-cols-1 md:grid-cols-3 mt-6 lg:mt-8', gridGap(s))}>
              {restItems.map((item, idx) => {
                const Icon = getIcon(item.icon);
                return (
                  <div
                    key={idx}
                    className={cn('p-6 rounded-2xl border border-border bg-card space-y-3', cardClass(s))}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 3. STICKY SCROLL
   * ========================================================================= */
  if (effectiveVariant === 'sticky_scroll') {
    return (
      <section id="features" className={sectionPadding(s)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column Locks Sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <SectionHeader
                system={s.treatment}
                eyebrow={eyebrow}
                title={title}
                description={description}
                align="start"
                className="mb-6"
              />

              <div className="p-6 rounded-2xl bg-muted/40 border border-border space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Platform Advantage</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Every feature is modularly engineered to guarantee enterprise uptime, sub-millisecond execution, and regulatory compliance.
                </p>
                <Button asChild size={ctaBtn.size} variant="default" className="w-full">
                  <Link href="/contact">
                    <span>Schedule Technical Demo</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column Scrolls Through Detailed Feature Cards */}
            <div className="lg:col-span-7 space-y-8">
              {items.map((feature, idx) => {
                const Icon = getIcon(feature.icon);
                const bulletList = feature.bullets || feature.highlights || [
                  'Production-grade reliability & uptime guarantees',
                  'Instant API connectivity and end-to-end telemetry',
                  'Automated compliance checks and audit-ready logging',
                ];

                return (
                  <div
                    key={idx}
                    className={cn(
                      'overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all p-6 sm:p-8 space-y-6',
                      cardClass(s),
                    )}
                  >
                    {feature.image && (
                      <div className={cn('overflow-hidden rounded-xl relative bg-muted h-52 sm:h-64', imageWrapClass(s))}>
                        <img
                          src={feature.image}
                          alt={feature.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        {feature.badge && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 text-foreground backdrop-blur-sm border border-border/60">
                              {feature.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        {feature.tag && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent text-accent-foreground border border-border/50">
                            {feature.tag}
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-bold text-foreground tracking-tight"
                        style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                      >
                        {feature.title}
                      </h3>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Photo / Checklist Bullet Points */}
                    <div className="pt-4 border-t border-border/60">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                        Key Capabilities & Deliverables
                      </h4>
                      <ul className="space-y-2.5">
                        {bulletList.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 4. ZIGZAG ROWS (Alternating Z-Pattern with Large Visuals & Checklists)
   * ========================================================================= */
  if (effectiveVariant === 'zigzag_rows' || effectiveVariant === 'stagger') {
    return (
      <section id="features" className={sectionPadding(s)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={s.headerAlign}
            className="mb-16 md:mb-24"
          />

          <div className="space-y-16 md:space-y-28">
            {items.map((feature, idx) => {
              const isReversed = idx % 2 === 1;
              const Icon = getIcon(feature.icon);
              const checklist = feature.bullets || feature.highlights || [
                'Full regulatory alignment & verified integrity guarantees',
                'Modular architectural scale designed for low latency',
                'Comprehensive telemetry with unified dashboard visibility',
              ];

              return (
                <div
                  key={idx}
                  className={cn(
                    'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center',
                    idx > 0 && dividerClass(s) && cn('pt-16 md:pt-28', dividerClass(s)),
                  )}
                >
                  {/* Visual Side */}
                  <div
                    className={cn(
                      'lg:col-span-7',
                      isReversed && 'lg:order-2',
                    )}
                  >
                    {feature.image ? (
                      <div className={cn('overflow-hidden rounded-2xl relative shadow-lg bg-muted', imageWrapClass(s))}>
                        <img
                          src={feature.image}
                          alt={feature.title}
                          loading="lazy"
                          className="w-full h-auto aspect-16/10 object-cover"
                        />
                        {feature.badge && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-background/90 text-foreground backdrop-blur-sm border border-border/50 rounded-md">
                              {feature.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-16/10 rounded-2xl flex flex-col items-center justify-center bg-muted/40 border border-border relative p-8">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                          <Icon className="h-10 w-10" />
                        </div>
                        <span className="text-sm font-semibold text-foreground/80">{feature.title}</span>
                        {feature.badge && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-background/90 text-foreground border border-border/50 rounded-md">
                              {feature.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Text & Checklist Side */}
                  <div
                    className={cn(
                      'lg:col-span-5 space-y-6',
                      isReversed && 'lg:order-1',
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        {feature.badge && (
                          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                            {feature.badge}
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-snug"
                        style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Detailed Checklist */}
                    <div className="pt-2">
                      <ul className="space-y-3">
                        {checklist.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3 text-sm sm:text-base text-foreground/90">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {feature.cta && (
                      <div className="pt-2">
                        <Button asChild size="default" variant="outline">
                          <Link href={feature.cta.href}>
                            <span>{feature.cta.label}</span>
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 5. DEFAULT / EVEN CARD GRID
   * ========================================================================= */
  return (
    <section id="features" className={sectionPadding(s)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={s.treatment}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={s.headerAlign}
          className="mb-16"
        />

        <div className={cn('grid grid-cols-1', gridColsClass(items.length, columns), gridGap(s))}>
          {items.map((feature, idx) => {
            const Icon = getIcon(feature.icon);

            return (
              <div
                key={idx}
                className={cn('flex flex-col overflow-hidden group rounded-2xl border border-border bg-card shadow-xs hover:shadow-md transition-shadow', cardClass(s))}
              >
                {feature.image ? (
                  <div className={cn('h-52 sm:h-56 overflow-hidden relative bg-muted', imageWrapClass(s))}>
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {feature.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 text-foreground backdrop-blur-sm shadow-xs border border-border/50">
                          {feature.badge}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-52 sm:h-56 flex items-center justify-center bg-muted/40 relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-8 w-8" />
                    </div>
                    {feature.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 text-foreground shadow-xs border border-border/50">
                          {feature.badge}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex-1 flex flex-col p-6 pt-5">
                  <div className="space-y-2">
                    <h3
                      className="text-lg font-bold text-foreground leading-snug"
                      style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
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

