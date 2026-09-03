import { Star } from 'lucide-react';
import type { TestimonialsProps, SiteContent } from '@/site/schema';
import { cn } from '@/site/lib/cn';

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
 * Testimonials — social proof cards. Missing `avatar` falls back to an
 * initials circle. Star count is clamped to 1–5.
 */
export default function Testimonials({
  props,
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

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">{eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
          )}
        </div>

        <div className={cn('grid grid-cols-1 gap-8', layoutClass(items.length))}>
          {items.map((t, idx) => {
            const stars = Math.max(1, Math.min(5, Math.round(t.rating ?? 5)));
            const meta = [t.role, t.company].filter(Boolean).join(', ');

            return (
              <div
                key={idx}
                className="card-elevated p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden rounded-xl border border-border/80 bg-card"
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
