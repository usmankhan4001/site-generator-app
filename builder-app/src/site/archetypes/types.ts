/**
 * Site Kit — archetype system types.
 *
 * An **archetype** is the "kind of business" a site is (`saas`, `agency`,
 * `luxury`, `services`, `store`, `local`). It seeds a whole site: a page +
 * section blueprint (`composition`), a default colour theme, a structural
 * layout `treatment`, and copy tone. It is orthogonal to `themeId` (colour)
 * and sits above `layoutSystem` (which, when explicitly set, overrides the
 * archetype's `treatment`).
 *
 * `ArchetypeId` itself lives in `@/site/schema` as a bare string-literal union
 * so `schema.ts` can reference it (for `SiteContent.archetype`) without
 * importing from this file — avoiding a `schema.ts` <-> `types.ts` cycle. It
 * is re-exported here as the canonical name.
 *
 * Pure types only — nothing here imports React or Node.
 */

import type {
  ArchetypeId,
  BusinessInfo,
  LayoutSystem,
  NavItem,
  PolicySlug,
  SectionType,
  SiteMode,
} from '@/site/schema';

export type { ArchetypeId } from '@/site/schema';

/**
 * Fine-grained visual knobs an archetype pins. Every section renderer that
 * opts in reads these (via `resolveArchetypeStyle`) and the `style.ts` class
 * helpers turn them into Tailwind strings. The default archetype values are
 * chosen to reproduce today's look exactly.
 */
export interface ArchetypeStyle {
  /** Structural layout system this archetype leans on. */
  treatment: LayoutSystem;
  /** Vertical rhythm of section padding. */
  density: 'compact' | 'regular' | 'spacious';
  /** Where section headers sit. */
  headerAlign: 'start' | 'center';
  /** Card surface treatment. */
  card: 'bordered' | 'elevated' | 'flat' | 'editorial' | 'outline-hover';
  /** How imagery is framed. */
  image: 'contained' | 'full-bleed' | 'inset' | 'duotone';
  /** Grid distribution. */
  grid: 'even' | 'asymmetric' | 'stagger';
  /** Between-block dividers. */
  divider: 'none' | 'hairline' | 'rule' | 'inset-rule';
  /** Primary call-to-action styling. */
  cta: 'solid' | 'outline-lead' | 'link-arrow' | 'block';
}

/** One section slot in an archetype's page blueprint. */
export interface SectionBlueprint {
  type: SectionType;
  /** Stable slot key — where starter content sets inject props. */
  slot: string;
  /** Defaults to `true`. */
  enabled?: boolean;
  /** Seed props merged over the section defaults. */
  props?: Record<string, unknown>;
}

/** One page in an archetype's composition. */
export interface PageBlueprint {
  /** Stable key, e.g. 'home' | 'about' | 'offerings' | 'contact'. */
  key: string;
  /** Route path, leading slash. '/' for home. */
  path: string;
  title: string;
  navLabel?: string;
  /** Show in the primary site nav. */
  nav: boolean;
  sections: SectionBlueprint[];
}

/** The full page/section/nav/footer plan an archetype expands to. */
export interface ArchetypeComposition {
  pages: PageBlueprint[];
  policies: PolicySlug[];
  nav: NavItem[];
  footer: { showLegalBar: boolean; showPaymentBadges: boolean };
}

/** A registered archetype. */
export interface ArchetypeMeta {
  id: ArchetypeId;
  name: string;
  description: string;
  mode: SiteMode;
  /** Theme id into `src/site/themes.ts`. */
  defaultThemeId: string;
  /** Optional primary-colour override (hex or oklch(...)). */
  accent?: string;
  /** Structural layout system this archetype defaults to. */
  treatment: LayoutSystem;
  /** Discovery / matching keywords. */
  keywords: string[];
  style: ArchetypeStyle;
  composition: ArchetypeComposition;
  /** Ids into `STARTER_SETS` (empty until the mining task lands). */
  starterSetIds: string[];
}

/**
 * A pack of real, niche-specific copy that drops onto an archetype's
 * composition by `slot`. Mined from the source templates in a later task —
 * `STARTER_SETS` is empty for now.
 */
export interface StarterContentSet {
  id: string;
  archetype: ArchetypeId;
  name: string;
  description: string;
  niche: string;
  tags: string[];
  /** Template ids the copy was mined from. */
  minedFrom?: string[];
  needsPersonalization: boolean;
  themeId?: string;
  accent?: string;
  business?: Partial<BusinessInfo>;
  brand?: { logoText: string };
  meta?: { title: string; description: string; ogImage?: string };
  nav?: NavItem[];
  footer?: Record<string, unknown>;
  /** page key -> slot key -> prop patch. */
  slots: Record<string, Record<string, Record<string, unknown>>>;
}
