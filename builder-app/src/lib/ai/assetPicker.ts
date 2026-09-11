/**
 * Deterministic asset picker — pure helpers the AI / composer use to choose
 * themes, logos and images from the existing site-kit libraries. Every picker
 * is pure (no side effects, no IO) and deterministic for the same inputs, so a
 * given brief + seed always yields the same assets.
 *
 * All URLs returned come from the existing libraries (`BRAND_LOGOS`,
 * `IMAGE_POOL`) — never invented. The stock-image fallback is only mentioned
 * here as an extension point; it is not used.
 */

import type { ArchetypeId } from '@/site/schema';
import { THEMES_LIST } from '@/site/themes';
import { BRAND_LOGOS } from '@/site/lib/logos';
import { IMAGE_POOL, pickImages, type ImageCategory } from '@/site/lib/imagePool';
import { ARCHETYPES } from '@/site/archetypes';

/* ============================================================================
 * Deterministic hashing (mirrors the approach in `imagePool.ts`)
 * ========================================================================== */

export function hashStr(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

/* ============================================================================
 * Theme picker
 * ========================================================================== */

/**
 * Pick a theme for an archetype's niche. Prefers themes whose `industry` fits
 * the archetype's keywords / mode; falls back to the archetype's
 * `defaultThemeId`. Deterministic via `seed` (defaults to the archetype id).
 */
export function pickThemeForNiche(
  archetypeId: ArchetypeId,
  seed?: string,
): { themeId: string; accent: string } {
  const archetype = ARCHETYPES[archetypeId];
  const seedStr = seed || archetypeId;
  const keywords = archetype.keywords.map((k) => k.toLowerCase());

  // Mode-based industry hints, so e.g. `store` leans retail and `saas` leans software.
  const modeHints =
    archetype.mode === 'ecommerce'
      ? /retail|store|fashion|luxury|goods|jewel|watch|coffee|outdoor|audio|eyewear|leather|horlogerie/
      : /software|cloud|consult|service|infra|engineering|security|fintech|ai|devops|advisory|trade|contractor|studio|agency/;

  const scored = THEMES_LIST.map((theme) => {
    const industry = theme.industry.toLowerCase();
    let score = 0;
    for (const keyword of keywords) {
      if (industry.includes(keyword)) score += 1;
    }
    if (modeHints.test(industry)) score += 2;
    return { theme, score };
  });

  const max = Math.max(...scored.map((s) => s.score));
  const best = scored.filter((s) => s.score === max).map((s) => s.theme);
  const chosen = best.length === 1 ? best[0] : best[hashStr(seedStr) % best.length];

  return { themeId: chosen.id, accent: chosen.preview.accent };
}

/* ============================================================================
 * Logo picker
 * ========================================================================== */

/**
 * Pick a logo for a niche. Prefers a non-dark "default" (wordmark) logo that
 * reads as a business wordmark; accepts a badge style as a fallback option.
 * Deterministic via `seed` (niche + mood). Always returns a real `BRAND_LOGOS`
 * URL.
 */
export function pickLogoForNiche(
  niche: string,
  mood?: string,
): { logoUrl: string; company: string } {
  const seedStr = `${niche}:${mood || 'default'}`;

  const wordmarks = BRAND_LOGOS.filter((l) => l.style === 'default' && !l.dark);
  const pool = wordmarks.length ? wordmarks : BRAND_LOGOS.filter((l) => !l.dark);
  const source = pool.length ? pool : BRAND_LOGOS;

  const logo = source[hashStr(seedStr) % source.length];
  return { logoUrl: logo.url, company: logo.company };
}

/* ============================================================================
 * Image picker
 * ========================================================================== */

/** Niche-appropriate image categories per archetype. */
const NICHE_CATEGORIES: Record<ArchetypeId, ImageCategory[]> = {
  saas: ['tech-abstract', 'office-team', 'datacenter', 'infrastructure'],
  agency: ['office-team', 'people-portrait', 'cityscape'],
  luxury: ['luxury-goods', 'people-portrait', 'cityscape'],
  services: ['office-team', 'people-portrait', 'cityscape', 'infrastructure'],
  store: ['retail-product', 'luxury-goods', 'workshop-craft', 'people-portrait'],
  local: ['workshop-craft', 'people-portrait', 'cityscape'],
};

/**
 * Pick up to `count` image URLs from `IMAGE_POOL` for niche-appropriate
 * categories, cycling categories so a caller can assign hero / feature /
 * product / carousel images. Deterministic via `seed`. Only pool URLs are
 * returned.
 *
 * Extension note: when `STOCK_IMAGE_API_KEY` is configured, a future
 * `generateSite` core could call the stock-search route to enrich this set —
 * but this picker intentionally stays pool-only.
 */
export function pickImagesForBrief(
  archetype: ArchetypeId,
  seed?: string,
  count = 6,
): string[] {
  const categories = NICHE_CATEGORIES[archetype] || ['tech-abstract', 'office-team'];
  const seedStr = seed || archetype;
  const out: string[] = [];

  let round = 0;
  while (out.length < count && round < 32) {
    for (const category of categories) {
      if (out.length >= count) break;
      const picked = pickImages(category, 1, `${seedStr}:${category}:${round}`);
      if (picked.length) out.push(picked[0]);
    }
    round++;
  }

  return out.slice(0, count);
}

/**
 * Whether the stock-image extension is configured. Pure read of the
 * environment; pickers themselves never depend on this.
 */
export function stockImagesConfigured(): boolean {
  return typeof process !== 'undefined' && Boolean(process.env?.STOCK_IMAGE_API_KEY);
}

/** Re-exported for callers that want the raw pool categories. */
export { IMAGE_POOL };