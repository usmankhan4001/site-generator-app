import * as Icons from 'lucide-react';
import { cn } from '@/site/lib/cn';
import type { ValueGridProps, SiteContent } from '@/site/schema';

const COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

/**
 * "Core Foundations" style grid ported from the template about page — an icon
 * tile in `bg-primary/10`, title and description. Icon resolved dynamically from
 * its lucide name, falling back to `ShieldCheck`.
 */
export default function ValueGrid({
  props,
}: {
  props: ValueGridProps;
  content: SiteContent;
}) {
  const { eyebrow, title, description, items, columns } = props;

  if (!items?.length) return null;

  const n = Math.min(Math.max(columns ?? Math.min(items.length, 4), 2), 4);

  return (
    <section className="py-20 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {eyebrow ? (
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-foreground">
            {title ?? 'Our Core Foundations'}
          </h2>
          {description ? (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          ) : null}
        </div>

        <div className={cn('grid gap-6', COLS[n] ?? COLS[4])}>
          {items.map((item, i) => {
            const Icon = (Icons as any)[item.icon ?? ''] ?? Icons.ShieldCheck;
            return (
              <div
                key={i}
                className="card-elevated rounded-2xl p-6 border border-border bg-card hover:border-primary/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
