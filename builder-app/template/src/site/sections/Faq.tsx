'use client';

import { HelpCircle } from 'lucide-react';
import type { FaqProps, SiteContent } from '@/site/schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/site/ui/accordion';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveLayoutSystem } from '@/site/layoutSystems';
import { cn } from '@/site/lib/cn';

/**
 * Faq — question/answer section supporting:
 * - `accordion` (default): single Radix collapsible column.
 * - `two_column`: items split across two independent accordion columns, for
 *   longer FAQ lists.
 * - `grid_cards`: every question + answer visible at once as bordered cards,
 *   for shorter lists where showing everything upfront reads as confident.
 */
export default function Faq({ props, content }: { props: FaqProps; content: SiteContent }) {
  if (!props.items?.length) return null;

  const {
    eyebrow = 'Frequently Asked Questions',
    title = 'Everything You Need to Know',
    description,
    items,
    variant,
  } = props;

  const system = resolveLayoutSystem(content);
  const effectiveVariant = variant ?? 'accordion';

  /* =========================================================================
   * 1. GRID CARDS (every Q&A visible at once)
   * ========================================================================= */
  if (effectiveVariant === 'grid_cards') {
    return (
      <section id="faq" className="py-20 md:py-28 bg-muted/20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={system}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-12 text-center max-w-2xl mx-auto"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {items.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-full p-1.5 bg-primary/10 text-primary shrink-0">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 2. TWO COLUMN (split into two independent accordions)
   * ========================================================================= */
  if (effectiveVariant === 'two_column') {
    const mid = Math.ceil(items.length / 2);
    const columns = [items.slice(0, mid), items.slice(mid)];

    return (
      <section id="faq" className="py-20 md:py-28 bg-muted/20 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={system}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-12 text-center max-w-2xl mx-auto"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {columns.map((column, colIdx) => (
              <div
                key={colIdx}
                className="card-elevated rounded-xl bg-card border border-border/80 p-4 sm:p-6 shadow-sm"
              >
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {column.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`item-${colIdx}-${idx}`}
                      className="border-b border-border/60 last:border-b-0 px-2 py-1"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground text-sm hover:no-underline py-3.5">
                        <span className="flex items-center gap-2.5">
                          <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{faq.q}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-6 pr-4 pb-3.5">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 3. DEFAULT (single accordion column)
   * ========================================================================= */
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/20 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={system}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mb-12"
        />

        <div className="card-elevated rounded-xl bg-card border border-border/80 p-4 sm:p-6 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {items.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className={cn('border-b border-border/60 last:border-b-0 px-2 py-1')}
              >
                <AccordionTrigger className="text-left font-semibold text-foreground text-sm sm:text-base hover:no-underline py-4">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-7 pr-4 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
