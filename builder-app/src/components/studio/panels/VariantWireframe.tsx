'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { SectionType } from '@/site/schema';

/**
 * Architectural Layout Wireframes.
 * Minimalist, precise, high-contrast monochrome layout schematics
 * that look like genuine design-tool blueprints.
 */

export function VariantWireframe({
  variant,
  type = 'hero',
  className,
}: {
  variant: string;
  type?: SectionType | string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex h-20 w-full items-center justify-center overflow-hidden rounded-lg border border-border/80 bg-zinc-950/[0.03] p-2.5 transition-all dark:bg-white/[0.02] dark:border-white/[0.08]',
        className,
      )}
    >
      {renderArchitecturalWireframe(type, variant)}
    </div>
  );
}

function renderArchitecturalWireframe(type: string, variant: string) {
  // HEADER
  if (type === 'header') {
    if (variant === 'floating_glass_pill') {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-6 w-11/12 items-center justify-between rounded-full border border-foreground/15 bg-background px-3 shadow-xs">
            <div className="h-1.5 w-6 rounded-full bg-foreground/80" />
            <div className="flex gap-1.5">
              <div className="h-1 w-3 rounded-full bg-foreground/30" />
              <div className="h-1 w-3 rounded-full bg-foreground/30" />
              <div className="h-1 w-3 rounded-full bg-foreground/30" />
            </div>
            <div className="h-2 w-4 rounded-full bg-foreground/80" />
          </div>
        </div>
      );
    }
    return (
      <div className="flex h-full w-full items-center justify-between border-b border-foreground/10 px-2">
        <div className="h-2 w-8 rounded-sm bg-foreground/80" />
        <div className="flex gap-2">
          <div className="h-1 w-4 rounded bg-foreground/30" />
          <div className="h-1 w-4 rounded bg-foreground/30" />
          <div className="h-1 w-4 rounded bg-foreground/30" />
        </div>
        <div className="h-2 w-5 rounded bg-foreground/80" />
      </div>
    );
  }

  // HERO
  if (type === 'hero') {
    switch (variant) {
      case 'split':
        return (
          <div className="flex h-full w-full items-center gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="h-1.5 w-10 rounded-sm bg-foreground/40" />
              <div className="h-2.5 w-20 rounded-sm bg-foreground/90" />
              <div className="h-1.5 w-16 rounded-sm bg-foreground/30" />
              <div className="mt-1 flex gap-1">
                <div className="h-2.5 w-6 rounded-sm bg-foreground" />
                <div className="h-2.5 w-6 rounded-sm border border-foreground/30" />
              </div>
            </div>
            <div className="h-full w-2/5 rounded border border-dashed border-foreground/20 bg-foreground/[0.04] flex items-center justify-center">
              <div className="h-3 w-3 rounded-full border border-foreground/30" />
            </div>
          </div>
        );

      case 'centered':
        return (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-center">
            <div className="h-1.5 w-8 rounded-full bg-foreground/40" />
            <div className="h-2.5 w-28 rounded-sm bg-foreground/90" />
            <div className="h-1.5 w-36 rounded-sm bg-foreground/30" />
            <div className="mt-0.5 flex gap-1.5">
              <div className="h-2.5 w-7 rounded-sm bg-foreground" />
              <div className="h-2.5 w-7 rounded-sm border border-foreground/30" />
            </div>
          </div>
        );

      case 'lead_form':
        return (
          <div className="flex h-full w-full items-center gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="h-2.5 w-16 rounded-sm bg-foreground/90" />
              <div className="h-1.5 w-20 rounded-sm bg-foreground/30" />
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                <div className="h-1 w-12 rounded bg-foreground/30" />
              </div>
            </div>
            <div className="h-full w-2/5 rounded border border-foreground/20 bg-background p-1.5 flex flex-col justify-between shadow-xs">
              <div className="h-1.5 w-8 rounded bg-foreground/40" />
              <div className="h-2 w-full rounded border border-foreground/15 bg-foreground/[0.02]" />
              <div className="h-2 w-full rounded bg-foreground" />
            </div>
          </div>
        );

      case 'asymmetric_bento_collage':
        return (
          <div className="flex h-full w-full flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <div className="h-2 w-20 rounded-sm bg-foreground/80" />
              <div className="h-1.5 w-6 rounded bg-foreground/40" />
            </div>
            <div className="grid flex-1 grid-cols-3 gap-1.5">
              <div className="col-span-2 rounded border border-foreground/15 bg-foreground/[0.04]" />
              <div className="flex flex-col gap-1">
                <div className="flex-1 rounded border border-foreground/20 bg-foreground/10" />
                <div className="flex-1 rounded border border-foreground/15 bg-foreground/[0.04]" />
              </div>
            </div>
          </div>
        );

      case 'fullbleed_display':
        return (
          <div className="relative h-full w-full rounded border border-foreground/20 bg-foreground/[0.05] p-2 flex flex-col justify-between">
            <div className="h-1.5 w-8 rounded-full bg-foreground/40" />
            <div className="space-y-1">
              <div className="h-3 w-28 rounded-sm bg-foreground/90" />
              <div className="flex gap-1.5">
                <div className="h-2 w-6 rounded-sm bg-foreground" />
                <div className="h-2 w-6 rounded-sm border border-foreground/30" />
              </div>
            </div>
          </div>
        );

      case 'stats_banner_split':
        return (
          <div className="flex h-full w-full items-center gap-2">
            <div className="flex flex-1 flex-col gap-1">
              <div className="h-2.5 w-14 rounded-sm bg-foreground/90" />
              <div className="h-1.5 w-16 rounded-sm bg-foreground/30" />
            </div>
            <div className="grid h-full w-1/2 grid-cols-2 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded border border-foreground/15 bg-background p-1 flex flex-col justify-center items-center">
                  <div className="h-2 w-5 rounded bg-foreground/80" />
                  <div className="h-1 w-3 rounded bg-foreground/30 mt-0.5" />
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex h-full w-full items-center justify-center gap-2">
            <div className="h-2.5 w-24 rounded bg-foreground/80" />
          </div>
        );
    }
  }

  // FEATURE GRID
  if (type === 'featureGrid') {
    switch (variant) {
      case 'bento':
      case 'asymmetric_bento':
        return (
          <div className="grid h-full w-full grid-cols-3 gap-1.5 p-0.5">
            <div className="col-span-2 rounded border border-foreground/20 bg-foreground/[0.06] p-1.5 flex flex-col justify-between">
              <div className="h-2 w-12 rounded bg-foreground/80" />
              <div className="h-1.5 w-16 rounded bg-foreground/30" />
            </div>
            <div className="rounded border border-foreground/15 bg-background p-1.5 flex flex-col justify-between">
              <div className="h-2 w-6 rounded bg-foreground/70" />
              <div className="h-1.5 w-8 rounded bg-foreground/30" />
            </div>
          </div>
        );

      case 'cards':
      case 'even':
        return (
          <div className="grid h-full w-full grid-cols-3 gap-1.5 p-0.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded border border-foreground/15 bg-background p-1.5 flex flex-col gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-foreground/70" />
                <div className="h-1.5 w-full rounded bg-foreground/80" />
                <div className="h-1 w-3/4 rounded bg-foreground/30" />
              </div>
            ))}
          </div>
        );

      case 'alternating':
      case 'zigzag_rows':
        return (
          <div className="flex h-full w-full flex-col gap-1.5 justify-center p-0.5">
            <div className="flex gap-1.5 items-center">
              <div className="h-4 w-10 rounded border border-foreground/20 bg-foreground/[0.04]" />
              <div className="flex-1 space-y-0.5">
                <div className="h-1.5 w-full rounded bg-foreground/80" />
                <div className="h-1 w-3/4 rounded bg-foreground/30" />
              </div>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="flex-1 space-y-0.5">
                <div className="h-1.5 w-full rounded bg-foreground/80" />
                <div className="h-1 w-3/4 rounded bg-foreground/30" />
              </div>
              <div className="h-4 w-10 rounded border border-foreground/20 bg-foreground/[0.04]" />
            </div>
          </div>
        );

      case 'icons':
        return (
          <div className="grid h-full w-full grid-cols-4 gap-1.5 items-center p-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="h-4 w-4 rounded border border-foreground/20 bg-foreground/[0.05]" />
                <div className="h-1 w-5 rounded bg-foreground/50" />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="grid h-full w-full grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded border border-foreground/15 bg-background" />
            ))}
          </div>
        );
    }
  }

  // TESTIMONIALS
  if (type === 'testimonials') {
    switch (variant) {
      case 'cards':
        return (
          <div className="grid h-full w-full grid-cols-3 gap-1.5 p-0.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded border border-foreground/15 bg-background p-1.5 flex flex-col justify-between">
                <div className="h-1.5 w-full rounded bg-foreground/40" />
                <div className="flex items-center gap-1 pt-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-foreground/60" />
                  <div className="h-1 w-6 rounded bg-foreground/70" />
                </div>
              </div>
            ))}
          </div>
        );

      case 'infinite_marquee':
      case 'marquee':
        return (
          <div className="flex h-full w-full items-center gap-1.5 overflow-hidden p-0.5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-5 w-14 shrink-0 rounded-full border border-foreground/15 bg-background flex items-center justify-center">
                <div className="h-1 w-9 rounded bg-foreground/60" />
              </div>
            ))}
          </div>
        );

      case 'editorial_pullquote':
        return (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center p-1 font-serif">
            <div className="h-2 w-32 rounded bg-foreground/90 italic" />
            <div className="flex items-center gap-1 mt-0.5">
              <div className="h-2 w-2 rounded-full bg-foreground/60" />
              <div className="h-1 w-10 rounded bg-foreground/40" />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex h-full w-full items-center justify-center gap-1">
            <div className="h-2 w-24 rounded bg-foreground/70" />
          </div>
        );
    }
  }

  // PRICING TIERS
  if (type === 'pricingTiers') {
    return (
      <div className="grid h-full w-full grid-cols-3 gap-1.5 p-0.5">
        <div className="rounded border border-foreground/15 bg-background p-1.5 flex flex-col justify-between">
          <div className="h-1.5 w-6 rounded bg-foreground/50" />
          <div className="h-2.5 w-8 rounded bg-foreground/80" />
        </div>
        <div className="rounded border border-foreground bg-foreground/[0.04] p-1.5 flex flex-col justify-between shadow-xs">
          <div className="h-1.5 w-6 rounded bg-foreground font-bold" />
          <div className="h-2.5 w-8 rounded bg-foreground" />
        </div>
        <div className="rounded border border-foreground/15 bg-background p-1.5 flex flex-col justify-between">
          <div className="h-1.5 w-6 rounded bg-foreground/50" />
          <div className="h-2.5 w-8 rounded bg-foreground/80" />
        </div>
      </div>
    );
  }

  // PRODUCT GRID
  if (type === 'productGrid') {
    return (
      <div className="grid h-full w-full grid-cols-3 gap-1.5 p-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded border border-foreground/15 bg-background p-1.5 flex flex-col gap-1">
            <div className="h-5 w-full rounded border border-foreground/10 bg-foreground/[0.03]" />
            <div className="h-1.5 w-10 rounded bg-foreground/80" />
            <div className="h-1.5 w-6 rounded bg-foreground" />
          </div>
        ))}
      </div>
    );
  }

  // Fallback
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-2 w-20 rounded bg-foreground/30" />
    </div>
  );
}
