'use client';

import { useState } from 'react';
import {
  GripVertical,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Monitor,
  Smartphone,
  Globe,
  Loader2,
  Check,
  ChevronRight,
  Layers,
  LayoutTemplate,
  BarChart3,
  ShieldCheck,
  Grid3X3,
  CreditCard,
  ShoppingBag,
  MessageSquareQuote,
  HelpCircle,
  Megaphone,
  Heading,
  FileText,
  Clock,
  Users,
  ListOrdered,
  Table,
  MapPin,
  Building2,
  Mail,
  Scale,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, useActivePage } from '@/store/studio';
import { cn } from '@/lib/utils';
import type { SectionType, BreakpointVisibility } from '@/site/schema';
import { SECTION_LABELS } from './labels';
import { summarizeSection } from './sectionSummary';

const SECTION_ICONS: Record<SectionType, LucideIcon> = {
  hero: LayoutTemplate,
  statsBar: BarChart3,
  trustBar: ShieldCheck,
  featureGrid: Grid3X3,
  pricingTiers: CreditCard,
  productGrid: ShoppingBag,
  testimonials: MessageSquareQuote,
  faq: HelpCircle,
  ctaBanner: Megaphone,
  pageHeader: Heading,
  prose: FileText,
  timeline: Clock,
  teamGrid: Users,
  valueGrid: Sparkles,
  processSteps: ListOrdered,
  slaTable: Table,
  locationList: MapPin,
  corporateRegistration: Building2,
  contactPanel: Mail,
  policyDocument: Scale,
  checkout: ShoppingCart,
  bentoGrid: Grid3X3,
  comparisonMatrix: Table,
  logoMarquee: ShieldCheck,
  roiCalculator: BarChart3,
  videoShowcase: LayoutTemplate,
  leadMagnet: Mail,
  caseStudyCarousel: MessageSquareQuote,
  socialProofToast: ShieldCheck,
  interactiveTabShowcase: Layers,
  stepWizardProcess: ListOrdered,
  deviceMockupHero: LayoutTemplate,
  announcementBar: Megaphone,
};

const BREAKPOINT_CONFIG: Record<
  BreakpointVisibility,
  { label: string; icon: LucideIcon; style: string; next: BreakpointVisibility }
> = {
  all: {
    label: 'Universal',
    icon: Globe,
    style: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
    next: 'desktop-only',
  },
  'desktop-only': {
    label: 'Desktop Only',
    icon: Monitor,
    style: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
    next: 'mobile-only',
  },
  'mobile-only': {
    label: 'Mobile Only',
    icon: Smartphone,
    style: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20',
    next: 'all',
  },
};

export function VisualComponentTree() {
  const page = useActivePage();
  const activePagePath = useStudio((s) => s.activePagePath);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  const selectSection = useStudio((s) => s.selectSection);
  const toggleSection = useStudio((s) => s.toggleSection);
  const reorderSections = useStudio((s) => s.reorderSections);
  const removeSection = useStudio((s) => s.removeSection);
  const mutate = useStudio((s) => s.mutate);
  const projectId = useStudio((s) => s.meta?.id);
  const updateSectionProps = useStudio((s) => s.updateSectionProps);

  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [aiLoadingId, setAiLoadingId] = useState<string | null>(null);
  const [aiSuccessId, setAiSuccessId] = useState<string | null>(null);

  if (!page) return null;

  const sections = page.sections;

  const handleCycleBreakpoint = (sectionId: string, current: BreakpointVisibility = 'all') => {
    const next = BREAKPOINT_CONFIG[current].next;
    mutate((draft) => {
      for (const p of draft.pages) {
        const sec = p.sections.find((s) => s.id === sectionId);
        if (sec) {
          sec.breakpointVisibility = next;
          return;
        }
      }
    });
  };

  const handleDuplicate = (sectionId: string) => {
    mutate((draft) => {
      for (const p of draft.pages) {
        const idx = p.sections.findIndex((s) => s.id === sectionId);
        if (idx !== -1) {
          const clone = JSON.parse(JSON.stringify(p.sections[idx]));
          clone.id = `${sectionId}-copy-${Date.now().toString(36)}`;
          p.sections.splice(idx + 1, 0, clone);
          return;
        }
      }
    });
  };

  const handleAiRewrite = async (sectionId: string, sectionType: SectionType) => {
    if (!projectId) return;
    setAiLoadingId(sectionId);
    setAiSuccessId(null);
    try {
      await useStudio.getState().saveNow();
      const res = await fetch('/api/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          sectionId,
          prompt: `Rewrite the ${sectionType} section copy with compelling, punchy, conversion-focused language`,
        }),
      });
      const data = await res.json().catch(() => null);
      if (data?.success && data?.patch && Object.keys(data.patch).length > 0) {
        updateSectionProps(sectionId, data.patch);
        setAiSuccessId(sectionId);
        setTimeout(() => setAiSuccessId(null), 2000);
      }
    } catch {
      // Ignore network errors
    } finally {
      setAiLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="flex items-center justify-between px-1 pb-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Layers className="h-4 w-4 text-primary" />
          <span>Visual Component Tree</span>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
          {sections.length} blocks
        </span>
      </div>

      {sections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
          No sections on this page. Use &quot;Add Block&quot; to begin composing.
        </div>
      ) : (
        <div className="space-y-2">
          {sections.map((section, idx) => {
            const isSelected = selectedSectionId === section.id;
            const Icon = SECTION_ICONS[section.type] || Layers;
            const visibility: BreakpointVisibility = section.breakpointVisibility || 'all';
            const bp = BREAKPOINT_CONFIG[visibility];
            const BpIcon = bp.icon;
            const isAiRunning = aiLoadingId === section.id;
            const isAiSuccess = aiSuccessId === section.id;

            return (
              <div
                key={section.id}
                draggable
                onDragStart={() => setDragIdx(idx)}
                onDragEnd={() => setDragIdx(null)}
                onDragOver={(e) => {
                  if (dragIdx !== null) e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragIdx !== null && dragIdx !== idx) {
                    reorderSections(activePagePath, dragIdx, idx);
                  }
                  setDragIdx(null);
                }}
                onClick={() => selectSection(section.id)}
                className={cn(
                  'group relative rounded-xl border bg-card/95 p-2.5 shadow-xs transition-all cursor-pointer',
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-md'
                    : 'border-border/70 hover:border-border hover:shadow-sm',
                  dragIdx === idx && 'opacity-40 border-primary scale-[0.98]',
                  !section.enabled && 'opacity-60 bg-muted/30',
                )}
              >
                {/* Header row: Grip + Icon + Title + Breakpoint Badge */}
                <div className="flex items-center gap-2">
                  <div
                    title="Drag to reorder"
                    className="cursor-grab text-muted-foreground/50 hover:text-foreground active:cursor-grabbing p-0.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>

                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors',
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted/70 text-foreground border-border/60 group-hover:bg-accent',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-xs font-semibold text-foreground">
                        {SECTION_LABELS[section.type] || section.type}
                      </span>
                    </div>
                    <p className="truncate text-[10px] text-muted-foreground">
                      {summarizeSection(section) || 'Standard block layout'}
                    </p>
                  </div>

                  {/* Breakpoint Visibility Badge */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCycleBreakpoint(section.id, visibility);
                    }}
                    title={`Breakpoint: ${bp.label} (Click to cycle)`}
                    className={cn(
                      'flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold transition-all active:scale-95',
                      bp.style,
                    )}
                  >
                    <BpIcon className="h-2.5 w-2.5" />
                    <span className="hidden sm:inline">{bp.label}</span>
                  </button>
                </div>

                {/* Miniature Visual Wireframe Preview Strip */}
                <div className="mt-2 h-7 w-full rounded-md bg-muted/40 border border-border/40 p-1 flex items-center gap-1 overflow-hidden pointer-events-none">
                  {section.type === 'hero' && (
                    <>
                      <div className="h-full w-1/2 rounded-xs bg-primary/20 flex flex-col justify-center px-1 gap-0.5">
                        <div className="h-1 w-3/4 rounded-full bg-primary/40" />
                        <div className="h-0.5 w-1/2 rounded-full bg-primary/30" />
                      </div>
                      <div className="h-full w-1/2 rounded-xs bg-muted-foreground/15" />
                    </>
                  )}
                  {section.type === 'featureGrid' && (
                    <div className="grid grid-cols-3 gap-1 w-full h-full">
                      <div className="rounded-xs bg-muted-foreground/20" />
                      <div className="rounded-xs bg-muted-foreground/20" />
                      <div className="rounded-xs bg-muted-foreground/20" />
                    </div>
                  )}
                  {section.type === 'pricingTiers' && (
                    <div className="grid grid-cols-3 gap-1 w-full h-full">
                      <div className="rounded-xs bg-muted-foreground/15" />
                      <div className="rounded-xs bg-primary/30 border border-primary/40" />
                      <div className="rounded-xs bg-muted-foreground/15" />
                    </div>
                  )}
                  {section.type !== 'hero' &&
                    section.type !== 'featureGrid' &&
                    section.type !== 'pricingTiers' && (
                      <div className="flex items-center justify-between w-full px-2">
                        <div className="h-1 w-20 rounded-full bg-foreground/20" />
                        <div className="h-1 w-12 rounded-full bg-muted-foreground/25" />
                      </div>
                    )}
                </div>

                {/* Quick Action Toolbar */}
                <div
                  className="mt-2 flex items-center justify-between border-t border-border/50 pt-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1">
                    {/* AI Rewrite Quick Action */}
                    <button
                      type="button"
                      disabled={isAiRunning}
                      onClick={() => handleAiRewrite(section.id, section.type)}
                      title="AI Rewrite Section Copy"
                      className="inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-[10px] font-semibold text-primary hover:bg-primary/10 transition-colors"
                    >
                      {isAiRunning ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : isAiSuccess ? (
                        <Check className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <Sparkles className="h-3 w-3" />
                      )}
                      <span>AI Rewrite</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {/* Duplicate */}
                    <button
                      type="button"
                      onClick={() => handleDuplicate(section.id)}
                      title="Duplicate Section"
                      className="h-6 w-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                    </button>

                    {/* Hide/Show Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      title={section.enabled ? 'Hide Section' : 'Show Section'}
                      className={cn(
                        'h-6 w-6 inline-flex items-center justify-center rounded-md transition-colors',
                        section.enabled
                          ? 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          : 'text-amber-500 bg-amber-500/10 hover:bg-amber-500/20',
                      )}
                    >
                      {section.enabled ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete the "${SECTION_LABELS[section.type]}" section?`)) {
                          removeSection(section.id);
                        }
                      }}
                      title="Delete Section"
                      className="h-6 w-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
