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

/**
 * Faq — Radix single-collapsible accordion. Client component (accordion state).
 */
export default function Faq({ props, content }: { props: FaqProps; content: SiteContent }) {
  if (!props.items?.length) return null;

  const {
    eyebrow = 'Frequently Asked Questions',
    title = 'Everything You Need to Know',
    description,
    items,
  } = props;

  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/20 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={resolveLayoutSystem(content)}
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
                className="border-b border-border/60 last:border-b-0 px-2 py-1"
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
