'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { getLogos, searchLogos, type LogoStyle } from '@/site/lib/logos';

/**
 * Visual brand-logo picker for the studio. Lets the user browse the ~360
 * fictional brand SVGs (90 companies × badge/default × light/dark), search by
 * company, and select one — the selected URL is handed back via `onSelect`.
 */
export function LogoPicker({
  value,
  onSelect,
}: {
  value?: string;
  onSelect: (url: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [style, setStyle] = useState<LogoStyle>('badge');
  const [dark, setDark] = useState(false);

  const searched = searchLogos(query);
  const filtered = searched.filter((l) => l.style === style && l.dark === dark);
  const total = getLogos().length;

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${total} logos…`}
          className="pl-8"
        />
      </div>

      {/* Style + dark-mode toggles */}
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="flex rounded-lg border border-border bg-card p-0.5">
          {(['badge', 'default'] as LogoStyle[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors',
                style === s
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg border border-border bg-card p-0.5">
          {[false, true].map((d) => (
            <button
              key={d ? 'dark' : 'light'}
              type="button"
              onClick={() => setDark(d)}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors',
                dark === d
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {d ? 'Dark' : 'Light'}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} shown</span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-background/40 p-4 text-center">
          <p className="text-sm font-medium text-foreground">No logos match</p>
          <p className="mt-1 text-xs text-muted-foreground">Try a different search or toggle.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {filtered.map((logo) => {
            const selected = value === logo.url;
            return (
              <button
                key={logo.id}
                type="button"
                onClick={() => onSelect(logo.url)}
                title={logo.company}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-xl border bg-card p-1.5 text-left shadow-sm transition-all duration-150',
                  selected
                    ? 'border-primary ring-2 ring-primary/40'
                    : 'border-border hover:border-primary/40',
                )}
              >
                {/* Light card keeps dark-mode logos visible */}
                <span className="flex h-12 w-full items-center justify-center rounded-md bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.url}
                    alt={logo.company}
                    loading="lazy"
                    className="h-10 w-auto max-w-full object-contain"
                  />
                </span>
                <span className="w-full truncate text-center text-[10px] text-muted-foreground">
                  {logo.company}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}