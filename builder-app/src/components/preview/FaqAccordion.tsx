'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div
            key={idx}
            className="rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--card-foreground,#0f172a)] transition-all duration-200 overflow-hidden shadow-xs hover:border-[var(--primary,#4f46e5)]/40"
          >
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              className="flex w-full items-center justify-between p-5 text-left font-medium text-[var(--foreground,#0f172a)] hover:text-[var(--primary,#4f46e5)] transition-colors focus:outline-hidden"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3 text-base sm:text-lg font-semibold pr-4">
                <HelpCircle className="h-5 w-5 shrink-0 text-[var(--primary,#4f46e5)] opacity-80" />
                {item.q}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--muted,#f1f5f9)] text-[var(--muted-foreground,#64748b)] transition-transform duration-200 ${
                  isOpen ? 'rotate-180 bg-[var(--primary,#4f46e5)] text-[var(--primary-foreground,#ffffff)]' : ''
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm sm:text-base leading-relaxed text-[var(--muted-foreground,#64748b)] border-t border-[var(--border,#e5e7eb)]/60 bg-[var(--muted,#f8fafc)]/30">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
