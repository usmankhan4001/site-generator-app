'use client';

import { useState, useMemo } from 'react';
import {
  Check,
  RotateCcw,
  Store,
  Briefcase,
  Layers,
  Type,
  Palette,
  Sparkles,
  Sun,
  Moon,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useStudio } from '@/store/studio';
import {
  THEMES_LIST,
  getTheme,
  ALL_SURFACE_STYLES,
  getSurfaceStyleMeta,
  getTypographyCategoryLabel,
  resolveSurfaceStyleProps,
  INDUSTRY_TABS,
  type SurfaceStyle,
  type IndustryCategory,
  type SiteTheme,
} from '@/site/themes';
import { LAYOUT_SYSTEMS, resolveLayoutSystem } from '@/site/layoutSystems';
import { cn } from '@/lib/utils';
import { PanelHeader, SectionLabel, FieldShell } from './fields';
import { Input } from '@/components/ui/input';

const ACCENT_PRESETS = [
  '#6366f1',
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#8b5cf6',
  '#14b8a6',
];

export function DesignPanel() {
  const content = useStudio((s) => s.content);
  const setTheme = useStudio((s) => s.setTheme);
  const setAccent = useStudio((s) => s.setAccent);
  const setSurfaceStyle = useStudio((s) => s.setSurfaceStyle);
  const setMode = useStudio((s) => s.setMode);
  const setLayoutSystem = useStudio((s) => s.setLayoutSystem);

  const [accentDraft, setAccentDraft] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toneFilter, setToneFilter] = useState<'all' | 'light' | 'dark'>('all');

  if (!content) return null;

  const activeTheme = getTheme(content.themeId);
  const effectiveSurface = content.surfaceStyle ?? activeTheme.surfaceStyle;
  const accentValue = accentDraft ?? content.accent ?? '';

  const commitAccent = () => {
    setAccent(accentDraft?.trim() || undefined);
    setAccentDraft(null);
  };

  // Filtered themes based on Industry tab, search term, and tone filter
  const filteredThemes = useMemo(() => {
    return THEMES_LIST.filter((t) => {
      // Industry filter
      if (selectedIndustry !== 'All' && t.industryCategory !== selectedIndustry) {
        return false;
      }
      // Tone (light/dark) filter
      if (toneFilter === 'light' && t.isDark) return false;
      if (toneFilter === 'dark' && !t.isDark) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesIndustry = t.industry.toLowerCase().includes(q);
        const matchesSurface = t.surfaceStyle.toLowerCase().includes(q);
        const matchesFont = t.googleFonts.some((f) => f.toLowerCase().includes(q));
        if (!matchesName && !matchesIndustry && !matchesSurface && !matchesFont) {
          return false;
        }
      }
      return true;
    });
  }, [selectedIndustry, toneFilter, searchQuery]);

  return (
    <div className="space-y-7 p-4">
      <PanelHeader
        title="Theme Studio & Surface Engine"
        hint="Live theme morphing, surface styles, typography pairings & brand accents."
      />

      {/* --- Site Mode --- */}
      <div className="space-y-3">
        <SectionLabel>Site Mode</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          <ModeButton
            active={content.mode === 'services'}
            icon={Briefcase}
            label="Services"
            hint="Offerings + consultation flow"
            onClick={() => setMode('services')}
          />
          <ModeButton
            active={content.mode === 'ecommerce'}
            icon={Store}
            label="Store"
            hint="Catalogue + product cards"
            onClick={() => setMode('ecommerce')}
          />
        </div>
      </div>

      {/* --- Active Typography & Font Pairing Preview --- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Typography & Pairing Preview</SectionLabel>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
            <Type className="h-3 w-3" />
            {getTypographyCategoryLabel(activeTheme.typographyPairing.category)}
          </span>
        </div>
        <div className="rounded-2xl border border-border bg-card p-3.5 shadow-xs space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            {/* Display Font Card */}
            <div className="rounded-xl border border-border/70 bg-muted/40 p-3 text-left">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Display Headline
              </span>
              <p
                className="my-1 text-2xl font-bold leading-none tracking-tight text-foreground"
                style={{ fontFamily: activeTheme.fontDisplay }}
              >
                Aa
              </p>
              <p
                className="truncate text-xs font-semibold text-foreground"
                style={{ fontFamily: activeTheme.fontDisplay }}
              >
                {activeTheme.typographyPairing.display}
              </p>
              <p className="text-[10px] text-muted-foreground">Titles & Section Headers</p>
            </div>

            {/* Sans Body Font Card */}
            <div className="rounded-xl border border-border/70 bg-muted/40 p-3 text-left">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Body & Interface
              </span>
              <p
                className="my-1 text-2xl font-medium leading-none text-foreground"
                style={{ fontFamily: activeTheme.fontSans }}
              >
                Ag
              </p>
              <p
                className="truncate text-xs font-semibold text-foreground"
                style={{ fontFamily: activeTheme.fontSans }}
              >
                {activeTheme.typographyPairing.sans}
              </p>
              <p className="text-[10px] text-muted-foreground">Descriptions & UI Elements</p>
            </div>
          </div>

          {/* Micro specimen sample */}
          <div className="rounded-xl border border-border/50 bg-background/60 p-2.5">
            <p
              className="text-xs font-bold leading-tight text-foreground"
              style={{ fontFamily: activeTheme.fontDisplay }}
            >
              The Next Era of Intelligent Architecture
            </p>
            <p
              className="mt-1 text-[11px] leading-relaxed text-muted-foreground"
              style={{ fontFamily: activeTheme.fontSans }}
            >
              Engineered with precision for global speed, compliance, and effortless scalability.
            </p>
          </div>

          {/* Loaded Google Fonts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="text-[10px] text-muted-foreground">Google Fonts:</span>
            {activeTheme.googleFonts.map((font) => (
              <span
                key={font}
                className="inline-flex items-center rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-foreground"
              >
                {font}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- Surface Style Selector --- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Card Surface Engine</SectionLabel>
          {content.surfaceStyle ? (
            <button
              type="button"
              onClick={() => setSurfaceStyle(undefined)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline"
              title="Revert surface treatment to theme default"
            >
              <RotateCcw className="h-3 w-3" />
              Reset to Theme Default
            </button>
          ) : (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Theme Default: {activeTheme.surfaceStyle}
            </span>
          )}
        </div>

        <FieldShell hint="Sets the physical material treatment for cards, mod panels, and elevated containers across the site.">
          <div className="grid grid-cols-1 gap-2">
            {ALL_SURFACE_STYLES.map((styleKey) => {
              const meta = getSurfaceStyleMeta(styleKey);
              const isActive = effectiveSurface === styleKey;
              const isOverridden = content.surfaceStyle === styleKey;
              const isDefaultTheme = !content.surfaceStyle && activeTheme.surfaceStyle === styleKey;

              return (
                <button
                  key={styleKey}
                  type="button"
                  onClick={() => setSurfaceStyle(content.surfaceStyle === styleKey ? undefined : styleKey)}
                  className={cn(
                    'group relative flex items-start gap-3 rounded-xl border p-3 text-left transition-all',
                    isActive
                      ? 'border-primary bg-primary/10 ring-1 ring-primary/50 shadow-sm'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30',
                  )}
                >
                  {/* Miniature Surface Swatch Preview */}
                  <div
                    className={cn(
                      'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-[9px] font-bold transition-all',
                      styleKey === 'glassmorphism' &&
                        'bg-white/40 dark:bg-white/10 backdrop-blur-md border-white/60 dark:border-white/20 shadow-md',
                      styleKey === 'crisp-border' &&
                        'border-foreground/30 bg-card shadow-none',
                      styleKey === 'soft-elevated' &&
                        'border-border bg-card shadow-lg shadow-black/10 dark:shadow-black/40',
                      styleKey === 'editorial-luxe' &&
                        'border-amber-900/20 dark:border-amber-100/20 bg-amber-50/50 dark:bg-stone-900 shadow-xs',
                    )}
                  >
                    <Layers className="h-4 w-4 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground">{meta.name}</span>
                      <span className="rounded-full bg-muted px-1.5 py-0.2 text-[9px] font-medium text-muted-foreground">
                        {meta.badge}
                      </span>
                      {isOverridden ? (
                        <span className="ml-auto rounded-full bg-primary/20 px-1.5 py-0.2 text-[9px] font-semibold text-primary">
                          Custom
                        </span>
                      ) : isDefaultTheme ? (
                        <span className="ml-auto rounded-full bg-muted px-1.5 py-0.2 text-[9px] font-medium text-muted-foreground">
                          Theme Native
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                      {meta.description}
                    </p>
                  </div>

                  {isActive ? (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </FieldShell>
      </div>

      {/* --- Accent Color Override --- */}
      <div className="space-y-3">
        <SectionLabel>Brand Accent Colour</SectionLabel>
        <FieldShell hint="Overrides the theme's primary brand color. Applied instantly to buttons, links, and highlights.">
          <div className="flex items-center gap-2">
            <span
              className="h-9 w-9 shrink-0 rounded-lg border border-border shadow-xs"
              style={{ background: accentValue || activeTheme.colors.primary }}
            />
            <Input
              value={accentValue}
              placeholder={activeTheme.colors.primary}
              onChange={(e) => setAccentDraft(e.target.value)}
              onBlur={commitAccent}
              onKeyDown={(e) => e.key === 'Enter' && commitAccent()}
              className="h-9 flex-1 font-mono text-xs"
            />
            {content.accent ? (
              <button
                type="button"
                title="Reset to theme default"
                onClick={() => {
                  setAccentDraft(null);
                  setAccent(undefined);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-4 gap-2 pt-1">
            {ACCENT_PRESETS.map((hex) => {
              const active = accentValue.toLowerCase() === hex.toLowerCase();
              return (
                <button
                  key={hex}
                  type="button"
                  title={hex}
                  aria-label={`Accent ${hex}`}
                  onClick={() => {
                    setAccentDraft(hex);
                    setAccent(hex);
                  }}
                  className={cn(
                    'flex w-full items-center gap-1.5 rounded-lg border p-1.5 text-left transition-colors',
                    active
                      ? 'border-primary bg-primary/10 ring-1 ring-primary/40 shadow-xs'
                      : 'border-border bg-card hover:border-primary/40',
                  )}
                >
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border border-black/10 shadow-xs"
                    style={{ background: hex }}
                  />
                  <span className="min-w-0 truncate font-mono text-[10px] text-foreground">
                    {hex}
                  </span>
                  {active ? <Check className="ml-auto h-2.5 w-2.5 shrink-0 text-primary" /> : null}
                </button>
              );
            })}
          </div>
        </FieldShell>
      </div>

      {/* --- Layout System Presets --- */}
      <div className="space-y-3">
        <SectionLabel>Layout System</SectionLabel>
        <FieldShell hint="Structural composition — headers, card treatment, spacing rhythm. Independent of colour theme.">
          <div className="space-y-2">
            {LAYOUT_SYSTEMS.map((sys) => {
              const active = resolveLayoutSystem(content) === sys.id;
              return (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setLayoutSystem(content.layoutSystem === sys.id ? undefined : sys.id)}
                  className={cn(
                    'flex w-full flex-col items-start gap-0.5 rounded-xl border p-2.5 text-left shadow-xs transition-colors',
                    active
                      ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
                      : 'border-border bg-card hover:border-primary/40',
                  )}
                >
                  <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    {sys.name}
                    {!content.layoutSystem && active ? (
                      <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        default
                      </span>
                    ) : null}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{sys.description}</span>
                </button>
              );
            })}
          </div>
        </FieldShell>
      </div>

      {/* --- Interactive Visual Theme Studio --- */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <SectionLabel>Theme Catalog ({filteredThemes.length} / {THEMES_LIST.length})</SectionLabel>
            <span className="text-[11px] text-muted-foreground">Click to morph canvas</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Explore 20+ fine-tuned OKLCH color spaces with native typography & surface characteristics.
          </p>
        </div>

        {/* Industry Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-border pb-3">
          {INDUSTRY_TABS.map((tab) => {
            const count =
              tab === 'All'
                ? THEMES_LIST.length
                : THEMES_LIST.filter((t) => t.industryCategory === tab).length;
            const isSelected = selectedIndustry === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedIndustry(tab)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <span>{tab}</span>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.2 text-[10px]',
                    isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-background/80 text-muted-foreground',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Tone Filter Row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search theme, font, niche..."
              className="h-8 pl-8 text-xs"
            />
          </div>

          <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
            <button
              type="button"
              onClick={() => setToneFilter('all')}
              className={cn(
                'rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
                toneFilter === 'all'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setToneFilter('light')}
              title="Light themes"
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
                toneFilter === 'light'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Sun className="h-3 w-3" />
              Light
            </button>
            <button
              type="button"
              onClick={() => setToneFilter('dark')}
              title="Dark themes"
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors',
                toneFilter === 'dark'
                  ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Moon className="h-3 w-3" />
              Dark
            </button>
          </div>
        </div>

        {/* Live Miniature Component Cards Grid */}
        <div className="grid grid-cols-1 gap-3">
          {filteredThemes.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
              No themes found matching your filter criteria.
            </div>
          ) : (
            filteredThemes.map((theme) => {
              const isSelected = theme.id === content.themeId;

              return (
                <MiniatureThemeCard
                  key={theme.id}
                  theme={theme}
                  isSelected={isSelected}
                  onSelect={() => setTheme(theme.id)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Live Miniature Component Card
 * ------------------------------------------------------------------------- */

function MiniatureThemeCard({
  theme,
  isSelected,
  onSelect,
}: {
  theme: SiteTheme;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const surfaceMeta = getSurfaceStyleMeta(theme.surfaceStyle);
  const surfaceInlineStyle = resolveSurfaceStyleProps(theme.surfaceStyle, theme.isDark);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        isSelected
          ? 'border-primary ring-2 ring-primary/60 shadow-md'
          : 'border-border hover:border-primary/50 hover:shadow-sm hover:-translate-y-0.5',
      )}
      style={{
        background: theme.preview.bg,
        color: theme.preview.text,
      }}
    >
      {/* Background Subtle Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: theme.preview.gradient }}
      />

      <div className="relative p-3.5 space-y-3">
        {/* Top Header Row: Theme Name, Badges & Selected Checkmark */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="text-sm font-bold tracking-tight"
                style={{ fontFamily: theme.fontDisplay, color: theme.preview.text }}
              >
                {theme.name}
              </span>

              {/* Surface Treatment Badge */}
              <span
                className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                style={{
                  background: theme.preview.badgeBg,
                  color: theme.preview.badgeText,
                  border: `1px solid ${theme.preview.border}`,
                }}
              >
                {surfaceMeta.badge}
              </span>

              {/* Tone Badge */}
              <span
                className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium opacity-80"
                style={{
                  background: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                  color: theme.preview.text,
                }}
              >
                {theme.isDark ? <Moon className="h-2.5 w-2.5" /> : <Sun className="h-2.5 w-2.5" />}
                {theme.isDark ? 'Dark' : 'Light'}
              </span>
            </div>

            <p className="mt-0.5 truncate text-[11px] opacity-75" style={{ color: theme.preview.text }}>
              {theme.industry}
            </p>
          </div>

          {/* Active Status Checkmark Pill */}
          {isSelected ? (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
              <Check className="h-3 w-3" />
            </span>
          ) : (
            <span
              className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/15 opacity-60 group-hover:scale-110 transition-transform"
              style={{ background: theme.preview.accent }}
            />
          )}
        </div>

        {/* Miniature Component Specimen Card (Morphs typography, buttons, and borders) */}
        <div
          className="rounded-xl p-3 space-y-2.5 transition-all"
          style={{
            ...surfaceInlineStyle,
            borderColor: theme.preview.border,
          }}
        >
          {/* Micro Typography Pairing Row */}
          <div className="flex items-center gap-3">
            <span
              className="text-2xl font-bold leading-none shrink-0"
              style={{
                fontFamily: theme.fontDisplay,
                color: theme.preview.accent,
              }}
            >
              Aa
            </span>
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-xs font-bold leading-tight"
                style={{
                  fontFamily: theme.fontDisplay,
                  color: theme.preview.text,
                }}
              >
                High-Performance Infrastructure
              </p>
              <p
                className="mt-0.5 truncate text-[10px] opacity-70"
                style={{
                  fontFamily: theme.fontSans,
                  color: theme.preview.text,
                }}
              >
                {theme.typographyPairing.display} + {theme.typographyPairing.sans}
              </p>
            </div>
          </div>

          {/* Micro Interactive Pill & Badge Row */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            {/* Miniature Rounded Button Pill */}
            <span
              className="inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-semibold shadow-xs"
              style={{
                background: theme.preview.buttonBg,
                color: theme.preview.buttonText,
                borderRadius: theme.radiusButton,
              }}
            >
              Get Started →
            </span>

            {/* Miniature Status Badge */}
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-medium"
              style={{
                background: theme.preview.badgeBg,
                color: theme.preview.badgeText,
                borderRadius: theme.radiusBadge,
                border: `1px solid ${theme.preview.border}`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: theme.preview.accent }}
              />
              {getTypographyCategoryLabel(theme.typographyPairing.category)}
            </span>
          </div>
        </div>

        {/* Color Swatch Stripe */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-1">
            <span
              className="h-3 w-3 rounded-full border border-black/10 shadow-2xs"
              title="Primary Accent"
              style={{ background: theme.preview.accent }}
            />
            <span
              className="h-3 w-3 rounded-full border border-black/10 shadow-2xs"
              title="Surface Card"
              style={{ background: theme.colors.card }}
            />
            <span
              className="h-3 w-3 rounded-full border border-black/10 shadow-2xs"
              title="Background"
              style={{ background: theme.preview.bg }}
            />
          </div>
          <span className="font-mono text-[9px] opacity-60" style={{ color: theme.preview.text }}>
            OKLCH Base
          </span>
        </div>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------------------------
 * Mode Button Component
 * ------------------------------------------------------------------------- */

function ModeButton({
  active,
  icon: Icon,
  label,
  hint,
  onClick,
}: {
  active: boolean;
  icon: typeof Store;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-start gap-1 rounded-xl border p-3 text-left shadow-xs transition-colors',
        active
          ? 'border-primary bg-primary/10 ring-1 ring-primary/40'
          : 'border-border bg-card hover:border-primary/40',
      )}
    >
      <Icon className={cn('h-4 w-4', active ? 'text-primary' : 'text-muted-foreground')} />
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <span className="text-[11px] text-muted-foreground">{hint}</span>
    </button>
  );
}
