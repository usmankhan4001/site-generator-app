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

// Turnkey Flagship Starters
import { legalCorporate } from '@/site/archetypes/starterSets/services/legal-corporate';
import { luxuryFashionDtc } from '@/site/archetypes/starterSets/luxury/luxury-fashion-dtc';
import { constructionEngineering } from '@/site/archetypes/starterSets/services/construction-engineering';
import { modernSaasPro } from '@/site/archetypes/starterSets/saas/modern-saas-pro';
import { megaElectronicsStore } from '@/site/archetypes/starterSets/store/mega-electronics-store';

// Niche Starters
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
import { storeFashion } from '@/site/archetypes/starterSets/store/store-fashion';
import { storeLiving } from '@/site/archetypes/starterSets/store/store-living';
import { storeElectronics } from '@/site/archetypes/starterSets/store/store-electronics';
import { storeGadgets } from '@/site/archetypes/starterSets/store/store-gadgets';
import { storeOutdoor } from '@/site/archetypes/starterSets/store/store-outdoor';
import { storeCoffee } from '@/site/archetypes/starterSets/store/store-coffee';
import { localPlumbing } from '@/site/archetypes/starterSets/local/local-plumbing';
import { localElectrical } from '@/site/archetypes/starterSets/local/local-electrical';

export {
  legalCorporate,
  luxuryFashionDtc,
  constructionEngineering,
  modernSaasPro,
  megaElectronicsStore,
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
  storeFashion,
  storeLiving,
  storeElectronics,
  storeGadgets,
  storeOutdoor,
  storeCoffee,
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

/** Niche-specific and turnkey starter content packs. */
export const STARTER_SETS: Record<string, StarterContentSet> = {
  // 5 Brand-New Flagship Turnkey Starters
  [legalCorporate.id]: legalCorporate,
  'services-legal-corporate': legalCorporate,
  [luxuryFashionDtc.id]: luxuryFashionDtc,
  'luxury-fashion-dtc': luxuryFashionDtc,
  [constructionEngineering.id]: constructionEngineering,
  'services-construction-engineering': constructionEngineering,
  [modernSaasPro.id]: modernSaasPro,
  'saas-modern-pro': modernSaasPro,
  [megaElectronicsStore.id]: megaElectronicsStore,
  'store-mega-electronics': megaElectronicsStore,

  // Niche Starter Sets
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
  [storeFashion.id]: storeFashion,
  [storeLiving.id]: storeLiving,
  [storeElectronics.id]: storeElectronics,
  [storeGadgets.id]: storeGadgets,
  [storeOutdoor.id]: storeOutdoor,
  [storeCoffee.id]: storeCoffee,
  [localPlumbing.id]: localPlumbing,
  [localElectrical.id]: localElectrical,
};

export const STARTER_SET_LIST: StarterContentSet[] = [
  legalCorporate,
  luxuryFashionDtc,
  constructionEngineering,
  modernSaasPro,
  megaElectronicsStore,
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
  storeFashion,
  storeLiving,
  storeElectronics,
  storeGadgets,
  storeOutdoor,
  storeCoffee,
  localPlumbing,
  localElectrical,
];

export * from '@/site/archetypes/types';
export * from '@/site/archetypes/style';
export * from '@/site/archetypes/starters';

