import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import type { PricingTiersProps, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { Separator } from '@/site/ui/separator';
import { formatPrice } from '@/site/lib/format';
import { cn } from '@/site/lib/cn';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveLayoutSystem } from '@/site/layoutSystems';

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
 * PricingTiers — packaged offering cards. `tier.price === 0` renders as "Custom".
 * Every CTA links to `props.ctaHref` (defaulting to /contact) — no cart.
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
  } = props;

  const href = ctaHref ?? '/checkout';

  return (
    <section id="offerings" className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={resolveLayoutSystem(content)}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mb-16"
        />

        <div className={cn('grid grid-cols-1 gap-8 items-stretch', gridColsClass(tiers.length))}>
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
                  'card-elevated flex flex-col justify-between relative rounded-xl border bg-card',
                  tier.popular ? 'border-primary' : 'border-border/80',
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
                  <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
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
                  <Separator className="mb-4" />
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
                    className="w-full h-11 text-sm font-semibold shadow-sm"
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    <Link href={href}>
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
