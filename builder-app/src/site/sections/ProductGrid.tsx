import Link from 'next/link';
import { ArrowRight, CheckCircle2, Package, ShieldCheck, Star } from 'lucide-react';
import type { CatalogItem, ProductGridProps, SiteContent } from '@/site/schema';
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
  imageWrapClass,
  dividerClass,
  ctaProps,
} from '@/site/archetypes';
import { PaymentTrustBadges } from '@/site/sections/_shared/PaymentTrustBadges';

function priceLabel(item: CatalogItem, sectionCurrency: string | undefined, fallbackUnit?: string) {
  if (item.price === 0) return 'Custom';
  return formatPrice(item.price, item.currency ?? sectionCurrency ?? 'USD', {
    unit: item.priceUnit ?? fallbackUnit,
  });
}

function Stars({ rating, count }: { rating?: number; count?: number }) {
  if (!rating) return null;
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={cn(
              'h-3.5 w-3.5',
              i < full ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/30 fill-none',
            )}
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}

/**
 * ProductGrid — catalogue in a lead-gen context (no cart).
 *  - `layout: 'products'` → retail image cards, meta, rating, "Enquire" link
 *  - `layout: 'plans'`    → server spec cards with a <dl> of specs + "Configure" link
 * `props.categories` render as inert (visual-only) filter chips.
 */
export default function ProductGrid({
  props,
  content,
}: {
  props: ProductGridProps;
  content: SiteContent;
}) {
  if (!props.items?.length) return null;

  const {
    eyebrow,
    title = 'Catalogue',
    description,
    currency,
    layout = 'products',
    items,
    categories,
    cta,
  } = props;

  const s = resolveArchetypeStyle(content);
  const ctaBtn = ctaProps(s);
  const isAtelier = s.treatment === 'atelier';

  return (
    <section id="catalog" className={sectionPadding(s)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={s.treatment}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={s.headerAlign}
          className="mb-12"
        />

        {categories?.length ? (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary text-primary-foreground">
              All
            </span>
            {categories.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        ) : null}

        {layout === 'plans' ? (
          <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch', gridGap(s))}>
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex flex-col',
                  cardClass(s),
                  item.popular && 'border-primary',
                )}
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className="text-lg font-bold text-foreground"
                      style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                    >
                      {item.name}
                    </h3>
                    {item.popular && (
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-primary text-primary-foreground">
                        Popular
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight text-foreground">
                      {priceLabel(item, currency, '/mo')}
                    </span>
                  </div>
                </div>

                <Separator className={dividerClass(s)} />

                <div className="flex-1 p-6 space-y-5">
                  {item.specs && Object.keys(item.specs).length > 0 && (
                    <dl className="space-y-2">
                      {Object.entries(item.specs).map(([k, v]) => (
                        <div
                          key={k}
                          className="flex items-center justify-between gap-3 text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0"
                        >
                          <dt className="text-muted-foreground">{k}</dt>
                          <dd className="font-medium text-foreground text-right">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {item.features?.length > 0 && (
                    <ul className="space-y-2.5 text-sm">
                      {item.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/90 leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.sla && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground rounded-lg bg-muted/40 border border-border/60 px-3 py-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{item.sla} uptime SLA</span>
                    </div>
                  )}
                </div>

                <div className="p-6 pt-0">
                  <Button
                    asChild
                    size={ctaBtn.size}
                    className="w-full h-11 text-sm font-semibold"
                    variant={item.popular ? 'default' : ctaBtn.variant}
                  >
                    <Link href="/contact">
                      <span>Configure</span>
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch', gridGap(s))}>
            {items.map((item) => (
              <div
                key={item.id}
                className={cn('flex flex-col overflow-hidden group', cardClass(s))}
              >
                <div className={cn('aspect-4/3 overflow-hidden bg-muted relative', imageWrapClass(s))}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                      <Package className="h-10 w-10" />
                    </div>
                  )}
                  {typeof item.inStock === 'boolean' && (
                    <span
                      className={cn(
                        'absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-xs',
                        item.inStock
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-background/90 text-muted-foreground border border-border',
                      )}
                    >
                      {item.inStock ? 'In stock' : 'Made to order'}
                    </span>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5 gap-2">
                  {item.category && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </span>
                  )}
                  <h3
                    className="text-base font-bold text-foreground leading-snug"
                    style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                  >
                    {item.name}
                  </h3>
                  <Stars rating={item.rating} count={item.reviewCount} />
                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-auto pt-3 flex items-end justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-foreground">
                        {priceLabel(item, currency)}
                      </span>
                      {item.sku && (
                        <span className="text-[11px] text-muted-foreground">SKU {item.sku}</span>
                      )}
                    </div>
                    <Button asChild size="sm" variant={item.price > 0 ? 'default' : ctaBtn.variant}>
                      <Link href={item.price > 0 ? '/checkout' : '/contact'}>
                        <span>{item.price > 0 ? 'Buy Now' : 'Enquire'}</span>
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cta && (
          <div className="text-center mt-12">
            <Button asChild size={ctaBtn.size} variant={ctaBtn.variant} className="h-12 px-7 text-base">
              <Link href={cta.href}>
                <span>{cta.label}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {layout === 'products' && (
          <div className="mt-14 pt-8 border-t border-border/60">
            <PaymentTrustBadges showComplianceText />
          </div>
        )}
      </div>
    </section>
  );
}
