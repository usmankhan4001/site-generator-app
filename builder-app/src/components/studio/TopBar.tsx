'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Loader2,
  Check,
  Pencil,
  TriangleAlert,
  Sun,
  Moon,
  LogOut,
  Undo2,
  Redo2,
  Monitor,
  Tablet,
  Smartphone,
  Menu,
  Plus,
  Building2,
  PanelRightClose,
  ChevronDown,
  Download,
  Eye,
  Edit3,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, useActivePage, DEVICE_WIDTH, type PreviewDevice } from '@/store/studio';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

const DEVICES: { id: PreviewDevice; label: string; icon: LucideIcon }[] = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
];

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

interface FloatingToolbarProps {
  pagesOpen: boolean;
  onTogglePages: () => void;
  onOpenAddSection: () => void;
  onOpenBusinessProfile: () => void;
  onOpenExportHost: () => void;
  onToggleProperties: () => void;
}

export function TopBar({
  pagesOpen,
  onTogglePages,
  onOpenAddSection,
  onOpenBusinessProfile,
  onOpenExportHost,
  onToggleProperties,
}: FloatingToolbarProps) {
  const router = useRouter();
  const name = useStudio((s) => s.meta?.name ?? '');
  const activePage = useActivePage();
  const saving = useStudio((s) => s.saving);
  const dirty = useStudio((s) => s.dirty);
  const lastSavedAt = useStudio((s) => s.lastSavedAt);
  const error = useStudio((s) => s.error);
  const rename = useStudio((s) => s.rename);
  const saveNow = useStudio((s) => s.saveNow);
  const viewMode = useStudio((s) => s.viewMode);
  const setViewMode = useStudio((s) => s.setViewMode);
  const device = useStudio((s) => s.device);
  const setDevice = useStudio((s) => s.setDevice);
  const canUndo = useStudio((s) => s.undoStack.length > 0);
  const canRedo = useStudio((s) => s.redoStack.length > 0);
  const undo = useStudio((s) => s.undo);
  const redo = useStudio((s) => s.redo);

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

  const isEditMode = viewMode === 'edit';

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-center px-4 pt-3">
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="pointer-events-auto flex items-center gap-1.5 rounded-2xl border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-md transition-all"
      >
        {/* Return to Dashboard */}
        <Link
          href="/"
          className="inline-flex h-8 items-center gap-1.5 rounded-xl px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Return to Dashboard"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Dashboard</span>
        </Link>

        {/* Separator */}
        <div className="h-4 w-px bg-border" />

        {/* Pages trigger with current page label */}
        <button
          type="button"
          onClick={onTogglePages}
          aria-label={pagesOpen ? 'Close pages panel' : 'Open pages panel'}
          aria-expanded={pagesOpen}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-xl px-2.5 text-xs font-medium transition-colors',
            pagesOpen
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-foreground hover:bg-accent',
          )}
        >
          <Menu className="h-3.5 w-3.5" />
          <span className="max-w-[100px] truncate">{activePage?.navLabel || activePage?.title || 'Home'}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </button>

        {/* Add Block button */}
        <button
          type="button"
          onClick={onOpenAddSection}
          className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-primary/10 px-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
          title="Add a new section to this page"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Block</span>
        </button>

        {/* Centralized Business Profile modal trigger */}
        <button
          type="button"
          onClick={onOpenBusinessProfile}
          className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-border/60 bg-background/50 px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          title="Centralized business profile, legal details & AI copy engine"
        >
          <Building2 className="h-3.5 w-3.5 text-primary" />
          <span>Business Hub</span>
        </button>

        {/* Separator */}
        <div className="h-4 w-px bg-border" />

        {/* Inline editable project title */}
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
            className="h-7 w-36 rounded-md border border-input bg-background px-2 text-xs font-semibold outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="group inline-flex max-w-[130px] items-center gap-1 truncate rounded-md px-1.5 py-1 text-xs font-semibold text-foreground hover:bg-accent"
            title="Rename site"
          >
            <span className="truncate">{name || 'Untitled site'}</span>
            <Pencil className="h-2.5 w-2.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        )}

        {/* Separator */}
        <div className="h-4 w-px bg-border" />

        {/* Device toggle */}
        <div className="flex shrink-0 rounded-lg bg-muted/60 p-0.5">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDevice(d.id)}
              title={`${d.label} · ${DEVICE_WIDTH[d.id]}px`}
              aria-label={d.label}
              aria-pressed={device === d.id}
              className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors',
                device === d.id
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <d.icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

        {/* Browse ⇄ Edit Odoo Mode Switch */}
        <div className="flex rounded-lg bg-muted/60 p-0.5" role="group" aria-label="View mode">
          <button
            type="button"
            onClick={() => setViewMode('edit')}
            aria-pressed={isEditMode}
            className={cn(
              'inline-flex items-center gap-1.5 justify-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
              isEditMode
                ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground',
            )}
            title="Edit mode: modify blocks, copy, and layout"
          >
            <Edit3 className="h-3 w-3" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            aria-pressed={!isEditMode}
            className={cn(
              'inline-flex items-center gap-1.5 justify-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
              !isEditMode
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground',
            )}
            title="Browse mode: test live navigation and buttons"
          >
            <Eye className="h-3 w-3" />
            <span>Browse</span>
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-muted-foreground"
            onClick={undo}
            disabled={!canUndo}
            aria-label="Undo"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-muted-foreground"
            onClick={redo}
            disabled={!canRedo}
            aria-label="Redo"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Separator */}
        <div className="h-4 w-px bg-border" />

        {/* Save indicator */}
        <SaveIndicator
          saving={saving}
          dirty={dirty}
          lastSavedAt={lastSavedAt}
          error={error}
          now={now}
          onRetry={() => void saveNow()}
        />

        {/* Theme toggle */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-muted-foreground"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {resolvedTheme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </Button>
        )}

        {/* Sign out button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
          onClick={async () => {
            await authClient.signOut();
            router.push('/sign-in');
            router.refresh();
          }}
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="h-3.5 w-3.5" />
        </Button>

        {/* Export & Host Hub Button */}
        <Button
          size="sm"
          onClick={onOpenExportHost}
          className="h-8 shrink-0 gap-1.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white px-3 text-xs font-semibold shadow-sm transition-all"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export & Host</span>
        </Button>

        {/* Properties drawer toggle */}
        <button
          type="button"
          onClick={onToggleProperties}
          aria-label="Toggle properties panel"
          className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Section & Design Properties"
        >
          <PanelRightClose className="h-4 w-4" />
        </button>
      </div>
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
      <span className="inline-flex items-center gap-1 text-[11px] text-destructive">
        <TriangleAlert className="h-3 w-3" />
        <button
          type="button"
          onClick={onRetry}
          className="underline underline-offset-2 hover:text-destructive/80"
        >
          Retry
        </button>
      </span>
    );
  }
  if (saving) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" />
        Saving…
      </span>
    );
  }
  if (dirty) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Unsaved
      </span>
    );
  }
  if (lastSavedAt) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/80">
        <Check className="h-3 w-3 text-emerald-400" />
        {relativeTime(lastSavedAt, now)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/60">
      <Check className="h-3 w-3" />
      Saved
    </span>
  );
}
