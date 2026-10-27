'use client';

import { useEffect, useRef } from 'react';
import {
  X,
  FileText,
  Layers,
  Palette,
  Building2,
  Rocket,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, type StudioStep } from '@/store/studio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
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
  propertiesOpen?: boolean;
  onSelectStep?: (step: StudioStep) => void;
}

export function StepRail({
  open,
  onClose,
  propertiesOpen = false,
  onSelectStep,
}: StepRailProps) {
  const content = useStudio((s) => s.content);
  const activePagePath = useStudio((s) => s.activePagePath);
  const setActivePage = useStudio((s) => s.setActivePage);
  const step = useStudio((s) => s.step);
  const setStep = useStudio((s) => s.setStep);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  const selectSection = useStudio((s) => s.selectSection);
  const viewMode = useStudio((s) => s.viewMode);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close Pages drawer on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Close Pages drawer on click outside
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
    if (onSelectStep) {
      onSelectStep(stepId);
      return;
    }
    selectSection(null);
    setStep(stepId);
  };

  const pages = content?.pages ?? [];

  return (
    <>
      {/* Standalone / Docked Studio Left Rail (visible in Edit mode) */}
      {viewMode === 'edit' && (
        <aside
          aria-label="Studio step rail"
          className="pointer-events-auto absolute left-3 top-1/2 z-20 -translate-y-1/2 hidden md:flex flex-col items-center rounded-2xl border border-border/80 bg-card/95 p-1.5 shadow-xl backdrop-blur-md transition-all"
        >
          <nav aria-label="Studio navigation" className="flex flex-col items-center gap-1">
            {STUDIO_STEP_ITEMS.map((item) => {
              const active =
                propertiesOpen &&
                (selectedSectionId ? item.id === 'sections' : step === item.id);
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
                    'group relative flex h-12 w-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] transition-all',
                    active
                      ? 'bg-primary text-primary-foreground shadow-sm font-semibold'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="leading-none tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Pages Quick-Switcher Drawer (When opened via TopBar page selector) */}
      {open && (
        <>
          <div
            className="absolute inset-0 z-40 bg-black/20 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

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

            {/* Footer action to manage/add pages in inspector */}
            <div className="border-t border-border p-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-1.5 text-xs"
                onClick={() => {
                  if (onClose) onClose();
                  handleStepClick('pages');
                }}
              >
                <Plus className="h-3.5 w-3.5" />
                Add / Manage Pages
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
