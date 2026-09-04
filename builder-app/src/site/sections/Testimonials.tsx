'use client';

import { Star, ShieldCheck, CheckCircle2, TrendingUp, Quote } from 'lucide-react';
import type { Testimonial, TestimonialsProps, SiteContent } from '@/site/schema';
import { cn } from '@/site/lib/cn';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import {
  resolveArchetypeStyle,
  sectionPadding,
  cardClass,
  gridGap,
  dividerClass,
} from '@/site/archetypes';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join('');
  return letters || '—';
}

/** Layout class: centre a single quote, pair two, grid three or more. */
function layoutClass(count: number, customCols?: number): string {
  if (customCols) {
    switch (customCols) {
      case 1:
        return 'max-w-2xl mx-auto';
      case 2:
        return 'md:grid-cols-2 max-w-5xl mx-auto';
      case 4:
        return 'md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'md:grid-cols-2 lg:grid-cols-3';
    }
  }
  if (count === 1) return 'max-w-2xl mx-auto';
  if (count === 2) return 'md:grid-cols-2 max-w-5xl mx-auto';
  return 'md:grid-cols-2 lg:grid-cols-3';
}

/** Star rating row renderer */
function StarRating({ rating = 5, className }: { rating?: number; className?: string }) {
  const count = Math.max(1, Math.min(5, Math.round(rating)));
  return (
    <div className={cn('flex items-center gap-1 text-amber-500', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-4 h-4',
            i < count ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30 fill-none',
          )}
        />
      ))}
    </div>
  );
}

/** Single testimonial card component used across multiple layouts */
function TestimonialCard({
  item,
  s,
  isAtelier,
  showVerified = false,
  compact = false,
}: {
  item: Testimonial;
  s: any;
  isAtelier: boolean;
  showVerified?: boolean;
  compact?: boolean;
}) {
  const meta = [item.role, item.company].filter(Boolean).join(', ');

  return (
    <div
      className={cn(
        'flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-xs hover:shadow-md transition-all relative overflow-hidden',
        cardClass(s),
        compact && 'w-80 sm:w-96 shrink-0',
      )}
    >
      <div className="space-y-4">
        {/* Top bar with stars & optional verified tag */}
        <div className="flex items-center justify-between">
          <StarRating rating={item.rating ?? 5} />
          {showVerified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              <span>Verified Customer</span>
            </span>
          )}
        </div>

        <blockquote className="text-sm sm:text-base text-foreground leading-relaxed italic">
          &ldquo;{item.text}&rdquo;
        </blockquote>
      </div>

      {/* Author details */}
      <div className="flex items-center gap-3.5 pt-4 mt-4 border-t border-border/70">
        {item.avatar ? (
          <img
            src={item.avatar}
            alt={item.name}
            loading="lazy"
            className="w-11 h-11 rounded-full object-cover border border-border shadow-xs shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-border shrink-0">
            {initials(item.name)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-foreground truncate">{item.name}</div>
          {meta && <div className="text-xs text-muted-foreground font-medium truncate">{meta}</div>}
        </div>
      </div>
    </div>
  );
}

/**
 * Testimonials — social proof section supporting:
 * - `infinite_marquee`: CSS marquee continuous ticker with dual rows scrolling in opposite directions and smooth edge fade masks.
 * - `editorial_pullquote`: Single prominent 32px italicized serif quote from a founder/client with portrait photo and key metric.
 * - `rating_masonry`: Trustpilot/Google review score header (★ 4.9/5) + 3-column card masonry with star badges and verified customer tags.
 * - `default` (cards): Standard testimonial cards.
 */
export default function Testimonials({
  props,
  content,
}: {
  props: TestimonialsProps;
  content: SiteContent;
}) {
  if (!props.items?.length) return null;

  const {
    eyebrow = 'Client Validation',
    title = 'Trusted by Forward-Thinking Leaders',
    description,
    items,
    variant,
    columns,
    statsSummary,
  } = props;

  const s = resolveArchetypeStyle(content);
  const isAtelier = s.treatment === 'atelier';

  // Determine effective variant
  const effectiveVariant =
    variant ??
    (s.grid === 'stagger' ? 'editorial_pullquote' : 'cards');

  /* =========================================================================
   * 1. INFINITE MARQUEE (Dual rows moving left/right with fade mask)
   * ========================================================================= */
  if (effectiveVariant === 'infinite_marquee' || effectiveVariant === 'marquee_ticker') {
    // Split items into 2 rows, duplicate for seamless infinite loop
    const half = Math.ceil(items.length / 2);
    const row1Source = items.slice(0, Math.max(half, 2));
    const row2Source = items.length > 2 ? items.slice(half) : items;

    // Duplicate arrays 3 times to ensure sufficient width for infinite looping
    const row1 = [...row1Source, ...row1Source, ...row1Source, ...row1Source];
    const row2 = [...row2Source, ...row2Source, ...row2Source, ...row2Source];

    return (
      <section id="testimonials" className={cn(sectionPadding(s), 'overflow-hidden')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="text-center max-w-3xl mx-auto"
          />
        </div>

        {/* Marquee Container with Edge Fade Masks */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Top Row — Left Scrolling */}
          <div className="flex gap-6 pb-6 animate-marquee-left">
            {row1.map((item, idx) => (
              <TestimonialCard
                key={`row1-${idx}`}
                item={item}
                s={s}
                isAtelier={isAtelier}
                showVerified
                compact
              />
            ))}
          </div>

          {/* Bottom Row — Right Scrolling */}
          <div className="flex gap-6 animate-marquee-right">
            {row2.map((item, idx) => (
              <TestimonialCard
                key={`row2-${idx}`}
                item={item}
                s={s}
                isAtelier={isAtelier}
                showVerified
                compact
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 2. EDITORIAL PULLQUOTE (Single prominent 32px italicized serif quote)
   * ========================================================================= */
  if (
    effectiveVariant === 'editorial_pullquote' ||
    effectiveVariant === 'editorial_center' ||
    effectiveVariant === 'stagger'
  ) {
    const featured = items[0];
    const meta = [featured.role, featured.company].filter(Boolean).join(', ');
    const metricValue = featured.metric || '99.98%';
    const metricLabel = featured.metricLabel || 'Execution & Reliability Rate';

    return (
      <section id="testimonials" className={cn(sectionPadding(s), 'bg-muted/20 border-y border-border/60')}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-12 md:mb-16 text-center"
          />

          <figure className="relative text-center max-w-4xl mx-auto">
            {/* Ambient Quote Symbol */}
            <div
              className="text-6xl sm:text-7xl md:text-8xl text-primary/30 font-serif leading-none select-none mb-2"
              aria-hidden
            >
              &ldquo;
            </div>

            {/* 32px Italicized Serif Quote */}
            <blockquote className="relative px-2 sm:px-6">
              <p
                className="text-2xl sm:text-3xl md:text-[32px] text-foreground font-serif italic font-normal leading-relaxed tracking-tight"
                style={{ fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {featured.text}
              </p>
            </blockquote>

            {/* Founder/Client portrait + Key Metric */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-8 border-t border-border/80">
              {/* Profile */}
              <figcaption className="flex items-center gap-4 text-left">
                {featured.avatar ? (
                  <img
                    src={featured.avatar}
                    alt={featured.name}
                    loading="lazy"
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 shadow-md shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold border border-border shrink-0">
                    {initials(featured.name)}
                  </div>
                )}
                <div>
                  <div className="text-lg font-bold text-foreground">{featured.name}</div>
                  {meta && <div className="text-sm text-muted-foreground">{meta}</div>}
                  {featured.location && (
                    <div className="text-xs text-muted-foreground/80">{featured.location}</div>
                  )}
                </div>
              </figcaption>

              {/* Key Metric Callout */}
              <div className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-card border border-border shadow-xs text-left">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-foreground tracking-tight leading-none">
                    {metricValue}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">
                    {metricLabel}
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 3. RATING MASONRY (Trustpilot/Google header + 3-col star masonry)
   * ========================================================================= */
  if (effectiveVariant === 'rating_masonry') {
    const avgRating = statsSummary?.averageRating ?? 4.9;
    const totalReviews = statsSummary?.totalReviews ?? 520;
    const satisfactionRate = statsSummary?.satisfactionRate ?? '99.4%';

    return (
      <section id="testimonials" className={sectionPadding(s)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="text-center max-w-3xl mx-auto mb-8"
          />

          {/* Trustpilot / Google Review Score Header */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-14 p-4 sm:p-6 rounded-2xl bg-muted/40 border border-border max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-lg font-bold text-foreground">
                ★ {avgRating.toFixed(1)} / 5.0
              </span>
            </div>

            <div className="h-4 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold text-foreground">{totalReviews}+</span> Verified Client Reviews
            </div>

            <div className="h-4 w-px bg-border hidden sm:block" />

            <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {satisfactionRate} Satisfaction
            </div>
          </div>

          {/* 3-Column Card Masonry with Star Badges and Verified Tags */}
          <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', gridGap(s))}>
            {items.map((item, idx) => (
              <TestimonialCard
                key={idx}
                item={item}
                s={s}
                isAtelier={isAtelier}
                showVerified={true}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 4. DEFAULT (Cards Grid)
   * ========================================================================= */
  return (
    <section id="testimonials" className={sectionPadding(s)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={s.treatment}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={s.headerAlign}
          className="mb-16"
        />

        <div className={cn('grid grid-cols-1', layoutClass(items.length, columns), gridGap(s))}>
          {items.map((item, idx) => (
            <TestimonialCard
              key={idx}
              item={item}
              s={s}
              isAtelier={isAtelier}
              showVerified={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

