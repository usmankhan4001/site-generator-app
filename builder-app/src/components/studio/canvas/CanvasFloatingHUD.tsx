'use client';

import { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Trash2,
  Sparkles,
  Bold,
  Italic,
  Link2,
  Palette,
  Type,
  Image as ImageIcon,
  ChevronDown,
  Layers,
  Wand2,
  Languages,
  Sliders,
  Check,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStudio } from '@/store/studio';
import { MediaLibraryModal } from './MediaLibraryModal';

export interface CanvasFloatingHUDProps {
  rect: { x: number; y: number; w: number; h: number } | null;
  scale: number;
  section: {
    id: string;
    enabled: boolean;
    type?: string;
    props?: Record<string, unknown>;
  };
  canMoveUp: boolean;
  canMoveDown: boolean;
  onEdit: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate?: () => void;
  onDelete: () => void;
  onChangeVariant?: (variant: string) => void;
  onReplaceImage?: (url: string) => void;
}

const SECTION_VARIANTS: Record<string, { id: string; label: string }[]> = {
  hero: [
    { id: 'split', label: 'Split Layout' },
    { id: 'centered', label: 'Centered Display' },
    { id: 'stacked', label: 'Stacked Hero' },
    { id: 'editorial', label: 'Editorial / Luxury' },
    { id: 'bento', label: 'Bento Grid' },
    { id: 'lead_form', label: 'Lead Capture Form' },
  ],
  featureGrid: [
    { id: 'cards', label: 'Feature Cards' },
    { id: 'bento', label: 'Bento Grid' },
    { id: 'tabs', label: 'Interactive Tabs' },
    { id: 'zigzag', label: 'Zigzag Alternating' },
    { id: 'minimal', label: 'Minimal Clean' },
  ],
  pricingTiers: [
    { id: 'cards', label: 'Tier Cards' },
    { id: 'glow_deck', label: 'Glow SaaS Deck' },
    { id: 'comparison_matrix', label: 'Comparison Matrix' },
    { id: 'custom_quote', label: 'Custom Quote' },
  ],
  productGrid: [
    { id: 'grid', label: 'Retail Product Grid' },
    { id: 'catalog', label: 'Minimal Catalog' },
    { id: 'bundle', label: 'Flagship Bundle' },
  ],
  testimonials: [
    { id: 'cards', label: 'Cards Grid' },
    { id: 'marquee', label: 'Infinite Marquee' },
    { id: 'pullquote', label: 'Pullquote Showcase' },
    { id: 'masonry', label: 'Masonry Wall' },
  ],
  faq: [
    { id: 'accordion', label: 'Accordion List' },
    { id: 'two_column', label: 'Two-Column Grid' },
  ],
  ctaBanner: [
    { id: 'band', label: 'Primary Band' },
    { id: 'split', label: 'Split Action' },
    { id: 'minimal', label: 'Minimal Glow' },
  ],
};

const COLOR_OPTIONS = [
  { label: 'Brand Accent', value: 'var(--primary)', bg: 'bg-primary' },
  { label: 'Deep Foreground', value: 'var(--foreground)', bg: 'bg-foreground' },
  { label: 'Muted Slate', value: 'var(--muted-foreground)', bg: 'bg-muted-foreground' },
  { label: 'Emerald Green', value: '#10b981', bg: 'bg-emerald-500' },
  { label: 'Amber Gold', value: '#f59e0b', bg: 'bg-amber-500' },
  { label: 'Violet Accent', value: '#8b5cf6', bg: 'bg-violet-500' },
];

export function CanvasFloatingHUD({
  rect,
  scale,
  section,
  canMoveUp,
  canMoveDown,
  onEdit,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onChangeVariant,
  onReplaceImage,
}: CanvasFloatingHUDProps) {
  const updateSectionProps = useStudio((s) => s.updateSectionProps);
  const mutate = useStudio((s) => s.mutate);
  const projectId = useStudio((s) => s.meta?.id);

  // Popover menus
  const [activeMenu, setActiveMenu] = useState<
    'variant' | 'color' | 'heading' | 'ai' | null
  >(null);
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
  const [aiRunning, setAiRunning] = useState(false);
  const [aiSuccess, setAiSuccess] = useState<string | null>(null);

  if (!rect) return null;

  const currentVariant =
    (section.props?.variant as string) ||
    (section.props?.layout as string) ||
    'default';

  const variants = section.type ? SECTION_VARIANTS[section.type] ?? [] : [];

  const handleSelectVariant = (variantId: string) => {
    if (onChangeVariant) {
      onChangeVariant(variantId);
    } else {
      updateSectionProps(section.id, { variant: variantId });
    }
    setActiveMenu(null);
  };

  const handleExecuteFormatting = (cmd: string, val?: string) => {
    // Send message to preview iframe to execute document command on active selection
    const iframe = document.querySelector('iframe[title="Site preview"]') as HTMLIFrameElement | null;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          source: 'studio',
          type: 'canvas:format',
          command: cmd,
          value: val,
        },
        '*',
      );
    }
    setActiveMenu(null);
  };

  const handleAiAction = async (promptInstruction: string, label: string) => {
    if (!projectId) return;
    setAiRunning(true);
    setAiSuccess(null);
    try {
      await useStudio.getState().saveNow();
      const res = await fetch('/api/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          sectionId: section.id,
          prompt: promptInstruction,
        }),
      });
      const data = await res.json().catch(() => null);
      if (data?.success && data?.patch && Object.keys(data.patch).length > 0) {
        updateSectionProps(section.id, data.patch);
        setAiSuccess(label);
        setTimeout(() => {
          setAiSuccess(null);
          setActiveMenu(null);
        }, 1500);
      }
    } catch {
      // Ignore network errors gracefully
    } finally {
      setAiRunning(false);
    }
  };

  const handleApplyImage = (url: string) => {
    if (onReplaceImage) {
      onReplaceImage(url);
    } else {
      mutate((draft) => {
        for (const page of draft.pages) {
          const sec = page.sections.find((s) => s.id === section.id);
          if (sec && sec.props) {
            const p = sec.props as Record<string, unknown>;
            if ('image' in p) p.image = url;
            else if ('heroImage' in p) p.heroImage = url;
            else if ('bgImage' in p) p.bgImage = url;
            else p.image = url;
            return;
          }
        }
      });
    }
    setMediaLibraryOpen(false);
  };

  // Position the HUD directly floating above the selected element/section
  const topPx = Math.max(10, rect.y * scale - 48);
  const leftPx = Math.max(10, (rect.x + rect.w / 2) * scale);

  return (
    <>
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="pointer-events-auto absolute z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-border/80 bg-zinc-900/95 dark:bg-zinc-950/95 text-zinc-100 p-1 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 transition-all animate-in fade-in zoom-in-95 duration-150"
        style={{ left: leftPx, top: topPx }}
      >
        {/* Section Quick Controls: Move, Variant, Duplicate, Delete */}
        <div className="flex items-center gap-0.5 pr-1 border-r border-zinc-700/60">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            title="Move Section Up"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            title="Move Section Down"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>

          {/* Change Variant Dropdown */}
          {variants.length > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((cur) => (cur === 'variant' ? null : 'variant'))
                }
                title="Change Layout Variant"
                className={cn(
                  'flex h-7 items-center gap-1 rounded-lg px-2 text-[11px] font-medium transition-colors',
                  activeMenu === 'variant'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800',
                )}
              >
                <Layers className="h-3 w-3" />
                <span className="capitalize">{currentVariant.replace(/_/g, ' ')}</span>
                <ChevronDown className="h-2.5 w-2.5 opacity-60" />
              </button>

              {activeMenu === 'variant' && (
                <div className="absolute left-0 top-full mt-1.5 w-48 rounded-xl border border-zinc-700/80 bg-zinc-900/95 p-1.5 shadow-xl backdrop-blur-md z-50">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Layout Variants
                  </div>
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleSelectVariant(v.id)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs text-left transition-colors',
                        currentVariant === v.id
                          ? 'bg-primary/20 text-primary font-semibold'
                          : 'text-zinc-200 hover:bg-zinc-800 hover:text-white',
                      )}
                    >
                      <span>{v.label}</span>
                      {currentVariant === v.id && <Check className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Inline Text Formatting: Bold, Italic, Link, Color, Heading Size */}
        <div className="flex items-center gap-0.5 px-1 border-r border-zinc-700/60">
          <button
            type="button"
            onClick={() => handleExecuteFormatting('bold')}
            title="Bold (Ctrl+B)"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleExecuteFormatting('italic')}
            title="Italic (Ctrl+I)"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = window.prompt('Enter link URL (e.g. /contact or https://...):');
              if (url) handleExecuteFormatting('createLink', url);
            }}
            title="Insert Link"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Link2 className="h-3.5 w-3.5" />
          </button>

          {/* Heading Size Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveMenu((cur) => (cur === 'heading' ? null : 'heading'))
              }
              title="Heading Size"
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors',
                activeMenu === 'heading' && 'bg-zinc-800 text-white',
              )}
            >
              <Type className="h-3.5 w-3.5" />
            </button>
            {activeMenu === 'heading' && (
              <div className="absolute left-0 top-full mt-1.5 w-32 rounded-xl border border-zinc-700/80 bg-zinc-900/95 p-1.5 shadow-xl backdrop-blur-md z-50">
                {['H1 Large', 'H2 Medium', 'H3 Subhead', 'Body Paragraph'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      const tag = lvl.startsWith('H1')
                        ? 'h1'
                        : lvl.startsWith('H2')
                        ? 'h2'
                        : lvl.startsWith('H3')
                        ? 'h3'
                        : 'p';
                      handleExecuteFormatting('formatBlock', tag);
                    }}
                    className="flex w-full items-center rounded-lg px-2 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Palette Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveMenu((cur) => (cur === 'color' ? null : 'color'))
              }
              title="Text Color"
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors',
                activeMenu === 'color' && 'bg-zinc-800 text-white',
              )}
            >
              <Palette className="h-3.5 w-3.5" />
            </button>
            {activeMenu === 'color' && (
              <div className="absolute left-0 top-full mt-1.5 w-40 rounded-xl border border-zinc-700/80 bg-zinc-900/95 p-1.5 shadow-xl backdrop-blur-md z-50">
                <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Text Color
                </div>
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => handleExecuteFormatting('foreColor', c.value)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <span className={cn('h-3 w-3 rounded-full', c.bg)} />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Magic Toolbar: 'Make punchier', 'Shorten', 'Translate', 'Change tone' */}
        <div className="relative flex items-center px-1 border-r border-zinc-700/60">
          <button
            type="button"
            onClick={() => setActiveMenu((cur) => (cur === 'ai' ? null : 'ai'))}
            title="AI Magic Toolbar"
            className={cn(
              'flex h-7 items-center gap-1.5 rounded-lg px-2 text-[11px] font-semibold transition-all',
              activeMenu === 'ai' || aiRunning
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-primary hover:bg-primary/20',
            )}
          >
            {aiRunning ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : aiSuccess ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Wand2 className="h-3.5 w-3.5 text-primary" />
            )}
            <span>AI Magic</span>
            <ChevronDown className="h-2.5 w-2.5 opacity-60" />
          </button>

          {activeMenu === 'ai' && (
            <div className="absolute left-0 top-full mt-1.5 w-56 rounded-xl border border-zinc-700/80 bg-zinc-900/95 p-1.5 shadow-2xl backdrop-blur-md z-50 space-y-1">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                AI Magic Rewriter
              </div>
              <button
                type="button"
                disabled={aiRunning}
                onClick={() =>
                  handleAiAction('Make copy punchier, sharper, and higher-converting', 'Punchier')
                }
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Make punchier</span>
              </button>
              <button
                type="button"
                disabled={aiRunning}
                onClick={() =>
                  handleAiAction('Make copy concise, crisp, and 30% shorter', 'Shortened')
                }
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <Sliders className="h-3.5 w-3.5 text-blue-400" />
                <span>Shorten</span>
              </button>

              <div className="my-1 border-t border-zinc-800" />
              <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Languages className="h-3 w-3" />
                <span>Translate</span>
              </div>
              <button
                type="button"
                disabled={aiRunning}
                onClick={() =>
                  handleAiAction('Translate all copy in this section to professional Spanish', 'Spanish')
                }
                className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <span>Spanish (Español)</span>
                <span className="text-[10px] text-zinc-500 font-mono">ES</span>
              </button>
              <button
                type="button"
                disabled={aiRunning}
                onClick={() =>
                  handleAiAction('Translate all copy in this section to Arabic', 'Arabic')
                }
                className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <span>Arabic (العربية)</span>
                <span className="text-[10px] text-zinc-500 font-mono">AR</span>
              </button>
              <button
                type="button"
                disabled={aiRunning}
                onClick={() =>
                  handleAiAction('Translate all copy in this section to French', 'French')
                }
                className="flex w-full items-center justify-between rounded-lg px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <span>French (Français)</span>
                <span className="text-[10px] text-zinc-500 font-mono">FR</span>
              </button>

              <div className="my-1 border-t border-zinc-800" />
              <div className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Change Tone
              </div>
              <button
                type="button"
                disabled={aiRunning}
                onClick={() =>
                  handleAiAction(
                    'Rewrite in a commanding, confident Executive B2B tone',
                    'Executive',
                  )
                }
                className="flex w-full items-center rounded-lg px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Executive
              </button>
              <button
                type="button"
                disabled={aiRunning}
                onClick={() =>
                  handleAiAction(
                    'Rewrite in a warm, approachable Casual tone',
                    'Casual',
                  )
                }
                className="flex w-full items-center rounded-lg px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Casual & Friendly
              </button>
              <button
                type="button"
                disabled={aiRunning}
                onClick={() =>
                  handleAiAction(
                    'Rewrite in an understated, bespoke Luxury editorial tone',
                    'Luxury',
                  )
                }
                className="flex w-full items-center rounded-lg px-2 py-1 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Luxury & Prestige
              </button>
            </div>
          )}
        </div>

        {/* Image Slot Quick Action: 'Replace Image' */}
        <div className="flex items-center px-1 border-r border-zinc-700/60">
          <button
            type="button"
            onClick={() => setMediaLibraryOpen(true)}
            title="Replace Image (Open Media Library)"
            className="flex h-7 items-center gap-1.5 rounded-lg px-2 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ImageIcon className="h-3.5 w-3.5 text-zinc-400" />
            <span>Replace Image</span>
          </button>
        </div>

        {/* Section Actions: Duplicate, Delete */}
        <div className="flex items-center gap-0.5 pl-0.5">
          {onDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              title="Duplicate Section"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onDelete}
            title="Delete Section"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Media Library Modal */}
      <MediaLibraryModal
        open={mediaLibraryOpen}
        onClose={() => setMediaLibraryOpen(false)}
        onSelect={handleApplyImage}
        currentUrl={section.props?.image as string | undefined}
      />
    </>
  );
}
