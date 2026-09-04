/**
 * Site Kit — Turnkey Starter Content Sets.
 *
 * Single registry barrel exporting all niche-specific turnkey starter packs,
 * including both specialized niche sets and high-fidelity flagship starters:
 * - `legal_corporate` ("Blackwood & Stone Legal Advisory")
 * - `luxury_fashion_dtc` ("Aura Atelier Fashion")
 * - `construction_engineering` ("Vanguard Heavy Infrastructure")
 * - `modern_saas_pro` ("Apex Cloud Orchestration")
 * - `mega_electronics_store` ("VoltTech Gear & Audio")
 */

import type { StarterContentSet } from '@/site/archetypes/types';

// Flagship Turnkey Starters
import { legalCorporate } from '@/site/archetypes/starterSets/services/legal-corporate';
import { luxuryFashionDtc } from '@/site/archetypes/starterSets/luxury/luxury-fashion-dtc';
import { constructionEngineering } from '@/site/archetypes/starterSets/services/construction-engineering';
import { modernSaasPro } from '@/site/archetypes/starterSets/saas/modern-saas-pro';
import { megaElectronicsStore } from '@/site/archetypes/starterSets/store/mega-electronics-store';

// SaaS Starters
import { saasDevops } from '@/site/archetypes/starterSets/saas/saas-devops';
import { saasAnalytics } from '@/site/archetypes/starterSets/saas/saas-analytics';

// Agency Starters
import { agencyDigital } from '@/site/archetypes/starterSets/agency/agency-digital';
import { agencyGrowth } from '@/site/archetypes/starterSets/agency/agency-growth';

// Luxury Starters
import { luxuryHorology } from '@/site/archetypes/starterSets/luxury/luxury-horology';
import { luxuryEyewear } from '@/site/archetypes/starterSets/luxury/luxury-eyewear';
import { luxuryLeather } from '@/site/archetypes/starterSets/luxury/luxury-leather';

// Services Starters
import { servicesConsulting } from '@/site/archetypes/starterSets/services/services-consulting';
import { servicesFintech } from '@/site/archetypes/starterSets/services/services-fintech';

// Store / E-Commerce Starters
import { storeApparel } from '@/site/archetypes/starterSets/store/store-apparel';
import { storeFashion } from '@/site/archetypes/starterSets/store/store-fashion';
import { storeLiving } from '@/site/archetypes/starterSets/store/store-living';
import { storeElectronics } from '@/site/archetypes/starterSets/store/store-electronics';
import { storeGadgets } from '@/site/archetypes/starterSets/store/store-gadgets';
import { storeOutdoor } from '@/site/archetypes/starterSets/store/store-outdoor';
import { storeCoffee } from '@/site/archetypes/starterSets/store/store-coffee';

// Local / Trade Starters
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

export const ALL_STARTER_SETS: StarterContentSet[] = [
  // 5 Brand-New Turnkey Flagship Starters
  legalCorporate,
  luxuryFashionDtc,
  constructionEngineering,
  modernSaasPro,
  megaElectronicsStore,

  // Niche Starter Sets
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

export const STARTER_SETS_MAP: Record<string, StarterContentSet> = Object.fromEntries(
  ALL_STARTER_SETS.flatMap((s) => [
    [s.id, s],
    // Provide hyphenated/aliased versions for convenience
    [`${s.archetype}-${s.id}`, s],
  ]),
);
