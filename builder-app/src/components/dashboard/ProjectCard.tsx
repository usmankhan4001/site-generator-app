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
      const res = await fetch(`/api/projects/${project.id}/export`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Export failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-source.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed', err);
      alert(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/90 shadow-md backdrop-blur-md transition-all duration-300',
        'hover:border-primary/50 hover:shadow-2xl hover:-translate-y-0.5 dark:bg-zinc-950/90 dark:border-white/10',
        busy && 'pointer-events-none opacity-60',
      )}
    >
      <div>
        {/* Device Preview Header & Simulated Window Canvas */}
        <div className="relative aspect-video w-full overflow-hidden border-b border-border/60 bg-muted/40 dark:bg-[#0c0d10] dark:border-white/5">
          {/* Subtle Ambient Glow Mesh */}
          <div
            className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-35"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${accent || '#10b981'} 0%, transparent 70%)`,
            }}
          />

          {/* Browser Window Bar */}
          <div className="flex h-7 items-center justify-between border-b border-border/40 bg-background/60 px-3 backdrop-blur-xs dark:bg-zinc-900/50">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500/80" />
              <span className="h-2 w-2 rounded-full bg-amber-500/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground/80 font-mono">
              <Globe className="h-2.5 w-2.5" />
              <span className="max-w-[140px] truncate">{project.customDomain || project.domain || 'preview.internal'}</span>
            </div>
            <span className="text-[10px] text-muted-foreground/60 font-mono">1440 × 900</span>
          </div>

          {/* Simulated Web Canvas Body Preview */}
          <div className="flex h-[calc(100%-1.75rem)] flex-col items-center justify-center p-4 text-center">
            <span
              className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold border"
              style={{
                borderColor: `color-mix(in oklab, ${accent || '#10b981'} 40%, transparent)`,
                backgroundColor: `color-mix(in oklab, ${accent || '#10b981'} 12%, transparent)`,
                color: accent || '#10b981',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent || '#10b981' }} />
              {isStore ? 'Storefront Node' : 'Corporate Edge'}
            </span>
            <p className="max-w-[200px] truncate text-xs font-bold tracking-tight text-foreground/90">
              {project.name}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1 max-w-[180px]">
              {archetypeLabel ? `Architected for ${archetypeLabel}` : 'Production AI Scaffolding'}
            </p>
          </div>

          {/* Top Overlaid Badges */}
          <div className="absolute top-9 left-2.5 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-background/85 px-2 py-0.5 text-[10px] font-semibold text-primary backdrop-blur-md shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Edge
            </span>
            <span className="inline-flex items-center rounded-full border border-border/80 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-md">
              {project.themeId || 'Obsidian Vault'}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={href}
                className="truncate text-base font-bold tracking-tight text-foreground transition-colors hover:text-primary focus-visible:outline-none"
              >
                {project.name}
              </Link>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
                <Globe className="h-3 w-3 shrink-0 text-muted-foreground/70" />
                <span className="truncate">{project.customDomain || project.domain || 'no-domain-configured'}</span>
              </div>
            </div>

            <div ref={menuRef} className="relative shrink-0">
              <button
                type="button"
                aria-label="Project actions"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
                  className="absolute right-0 top-8 z-30 w-44 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-dropdown backdrop-blur-md"
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

          {/* Badges Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/40 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-md border border-border/70 bg-muted/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                {isStore ? 'E-Commerce' : 'Services'}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <span>{relativeTime(project.updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-4 py-2.5 dark:bg-zinc-900/40">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => onDuplicate(project)}
            title="Duplicate Site"
          >
            <Copy className="mr-1.5 h-3.5 w-3.5" />
            <span>Copy</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={handleExport}
            title="Export ZIP"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>

        <Button
          size="sm"
          className="h-8 gap-1.5 px-3.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20 active:scale-95 transition-all"
          onClick={() => router.push(href)}
        >
          <span>Studio Editor</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
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
          ? 'text-destructive hover:bg-destructive/10'
          : 'text-foreground hover:bg-accent',
      )}
    >
      {icon}
      {label}
    </button>
  );
}
