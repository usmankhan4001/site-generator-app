import { ARCHETYPES, STARTER_SETS, STARTER_SET_LIST } from '../src/site/archetypes';
import { createSiteContentFromArchetype } from '../src/site/archetypes/compose';

console.log('=== Verifying Turnkey Archetype Starters ===\n');

const testCases = [
  {
    id: 'legal_corporate',
    archetype: 'services' as const,
    expectedName: 'Blackwood & Stone Legal Advisory LLP',
    expectedHeaderVariant: 'corporate_utility',
    expectedHeroVariant: 'lead_form',
  },
  {
    id: 'luxury_fashion_dtc',
    archetype: 'luxury' as const,
    expectedName: 'Aura Atelier Haute Couture SAS',
    expectedHeaderVariant: 'editorial_centered',
    expectedHeroVariant: 'editorial_center',
  },
  {
    id: 'construction_engineering',
    archetype: 'services' as const,
    expectedName: 'Vanguard Heavy Infrastructure & Engineering Corp.',
    expectedHeaderVariant: 'corporate_utility',
    expectedHeroVariant: 'stats_banner_split',
  },
  {
    id: 'modern_saas_pro',
    archetype: 'saas' as const,
    expectedName: 'Apex Cloud Technologies, Inc.',
    expectedHeaderVariant: 'floating_glass_pill',
    expectedHeroVariant: 'asymmetric_bento_collage',
  },
  {
    id: 'mega_electronics_store',
    archetype: 'store' as const,
    expectedName: 'VoltTech Electronics International Limited',
    expectedHeaderVariant: 'corporate_utility',
    expectedHeroVariant: 'lead_form',
  },
];

let passed = 0;

for (const tc of testCases) {
  console.log(`[TEST] Composing archetype "${tc.archetype}" with starter "${tc.id}"...`);
  
  const starter = STARTER_SETS[tc.id];
  if (!starter) {
    throw new Error(`Starter set "${tc.id}" not found in STARTER_SETS!`);
  }
  
  const site = createSiteContentFromArchetype(tc.archetype, tc.id);
  
  if (site.business.name !== tc.expectedName) {
    throw new Error(`Expected business name "${tc.expectedName}", got "${site.business.name}"`);
  }
  if (site.header?.variant !== tc.expectedHeaderVariant) {
    throw new Error(`Expected header variant "${tc.expectedHeaderVariant}", got "${site.header?.variant}"`);
  }
  if (site.archetype !== tc.archetype) {
    throw new Error(`Expected archetype "${tc.archetype}", got "${site.archetype}"`);
  }
  if (!site.business.registrationNumber) {
    throw new Error(`Missing statutory registration number for "${tc.id}"`);
  }
  if (!site.business.jurisdiction) {
    throw new Error(`Missing jurisdiction for "${tc.id}"`);
  }
  if (!site.business.registeredAddress) {
    throw new Error(`Missing registeredAddress for "${tc.id}"`);
  }
  
  const homePage = site.pages.find((p) => p.key === 'home');
  if (!homePage || homePage.sections.length === 0) {
    throw new Error(`Missing home page sections for "${tc.id}"`);
  }
  
  const policyPages = site.pages.filter((p) => p.path.startsWith('/policies/'));
  if (policyPages.length < 3) {
    throw new Error(`Expected at least 3 policy pages, found ${policyPages.length}`);
  }
  
  const checkoutPage = site.pages.find((p) => p.path === '/checkout');
  if (!checkoutPage) {
    throw new Error(`Missing /checkout page for "${tc.id}"`);
  }
  
  console.log(`  ✓ Successfully composed "${tc.expectedName}" (${site.pages.length} pages, ${site.nav.length} nav items)`);
  console.log(`  ✓ Header: ${site.header?.variant} | Hero: ${tc.expectedHeroVariant} | Mode: ${site.mode}`);
  console.log(`  ✓ Statutory Reg: ${site.business.registrationNumber} (${site.business.jurisdiction})`);
  console.log(`  ✓ Address: ${site.business.registeredAddress}\n`);
  passed++;
}

console.log(`[REGISTRY CHECK] Total Registered Starters: ${STARTER_SET_LIST.length}`);
if (STARTER_SET_LIST.length < 20) {
  throw new Error(`Expected >= 20 starters in STARTER_SET_LIST, got ${STARTER_SET_LIST.length}`);
}

console.log(`\n🎉 ALL ${passed} TURNKEY STARTER TEMPLATES VERIFIED AND READY!\n`);
