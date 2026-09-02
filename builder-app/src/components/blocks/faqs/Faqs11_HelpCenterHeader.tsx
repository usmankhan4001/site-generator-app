'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, MessageCircle } from 'lucide-react';

export interface Faqs11_HelpCenterHeaderProps {
  badge?: string;
  headline?: string;
  description?: string;
  supportPrompt?: boolean;
  items?: Array<{
    q: string;
    a: string;
  }>;
}

export const Faqs11_HelpCenterHeader: React.FC<Faqs11_HelpCenterHeaderProps> = ({
  badge = 'Documentation',
  headline = 'Help Center Search & FAQ Hub',
  description = 'Prominent search bar, quick link chips, and top trending support inquiries.',
  supportPrompt = true,
  items = [
    {
      q: 'How does the Airwallex payment scheme compliance work?',
      a: 'Our architecture enforces full statutory KYC/AML compliance, displaying legal entity registration numbers, registered headquarters, governing law, and official card scheme trademarks (Visa, Mastercard, AMEX, Apple Pay, Google Pay).',
    },
    {
      q: 'Can we configure custom currencies and regional settlement rails?',
      a: 'Yes. The system supports multi-currency configurations across USD, EUR, GBP, SGD, AUD, and HKD, backed by real-time forex quotation tables and local domestic clearing rails.',
    },
    {
      q: 'What is the standard SLA for API uptime and transaction processing?',
      a: 'We offer an institutionally backed 99.99% uptime SLA with sub-250ms API processing latency and multi-region failover across Tier-4 data centers.',
    },
    {
      q: 'How are refunds and dispute resolutions managed?',
      a: 'Automated 30-day RMA workflows and dispute dispute filings are integrated directly with merchant acquiring webhooks to prevent chargeback reserve penalties.',
    },
  ],
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background,#ffffff)] text-[var(--foreground,#0f172a)] transition-colors border-b border-[var(--border,#e5e7eb)]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center space-y-3">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] border border-[var(--primary,#4f46e5)]/20">
              <HelpCircle className="w-3.5 h-3.5" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
            {headline}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-[var(--muted-foreground,#64748b)]">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[var(--foreground,#0f172a)] hover:text-[var(--primary,#4f46e5)] transition-colors gap-4 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-[var(--muted-foreground,#64748b)] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[var(--primary,#4f46e5)]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[var(--muted-foreground,#64748b)] leading-relaxed border-t border-[var(--border,#e5e7eb)]/60">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {supportPrompt && (
          <div className="mt-12 p-6 rounded-2xl border border-[var(--border,#e5e7eb)] bg-[var(--muted,#f8fafc)]/60 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground,#0f172a)]">
                Still have unanswered questions?
              </h4>
              <p className="text-xs text-[var(--muted-foreground,#64748b)]">
                Our solutions engineering team is available 24/7 for architecture reviews.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary,#4f46e5)] text-[var(--primary-foreground,#ffffff)] text-xs font-semibold hover:bg-[var(--primary-hover,#4338ca)] transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Faqs11_HelpCenterHeader;
