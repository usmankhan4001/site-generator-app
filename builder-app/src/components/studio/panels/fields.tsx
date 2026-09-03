'use client';

/**
 * Field primitives shared by every section editor. Each is a controlled
 * component: it takes a `value` and calls `onChange` with the next value. The
 * editors wire `onChange` to `updateSectionProps` (which the store debounces).
 */

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  GripVertical,
  ImageIcon,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CtaLink } from '@/site/schema';
import { useImagePool } from './useOptionalData';

/* ------------------------------------------------------------------ layout -- */

export function FieldShell({
  label,
  hint,
  htmlFor,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className="block text-xs font-medium text-foreground"
        >
          {label}
        </label>
      ) : null}
      {children}
      {hint ? <p className="text-[11px] leading-snug text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

const selectClass =
  'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]';

/* ------------------------------------------------------------------ inputs -- */

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = 'text',
}: {
  label?: string;
  value: string | undefined;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
}) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} htmlFor={id}>
      <Input
        id={id}
        type={type}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-9"
      />
    </FieldShell>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows = 3,
}: {
  label?: string;
  value: string | undefined;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} htmlFor={id}>
      <textarea
        id={id}
        rows={rows}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-y"
      />
    </FieldShell>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  min,
  allowEmpty = true,
}: {
  label?: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
  placeholder?: string;
  hint?: string;
  min?: number;
  allowEmpty?: boolean;
}) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} htmlFor={id}>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '') return onChange(allowEmpty ? undefined : 0);
          const n = Number(raw);
          onChange(Number.isNaN(n) ? undefined : n);
        }}
        className="h-9"
      />
    </FieldShell>
  );
}

export function SwitchField({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-0.5">
      <div className="space-y-0.5">
        <span className="block text-xs font-medium text-foreground">{label}</span>
        {hint ? (
          <span className="block text-[11px] leading-snug text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label?: string;
  value: T | undefined;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  hint?: string;
}) {
  const id = useId();
  return (
    <FieldShell label={label} hint={hint} htmlFor={id}>
      <select
        id={id}
        value={value ?? options[0]?.value}
        onChange={(e) => onChange(e.target.value as T)}
        className={selectClass}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/* ------------------------------------------------------------------- image -- */

export function ImageField({
  label = 'Image URL',
  value,
  onChange,
  hint,
}: {
  label?: string;
  value: string | undefined;
  onChange: (v: string | undefined) => void;
  hint?: string;
}) {
  const pool = useImagePool();
  const [picking, setPicking] = useState(false);

  return (
    <FieldShell label={label} hint={hint}>
      <div className="flex items-start gap-2">
        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <Input
            value={value ?? ''}
            placeholder="https://…"
            onChange={(e) => onChange(e.target.value || undefined)}
            className="h-9"
          />
          <div className="flex items-center gap-2">
            {pool && pool.length ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setPicking((p) => !p)}
              >
                {picking ? 'Close' : 'Pick from pool'}
              </Button>
            ) : null}
            {value ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-muted-foreground"
                onClick={() => onChange(undefined)}
              >
                Clear
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {picking && pool ? (
        <div className="mt-2 grid max-h-48 grid-cols-3 gap-2 overflow-y-auto thin-scroll rounded-md border border-border bg-background p-2">
          {pool.map((img) => (
            <button
              key={img.url}
              type="button"
              title={img.label ?? img.url}
              onClick={() => {
                onChange(img.url);
                setPicking(false);
              }}
              className={cn(
                'aspect-video overflow-hidden rounded border transition-colors',
                value === img.url ? 'border-primary' : 'border-border hover:border-primary/50',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.label ?? ''} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </FieldShell>
  );
}

/* --------------------------------------------------------------------- cta -- */

export function CtaField({
  label = 'Call to action',
  value,
  onChange,
}: {
  label?: string;
  value: CtaLink | undefined;
  onChange: (v: CtaLink | undefined) => void;
}) {
  if (!value) {
    return (
      <FieldShell label={label}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() => onChange({ label: 'Learn more', href: '/' })}
        >
          <Plus className="h-3.5 w-3.5" />
          Add link
        </Button>
      </FieldShell>
    );
  }
  return (
    <FieldShell label={label}>
      <div className="space-y-2 rounded-md border border-border bg-background/60 p-2">
        <Input
          value={value.label}
          placeholder="Button label"
          onChange={(e) => onChange({ ...value, label: e.target.value })}
          className="h-8 text-xs"
        />
        <Input
          value={value.href}
          placeholder="/contact or https://…"
          onChange={(e) => onChange({ ...value, href: e.target.value })}
          className="h-8 text-xs"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-muted-foreground"
          onClick={() => onChange(undefined)}
        >
          <X className="h-3.5 w-3.5" />
          Remove link
        </Button>
      </div>
    </FieldShell>
  );
}

/* ------------------------------------------------------------- string list -- */

export function StringListField({
  label,
  items,
  onChange,
  placeholder,
  hint,
  addLabel = 'Add item',
}: {
  label?: string;
  items: string[] | undefined;
  onChange: (next: string[]) => void;
  placeholder?: string;
  hint?: string;
  addLabel?: string;
}) {
  const list = items ?? [];
  const setAt = (i: number, v: string) =>
    onChange(list.map((it, idx) => (idx === i ? v : it)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <FieldShell label={label} hint={hint}>
      <div className="space-y-1.5">
        {list.map((it, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Input
              value={it}
              placeholder={placeholder}
              onChange={(e) => setAt(i, e.target.value)}
              className="h-8 text-xs"
            />
            <div className="flex shrink-0">
              <IconBtn label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                <ChevronUp className="h-3.5 w-3.5" />
              </IconBtn>
              <IconBtn
                label="Move down"
                disabled={i === list.length - 1}
                onClick={() => move(i, 1)}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </IconBtn>
              <IconBtn
                label="Remove"
                onClick={() => onChange(list.filter((_, idx) => idx !== i))}
              >
                <X className="h-3.5 w-3.5" />
              </IconBtn>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 w-full text-xs"
          onClick={() => onChange([...list, ''])}
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </Button>
      </div>
    </FieldShell>
  );
}

/* --------------------------------------------------------- record (specs) -- */

export function RecordField({
  label,
  value,
  onChange,
  hint,
  keyPlaceholder = 'Label',
  valuePlaceholder = 'Value',
  addLabel = 'Add row',
}: {
  label?: string;
  value: Record<string, string> | undefined;
  onChange: (next: Record<string, string>) => void;
  hint?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addLabel?: string;
}) {
  const entries = Object.entries(value ?? {});
  const commit = (next: [string, string][]) => {
    const out: Record<string, string> = {};
    for (const [k, v] of next) if (k.trim()) out[k] = v;
    onChange(out);
  };
  return (
    <FieldShell label={label} hint={hint}>
      <div className="space-y-1.5">
        {entries.map(([k, v], i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Input
              value={k}
              placeholder={keyPlaceholder}
              onChange={(e) => {
                const next = [...entries] as [string, string][];
                next[i] = [e.target.value, v];
                commit(next);
              }}
              className="h-8 w-2/5 text-xs"
            />
            <Input
              value={v}
              placeholder={valuePlaceholder}
              onChange={(e) => {
                const next = [...entries] as [string, string][];
                next[i] = [k, e.target.value];
                commit(next);
              }}
              className="h-8 flex-1 text-xs"
            />
            <IconBtn
              label="Remove"
              onClick={() => commit(entries.filter((_, idx) => idx !== i) as [string, string][])}
            >
              <X className="h-3.5 w-3.5" />
            </IconBtn>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 w-full text-xs"
          onClick={() => commit([...(entries as [string, string][]), ['', '']])}
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </Button>
      </div>
    </FieldShell>
  );
}

/* --------------------------------------------------------- generic list<T> -- */

export function ListField<T>({
  label,
  items,
  onChange,
  newItem,
  renderItem,
  itemTitle,
  addLabel = 'Add item',
  hint,
}: {
  label?: string;
  items: T[] | undefined;
  onChange: (next: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  itemTitle: (item: T, index: number) => string;
  addLabel?: string;
  hint?: string;
}) {
  const list = items ?? [];
  const [open, setOpen] = useState<number | null>(list.length ? 0 : null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const update = (i: number) => (patch: Partial<T>) =>
    onChange(list.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= list.length || from === to) return;
    const next = [...list];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
    setOpen(to);
  };

  return (
    <FieldShell label={label} hint={hint}>
      <div className="space-y-2">
        {list.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={cn(
                'rounded-md border bg-background/60 transition-colors',
                dragIdx === i ? 'border-primary' : 'border-border',
              )}
              onDragOver={(e) => {
                if (dragIdx === null) return;
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (dragIdx !== null) move(dragIdx, i);
                setDragIdx(null);
              }}
            >
              <div className="flex items-center gap-1 px-1.5 py-1.5">
                <span
                  draggable
                  onDragStart={() => setDragIdx(i)}
                  onDragEnd={() => setDragIdx(null)}
                  className="cursor-grab p-1 text-muted-foreground hover:text-foreground"
                  title="Drag to reorder"
                >
                  <GripVertical className="h-3.5 w-3.5" />
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                >
                  {isOpen ? (
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <span className="truncate text-xs font-medium text-foreground">
                    {itemTitle(item, i) || `Item ${i + 1}`}
                  </span>
                </button>
                <IconBtn label="Move up" disabled={i === 0} onClick={() => move(i, i - 1)}>
                  <ChevronUp className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn
                  label="Move down"
                  disabled={i === list.length - 1}
                  onClick={() => move(i, i + 1)}
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </IconBtn>
                <IconBtn
                  label="Remove"
                  onClick={() => {
                    onChange(list.filter((_, idx) => idx !== i));
                    setOpen(null);
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconBtn>
              </div>
              {isOpen ? (
                <div className="space-y-2.5 border-t border-border px-2.5 py-2.5">
                  {renderItem(item, update(i), i)}
                </div>
              ) : null}
            </div>
          );
        })}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 w-full text-xs"
          onClick={() => {
            onChange([...list, newItem()]);
            setOpen(list.length);
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </Button>
      </div>
    </FieldShell>
  );
}

/* ------------------------------------------------------------------ shared -- */

export function IconBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

export function PanelHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="space-y-0.5 border-b border-border pb-3">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </div>
  );
}
