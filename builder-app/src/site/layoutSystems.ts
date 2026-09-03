/**
 * Site Kit — layout systems (structural design language, orthogonal to color).
 *
 * `themes.ts` only ever changes color/font-family/radius tokens. Every theme
 * can be paired with any of the 3 systems below, but a template's `source.sector`
 * picks a sensible default so tech/retail/hosting sites stop sharing one
 * skeleton. Section renderers branch their JSX structure on this — different
 * header alignment, card treatment, spacing rhythm and a signature motif —
 * not just recolor the same boxes.
 *
 * No new webfonts here: numerals/labels that want a monospace feel use this
 * system stack (always available, no font-loading pipeline changes needed).
 */

import type { LayoutSystem, SiteContent } from '@/site/schema';

export const FONT_MONO =
  "ui-monospace, 'SF Mono', 'Space Mono', Menlo, Consolas, monospace";

export interface LayoutSystemMeta {
  id: LayoutSystem;
  name: string;
  /** Shown in the studio's Design panel. */
  description: string;
}

export const LAYOUT_SYSTEMS: LayoutSystemMeta[] = [
  {
    id: 'signal',
    name: 'Signal',
    description: 'Confident technical B2B — left-set headers, hairline rules, monospace data.',
  },
  {
    id: 'atelier',
    name: 'Atelier',
    description: 'Editorial and image-forward — oversized display type, generous whitespace.',
  },
  {
    id: 'foundation',
    name: 'Foundation',
    description: 'Dense infra spec-sheet — bracketed labels, grid-aligned, clinical precision.',
  },
];

/**
 * Resolve the effective layout system for a site: explicit override, else
 * the sector's default, else the site mode's default. Every section renderer
 * calls this on `content` rather than reading `content.layoutSystem` raw.
 */
export function resolveLayoutSystem(content: SiteContent): LayoutSystem {
  if (content.layoutSystem) return content.layoutSystem;
  const sector = content.source?.sector;
  if (sector === 'tech') return 'signal';
  if (sector === 'hosting') return 'foundation';
  if (sector === 'retail') return 'atelier';
  return content.mode === 'ecommerce' ? 'atelier' : 'signal';
}
