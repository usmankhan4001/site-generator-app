'use client';

import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, Globe, Zap, Users, CheckCircle } from 'lucide-react';

export interface Stats04_TimelineGrowthProps {
  badge?: string;
  headline?: string;
  description?: string;
  stats?: Array<{
    value: string;
    label: string;
    subtext?: string;
    delta?: string;
  }>;
}

export const Stats04_TimelineGrowth: React.FC<Stats04_TimelineGrowthProps> = ({
  badge = 'Historical Milestones',
  headline = 'Multi-Year Scalability & Revenue Velocity',
  description = 'Chronological roadmap showcasing year-over-year operational expansion.',
  stats = [
    { value: '99.99%', label: 'Platform Uptime SLA', subtext: 'Continuous multi-region telemetry', delta: '+0.04%' },
    { value: '130+', label: 'Supported Currencies', subtext: 'Zero foreign exchange friction', delta: '+12 new' },
    { value: '<250ms', label: 'API Processing Latency', subtext: 'Sub-second webhook execution', delta: '-18%' },
    { value: '$4.8B+', label: 'Annual Processed Volume', subtext: 'Audited enterprise throughput', delta: '+140% YoY' },
  ],
}) => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[var(--background,#ffffff)] text-[var(--foreground,#0f172a)] transition-colors border-b border-[var(--border,#e5e7eb)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] border border-[var(--primary,#4f46e5)]/20">
              <TrendingUp className="w-3.5 h-3.5" />
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
            {headline}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-[var(--muted-foreground,#64748b)]">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-xl border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] shadow-xs hover:shadow-md transition-all group overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[var(--muted-foreground,#64748b)] uppercase tracking-wider">
                  {item.label}
                </span>
                {item.delta && (
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {item.delta}
                  </span>
                )}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[var(--primary,#4f46e5)] tracking-tight group-hover:scale-105 transition-transform origin-left">
                {item.value}
              </div>
              {item.subtext && (
                <p className="mt-2 text-xs text-[var(--muted-foreground,#64748b)] leading-relaxed">
                  {item.subtext}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats04_TimelineGrowth;
