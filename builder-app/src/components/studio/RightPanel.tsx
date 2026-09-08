'use client';

import { useEffect, useRef } from 'react';
import {
  X,
  FileText,
  Layers,
  Palette,
  Building2,
  Rocket,
  ChevronLeft,
} from 'lucide-react';
import { useStudio, type StudioStep } from '@/store/studio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { RightPanelContent } from './panels/RightPanelContent';

interface PropertiesDrawerProps {
  open: boolean;
  onClose: () => void;
}

const TABS: { id: StudioStep; label: string; icon: typeof FileText }[] = [
  { id: 'pages', label: 'Pages', icon: FileText },
  { id: 'sections', label: 'Sections', icon: Layers },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'deploy', label: 'Deploy', icon: Rocket },
];

export function RightPanel({ open, onClose }: PropertiesDrawerProps) {
  const step = useStudio((s) => s.step);
  const setStep = useStudio((s) => s.setStep);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  const selectSection = useStudio((s) => s.selectSection);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-40 bg-black/20 backdrop-blur-xs transition-opacity" />

      {/* Drawer */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-label="Properties"
        className="absolute bottom-0 right-0 top-0 z-50 flex w-[400px] flex-col border-l border-border bg-card shadow-2xl transition-all"
      >
        {/* Top Step Navigation Tab Bar Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-3 gap-2 bg-muted/30">
          {selectedSectionId ? (
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => selectSection(null)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Sections</span>
              </button>
              <div className="h-4 w-px bg-border/80" />
              <span className="truncate text-xs font-medium text-muted-foreground">
                Inspecting Section
              </span>
            </div>
          ) : (
            <div className="flex flex-1 items-center gap-1 rounded-xl bg-background/80 p-1 border border-border/70 shadow-xs">
              {TABS.map((tab) => {
                const active = step === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      selectSection(null);
                      setStep(tab.id);
                    }}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-semibold transition-all',
                      active
                        ? 'bg-card text-foreground shadow-xs ring-1 ring-border/80'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                    title={tab.label}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close properties panel"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <RightPanelContent />
        </ScrollArea>
      </aside>
    </>
  );
}
