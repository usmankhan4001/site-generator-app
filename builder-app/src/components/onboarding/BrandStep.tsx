'use client';

import { useRef, useState } from 'react';
import { Loader2, UploadCloud, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Field, isHexColor } from './primitives';
import type { OnboardingData } from './types';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/svg+xml,image/gif';

export function BrandStep({
  data,
  patch,
}: {
  data: OnboardingData;
  patch: (p: Partial<OnboardingData>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  async function handleFile(file: File | null | undefined) {
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/uploads', { method: 'POST', body: fd });
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        throw new Error(json.error || 'Upload failed. Try a different file.');
      }
      patch({ logoUrl: json.url });
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed. Try a different file.');
    } finally {
      setUploading(false);
    }
  }

  const brandColor = data.brandColor.trim();
  const validHex = brandColor === '' || isHexColor(brandColor);

  return (
    <div className="space-y-8">
      <Field
        label="Your logo"
        optional
        hint="PNG, SVG, JPEG, WebP or GIF — up to 5 MB."
      >
        {data.logoUrl ? (
          <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.logoUrl}
              alt="Logo preview"
              className="h-16 w-16 rounded-lg border border-border object-contain p-1"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Logo uploaded</p>
              <p className="truncate text-xs text-muted-foreground">{data.logoUrl}</p>
            </div>
            <button
              type="button"
              onClick={() => patch({ logoUrl: '' })}
              aria-label="Remove logo"
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={cn(
              'flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-10 text-center transition-colors',
              dragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/40 hover:bg-accent/30',
            )}
          >
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : (
              <UploadCloud className="h-6 w-6 text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              {uploading ? 'Uploading…' : 'Drag a file here, or click to browse'}
            </span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {uploadError ? <p className="text-xs text-destructive">{uploadError}</p> : null}
      </Field>

      <Field
        label="Brand colour"
        htmlFor="brandColor"
        optional
        hint={
          validHex
            ? 'A hex value like #4F46E5 — used as the accent across your site.'
            : 'That doesn’t look like a hex colour yet (e.g. #4F46E5).'
        }
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-10 w-10 shrink-0 rounded-lg border border-border"
            style={{
              backgroundColor: validHex && brandColor ? brandColor : 'transparent',
            }}
          />
          <Input
            id="brandColor"
            value={data.brandColor}
            onChange={(e) => patch({ brandColor: e.target.value })}
            placeholder="#4F46E5"
            className={cn(!validHex && 'border-destructive focus-visible:ring-destructive')}
          />
          <input
            type="color"
            aria-label="Pick a brand colour"
            value={isHexColor(brandColor) ? brandColor : '#4F46E5'}
            onChange={(e) => patch({ brandColor: e.target.value })}
            className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-border bg-background"
          />
        </div>
      </Field>

      <Field
        label="Existing website"
        htmlFor="existingUrl"
        optional
        hint="If you already have a site, we’ll use it as a reference."
      >
        <Input
          id="existingUrl"
          value={data.existingUrl}
          onChange={(e) => patch({ existingUrl: e.target.value })}
          placeholder="https://example.com"
        />
      </Field>
    </div>
  );
}
