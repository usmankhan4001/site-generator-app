'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { useStudio, useActivePage } from '@/store/studio';
import { SECTION_TYPES, type SectionType } from '@/site/schema';
import { SECTION_LABELS, SECTION_DESCRIPTIONS } from './panels/labels';
import { SectionSkeleton } from './panels/SectionSkeleton';
import { cn } from '@/lib/utils';

interface AddSectionDrawerProps {
  open: boolean;
  onClose: () => void;
  insertIndex?: number;
}

interface SectionMeta {
  type: SectionType;
  category: 'core' | 'features' | 'proof' | 'conversion' | 'content' | 'forms';
  categoryLabel: string;
  variants: string[];
}

const SECTION_METAS: Record<SectionType, SectionMeta> = {
  hero: {
    type: 'hero',
    category: 'core',
    categoryLabel: 'Hero & Core',
    variants: ['Split Layout', 'Centered', 'Lead Form', 'Bento Collage', 'Fullbleed Display', 'Stats Banner'],
  },
  pageHeader: {
    type: 'pageHeader',
    category: 'core',
    categoryLabel: 'Hero & Core',
    variants: ['Standard Title', 'Breadcrumbs', 'Eyebrow + Meta'],
  },
  statsBar: {
    type: 'statsBar',
    category: 'core',
    categoryLabel: 'Hero & Core',
    variants: ['Metric Bar', 'Live Tickers', 'Gradient Accents'],
  },
  trustBar: {
    type: 'trustBar',
    category: 'proof',
    categoryLabel: 'Social Proof',
    variants: ['Pill Badges', 'Logo Wall', 'Infinite Marquee'],
  },
  testimonials: {
    type: 'testimonials',
    category: 'proof',
    categoryLabel: 'Social Proof',
    variants: ['Cards Grid', 'Infinite Marquee', 'Pullquote Showcase', 'Masonry Feed'],
  },
  featureGrid: {
    type: 'featureGrid',
    category: 'features',
    categoryLabel: 'Features & Catalog',
    variants: ['Card Grid', 'Bento Box', 'Sticky Narrative Scroll', 'Tabbed Showcase', 'Zigzag Rows'],
  },
  productGrid: {
    type: 'productGrid',
    category: 'features',
    categoryLabel: 'Features & Catalog',
    variants: ['Retail Grid', 'Server Plans', 'Minimal Catalog', 'Flagship Bundle', 'Mega Catalog'],
  },
  valueGrid: {
    type: 'valueGrid',
    category: 'features',
    categoryLabel: 'Features & Catalog',
    variants: ['2-4 Column Grid', 'Icon Cards', 'Core Values'],
  },
  processSteps: {
    type: 'processSteps',
    category: 'features',
    categoryLabel: 'Features & Catalog',
    variants: ['Numbered Steps', 'Timeline Cards', 'Duration Tags'],
  },
  pricingTiers: {
    type: 'pricingTiers',
    category: 'conversion',
    categoryLabel: 'Pricing & Conversion',
    variants: ['Tier Cards', 'Glow SaaS Card Deck', 'Comparison Matrix Table', 'Custom Quote Packages'],
  },
  ctaBanner: {
    type: 'ctaBanner',
    category: 'conversion',
    categoryLabel: 'Pricing & Conversion',
    variants: ['Primary Band', 'Dual Action CTAs', 'Trust Guarantee'],
  },
  checkout: {
    type: 'checkout',
    category: 'conversion',
    categoryLabel: 'Pricing & Conversion',
    variants: ['Airwallex Hosted Flow', 'Payment Link Hand-off'],
  },
  contactPanel: {
    type: 'contactPanel',
    category: 'forms',
    categoryLabel: 'Forms & Contact',
    variants: ['Standard Form', 'Enterprise High-Touch', 'Wholesale RFQ', 'NOC Escalation'],
  },
  faq: {
    type: 'faq',
    category: 'content',
    categoryLabel: 'Content & Legal',
    variants: ['Accordion List', 'Categorized Groups'],
  },
  prose: {
    type: 'prose',
    category: 'content',
    categoryLabel: 'Content & Legal',
    variants: ['Rich Markdown Blocks', 'Side Image', 'Checklist Highlights'],
  },
  timeline: {
    type: 'timeline',
    category: 'content',
    categoryLabel: 'Content & Legal',
    variants: ['Chronological Milestones', 'Year Badges'],
  },
  teamGrid: {
    type: 'teamGrid',
    category: 'content',
    categoryLabel: 'Content & Legal',
    variants: ['Member Cards', 'Avatars & Bios', 'Credentials'],
  },
  slaTable: {
    type: 'slaTable',
    category: 'content',
    categoryLabel: 'Content & Legal',
    variants: ['Commitment Matrix', 'Target Uptime Rows'],
  },
  locationList: {
    type: 'locationList',
    category: 'content',
    categoryLabel: 'Content & Legal',
    variants: ['Offices List', 'Data Center Facilities'],
  },
  corporateRegistration: {
    type: 'corporateRegistration',
    category: 'content',
    categoryLabel: 'Content & Legal',
    variants: ['Entity Identifiers', 'Tax & Registration Details'],
  },
  policyDocument: {
    type: 'policyDocument',
    category: 'content',
    categoryLabel: 'Content & Legal',
    variants: ['Legal Clauses', 'Terms of Service', 'Privacy Policy'],
  },
};

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'core', label: 'Hero & Core' },
  { id: 'features', label: 'Features & Catalog' },
  { id: 'proof', label: 'Social Proof' },
  { id: 'conversion', label: 'Pricing & CTA' },
  { id: 'forms', label: 'Forms' },
  { id: 'content', label: 'Content' },
] as const;

export function AddSectionDrawer({ open, onClose, insertIndex }: AddSectionDrawerProps) {
  const activePagePath = useStudio((s) => s.activePagePath);
  const activePage = useActivePage();
  const addSection = useStudio((s) => s.addSection);
  const selectSection = useStudio((s) => s.selectSection);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open, onClose]);

  const filteredSections = useMemo(() => {
    return SECTION_TYPES.filter((type) => {
      const meta = SECTION_METAS[type];
      const matchesCategory = selectedCategory === 'all' || meta?.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const label = SECTION_LABELS[type].toLowerCase();
      const desc = SECTION_DESCRIPTIONS[type].toLowerCase();
      const variantMatch = meta?.variants.some((v) => v.toLowerCase().includes(q));
      return label.includes(q) || desc.includes(q) || variantMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handlePick = (type: SectionType) => {
    const targetIdx = insertIndex !== undefined ? insertIndex : (activePage?.sections.length ?? 0);
    addSection(activePagePath, type, targetIdx);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs transition-opacity" />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Add Section Palette"
        className="fixed bottom-0 left-0 top-0 z-50 flex w-[380px] max-w-full flex-col border-r border-border bg-card shadow-2xl transition-transform"
      >
        {/* Header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-semibold text-foreground">Add Block</span>
            {insertIndex !== undefined && (
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                Position #{insertIndex + 1}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close palette"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blocks (Hero, Bento, Tiers, Form...)"
              className="h-8 w-full rounded-lg border border-input bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="thin-scroll mt-2.5 flex gap-1 overflow-x-auto pb-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors',
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blocks Grid */}
        <div className="thin-scroll min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
          {filteredSections.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No blocks found matching "{searchQuery}".
            </div>
          ) : (
            filteredSections.map((type) => {
              const meta = SECTION_METAS[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handlePick(type)}
                  className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-border bg-background text-left shadow-xs transition-all hover:border-primary/60 hover:shadow-md hover:-translate-y-0.5"
                >
                  {/* Visual Wireframe Preview */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/70 bg-muted/30">
                    <SectionSkeleton type={type} />
                  </div>

                  {/* Title & Info */}
                  <div className="flex items-center justify-between gap-2 p-2.5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-xs font-semibold text-foreground group-hover:text-primary">
                          {SECTION_LABELS[type]}
                        </span>
                      </div>
                      <p className="line-clamp-1 text-[10px] text-muted-foreground">
                        {SECTION_DESCRIPTIONS[type]}
                      </p>
                    </div>

                    {meta?.variants && meta.variants.length > 0 && (
                      <span className="shrink-0 rounded bg-muted/60 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
                        {meta.variants.length} layouts
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
