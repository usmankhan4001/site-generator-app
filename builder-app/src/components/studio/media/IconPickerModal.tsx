'use client';

import React, { useState, useMemo } from 'react';
import { icons, Search, X, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface IconPickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (iconName: string) => void;
  selectedIcon?: string;
  title?: string;
}

export type IconCategory =
  | 'all'
  | 'commerce'
  | 'finance'
  | 'tech'
  | 'security'
  | 'communication'
  | 'social'
  | 'arrows'
  | 'navigation'
  | 'analytics';

const CATEGORIES: { id: IconCategory; label: string }[] = [
  { id: 'all', label: 'All Icons' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'finance', label: 'Finance' },
  { id: 'tech', label: 'Tech & Code' },
  { id: 'security', label: 'Security' },
  { id: 'communication', label: 'Communication' },
  { id: 'social', label: 'Social & People' },
  { id: 'arrows', label: 'Arrows' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'analytics', label: 'Analytics' },
];

const CATEGORY_MATCHERS: Record<Exclude<IconCategory, 'all'>, RegExp> = {
  commerce: /(cart|bag|shop|store|tag|ticket|barcode|percent|receipt|truck|package|box|gift|basket)/i,
  finance: /(dollar|credit|card|wallet|bank|coin|currency|money|euro|pound|bitcoin|vault|piggy|cash|gem|landmark)/i,
  tech: /(cpu|terminal|server|code|database|laptop|monitor|cloud|git|hard|wifi|radio|usb|circuit|chip|bot|plug|satellite)/i,
  security: /(shield|lock|key|fingerprint|eye|alert|badge|check|award|file-check|scan|siren)/i,
  communication: /(message|chat|mail|send|phone|bell|inbox|at-sign|megaphone|share|rss|contact|reply)/i,
  social: /(user|users|heart|thumbs|smile|award|crown|star|party|coffee|hand|person)/i,
  arrows: /(arrow|chevron|corner|move|repeat|refresh|undo|redo|shuffle|maximize|minimize|shrink|expand)/i,
  navigation: /(home|compass|map|pin|navigation|menu|layers|list|grid|more|search|filter|sliders|crosshair|globe)/i,
  analytics: /(chart|bar|pie|trending|activity|gauge|line|radar|presentation|calculator|history|clock)/i,
};

const ALL_ICON_NAMES = Object.keys(icons).sort();

export function IconPickerModal({
  open,
  onOpenChange,
  onSelect,
  selectedIcon,
  title = 'Select Icon',
}: IconPickerModalProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<IconCategory>('all');
  const [displayCount, setDisplayCount] = useState(120);

  const filteredIcons = useMemo(() => {
    const q = search.trim().toLowerCase();

    return ALL_ICON_NAMES.filter((name) => {
      // 1. Category filter
      if (activeCategory !== 'all') {
        const matcher = CATEGORY_MATCHERS[activeCategory];
        if (!matcher.test(name)) return false;
      }

      // 2. Search query filter
      if (q) {
        return name.toLowerCase().includes(q);
      }

      return true;
    });
  }, [search, activeCategory]);

  const visibleIcons = useMemo(() => {
    return filteredIcons.slice(0, displayCount);
  }, [filteredIcons, displayCount]);

  const handleSelectIcon = (iconName: string) => {
    onSelect(iconName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] p-0 flex flex-col gap-0 overflow-hidden sm:rounded-2xl border-border bg-popover">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border bg-card/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold tracking-tight">
              {title}
            </DialogTitle>
            <span className="text-xs text-muted-foreground mr-6">
              {filteredIcons.length} available
            </span>
          </div>

          {/* Search Box */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setDisplayCount(120);
              }}
              placeholder="Search 1,600+ icons (e.g. credit-card, shield, globe, chart)..."
              className="pl-9 pr-8 h-10 text-sm bg-background border-border"
              autoFocus
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setDisplayCount(120);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </DialogHeader>

        {/* Icons Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          {filteredIcons.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <Search className="size-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No icons match your search</p>
              <p className="text-xs mt-1">Try another term or switch category</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
              {visibleIcons.map((iconName) => {
                const IconComponent = icons[iconName as keyof typeof icons];
                if (!IconComponent) return null;
                const isSelected = selectedIcon === iconName;

                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleSelectIcon(iconName)}
                    title={iconName}
                    className={`group relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary ring-2 ring-primary/40'
                        : 'border-border/60 bg-card hover:border-primary/50 hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    <IconComponent className="size-6 transition-transform group-hover:scale-110" />
                    <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground truncate w-full text-center mt-2">
                      {iconName}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1 right-1 size-3.5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <Check className="size-2.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Show More Pagination Button */}
          {filteredIcons.length > displayCount && (
            <div className="text-center mt-6">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDisplayCount((c) => c + 120)}
                className="text-xs px-6"
              >
                Load More Icons ({filteredIcons.length - displayCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
