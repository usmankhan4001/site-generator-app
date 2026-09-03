/**
 * Site Kit — theme registry (single source of truth).
 *
 * One merged registry of 20 themes (OKLCH). The studio preview applies a theme
 * as a scoped inline style object; the assembler writes the same values into the
 * generated site's `globals.css` `:root` block. The `@theme inline` mapping,
 * `@layer base` rules and `.card-elevated` / `.dot-pill` utilities in that file
 * stay constant — only the `:root` custom-property values change per theme.
 */

import type { CSSProperties } from 'react';

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
  /** CSS font stacks. Real webfonts are loaded from `googleFonts`. */
  fontSans: string;
  fontDisplay: string;
  /** Google Fonts family names to load (`next/font` in generated sites). */
  googleFonts: string[];
  radius: string;
  radiusBadge: string;
  radiusButton: string;
  radiusCard: string;
  /** Swatch hints for the studio theme picker. */
  preview: { accent: string; bg: string; text: string };
  colors: ThemeColors;
}

type RawTheme = {
  id: string;
  name: string;
  isDark: boolean;
  industry: string;
  fontDisplay: string;
  fontSans: string;
  googleFonts: string[];
  radius: string;
  preview: { accent: string; bg: string; text: string };
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

/** Expand a compact raw entry: derive popover/secondary/input from base tokens. */
function expand(r: RawTheme): SiteTheme {
  return {
    id: r.id,
    name: r.name,
    isDark: r.isDark,
    industry: r.industry,
    fontSans: r.fontSans,
    fontDisplay: r.fontDisplay,
    googleFonts: r.googleFonts,
    radius: r.radius,
    radiusBadge: '9999px',
    radiusButton: `calc(${r.radius} - 0.25rem)`,
    radiusCard: r.radius,
    preview: r.preview,
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
    id: 'indigo-enterprise', name: 'Indigo Enterprise', isDark: false,
    industry: 'Software / Cloud / DevOps',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_JAKARTA, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem', preview: { accent: '#6366f1', bg: '#f8fafc', text: '#0f172a' },
    c: {
      primary: 'oklch(0.48 0.24 275)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.99 0.003 260)', foreground: 'oklch(0.14 0.03 260)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.14 0.03 260)',
      muted: 'oklch(0.96 0.008 260)', mutedForeground: 'oklch(0.50 0.02 260)',
      accent: 'oklch(0.95 0.025 275)', accentForeground: 'oklch(0.35 0.15 275)',
      border: 'oklch(0.92 0.008 260)', ring: 'oklch(0.48 0.24 275)',
    },
  },
  {
    id: 'midnight-obsidian', name: 'Midnight Obsidian', isDark: true,
    industry: 'Applied AI / Machine Learning / Deep Tech',
    fontDisplay: SANS_GROTESK, fontSans: SANS_INTER, googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem', preview: { accent: '#a855f7', bg: '#090d16', text: '#f8fafc' },
    c: {
      primary: 'oklch(0.72 0.20 285)', primaryForeground: 'oklch(0.11 0.015 260)',
      background: 'oklch(0.11 0.015 260)', foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.16 0.02 260)', cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.20 0.02 260)', mutedForeground: 'oklch(0.68 0.015 260)',
      accent: 'oklch(0.24 0.03 285)', accentForeground: 'oklch(0.92 0.03 285)',
      border: 'oklch(0.24 0.02 260)', ring: 'oklch(0.72 0.20 285)',
    },
  },
  {
    id: 'emerald-precision', name: 'Emerald Precision', isDark: false,
    industry: 'Fintech / Payment Systems / Security',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_JAKARTA, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem', preview: { accent: '#10b981', bg: '#f7fee7', text: '#064e3b' },
    c: {
      primary: 'oklch(0.52 0.17 155)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.99 0.003 160)', foreground: 'oklch(0.14 0.03 160)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.14 0.03 160)',
      muted: 'oklch(0.96 0.008 160)', mutedForeground: 'oklch(0.48 0.03 160)',
      accent: 'oklch(0.94 0.03 155)', accentForeground: 'oklch(0.35 0.12 155)',
      border: 'oklch(0.91 0.01 160)', ring: 'oklch(0.52 0.17 155)',
    },
  },
  {
    id: 'carbon-defense', name: 'Carbon Defense', isDark: true,
    industry: 'Cybersecurity / IoT / Server Infra',
    fontDisplay: SANS_GROTESK, fontSans: SANS_GROTESK, googleFonts: ['Space Grotesk', 'Inter'],
    radius: '0.625rem', preview: { accent: '#06b6d4', bg: '#090d16', text: '#ecfeff' },
    c: {
      primary: 'oklch(0.72 0.16 205)', primaryForeground: 'oklch(0.10 0.02 240)',
      background: 'oklch(0.10 0.02 240)', foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.15 0.025 240)', cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.19 0.025 240)', mutedForeground: 'oklch(0.65 0.02 240)',
      accent: 'oklch(0.22 0.04 205)', accentForeground: 'oklch(0.90 0.06 205)',
      border: 'oklch(0.24 0.025 240)', ring: 'oklch(0.72 0.16 205)',
    },
  },
  {
    id: 'monochrome-atelier', name: 'Monochrome Atelier', isDark: false,
    industry: 'Luxury Fashion / High-End Retail',
    fontDisplay: SERIF_EDITORIAL, fontSans: SANS_INTER, googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.5rem', preview: { accent: '#18181b', bg: '#fafafa', text: '#18181b' },
    c: {
      primary: 'oklch(0.15 0.005 60)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.004 70)', foreground: 'oklch(0.15 0.005 60)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.15 0.005 60)',
      muted: 'oklch(0.95 0.005 70)', mutedForeground: 'oklch(0.48 0.005 60)',
      accent: 'oklch(0.93 0.008 70)', accentForeground: 'oklch(0.15 0.005 60)',
      border: 'oklch(0.90 0.005 70)', ring: 'oklch(0.35 0.005 60)',
    },
  },
  {
    id: 'cyber-slate-volt', name: 'Cyber Slate & Volt', isDark: true,
    industry: 'Smart Tech / Precision Electronics',
    fontDisplay: SANS_GROTESK, fontSans: SANS_INTER, googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem', preview: { accent: '#84cc16', bg: '#0f172a', text: '#f8fafc' },
    c: {
      primary: 'oklch(0.82 0.22 130)', primaryForeground: 'oklch(0.10 0.02 240)',
      background: 'oklch(0.13 0.02 250)', foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.18 0.025 250)', cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.22 0.025 250)', mutedForeground: 'oklch(0.68 0.02 250)',
      accent: 'oklch(0.24 0.05 130)', accentForeground: 'oklch(0.88 0.14 130)',
      border: 'oklch(0.26 0.025 250)', ring: 'oklch(0.82 0.22 130)',
    },
  },
  {
    id: 'nordic-sage', name: 'Nordic Sage & Oat', isDark: false,
    industry: 'Clean Skincare / Botanical Wellness',
    fontDisplay: SERIF_EDITORIAL, fontSans: SANS_INTER, googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.875rem', preview: { accent: '#4d7c0f', bg: '#f7fee7', text: '#14532d' },
    c: {
      primary: 'oklch(0.42 0.08 150)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.008 90)', foreground: 'oklch(0.20 0.03 150)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.20 0.03 150)',
      muted: 'oklch(0.95 0.012 90)', mutedForeground: 'oklch(0.48 0.03 150)',
      accent: 'oklch(0.93 0.025 150)', accentForeground: 'oklch(0.32 0.06 150)',
      border: 'oklch(0.90 0.012 90)', ring: 'oklch(0.42 0.08 150)',
    },
  },
  {
    id: 'terracotta-living', name: 'Terracotta & Warm Oak', isDark: false,
    industry: 'Scandinavian Living / Furniture',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_JAKARTA, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem', preview: { accent: '#ea580c', bg: '#fff7ed', text: '#431407' },
    c: {
      primary: 'oklch(0.55 0.18 45)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.006 60)', foreground: 'oklch(0.18 0.02 50)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.18 0.02 50)',
      muted: 'oklch(0.95 0.01 60)', mutedForeground: 'oklch(0.48 0.02 50)',
      accent: 'oklch(0.94 0.03 45)', accentForeground: 'oklch(0.40 0.14 45)',
      border: 'oklch(0.91 0.01 60)', ring: 'oklch(0.55 0.18 45)',
    },
  },
  {
    id: 'electric-teal', name: 'Electric Teal & Slate', isDark: false,
    industry: 'SaaS Velocity / Full-Stack Studio',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_JAKARTA, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem', preview: { accent: '#0d9488', bg: '#f0fdfa', text: '#134e4a' },
    c: {
      primary: 'oklch(0.55 0.16 190)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.005 190)', foreground: 'oklch(0.14 0.03 200)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.14 0.03 200)',
      muted: 'oklch(0.95 0.01 190)', mutedForeground: 'oklch(0.48 0.02 200)',
      accent: 'oklch(0.94 0.03 190)', accentForeground: 'oklch(0.35 0.12 190)',
      border: 'oklch(0.91 0.01 190)', ring: 'oklch(0.55 0.16 190)',
    },
  },
  {
    id: 'crimson-velocity', name: 'Crimson Velocity', isDark: true,
    industry: 'Athletics / High-Performance Gear',
    fontDisplay: SANS_GROTESK, fontSans: SANS_INTER, googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.625rem', preview: { accent: '#ef4444', bg: '#1c0a0a', text: '#fee2e2' },
    c: {
      primary: 'oklch(0.58 0.23 15)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.10 0.015 15)', foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.16 0.02 15)', cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.20 0.02 15)', mutedForeground: 'oklch(0.68 0.015 15)',
      accent: 'oklch(0.24 0.06 15)', accentForeground: 'oklch(0.90 0.10 15)',
      border: 'oklch(0.24 0.02 15)', ring: 'oklch(0.58 0.23 15)',
    },
  },
  {
    id: 'espresso-amber', name: 'Rich Espresso & Cream', isDark: false,
    industry: 'Artisan Coffee / Specialty Foods',
    fontDisplay: SERIF_EDITORIAL, fontSans: SANS_INTER, googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.75rem', preview: { accent: '#78350f', bg: '#fefce8', text: '#451a03' },
    c: {
      primary: 'oklch(0.38 0.09 50)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.008 80)', foreground: 'oklch(0.22 0.04 50)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.22 0.04 50)',
      muted: 'oklch(0.95 0.012 80)', mutedForeground: 'oklch(0.50 0.03 50)',
      accent: 'oklch(0.90 0.05 70)', accentForeground: 'oklch(0.30 0.08 50)',
      border: 'oklch(0.91 0.012 80)', ring: 'oklch(0.38 0.09 50)',
    },
  },
  {
    id: 'hyper-speed-ultramarine', name: 'Hyper-Speed Ultramarine', isDark: true,
    industry: 'NVMe Cloud VPS / Compute Infra',
    fontDisplay: SANS_GROTESK, fontSans: SANS_GROTESK, googleFonts: ['Space Grotesk', 'Inter'],
    radius: '0.625rem', preview: { accent: '#3b82f6', bg: '#090d16', text: '#eff6ff' },
    c: {
      primary: 'oklch(0.62 0.22 255)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.09 0.02 260)', foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.14 0.025 260)', cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.18 0.025 260)', mutedForeground: 'oklch(0.65 0.02 260)',
      accent: 'oklch(0.22 0.05 255)', accentForeground: 'oklch(0.88 0.10 255)',
      border: 'oklch(0.22 0.025 260)', ring: 'oklch(0.62 0.22 255)',
    },
  },
  {
    id: 'enterprise-cyan', name: 'Enterprise Cyan & White', isDark: false,
    industry: 'Managed Web Infra / Global Edge CDN',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_JAKARTA, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem', preview: { accent: '#0284c7', bg: '#f0f9ff', text: '#0c4a6e' },
    c: {
      primary: 'oklch(0.48 0.15 220)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.004 220)', foreground: 'oklch(0.14 0.03 230)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.14 0.03 230)',
      muted: 'oklch(0.95 0.008 220)', mutedForeground: 'oklch(0.48 0.02 230)',
      accent: 'oklch(0.93 0.03 220)', accentForeground: 'oklch(0.32 0.12 220)',
      border: 'oklch(0.91 0.008 220)', ring: 'oklch(0.48 0.15 220)',
    },
  },
  {
    id: 'sunset-amber', name: 'Sunset Amber & Bronze', isDark: false,
    industry: 'Executive Advisory / Wealth Management',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_JAKARTA, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem', preview: { accent: '#d97706', bg: '#fffbeb', text: '#451a03' },
    c: {
      primary: 'oklch(0.58 0.19 65)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.006 75)', foreground: 'oklch(0.16 0.03 65)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.16 0.03 65)',
      muted: 'oklch(0.95 0.01 75)', mutedForeground: 'oklch(0.48 0.02 65)',
      accent: 'oklch(0.94 0.03 65)', accentForeground: 'oklch(0.38 0.14 65)',
      border: 'oklch(0.91 0.01 75)', ring: 'oklch(0.58 0.19 65)',
    },
  },
  {
    id: 'amethyst-violet', name: 'Amethyst Cosmic Dark', isDark: true,
    industry: 'Web3 / NextGen Protocol / Gaming',
    fontDisplay: SANS_GROTESK, fontSans: SANS_INTER, googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem', preview: { accent: '#c084fc', bg: '#130e24', text: '#faf5ff' },
    c: {
      primary: 'oklch(0.70 0.22 300)', primaryForeground: 'oklch(0.10 0.02 280)',
      background: 'oklch(0.11 0.025 295)', foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.16 0.03 295)', cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.20 0.03 295)', mutedForeground: 'oklch(0.68 0.02 295)',
      accent: 'oklch(0.24 0.05 300)', accentForeground: 'oklch(0.88 0.12 300)',
      border: 'oklch(0.25 0.03 295)', ring: 'oklch(0.70 0.22 300)',
    },
  },
  {
    id: 'neo-grotesque-zinc', name: 'Neo-Grotesque Zinc', isDark: false,
    industry: 'Minimalist Engineering / Developer Tools',
    fontDisplay: SANS_GROTESK, fontSans: SANS_GROTESK, googleFonts: ['Space Grotesk', 'Inter'],
    radius: '0.5rem', preview: { accent: '#52525b', bg: '#f4f4f5', text: '#18181b' },
    c: {
      primary: 'oklch(0.25 0.01 260)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.98 0.002 260)', foreground: 'oklch(0.15 0.01 260)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.15 0.01 260)',
      muted: 'oklch(0.94 0.005 260)', mutedForeground: 'oklch(0.48 0.01 260)',
      accent: 'oklch(0.92 0.008 260)', accentForeground: 'oklch(0.20 0.01 260)',
      border: 'oklch(0.89 0.005 260)', ring: 'oklch(0.40 0.01 260)',
    },
  },
  {
    id: 'rose-gold-luxury', name: 'Rose Gold & Silk', isDark: false,
    industry: 'Fine Jewelry / Luxury Cosmetics',
    fontDisplay: SERIF_EDITORIAL, fontSans: SANS_INTER, googleFonts: ['Playfair Display', 'Inter'],
    radius: '0.875rem', preview: { accent: '#f43f5e', bg: '#fff1f2', text: '#4c0519' },
    c: {
      primary: 'oklch(0.55 0.17 10)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.006 15)', foreground: 'oklch(0.18 0.03 10)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.18 0.03 10)',
      muted: 'oklch(0.95 0.01 15)', mutedForeground: 'oklch(0.48 0.02 10)',
      accent: 'oklch(0.94 0.03 10)', accentForeground: 'oklch(0.40 0.14 10)',
      border: 'oklch(0.91 0.01 15)', ring: 'oklch(0.55 0.17 10)',
    },
  },
  {
    id: 'deep-ocean-blue', name: 'Deep Ocean Navy', isDark: true,
    industry: 'Enterprise Maritime / Logistics & Fleet',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_JAKARTA, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem', preview: { accent: '#0ea5e9', bg: '#081326', text: '#f0f9ff' },
    c: {
      primary: 'oklch(0.60 0.18 230)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.10 0.02 245)', foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.15 0.025 245)', cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.19 0.025 245)', mutedForeground: 'oklch(0.65 0.02 245)',
      accent: 'oklch(0.22 0.05 230)', accentForeground: 'oklch(0.88 0.10 230)',
      border: 'oklch(0.24 0.025 245)', ring: 'oklch(0.60 0.18 230)',
    },
  },
  {
    id: 'aurora-emerald', name: 'Aurora Emerald & Pine', isDark: true,
    industry: 'Clean Energy / Carbon Intelligence',
    fontDisplay: SANS_GROTESK, fontSans: SANS_INTER, googleFonts: ['Inter', 'Space Grotesk'],
    radius: '0.75rem', preview: { accent: '#34d399', bg: '#051c14', text: '#ecfdf5' },
    c: {
      primary: 'oklch(0.75 0.18 160)', primaryForeground: 'oklch(0.10 0.03 160)',
      background: 'oklch(0.10 0.025 165)', foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.15 0.03 165)', cardForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.19 0.03 165)', mutedForeground: 'oklch(0.65 0.02 165)',
      accent: 'oklch(0.22 0.05 160)', accentForeground: 'oklch(0.88 0.12 160)',
      border: 'oklch(0.24 0.03 165)', ring: 'oklch(0.75 0.18 160)',
    },
  },
  {
    id: 'blueprint-navy', name: 'Blueprint Navy', isDark: false,
    industry: 'Ergonomic Workspace / Modern Office Systems',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_INTER, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.75rem', preview: { accent: '#1d4ed8', bg: '#f8fafc', text: '#0f172a' },
    c: {
      primary: 'oklch(0.38 0.18 255)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.988 0.003 250)', foreground: 'oklch(0.14 0.03 255)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.14 0.03 255)',
      muted: 'oklch(0.955 0.008 250)', mutedForeground: 'oklch(0.48 0.02 255)',
      accent: 'oklch(0.93 0.03 240)', accentForeground: 'oklch(0.28 0.14 255)',
      border: 'oklch(0.90 0.008 250)', ring: 'oklch(0.38 0.18 255)',
    },
  },
  {
    id: 'titanium-gray', name: 'Titanium Precision', isDark: false,
    industry: 'Precision Engineering / Industrial',
    fontDisplay: SANS_JAKARTA, fontSans: SANS_JAKARTA, googleFonts: ['Plus Jakarta Sans', 'Inter'],
    radius: '0.625rem', preview: { accent: '#475569', bg: '#f8fafc', text: '#0f172a' },
    c: {
      primary: 'oklch(0.38 0.03 260)', primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.985 0.003 260)', foreground: 'oklch(0.15 0.02 260)',
      card: 'oklch(1 0 0)', cardForeground: 'oklch(0.15 0.02 260)',
      muted: 'oklch(0.95 0.006 260)', mutedForeground: 'oklch(0.48 0.015 260)',
      accent: 'oklch(0.92 0.01 260)', accentForeground: 'oklch(0.25 0.02 260)',
      border: 'oklch(0.90 0.006 260)', ring: 'oklch(0.38 0.03 260)',
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

/** Every `--var: value;` pair for a theme, honouring an optional accent override. */
function themeVarPairs(theme: SiteTheme, accent?: string): [string, string][] {
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
  return pairs;
}

/**
 * The `:root { … }` block string the assembler splices into a generated site's
 * `globals.css` (replacing the existing `:root` block only).
 */
export function themeToRootBlock(theme: SiteTheme, accent?: string): string {
  const body = themeVarPairs(theme, accent)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `:root {\n${body}\n}`;
}

/**
 * Inline style object for the studio preview — scope a wrapper `<div>` with these
 * so a theme can be switched live without touching a stylesheet.
 */
export function themeToStyleObject(theme: SiteTheme, accent?: string): CSSProperties {
  const style: Record<string, string> = {};
  for (const [k, v] of themeVarPairs(theme, accent)) style[k] = v;
  style.background = 'var(--background)';
  style.color = 'var(--foreground)';
  return style as CSSProperties;
}
