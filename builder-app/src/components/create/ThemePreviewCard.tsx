'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { themeToStyleObject, type SiteTheme } from '@/site/themes';

/**
 * A real, rendered miniature of a website — nav, hero, headline and button —
 * drawn with the theme's own font stacks, colours and corner radii via CSS
 * custom properties. Picking a "vibe" means picking one of these, not a
 * colour dot or a word.
 */
export function ThemePreviewCard({
  theme,
  selected,
  onClick,
}: {
  theme: SiteTheme;
  selected: boolean;
  onClick: () => void;
}) {
  const style = themeToStyleObject(theme);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all duration-200',
        selected
          ? 'border-primary shadow-md'
          : 'border-border hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5',
      )}
    >
      <div style={style} className="p-3.5">
        {/* mini nav */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--primary)' }} />
            <span
              className="h-1.5 w-9 rounded-full"
              style={{ background: 'var(--foreground)', opacity: 0.55 }}
            />
          </div>
          <div className="flex gap-1.5">
            <span className="h-1.5 w-5 rounded-full" style={{ background: 'var(--muted-foreground)', opacity: 0.4 }} />
            <span className="h-1.5 w-5 rounded-full" style={{ background: 'var(--muted-foreground)', opacity: 0.4 }} />
          </div>
        </div>

        {/* mini hero card */}
        <div
          className="space-y-2 p-3"
          style={{ background: 'var(--card)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}
        >
          <p
            className="text-[13px] font-semibold leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
          >
            Build something great.
          </p>
          <p
            className="text-[10px] leading-snug"
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--muted-foreground)' }}
          >
            A short line about what you do.
          </p>
          <span
            className="inline-block px-3 py-1 text-[9px] font-medium"
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius-button)',
            }}
          >
            Get started
          </span>
        </div>
      </div>

      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </span>
      )}

      <div className="flex items-center justify-between border-t border-border bg-white px-3 py-2">
        <span className="truncate text-xs font-semibold text-foreground">{theme.name}</span>
        <span className="truncate text-[10px] text-muted-foreground">{theme.industry.split(' / ')[0]}</span>
      </div>
    </button>
  );
}
