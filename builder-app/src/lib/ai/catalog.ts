/**
 * AI catalog — a compact, serializable manifest of everything a `generateSite`
 * core can choose from: sections (and the text fields the AI may write),
 * themes, logos, and archetypes (plus a per-archetype "distinctness" note so
 * the model picks consistent themes/sections).
 *
 * This is the *prompt-facing* surface: it deliberately trims the full color
 * maps, font stacks and structural props down to what the model needs to make
 * coherent choices. The deterministic pickers live in `./assetPicker`.
 *
 * Read-only imports only — no edits to the source modules, no new deps.
 */

import type { ArchetypeId, LayoutSystem, SectionType, SiteMode } from '@/site/schema';
import { SECTION_TYPES } from '@/site/schema';
import { SECTION_FIELDS } from '@/lib/openrouter';
import { THEMES_LIST, getTheme } from '@/site/themes';
import { BRAND_LOGOS, type LogoStyle } from '@/site/lib/logos';
import { ARCHETYPES, ARCHETYPE_LIST } from '@/site/archetypes';
import type { ArchetypeMeta } from '@/site/archetypes/types';

/* ============================================================================
 * Types
 * ========================================================================== */

export interface CatalogSectionEntry {
  type: SectionType;
  label: string;
  description: string;
  /** Flat list of writable text field names (top-level keys + `key.itemKey`). */
  textFields: string[];
}

export interface CatalogThemeEntry {
  id: string;
  name: string;
  industry: string;
  isDark: boolean;
  accent: string;
  /** One-sentence human blurb: fits / personality. */
  description?: string;
}

export interface CatalogLogoEntry {
  id: string;
  company: string;
  style: LogoStyle;
  url: string;
}

export interface CatalogArchetypeEntry {
  id: ArchetypeId;
  name: string;
  mode: SiteMode;
  treatment: LayoutSystem;
  keywords: string[];
  starterSetIds: string[];
}

/** A scoped catalog (optionally filtered to one archetype). */
export interface Catalog {
  archetype?: CatalogArchetypeEntry;
  distinctness?: string;
  sections: CatalogSectionEntry[];
  themes: CatalogThemeEntry[];
  logos: CatalogLogoEntry[];
  archetypes: CatalogArchetypeEntry[];
}

/* ============================================================================
 * Section manifest
 * ========================================================================== */

const SECTION_LABEL: Record<SectionType, string> = {
  hero: 'Hero',
  statsBar: 'Stats Bar',
  trustBar: 'Trust Bar',
  featureGrid: 'Feature Grid',
  pricingTiers: 'Pricing Tiers',
  productGrid: 'Product Grid',
  testimonials: 'Testimonials',
  faq: 'FAQ',
  ctaBanner: 'CTA Banner',
  pageHeader: 'Page Header',
  prose: 'Prose',
  timeline: 'Timeline',
  teamGrid: 'Team Grid',
  valueGrid: 'Value Grid',
  processSteps: 'Process Steps',
  slaTable: 'SLA Table',
  locationList: 'Location List',
  corporateRegistration: 'Corporate Registration',
  contactPanel: 'Contact Panel',
  policyDocument: 'Policy Document',
  checkout: 'Checkout',
};

const SECTION_DESCRIPTION: Record<SectionType, string> = {
  hero: 'Primary landing banner — headline, subheadline, CTAs, optional imagery or lead form.',
  statsBar: 'Row of key metrics / stats.',
  trustBar: 'Trust signals — text chips or company logos.',
  featureGrid: 'Grid of product or service features.',
  pricingTiers: 'Pricing tiers / plans.',
  productGrid: 'Product catalogue grid.',
  testimonials: 'Customer testimonials / reviews.',
  faq: 'Frequently asked questions.',
  ctaBanner: 'Call-to-action banner.',
  pageHeader: 'Interior page header with eyebrow, headline, subtitle.',
  prose: 'Long-form prose / body copy.',
  timeline: 'Chronological milestones.',
  teamGrid: 'Team member grid.',
  valueGrid: 'Values / principles grid.',
  processSteps: 'Step-by-step process.',
  slaTable: 'Service-level agreement metrics table.',
  locationList: 'Locations / offices list.',
  corporateRegistration: 'Registered entity / legal details (structural — avoid free text).',
  contactPanel: 'Contact form panel.',
  policyDocument: 'Legal policy document (privacy / terms / refund).',
  checkout: 'Payment hand-off page (structural — avoid free text).',
};

/** Flatten `SECTION_FIELDS` into a plain list of writable field names. */
function writableFields(type: SectionType): string[] {
  const specs = SECTION_FIELDS[type] ?? [];
  const out: string[] = [];
  for (const spec of specs) {
    if (spec.kind === 'text' || spec.kind === 'strings') {
      out.push(spec.key);
    } else if (spec.kind === 'objects') {
      out.push(spec.key);
      for (const itemKey of spec.itemKeys) out.push(`${spec.key}.${itemKey}`);
    }
  }
  return out;
}

export const CATALOG_SECTION_TYPES: CatalogSectionEntry[] = SECTION_TYPES.map((type) => ({
  type,
  label: SECTION_LABEL[type],
  description: SECTION_DESCRIPTION[type],
  textFields: writableFields(type),
}));

/* ============================================================================
 * Theme manifest
 * ========================================================================== */

const THEME_DESCRIPTION: Record<string, string> = {
  'indigo-enterprise': 'Trustworthy indigo on clean white — the safe default for B2B software and cloud.',
  'midnight-obsidian': 'Deep near-black with electric violet — premium applied-AI and deep-tech.',
  'emerald-precision': 'Crisp emerald on mint — fintech, payments and security.',
  'carbon-defense': 'Dark carbon with cyan — cybersecurity, IoT and server infrastructure.',
  'monochrome-atelier': 'Pure black-and-white editorial — luxury fashion and high-end retail.',
  'cyber-slate-volt': 'Dark slate with lime volt — smart tech and precision electronics.',
  'nordic-sage': 'Soft sage and oat — clean skincare and botanical wellness.',
  'terracotta-living': 'Warm terracotta and oak — Scandinavian living and furniture.',
  'electric-teal': 'Bright teal on slate — SaaS velocity and full-stack studios.',
  'crimson-velocity': 'Dark with racing red — athletics and high-performance gear.',
  'espresso-amber': 'Rich espresso and cream — artisan coffee and specialty foods.',
  'hyper-speed-ultramarine': 'Dark with ultramarine blue — NVMe cloud VPS and compute infra.',
  'enterprise-cyan': 'Cyan and white — managed web infra and global edge CDN.',
  'sunset-amber': 'Amber and bronze — executive advisory and wealth management.',
  'amethyst-violet': 'Dark cosmic violet — Web3, protocols and gaming.',
  'neo-grotesque-zinc': 'Minimal zinc grey — engineering and developer tools.',
  'rose-gold-luxury': 'Rose gold and silk — fine jewelry and luxury cosmetics.',
  'deep-ocean-blue': 'Dark ocean navy — maritime, logistics and fleet.',
  'aurora-emerald': 'Dark emerald — clean energy and carbon intelligence.',
  'blueprint-navy': 'Blueprint navy — ergonomic workspace and office systems.',
  'titanium-gray': 'Precision titanium grey — industrial and precision engineering.',
  'boutique-oat': 'Oat and amber — contemporary fashion and relaxed tailoring.',
  'backcountry-olive': 'Dark olive — outdoor, trail and alpine equipment.',
  'midnight-audio': 'Dark with brass — audiophile electronics and hi-fi.',
  'noir-ivory': 'Dark noir with gold — haute horlogerie and luxury timepieces.',
  'bronze-atelier': 'Bronze and parchment — luxury eyewear and optical ateliers.',
  'saddle-oak': 'Saddle oak and cream — artisanal leather goods and luxury craft.',
  'highvis-amber': 'Dark with high-vis amber — heavy civil infrastructure and EPC engineering.',
  'trade-slate': 'Slate with safety orange — local trade and contractor services.',
};

function toCatalogTheme(themeId: string): CatalogThemeEntry {
  const theme = getTheme(themeId);
  return {
    id: theme.id,
    name: theme.name,
    industry: theme.industry,
    isDark: theme.isDark,
    accent: theme.preview.accent,
    description: THEME_DESCRIPTION[theme.id],
  };
}

export const CATALOG_THEMES: CatalogThemeEntry[] = THEMES_LIST.map((t) => toCatalogTheme(t.id));

/* ============================================================================
 * Logo manifest — trimmed to one representative (non-dark wordmark) per company
 * ========================================================================== */

export const CATALOG_LOGOS: CatalogLogoEntry[] = (() => {
  const seen = new Set<string>();
  const out: CatalogLogoEntry[] = [];
  for (const logo of BRAND_LOGOS) {
    if (seen.has(logo.company)) continue;
    // Prefer a non-dark "default" (wordmark) as the representative entry.
    const rep =
      (logo.style === 'default' && !logo.dark) ||
      !BRAND_LOGOS.some((l) => l.company === logo.company && l.style === 'default' && !l.dark);
    if (!rep) continue;
    seen.add(logo.company);
    out.push({ id: logo.id, company: logo.company, style: logo.style, url: logo.url });
  }
  return out;
})();

/* ============================================================================
 * Archetype manifest + distinctness
 * ========================================================================== */

function toCatalogArchetype(a: ArchetypeMeta): CatalogArchetypeEntry {
  return {
    id: a.id,
    name: a.name,
    mode: a.mode,
    treatment: a.treatment,
    keywords: a.keywords,
    starterSetIds: a.starterSetIds,
  };
}

export const CATALOG_ARCHETYPES: CatalogArchetypeEntry[] = ARCHETYPE_LIST.map(toCatalogArchetype);

/** Short "what this looks like" note per archetype, so themes/sections stay consistent. */
export const CATALOG_DISTINCTNESS: Record<ArchetypeId, string> = {
  saas: 'Product-led software: centered signal layout, bordered cards, hairline dividers, solid CTAs; home leads with proof, feature grid, pricing and FAQ.',
  agency: 'Editorial studio: spacious atelier layout, asymmetric grid, full-bleed imagery, link-arrow CTAs, no dividers.',
  luxury: 'Image-forward high-end retail: atelier layout, staggered grid, full-bleed imagery, understated link-arrow CTAs, serif display.',
  services: 'Credibility-led advisory: signal layout, bordered cards, metrics, engagement tiers and a process walk-through.',
  store: 'Catalogue-forward e-commerce: elevated cards, product grid, trust signals, reviews and payment badges.',
  local: 'Direct local trade: compact workshop layout, flat cards, rule dividers, block CTAs and a prominent contact panel.',
};

/* ============================================================================
 * Scoped catalog + prompt text
 * ========================================================================== */

/**
 * Build a catalog scoped to one archetype: sections limited to that archetype's
 * composition, themes limited to industry-fit + its default, plus the
 * archetype's distinctness note. Logos stay the full unique-company set.
 */
export function catalogFor(archetypeId: ArchetypeId): Catalog {
  const archetype = ARCHETYPES[archetypeId];
  const usedTypes = new Set<SectionType>();
  for (const page of archetype.composition.pages) {
    for (const section of page.sections) usedTypes.add(section.type);
  }

  const keywords = archetype.keywords.map((k) => k.toLowerCase());
  const matchedThemes = THEMES_LIST.filter((t) => {
    const industry = t.industry.toLowerCase();
    return keywords.some((k) => industry.includes(k)) || t.id === archetype.defaultThemeId;
  });
  const themes = (matchedThemes.length ? matchedThemes : [getTheme(archetype.defaultThemeId)]).map(
    (t) => toCatalogTheme(t.id),
  );

  return {
    archetype: toCatalogArchetype(archetype),
    distinctness: CATALOG_DISTINCTNESS[archetypeId],
    sections: CATALOG_SECTION_TYPES.filter((s) => usedTypes.has(s.type)),
    themes,
    logos: CATALOG_LOGOS,
    archetypes: CATALOG_ARCHETYPES,
  };
}

/** The full, unfiltered catalog. */
export function fullCatalog(): Catalog {
  return {
    sections: CATALOG_SECTION_TYPES,
    themes: CATALOG_THEMES,
    logos: CATALOG_LOGOS,
    archetypes: CATALOG_ARCHETYPES,
  };
}

/**
 * Render a catalog as one compact, prompt-friendly plain-text manifest with
 * clear delimiters. Pass `catalogFor('saas')` (or any archetype) for a scoped
 * prompt; call with no args for the full inventory.
 */
export function buildCatalogText(catalog?: Catalog): string {
  const c = catalog ?? fullCatalog();
  const lines: string[] = ['=== SITE GENERATION CATALOG ==='];

  if (c.archetype) {
    lines.push('');
    lines.push(`ARCHETYPE: ${c.archetype.name} (${c.archetype.id})`);
    lines.push(`MODE: ${c.archetype.mode} | TREATMENT: ${c.archetype.treatment}`);
    lines.push(`KEYWORDS: ${c.archetype.keywords.join(', ')}`);
    lines.push(`STARTER SETS: ${c.archetype.starterSetIds.join(', ')}`);
    if (c.distinctness) lines.push(`LOOK: ${c.distinctness}`);
  }

  lines.push('');
  lines.push('--- SECTIONS ---');
  for (const s of c.sections) {
    lines.push(`- ${s.type} (${s.label}): ${s.description}`);
    lines.push(`    writable text: ${s.textFields.length ? s.textFields.join(', ') : '(none)'}`);
  }

  lines.push('');
  lines.push('--- THEMES ---');
  for (const t of c.themes) {
    lines.push(`- ${t.id} [${t.name}] ${t.isDark ? 'dark' : 'light'} accent=${t.accent} industry=${t.industry}`);
    if (t.description) lines.push(`    ${t.description}`);
  }

  lines.push('');
  lines.push('--- LOGOS ---');
  for (const l of c.logos) {
    lines.push(`- ${l.company} (${l.style}) ${l.url}`);
  }

  lines.push('');
  lines.push('--- ARCHETYPES ---');
  for (const a of c.archetypes) {
    lines.push(`- ${a.id}: ${a.name} (${a.mode}/${a.treatment})`);
  }

  return lines.join('\n');
}