'use client';

import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { IMAGE_POOL, type ImageCategory } from '@/site/lib/imagePool';
import { Search, Upload, Image as ImageIcon, Sparkles, Loader2, Check } from 'lucide-react';

interface MediaLibraryModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentUrl?: string;
  title?: string;
}

const CATEGORIES: { id: ImageCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Photos' },
  { id: 'tech-abstract', label: 'Tech & SaaS' },
  { id: 'office-team', label: 'Office & Team' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'retail-product', label: 'Products' },
  { id: 'luxury-goods', label: 'Luxury & Goods' },
  { id: 'cityscape', label: 'Architecture' },
  { id: 'people-portrait', label: 'Portraits' },
  { id: 'nature-clean', label: 'Clean / Nature' },
];

export function MediaLibraryModal({
  open,
  onClose,
  onSelect,
  currentUrl,
  title = 'Select or Replace Image',
}: MediaLibraryModalProps) {
  const [tab, setTab] = useState<'pool' | 'upload' | 'url'>('pool');
  const [selectedCat, setSelectedCat] = useState<ImageCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const filteredPool = useMemo(() => {
    let pool = IMAGE_POOL;
    if (selectedCat !== 'all') {
      pool = pool.filter((img) => img.category === selectedCat);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(
        (img) =>
          img.category.toLowerCase().includes(q) ||
          img.tags.some((t) => t.toLowerCase().includes(q)) ||
          img.url.toLowerCase().includes(q),
      );
    }
    return pool.slice(0, 48);
  }, [selectedCat, searchQuery]);

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
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onSelect(data.url);
      onClose();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) return;
    onSelect(customUrl.trim());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden p-0 max-h-[85vh] flex flex-col rounded-2xl bg-card border-border shadow-2xl">
        <DialogHeader className="p-5 pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Choose high-resolution vetted images, upload assets, or provide a custom image URL.
              </DialogDescription>
            </div>
            {/* Tabs */}
            <div className="flex rounded-lg bg-muted/60 p-0.5">
              <button
                type="button"
                onClick={() => setTab('pool')}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-md transition-all',
                  tab === 'pool'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Stock Library
              </button>
              <button
                type="button"
                onClick={() => setTab('upload')}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-md transition-all',
                  tab === 'upload'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setTab('url')}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-md transition-all',
                  tab === 'url'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Direct Link
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === 'pool' && (
            <div className="space-y-3.5">
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search curated photos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 pl-8 text-xs bg-muted/30"
                  />
                </div>

                {/* Categories */}
                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto thin-scroll pb-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCat(cat.id)}
                      className={cn(
                        'shrink-0 text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors',
                        selectedCat === cat.id
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of images */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 pt-1">
                {filteredPool.map((img, idx) => {
                  const isCurrent = currentUrl === img.url;
                  return (
                    <button
                      key={`${img.url}-${idx}`}
                      type="button"
                      onClick={() => {
                        onSelect(img.url);
                        onClose();
                      }}
                      className={cn(
                        'group relative aspect-4/3 overflow-hidden rounded-xl border transition-all text-left focus:outline-none',
                        isCurrent
                          ? 'border-primary ring-2 ring-primary ring-offset-1 ring-offset-background'
                          : 'border-border/60 hover:border-primary/80 hover:shadow-md',
                      )}
                    >
                      <img
                        src={img.url}
                        alt={img.tags.join(', ')}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-[10px] text-white font-medium capitalize truncate">
                          {img.category.replace('-', ' ')}
                        </span>
                      </div>
                      {isCurrent && (
                        <div className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'upload' && (
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <label className="flex flex-col items-center justify-center w-full max-w-md h-48 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:border-primary/60 hover:bg-accent/40 transition-all p-6 text-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {uploading ? 'Uploading asset...' : 'Click or drag photo here to upload'}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, WebP, SVG up to 10MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleFileUpload(file);
                  }}
                />
              </label>

              {uploading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Processing and uploading image to CDN...</span>
                </div>
              )}

              {uploadError && (
                <p className="text-xs text-destructive font-medium">{uploadError}</p>
              )}
            </div>
          )}

          {tab === 'url' && (
            <div className="space-y-4 max-w-md mx-auto py-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Direct Image Link</label>
                <Input
                  placeholder="https://example.com/photo.jpg"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="h-9 text-xs"
                />
                <p className="text-[11px] text-muted-foreground">
                  Paste any public HTTPS image link from Unsplash, Shopify CDN, or your own hosting.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleApplyCustomUrl} disabled={!customUrl.trim()}>
                  Use this Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
