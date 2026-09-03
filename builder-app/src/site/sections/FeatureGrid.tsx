import * as Icons from 'lucide-react';
import type { FeatureGridProps, SiteContent } from '@/site/schema';
import { cn } from '@/site/lib/cn';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import {
  resolveArchetypeStyle,
  sectionPadding,
  cardClass,
  gridGap,
  imageWrapClass,
  dividerClass,
} from '@/site/archetypes';

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
 * FeatureGrid — capability grid with archetype-aware layout treatments:
 * - `stagger`: full-bleed alternating editorial rows with story paragraphs & large images (luxury).
 * - `asymmetric`: bento grid with first/featured item spanning 2 columns (agency/saas).
 * - `even`: standard adaptable grid with cardClass and gridGap.
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

  const s = resolveArchetypeStyle(content);
  const isAtelier = s.treatment === 'atelier';

  if (s.grid === 'stagger') {
    return (
      <section id="features" className={sectionPadding(s)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={s.headerAlign}
            className="mb-16 md:mb-24"
          />

          <div className="space-y-16 md:space-y-28">
            {items.map((feature, idx) => {
              const isReversed = idx % 2 === 1;
              const Icon = (feature.icon && (Icons as any)[feature.icon]) || Icons.Sparkles;

              return (
                <div
                  key={idx}
                  className={cn(
                    'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center',
                    idx > 0 && dividerClass(s) && cn('pt-16 md:pt-28', dividerClass(s)),
                  )}
                >
                  <div
                    className={cn(
                      'lg:col-span-7',
                      isReversed && 'lg:order-2',
                    )}
                  >
                    {feature.image ? (
                      <div className={cn('overflow-hidden relative', imageWrapClass(s))}>
                        <img
                          src={feature.image}
                          alt={feature.title}
                          loading="lazy"
                          className="w-full h-auto aspect-16/10 object-cover"
                        />
                        {feature.badge && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-background/90 text-foreground backdrop-blur-sm border border-border/50">
                              {feature.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-16/10 flex items-center justify-center bg-muted/40 relative">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <Icon className="h-10 w-10" />
                        </div>
                        {feature.badge && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-background/90 text-foreground border border-border/50">
                              {feature.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      'lg:col-span-5 space-y-4',
                      isReversed && 'lg:order-1',
                    )}
                  >
                    {feature.badge && (
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                        {feature.badge}
                      </span>
                    )}
                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight leading-snug"
                      style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (s.grid === 'asymmetric') {
    return (
      <section id="features" className={sectionPadding(s)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={s.headerAlign}
            className="mb-16"
          />

          <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3', gridGap(s))}>
            {items.map((feature, idx) => {
              const isFeatured = idx === 0;
              const Icon = (feature.icon && (Icons as any)[feature.icon]) || Icons.Sparkles;

              return (
                <div
                  key={idx}
                  className={cn(
                    'flex flex-col overflow-hidden group',
                    cardClass(s),
                    isFeatured && 'md:col-span-2 lg:col-span-2',
                  )}
                >
                  {feature.image ? (
                    <div
                      className={cn(
                        'overflow-hidden relative bg-muted',
                        imageWrapClass(s),
                        isFeatured ? 'h-64 sm:h-72 md:h-80' : 'h-52 sm:h-56',
                      )}
                    >
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
                    <div
                      className={cn(
                        'flex items-center justify-center bg-muted/40 relative',
                        isFeatured ? 'h-64 sm:h-72 md:h-80' : 'h-52 sm:h-56',
                      )}
                    >
                      <div
                        className={cn(
                          'rounded-2xl bg-primary/10 flex items-center justify-center text-primary',
                          isFeatured ? 'w-20 h-20' : 'w-16 h-16',
                        )}
                      >
                        <Icon className={isFeatured ? 'h-10 w-10' : 'h-8 w-8'} />
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
                      <h3
                        className={cn(
                          'font-bold text-foreground leading-snug',
                          isFeatured ? 'text-xl sm:text-2xl' : 'text-lg',
                        )}
                        style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                      >
                        {feature.title}
                      </h3>
                      <p className={cn('text-muted-foreground leading-relaxed', isFeatured ? 'text-base' : 'text-sm')}>
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

  // s.grid === 'even' (default)
  return (
    <section id="features" className={sectionPadding(s)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={s.treatment}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={s.headerAlign}
          className="mb-16"
        />

        <div className={cn('grid grid-cols-1', gridColsClass(items.length), gridGap(s))}>
          {items.map((feature, idx) => {
            const Icon = (feature.icon && (Icons as any)[feature.icon]) || Icons.Sparkles;

            return (
              <div
                key={idx}
                className={cn('flex flex-col overflow-hidden group', cardClass(s))}
              >
                {feature.image ? (
                  <div className={cn('h-52 sm:h-56 overflow-hidden relative bg-muted', imageWrapClass(s))}>
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
                    <h3
                      className="text-lg font-bold text-foreground leading-snug"
                      style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                    >
                      {feature.title}
                    </h3>
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
