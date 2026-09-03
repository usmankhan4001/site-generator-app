import type { LayoutSystem } from '@/site/schema';
import { FONT_MONO } from '@/site/layoutSystems';
import { cn } from '@/site/lib/cn';

/**
 * Shared eyebrow/title/description block. The one piece every marketing
 * section used to hand-roll identically (centered eyebrow → centered h2 →
 * centered p) — the single biggest driver of every generated site looking
 * like the same template. Each `system` renders a structurally different
 * treatment; sections should use this instead of re-rolling their own.
 */
export function SectionHeader({
  system,
  eyebrow,
  title,
  description,
  align = 'start',
  index,
  className,
}: {
  system: LayoutSystem;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** 'center' narrows + centers the block (single-column contexts like Faq). */
  align?: 'start' | 'center';
  /** Optional ordinal, e.g. "02" — only Signal/Foundation render it. */
  index?: string;
  className?: string;
}) {
  const centered = align === 'center';

  if (system === 'atelier') {
    return (
      <div className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
        {eyebrow ? (
          <span
            className="block text-sm italic text-primary mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {eyebrow}
          </span>
        ) : null}
        {title ? (
          <h2
            className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground leading-[1.08]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p
            className={cn(
              'mt-5 text-base text-muted-foreground leading-relaxed',
              centered ? 'mx-auto max-w-lg' : 'max-w-md border-l-2 border-primary/30 pl-5',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  if (system === 'foundation') {
    return (
      <div className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
        <div className={cn('border-t border-border pt-4 mb-5', centered && 'w-24 mx-auto')} />
        {eyebrow ? (
          <span
            className="block text-[11px] font-semibold tracking-[0.12em] text-primary mb-3"
            style={{ fontFamily: FONT_MONO }}
          >
            {index ? `[${index}] ` : '// '}
            {eyebrow.toUpperCase()}
          </span>
        ) : null}
        {title ? (
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p
            className={cn(
              'mt-4 text-sm text-muted-foreground leading-relaxed',
              centered ? 'mx-auto max-w-lg' : 'max-w-lg',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  if (system === 'workshop') {
    return (
      <div className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
        {eyebrow ? (
          <div className={cn('flex items-center gap-2 mb-3', centered && 'justify-center')}>
            <span className="h-2.5 w-2.5 shrink-0 bg-primary" aria-hidden />
            <span className="text-xs font-bold tracking-[0.16em] uppercase text-primary [font-stretch:condensed]">
              {index ? `${index} · ` : ''}
              {eyebrow.toUpperCase()}
            </span>
          </div>
        ) : null}
        {title ? (
          <h2 className="text-3xl sm:text-[2.5rem] font-extrabold tracking-tight leading-[1.05] text-foreground uppercase [font-stretch:condensed]">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p
            className={cn(
              'mt-4 text-base font-medium text-muted-foreground leading-relaxed',
              centered ? 'mx-auto max-w-xl' : 'max-w-xl',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  // signal (default)
  return (
    <div className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <div
          className={cn(
            'flex items-center gap-2.5 mb-4',
            centered && 'justify-center',
          )}
        >
          {index ? (
            <span className="text-xs font-semibold text-primary" style={{ fontFamily: FONT_MONO }}>
              {index}
            </span>
          ) : (
            <span className="h-px w-8 bg-primary" aria-hidden />
          )}
          <span className="text-xs font-semibold tracking-[0.14em] uppercase text-primary">
            {eyebrow}
          </span>
        </div>
      ) : null}
      {title ? (
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
      ) : null}
      {description ? (
        <p
          className={cn(
            'mt-4 text-base text-muted-foreground leading-relaxed',
            centered ? 'mx-auto max-w-xl' : 'max-w-xl',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
