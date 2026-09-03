/**
 * Site Kit — archetype style resolution + Tailwind class helpers.
 *
 * `resolveArchetype` / `resolveArchetypeStyle` turn a `SiteContent` into the
 * effective `ArchetypeStyle`. The class helpers turn one knob of that style
 * into a Tailwind class string.
 *
 * IMPORTANT: for the six default archetypes shipped today these helpers return
 * exactly the classes the section renderers already hard-code, so wiring a
 * renderer to a helper is a no-op visual change. New treatments differ.
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
 * `card-elevated rounded-xl border border-border/80 bg-card`.
 */
export function cardClass(s: ArchetypeStyle): string {
  switch (s.card) {
    case 'editorial':
      return '';
    case 'flat':
      return 'bg-transparent';
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
