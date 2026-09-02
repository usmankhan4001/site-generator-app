'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { FaqItem } from '@/lib/constants';

interface FAQSectionProps {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
}

export function FAQSection({
  faqs,
  eyebrow = 'Frequently Asked Questions',
  title = 'Everything You Need to Know',
}: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/20 border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight mt-2 text-foreground">
            {title}
          </h2>
        </div>

        {/* Collapsible Radix UI Accordion */}
        <div className="card-elevated rounded-xl bg-card border border-border/80 p-4 sm:p-6 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, idx) => (
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
