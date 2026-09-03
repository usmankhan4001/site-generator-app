'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  FolderGit2,
  Layers,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';
import type { ProjectSummary } from '@/lib/studio/projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { NewProjectDialog, type TemplateOption } from './NewProjectDialog';
import { ProjectCard } from './ProjectCard';
import type { PreferredMode } from '@/components/onboarding/types';

export function DashboardClient({ templates }: { templates: TemplateOption[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newOpen, setNewOpen] = useState(false);
  const [newProjectSeed, setNewProjectSeed] = useState<{
    niche: string;
    mode?: PreferredMode;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectSummary | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Auto-open "New Site" at Step 2 right after onboarding hands off a niche match,
  // e.g. `/?newProject=1&niche=...&mode=services`. Read via window.location (not
  // useSearchParams) so this needs no Suspense boundary around the dashboard page.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('newProject') !== '1') return;
    const niche = params.get('niche') ?? '';
    const modeParam = params.get('mode');
    const mode: PreferredMode | undefined =
      modeParam === 'ecommerce' || modeParam === 'services' ? modeParam : undefined;
    if (niche) {
      setNewProjectSeed({ niche, mode });
      setNewOpen(true);
    }
    router.replace('/', { scroll: false });
  }, [router]);

  const handleNewOpenChange = useCallback((next: boolean) => {
    setNewOpen(next);
    if (!next) setNewProjectSeed(null);
  }, []);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/projects', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load sites (${res.status}).`);
      const data = await res.json();
      setProjects(Array.isArray(data?.projects) ? data.projects : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load sites.');
      setProjects((prev) => prev ?? []);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleDuplicate(project: ProjectSummary) {
    setBusyId(project.id);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'duplicate' }),
      });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError('Could not duplicate that site.');
    } finally {
      setBusyId(null);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setDeleteTarget(null);
      await load();
    } catch {
      setError('Could not delete that site.');
    } finally {
      setDeleting(false);
    }
  }

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase().trim();
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.domain && p.domain.toLowerCase().includes(q)) ||
        (p.templateId && p.templateId.toLowerCase().includes(q)),
    );
  }, [projects, searchQuery]);

  const loading = projects === null;
  const empty = !loading && projects.length === 0;

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <header className="flex flex-col justify-between gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 items-center gap-1.5 rounded-full border border-border/80 bg-muted/30 px-2.5 text-[11px] font-semibold tracking-wide text-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Studio Dashboard
            </span>
            {projects && projects.length > 0 && (
              <span className="text-xs text-muted-foreground">
                ({projects.length} {projects.length === 1 ? 'site' : 'sites'})
              </span>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Sites & Digital Properties
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Manage, theme, and deploy your multi-page business archetypes and compliant storefronts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setNewOpen(true)}
            className="h-9 gap-1.5 px-4 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>New Site</span>
          </Button>
        </div>
      </header>

      {/* Global Error Banner */}
      {error && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
          <span className="inline-flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </span>
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium hover:bg-red-500/15 transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </button>
        </div>
      )}

      {/* Filter / Search Bar if projects exist */}
      {!loading && !empty && projects.length > 2 && (
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your sites by name, domain, archetype..."
              className="h-9 pl-9 text-xs"
            />
          </div>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[170px] animate-pulse rounded-xl border border-border/60 bg-card/40"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {empty && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/20 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/40 text-muted-foreground shadow-sm">
            <Layers className="h-6 w-6 text-foreground/70" />
          </div>
          <h2 className="mt-4 text-base font-semibold text-foreground">No sites created yet</h2>
          <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Launch your first site in seconds. Choose from 6 curated archetypes (SaaS, Agency, Luxury, Services, Store, Local Business) with ready-made niche starter kits.
          </p>

          <Button className="mt-6 gap-1.5 shadow-sm" onClick={() => setNewOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Your First Site
          </Button>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && !empty && (
        <>
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No sites match “{searchQuery}”.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  busy={busyId === project.id}
                  onDuplicate={handleDuplicate}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Archetype & Starter Set Picker Dialog */}
      <NewProjectDialog
        templates={templates}
        open={newOpen}
        onOpenChange={handleNewOpenChange}
        skipToStep2={newProjectSeed !== null}
        initialNiche={newProjectSeed?.niche}
        initialMode={newProjectSeed?.mode}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null);
        }}
      >
        <DialogContent className="border-border/80 bg-background/95 shadow-2xl backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-foreground">
              Delete Site
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              This action will permanently delete{' '}
              <span className="font-semibold text-foreground">{deleteTarget?.name}</span> and
              its configured pages and assets. This cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-end gap-2 border-t border-border/50 pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Deleting…
                </>
              ) : (
                'Delete Site'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
