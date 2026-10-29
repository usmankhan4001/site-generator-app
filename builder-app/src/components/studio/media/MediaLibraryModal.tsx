'use client';

import React, { useState, useEffect, useMemo, useId } from 'react';
import {
  Search,
  Image as ImageIcon,
  Layers,
  ShieldCheck,
  Shapes,
  Sparkles,
  Check,
  ExternalLink,
  Loader2,
  X,
  CreditCard,
  Building,
  Briefcase,
  Cpu,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { StockImage } from '@/lib/images/types';
import { getCuratedStockImages, getCuratedIndustries } from '@/lib/images/curated';
import {
  ARCHITECTURAL_ILLUSTRATIONS,
  type ArchitecturalIllustration,
} from '@/lib/images/illustrations';
import { BRAND_MARKS, type BrandMark, type BrandCategory } from '@/lib/images/brand-logos';
import { MonogramGenerator } from './MonogramGenerator';
import { icons } from 'lucide-react';

export interface MediaLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage?: (url: string, alt?: string) => void;
  onSelectIcon?: (iconName: string) => void;
  defaultTab?: 'photos' | 'illustrations' | 'brands' | 'icons' | 'monogram';
  title?: string;
}

export function MediaLibraryModal({
  open,
  onOpenChange,
  onSelectImage,
  onSelectIcon,
  defaultTab = 'photos',
  title = 'Media & Asset Hub',
}: MediaLibraryModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Sync defaultTab when open changes
  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);

  // ========================================================
  // TAB 1: STOCK PHOTOS STATE & LOGIC
  // ========================================================
  const [photoSearch, setPhotoSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [photos, setPhotos] = useState<StockImage[]>([]);
  const [photosLoading, setPhotosLoading] = useState(false);
  const industries = useMemo(() => getCuratedIndustries(), []);

  const loadPhotos = async (term: string) => {
    setPhotosLoading(true);
    try {
      const res = await fetch(`/api/images/stock?q=${encodeURIComponent(term || 'featured')}`);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setPhotos(data.results);
          setPhotosLoading(false);
          return;
        }
      }
    } catch {
      // Graceful fallback to client-side curated library
    }
    const fallback = getCuratedStockImages(term || 'featured', 24);
    setPhotos(fallback);
    setPhotosLoading(false);
  };

  useEffect(() => {
    if (open && activeTab === 'photos' && photos.length === 0) {
      loadPhotos('featured');
    }
  }, [open, activeTab, photos.length]);

  const handleSearchPhotos = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSelectedIndustry('all');
    loadPhotos(photoSearch);
  };

  const handleSelectIndustry = (indId: string) => {
    setSelectedIndustry(indId);
    setPhotoSearch('');
    loadPhotos(indId === 'all' ? 'featured' : indId);
  };

  // ========================================================
  // TAB 2: VECTOR ILLUSTRATIONS STATE & LOGIC
  // ========================================================
  const [illustrationSearch, setIllustrationSearch] = useState('');
  const [illustrationCategory, setIllustrationCategory] = useState<string>('all');

  const filteredIllustrations = useMemo(() => {
    const q = illustrationSearch.trim().toLowerCase();
    return ARCHITECTURAL_ILLUSTRATIONS.filter((item) => {
      if (illustrationCategory !== 'all' && item.category !== illustrationCategory) {
        return false;
      }
      if (q) {
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [illustrationSearch, illustrationCategory]);

  // ========================================================
  // TAB 3: BRAND MARKS & COMPLIANCE SEALS STATE & LOGIC
  // ========================================================
  const [brandSearch, setBrandSearch] = useState('');
  const [brandCategory, setBrandCategory] = useState<BrandCategory | 'all'>('all');
  const [grayscale, setGrayscale] = useState(false);

  const filteredBrands = useMemo(() => {
    const q = brandSearch.trim().toLowerCase();
    return BRAND_MARKS.filter((m) => {
      if (brandCategory !== 'all' && m.category !== brandCategory) {
        return false;
      }
      if (q) {
        return (
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [brandSearch, brandCategory]);

  // ========================================================
  // TAB 4: ICONS STATE & LOGIC
  // ========================================================
  const [iconSearch, setIconSearch] = useState('');
  const [iconCategory, setIconCategory] = useState<string>('all');
  const [iconDisplayCount, setIconDisplayCount] = useState(120);

  const allIconNames = useMemo(() => Object.keys(icons).sort(), []);

  const filteredIcons = useMemo(() => {
    const q = iconSearch.trim().toLowerCase();
    return allIconNames.filter((name) => {
      if (q && !name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [iconSearch, allIconNames]);

  // Selection handler
  const handlePickAsset = (url: string, alt?: string) => {
    if (onSelectImage) {
      onSelectImage(url, alt);
    }
    onOpenChange(false);
  };

  const handlePickSvgString = (svg: string, alt: string) => {
    const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    handlePickAsset(dataUri, alt);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[88vh] p-0 flex flex-col gap-0 overflow-hidden sm:rounded-2xl border-border bg-popover shadow-2xl">
        {/* Header */}
        <DialogHeader className="px-6 py-3.5 border-b border-border bg-card/60 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-lg font-bold tracking-tight">
              {title}
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Zero-slop curated high-resolution photography, architectural vectors, and brand trust marks.
            </p>
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as typeof defaultTab)}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="px-6 border-b border-border bg-muted/20">
            <TabsList className="h-11 bg-transparent p-0 gap-4 border-b border-transparent">
              <TabsTrigger
                value="photos"
                className="gap-2 rounded-none border-b-2 border-transparent py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold text-xs"
              >
                <ImageIcon className="size-4" />
                Editorial Stock Photos
              </TabsTrigger>
              <TabsTrigger
                value="illustrations"
                className="gap-2 rounded-none border-b-2 border-transparent py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold text-xs"
              >
                <Layers className="size-4" />
                Architectural Vectors ({ARCHITECTURAL_ILLUSTRATIONS.length})
              </TabsTrigger>
              <TabsTrigger
                value="brands"
                className="gap-2 rounded-none border-b-2 border-transparent py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold text-xs"
              >
                <ShieldCheck className="size-4" />
                Brand & Trust Badges ({BRAND_MARKS.length})
              </TabsTrigger>
              <TabsTrigger
                value="icons"
                className="gap-2 rounded-none border-b-2 border-transparent py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold text-xs"
              >
                <Shapes className="size-4" />
                Lucide Icons (1,600+)
              </TabsTrigger>
              <TabsTrigger
                value="monogram"
                className="gap-2 rounded-none border-b-2 border-transparent py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold text-xs"
              >
                <Sparkles className="size-4" />
                Monogram Studio
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ====================================================== */}
          {/* TAB 1 CONTENT: EDITORIAL STOCK PHOTOS                 */}
          {/* ====================================================== */}
          <TabsContent value="photos" className="flex-1 flex flex-col min-h-0 m-0">
            {/* Search & Industry Quick Filter Bar */}
            <div className="p-4 border-b border-border bg-card/40 space-y-3">
              <form onSubmit={handleSearchPhotos} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <Input
                    value={photoSearch}
                    onChange={(e) => setPhotoSearch(e.target.value)}
                    placeholder="Search curated photography by topic, atmosphere, or concept..."
                    className="pl-9 text-sm bg-background border-border"
                  />
                  {photoSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoSearch('');
                        loadPhotos('featured');
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
                <Button type="submit" size="sm" className="px-5 font-semibold">
                  Search
                </Button>
              </form>

              {/* Quick Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                <button
                  type="button"
                  onClick={() => handleSelectIndustry('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedIndustry === 'all'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  All Industries
                </button>
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => handleSelectIndustry(ind.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedIndustry === ind.id
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Photos Grid */}
            <div className="flex-1 p-5 overflow-y-auto">
              {photosLoading ? (
                <div className="py-24 flex flex-col items-center justify-center text-muted-foreground">
                  <Loader2 className="size-8 animate-spin text-primary mb-3" />
                  <p className="text-sm font-medium">Retrieving curated editorial photos...</p>
                </div>
              ) : photos.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                  <ImageIcon className="size-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-semibold text-foreground">No photos found</p>
                  <p className="text-xs mt-1">Try another keyword or select an industry pill above.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo, idx) => (
                    <div
                      key={photo.url + idx}
                      className="group relative rounded-xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="aspect-16/10 relative overflow-hidden bg-muted">
                        <img
                          src={photo.thumb || photo.url}
                          alt={photo.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => handlePickAsset(photo.url, photo.alt)}
                            className="text-xs font-semibold shadow-lg"
                          >
                            Use This Photo
                          </Button>
                        </div>
                      </div>
                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <p className="text-xs font-medium text-foreground line-clamp-1" title={photo.alt}>
                          {photo.alt}
                        </p>
                        {photo.credit && (
                          <p className="text-[10px] text-muted-foreground mt-1 truncate">
                            {photo.credit}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ====================================================== */}
          {/* TAB 2 CONTENT: THEME-ADAPTIVE ARCHITECTURAL VECTORS    */}
          {/* ====================================================== */}
          <TabsContent value="illustrations" className="flex-1 flex flex-col min-h-0 m-0">
            {/* Filter bar */}
            <div className="p-4 border-b border-border bg-card/40 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={illustrationSearch}
                  onChange={(e) => setIllustrationSearch(e.target.value)}
                  placeholder="Filter 32 architectural vector illustrations..."
                  className="pl-9 text-sm bg-background border-border"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {['all', 'fintech', 'security', 'infrastructure', 'analytics', 'workflow', 'architecture'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setIllustrationCategory(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                      illustrationCategory === c
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 p-5 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIllustrations.map((item) => (
                  <div
                    key={item.id}
                    className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-all p-4"
                  >
                    <div className="aspect-4/3 w-full rounded-lg bg-muted/40 p-4 flex items-center justify-center border border-border/40 overflow-hidden">
                      <div
                        className="w-full h-full flex items-center justify-center text-foreground transition-transform group-hover:scale-105"
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                      />
                    </div>
                    <div className="mt-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-border flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handlePickSvgString(item.svg, item.title)}
                          className="w-full text-xs font-medium"
                        >
                          Insert Illustration
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ====================================================== */}
          {/* TAB 3 CONTENT: BRAND & TRUST BADGES                   */}
          {/* ====================================================== */}
          <TabsContent value="brands" className="flex-1 flex flex-col min-h-0 m-0">
            {/* Filter and Grayscale toggle */}
            <div className="p-4 border-b border-border bg-card/40 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search payment networks, compliance seals, or cloud providers..."
                  className="pl-9 text-sm bg-background border-border"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {(['all', 'payment', 'compliance', 'cloud'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setBrandCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                        brandCategory === cat
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {cat === 'all' ? 'All Marks' : cat}
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-border" />

                {/* Grayscale Toggle */}
                <div className="flex items-center gap-2">
                  <Switch
                    id="brand-grayscale"
                    checked={grayscale}
                    onCheckedChange={setGrayscale}
                  />
                  <Label htmlFor="brand-grayscale" className="text-xs font-medium cursor-pointer">
                    Grayscale Mode
                  </Label>
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <div className="flex-1 p-5 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="group flex flex-col rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-all justify-between"
                  >
                    <div
                      className={`h-20 rounded-lg bg-muted/30 p-3 flex items-center justify-center border border-border/40 transition-all ${
                        grayscale ? 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100' : ''
                      }`}
                    >
                      <div
                        className="w-full h-full flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: brand.svg }}
                      />
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">{brand.name}</span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {brand.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                        {brand.description}
                      </p>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handlePickSvgString(brand.svg, brand.name)}
                        className="w-full mt-2.5 text-xs font-medium"
                      >
                        Insert Badge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ====================================================== */}
          {/* TAB 4 CONTENT: LUCIDE ICONS                           */}
          {/* ====================================================== */}
          <TabsContent value="icons" className="flex-1 flex flex-col min-h-0 m-0">
            <div className="p-4 border-b border-border bg-card/40">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={iconSearch}
                  onChange={(e) => {
                    setIconSearch(e.target.value);
                    setIconDisplayCount(120);
                  }}
                  placeholder="Filter 1,600+ Lucide icons..."
                  className="pl-9 text-sm bg-background border-border"
                />
              </div>
            </div>

            <div className="flex-1 p-5 overflow-y-auto">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
                {filteredIcons.slice(0, iconDisplayCount).map((iconName) => {
                  const IconComp = icons[iconName as keyof typeof icons];
                  if (!IconComp) return null;

                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => {
                        if (onSelectIcon) {
                          onSelectIcon(iconName);
                          onOpenChange(false);
                        } else {
                          // Fallback to inserting icon name as string or URL
                          handlePickAsset(iconName, iconName);
                        }
                      }}
                      className="group flex flex-col items-center justify-center p-3 rounded-xl border border-border/60 bg-card hover:border-primary/50 hover:bg-muted/80 text-foreground transition-all cursor-pointer"
                    >
                      <IconComp className="size-6 transition-transform group-hover:scale-110" />
                      <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground truncate w-full text-center mt-2">
                        {iconName}
                      </span>
                    </button>
                  );
                })}
              </div>

              {filteredIcons.length > iconDisplayCount && (
                <div className="text-center mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIconDisplayCount((c) => c + 120)}
                    className="text-xs px-6"
                  >
                    Load More Icons ({filteredIcons.length - iconDisplayCount} remaining)
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* ====================================================== */}
          {/* TAB 5 CONTENT: MONOGRAM STUDIO                        */}
          {/* ====================================================== */}
          <TabsContent value="monogram" className="flex-1 p-6 overflow-y-auto m-0">
            <MonogramGenerator
              onSelect={(svgDataUri) => {
                handlePickAsset(svgDataUri, 'Brand Monogram');
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
