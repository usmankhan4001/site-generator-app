/**
 * Site Kit — archetype registry (barrel).
 *
 * `ARCHETYPES` is the source of truth for the six site archetypes. It seeds
 * `resolveLayoutSystem()` (treatment), the studio archetype picker, and — in a
 * later task — `createSiteContentFromArchetype()` (composition -> `SiteContent`).
 */

import type { ArchetypeId, ArchetypeMeta, StarterContentSet } from '@/site/archetypes/types';
import { saas } from '@/site/archetypes/saas';
import { agency } from '@/site/archetypes/agency';
import { luxury } from '@/site/archetypes/luxury';
import { services } from '@/site/archetypes/services';
import { store } from '@/site/archetypes/store';
import { local } from '@/site/archetypes/local';

import { saasDevops } from '@/site/archetypes/starterSets/saas/saas-devops';
import { saasAnalytics } from '@/site/archetypes/starterSets/saas/saas-analytics';
import { agencyDigital } from '@/site/archetypes/starterSets/agency/agency-digital';
import { agencyGrowth } from '@/site/archetypes/starterSets/agency/agency-growth';
import { luxuryHorology } from '@/site/archetypes/starterSets/luxury/luxury-horology';
import { luxuryEyewear } from '@/site/archetypes/starterSets/luxury/luxury-eyewear';
import { luxuryLeather } from '@/site/archetypes/starterSets/luxury/luxury-leather';
import { servicesConsulting } from '@/site/archetypes/starterSets/services/services-consulting';
import { servicesFintech } from '@/site/archetypes/starterSets/services/services-fintech';
import { storeApparel } from '@/site/archetypes/starterSets/store/store-apparel';
import { storeLiving } from '@/site/archetypes/starterSets/store/store-living';
import { localPlumbing } from '@/site/archetypes/starterSets/local/local-plumbing';
import { localElectrical } from '@/site/archetypes/starterSets/local/local-electrical';

export {
  saasDevops,
  saasAnalytics,
  agencyDigital,
  agencyGrowth,
  luxuryHorology,
  luxuryEyewear,
  luxuryLeather,
  servicesConsulting,
  servicesFintech,
  storeApparel,
  storeLiving,
  localPlumbing,
  localElectrical,
};

export const ARCHETYPES: Record<ArchetypeId, ArchetypeMeta> = {
  saas,
  agency,
  luxury,
  services,
  store,
  local,
};

export const ARCHETYPE_LIST: ArchetypeMeta[] = Object.values(ARCHETYPES);

/** Niche-specific starter content packs. */
export const STARTER_SETS: Record<string, StarterContentSet> = {
  [saasDevops.id]: saasDevops,
  [saasAnalytics.id]: saasAnalytics,
  [agencyDigital.id]: agencyDigital,
  [agencyGrowth.id]: agencyGrowth,
  [luxuryHorology.id]: luxuryHorology,
  [luxuryEyewear.id]: luxuryEyewear,
  [luxuryLeather.id]: luxuryLeather,
  [servicesConsulting.id]: servicesConsulting,
  [servicesFintech.id]: servicesFintech,
  [storeApparel.id]: storeApparel,
  [storeLiving.id]: storeLiving,
  [localPlumbing.id]: localPlumbing,
  [localElectrical.id]: localElectrical,
};

export const STARTER_SET_LIST: StarterContentSet[] = Object.values(STARTER_SETS);

export * from '@/site/archetypes/types';
export * from '@/site/archetypes/style';
