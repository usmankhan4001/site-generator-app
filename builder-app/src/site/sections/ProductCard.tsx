'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  Check,
  ShoppingBag,
  Plus,
  Flame,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Package,
  Layers,
  Zap,
} from 'lucide-react';
import type { CatalogItem } from '@/site/schema';
import { formatPrice } from '@/site/lib/format';
import { cn } from '@/site/lib/cn';
import { useCart } from '@/site/commerce';
import { Button } from '@/site/ui/button';

export interface ProductCardProps {
  item: CatalogItem;
  variant?: 'fashion_minimal' | 'mega_catalog' | 'single_flagship_bundle' | 'products' | 'plans' | string;
  currency?: string;
  isAtelier?: boolean;
  className?: string;
  onAddToCart?: (item: CatalogItem, options?: { variant?: string; bundleId?: string }) => void;
}

/** Star rating renderer with solid amber stars */
export function StarRating({ rating = 5, count }: { rating?: number; count?: number }) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center gap-0.5 text-amber-500">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={cn(
              'h-3.5 w-3.5',
              i < roundedRating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/25 fill-none'
            )}
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-xs font-medium text-muted-foreground">({count})</span>
      )}
    </div>
  );
}

/** Calculate percentage discount from original/compareAt price */
function getDiscountPercentage(price: number, originalPrice?: number, compareAtPrice?: number): number | null {
  const strikePrice = originalPrice ?? compareAtPrice;
  if (!strikePrice || strikePrice <= price) return null;
  return Math.round(((strikePrice - price) / strikePrice) * 100);
}

/* -------------------------------------------------------------------------- */
/* 1. Fashion Minimal Card (4:5 portrait, hover flip, swatches, serif, slide-up) */
/* -------------------------------------------------------------------------- */
export function FashionMinimalCard({
  item,
  currency = 'USD',
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Derived swatch colors with images or default fallbacks
  const swatches = item.swatches?.length
    ? item.swatches
    : item.variants?.filter((v) => v.color).map((v) => ({
        name: v.name || v.color || 'Standard',
        color: v.color || '#18181b',
        image: v.image,
      })) ?? [
        { name: 'Onyx Black', color: '#18181b', image: item.image },
        { name: 'Oatmeal Heather', color: '#d4cebe', image: item.secondaryImage || item.image },
        { name: 'Espresso Brown', color: '#4a3728', image: item.images?.[2] || item.secondaryImage || item.image },
      ];

  const [activeSwatchIndex, setActiveSwatchIndex] = useState(0);
  const activeSwatch = swatches[activeSwatchIndex];

  // Active image based on swatch, or primary image
  const displayImage = activeSwatch?.image || item.image;
  const secondaryImage = item.secondaryImage || item.images?.[1] || (swatches[1]?.image !== displayImage ? swatches[1]?.image : null);

  const discountPercent = getDiscountPercentage(item.price, item.originalPrice, item.compareAtPrice);
  const formattedPrice = formatPrice(item.price, item.currency || currency);
  const formattedOriginalPrice = (item.originalPrice || item.compareAtPrice)
    ? formatPrice(item.originalPrice || item.compareAtPrice!, item.currency || currency)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: `${item.id}-${activeSwatch?.name ? activeSwatch.name.toLowerCase().replace(/\s+/g, '-') : 'default'}`,
        name: `${item.name}${activeSwatch?.name ? ` - ${activeSwatch.name}` : ''}`,
        price: item.price,
        currency: item.currency || currency,
        image: displayImage,
        category: item.category,
        sku: item.sku,
        description: item.description,
        variant: activeSwatch?.name,
      },
      { openDrawer: true }
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div
      className={cn(
        'group flex flex-col bg-card rounded-2xl border border-border/70 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30',
        className
      )}
    >
      {/* 4:5 Portrait Image Container */}
      <div className="relative aspect-4/5 w-full bg-muted/40 overflow-hidden">
        {/* Main image */}
        {displayImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayImage}
            alt={item.name}
            loading="lazy"
            className={cn(
              'w-full h-full object-cover transition-all duration-700 ease-out',
              secondaryImage && 'group-hover:opacity-0 group-hover:scale-105'
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
            <Package className="h-12 w-12" />
          </div>
        )}

        {/* Hover Secondary Image Flip */}
        {secondaryImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={secondaryImage}
            alt={`${item.name} alternate view`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
          {item.badge ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-background/90 backdrop-blur-md text-foreground border border-border/80 shadow-xs">
              {item.badge}
            </span>
          ) : discountPercent ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600 text-white shadow-xs">
              -{discountPercent}%
            </span>
          ) : (
            <span />
          )}

          {item.popular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground shadow-xs">
              <Sparkles className="h-3 w-3" />
              <span>Atelier</span>
            </span>
          )}
        </div>

        {/* Slide-Up "+ Quick Add" Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 z-20 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={cn(
              'w-full py-3 px-4 rounded-xl font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer',
              isAdded
                ? 'bg-emerald-600 text-white scale-[1.02]'
                : 'bg-foreground/95 text-background hover:bg-foreground active:scale-[0.98]'
            )}
            aria-label={`Quick add ${item.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 animate-in zoom-in-50" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>+ Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Interactive Color Swatch Dots */}
        {swatches.length > 0 && (
          <div className="flex items-center gap-2 pt-1" aria-label="Available color variations">
            {swatches.map((swatch, idx) => {
              const isActive = activeSwatchIndex === idx;
              return (
                <button
                  key={`${swatch.name}-${idx}`}
                  type="button"
                  onClick={() => setActiveSwatchIndex(idx)}
                  className={cn(
                    'group/swatch relative h-5 w-5 rounded-full transition-transform focus:outline-hidden cursor-pointer flex items-center justify-center',
                    isActive ? 'scale-110' : 'hover:scale-110 opacity-80 hover:opacity-100'
                  )}
                  title={swatch.name}
                  aria-label={`Select color ${swatch.name}`}
                  aria-pressed={isActive}
                >
                  <span
                    className={cn(
                      'absolute inset-0 rounded-full border border-black/20 dark:border-white/20 transition-shadow',
                      isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                    )}
                    style={{ backgroundColor: swatch.color }}
                  />
                </button>
              );
            })}
            <span className="text-[11px] text-muted-foreground ml-1 font-sans">
              {activeSwatch?.name}
            </span>
          </div>
        )}

        {/* Category / Eyebrow */}
        {item.category && (
          <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-muted-foreground">
            {item.category}
          </span>
        )}

        {/* Clean Serif Heading */}
        <h3 className="font-serif text-lg font-normal text-foreground leading-snug tracking-tight">
          {item.name}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 font-sans">
            {item.description}
          </p>
        )}

        {/* Price & Rating Row */}
        <div className="mt-auto pt-2 flex items-baseline justify-between gap-2 border-t border-border/50">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-foreground tracking-tight">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>

          {item.rating && (
            <StarRating rating={item.rating} count={item.reviewCount} />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Mega Catalog Card (1:1 square, -30% OFF pill, stars/reviews, stock bar) */
/* -------------------------------------------------------------------------- */
export function MegaCatalogCard({
  item,
  currency = 'USD',
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = getDiscountPercentage(item.price, item.originalPrice, item.compareAtPrice) ?? 30;
  const formattedPrice = formatPrice(item.price, item.currency || currency);
  const formattedOriginalPrice = item.originalPrice || item.compareAtPrice
    ? formatPrice(item.originalPrice || item.compareAtPrice!, item.currency || currency)
    : formatPrice(Math.round(item.price / (1 - discountPercent / 100)), item.currency || currency);

  // Stock scarcity indicator: default to 3 if in stock or defined
  const stockCount = typeof item.stockCount === 'number' ? item.stockCount : 3;
  const totalStock = item.totalStock || 12;
  const stockProgress = Math.min(100, Math.max(10, Math.round((stockCount / totalStock) * 100)));

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        currency: item.currency || currency,
        image: item.image,
        category: item.category,
        sku: item.sku,
        description: item.description,
      },
      { openDrawer: true }
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div
      className={cn(
        'group flex flex-col bg-card rounded-xl border border-border p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/40',
        className
      )}
    >
      {/* 1:1 Square Aspect Ratio Image */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-muted border border-border/40">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
            <Package className="h-10 w-10" />
          </div>
        )}

        {/* Discount Percentage Pill Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-rose-600 text-white shadow-md uppercase tracking-wider">
            -{discountPercent}% OFF
          </span>
        </div>

        {item.badge && item.badge !== 'Sale' && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-background/90 backdrop-blur-xs text-foreground border border-border shadow-xs">
              {item.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="flex flex-col flex-1 pt-3.5 gap-2">
        {item.category && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {item.category}
          </span>
        )}

        <h3 className="text-sm font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {item.name}
        </h3>

        {/* Star ratings with review count e.g. ★★★★★ (48) */}
        <div className="flex items-center justify-between">
          <StarRating rating={item.rating ?? 5} count={item.reviewCount ?? 48} />
          {item.sku && (
            <span className="text-[10px] text-muted-foreground font-mono">
              SKU: {item.sku}
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-black text-foreground">
            {formattedPrice}
          </span>
          <span className="text-xs text-muted-foreground line-through font-medium">
            {formattedOriginalPrice}
          </span>
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 ml-auto">
            Save {formatPrice((item.originalPrice || item.compareAtPrice || Math.round(item.price / 0.7)) - item.price, item.currency || currency)}
          </span>
        </div>

        {/* Stock Scarcity Progress Bar ('Only 3 left in stock!') */}
        <div className="mt-2 pt-2 border-t border-border/60 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-rose-600 dark:text-rose-400">
            <span className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              <span>Only {stockCount} left in stock!</span>
            </span>
            <span className="text-[10px] text-muted-foreground">Selling fast</span>
          </div>

          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${stockProgress}%` }}
            />
          </div>
        </div>

        {/* Quick Add to Cart Button */}
        <div className="mt-3">
          <Button
            type="button"
            onClick={handleAdd}
            className={cn(
              'w-full h-10 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer',
              isAdded
                ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            )}
            aria-label={`Add ${item.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 animate-in zoom-in-50" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>Quick Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Single Flagship Bundle Card (Exploded specs, bundle pack selector)     */
/* -------------------------------------------------------------------------- */
export function SingleFlagshipBundleCard({
  item,
  currency = 'USD',
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Bundle package configurations
  const bundles = item.bundles?.length
    ? item.bundles
    : [
        {
          id: 'standard-1x',
          name: '1x Standard Edition',
          title: 'Single Pack',
          price: item.price,
          originalPrice: item.originalPrice || item.compareAtPrice,
          savings: undefined,
          description: 'Includes 1x complete system with all standard accessories.',
          badge: undefined,
          quantity: 1,
        },
        {
          id: 'pro-bundle-2x',
          name: '2x Pro Bundle (Save $60)',
          title: '2x Pro Bundle',
          price: Math.max(1, Math.round(item.price * 2 - 60)),
          originalPrice: item.price * 2,
          savings: 'Save $60',
          badge: 'Most Popular',
          popular: true,
          description: '2x complete units + dual fast chargers. Perfect for home & studio.',
          quantity: 2,
        },
        {
          id: 'ultimate-bundle-3x',
          name: '3x Ultimate Creator Pack (Save $120)',
          title: '3x Ultimate Bundle',
          price: Math.max(1, Math.round(item.price * 3 - 120)),
          originalPrice: item.price * 3,
          savings: 'Save $120',
          badge: 'Best Value',
          description: '3x complete units + master accessory kit and lifetime priority warranty.',
          quantity: 3,
        },
      ];

  const [selectedBundleId, setSelectedBundleId] = useState<string>(
    bundles.find((b) => b.popular)?.id || bundles[0].id
  );

  const selectedBundle = bundles.find((b) => b.id === selectedBundleId) || bundles[0];

  // Exploded specs dictionary or feature list
  const specs = item.specs || {
    Architecture: 'Precision CNC Anodized Aluminum',
    Connectivity: 'Ultra-low Latency 2.4GHz & Bluetooth 5.4',
    Battery: '48hr Fast-Charge Lithium-Polymer',
    Acoustics: 'Custom 50mm Neodymium Drivers (5Hz–40kHz)',
    Warranty: '2-Year Direct Global Replacement',
  };

  const handleAddBundle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: `${item.id}-${selectedBundle.id}`,
        name: `${item.name} (${selectedBundle.name})`,
        price: selectedBundle.price,
        currency: item.currency || currency,
        image: selectedBundle.image || item.image,
        category: item.category,
        sku: `${item.sku || 'FLAG'}-${selectedBundle.id.toUpperCase()}`,
        description: selectedBundle.description || item.description,
        variant: selectedBundle.name,
        quantity: 1,
      },
      { openDrawer: true }
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div
      className={cn(
        'bg-card rounded-3xl border border-border/80 p-6 md:p-8 lg:p-10 shadow-xl overflow-hidden',
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Flagship Media Showcase */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden bg-muted/50 border border-border/60">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground/40">
                <Package className="h-16 w-16" />
              </div>
            )}

            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Flagship Release</span>
              </span>
              {item.badge && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>
          </div>

          {/* Gallery Thumbnails if available */}
          {item.images && item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden bg-muted border border-border/50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Detail ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Exploded Specs Matrix */}
          <div className="mt-2 p-5 rounded-2xl bg-muted/30 border border-border/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
              <Layers className="h-4 w-4 text-primary" />
              <span>Exploded Technical Specifications</span>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              {Object.entries(specs).map(([specKey, specVal]) => (
                <div key={specKey} className="flex flex-col border-b border-border/40 pb-1.5">
                  <dt className="text-muted-foreground text-[11px]">{specKey}</dt>
                  <dd className="font-semibold text-foreground mt-0.5">{specVal}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Right Column: Title, Bundle Selector & Add To Cart */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            {item.category && (
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {item.category}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mt-1 tracking-tight leading-tight">
              {item.name}
            </h2>
            <div className="flex items-center gap-3 mt-2.5">
              <StarRating rating={item.rating ?? 5} count={item.reviewCount ?? 128} />
              <span className="text-xs text-muted-foreground">&bull; Free Worldwide Express Delivery</span>
            </div>
          </div>

          {item.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Bundle Pack Selector (1x Standard / 2x Pro Bundle Save $60) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                Select Bundle Package
              </label>
              <span className="text-xs text-primary font-semibold">Special Bundle Pricing Active</span>
            </div>

            <div className="space-y-2.5" role="radiogroup" aria-label="Bundle options">
              {bundles.map((bundle) => {
                const isSelected = bundle.id === selectedBundleId;
                const formattedBundlePrice = formatPrice(bundle.price, item.currency || currency);
                const formattedOriginal = bundle.originalPrice
                  ? formatPrice(bundle.originalPrice, item.currency || currency)
                  : null;

                return (
                  <div
                    key={bundle.id}
                    onClick={() => setSelectedBundleId(bundle.id)}
                    className={cn(
                      'relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer select-none',
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border bg-card hover:border-primary/40'
                    )}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div
                        className={cn(
                          'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                          isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/40'
                        )}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-primary-foreground" />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-foreground">
                            {bundle.name}
                          </span>
                          {bundle.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground">
                              {bundle.badge}
                            </span>
                          )}
                          {bundle.savings && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                              {bundle.savings}
                            </span>
                          )}
                        </div>
                        {bundle.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {bundle.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-black text-foreground">
                        {formattedBundlePrice}
                      </div>
                      {formattedOriginal && (
                        <div className="text-xs text-muted-foreground line-through">
                          {formattedOriginal}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Feature Highlights */}
          {item.features && item.features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {item.features.slice(0, 4).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-foreground/90 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Direct CTA Action & Trust Guarantees */}
          <div className="space-y-3 pt-2">
            <Button
              type="button"
              onClick={handleAddBundle}
              className={cn(
                'w-full h-14 font-black text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer',
                isAdded
                  ? 'bg-emerald-600 hover:bg-emerald-600 text-white'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
              )}
            >
              {isAdded ? (
                <>
                  <Check className="h-5 w-5 animate-in zoom-in-50" />
                  <span>Bundle Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  <span>Add {selectedBundle.title || 'Bundle'} &middot; {formatPrice(selectedBundle.price, item.currency || currency)}</span>
                </>
              )}
            </Button>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>30-Day Risk-Free Trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" />
                <span>Instant Dispatched &amp; Tracked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Standard Retail Product Card (layout: 'products')                       */
/* -------------------------------------------------------------------------- */
export function StandardProductCard({
  item,
  currency = 'USD',
  isAtelier = false,
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const formattedPrice = item.price === 0 ? 'Custom' : formatPrice(item.price, item.currency || currency, { unit: item.priceUnit });

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        currency: item.currency || currency,
        image: item.image,
        category: item.category,
        sku: item.sku,
        description: item.description,
      },
      { openDrawer: true }
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden group bg-card rounded-2xl border border-border transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      <div className="aspect-4/3 overflow-hidden bg-muted relative">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
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
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-background/90 text-muted-foreground border border-border'
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

        {item.rating && (
          <StarRating rating={item.rating} count={item.reviewCount} />
        )}

        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              {formattedPrice}
            </span>
            {item.sku && (
              <span className="text-[11px] text-muted-foreground">SKU {item.sku}</span>
            )}
          </div>

          {item.price > 0 ? (
            <Button
              type="button"
              onClick={handleAdd}
              size="sm"
              className={cn(
                'h-9 px-3.5 text-xs font-semibold rounded-xl transition-all cursor-pointer',
                isAdded ? 'bg-emerald-600 text-white' : ''
              )}
            >
              {isAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5 mr-1" />
                  <span>Add to Cart</span>
                </>
              )}
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link href="/contact">
                <span>Enquire</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Master Unified ProductCard Component                                       */
/* -------------------------------------------------------------------------- */
export default function ProductCard(props: ProductCardProps) {
  const { variant } = props;

  switch (variant) {
    case 'fashion_minimal':
      return <FashionMinimalCard {...props} />;
    case 'mega_catalog':
      return <MegaCatalogCard {...props} />;
    case 'single_flagship_bundle':
      return <SingleFlagshipBundleCard {...props} />;
    case 'products':
    default:
      return <StandardProductCard {...props} />;
  }
}
