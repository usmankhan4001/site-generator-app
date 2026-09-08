'use client';

import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Full-viewport slide container. */
export function Slide({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-screen w-full flex-col items-center justify-center px-6 py-16',
        className,
      )}
    >
      <div className="w-full max-w-2xl space-y-10">{children}</div>
    </div>
  );
}

/** Slide heading — centered, calm. */
export function SlideHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        'text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl',
        className,
      )}
    >
      {children}
    </h1>
  );
}

/** Large visual card for categorical choices. */
export function CategoryCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'group relative flex w-full flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all duration-200',
        selected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-white hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5',
      )}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
      <span className="text-4xl leading-none">{icon}</span>
      <span className="text-base font-semibold text-foreground">{title}</span>
      <span className="text-sm leading-snug text-muted-foreground">{description}</span>
    </button>
  );
}

/** Theme swatch card for the style grid. */
export function ThemeSwatch({
  selected,
  onClick,
  name,
  industry,
  preview,
}: {
  selected: boolean;
  onClick: () => void;
  name: string;
  industry: string;
  preview: { accent: string; bg: string; text: string };
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all duration-200',
        selected
          ? 'border-primary shadow-sm'
          : 'border-border bg-white hover:border-primary/40 hover:shadow-sm',
      )}
    >
      {/* Accent colour preview */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: preview.bg, border: `1px solid ${preview.accent}22` }}
      >
        <span
          className="h-5 w-5 rounded-full"
          style={{ backgroundColor: preview.accent }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground">{name}</span>
        <span className="block truncate text-xs text-muted-foreground">{industry}</span>
      </div>

      {selected && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  );
}

/** A centered text input for the business name step. */
export const CenteredInput = forwardRef<HTMLInputElement, {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  autoFocus?: boolean;
}>(({ value, onChange, placeholder, onKeyDown, autoFocus }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full border-0 border-b-2 border-border bg-transparent px-2 py-4 text-center text-2xl font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
    />
  );
});
CenteredInput.displayName = 'CenteredInput';

/** Centered textarea for the optional brief. */
export function CenteredTextarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full resize-none rounded-xl border border-border bg-white px-5 py-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10"
    />
  );
}

/** Continue button — minimal, Typeform style. */
export function ContinueButton({
  onClick,
  disabled,
  children,
  loading,
}: {
  onClick: () => void;
  disabled?: boolean;
  children?: ReactNode;
  loading?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'mx-auto flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all duration-200',
        disabled
          ? 'cursor-not-allowed bg-muted text-muted-foreground'
          : 'bg-foreground text-background hover:opacity-90',
      )}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children ?? 'Continue'}
    </button>
  );
}

/** Thin progress bar at the very top of the viewport. */
export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-border">
      <div
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
