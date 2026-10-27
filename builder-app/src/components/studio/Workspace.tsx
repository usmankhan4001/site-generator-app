'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCw } from 'lucide-react';
import { useStudio, DEVICE_WIDTH, type StudioStep } from '@/store/studio';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TopBar } from './TopBar';
import { StepRail } from './StepRail';
import { AddSectionDrawer } from './AddSectionDrawer';
import { BusinessProfileModal } from './BusinessProfileModal';
import { ExportHostModal } from './ExportHostModal';
import { RightPanel } from './RightPanel';
import { PreviewPane } from './PreviewPane';

export function Workspace({ projectId }: { projectId: string }) {
  const meta = useStudio((s) => s.meta);
  const loading = useStudio((s) => s.loading);
  const error = useStudio((s) => s.error);
  const hasContent = useStudio((s) => s.content != null);
  const viewMode = useStudio((s) => s.viewMode);
  const setViewMode = useStudio((s) => s.setViewMode);
  const device = useStudio((s) => s.device);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  const selectSection = useStudio((s) => s.selectSection);
  const step = useStudio((s) => s.step);
  const setStep = useStudio((s) => s.setStep);
  const undo = useStudio((s) => s.undo);
  const redo = useStudio((s) => s.redo);

  const [pagesOpen, setPagesOpen] = useState(false);
  const [addSectionOpen, setAddSectionOpen] = useState(false);
  const [insertIndex, setInsertIndex] = useState<number | undefined>(undefined);
  const [businessProfileOpen, setBusinessProfileOpen] = useState(false);
  const [exportHostOpen, setExportHostOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(true);

  // Auto-open properties when a section is selected in Edit mode
  useEffect(() => {
    if (selectedSectionId && viewMode === 'edit') {
      setPropertiesOpen(true);
    }
  }, [selectedSectionId, viewMode]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable) &&
        e.key !== 'Escape'
      ) {
        return;
      }

      // E toggles edit ⇄ preview (browse)
      if (e.key.toLowerCase() === 'e' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        useStudio
          .getState()
          .setViewMode(useStudio.getState().viewMode === 'edit' ? 'preview' : 'edit');
        return;
      }

      // Escape closes transient modals and drawers (keeps docked RightPanel open unless section selected)
      if (e.key === 'Escape') {
        setPagesOpen(false);
        setAddSectionOpen(false);
        setBusinessProfileOpen(false);
        setExportHostOpen(false);
        if (useStudio.getState().selectedSectionId) {
          useStudio.getState().selectSection(null);
        }
        return;
      }

      // Undo: Ctrl+Z / Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo: Ctrl+Shift+Z / Cmd+Shift+Z or Ctrl+Y
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y')
      ) {
        e.preventDefault();
        redo();
        return;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);

  // Hydrate project on mount
  useEffect(() => {
    useStudio.getState().hydrate(projectId);
    return () => useStudio.getState().reset();
  }, [projectId]);

  const togglePages = useCallback(() => {
    setPagesOpen((o) => !o);
    setAddSectionOpen(false);
  }, []);

  const openAddSection = useCallback((targetIndex?: number) => {
    setInsertIndex(targetIndex);
    setAddSectionOpen(true);
    setPagesOpen(false);
  }, []);

  const closeAddSection = useCallback(() => {
    setAddSectionOpen(false);
    setInsertIndex(undefined);
  }, []);

  const handleSelectStep = useCallback(
    (targetStep: StudioStep) => {
      if (viewMode !== 'edit') {
        setViewMode('edit');
      }
      if (propertiesOpen && step === targetStep && !selectedSectionId) {
        setPropertiesOpen(false);
        return;
      }
      selectSection(null);
      setStep(targetStep);
      setPropertiesOpen(true);
    },
    [viewMode, setViewMode, propertiesOpen, step, selectedSectionId, selectSection, setStep],
  );

  const toggleProperties = useCallback(() => {
    if (viewMode !== 'edit') {
      setViewMode('edit');
      setPropertiesOpen(true);
      return;
    }
    setPropertiesOpen((o) => !o);
  }, [viewMode, setViewMode]);

  const closePages = useCallback(() => setPagesOpen(false), []);
  const closeProperties = useCallback(() => setPropertiesOpen(false), []);

  const dw = DEVICE_WIDTH[device];

  // Loading / error states
  if (loading && !hasContent) return <WorkspaceSkeleton />;

  if (error && !hasContent) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-background p-6 text-foreground">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <RotateCw className="h-5 w-5" />
          </div>
          <h1 className="text-base font-semibold">Couldn&apos;t open this project</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{error}</p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button size="sm" onClick={() => useStudio.getState().hydrate(projectId)}>
              <RotateCw className="h-4 w-4" />
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!hasContent) return <WorkspaceSkeleton />;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="relative flex h-dvh w-full overflow-hidden bg-background text-foreground">
        {/* Add Block / Sections Palette drawer (left) */}
        <AddSectionDrawer
          open={addSectionOpen}
          onClose={closeAddSection}
          insertIndex={insertIndex}
        />

        {/* Centralized Business Details Modal */}
        <BusinessProfileModal
          open={businessProfileOpen}
          onClose={() => setBusinessProfileOpen(false)}
        />

        {/* Visual Export & Hosting Hub Modal */}
        <ExportHostModal
          open={exportHostOpen}
          onClose={() => setExportHostOpen(false)}
          projectId={projectId}
          projectName={meta?.name || 'my-site'}
        />

        {/* Left/Center Canvas Area (flexes alongside docked RightPanel) */}
        <div className="relative h-full min-w-0 flex-1 overflow-hidden">
          {/* StepRail + Quick Pages Drawer */}
          <StepRail
            open={pagesOpen}
            onClose={closePages}
            propertiesOpen={propertiesOpen && viewMode === 'edit'}
            onSelectStep={handleSelectStep}
          />

          {/* Floating Toolbar Island */}
          <TopBar
            pagesOpen={pagesOpen}
            propertiesOpen={propertiesOpen && viewMode === 'edit'}
            onTogglePages={togglePages}
            onOpenAddSection={() => openAddSection()}
            onOpenBusinessProfile={() => setBusinessProfileOpen(true)}
            onOpenExportHost={() => setExportHostOpen(true)}
            onToggleProperties={toggleProperties}
          />

          {/* Live Preview Canvas */}
          <PreviewPane
            dw={dw}
            projectId={projectId}
            onOpenAddSectionAt={(idx) => openAddSection(idx)}
          />
        </div>

        {/* Docked Properties / Inspector Panel (right) */}
        <RightPanel
          open={propertiesOpen && viewMode === 'edit'}
          onClose={closeProperties}
        />
      </div>
    </TooltipProvider>
  );
}

function WorkspaceSkeleton() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-6">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-8 w-28 animate-pulse rounded-xl bg-muted" />
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center p-8">
        <div className="h-full w-full max-w-5xl animate-pulse rounded-2xl border border-border bg-muted/20" />
      </div>
    </div>
  );
}
