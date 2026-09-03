'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Copy, ExternalLink, Globe, Loader2, MoreHorizontal, Trash2 } from 'lucide-react';
import type { ProjectSummary } from '@/lib/studio/projects';
import { getTheme } from '@/site/themes';
import { relativeTime } from './relativeTime';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';

export function ProjectCard({
  project,
  busy,
  onDuplicate,
  onDelete,
}: {
  project: ProjectSummary;
  busy?: boolean;
  onDuplicate: (project: ProjectSummary) => void;
  onDelete: (project: ProjectSummary) => void;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const accent = getTheme(project.themeId).preview.accent;
  const isStore = project.mode === 'ecommerce';
  const href = `/project/${project.id}`;

  return (
    <div
      className={cn(
        'group relative rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40',
        busy && 'opacity-60',
      )}
    >
      <Link
        href={href}
        aria-label={`Open ${project.name}`}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />

      <div className="pointer-events-none relative z-10 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full ring-1 ring-inset ring-white/10"
              style={{ background: accent }}
            />
            <h3 className="truncate text-sm font-semibold">{project.name}</h3>
          </div>

          <div ref={menuRef} className="pointer-events-auto relative -mr-1 -mt-1">
            <button
              type="button"
              aria-label="Project actions"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-8 z-30 w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-xl"
              >
                <MenuItem
                  icon={<ExternalLink className="h-3.5 w-3.5" />}
                  label="Open"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(href);
                  }}
                />
                <MenuItem
                  icon={<Copy className="h-3.5 w-3.5" />}
                  label="Duplicate"
                  onClick={() => {
                    setMenuOpen(false);
                    onDuplicate(project);
                  }}
                />
                <MenuItem
                  icon={<Trash2 className="h-3.5 w-3.5" />}
                  label="Delete"
                  destructive
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(project);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {isStore ? 'Store' : 'Services'}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex min-w-0 items-center gap-1">
            <Globe className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {project.domain || 'No domain yet'}
            </span>
          </span>
          <span className="shrink-0">Updated {relativeTime(project.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  destructive,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-medium transition-colors',
        destructive
          ? 'text-red-300 hover:bg-red-500/10'
          : 'text-foreground hover:bg-accent',
      )}
    >
      {icon}
      {label}
    </button>
  );
}
