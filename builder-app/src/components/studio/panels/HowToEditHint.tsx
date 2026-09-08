'use client';

import { MousePointerClick, Pencil } from 'lucide-react';

/** Quiet "how to edit" hint strip shared by the Inspector and the empty state. */
export function HowToEditHint() {
  return (
    <div className="rounded-xl border border-border bg-card p-3.5 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        How to edit
      </p>
      <ul className="mt-2 space-y-1.5 text-xs leading-snug text-muted-foreground">
        <li className="flex items-center gap-2">
          <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          Double-click text on the canvas to edit it inline
        </li>
        <li className="flex items-center gap-2">
          <MousePointerClick className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          Hover a section to reorder via the toolbar
        </li>
      </ul>
    </div>
  );
}