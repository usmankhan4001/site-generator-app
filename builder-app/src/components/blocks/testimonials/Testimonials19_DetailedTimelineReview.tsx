'use client';

import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';

export interface Testimonials19_DetailedTimelineReviewProps {
  badge?: string;
  headline?: string;
  description?: string;
  items?: Array<{
    name: string;
    role: string;
    company?: string;
    text: string;
    rating?: number;
    avatar?: string;
    metric?: string;
  }>;
}

export const Testimonials19_DetailedTimelineReview: React.FC<Testimonials19_DetailedTimelineReviewProps> = ({
  badge = 'Long-Term Partnership',
  headline = 'Year-by-Year Customer Journey',
  description = 'Longitudinal customer review tracking evolution from Seed stage to Series D expansion.',
  items = [
    {
      name: 'Dr. Sarah Jenkins',
      role: 'Chief Technology Officer',
      company: 'Apex Cloud Solutions',
      text: 'Deploying our multi-currency payment rails through this platform shaved four months off our expansion timeline. Reliability has been 100% since day one.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      metric: '4.8x Throughput',
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Infrastructure',
      company: 'Global HyperLogistics',
      text: 'The sub-250ms API processing latency and turnkey KYC compliance allowed us to onboard institutional clients with zero underwriting friction.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      metric: '99.999% Uptime',
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Product Engineering',
      company: 'Vanguard FinTech Group',
      text: 'Statutory compliance fine-print and Airwallex settlement integrations worked out of the box. Our compliance auditors signed off in record time.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      metric: 'Zero Dropped Transactions',
    },
  ],
}) => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background,#ffffff)] text-[var(--foreground,#0f172a)] transition-colors border-b border-[var(--border,#e5e7eb)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center max-w-2xl mx-auto space-y-3">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] border border-[var(--primary,#4f46e5)]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {item.metric && (
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                      {item.metric}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[var(--foreground,#0f172a)] leading-relaxed italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border,#e5e7eb)] flex items-center gap-3">
                {item.avatar && (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-[var(--border,#e5e7eb)] shrink-0"
                  />
                )}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground,#0f172a)] flex items-center gap-1">
                    {item.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary,#4f46e5)]" />
                  </h4>
                  <p className="text-[11px] text-[var(--muted-foreground,#64748b)]">
                    {item.role} {item.company ? `• ${item.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials19_DetailedTimelineReview;
