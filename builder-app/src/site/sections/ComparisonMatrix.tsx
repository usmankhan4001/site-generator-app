'use client';

import React from 'react';
import Link from 'next/link';
import { Check, X, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { ComparisonMatrixProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

export default function ComparisonMatrix({
  props,
  content,
}: {
  props: ComparisonMatrixProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    competitors = [
      { id: 'our-product', name: 'Our Platform', isOurProduct: true, badge: 'Recommended' },
      { id: 'legacy-banks', name: 'Traditional Banks', isOurProduct: false },
      { id: 'standard-processors', name: 'Legacy Processors', isOurProduct: false },
    ],
    categories = [],
    rows = [],
    footnote,
  } = props;

  const style = resolveArchetypeStyle(content);

  // If no categories provided, wrap rows into a single default category
  const effectiveCategories =
    categories.length > 0
      ? categories
      : rows.length > 0
      ? [{ name: 'Core Capabilities', rows }]
      : [];

  if (effectiveCategories.length === 0 || competitors.length === 0) {
    return null;
  }

  return (
    <section className={cn(sectionPadding(style), 'bg-background')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <SectionHeader
            system={style.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-12 lg:mb-16"
          />
        )}

        <div className="card-elevated relative overflow-x-auto rounded-2xl">
          <table className="w-full text-left border-collapse min-w-[640px]">
            {/* Sticky Table Header */}
            <thead className="sticky top-0 z-20 bg-card/95 backdrop-blur-md border-b border-border shadow-xs">
              <tr>
                <th className="py-5 px-6 font-semibold text-foreground text-sm uppercase tracking-wider w-2/5">
                  Features & Capabilities
                </th>
                {competitors.map((comp) => (
                  <th
                    key={comp.id}
                    className={cn(
                      'py-5 px-6 text-center font-bold text-base transition-colors',
                      comp.isOurProduct
                        ? 'bg-primary/[0.04] text-primary border-x border-primary/20 relative'
                        : 'text-foreground'
                    )}
                  >
                    {comp.badge && (
                      <span className="block mb-1.5 mx-auto w-fit text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {comp.badge}
                      </span>
                    )}
                    <span className="text-lg font-bold">{comp.name}</span>
                    {comp.cta && (
                      <div className="mt-3">
                        <Button asChild size="sm" variant={comp.isOurProduct ? 'default' : 'outline'} className="text-xs h-8">
                          <Link href={comp.cta.href}>
                            {comp.cta.label}
                            {comp.isOurProduct && <ArrowRight className="w-3.5 h-3.5 ml-1" />}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body with Categorized Rows */}
            <tbody className="divide-y divide-border/60">
              {effectiveCategories.map((cat, catIdx) => (
                <React.Fragment key={`cat-${catIdx}`}>
                  {/* Category Header Row */}
                  <tr className="bg-muted/40">
                    <td
                      colSpan={competitors.length + 1}
                      className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {cat.name}
                    </td>
                  </tr>

                  {/* Feature Rows */}
                  {cat.rows.map((row, rowIdx) => (
                    <tr
                      key={row.id || `row-${catIdx}-${rowIdx}`}
                      className="hover:bg-muted/20 transition-colors group"
                    >
                      {/* Feature Name + Tooltip */}
                      <td className="py-4 px-6 text-sm font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span>{row.feature}</span>
                          {row.tooltip && (
                            <span
                              title={row.tooltip}
                              className="text-muted-foreground/60 hover:text-muted-foreground cursor-help transition-colors"
                            >
                              <HelpCircle className="w-4 h-4 inline-block" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Competitor Value Columns */}
                      {competitors.map((comp) => {
                        const val = row.values ? row.values[comp.id] : undefined;
                        const isBoolean = typeof val === 'boolean';

                        return (
                          <td
                            key={comp.id}
                            className={cn(
                              'py-4 px-6 text-center text-sm font-medium align-middle',
                              comp.isOurProduct
                                ? 'bg-primary/[0.04] border-x border-primary/20 font-semibold text-foreground'
                                : 'text-muted-foreground'
                            )}
                          >
                            {isBoolean ? (
                              val ? (
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                  <Check className="w-4 h-4 stroke-[2.5]" />
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-muted-foreground/50 border border-border">
                                  <X className="w-4 h-4 stroke-[2]" />
                                </span>
                              )
                            ) : val !== undefined ? (
                              <span className={cn(comp.isOurProduct && 'text-primary font-bold')}>
                                {String(val)}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/40">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        {footnote && (
          <p className="mt-4 text-center text-xs text-muted-foreground leading-relaxed">
            * {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
