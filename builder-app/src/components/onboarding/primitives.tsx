'use client';

import type { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const isHexColor = (v: string): boolean =>
  /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v.trim());

/** Shared textarea styling (the ui kit has no <Textarea> primitive). */
export const textareaClass =
  'flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50 resize-y';

export function Field({
  label,
  hint,
  htmlFor,
  optional,
  className,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {optional ? (
          <span className="text-xs font-normal text-muted-foreground">Optional</span>
        ) : null}
      </div>
      {children}
      {hint ? <p className="text-xs leading-snug text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function SelectableCard({
  selected,
  onClick,
  title,
  description,
  icon,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex w-full flex-col items-start gap-1.5 rounded-xl border p-5 text-left transition-all',
        selected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/15'
          : 'border-border bg-card hover:border-primary/40 hover:bg-accent/30',
      )}
    >
      {icon ? (
        <span
          className={cn(
            'mb-1 [&_svg]:size-5',
            selected ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {icon}
        </span>
      ) : null}
      <span className="text-sm font-semibold text-foreground">{title}</span>
      {description ? (
        <span className="text-xs leading-relaxed text-muted-foreground">{description}</span>
      ) : null}
    </button>
  );
}
