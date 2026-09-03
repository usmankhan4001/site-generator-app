'use client';

import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, Loader2, Plus, RefreshCw } from 'lucide-react';
import type { ProjectSummary } from '@/lib/studio/projects';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { NewProjectDialog, type TemplateOption } from './NewProjectDialog';
import { ProjectCard } from './ProjectCard';

export function DashboardClient({ templates }: { templates: TemplateOption[] }) {
  const [projects, setProjects] = useState<ProjectSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ProjectSummary | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

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

  const loading = projects === null;
  const empty = !loading && projects.length === 0;

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Airwallex Site Cloner
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your sites — build, theme and deploy compliant multi-page business
            sites.
          </p>
        </div>
        <Button onClick={() => setNewOpen(true)}>
          <Plus className="h-4 w-4" />
          New site
        </Button>
      </header>

      {error && (
        <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          <span className="inline-flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </span>
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium hover:bg-red-500/10"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[132px] animate-pulse rounded-xl border border-border bg-card"
            />
          ))}
        </div>
      )}

      {empty && (
        <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
          <h2 className="text-base font-semibold">No sites yet</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Start from one of {templates.length} templates — swap in your company
            details, tweak sections and theme, then deploy.
          </p>
          <Button className="mt-5" onClick={() => setNewOpen(true)}>
            <Plus className="h-4 w-4" />
            New site
          </Button>
        </div>
      )}

      {!loading && !empty && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
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

      <NewProjectDialog
        templates={templates}
        open={newOpen}
        onOpenChange={setNewOpen}
      />

      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteTarget(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete site</DialogTitle>
            <DialogDescription>
              This permanently deletes{' '}
              <span className="text-foreground">{deleteTarget?.name}</span> and
              its content. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
