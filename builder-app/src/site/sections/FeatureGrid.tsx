import * as Icons from 'lucide-react';
import type { FeatureGridProps, SiteContent } from '@/site/schema';
import { cn } from '@/site/lib/cn';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveLayoutSystem } from '@/site/layoutSystems';

/** Grid column class that adapts to the item count. */
function gridColsClass(count: number): string {
  switch (count) {
    case 1:
      return 'md:grid-cols-1 max-w-xl mx-auto';
    case 2:
      return 'md:grid-cols-2';
    case 4:
      return 'md:grid-cols-2 lg:grid-cols-4';
    default:
      return 'md:grid-cols-3';
  }
}

/**
 * FeatureGrid — bento-style capability grid (image + badge overlay).
 * Items without an `image` render a lucide icon tile instead (icon named by
 * `item.icon`, falling back to `Sparkles`).
 */
export default function FeatureGrid({
  props,
  content,
}: {
  props: FeatureGridProps;
  content: SiteContent;
}) {
  if (!props.items?.length) return null;

  const {
    eyebrow = 'Engineered Capabilities',
    title = 'Designed for Speed, Security & Precision',
    description = 'Explore our purpose-built technical foundations engineered to deliver unmatched reliability and performance.',
    items,
  } = props;

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={resolveLayoutSystem(content)}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mb-16"
        />

        <div className={cn('grid grid-cols-1 gap-6 lg:gap-8', gridColsClass(items.length))}>
          {items.map((feature, idx) => {
            const Icon = (feature.icon && (Icons as any)[feature.icon]) || Icons.Sparkles;

            return (
              <div
                key={idx}
                className="card-elevated flex flex-col overflow-hidden group rounded-xl border border-border/80 bg-card"
              >
                {feature.image ? (
                  <div className="h-52 sm:h-56 overflow-hidden relative bg-muted">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {feature.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 text-foreground backdrop-blur-sm shadow-xs border border-border/50">
                          {feature.badge}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-52 sm:h-56 flex items-center justify-center bg-muted/40 relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-8 w-8" />
                    </div>
                    {feature.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 text-foreground shadow-xs border border-border/50">
                          {feature.badge}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex-1 flex flex-col p-6 pt-5">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground leading-snug">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
