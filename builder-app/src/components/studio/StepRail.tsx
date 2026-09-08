'use client';

import { useEffect, useRef } from 'react';
import {
  X,
  FileText,
  Layers,
  Palette,
  Building2,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, useActivePage, type StudioStep } from '@/store/studio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface StepItem {
  id: StudioStep;
  label: string;
  icon: LucideIcon;
  description: string;
}

export const STUDIO_STEP_ITEMS: StepItem[] = [
  {
    id: 'pages',
    label: 'Pages',
    icon: FileText,
    description: 'Manage site pages, routes & navigation',
  },
  {
    id: 'sections',
    label: 'Sections',
    icon: Layers,
    description: 'Header, content sections & footer inspector',
  },
  {
    id: 'design',
    label: 'Design',
    icon: Palette,
    description: 'Theme, colors, layout mode & typography',
  },
  {
    id: 'company',
    label: 'Company',
    icon: Building2,
    description: 'Entity profile, compliance & Airwallex payments',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    icon: Rocket,
    description: 'Custom domain, hosting & instant publishing',
  },
];

interface StepRailProps {
  open?: boolean;
  onClose?: () => void;
  onOpenProperties?: () => void;
}

export function StepRail({ open, onClose, onOpenProperties }: StepRailProps) {
  const content = useStudio((s) => s.content);
  const activePagePath = useStudio((s) => s.activePagePath);
  const setActivePage = useStudio((s) => s.setActivePage);
  const step = useStudio((s) => s.step);
  const setStep = useStudio((s) => s.setStep);
  const selectSection = useStudio((s) => s.selectSection);
  const activePage = useActivePage();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && onClose) {
        onClose();
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open, onClose]);

  const handleStepClick = (stepId: StudioStep) => {
    selectSection(null);
    setStep(stepId);
    if (stepId === 'pages' && onClose && !open) {
      // Toggle or keep pages drawer
    }
  };

  const pages = content?.pages ?? [];

  return (
    <>
      {/* Standalone / Docked Studio Left Rail */}
      <aside
        aria-label="Studio step rail"
        className="pointer-events-auto absolute left-3 top-1/2 z-20 -translate-y-1/2 hidden md:flex flex-col items-center rounded-2xl border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-md transition-all"
      >
        <nav aria-label="Studio navigation" className="flex flex-col items-center gap-1.5">
          {STUDIO_STEP_ITEMS.map((item) => {
            const active = step === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleStepClick(item.id)}
                aria-label={item.label}
                aria-current={active ? 'step' : undefined}
                title={`${item.label} — ${item.description}`}
                className={cn(
                  'group relative flex h-10 w-10 flex-col items-center justify-center rounded-xl text-xs transition-all',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                <span className="sr-only">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Pages Drawer (When explicitly opened via topbar or pages drawer trigger) */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 z-40 bg-black/20 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Drawer */}
          <div
            ref={panelRef}
            role="dialog"
            aria-label="Pages"
            className="absolute bottom-0 left-0 top-0 z-50 flex w-72 flex-col border-r border-border bg-card shadow-2xl transition-all"
          >
            {/* Header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground">Site Pages</span>
                  <p className="text-[10px] text-muted-foreground">Select to navigate & edit</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close pages panel"
                className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Page list */}
            <ScrollArea className="flex-1">
              <nav className="p-3">
                <ul className="flex flex-col gap-1">
                  {pages.map((page) => {
                    const active = page.path === activePagePath;
                    return (
                      <li key={page.key}>
                        <button
                          type="button"
                          onClick={() => {
                            setActivePage(page.path);
                            if (onClose) onClose();
                          }}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-colors',
                            active
                              ? 'bg-primary/10 font-semibold text-primary ring-1 ring-primary/30'
                              : 'text-foreground hover:bg-accent',
                          )}
                        >
                          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-medium">
                              {page.navLabel || page.title}
                            </div>
                            <div className="truncate font-mono text-[10px] text-muted-foreground">
                              {page.path}
                            </div>
                          </div>
                          {page.path === '/' && (
                            <span className="shrink-0 rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary uppercase tracking-wider">
                              Home
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </ScrollArea>
          </div>
        </>
      )}
    </>
  );
}
