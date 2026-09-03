'use client';

import { ArrowLeft, Copy, Trash2 } from 'lucide-react';
import { useStudio, useSelectedSection } from '@/store/studio';
import { Button } from '@/components/ui/button';
import { SECTION_LABELS, SECTION_DESCRIPTIONS } from './labels';
import { SectionEditor } from './SectionEditor';

export function Inspector() {
  const section = useSelectedSection();
  const selectSection = useStudio((s) => s.selectSection);
  const removeSection = useStudio((s) => s.removeSection);
  const mutate = useStudio((s) => s.mutate);

  if (!section) return null;

  const duplicate = () => {
    mutate((draft) => {
      for (const page of draft.pages) {
        const i = page.sections.findIndex((s) => s.id === section.id);
        if (i === -1) continue;
        const copy = JSON.parse(JSON.stringify(page.sections[i]));
        copy.id = `${section.id}-copy-${Date.now().toString(36)}`;
        page.sections.splice(i + 1, 0, copy);
        return;
      }
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-2 border-b border-border p-4">
        <button
          type="button"
          onClick={() => selectSection(null)}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sections
        </button>
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {SECTION_LABELS[section.type]}
          </h2>
          <p className="text-xs text-muted-foreground">{SECTION_DESCRIPTIONS[section.type]}</p>
        </div>
      </div>

      <div className="thin-scroll min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        <SectionEditor section={section} />
      </div>

      <div className="flex gap-2 border-t border-border p-3">
        <Button variant="outline" size="sm" className="flex-1" onClick={duplicate}>
          <Copy className="h-3.5 w-3.5" />
          Duplicate
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            if (window.confirm(`Delete the "${SECTION_LABELS[section.type]}" section?`)) {
              removeSection(section.id);
              selectSection(null);
            }
          }}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}
