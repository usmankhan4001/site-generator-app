'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  Copy,
  Download,
  ExternalLink,
  Globe,
  Layers,
  Loader2,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import type { ProjectSummary } from '@/lib/studio/projects';
import { getTheme } from '@/site/themes';
import { relativeTime } from './relativeTime';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
  const [exporting, setExporting] = useState(false);
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

  const archetypeLabel = project.templateId?.startsWith('archetype:')
    ? project.templateId.replace('archetype:', '').split(':')[0]
    : null;

  async function handleExport() {
    setExporting(true);
    setMenuOpen(false);
    try {
      const link = document.createElement('a');
      link.href = `/api/projects/${project.id}/export`;
      link.download = `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-source.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      console.error('Export failed');
    } finally {
      setTimeout(() => setExporting(false), 1000);
    }
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card/60 p-5 transition-all duration-200',
        'hover:border-foreground/25 hover:bg-card hover:shadow-sm',
        busy && 'pointer-events-none opacity-60',
      )}
    >
      <div>
        {/* Top Header: Accent Dot + Title + More Menu */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/10"
              style={{ background: accent }}
            />
            <Link
              href={href}
              className="truncate text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {project.name}
            </Link>
          </div>

          <div ref={menuRef} className="relative -mr-1 -mt-1 shrink-0">
            <button
              type="button"
              aria-label="Project actions"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {busy || exporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-8 z-30 w-44 overflow-hidden rounded-lg border border-border/80 bg-popover p-1 shadow-xl backdrop-blur-md"
              >
                <MenuItem
                  icon={<ExternalLink className="h-3.5 w-3.5" />}
                  label="Open Workspace"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(href);
                  }}
                />
                <MenuItem
                  icon={<Copy className="h-3.5 w-3.5" />}
                  label="Duplicate Site"
                  onClick={() => {
                    setMenuOpen(false);
                    onDuplicate(project);
                  }}
                />
                <MenuItem
                  icon={<Download className="h-3.5 w-3.5" />}
                  label="Export Source ZIP"
                  onClick={handleExport}
                />
                <div className="my-1 border-t border-border/60" />
                <MenuItem
                  icon={<Trash2 className="h-3.5 w-3.5" />}
                  label="Delete Site"
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

        {/* Badges: Mode + Archetype / Status */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-md border border-border/70 bg-muted/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {isStore ? 'E-Commerce' : 'Services'}
          </span>
          {archetypeLabel && (
            <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/20 px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
              <Layers className="h-2.5 w-2.5" />
              {archetypeLabel}
            </span>
          )}
          <StatusBadge status={project.status} />
        </div>

        {/* Domain and Update Info */}
        <div className="mt-4 flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex min-w-0 items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span className="truncate text-[11px]">
              {project.customDomain || project.domain || 'No domain attached'}
            </span>
          </div>
          <span className="shrink-0 text-[11px] text-muted-foreground/60">
            {relativeTime(project.updatedAt)}
          </span>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
            onClick={() => onDuplicate(project)}
            title="Duplicate Site"
          >
            <Copy className="mr-1 h-3 w-3" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
            onClick={handleExport}
            title="Export ZIP"
          >
            <Download className="mr-1 h-3 w-3" />
            Export
          </Button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="h-7 gap-1 px-2.5 text-[11px] font-medium shadow-none hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => router.push(href)}
        >
          Open
          <ArrowUpRight className="h-3 w-3" />
        </Button>
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
        'flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-xs font-medium transition-colors',
        destructive
          ? 'text-red-400 hover:bg-red-500/10'
          : 'text-foreground hover:bg-accent',
      )}
    >
      {icon}
      {label}
    </button>
  );
}
