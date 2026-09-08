'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Check,
  Zap,
  Sparkles,
  Briefcase,
  ShieldCheck,
  Clock,
  Minus,
  HelpCircle,
} from 'lucide-react';
import type { CatalogItem, PricingTiersProps, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { Separator } from '@/site/ui/separator';
import { formatPrice } from '@/site/lib/format';
import { cn } from '@/site/lib/cn';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import {
  resolveArchetypeStyle,
  sectionPadding,
  cardClass,
  gridGap,
  dividerClass,
  ctaProps,
} from '@/site/archetypes';

/** Grid column class that adapts to 1–4 tiers. */
function gridColsClass(count: number): string {
  switch (count) {
    case 1:
      return 'md:grid-cols-1 max-w-md mx-auto';
    case 2:
      return 'md:grid-cols-2 max-w-3xl mx-auto';
    case 4:
      return 'md:grid-cols-2 lg:grid-cols-4';
    default:
      return 'md:grid-cols-3';
  }
}

/**
 * PricingTiers — packaged offering section supporting:
 * - `glow_card_deck`: 3 tiers with radial gradient glowing border on the featured/popular tier, annual/monthly toggle with discount badge ("Save 20%").
 * - `comparison_table`: Feature-by-feature matrix with checkmark columns, tooltips, and sticky header.
 * - `custom_quote_service`: Tiered B2B package boxes for high-ticket agencies with "What's Included" check pills.
 * - `default` (cards): Standard pricing cards.
 */
export default function PricingTiers({
  props,
  content,
}: {
  props: PricingTiersProps;
  content: SiteContent;
}) {
  if (!props.tiers?.length) return null;

  const {
    eyebrow = 'Transparent Investment',
    title = 'Packages Built For Your Scale',
    description = 'Clear pricing, full ownership of deliverables, and direct milestone guarantees with no hidden fees.',
    tiers,
    currency,
    ctaHref,
    variant,
    discountBadge = 'Save 20%',
    comparisonFeatures,
    footnote,
  } = props;

  const href = ctaHref ?? '/checkout';
  const s = resolveArchetypeStyle(content);
  const cta = ctaProps(s);
  const isAtelier = s.treatment === 'atelier';

  // Toggle state for Annual vs Monthly billing
  const [isAnnual, setIsAnnual] = useState(true);

  // Determine effective variant
  const effectiveVariant = variant ?? 'cards';

  /* =========================================================================
   * 1. GLOW CARD DECK (Glowing border on popular tier + Annual/Monthly toggle)
   * ========================================================================= */
  if (effectiveVariant === 'glow_card_deck') {
    return (
      <section id="offerings" className={cn(sectionPadding(s), 'bg-muted/30 border-y border-border relative')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-8 text-center max-w-3xl mx-auto"
          />

          {/* Annual / Monthly Toggle Switch */}
          <div className="flex items-center justify-center gap-3 mb-14">
            <span
              className={cn(
                'text-xs sm:text-sm font-semibold cursor-pointer transition-colors',
                !isAnnual ? 'text-foreground font-bold' : 'text-muted-foreground',
              )}
              onClick={() => setIsAnnual(false)}
            >
              Monthly billing
            </span>

            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden',
                isAnnual ? 'bg-primary' : 'bg-muted-foreground/30',
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block h-6 w-6 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out',
                  isAnnual ? 'translate-x-5' : 'translate-x-0',
                )}
              />
            </button>

            <span
              className={cn(
                'text-xs sm:text-sm font-semibold cursor-pointer transition-colors flex items-center gap-2',
                isAnnual ? 'text-foreground font-bold' : 'text-muted-foreground',
              )}
              onClick={() => setIsAnnual(true)}
            >
              <span>Annual billing</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {discountBadge}
              </span>
            </span>
          </div>

          {/* Glowing Card Deck Grid */}
          <div className={cn('grid grid-cols-1 items-stretch', gridColsClass(tiers.length), gridGap(s))}>
            {tiers.map((tier) => {
              const basePrice = tier.price;
              const calculatedPrice =
                basePrice === 0
                  ? 0
                  : isAnnual
                  ? Math.round(basePrice * 0.8)
                  : basePrice;

              const priceLabel =
                calculatedPrice === 0
                  ? 'Custom'
                  : formatPrice(calculatedPrice, tier.currency ?? currency ?? 'USD', {
                      unit: tier.priceUnit ?? (isAnnual ? '/mo billed annually' : '/mo'),
                    });

              return (
                <div
                  key={tier.id}
                  className={cn(
                    'relative rounded-2xl transition-all duration-300',
                    tier.popular
                      ? 'p-0.5 bg-gradient-to-b from-primary via-indigo-500 to-violet-500 shadow-2xl shadow-primary/25 scale-[1.02] z-10 before:absolute before:-inset-1 before:rounded-2xl before:bg-gradient-to-r before:from-primary/30 before:to-violet-500/30 before:blur-md before:-z-10'
                      : '',
                  )}
                >
                  <div
                    className={cn(
                      'h-full flex flex-col justify-between rounded-2xl bg-card p-6 sm:p-8 relative overflow-hidden',
                      !tier.popular && 'border border-border shadow-xs hover:shadow-md',
                      cardClass(s),
                    )}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground flex items-center gap-1.5 shadow-md shadow-primary/30">
                          <Zap className="h-3.5 w-3.5 fill-current" />
                          <span>Most Popular</span>
                        </span>
                      </div>
                    )}

                    {tier.badge && !tier.popular && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground border border-border">
                          {tier.badge}
                        </span>
                      </div>
                    )}

                    <div>
                      <div className="space-y-2">
                        <h3
                          className="text-xl sm:text-2xl font-bold text-foreground"
                          style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                        >
                          {tier.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[40px]">
                          {tier.description}
                        </p>
                      </div>

                      <div className="mt-6 mb-6">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                            {priceLabel}
                          </span>
                        </div>
                        {isAnnual && basePrice > 0 && (
                          <div className="text-[11px] text-muted-foreground mt-1">
                            Regular price{' '}
                            <span className="line-through">
                              {formatPrice(basePrice, tier.currency ?? currency ?? 'USD')}
                            </span>
                            /mo
                          </div>
                        )}
                      </div>

                      <Separator className={cn('mb-6', dividerClass(s))} />

                      <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                        {tier.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span className="leading-snug text-foreground/90">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-8">
                      <Button
                        asChild
                        size={cta.size}
                        className="w-full h-11 text-sm font-semibold shadow-sm"
                        variant={tier.popular ? 'default' : cta.variant}
                      >
                        <Link href={`${href}?tier=${encodeURIComponent(tier.id)}`}>
                          <span>Select {tier.name}</span>
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {footnote && (
            <p className="text-center text-xs text-muted-foreground mt-10 max-w-2xl mx-auto">
              {footnote}
            </p>
          )}
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 2. COMPARISON TABLE (Feature-by-feature matrix with sticky header)
   * ========================================================================= */
  if (effectiveVariant === 'comparison_table') {
    // Generate feature list from comparisonFeatures or aggregate from tiers
    const allFeatureNames: string[] = comparisonFeatures?.length
      ? comparisonFeatures.map((f) => f.feature)
      : Array.from(new Set(tiers.flatMap((t) => t.features)));

    return (
      <section id="offerings" className={cn(sectionPadding(s), 'bg-background')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-14 text-center max-w-3xl mx-auto"
          />

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full border-collapse text-left">
              {/* Sticky Header */}
              <thead className="sticky top-0 bg-card/95 backdrop-blur-md z-20 border-b border-border shadow-xs">
                <tr>
                  <th className="p-4 sm:p-6 text-sm font-bold text-foreground w-1/3 min-w-[200px]">
                    Features & Specifications
                  </th>
                  {tiers.map((tier) => {
                    const priceFormatted =
                      tier.price === 0
                        ? 'Custom'
                        : formatPrice(tier.price, tier.currency ?? currency ?? 'USD', {
                            unit: tier.priceUnit,
                          });
                    return (
                      <th
                        key={tier.id}
                        className={cn(
                          'p-4 sm:p-6 text-center min-w-[160px]',
                          tier.popular && 'bg-primary/5',
                        )}
                      >
                        <div className="space-y-1">
                          {tier.popular && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-1">
                              <Zap className="w-3 h-3" /> Popular
                            </span>
                          )}
                          <div className="text-base font-bold text-foreground">{tier.name}</div>
                          <div className="text-sm font-extrabold text-foreground">{priceFormatted}</div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* Body Matrix Rows */}
              <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
                {allFeatureNames.map((featureName, fIdx) => {
                  const compFeature = comparisonFeatures?.find((cf) => cf.feature === featureName);
                  return (
                    <tr
                      key={fIdx}
                      className={cn(
                        'hover:bg-muted/30 transition-colors',
                        fIdx % 2 === 0 ? 'bg-background' : 'bg-muted/10',
                      )}
                    >
                      <td className="p-4 sm:p-5 font-medium text-foreground flex items-center gap-2">
                        <span>{featureName}</span>
                        {compFeature?.tooltip && (
                          <span title={compFeature.tooltip} className="text-muted-foreground cursor-help">
                            <HelpCircle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>

                      {tiers.map((tier) => {
                        let hasFeature: boolean | string = tier.features.includes(featureName);

                        if (compFeature?.tierValues) {
                          const customVal =
                            compFeature.tierValues[tier.id] ?? compFeature.tierValues[tier.name.toLowerCase()];
                          if (customVal !== undefined) {
                            hasFeature = customVal;
                          }
                        }

                        return (
                          <td
                            key={tier.id}
                            className={cn(
                              'p-4 sm:p-5 text-center',
                              tier.popular && 'bg-primary/5',
                            )}
                          >
                            {typeof hasFeature === 'string' ? (
                              <span className="font-semibold text-foreground">{hasFeature}</span>
                            ) : hasFeature ? (
                              <div className="flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                                  <Check className="w-4 h-4" />
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center text-muted-foreground/40">
                                <Minus className="w-4 h-4" />
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {/* Bottom CTA Action Row */}
                <tr className="bg-muted/20 border-t border-border">
                  <td className="p-4 sm:p-6 text-sm font-semibold text-muted-foreground">
                    Ready to deploy?
                  </td>
                  {tiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={cn('p-4 sm:p-6 text-center', tier.popular && 'bg-primary/5')}
                    >
                      <Button
                        asChild
                        size="sm"
                        className="w-full text-xs font-semibold"
                        variant={tier.popular ? 'default' : 'outline'}
                      >
                        <Link href={`${href}?tier=${encodeURIComponent(tier.id)}`}>
                          <span>Select {tier.name}</span>
                        </Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 3. CUSTOM QUOTE SERVICE (Tiered B2B package boxes with check pills)
   * ========================================================================= */
  if (effectiveVariant === 'custom_quote_service') {
    return (
      <section id="offerings" className={cn(sectionPadding(s), 'bg-muted/30 border-y border-border')}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={s.headerAlign}
            className="mb-14"
          />

          <div className={cn('grid grid-cols-1 items-stretch', gridColsClass(tiers.length), gridGap(s))}>
            {tiers.map((tier) => {
              const priceLabel =
                tier.price === 0
                  ? 'Custom Scope'
                  : formatPrice(tier.price, tier.currency ?? currency ?? 'USD', {
                      unit: tier.priceUnit ?? '/engagement',
                    });

              return (
                <div
                  key={tier.id}
                  className={cn(
                    'flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden',
                    cardClass(s),
                    tier.popular && 'border-primary shadow-lg shadow-primary/10',
                  )}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        {tier.badge && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground border border-border">
                            {tier.badge}
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-xl sm:text-2xl font-bold text-foreground"
                        style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                      >
                        {tier.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[38px]">
                        {tier.description}
                      </p>
                    </div>

                    {/* Price / Retainer Tag */}
                    <div className="p-4 rounded-xl bg-muted/40 border border-border">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Investment Framework
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
                        {priceLabel}
                      </div>
                    </div>

                    {/* What's Included Check Pills */}
                    <div className="space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span>Included Scope & Deliverables</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tier.features.map((feature, fIdx) => (
                          <span
                            key={fIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-foreground border border-border/80 shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{feature}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-8 mt-6 border-t border-border/60">
                    <Button
                      asChild
                      size={cta.size}
                      className="w-full h-11 text-sm font-semibold shadow-xs"
                      variant={tier.popular ? 'default' : cta.variant}
                    >
                      <Link href={`${href}?tier=${encodeURIComponent(tier.id)}`}>
                        <span>Request Bespoke Proposal</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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
   * 4. DEFAULT (Standard Pricing Cards)
   * ========================================================================= */
  return (
    <section id="offerings" className={cn(sectionPadding(s), 'bg-muted/30 border-y border-border')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={s.treatment}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={s.headerAlign}
          className="mb-16"
        />

        <div className={cn('grid grid-cols-1 items-stretch', gridColsClass(tiers.length), gridGap(s))}>
          {tiers.map((tier) => {
            const priceLabel =
              tier.price === 0
                ? 'Custom'
                : formatPrice(tier.price, tier.currency ?? currency ?? 'USD', {
                    unit: tier.priceUnit,
                  });

            return (
              <div
                key={tier.id}
                className={cn(
                  'flex flex-col justify-between relative rounded-2xl border border-border bg-card shadow-xs hover:shadow-md transition-shadow',
                  cardClass(s),
                  tier.popular && 'border-primary',
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-0.5 rounded-md text-xs font-bold bg-primary text-primary-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3 fill-current" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}
                {tier.badge && !tier.popular && (
                  <div className="absolute -top-3 right-4">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-accent text-accent-foreground border border-border">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 pb-4">
                  <h3
                    className="text-xl font-bold text-foreground"
                    style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[36px]">
                    {tier.description}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                      {priceLabel}
                    </span>
                  </div>
                </div>

                <div className="flex-1 px-6 pb-4">
                  <Separator className={cn('mb-4', dividerClass(s))} />
                  <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                    {tier.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-4">
                  <Button
                    asChild
                    size={cta.size}
                    className="w-full h-11 text-sm font-semibold shadow-xs"
                    variant={tier.popular ? 'default' : cta.variant}
                  >
                    <Link href={`${href}?tier=${encodeURIComponent(tier.id)}`}>
                      <span>Select {tier.name}</span>
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

