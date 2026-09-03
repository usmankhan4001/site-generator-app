'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Loader2, Check, Pencil, TriangleAlert, Rocket } from 'lucide-react';
import { useStudio } from '@/store/studio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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
  const name = useStudio((s) => s.meta?.name ?? '');
  const status = useStudio((s) => s.meta?.status ?? 'draft');
  const saving = useStudio((s) => s.saving);
  const dirty = useStudio((s) => s.dirty);
  const lastSavedAt = useStudio((s) => s.lastSavedAt);
  const error = useStudio((s) => s.error);
  const rename = useStudio((s) => s.rename);
  const saveNow = useStudio((s) => s.saveNow);
  const setStep = useStudio((s) => s.setStep);

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

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

      <div className="ml-2 min-w-0 flex-1">
        <SaveIndicator
          saving={saving}
          dirty={dirty}
          lastSavedAt={lastSavedAt}
          error={error}
          now={now}
          onRetry={() => void saveNow()}
        />
      </div>

      <Button size="sm" onClick={() => setStep('deploy')} className="shrink-0">
        <Rocket className="h-4 w-4" />
        Deploy
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
