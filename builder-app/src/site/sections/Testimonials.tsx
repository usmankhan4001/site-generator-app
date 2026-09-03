import { Star } from 'lucide-react';
import type { TestimonialsProps, SiteContent } from '@/site/schema';
import { cn } from '@/site/lib/cn';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import {
  resolveArchetypeStyle,
  sectionPadding,
  cardClass,
  gridGap,
  dividerClass,
} from '@/site/archetypes';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join('');
  return letters || '—';
}

/** Layout class: centre a single quote, pair two, grid three or more. */
function layoutClass(count: number): string {
  if (count === 1) return 'max-w-2xl mx-auto';
  if (count === 2) return 'md:grid-cols-2 max-w-5xl mx-auto';
  return 'md:grid-cols-2 lg:grid-cols-3';
}

/**
 * Testimonials — social proof cards with archetype-aware layout treatments:
 * - `stagger`: large single-column editorial pull-quotes with serif typography, quote marks, no stars (luxury).
 * - default: review cards with cardClass(s) and gridGap(s).
 */
export default function Testimonials({
  props,
  content,
}: {
  props: TestimonialsProps;
  content: SiteContent;
}) {
  if (!props.items?.length) return null;

  const {
    eyebrow = 'Client Validation',
    title = 'Trusted by Forward-Thinking Leaders',
    description,
    items,
  } = props;

  const s = resolveArchetypeStyle(content);
  const isAtelier = s.treatment === 'atelier';

  if (s.grid === 'stagger') {
    return (
      <section id="testimonials" className={sectionPadding(s)}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            system={s.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={s.headerAlign}
            className="mb-16 md:mb-20"
          />

          <div className="max-w-3xl mx-auto space-y-16 md:space-y-24">
            {items.map((t, idx) => {
              const meta = [t.role, t.company].filter(Boolean).join(', ');

              return (
                <figure
                  key={idx}
                  className={cn(
                    'relative text-center',
                    idx > 0 && dividerClass(s) && cn('pt-16 md:pt-24', dividerClass(s)),
                  )}
                >
                  <div
                    className="text-4xl sm:text-5xl md:text-6xl text-primary/40 font-serif leading-none select-none mb-4"
                    aria-hidden
                  >
                    &ldquo;
                  </div>
                  <blockquote className="relative">
                    <p
                      className="text-2xl sm:text-3xl md:text-4xl text-foreground font-normal leading-relaxed tracking-tight"
                      style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
                    >
                      {t.text}
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.name}
                        loading="lazy"
                        className="w-12 h-12 rounded-full object-cover border border-border shadow-xs"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold border border-border shrink-0">
                        {initials(t.name)}
                      </div>
                    )}
                    <div>
                      <div className="text-base font-medium text-foreground">{t.name}</div>
                      {meta && (
                        <div className="text-sm text-muted-foreground">{meta}</div>
                      )}
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className={sectionPadding(s)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={s.treatment}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={s.headerAlign}
          className="mb-16"
        />

        <div className={cn('grid grid-cols-1', layoutClass(items.length), gridGap(s))}>
          {items.map((t, idx) => {
            const stars = Math.max(1, Math.min(5, Math.round(t.rating ?? 5)));
            const meta = [t.role, t.company].filter(Boolean).join(', ');

            return (
              <div
                key={idx}
                className={cn(
                  'p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden',
                  cardClass(s),
                )}
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-5">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed italic mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-border/70">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border-2 border-border shadow-xs"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold border-2 border-border shrink-0">
                      {initials(t.name)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    {meta && (
                      <div className="text-xs text-muted-foreground font-medium">{meta}</div>
                    )}
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
