/**
 * Site Kit — archetype style resolution + Tailwind class helpers.
 *
 * `resolveArchetype` / `resolveArchetypeStyle` turn a `SiteContent` into the
 * effective `ArchetypeStyle`. The class helpers turn one knob of that style
 * into a Tailwind class string.
 *
 * IMPORTANT: the combination a NO-archetype `SiteContent` resolves to
 * (`resolveArchetype` falls back to `store` for ecommerce, else `services`)
 * MUST make every helper below return exactly the classes the section
 * renderers already hard-code today — wiring a renderer to a helper on that
 * path is a zero-diff change. `services` and `store` share the same
 * density / image / grid / divider / cta knobs and only ever differ in
 * `headerAlign`, so every helper keeps its `regular` / `contained` / `even` /
 * `hairline` / `solid` / `bordered`+`elevated` branch pinned to today's
 * classes. New treatments (atelier / workshop / editorial) diverge.
 */

import type { SiteContent } from '@/site/schema';
import type { ArchetypeId, ArchetypeStyle } from '@/site/archetypes/types';
import { ARCHETYPES } from '@/site/archetypes';

/**
 * The effective archetype for a site: explicit `content.archetype`, else the
 * provenance `source.archetype`, else a mode-based default. Never throws — the
 * fallback always resolves to a real archetype.
 */
export function resolveArchetype(content: SiteContent): ArchetypeId {
  return (
    content.archetype ??
    content.source?.archetype ??
    (content.mode === 'ecommerce' ? 'store' : 'services')
  );
}

/**
 * The effective `ArchetypeStyle` — the archetype's own style with `treatment`
 * overridden by an explicit `content.layoutSystem` when the user picked one.
 */
export function resolveArchetypeStyle(content: SiteContent): ArchetypeStyle {
  return {
    ...ARCHETYPES[resolveArchetype(content)].style,
    ...(content.layoutSystem ? { treatment: content.layoutSystem } : {}),
  };
}

/** True when the site was seeded from / pinned to an archetype. */
export function hasArchetype(content: SiteContent): boolean {
  return !!(content.archetype || content.source?.archetype);
}

/* ============================================================================
 * Class helpers — one knob -> one Tailwind string.
 * ========================================================================== */

/** Vertical section padding. `regular` reproduces today's `py-20 md:py-28`. */
export function sectionPadding(s: ArchetypeStyle): string {
  switch (s.density) {
    case 'compact':
      return 'py-14 md:py-20';
    case 'spacious':
      return 'py-24 md:py-36';
    default:
      return 'py-20 md:py-28';
  }
}

/** Grid gap. `regular` reproduces today's `gap-6 lg:gap-8`. */
export function gridGap(s: ArchetypeStyle): string {
  switch (s.density) {
    case 'compact':
      return 'gap-4 lg:gap-5';
    case 'spacious':
      return 'gap-8 lg:gap-12';
    default:
      return 'gap-6 lg:gap-8';
  }
}

/**
 * Card surface. `bordered` / `elevated` reproduce today's
 * `card-elevated rounded-xl border border-border/80 bg-card` (both the
 * no-archetype `services` and `store` fall here). `editorial` drops the card
 * entirely; `flat` is the sturdy workshop panel.
 */
export function cardClass(s: ArchetypeStyle): string {
  switch (s.card) {
    case 'editorial':
      return '';
    case 'flat':
      return 'rounded-none border border-border bg-card';
    case 'outline-hover':
      return 'rounded-xl border border-transparent hover:border-border bg-card/50 transition-colors';
    case 'bordered':
    case 'elevated':
    default:
      return 'card-elevated rounded-xl border border-border/80 bg-card';
  }
}

/**
 * Image wrapper. `contained` reproduces today's rounded, clipped image box.
 */
export function imageWrapClass(s: ArchetypeStyle): string {
  switch (s.image) {
    case 'full-bleed':
      return 'overflow-hidden bg-muted';
    case 'inset':
      return 'overflow-hidden rounded-xl border border-border/80 bg-muted p-2';
    case 'duotone':
      return 'overflow-hidden rounded-xl bg-primary/10 [&_img]:mix-blend-luminosity [&_img]:opacity-90';
    case 'contained':
    default:
      return 'overflow-hidden rounded-xl bg-muted';
  }
}

/**
 * A between-block / footer-of-card divider. Not on any no-archetype path — used
 * only inside archetype-pinned section branches.
 */
export function dividerClass(s: ArchetypeStyle): string {
  switch (s.divider) {
    case 'rule':
      return 'border-t-2 border-border';
    case 'inset-rule':
      return 'border-t border-border w-16';
    case 'hairline':
      return 'border-t border-border/60';
    case 'none':
    default:
      return '';
  }
}

/**
 * Props for the site-kit `<Button>` that renders a section's primary CTA.
 * `solid` reproduces today's default filled button.
 */
export function ctaProps(s: ArchetypeStyle): {
  variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size: 'default' | 'sm' | 'lg';
  withArrow: boolean;
} {
  switch (s.cta) {
    case 'outline-lead':
      return { variant: 'outline', size: 'lg', withArrow: false };
    case 'link-arrow':
      return { variant: 'link', size: 'default', withArrow: true };
    case 'block':
      return { variant: 'default', size: 'lg', withArrow: false };
    case 'solid':
    default:
      return { variant: 'default', size: 'lg', withArrow: false };
  }
}

/**
 * The hero layout an archetype pins (used only when the site has an archetype
 * AND the hero has an image). No-archetype heroes keep the deterministic
 * per-template hash variant.
 *
 *  luxury / agency  -> editorial (full-bleed image, serif display, minimal chrome)
 *  store            -> stacked
 *  saas / services / local -> split
 */
export function archetypeHeroVariant(
  id: ArchetypeId,
): 'split' | 'stacked' | 'editorial' {
  switch (id) {
    case 'luxury':
    case 'agency':
      return 'editorial';
    case 'store':
      return 'stacked';
    default:
      return 'split';
  }
}
