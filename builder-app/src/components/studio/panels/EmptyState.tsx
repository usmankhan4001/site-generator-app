'use client';

import { MousePointerClick } from 'lucide-react';
import { HowToEditHint } from './HowToEditHint';

/**
 * Calm empty state shown in the right panel when no section is selected. Keeps
 * the panel intentional (never a blank form) and points the user at the canvas.
 */
export function EmptyState() {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-border bg-card px-4 py-6 text-center shadow-sm">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <MousePointerClick className="h-4 w-4" />
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">Nothing selected</p>
        <p className="mx-auto mt-1 max-w-[16rem] text-xs leading-snug text-muted-foreground">
          Select or double-click a section on the canvas to edit it.
        </p>
      </div>

      <HowToEditHint />
    </div>
  );
}