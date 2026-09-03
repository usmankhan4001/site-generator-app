'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
} from 'lucide-react';
import { useStudio, useActivePage } from '@/store/studio';
import { SECTION_TYPES, type SectionType } from '@/site/schema';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { PanelHeader, IconBtn } from './fields';
import { SECTION_LABELS, SECTION_DESCRIPTIONS } from './labels';
import { summarizeSection } from './sectionSummary';

export function SectionsPanel() {
  const content = useStudio((s) => s.content);
  const activePagePath = useStudio((s) => s.activePagePath);
  const setActivePage = useStudio((s) => s.setActivePage);
  const page = useActivePage();
  const toggleSection = useStudio((s) => s.toggleSection);
  const reorderSections = useStudio((s) => s.reorderSections);
  const selectSection = useStudio((s) => s.selectSection);
  const removeSection = useStudio((s) => s.removeSection);
  const addSection = useStudio((s) => s.addSection);

  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  if (!content || !page) return null;

  const move = (from: number, to: number) => {
    if (to < 0 || to >= page.sections.length || from === to) return;
    reorderSections(activePagePath, from, to);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3 p-4 pb-0">
        <PanelHeader
          title="Sections"
          hint="Toggle, reorder or add sections for this page. Click a row to edit its content."
        />
        <div className="thin-scroll flex gap-1 overflow-x-auto pb-1">
          {content.pages.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActivePage(p.path)}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
                p.path === activePagePath
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {p.navLabel ?? p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="thin-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto p-4">
        {page.sections.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            No sections on this page yet.
          </p>
        ) : (
          page.sections.map((section, i) => (
            <div
              key={section.id}
              draggable
              onDragStart={() => setDragIdx(i)}
              onDragEnd={() => setDragIdx(null)}
              onDragOver={(e) => dragIdx !== null && e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIdx !== null) move(dragIdx, i);
                setDragIdx(null);
              }}
              className={cn(
                'group flex items-center gap-1.5 rounded-lg border bg-card px-1.5 py-2 transition-colors',
                dragIdx === i ? 'border-primary' : 'border-border',
                !section.enabled && 'opacity-50',
              )}
            >
              <span className="cursor-grab p-1 text-muted-foreground/60 group-hover:text-muted-foreground">
                <GripVertical className="h-3.5 w-3.5" />
              </span>

              <button
                type="button"
                onClick={() => selectSection(section.id)}
                className="min-w-0 flex-1 text-left"
              >
                <div className="truncate text-xs font-medium text-foreground">
                  {SECTION_LABELS[section.type]}
                </div>
                <div className="truncate text-[11px] text-muted-foreground">
                  {summarizeSection(section) || SECTION_DESCRIPTIONS[section.type]}
                </div>
              </button>

              <div className="flex shrink-0 items-center gap-0.5">
                <IconBtn label="Move up" disabled={i === 0} onClick={() => move(i, i - 1)}>
                  <ChevronUp className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn
                  label="Move down"
                  disabled={i === page.sections.length - 1}
                  onClick={() => move(i, i + 1)}
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </IconBtn>
                <Switch
                  checked={section.enabled}
                  onCheckedChange={() => toggleSection(section.id)}
                  aria-label={section.enabled ? 'Disable section' : 'Enable section'}
                />
                <IconBtn
                  label="Remove section"
                  onClick={() => {
                    if (window.confirm(`Remove the "${SECTION_LABELS[section.type]}" section?`)) {
                      removeSection(section.id);
                    }
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconBtn>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-border p-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" />
          Add section
        </Button>
      </div>

      <AddSectionDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onPick={(type) => {
          addSection(activePagePath, type);
          setAddOpen(false);
        }}
      />
    </div>
  );
}

function AddSectionDialog({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPick: (type: SectionType) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add a section</DialogTitle>
          <DialogDescription>
            It's added to the end of this page — reorder it afterwards.
          </DialogDescription>
        </DialogHeader>
        <div className="thin-scroll grid max-h-[60vh] grid-cols-1 gap-1.5 overflow-y-auto sm:grid-cols-2">
          {SECTION_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onPick(type)}
              className="rounded-lg border border-border p-3 text-left transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <div className="text-sm font-medium text-foreground">{SECTION_LABELS[type]}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                {SECTION_DESCRIPTIONS[type]}
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
