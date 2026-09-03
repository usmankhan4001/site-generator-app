'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Loader2, Search, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getTheme } from '@/site/themes';
import { cn } from '@/lib/utils';

export interface TemplateOption {
  id: string;
  name: string;
  sector: 'tech' | 'retail' | 'hosting';
  mode: 'services' | 'ecommerce';
  themeId: string;
  accent?: string;
  description: string;
  ogImage?: string;
  needsPersonalization: boolean;
}

type SectorFilter = 'all' | 'tech' | 'retail' | 'hosting';

const SECTORS: { key: 'tech' | 'retail' | 'hosting'; label: string }[] = [
  { key: 'tech', label: 'Software & Tech' },
  { key: 'retail', label: 'E-commerce & Retail' },
  { key: 'hosting', label: 'Hosting & Infra' },
];

const FILTERS: { key: SectorFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'tech', label: 'Tech' },
  { key: 'retail', label: 'Retail' },
  { key: 'hosting', label: 'Hosting' },
];

function swatch(t: TemplateOption): string {
  return t.accent?.trim() || getTheme(t.themeId).preview.accent;
}

function Thumb({ t, className }: { t: TemplateOption; className?: string }) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-md border border-border bg-muted',
        className,
      )}
    >
      {t.ogImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={t.ogImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase text-white/80"
          style={{ background: swatch(t) }}
        >
          {t.name.slice(0, 2)}
        </div>
      )}
    </div>
  );
}

export function NewProjectDialog({
  templates,
  open,
  onOpenChange,
}: {
  templates: TemplateOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  const [sector, setSector] = useState<SectorFilter>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<TemplateOption | null>(null);
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset everything whenever the dialog is closed.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setSector('all');
      setQuery('');
      setSelected(null);
      setName('');
      setCreating(false);
      setError(null);
    }, 150);
    return () => clearTimeout(t);
  }, [open]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SECTORS.map((s) => ({
      ...s,
      items: templates.filter((t) => {
        if (sector !== 'all' && t.sector !== sector) return false;
        if (t.sector !== s.key) return false;
        if (!q) return true;
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
        );
      }),
    })).filter((g) => g.items.length > 0);
  }, [templates, sector, query]);

  const matchCount = groups.reduce((n, g) => n + g.items.length, 0);

  function pick(t: TemplateOption) {
    setSelected(t);
    setName(t.name);
    setError(null);
  }

  async function handleCreate() {
    if (!selected) return;
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Give the site a name.');
      return;
    }
    setCreating(true);
    setError(null);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: selected.id, name: trimmed }),
      });
      const data = await res.json().catch(() => null);
      if (res.status !== 201 || !data?.project?.id) {
        throw new Error(data?.error || `Could not create site (${res.status}).`);
      }
      router.push(`/project/${data.project.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setCreating(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        {selected ? (
          <>
            <DialogHeader>
              <DialogTitle>Name your site</DialogTitle>
              <DialogDescription>
                Starting from{' '}
                <span className="text-foreground">{selected.name}</span>. You can
                rename it any time.
              </DialogDescription>
            </DialogHeader>

            <div className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3">
              <Thumb t={selected} className="h-16 w-24" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: swatch(selected) }}
                  />
                  <p className="truncate text-sm font-medium">{selected.name}</p>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {selected.description}
                </p>
                {selected.needsPersonalization && (
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                    <Sparkles className="h-3 w-3" />
                    Needs personalisation
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-site-name">Site name</Label>
              <Input
                id="new-site-name"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !creating) handleCreate();
                }}
                placeholder="Acme Inc."
              />
            </div>

            {error && (
              <p className="text-xs text-red-300">{error}</p>
            )}

            <div className="flex items-center justify-between gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelected(null)}
                disabled={creating}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={creating}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={handleCreate} disabled={creating}>
                  {creating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating…
                    </>
                  ) : (
                    'Create site'
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>New site</DialogTitle>
              <DialogDescription>
                Pick one of {templates.length} templates to start from.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap items-center gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setSector(f.key)}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                    sector === f.key
                      ? 'border-primary/40 bg-primary/15 text-primary'
                      : 'border-border bg-muted/40 text-muted-foreground hover:text-foreground',
                  )}
                >
                  {f.label}
                </button>
              ))}
              <div className="relative ml-auto w-full sm:w-56">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search templates"
                  className="h-9 pl-8 text-xs"
                />
              </div>
            </div>

            <div className="thin-scroll -mx-1 max-h-[46vh] overflow-y-auto px-1">
              {matchCount === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No templates match “{query}”.
                </p>
              ) : (
                <div className="space-y-5">
                  {groups.map((g) => (
                    <div key={g.key}>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {g.label}
                        <span className="ml-1.5 font-normal text-muted-foreground/60">
                          {g.items.length}
                        </span>
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {g.items.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => pick(t)}
                            className="group flex gap-3 rounded-lg border border-border bg-card p-2.5 text-left transition-colors hover:border-primary/50 hover:bg-accent/40"
                          >
                            <Thumb t={t} className="h-14 w-20" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="h-2 w-2 shrink-0 rounded-full"
                                  style={{ background: swatch(t) }}
                                />
                                <p className="truncate text-xs font-semibold">
                                  {t.name}
                                </p>
                              </div>
                              <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                                {t.description}
                              </p>
                              {t.needsPersonalization && (
                                <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-300">
                                  <Sparkles className="h-2.5 w-2.5" />
                                  Needs personalisation
                                </span>
                              )}
                            </div>
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-60" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
