import type { StatsBarProps, SiteContent } from '@/site/schema';
import { cn } from '@/site/lib/cn';

/** Column class that adapts to the number of stats (2–5), falling back to 4. */
function gridColsClass(count: number): string {
  switch (count) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-2';
    case 3:
      return 'grid-cols-2 sm:grid-cols-3';
    case 5:
      return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
    default:
      return 'grid-cols-2 md:grid-cols-4';
  }
}

/**
 * StatsBar — thin metric band, usually placed straight under the hero.
 * Grid columns follow `props.items.length` rather than a hardcoded count.
 */
export default function StatsBar({ props }: { props: StatsBarProps; content: SiteContent }) {
  if (!props.items?.length) return null;

  return (
    <section className="border-y border-border bg-muted/40 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn('grid gap-6 text-center', gridColsClass(props.items.length))}>
          {props.items.map((stat, idx) => (
            <div key={idx} className="space-y-1.5 p-2">
              <div className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
              {stat.subtext && (
                <div className="text-[11px] text-muted-foreground/70 leading-snug">{stat.subtext}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
