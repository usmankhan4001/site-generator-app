'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, PanelLeft, Monitor, RotateCw } from 'lucide-react';
import { useStudio } from '@/store/studio';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TopBar } from './TopBar';
import { StepRail } from './StepRail';
import { RightPanel } from './RightPanel';
import { PreviewPane } from './PreviewPane';

type MobileView = 'panel' | 'preview';

export function Workspace({ projectId }: { projectId: string }) {
  const loading = useStudio((s) => s.loading);
  const error = useStudio((s) => s.error);
  const hasContent = useStudio((s) => s.content != null);
  const [mobileView, setMobileView] = useState<MobileView>('panel');

  useEffect(() => {
    useStudio.getState().hydrate(projectId);
    return () => useStudio.getState().reset();
  }, [projectId]);

  if (loading && !hasContent) return <WorkspaceSkeleton />;

  if (error && !hasContent) {
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-background p-6 text-foreground">
        <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center">
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
      <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
        <TopBar />

        <div className="flex min-h-0 flex-1">
          <StepRail />

          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Mobile view toggle — hidden on lg where both panes are visible */}
            <div className="flex shrink-0 items-center gap-1 border-b border-border bg-card px-2 py-1.5 lg:hidden">
              <MobileToggle view={mobileView} onChange={setMobileView} />
            </div>

            <aside
              className={cn(
                'thin-scroll min-h-0 shrink-0 overflow-y-auto border-border bg-card lg:block lg:w-[380px] lg:flex-none lg:border-r',
                mobileView === 'panel' ? 'block flex-1' : 'hidden',
              )}
            >
              <RightPanel />
            </aside>

            <main
              className={cn(
                'min-h-0 flex-1 lg:block',
                mobileView === 'preview' ? 'block' : 'hidden lg:block',
              )}
            >
              <PreviewPane />
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

function MobileToggle({
  view,
  onChange,
}: {
  view: MobileView;
  onChange: (v: MobileView) => void;
}) {
  const item = (v: MobileView, label: string, Icon: typeof PanelLeft) => (
    <button
      type="button"
      onClick={() => onChange(v)}
      className={cn(
        'inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
        view === v
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
  return (
    <div className="flex w-full rounded-lg bg-muted p-1">
      {item('panel', 'Editor', PanelLeft)}
      {item('preview', 'Preview', Monitor)}
    </div>
  );
}

function WorkspaceSkeleton() {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
        <div className="h-7 w-7 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="ml-auto h-7 w-24 animate-pulse rounded bg-muted" />
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="flex w-56 shrink-0 flex-col gap-2 border-r border-border bg-card p-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
        <div className="hidden w-[380px] shrink-0 flex-col gap-4 border-r border-border bg-card p-4 lg:flex">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-24 w-full animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="studio-canvas flex flex-1 items-center justify-center">
          <div className="h-3/4 w-3/4 max-w-4xl animate-pulse rounded-lg border border-border bg-muted/40" />
        </div>
      </div>
    </div>
  );
}
