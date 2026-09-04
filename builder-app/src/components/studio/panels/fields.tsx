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
          className="block text-[13px] font-medium text-foreground"
        >
          {label}
        </label>
      ) : null}
      {children}
      {hint ? <p className="text-xs leading-snug text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

const selectClass =
  'flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]';

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

export interface VariantOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  badge?: string;
  icon?: ReactNode;
}

export function VariantPicker<T extends string>({
  label = 'Layout Variant',
  value,
  onChange,
  options,
  hint,
  columns = 1,
}: {
  label?: string;
  value: T | undefined;
  onChange: (v: T) => void;
  options: VariantOption<T>[];
  hint?: string;
  columns?: 1 | 2;
}) {
  const currentValue = value ?? options[0]?.value;

  return (
    <FieldShell label={label} hint={hint}>
      <div
        className={cn(
          'grid gap-2',
          columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1',
        )}
      >
        {options.map((option) => {
          const isSelected = currentValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'group relative flex items-start gap-2.5 rounded-xl border p-2.5 sm:p-3 text-left transition-all duration-150 cursor-pointer',
                isSelected
                  ? 'border-primary bg-primary/10 ring-1 ring-primary/40 shadow-xs'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/40',
              )}
            >
              {/* Radio Indicator */}
              <div
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/40 group-hover:border-primary/60',
                )}
              >
                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>

              {/* Text / Badge details */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {option.icon && (
                      <span
                        className={cn(
                          'shrink-0',
                          isSelected ? 'text-primary' : 'text-muted-foreground',
                        )}
                      >
                        {option.icon}
                      </span>
                    )}
                    <span
                      className={cn(
                        'text-xs font-semibold leading-snug truncate',
                        isSelected ? 'text-foreground font-bold' : 'text-foreground/90',
                      )}
                    >
                      {option.label}
                    </span>
                  </div>

                  {option.badge && (
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {option.badge}
                    </span>
                  )}
                </div>

                {option.description && (
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </FieldShell>
  );
}

/* ------------------------------------------------------------------- image -- */

/* ------------------------------------------------------------------- image -- */

type ImageTab = 'library' | 'upload' | 'stock';

const POOL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'tech-abstract', label: 'Tech' },
  { id: 'office-team', label: 'Team' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'retail-product', label: 'Products' },
  { id: 'luxury-goods', label: 'Luxury' },
  { id: 'workshop-craft', label: 'Craft' },
  { id: 'cityscape', label: 'City' },
  { id: 'people-portrait', label: 'Portraits' },
  { id: 'nature-clean', label: 'Nature' },
];

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
  const optionalPool = useImagePool();
  const [picking, setPicking] = useState(false);
  const [activeTab, setActiveTab] = useState<ImageTab>('library');

  // Library tab state
  const [libCategory, setLibCategory] = useState('all');
  const [libQuery, setLibQuery] = useState('');

  // Upload tab state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Stock tab state
  const [stockQuery, setStockQuery] = useState('');
  const [stockLoading, setStockLoading] = useState(false);
  const [stockConfigured, setStockConfigured] = useState<boolean | null>(null);
  const [stockResults, setStockResults] = useState<
    { url: string; thumb: string; alt: string; credit?: string }[]
  >([]);
  const [hasSearchedStock, setHasSearchedStock] = useState(false);

  // Filter library images
  const poolImages = optionalPool ?? [];
  const filteredPool = poolImages.filter((img) => {
    if (libCategory !== 'all' && img.category && img.category !== libCategory) return false;
    if (libQuery.trim()) {
      const q = libQuery.toLowerCase();
      const matchLabel = img.label?.toLowerCase().includes(q);
      const matchCat = img.category?.toLowerCase().includes(q);
      const matchUrl = img.url.toLowerCase().includes(q);
      if (!matchLabel && !matchCat && !matchUrl) return false;
    }
    return true;
  });

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      onChange(data.url);
      setPicking(false);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSearchStock = async (queryText: string) => {
    const term = queryText.trim();
    if (!term) return;
    setStockLoading(true);
    setHasSearchedStock(true);
    try {
      const res = await fetch(`/api/images/stock?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setStockConfigured(Boolean(data.configured));
      setStockResults(data.results ?? []);
    } catch {
      setStockConfigured(false);
      setStockResults([]);
    } finally {
      setStockLoading(false);
    }
  };

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
            <Button
              type="button"
              variant={picking ? 'secondary' : 'outline'}
              size="sm"
              className="h-7 px-2.5 text-xs"
              onClick={() => setPicking((p) => !p)}
            >
              <ImageIcon className="mr-1.5 h-3.5 w-3.5" />
              {picking ? 'Close picker' : value ? 'Change image' : 'Pick image'}
            </Button>
            {value ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => onChange(undefined)}
              >
                Clear
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {picking ? (
        <div className="mt-2.5 space-y-3 rounded-lg border border-border bg-card p-3 shadow-xs">
          {/* Tabs bar */}
          <div className="flex items-center gap-1 border-b border-border pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('library')}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                activeTab === 'library'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              Curated Library
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                activeTab === 'upload'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('stock');
                if (stockConfigured === null && !hasSearchedStock) {
                  // Probe config status if not done yet
                  fetch('/api/images/stock?q=business')
                    .then((r) => r.json())
                    .then((d) => {
                      setStockConfigured(Boolean(d.configured));
                      if (d.results) setStockResults(d.results);
                      setHasSearchedStock(true);
                    })
                    .catch(() => setStockConfigured(false));
                }
              }}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                activeTab === 'stock'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              Stock Search
            </button>
          </div>

          {/* Tab 1: Library */}
          {activeTab === 'library' && (
            <div className="space-y-2.5">
              <div className="flex gap-1.5 overflow-x-auto pb-1 thin-scroll">
                {POOL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setLibCategory(cat.id)}
                    className={cn(
                      'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors',
                      libCategory === cat.id
                        ? 'bg-secondary text-secondary-foreground font-semibold border border-border'
                        : 'text-muted-foreground hover:bg-muted',
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <Input
                value={libQuery}
                placeholder="Filter library images..."
                onChange={(e) => setLibQuery(e.target.value)}
                className="h-8 text-xs"
              />

              <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto thin-scroll rounded-md border border-border/70 bg-background/50 p-2">
                {filteredPool.length > 0 ? (
                  filteredPool.slice(0, 90).map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      title={img.label ?? img.category ?? img.url}
                      onClick={() => {
                        onChange(img.url);
                        setPicking(false);
                      }}
                      className={cn(
                        'group relative aspect-video overflow-hidden rounded border transition-all',
                        value === img.url
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-border hover:border-primary/60 hover:opacity-90',
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.label ?? ''}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))
                ) : (
                  <div className="col-span-3 py-6 text-center text-xs text-muted-foreground">
                    No images match the selected filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className={cn(
                  'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-5 text-center transition-colors',
                  isDragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-background/50 hover:border-muted-foreground/40',
                )}
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-foreground">
                  Drag & drop an image here, or browse
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  PNG, JPEG, WebP, SVG or GIF up to 5 MB
                </p>
                <label className="mt-3 cursor-pointer">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                    className="sr-only"
                    disabled={uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                  <span className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-xs hover:bg-accent hover:text-accent-foreground">
                    {uploading ? 'Uploading...' : 'Choose file'}
                  </span>
                </label>
              </div>

              {uploadError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2 text-xs text-destructive">
                  {uploadError}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Stock Search */}
          {activeTab === 'stock' && (
            <div className="space-y-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchStock(stockQuery);
                }}
                className="flex gap-2"
              >
                <Input
                  value={stockQuery}
                  placeholder="Search Unsplash photos (e.g. finance, office, city)..."
                  onChange={(e) => setStockQuery(e.target.value)}
                  className="h-8 text-xs"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs"
                  disabled={stockLoading || !stockQuery.trim()}
                >
                  {stockLoading ? 'Searching...' : 'Search'}
                </Button>
              </form>

              {stockConfigured === false ? (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
                  <p className="font-semibold text-amber-400">Stock Search Not Configured</p>
                  <p className="mt-1 text-amber-200/90 leading-relaxed">
                    Live Unsplash stock search requires an API access key. Set{' '}
                    <code className="rounded bg-black/40 px-1 py-0.5 text-amber-300 font-mono text-[11px]">
                      STOCK_IMAGE_API_KEY
                    </code>{' '}
                    in your environment to enable real-time search. You can freely use the curated
                    Library tab or Upload your own photos.
                  </p>
                </div>
              ) : (
                <div className="grid max-h-56 grid-cols-3 gap-2 overflow-y-auto thin-scroll rounded-md border border-border/70 bg-background/50 p-2">
                  {stockResults.length > 0 ? (
                    stockResults.map((photo) => (
                      <button
                        key={photo.url}
                        type="button"
                        title={photo.credit ?? photo.alt}
                        onClick={() => {
                          onChange(photo.url);
                          setPicking(false);
                        }}
                        className={cn(
                          'group relative aspect-video overflow-hidden rounded border transition-all',
                          value === photo.url
                            ? 'border-primary ring-2 ring-primary/30'
                            : 'border-border hover:border-primary/60 hover:opacity-90',
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.thumb || photo.url}
                          alt={photo.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        {photo.credit && (
                          <span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-1 py-0.5 text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                            {photo.credit}
                          </span>
                        )}
                      </button>
                    ))
                  ) : hasSearchedStock && !stockLoading ? (
                    <div className="col-span-3 py-6 text-center text-xs text-muted-foreground">
                      No stock photos found. Try a different search query.
                    </div>
                  ) : (
                    <div className="col-span-3 py-6 text-center text-xs text-muted-foreground">
                      Search for high-resolution stock photography.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
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
    <div className="space-y-1 border-b border-border pb-4">
      <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
      {hint ? <p className="text-[13px] leading-snug text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="pt-1 text-xs font-semibold uppercase tracking-wide text-foreground/70">
      {children}
    </div>
  );
}
