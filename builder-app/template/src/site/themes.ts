/**
 * Site Kit — theme registry (single source of truth).
 *
 * One merged registry of 20+ themes (OKLCH). The studio preview applies a theme
 * as a scoped inline style object; the assembler writes the same values into the
 * generated site's `globals.css` `:root` block. The `@theme inline` mapping,
 * `@layer base` rules and `.card-elevated` / `.dot-pill` utilities in that file
 * stay constant — only the `:root` custom-property values change per theme.
 */

import type { CSSProperties } from 'react';

export type SurfaceStyle = 'glassmorphism' | 'crisp-border' | 'soft-elevated' | 'editorial-luxe';

export type TypographyCategory =
  | 'tech-grotesque'
  | 'editorial-serif'
  | 'clean-geometric'
  | 'modern-humanist';

export interface TypographyPairing {
  display: string;
  sans: string;
  category: TypographyCategory;
}

export interface ThemePreview {
  accent: string;
  bg: string;
  text: string;
  border: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  buttonBg: string;
  buttonText: string;
}

export type IndustryCategory =
  | 'Fintech & Enterprise'
  | 'Modern SaaS'
  | 'Luxury & Lifestyle'
  | 'Clean Editorial'
  | 'Vibrant Consumer';

export const INDUSTRY_TABS: readonly (IndustryCategory | 'All')[] = [
  'All',
  'Fintech & Enterprise',
  'Modern SaaS',
  'Luxury & Lifestyle',
  'Clean Editorial',
  'Vibrant Consumer',
] as const;

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
}

export interface SiteTheme {
  id: string;
  name: string;
  /** Dark themes carry `class="dark"` on <html> in the generated site. */
  isDark: boolean;
  /** Free-text label of the niche this palette suits. */
  industry: string;
  /** Primary industry category tab for theme browsing. */
  industryCategory: IndustryCategory;
  /** CSS font stacks. Real webfonts are loaded from `googleFonts`. */
  fontSans: string;
  fontDisplay: string;
  /** Google Fonts family names to load (`next/font` in generated sites). */
  googleFonts: string[];
  radius: string;
  radiusBadge: string;
  radiusButton: string;
  radiusCard: string;
  /** Surface card style treatment. */
  surfaceStyle: SurfaceStyle;
  /** Typography font pairing definition. */
  typographyPairing: TypographyPairing;
  /** Swatch hints and micro-card preview styling. */
  preview: ThemePreview;
  colors: ThemeColors;
}

type RawTheme = {
  id: string;
  name: string;
  isDark: boolean;
  industry: string;
  industryCategory: IndustryCategory;
  surfaceStyle: SurfaceStyle;
  typographyPairing: TypographyPairing;
  fontDisplay: string;
  fontSans: string;
  googleFonts: string[];
  radius: string;
  preview: {
    accent: string;
    bg: string;
    text: string;
    border?: string;
    gradient?: string;
    badgeBg?: string;
    badgeText?: string;
    buttonBg?: string;
    buttonText?: string;
  };
  c: {
    primary: string;
    primaryForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    ring: string;
  };
};

const DESTRUCTIVE = 'oklch(0.577 0.245 27.325)';

/** Expand a compact raw entry: derive popover/secondary/input and preview fallbacks. */
function expand(r: RawTheme): SiteTheme {
  const border = r.preview.border || (r.isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)');
  const gradient = r.preview.gradient || (r.isDark
    ? `linear-gradient(135deg, ${r.c.card} 0%, ${r.c.background} 100%)`
    : `linear-gradient(135deg, #ffffff 0%, ${r.preview.bg} 100%)`);
  const badgeBg = r.preview.badgeBg || (r.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)');
  const badgeText = r.preview.badgeText || r.preview.text;
  const buttonBg = r.preview.buttonBg || r.preview.accent;
  const buttonText = r.preview.buttonText || '#ffffff';

  return {
    id: r.id,
    name: r.name,
    isDark: r.isDark,
    industry: r.industry,
    industryCategory: r.industryCategory,
    fontSans: r.fontSans,
    fontDisplay: r.fontDisplay,
    googleFonts: r.googleFonts,
    radius: r.radius,
    radiusBadge: '9999px',
    radiusButton: `calc(${r.radius} - 0.25rem)`,
    radiusCard: r.radius,
    surfaceStyle: r.surfaceStyle,
    typographyPairing: r.typographyPairing,
    preview: {
      accent: r.preview.accent,
      bg: r.preview.bg,
      text: r.preview.text,
      border,
      gradient,
      badgeBg,
      badgeText,
      buttonBg,
      buttonText,
    },
    colors: {
      primary: r.c.primary,
      primaryForeground: r.c.primaryForeground,
      background: r.c.background,
      foreground: r.c.foreground,
      card: r.c.card,
      cardForeground: r.c.cardForeground,
      popover: r.c.card,
      popoverForeground: r.c.cardForeground,
      secondary: r.c.muted,
      secondaryForeground: r.c.foreground,
      muted: r.c.muted,
      mutedForeground: r.c.mutedForeground,
      accent: r.c.accent,
      accentForeground: r.c.accentForeground,
      destructive: DESTRUCTIVE,
      border: r.c.border,
      input: r.c.border,
      ring: r.c.ring,
    },
  };
}

const SANS_JAKARTA = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const SANS_INTER = "'Inter', ui-sans-serif, system-ui, sans-serif";
const SANS_GROTESK = "'Space Grotesk', ui-sans-serif, system-ui, sans-serif";
const SERIF_EDITORIAL = "'Playfair Display', Georgia, Cambria, 'Times New Roman', serif";

const RAW: RawTheme[] = [
  {
    id: 'indigo-enterprise',
    name: 'Indigo Enterprise',
    isDark: false,
    industry: 'Software / Cloud / DevOps',
    industryCategory: 'Fintech & Enterprise',
    surfaceStyle: 'crisp-border',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Plus Jakarta Sans', category: 'clean-geometric' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_JAKARTA,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#6366f1',
      bg: '#f8fafc',
      text: '#0f172a',
      border: '#e2e8f0',
      gradient: 'linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)',
      badgeBg: '#e0e7ff',
      badgeText: '#3730a3',
      buttonBg: '#6366f1',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.48 0.24 275)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.99 0.003 260)',
      foreground: 'oklch(0.14 0.03 260)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.14 0.03 260)',
      muted: 'oklch(0.96 0.008 260)',
      mutedForeground: 'oklch(0.50 0.02 260)',
      accent: 'oklch(0.95 0.025 275)',
      accentForeground: 'oklch(0.35 0.15 275)',
      border: 'oklch(0.92 0.008 260)',
      ring: 'oklch(0.48 0.24 275)',
    },
  },
  {
    id: 'midnight-obsidian',
    name: 'Midnight Obsidian',
    isDark: true,
    industry: 'Applied AI / Machine Learning / Deep Tech',
    industryCategory: 'Modern SaaS',
    surfaceStyle: 'glassmorphism',
    typographyPairing: { display: 'Space Grotesk', sans: 'Inter', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_INTER,
    googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem',
    preview: {
      accent: '#a855f7',
      bg: '#090d16',
      text: '#f8fafc',
      border: 'rgba(255, 255, 255, 0.12)',
      gradient: 'linear-gradient(135deg, #1e1136 0%, #090d16 100%)',
      badgeBg: 'rgba(168, 85, 247, 0.18)',
      badgeText: '#d8b4fe',
      buttonBg: '#a855f7',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.72 0.20 285)',
      primaryForeground: 'oklch(0.11 0.015 260)',
      background: 'oklch(0.11 0.015 260)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.16 0.02 260)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.20 0.02 260)',
      mutedForeground: 'oklch(0.68 0.015 260)',
      accent: 'oklch(0.24 0.03 285)',
      accentForeground: 'oklch(0.92 0.03 285)',
      border: 'oklch(0.24 0.02 260)',
      ring: 'oklch(0.72 0.20 285)',
    },
  },
  {
    id: 'emerald-precision',
    name: 'Emerald Precision',
    isDark: false,
    industry: 'Fintech / Payment Systems / Security',
    industryCategory: 'Fintech & Enterprise',
    surfaceStyle: 'crisp-border',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Inter', category: 'clean-geometric' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_JAKARTA,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#10b981',
      bg: '#f7fee7',
      text: '#064e3b',
      border: '#d1fae5',
      gradient: 'linear-gradient(135deg, #ecfdf5 0%, #f7fee7 100%)',
      badgeBg: '#d1fae5',
      badgeText: '#065f46',
      buttonBg: '#10b981',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.52 0.17 155)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.99 0.003 160)',
      foreground: 'oklch(0.14 0.03 160)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.14 0.03 160)',
      muted: 'oklch(0.96 0.008 160)',
      mutedForeground: 'oklch(0.48 0.03 160)',
      accent: 'oklch(0.94 0.03 155)',
      accentForeground: 'oklch(0.35 0.12 155)',
      border: 'oklch(0.91 0.01 160)',
      ring: 'oklch(0.52 0.17 155)',
    },
  },
  {
    id: 'carbon-defense',
    name: 'Carbon Defense',
    isDark: true,
    industry: 'Cybersecurity / IoT / Server Infra',
    industryCategory: 'Modern SaaS',
    surfaceStyle: 'crisp-border',
    typographyPairing: { display: 'Space Grotesk', sans: 'Space Grotesk', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_GROTESK,
    googleFonts: ['Space Grotesk', 'Inter'],
    radius: '0.625rem',
    preview: {
      accent: '#06b6d4',
      bg: '#090d16',
      text: '#ecfeff',
      border: 'rgba(6, 182, 212, 0.25)',
      gradient: 'linear-gradient(135deg, #082f49 0%, #090d16 100%)',
      badgeBg: 'rgba(6, 182, 212, 0.15)',
      badgeText: '#67e8f9',
      buttonBg: '#06b6d4',
      buttonText: '#082f49',
    },
    c: {
      primary: 'oklch(0.72 0.16 205)',
      primaryForeground: 'oklch(0.10 0.02 240)',
      background: 'oklch(0.10 0.02 240)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.15 0.025 240)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.19 0.025 240)',
      mutedForeground: 'oklch(0.65 0.02 240)',
      accent: 'oklch(0.22 0.04 205)',
      accentForeground: 'oklch(0.90 0.06 205)',
      border: 'oklch(0.24 0.025 240)',
      ring: 'oklch(0.72 0.16 205)',
    },
  },
  {
    id: 'monochrome-atelier',
    name: 'Monochrome Atelier',
    isDark: false,
    industry: 'Luxury Fashion / High-End Retail',
    industryCategory: 'Luxury & Lifestyle',
    surfaceStyle: 'editorial-luxe',
    typographyPairing: { display: 'Playfair Display', sans: 'Inter', category: 'editorial-serif' },
    fontDisplay: SERIF_EDITORIAL,
    fontSans: SANS_INTER,
    googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.5rem',
    preview: {
      accent: '#18181b',
      bg: '#fafafa',
      text: '#18181b',
      border: '#e4e4e7',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%)',
      badgeBg: '#f4f4f5',
      badgeText: '#18181b',
      buttonBg: '#18181b',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.15 0.005 60)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.004 70)',
      foreground: 'oklch(0.15 0.005 60)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.005 60)',
      muted: 'oklch(0.95 0.005 70)',
      mutedForeground: 'oklch(0.48 0.005 60)',
      accent: 'oklch(0.93 0.008 70)',
      accentForeground: 'oklch(0.15 0.005 60)',
      border: 'oklch(0.90 0.005 70)',
      ring: 'oklch(0.35 0.005 60)',
    },
  },
  {
    id: 'cyber-slate-volt',
    name: 'Cyber Slate & Volt',
    isDark: true,
    industry: 'Smart Tech / Precision Electronics',
    industryCategory: 'Vibrant Consumer',
    surfaceStyle: 'glassmorphism',
    typographyPairing: { display: 'Space Grotesk', sans: 'Inter', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_INTER,
    googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem',
    preview: {
      accent: '#84cc16',
      bg: '#0f172a',
      text: '#f8fafc',
      border: 'rgba(132, 204, 22, 0.3)',
      gradient: 'linear-gradient(135deg, #142814 0%, #0f172a 100%)',
      badgeBg: 'rgba(132, 204, 22, 0.2)',
      badgeText: '#bef264',
      buttonBg: '#84cc16',
      buttonText: '#0f172a',
    },
    c: {
      primary: 'oklch(0.82 0.22 130)',
      primaryForeground: 'oklch(0.10 0.02 240)',
      background: 'oklch(0.13 0.02 250)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.18 0.025 250)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.22 0.025 250)',
      mutedForeground: 'oklch(0.68 0.02 250)',
      accent: 'oklch(0.24 0.05 130)',
      accentForeground: 'oklch(0.88 0.14 130)',
      border: 'oklch(0.26 0.025 250)',
      ring: 'oklch(0.82 0.22 130)',
    },
  },
  {
    id: 'nordic-sage',
    name: 'Nordic Sage & Oat',
    isDark: false,
    industry: 'Clean Skincare / Botanical Wellness',
    industryCategory: 'Clean Editorial',
    surfaceStyle: 'editorial-luxe',
    typographyPairing: { display: 'Playfair Display', sans: 'Inter', category: 'editorial-serif' },
    fontDisplay: SERIF_EDITORIAL,
    fontSans: SANS_INTER,
    googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.875rem',
    preview: {
      accent: '#4d7c0f',
      bg: '#f7fee7',
      text: '#14532d',
      border: '#d9f99d',
      gradient: 'linear-gradient(135deg, #f0fdf4 0%, #f7fee7 100%)',
      badgeBg: '#ecfccb',
      badgeText: '#365314',
      buttonBg: '#4d7c0f',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.42 0.08 150)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.008 90)',
      foreground: 'oklch(0.20 0.03 150)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.20 0.03 150)',
      muted: 'oklch(0.95 0.012 90)',
      mutedForeground: 'oklch(0.48 0.03 150)',
      accent: 'oklch(0.93 0.025 150)',
      accentForeground: 'oklch(0.32 0.06 150)',
      border: 'oklch(0.90 0.012 90)',
      ring: 'oklch(0.42 0.08 150)',
    },
  },
  {
    id: 'terracotta-living',
    name: 'Terracotta & Warm Oak',
    isDark: false,
    industry: 'Scandinavian Living / Furniture',
    industryCategory: 'Luxury & Lifestyle',
    surfaceStyle: 'soft-elevated',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Plus Jakarta Sans', category: 'modern-humanist' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_JAKARTA,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#ea580c',
      bg: '#fff7ed',
      text: '#431407',
      border: '#fed7aa',
      gradient: 'linear-gradient(135deg, #ffedd5 0%, #fff7ed 100%)',
      badgeBg: '#ffedd5',
      badgeText: '#9a3412',
      buttonBg: '#ea580c',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.55 0.18 45)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.006 60)',
      foreground: 'oklch(0.18 0.02 50)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.18 0.02 50)',
      muted: 'oklch(0.95 0.01 60)',
      mutedForeground: 'oklch(0.48 0.02 50)',
      accent: 'oklch(0.94 0.03 45)',
      accentForeground: 'oklch(0.40 0.14 45)',
      border: 'oklch(0.91 0.01 60)',
      ring: 'oklch(0.55 0.18 45)',
    },
  },
  {
    id: 'electric-teal',
    name: 'Electric Teal & Slate',
    isDark: false,
    industry: 'SaaS Velocity / Full-Stack Studio',
    industryCategory: 'Modern SaaS',
    surfaceStyle: 'soft-elevated',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Inter', category: 'clean-geometric' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_JAKARTA,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#0d9488',
      bg: '#f0fdfa',
      text: '#134e4a',
      border: '#99f6e4',
      gradient: 'linear-gradient(135deg, #ccfbf1 0%, #f0fdfa 100%)',
      badgeBg: '#ccfbf1',
      badgeText: '#115e59',
      buttonBg: '#0d9488',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.55 0.16 190)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.005 190)',
      foreground: 'oklch(0.14 0.03 200)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.14 0.03 200)',
      muted: 'oklch(0.95 0.01 190)',
      mutedForeground: 'oklch(0.48 0.02 200)',
      accent: 'oklch(0.94 0.03 190)',
      accentForeground: 'oklch(0.35 0.12 190)',
      border: 'oklch(0.91 0.01 190)',
      ring: 'oklch(0.55 0.16 190)',
    },
  },
  {
    id: 'crimson-velocity',
    name: 'Crimson Velocity',
    isDark: true,
    industry: 'Athletics / High-Performance Gear',
    industryCategory: 'Vibrant Consumer',
    surfaceStyle: 'crisp-border',
    typographyPairing: { display: 'Space Grotesk', sans: 'Inter', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_INTER,
    googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.625rem',
    preview: {
      accent: '#ef4444',
      bg: '#1c0a0a',
      text: '#fee2e2',
      border: 'rgba(239, 68, 68, 0.35)',
      gradient: 'linear-gradient(135deg, #450a0a 0%, #1c0a0a 100%)',
      badgeBg: 'rgba(239, 68, 68, 0.2)',
      badgeText: '#fca5a5',
      buttonBg: '#ef4444',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.58 0.23 15)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.10 0.015 15)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.16 0.02 15)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.20 0.02 15)',
      mutedForeground: 'oklch(0.68 0.015 15)',
      accent: 'oklch(0.24 0.06 15)',
      accentForeground: 'oklch(0.90 0.10 15)',
      border: 'oklch(0.24 0.02 15)',
      ring: 'oklch(0.58 0.23 15)',
    },
  },
  {
    id: 'espresso-amber',
    name: 'Rich Espresso & Cream',
    isDark: false,
    industry: 'Artisan Coffee / Specialty Foods',
    industryCategory: 'Clean Editorial',
    surfaceStyle: 'editorial-luxe',
    typographyPairing: { display: 'Playfair Display', sans: 'Inter', category: 'editorial-serif' },
    fontDisplay: SERIF_EDITORIAL,
    fontSans: SANS_INTER,
    googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#78350f',
      bg: '#fefce8',
      text: '#451a03',
      border: '#fde68a',
      gradient: 'linear-gradient(135deg, #fef9c3 0%, #fefce8 100%)',
      badgeBg: '#fef08a',
      badgeText: '#713f12',
      buttonBg: '#78350f',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.38 0.09 50)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.008 80)',
      foreground: 'oklch(0.22 0.04 50)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.22 0.04 50)',
      muted: 'oklch(0.95 0.012 80)',
      mutedForeground: 'oklch(0.50 0.03 50)',
      accent: 'oklch(0.90 0.05 70)',
      accentForeground: 'oklch(0.30 0.08 50)',
      border: 'oklch(0.91 0.012 80)',
      ring: 'oklch(0.38 0.09 50)',
    },
  },
  {
    id: 'hyper-speed-ultramarine',
    name: 'Hyper-Speed Ultramarine',
    isDark: true,
    industry: 'NVMe Cloud VPS / Compute Infra',
    industryCategory: 'Modern SaaS',
    surfaceStyle: 'glassmorphism',
    typographyPairing: { display: 'Space Grotesk', sans: 'Space Grotesk', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_GROTESK,
    googleFonts: ['Space Grotesk', 'Inter'],
    radius: '0.625rem',
    preview: {
      accent: '#3b82f6',
      bg: '#090d16',
      text: '#eff6ff',
      border: 'rgba(59, 130, 246, 0.25)',
      gradient: 'linear-gradient(135deg, #172554 0%, #090d16 100%)',
      badgeBg: 'rgba(59, 130, 246, 0.2)',
      badgeText: '#93c5fd',
      buttonBg: '#3b82f6',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.62 0.22 255)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.09 0.02 260)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.14 0.025 260)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.18 0.025 260)',
      mutedForeground: 'oklch(0.65 0.02 260)',
      accent: 'oklch(0.22 0.05 255)',
      accentForeground: 'oklch(0.88 0.10 255)',
      border: 'oklch(0.22 0.025 260)',
      ring: 'oklch(0.62 0.22 255)',
    },
  },
  {
    id: 'enterprise-cyan',
    name: 'Enterprise Cyan & White',
    isDark: false,
    industry: 'Managed Web Infra / Global Edge CDN',
    industryCategory: 'Fintech & Enterprise',
    surfaceStyle: 'soft-elevated',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Plus Jakarta Sans', category: 'clean-geometric' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_JAKARTA,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#0284c7',
      bg: '#f0f9ff',
      text: '#0c4a6e',
      border: '#bae6fd',
      gradient: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
      badgeBg: '#e0f2fe',
      badgeText: '#0369a1',
      buttonBg: '#0284c7',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.48 0.15 220)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.004 220)',
      foreground: 'oklch(0.14 0.03 230)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.14 0.03 230)',
      muted: 'oklch(0.95 0.008 220)',
      mutedForeground: 'oklch(0.48 0.02 230)',
      accent: 'oklch(0.93 0.03 220)',
      accentForeground: 'oklch(0.32 0.12 220)',
      border: 'oklch(0.91 0.008 220)',
      ring: 'oklch(0.48 0.15 220)',
    },
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Amber & Bronze',
    isDark: false,
    industry: 'Executive Advisory / Wealth Management',
    industryCategory: 'Fintech & Enterprise',
    surfaceStyle: 'soft-elevated',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Inter', category: 'modern-humanist' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_JAKARTA,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#d97706',
      bg: '#fffbeb',
      text: '#451a03',
      border: '#fde68a',
      gradient: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
      badgeBg: '#fef3c7',
      badgeText: '#b45309',
      buttonBg: '#d97706',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.58 0.19 65)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.006 75)',
      foreground: 'oklch(0.16 0.03 65)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.16 0.03 65)',
      muted: 'oklch(0.95 0.01 75)',
      mutedForeground: 'oklch(0.48 0.02 65)',
      accent: 'oklch(0.94 0.03 65)',
      accentForeground: 'oklch(0.38 0.14 65)',
      border: 'oklch(0.91 0.01 75)',
      ring: 'oklch(0.58 0.19 65)',
    },
  },
  {
    id: 'amethyst-violet',
    name: 'Amethyst Cosmic Dark',
    isDark: true,
    industry: 'Web3 / NextGen Protocol / Gaming',
    industryCategory: 'Vibrant Consumer',
    surfaceStyle: 'glassmorphism',
    typographyPairing: { display: 'Space Grotesk', sans: 'Inter', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_INTER,
    googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem',
    preview: {
      accent: '#c084fc',
      bg: '#130e24',
      text: '#faf5ff',
      border: 'rgba(192, 132, 252, 0.25)',
      gradient: 'linear-gradient(135deg, #2e1065 0%, #130e24 100%)',
      badgeBg: 'rgba(192, 132, 252, 0.2)',
      badgeText: '#e9d5ff',
      buttonBg: '#c084fc',
      buttonText: '#1e1b4b',
    },
    c: {
      primary: 'oklch(0.70 0.22 300)',
      primaryForeground: 'oklch(0.10 0.02 280)',
      background: 'oklch(0.11 0.025 295)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.16 0.03 295)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.20 0.03 295)',
      mutedForeground: 'oklch(0.68 0.02 295)',
      accent: 'oklch(0.24 0.05 300)',
      accentForeground: 'oklch(0.88 0.12 300)',
      border: 'oklch(0.25 0.03 295)',
      ring: 'oklch(0.70 0.22 300)',
    },
  },
  {
    id: 'neo-grotesque-zinc',
    name: 'Neo-Grotesque Zinc',
    isDark: false,
    industry: 'Minimalist Engineering / Developer Tools',
    industryCategory: 'Clean Editorial',
    surfaceStyle: 'crisp-border',
    typographyPairing: { display: 'Space Grotesk', sans: 'Space Grotesk', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_GROTESK,
    googleFonts: ['Space Grotesk', 'Inter'],
    radius: '0.5rem',
    preview: {
      accent: '#52525b',
      bg: '#f4f4f5',
      text: '#18181b',
      border: '#d4d4d8',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%)',
      badgeBg: '#e4e4e7',
      badgeText: '#27272a',
      buttonBg: '#27272a',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.25 0.01 260)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.98 0.002 260)',
      foreground: 'oklch(0.15 0.01 260)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.01 260)',
      muted: 'oklch(0.94 0.005 260)',
      mutedForeground: 'oklch(0.48 0.01 260)',
      accent: 'oklch(0.92 0.008 260)',
      accentForeground: 'oklch(0.20 0.01 260)',
      border: 'oklch(0.89 0.005 260)',
      ring: 'oklch(0.40 0.01 260)',
    },
  },
  {
    id: 'rose-gold-luxury',
    name: 'Rose Gold & Silk',
    isDark: false,
    industry: 'Fine Jewelry / Luxury Cosmetics',
    industryCategory: 'Luxury & Lifestyle',
    surfaceStyle: 'editorial-luxe',
    typographyPairing: { display: 'Playfair Display', sans: 'Inter', category: 'editorial-serif' },
    fontDisplay: SERIF_EDITORIAL,
    fontSans: SANS_INTER,
    googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.875rem',
    preview: {
      accent: '#f43f5e',
      bg: '#fff1f2',
      text: '#4c0519',
      border: '#fecdd3',
      gradient: 'linear-gradient(135deg, #ffe4e6 0%, #fff1f2 100%)',
      badgeBg: '#ffe4e6',
      badgeText: '#be123c',
      buttonBg: '#f43f5e',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.55 0.17 10)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.006 15)',
      foreground: 'oklch(0.18 0.03 10)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.18 0.03 10)',
      muted: 'oklch(0.95 0.01 15)',
      mutedForeground: 'oklch(0.48 0.02 10)',
      accent: 'oklch(0.94 0.03 10)',
      accentForeground: 'oklch(0.40 0.14 10)',
      border: 'oklch(0.91 0.01 15)',
      ring: 'oklch(0.55 0.17 10)',
    },
  },
  {
    id: 'deep-ocean-blue',
    name: 'Deep Ocean Navy',
    isDark: true,
    industry: 'Enterprise Maritime / Logistics & Fleet',
    industryCategory: 'Fintech & Enterprise',
    surfaceStyle: 'crisp-border',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Plus Jakarta Sans', category: 'clean-geometric' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_JAKARTA,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#0ea5e9',
      bg: '#081326',
      text: '#f0f9ff',
      border: 'rgba(14, 165, 233, 0.25)',
      gradient: 'linear-gradient(135deg, #0c254d 0%, #081326 100%)',
      badgeBg: 'rgba(14, 165, 233, 0.18)',
      badgeText: '#7dd3fc',
      buttonBg: '#0ea5e9',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.60 0.18 230)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.10 0.02 245)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.15 0.025 245)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.19 0.025 245)',
      mutedForeground: 'oklch(0.65 0.02 245)',
      accent: 'oklch(0.22 0.05 230)',
      accentForeground: 'oklch(0.88 0.10 230)',
      border: 'oklch(0.24 0.025 245)',
      ring: 'oklch(0.60 0.18 230)',
    },
  },
  {
    id: 'aurora-emerald',
    name: 'Aurora Emerald & Pine',
    isDark: true,
    industry: 'Clean Energy / Carbon Intelligence',
    industryCategory: 'Modern SaaS',
    surfaceStyle: 'glassmorphism',
    typographyPairing: { display: 'Space Grotesk', sans: 'Inter', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_INTER,
    googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem',
    preview: {
      accent: '#34d399',
      bg: '#051c14',
      text: '#ecfdf5',
      border: 'rgba(52, 211, 153, 0.25)',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #051c14 100%)',
      badgeBg: 'rgba(52, 211, 153, 0.2)',
      badgeText: '#a7f3d0',
      buttonBg: '#34d399',
      buttonText: '#064e3b',
    },
    c: {
      primary: 'oklch(0.75 0.18 160)',
      primaryForeground: 'oklch(0.10 0.03 160)',
      background: 'oklch(0.10 0.025 165)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.15 0.03 165)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.19 0.03 165)',
      mutedForeground: 'oklch(0.65 0.02 165)',
      accent: 'oklch(0.22 0.05 160)',
      accentForeground: 'oklch(0.88 0.12 160)',
      border: 'oklch(0.24 0.03 165)',
      ring: 'oklch(0.75 0.18 160)',
    },
  },
  {
    id: 'blueprint-navy',
    name: 'Blueprint Navy',
    isDark: false,
    industry: 'Ergonomic Workspace / Modern Office Systems',
    industryCategory: 'Fintech & Enterprise',
    surfaceStyle: 'soft-elevated',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Inter', category: 'modern-humanist' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_INTER,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#1d4ed8',
      bg: '#f8fafc',
      text: '#0f172a',
      border: '#cbd5e1',
      gradient: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
      badgeBg: '#dbeafe',
      badgeText: '#1e40af',
      buttonBg: '#1d4ed8',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.38 0.18 255)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.988 0.003 250)',
      foreground: 'oklch(0.14 0.03 255)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.14 0.03 255)',
      muted: 'oklch(0.955 0.008 250)',
      mutedForeground: 'oklch(0.48 0.02 255)',
      accent: 'oklch(0.93 0.03 240)',
      accentForeground: 'oklch(0.28 0.14 255)',
      border: 'oklch(0.90 0.008 250)',
      ring: 'oklch(0.38 0.18 255)',
    },
  },
  {
    id: 'titanium-gray',
    name: 'Titanium Precision',
    isDark: false,
    industry: 'Precision Engineering / Industrial',
    industryCategory: 'Fintech & Enterprise',
    surfaceStyle: 'crisp-border',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Plus Jakarta Sans', category: 'clean-geometric' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_JAKARTA,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.625rem',
    preview: {
      accent: '#475569',
      bg: '#f8fafc',
      text: '#0f172a',
      border: '#cbd5e1',
      gradient: 'linear-gradient(135deg, #f1f5f9 0%, #f8fafc 100%)',
      badgeBg: '#e2e8f0',
      badgeText: '#334155',
      buttonBg: '#475569',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.38 0.03 260)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.003 260)',
      foreground: 'oklch(0.15 0.02 260)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.02 260)',
      muted: 'oklch(0.95 0.006 260)',
      mutedForeground: 'oklch(0.48 0.015 260)',
      accent: 'oklch(0.92 0.01 260)',
      accentForeground: 'oklch(0.25 0.02 260)',
      border: 'oklch(0.90 0.006 260)',
      ring: 'oklch(0.38 0.03 260)',
    },
  },
  {
    id: 'boutique-oat',
    name: 'Boutique & Oat',
    isDark: false,
    industry: 'Contemporary Fashion / Relaxed Tailoring Retail',
    industryCategory: 'Luxury & Lifestyle',
    surfaceStyle: 'editorial-luxe',
    typographyPairing: { display: 'Playfair Display', sans: 'Inter', category: 'editorial-serif' },
    fontDisplay: SERIF_EDITORIAL,
    fontSans: SANS_INTER,
    googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.75rem',
    preview: {
      accent: '#b45309',
      bg: '#faf6ef',
      text: '#292019',
      border: '#e7d9c6',
      gradient: 'linear-gradient(135deg, #f5ede1 0%, #faf6ef 100%)',
      badgeBg: '#f3e8d7',
      badgeText: '#78350f',
      buttonBg: '#b45309',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.52 0.13 45)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.005 80)',
      foreground: 'oklch(0.19 0.02 60)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.19 0.02 60)',
      muted: 'oklch(0.95 0.01 80)',
      mutedForeground: 'oklch(0.50 0.02 55)',
      accent: 'oklch(0.93 0.03 70)',
      accentForeground: 'oklch(0.38 0.11 45)',
      border: 'oklch(0.90 0.012 80)',
      ring: 'oklch(0.52 0.13 45)',
    },
  },
  {
    id: 'backcountry-olive',
    name: 'Backcountry Olive',
    isDark: true,
    industry: 'Outdoor / Trail & Alpine Equipment',
    industryCategory: 'Vibrant Consumer',
    surfaceStyle: 'soft-elevated',
    typographyPairing: { display: 'Space Grotesk', sans: 'Inter', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_INTER,
    googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.625rem',
    preview: {
      accent: '#a3e635',
      bg: '#12170e',
      text: '#f7fee7',
      border: 'rgba(163, 230, 53, 0.25)',
      gradient: 'linear-gradient(135deg, #1e2815 0%, #12170e 100%)',
      badgeBg: 'rgba(163, 230, 53, 0.2)',
      badgeText: '#d9f99d',
      buttonBg: '#a3e635',
      buttonText: '#1a2e05',
    },
    c: {
      primary: 'oklch(0.82 0.19 120)',
      primaryForeground: 'oklch(0.11 0.03 130)',
      background: 'oklch(0.13 0.02 130)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.18 0.025 130)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.22 0.025 130)',
      mutedForeground: 'oklch(0.68 0.02 130)',
      accent: 'oklch(0.23 0.05 120)',
      accentForeground: 'oklch(0.88 0.12 120)',
      border: 'oklch(0.26 0.025 130)',
      ring: 'oklch(0.82 0.19 120)',
    },
  },
  {
    id: 'midnight-audio',
    name: 'Midnight Audio & Brass',
    isDark: true,
    industry: 'Audiophile Electronics / Hi-Fi Retail',
    industryCategory: 'Luxury & Lifestyle',
    surfaceStyle: 'glassmorphism',
    typographyPairing: { display: 'Space Grotesk', sans: 'Inter', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_INTER,
    googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem',
    preview: {
      accent: '#d4a24e',
      bg: '#0c0a09',
      text: '#fafaf9',
      border: 'rgba(212, 162, 78, 0.25)',
      gradient: 'linear-gradient(135deg, #261f18 0%, #0c0a09 100%)',
      badgeBg: 'rgba(212, 162, 78, 0.2)',
      badgeText: '#fde68a',
      buttonBg: '#d4a24e',
      buttonText: '#1c1917',
    },
    c: {
      primary: 'oklch(0.78 0.11 80)',
      primaryForeground: 'oklch(0.10 0.02 60)',
      background: 'oklch(0.12 0.01 60)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.17 0.015 60)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.21 0.015 60)',
      mutedForeground: 'oklch(0.66 0.015 60)',
      accent: 'oklch(0.24 0.03 70)',
      accentForeground: 'oklch(0.88 0.10 80)',
      border: 'oklch(0.24 0.015 60)',
      ring: 'oklch(0.78 0.11 80)',
    },
  },
  {
    id: 'noir-ivory',
    name: 'Noir & Ivory',
    isDark: true,
    industry: 'Haute Horlogerie / Luxury Timepieces',
    industryCategory: 'Luxury & Lifestyle',
    surfaceStyle: 'editorial-luxe',
    typographyPairing: { display: 'Playfair Display', sans: 'Inter', category: 'editorial-serif' },
    fontDisplay: SERIF_EDITORIAL,
    fontSans: SANS_INTER,
    googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.5rem',
    preview: {
      accent: '#d4af37',
      bg: '#0a0a0a',
      text: '#f5f5f4',
      border: 'rgba(212, 175, 55, 0.3)',
      gradient: 'linear-gradient(135deg, #1f1b0d 0%, #0a0a0a 100%)',
      badgeBg: 'rgba(212, 175, 55, 0.2)',
      badgeText: '#fef08a',
      buttonBg: '#d4af37',
      buttonText: '#0a0a0a',
    },
    c: {
      primary: 'oklch(0.80 0.12 95)',
      primaryForeground: 'oklch(0.10 0.01 90)',
      background: 'oklch(0.11 0.005 90)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.15 0.006 90)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.19 0.008 90)',
      mutedForeground: 'oklch(0.66 0.01 90)',
      accent: 'oklch(0.22 0.02 85)',
      accentForeground: 'oklch(0.88 0.10 95)',
      border: 'oklch(0.24 0.008 90)',
      ring: 'oklch(0.80 0.12 95)',
    },
  },
  {
    id: 'bronze-atelier',
    name: 'Bronze Atelier',
    isDark: false,
    industry: 'Luxury Eyewear / Optical Atelier',
    industryCategory: 'Luxury & Lifestyle',
    surfaceStyle: 'editorial-luxe',
    typographyPairing: { display: 'Playfair Display', sans: 'Inter', category: 'editorial-serif' },
    fontDisplay: SERIF_EDITORIAL,
    fontSans: SANS_INTER,
    googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.5rem',
    preview: {
      accent: '#92603d',
      bg: '#faf7f2',
      text: '#201a15',
      border: '#e7ded3',
      gradient: 'linear-gradient(135deg, #f3ede2 0%, #faf7f2 100%)',
      badgeBg: '#ede3d5',
      badgeText: '#5c3a21',
      buttonBg: '#92603d',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.47 0.09 55)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.006 70)',
      foreground: 'oklch(0.18 0.02 60)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.18 0.02 60)',
      muted: 'oklch(0.95 0.008 70)',
      mutedForeground: 'oklch(0.49 0.02 60)',
      accent: 'oklch(0.92 0.02 70)',
      accentForeground: 'oklch(0.33 0.06 55)',
      border: 'oklch(0.90 0.01 70)',
      ring: 'oklch(0.47 0.09 55)',
    },
  },
  {
    id: 'saddle-oak',
    name: 'Saddle Oak',
    isDark: false,
    industry: 'Artisanal Leather Goods / Luxury Craft',
    industryCategory: 'Luxury & Lifestyle',
    surfaceStyle: 'editorial-luxe',
    typographyPairing: { display: 'Playfair Display', sans: 'Inter', category: 'editorial-serif' },
    fontDisplay: SERIF_EDITORIAL,
    fontSans: SANS_INTER,
    googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.5rem',
    preview: {
      accent: '#92400e',
      bg: '#fbf7f0',
      text: '#2a1f14',
      border: '#eddcc8',
      gradient: 'linear-gradient(135deg, #f6ede0 0%, #fbf7f0 100%)',
      badgeBg: '#f2e4d0',
      badgeText: '#682e07',
      buttonBg: '#92400e',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.44 0.10 50)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.008 80)',
      foreground: 'oklch(0.20 0.03 60)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.20 0.03 60)',
      muted: 'oklch(0.95 0.012 75)',
      mutedForeground: 'oklch(0.49 0.03 60)',
      accent: 'oklch(0.93 0.03 75)',
      accentForeground: 'oklch(0.33 0.08 50)',
      border: 'oklch(0.90 0.012 75)',
      ring: 'oklch(0.44 0.10 50)',
    },
  },
  {
    id: 'highvis-amber',
    name: 'High-Vis Amber',
    isDark: true,
    industry: 'Heavy Civil Infrastructure / EPC Engineering',
    industryCategory: 'Vibrant Consumer',
    surfaceStyle: 'crisp-border',
    typographyPairing: { display: 'Space Grotesk', sans: 'Inter', category: 'tech-grotesque' },
    fontDisplay: SANS_GROTESK,
    fontSans: SANS_INTER,
    googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.625rem',
    preview: {
      accent: '#f59e0b',
      bg: '#131311',
      text: '#fefce8',
      border: 'rgba(245, 158, 11, 0.3)',
      gradient: 'linear-gradient(135deg, #332107 0%, #131311 100%)',
      badgeBg: 'rgba(245, 158, 11, 0.2)',
      badgeText: '#fde68a',
      buttonBg: '#f59e0b',
      buttonText: '#18181b',
    },
    c: {
      primary: 'oklch(0.79 0.16 75)',
      primaryForeground: 'oklch(0.10 0.02 70)',
      background: 'oklch(0.13 0.01 70)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.18 0.015 70)',
      cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.22 0.015 70)',
      mutedForeground: 'oklch(0.68 0.02 70)',
      accent: 'oklch(0.24 0.04 75)',
      accentForeground: 'oklch(0.90 0.12 75)',
      border: 'oklch(0.26 0.015 70)',
      ring: 'oklch(0.79 0.16 75)',
    },
  },
  {
    id: 'trade-slate',
    name: 'Trade Slate',
    isDark: false,
    industry: 'Local Trade / Contractor Services',
    industryCategory: 'Fintech & Enterprise',
    surfaceStyle: 'soft-elevated',
    typographyPairing: { display: 'Plus Jakarta Sans', sans: 'Inter', category: 'clean-geometric' },
    fontDisplay: SANS_JAKARTA,
    fontSans: SANS_INTER,
    googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.625rem',
    preview: {
      accent: '#ea580c',
      bg: '#f5f7f9',
      text: '#1a2430',
      border: '#cbd5e1',
      gradient: 'linear-gradient(135deg, #e2e8f0 0%, #f5f7f9 100%)',
      badgeBg: '#e2e8f0',
      badgeText: '#1e293b',
      buttonBg: '#ea580c',
      buttonText: '#ffffff',
    },
    c: {
      primary: 'oklch(0.40 0.03 255)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.987 0.003 250)',
      foreground: 'oklch(0.16 0.02 255)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.16 0.02 255)',
      muted: 'oklch(0.95 0.006 250)',
      mutedForeground: 'oklch(0.48 0.02 255)',
      accent: 'oklch(0.94 0.03 55)',
      accentForeground: 'oklch(0.40 0.13 55)',
      border: 'oklch(0.90 0.006 250)',
      ring: 'oklch(0.40 0.03 255)',
    },
  },
];

export const THEMES: Record<string, SiteTheme> = Object.fromEntries(
  RAW.map((r) => [r.id, expand(r)]),
);

export const THEMES_LIST: SiteTheme[] = Object.values(THEMES);

export const DEFAULT_THEME_ID = 'indigo-enterprise';

export function getTheme(themeId: string | undefined): SiteTheme {
  return (themeId && THEMES[themeId]) || THEMES[DEFAULT_THEME_ID];
}

/* ---------------------------------------------------------------------------
 * Surface Styles & Typography Helpers
 * ------------------------------------------------------------------------- */

export function getSurfaceStyleMeta(surfaceStyle: SurfaceStyle): {
  id: SurfaceStyle;
  name: string;
  description: string;
  badge: string;
} {
  switch (surfaceStyle) {
    case 'glassmorphism':
      return {
        id: 'glassmorphism',
        name: 'Glassmorphism',
        description: 'Frosted glass with backdrop-blur and subtle translucent border',
        badge: 'Frosted Glass',
      };
    case 'crisp-border':
      return {
        id: 'crisp-border',
        name: '1px Crisp Border',
        description: 'High contrast Linear/Raycast style',
        badge: 'Linear Style',
      };
    case 'soft-elevated':
      return {
        id: 'soft-elevated',
        name: 'Soft Elevated',
        description: 'Multi-layer diffused drop shadow',
        badge: 'Diffused Depth',
      };
    case 'editorial-luxe':
      return {
        id: 'editorial-luxe',
        name: 'Editorial Luxe',
        description: 'Warm neutral surface with hairline border and serif accents',
        badge: 'Quiet Luxury',
      };
  }
}

export const ALL_SURFACE_STYLES: SurfaceStyle[] = [
  'glassmorphism',
  'crisp-border',
  'soft-elevated',
  'editorial-luxe',
];

export function resolveSurfaceClass(surfaceStyle: SurfaceStyle, isDark = false): string {
  switch (surfaceStyle) {
    case 'glassmorphism':
      return isDark
        ? 'backdrop-blur-md bg-white/[0.05] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]'
        : 'backdrop-blur-md bg-white/70 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]';
    case 'crisp-border':
      return isDark
        ? 'border border-neutral-700/80 bg-neutral-900/90 shadow-none'
        : 'border border-neutral-300/90 bg-white shadow-none';
    case 'soft-elevated':
      return isDark
        ? 'border border-neutral-800 bg-neutral-900/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5),0_4px_6px_-2px_rgba(0,0,0,0.4)]'
        : 'border border-neutral-200/60 bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.08),0_4px_6px_-2px_rgba(0,0,0,0.04)]';
    case 'editorial-luxe':
      return isDark
        ? 'border border-stone-800 bg-stone-950/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.3)]'
        : 'border border-stone-200/80 bg-stone-50/90 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]';
  }
}

export function resolveSurfaceStyleProps(surfaceStyle: SurfaceStyle, isDark = false): CSSProperties {
  switch (surfaceStyle) {
    case 'glassmorphism':
      return {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.4)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.12)',
      };
    case 'crisp-border':
      return {
        background: isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
        boxShadow: 'none',
      };
    case 'soft-elevated':
      return {
        background: isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      };
    case 'editorial-luxe':
      return {
        background: isDark ? 'rgba(20, 18, 16, 0.95)' : '#faf8f5',
        borderColor: isDark ? 'rgba(214, 180, 140, 0.2)' : 'rgba(168, 120, 80, 0.2)',
        boxShadow: '0 2px 12px -2px rgba(0, 0, 0, 0.04)',
      };
  }
}

export function resolveSurfaceCSS(surfaceStyle: SurfaceStyle): Record<string, string> {
  switch (surfaceStyle) {
    case 'glassmorphism':
      return {
        '--surface-style': 'glassmorphism',
        '--surface-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        '--surface-shadow-hover': '0 16px 40px 0 rgba(0, 0, 0, 0.25)',
        '--surface-backdrop-blur': '14px',
      };
    case 'crisp-border':
      return {
        '--surface-style': 'crisp-border',
        '--surface-shadow': 'none',
        '--surface-shadow-hover': '0 0 0 1px var(--primary)',
        '--surface-backdrop-blur': '0px',
      };
    case 'soft-elevated':
      return {
        '--surface-style': 'soft-elevated',
        '--surface-shadow': '0 10px 30px -5px rgba(0, 0, 0, 0.10), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '--surface-shadow-hover': '0 20px 40px -8px rgba(0, 0, 0, 0.18), 0 8px 16px -4px rgba(0, 0, 0, 0.08)',
        '--surface-backdrop-blur': '0px',
      };
    case 'editorial-luxe':
      return {
        '--surface-style': 'editorial-luxe',
        '--surface-shadow': '0 2px 12px -2px rgba(0, 0, 0, 0.04)',
        '--surface-shadow-hover': '0 6px 20px -3px rgba(0, 0, 0, 0.09)',
        '--surface-backdrop-blur': '0px',
      };
  }
}

export function getTypographyPairing(theme: SiteTheme): TypographyPairing {
  return theme.typographyPairing;
}

export function getTypographyCategoryLabel(category: TypographyCategory): string {
  switch (category) {
    case 'tech-grotesque':
      return 'Tech Grotesque';
    case 'editorial-serif':
      return 'Editorial Serif';
    case 'clean-geometric':
      return 'Clean Geometric';
    case 'modern-humanist':
      return 'Modern Humanist';
  }
}

/* ---------------------------------------------------------------------------
 * CSS-variable emission
 * ------------------------------------------------------------------------- */

const VAR_MAP: [keyof ThemeColors, string][] = [
  ['background', '--background'],
  ['foreground', '--foreground'],
  ['card', '--card'],
  ['cardForeground', '--card-foreground'],
  ['popover', '--popover'],
  ['popoverForeground', '--popover-foreground'],
  ['primary', '--primary'],
  ['primaryForeground', '--primary-foreground'],
  ['secondary', '--secondary'],
  ['secondaryForeground', '--secondary-foreground'],
  ['muted', '--muted'],
  ['mutedForeground', '--muted-foreground'],
  ['accent', '--accent'],
  ['accentForeground', '--accent-foreground'],
  ['destructive', '--destructive'],
  ['border', '--border'],
  ['input', '--input'],
  ['ring', '--ring'],
];

/** Every `--var: value;` pair for a theme, honouring an optional accent and surface override. */
function themeVarPairs(theme: SiteTheme, accent?: string, surfaceOverride?: SurfaceStyle): [string, string][] {
  const primary = accent?.trim() || theme.colors.primary;
  const pairs: [string, string][] = [];
  for (const [key, cssVar] of VAR_MAP) {
    if ((key === 'primary' || key === 'ring') && accent?.trim()) {
      pairs.push([cssVar, primary]);
    } else {
      pairs.push([cssVar, theme.colors[key]]);
    }
  }
  pairs.push(['--radius', theme.radius]);
  pairs.push(['--radius-badge', theme.radiusBadge]);
  pairs.push(['--radius-button', theme.radiusButton]);
  pairs.push(['--radius-card', theme.radiusCard]);
  pairs.push(['--font-sans', theme.fontSans]);
  pairs.push(['--font-display', theme.fontDisplay]);

  const activeSurface = surfaceOverride || theme.surfaceStyle;
  const surfaceCSS = resolveSurfaceCSS(activeSurface);
  for (const [k, v] of Object.entries(surfaceCSS)) {
    pairs.push([k, v]);
  }

  return pairs;
}

/**
 * The `:root { … }` block string the assembler splices into a generated site's
 * `globals.css` (replacing the existing `:root` block only).
 */
export function themeToRootBlock(theme: SiteTheme, accent?: string, surfaceOverride?: SurfaceStyle): string {
  const body = themeVarPairs(theme, accent, surfaceOverride)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `:root {\n${body}\n}`;
}

/**
 * Inline style object for the studio preview — scope a wrapper `<div>` with these
 * so a theme can be switched live without touching a stylesheet.
 */
export function themeToStyleObject(
  theme: SiteTheme,
  accent?: string,
  surfaceOverride?: SurfaceStyle,
): CSSProperties {
  const style: Record<string, string> = {};
  for (const [k, v] of themeVarPairs(theme, accent, surfaceOverride)) style[k] = v;
  style.background = 'var(--background)';
  style.color = 'var(--foreground)';
  return style as CSSProperties;
}
