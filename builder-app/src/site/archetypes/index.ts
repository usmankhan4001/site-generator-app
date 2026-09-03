/**
 * Site Kit — archetype registry (barrel).
 *
 * `ARCHETYPES` is the source of truth for the six site archetypes. It seeds
 * `resolveLayoutSystem()` (treatment), the studio archetype picker, and — in a
 * later task — `createSiteContentFromArchetype()` (composition -> `SiteContent`).
 *
 * Cycle note: `style.ts` imports `ARCHETYPES` from this barrel and this barrel
 * re-exports `style.ts`. That's a deferred cycle — `style.ts` only reads
 * `ARCHETYPES` inside function bodies, never at module-eval time, so the live
 * binding is always initialised by the time anything calls it. `layoutSystems.ts`
 * imports from here too but nothing under `archetypes/` imports `layoutSystems.ts`,
 * so that direction is acyclic.
 */

import type { ArchetypeId, ArchetypeMeta, StarterContentSet } from '@/site/archetypes/types';
import { saas } from '@/site/archetypes/saas';
import { agency } from '@/site/archetypes/agency';
import { luxury } from '@/site/archetypes/luxury';
import { services } from '@/site/archetypes/services';
import { store } from '@/site/archetypes/store';
import { local } from '@/site/archetypes/local';

export const ARCHETYPES: Record<ArchetypeId, ArchetypeMeta> = {
  saas,
  agency,
  luxury,
  services,
  store,
  local,
};

export const ARCHETYPE_LIST: ArchetypeMeta[] = Object.values(ARCHETYPES);

/** Niche-specific starter content packs. Empty until the mining task lands. */
export const STARTER_SETS: Record<string, StarterContentSet> = {};

export const STARTER_SET_LIST: StarterContentSet[] = Object.values(STARTER_SETS);

export * from '@/site/archetypes/types';
export * from '@/site/archetypes/style';
