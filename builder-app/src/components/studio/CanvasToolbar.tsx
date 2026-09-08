'use client';

import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/** A section's bounding box in the iframe's own (unscaled) coordinate space. */
export interface SectionRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface CanvasToolbarProps {
  /** Bounding box of the section the toolbar is anchored to (iframe coords). */
  rect: SectionRect;
  /** Scale factor between iframe coordinates and the host overlay. */
  scale: number;
  section: { id: string; enabled: boolean };
  canMoveUp: boolean;
  canMoveDown: boolean;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate?: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

/**
 * Floating section toolbar rendered on the host page (over the iframe). Anchored
 * to the top-right of the selected section. Provides immediate visual manipulation:
 * Edit (opens properties), Move Up/Down, Duplicate, Hide/Show, and Delete.
 */
export function CanvasToolbar({
  rect,
  scale,
  section,
  canMoveUp,
  canMoveDown,
  onEdit,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onToggle,
  onDelete,
}: CanvasToolbarProps) {
  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      className="pointer-events-auto absolute flex -translate-x-full -translate-y-full items-center gap-1 rounded-xl border border-border/90 bg-card/95 p-1 shadow-xl backdrop-blur-md"
      style={{
        left: (rect.x + rect.w) * scale,
        top: rect.y * scale,
      }}
    >
      <ToolbarButton label="Edit section properties" onClick={onEdit} primary>
        <Pencil className="h-3.5 w-3.5" />
        <span className="text-[11px] font-semibold pr-1">Edit</span>
      </ToolbarButton>

      {onDuplicate && (
        <ToolbarButton label="Duplicate section" onClick={onDuplicate}>
          <Copy className="h-3.5 w-3.5" />
        </ToolbarButton>
      )}

      <ToolbarButton label="Move up" onClick={onMoveUp} disabled={!canMoveUp}>
        <ArrowUp className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarButton label="Move down" onClick={onMoveDown} disabled={!canMoveDown}>
        <ArrowDown className="h-3.5 w-3.5" />
      </ToolbarButton>

      <ToolbarButton label={section.enabled ? 'Hide section' : 'Show section'} onClick={onToggle}>
        {section.enabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
      </ToolbarButton>

      <ToolbarButton label="Delete section" onClick={onDelete} danger>
        <Trash2 className="h-3.5 w-3.5" />
      </ToolbarButton>
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  disabled,
  danger,
  primary,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex h-7 items-center justify-center gap-1 rounded-lg px-2 text-muted-foreground transition-colors',
        'hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40',
        primary && 'bg-primary/10 text-primary hover:bg-primary/20',
        danger && 'hover:bg-destructive hover:text-destructive-foreground',
      )}
    >
      {children}
    </button>
  );
}