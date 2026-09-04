'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  ChevronLeft,
  Loader2,
  Check,
  Pencil,
  TriangleAlert,
  Rocket,
  Download,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, DEVICE_WIDTH, type PreviewDevice } from '@/store/studio';
import type { SitePage } from '@/site/schema';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const DEVICES: { id: PreviewDevice; label: string; icon: LucideIcon }[] = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
];

const EMPTY: SitePage[] = [];

function relativeTime(from: number, now: number): string {
  const s = Math.max(0, Math.round((now - from) / 1000));
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function TopBar() {
  const meta = useStudio((s) => s.meta);
  const name = useStudio((s) => s.meta?.name ?? '');
  const status = useStudio((s) => s.meta?.status ?? 'draft');
  const saving = useStudio((s) => s.saving);
  const dirty = useStudio((s) => s.dirty);
  const lastSavedAt = useStudio((s) => s.lastSavedAt);
  const error = useStudio((s) => s.error);
  const rename = useStudio((s) => s.rename);
  const saveNow = useStudio((s) => s.saveNow);
  const setStep = useStudio((s) => s.setStep);

  const pages = useStudio((s) => s.content?.pages ?? EMPTY);
  const activePagePath = useStudio((s) => s.activePagePath);
  const device = useStudio((s) => s.device);
  const setDevice = useStudio((s) => s.setDevice);
  const setActivePage = useStudio((s) => s.setActivePage);

  // --- page selector options (moved here verbatim from PreviewPane) --------
  const pageOptions = useMemo(() => {
    const filtered = pages.filter((p) => p.nav || p.key.startsWith('policy') || p.key === 'checkout');
    const base = filtered.length ? filtered : pages;
    if (!base.some((p) => p.path === activePagePath)) {
      const active = pages.find((p) => p.path === activePagePath);
      if (active) return [active, ...base];
    }
    return base;
  }, [pages, activePagePath]);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setDraft(name);
      requestAnimationFrame(() => inputRef.current?.select());
    }
  }, [editing, name]);

  const commit = () => {
    const next = draft.trim();
    if (next && next !== name) rename(next);
    setEditing(false);
  };

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-3">
      <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
        <Link href="/" aria-label="Back to dashboard">
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </Button>

      <Separator orientation="vertical" className="mx-1 h-5" />

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') setEditing(false);
          }}
          className="h-8 w-64 rounded-md border border-input bg-background px-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="group inline-flex max-w-[40vw] items-center gap-1.5 truncate rounded-md px-2 py-1 text-sm font-medium hover:bg-accent"
          title="Rename project"
        >
          <span className="truncate">{name || 'Untitled site'}</span>
          <Pencil className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      )}

      <Badge variant="outline" className="ml-1 shrink-0 capitalize">
        {status}
      </Badge>

      <div className="ml-2 min-w-0 shrink-0">
        <SaveIndicator
          saving={saving}
          dirty={dirty}
          lastSavedAt={lastSavedAt}
          error={error}
          now={now}
          onRetry={() => void saveNow()}
        />
      </div>

      {/* Center: device viewport toggle + page selector for the canvas below */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
        <div className="hidden shrink-0 rounded-lg bg-muted p-0.5 sm:flex">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDevice(d.id)}
              title={`${d.label} · ${DEVICE_WIDTH[d.id]}px`}
              aria-pressed={device === d.id}
              className={cn(
                'inline-flex h-7 w-8 items-center justify-center rounded-md transition-colors',
                device === d.id
                  ? 'bg-background text-foreground shadow-subtle'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <d.icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <select
          value={activePagePath}
          onChange={(e) => setActivePage(e.target.value)}
          aria-label="Preview page"
          className="h-8 w-full max-w-[160px] truncate rounded-md border border-input bg-background px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring sm:max-w-[220px]"
        >
          {pageOptions.map((p) => (
            <option key={p.key} value={p.path}>
              {(p.navLabel || p.title) + (p.path === '/' ? '' : `  ·  ${p.path}`)}
            </option>
          ))}
        </select>
      </div>

      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-muted-foreground"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      )}

      <Button asChild variant="outline" size="sm" className="shrink-0">
        <a href={`/api/projects/${meta?.id ?? ''}/export`} download>
          <Download className="h-4 w-4" />
          Export
        </a>
      </Button>

      <Button size="sm" onClick={() => setStep('deploy')} className="shrink-0">
        <Rocket className="h-4 w-4" />
        Publish
      </Button>
    </header>
  );
}

function SaveIndicator({
  saving,
  dirty,
  lastSavedAt,
  error,
  now,
  onRetry,
}: {
  saving: boolean;
  dirty: boolean;
  lastSavedAt: number | null;
  error: string | null;
  now: number;
  onRetry: () => void;
}) {
  if (error && !saving) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-destructive">
        <TriangleAlert className="h-3.5 w-3.5" />
        Save failed
        <button
          type="button"
          onClick={onRetry}
          className="rounded px-1 underline underline-offset-2 hover:text-destructive/80"
        >
          Retry
        </button>
      </span>
    );
  }
  if (saving) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Saving…
      </span>
    );
  }
  if (dirty) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className={cn('h-1.5 w-1.5 rounded-full bg-amber-400')} />
        Unsaved changes
      </span>
    );
  }
  if (lastSavedAt) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className="h-3.5 w-3.5 text-emerald-400" />
        Saved <span className="text-muted-foreground/70">{relativeTime(lastSavedAt, now)}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
      <Check className="h-3.5 w-3.5" />
      All changes saved
    </span>
  );
}
