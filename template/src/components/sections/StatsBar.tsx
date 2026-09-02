'use client';

import { StatItem } from '@/lib/constants';

interface StatsBarProps {
  stats: StatItem[];
}

export function StatsBar({ stats }: StatsBarProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1.5 p-2">
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
