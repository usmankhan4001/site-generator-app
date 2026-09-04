'use client';

import { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
  Search,
  Sliders,
  Layers,
  Sparkles,
  LayoutTemplate,
} from 'lucide-react';
import { useStudio, useActivePage } from '@/store/studio';
import { SECTION_TYPES, type SectionType } from '@/site/schema';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { PanelHeader, IconBtn } from './fields';
import { SECTION_LABELS, SECTION_DESCRIPTIONS } from './labels';
import { summarizeSection } from './sectionSummary';

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
  { id: 'all', label: 'All Sections' },
  { id: 'core', label: 'Hero & Core' },
  { id: 'features', label: 'Features & Catalog' },
  { id: 'proof', label: 'Social Proof' },
  { id: 'conversion', label: 'Pricing & Conversion' },
  { id: 'forms', label: 'Forms' },
  { id: 'content', label: 'Content & Legal' },
] as const;

export function SectionsPanel() {
  const content = useStudio((s) => s.content);
  const activePagePath = useStudio((s) => s.activePagePath);
  const setActivePage = useStudio((s) => s.setActivePage);
  const page = useActivePage();
  const toggleSection = useStudio((s) => s.toggleSection);
  const reorderSections = useStudio((s) => s.reorderSections);
  const selectSection = useStudio((s) => s.selectSection);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  const removeSection = useStudio((s) => s.removeSection);
  const addSection = useStudio((s) => s.addSection);

  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  if (!content || !page) return null;

  const move = (from: number, to: number) => {
    if (to < 0 || to >= page.sections.length || from === to) return;
    reorderSections(activePagePath, from, to);
  };

  const headerVariant = content.header?.variant ?? 'default';

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3 p-4 pb-0">
        <PanelHeader
          title="Sections & Layouts"
          hint="Customize global navigation, edit layout variants in real-time, and manage page sections."
        />
        <div className="thin-scroll flex gap-1 overflow-x-auto pb-1">
          {content.pages.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActivePage(p.path)}
              className={cn(
                'shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
                p.path === activePagePath
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {p.navLabel ?? p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="thin-scroll min-h-0 flex-1 space-y-1.5 overflow-y-auto p-4">
        {/* Header & Navigation Global Section */}
        <div
          className={cn(
            'group flex items-center justify-between rounded-lg border bg-card/70 px-3 py-2.5 transition-colors',
            selectedSectionId === 'header'
              ? 'border-primary ring-1 ring-primary/40 bg-primary/5'
              : 'border-border/80 hover:border-border hover:bg-accent/40',
          )}
        >
          <button
            type="button"
            onClick={() => selectSection('header')}
            className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <LayoutTemplate className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-xs font-medium text-foreground">Header & Navigation</span>
                <span className="shrink-0 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
                  {headerVariant.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="truncate text-[11px] text-muted-foreground">
                Global header layout, announcement bar & actions
              </div>
            </div>
          </button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => selectSection('header')}
          >
            <Sliders className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="my-2 flex items-center gap-2 px-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          <Layers className="h-3 w-3" />
          <span>Page Body Sections ({page.sections.length})</span>
        </div>

        {page.sections.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            No sections on this page yet. Click below to add one.
          </p>
        ) : (
          page.sections.map((section, i) => {
            const props = section.props as Record<string, unknown>;
            const activeVariant = props.variant || (section.type === 'productGrid' ? props.layout : undefined) || (section.type === 'contactPanel' ? props.formVariant : undefined);
            const isSelected = selectedSectionId === section.id;

            return (
              <div
                key={section.id}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragEnd={() => setDragIdx(null)}
                onDragOver={(e) => dragIdx !== null && e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIdx !== null) move(dragIdx, i);
                  setDragIdx(null);
                }}
                className={cn(
                  'group flex items-center gap-1.5 rounded-lg border bg-card px-1.5 py-2 transition-colors',
                  isSelected ? 'border-primary ring-1 ring-primary/40 bg-primary/5' : 'border-border',
                  dragIdx === i ? 'border-primary' : '',
                  !section.enabled && 'opacity-50',
                )}
              >
                <span className="cursor-grab p-1 text-muted-foreground/60 group-hover:text-muted-foreground">
                  <GripVertical className="h-3.5 w-3.5" />
                </span>

                <button
                  type="button"
                  onClick={() => selectSection(section.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-xs font-medium text-foreground">
                      {SECTION_LABELS[section.type]}
                    </span>
                    {activeVariant ? (
                      <span className="shrink-0 rounded bg-secondary px-1.5 py-0.2 text-[10px] font-medium text-secondary-foreground">
                        {String(activeVariant).replace(/_/g, ' ')}
                      </span>
                    ) : null}
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {summarizeSection(section) || SECTION_DESCRIPTIONS[section.type]}
                  </div>
                </button>

                <div className="flex shrink-0 items-center gap-0.5">
                  <IconBtn label="Move up" disabled={i === 0} onClick={() => move(i, i - 1)}>
                    <ChevronUp className="h-3.5 w-3.5" />
                  </IconBtn>
                  <IconBtn
                    label="Move down"
                    disabled={i === page.sections.length - 1}
                    onClick={() => move(i, i + 1)}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </IconBtn>
                  <Switch
                    checked={section.enabled}
                    onCheckedChange={() => toggleSection(section.id)}
                    aria-label={section.enabled ? 'Disable section' : 'Enable section'}
                  />
                  <IconBtn
                    label="Remove section"
                    onClick={() => {
                      if (window.confirm(`Remove the "${SECTION_LABELS[section.type]}" section?`)) {
                        removeSection(section.id);
                      }
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconBtn>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-border p-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full gap-1.5 shadow-sm"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" />
          Add section
        </Button>
      </div>

      <AddSectionDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onPick={(type) => {
          addSection(activePagePath, type);
          setAddOpen(false);
        }}
      />
    </div>
  );
}

function AddSectionDialog({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPick: (type: SectionType) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="border-b border-border p-5 pb-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold tracking-tight">Add a Section</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Choose a section block to add to this page. Every section supports multiple layout variants you can customize.
            </DialogDescription>
          </DialogHeader>

          {/* Search bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sections by name, layout variant (e.g. Bento, Glow, Matrix, Marquee)..."
              className="w-full rounded-md border border-input bg-background/50 pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Category tabs */}
          <div className="thin-scroll mt-3 flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
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

        {/* Section items grid */}
        <div className="thin-scroll grid max-h-[55vh] grid-cols-1 gap-3 overflow-y-auto p-5 sm:grid-cols-2">
          {filteredSections.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-xs text-muted-foreground">
              No sections match "{searchQuery}" in this category.
            </div>
          ) : (
            filteredSections.map((type) => {
              const meta = SECTION_METAS[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onPick(type)}
                  className="group relative flex flex-col justify-between rounded-lg border border-border/90 bg-card p-3.5 text-left transition-all hover:border-primary hover:bg-accent/30 hover:shadow-subtle focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary">
                        {SECTION_LABELS[type]}
                      </span>
                      {meta?.categoryLabel ? (
                        <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {meta.categoryLabel}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {SECTION_DESCRIPTIONS[type]}
                    </p>
                  </div>

                  {/* Variant tags */}
                  {meta?.variants && meta.variants.length > 0 ? (
                    <div className="mt-3 border-t border-border/60 pt-2">
                      <div className="mb-1 text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5 text-primary" />
                        Supported Layouts ({meta.variants.length}):
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {meta.variants.map((v) => (
                          <span
                            key={v}
                            className="rounded border border-border/70 bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground/80"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
