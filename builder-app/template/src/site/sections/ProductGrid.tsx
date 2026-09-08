'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Filter } from 'lucide-react';
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
  dividerClass,
  ctaProps,
} from '@/site/archetypes';
import { PaymentTrustBadges } from '@/site/sections/_shared/PaymentTrustBadges';
import ProductCard from './ProductCard';

function priceLabel(item: CatalogItem, sectionCurrency: string | undefined, fallbackUnit?: string) {
  if (item.price === 0) return 'Custom';
  return formatPrice(item.price, item.currency ?? sectionCurrency ?? 'USD', {
    unit: item.priceUnit ?? fallbackUnit,
  });
}

/**
 * ProductGrid — multi-layout modern e-commerce catalogue:
 *  - `fashion_minimal`: Tall 4:5 portrait aspect ratio, hover secondary image flip, interactive color swatch dots, clean serif typography, slide-up "+ Quick Add" button.
 *  - `mega_catalog`: 1:1 square aspect ratio, discount percentage pill badge ('-30% OFF'), star ratings with review count ('★★★★★ (48)'), stock scarcity progress bar ('Only 3 left in stock!'), and quick add-to-cart button.
 *  - `single_flagship_bundle`: Exploded specs and bundle pack selector ('1x Standard / 2x Pro Bundle Save $60').
 *  - `plans`: Server spec cards with a <dl> of specs + "Configure" link.
 *  - `products`: Classic standard retail card layout.
 * Category filter pills on top ('All', 'Best Sellers', 'New Arrivals', etc.) with instant client-side filtering.
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
    currency = 'USD',
    layout = 'products',
    variant,
    items,
    categories,
    cta,
    columns,
    featuredItemId,
  } = props;

  const effectiveLayout = variant ?? layout;
  const s = resolveArchetypeStyle(content);
  const ctaBtn = ctaProps(s);
  const isAtelier = s.treatment === 'atelier';

  // Build the list of available categories
  const categoryPills = useMemo(() => {
    const defaultPills = ['All', 'Best Sellers', 'New Arrivals'];
    const itemCategories = Array.from(
      new Set(items.map((i) => i.category).filter((c): c is string => Boolean(c?.trim())))
    );
    const customCategories = categories?.filter((c) => Boolean(c?.trim())) ?? [];

    const merged = Array.from(new Set([...defaultPills, ...customCategories, ...itemCategories]));
    return merged;
  }, [items, categories]);

  const [activeCategory, setActiveCategory] = useState('All');

  // Filter items based on active category pill
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items;

    if (activeCategory === 'Best Sellers') {
      const bestSellers = items.filter(
        (i) =>
          i.popular === true ||
          i.badge?.toLowerCase().includes('best') ||
          i.badge?.toLowerCase().includes('popular') ||
          (typeof i.rating === 'number' && i.rating >= 4.8)
      );
      return bestSellers.length > 0 ? bestSellers : items.slice(0, 3);
    }

    if (activeCategory === 'New Arrivals') {
      const newArrivals = items.filter(
        (i) =>
          i.badge?.toLowerCase().includes('new') ||
          i.badge?.toLowerCase().includes('atelier') ||
          i.category?.toLowerCase().includes('new')
      );
      return newArrivals.length > 0 ? newArrivals : items.slice(0, 4);
    }

    return items.filter(
      (i) => i.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase()
    );
  }, [items, activeCategory]);

  // Determine grid column class
  const getGridColsClass = () => {
    if (columns === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (columns === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    if (effectiveLayout === 'fashion_minimal') {
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
    if (effectiveLayout === 'mega_catalog') {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section id="catalog" className={sectionPadding(s)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={s.treatment}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={s.headerAlign}
          className="mb-10"
        />

        {/* Category Filter Pills on Top ('All', 'Best Sellers', 'New Arrivals') */}
        {categoryPills.length > 1 && effectiveLayout !== 'plans' && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-2">
            {categoryPills.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer select-none',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md scale-[1.03]'
                      : 'bg-secondary/70 text-secondary-foreground hover:bg-secondary border border-border/80 hover:border-border'
                  )}
                  aria-pressed={isActive}
                >
                  {cat === 'Best Sellers' && <Sparkles className="h-3 w-3" />}
                  <span>{cat}</span>
                  {isActive && (
                    <span className="ml-1 text-[10px] font-bold opacity-80 bg-primary-foreground/20 px-1.5 py-0.2 rounded-full">
                      {filteredItems.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Layout: single_flagship_bundle */}
        {effectiveLayout === 'single_flagship_bundle' ? (
          <div className="space-y-10">
            {/* Find flagship item */}
            {(() => {
              const flagshipItem =
                (featuredItemId && filteredItems.find((i) => i.id === featuredItemId)) ||
                filteredItems.find((i) => i.popular || i.bundles?.length) ||
                filteredItems[0] ||
                items[0];

              const otherItems = filteredItems.filter((i) => i.id !== flagshipItem.id);

              return (
                <>
                  <ProductCard
                    item={flagshipItem}
                    variant="single_flagship_bundle"
                    currency={currency}
                    isAtelier={isAtelier}
                  />

                  {otherItems.length > 0 && (
                    <div className="pt-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-foreground">
                          Companion Products &amp; Accessories
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {otherItems.length} items available
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherItems.map((companion) => (
                          <ProductCard
                            key={companion.id}
                            item={companion}
                            variant="mega_catalog"
                            currency={currency}
                            isAtelier={isAtelier}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        ) : effectiveLayout === 'plans' ? (
          /* Layout: plans (Server / Service Specification Cards) */
          <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch', gridGap(s))}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex flex-col',
                  cardClass(s),
                  item.popular && 'border-primary shadow-lg',
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
                    className="w-full h-11 text-sm font-semibold cursor-pointer"
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
          /* Layouts: fashion_minimal, mega_catalog, products */
          filteredItems.length === 0 ? (
            <div className="py-16 text-center space-y-4 rounded-3xl border border-dashed border-border bg-muted/20">
              <div className="inline-flex p-3 rounded-2xl bg-muted text-muted-foreground">
                <Filter className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-foreground">No products found</h4>
                <p className="text-xs text-muted-foreground">
                  No items matched the category &ldquo;{activeCategory}&rdquo;.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setActiveCategory('All')}
                className="text-xs cursor-pointer"
              >
                View All Products
              </Button>
            </div>
          ) : (
            <div className={cn('grid items-stretch', getGridColsClass(), gridGap(s))}>
              {filteredItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  variant={effectiveLayout}
                  currency={currency}
                  isAtelier={isAtelier}
                />
              ))}
            </div>
          )
        )}

        {cta && (
          <div className="text-center mt-12">
            <Button asChild size={ctaBtn.size} variant={ctaBtn.variant} className="h-12 px-7 text-base cursor-pointer">
              <Link href={cta.href}>
                <span>{cta.label}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {effectiveLayout !== 'plans' && (
          <div className="mt-14 pt-8 border-t border-border/60">
            <PaymentTrustBadges showComplianceText />
          </div>
        )}
      </div>
    </section>
  );
}
