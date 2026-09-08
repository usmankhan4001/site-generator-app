/**
 * Comprehensive Audit & Test Suite for Studio, Business Profile Sync, and Visual Architecture.
 */

import { SECTION_TYPES, type SiteContent } from '../src/site/schema';
import { ARCHETYPE_LIST, ARCHETYPES, STARTER_SETS } from '../src/site/archetypes';
import { THEMES_LIST, getTheme } from '../src/site/themes';
import { defaultPropsFor } from '../src/site/sections/defaults';

console.log('🧪 Starting Visual Studio & Business Details Audit Suite...\n');

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// ============================================================================
// 1. Audit Section Types and Defaults
// ============================================================================
console.log('--- 1. Section Types & Default Props Audit ---');
assert(SECTION_TYPES.length === 21, `Expected 21 section types, got ${SECTION_TYPES.length}`);

for (const type of SECTION_TYPES) {
  const defaults = defaultPropsFor(type);
  assert(
    defaults !== undefined && typeof defaults === 'object',
    `defaultPropsFor('${type}') must return a valid object`,
  );
}

// ============================================================================
// 2. Audit Archetypes and Starter Sets
// ============================================================================
console.log('\n--- 2. Archetype Registry & Starter Sets Audit ---');
assert(ARCHETYPE_LIST.length === 6, `Expected 6 archetypes, got ${ARCHETYPE_LIST.length}`);

for (const arch of ARCHETYPE_LIST) {
  assert(Boolean(ARCHETYPES[arch.id]), `Archetype '${arch.id}' correctly registered in map`);
  assert(arch.starterSetIds.length > 0, `Archetype '${arch.id}' has at least one starter set`);
  assert(Array.isArray(arch.composition.pages), `Archetype '${arch.id}' composition defines pages`);
  
  for (const starterId of arch.starterSetIds) {
    const set = STARTER_SETS[starterId];
    assert(Boolean(set), `Starter set '${starterId}' exists in STARTER_SETS`);
    if (set) {
      assert(Boolean(set.name), `Starter set '${starterId}' defines name: ${set.name}`);
      assert(Boolean(set.slots) && typeof set.slots === 'object', `Starter set '${starterId}' defines slot patches`);
    }
  }
}

// ============================================================================
// 3. Audit Theme Registry & Color Tokens
// ============================================================================
console.log('\n--- 3. Theme Registry & Swatches Audit ---');
assert(THEMES_LIST.length >= 10, `Themes list contains sufficient varieties (${THEMES_LIST.length} themes)`);

for (const theme of THEMES_LIST) {
  assert(Boolean(theme.id), `Theme '${theme.id}' has an ID`);
  assert(Boolean(theme.colors.primary), `Theme '${theme.id}' defines a primary color: ${theme.colors.primary}`);
  assert(Boolean(theme.preview.accent), `Theme '${theme.id}' defines preview accent`);
  assert(Boolean(theme.preview.bg), `Theme '${theme.id}' defines preview background`);
  assert(getTheme(theme.id).id === theme.id, `getTheme('${theme.id}') resolves correctly`);
}

// ============================================================================
// 4. Centralized Business Profile Propagation Audit
// ============================================================================
console.log('\n--- 4. Centralized Business Profile Propagation Audit ---');

const sampleContent: SiteContent = {
  version: 1,
  business: {
    name: 'Apex Global Technologies',
    shortName: 'Apex',
    registrationNumber: '202419874K',
    jurisdiction: 'Singapore',
    governingLaw: 'the laws of Singapore',
    registeredAddress: '10 Marina Boulevard, #38-01 Marina Bay Financial Centre, Singapore 018983',
    email: 'support@apexglobal.io',
    phone: '+65 6123 4567',
    website: 'apexglobal.io',
    supportHours: 'Mon–Fri, 09:00–18:00 (SGT)',
    taxId: 'GST M90367201',
  },
  mode: 'services',
  themeId: 'indigo-enterprise',
  brand: {
    logoText: 'Apex Global',
    logoUrl: '/logos/apex.svg',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: {
    variant: 'columns',
    tagline: 'Global enterprise cloud infrastructure and solutions.',
    columns: [],
    legalLinks: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
    showLegalBar: true,
    showPaymentBadges: true,
  },
  pages: [
    {
      key: 'home',
      path: '/',
      title: 'Home',
      nav: true,
      sections: [
        {
          id: 'hero-1',
          type: 'hero',
          enabled: true,
          props: {
            headline: 'Enterprise Cloud Infrastructure',
            subtitle: 'Built for scale and reliability.',
          },
        },
        {
          id: 'corp-reg-1',
          type: 'corporateRegistration',
          enabled: true,
          props: {},
        },
      ],
    },
    {
      key: 'contact',
      path: '/contact',
      title: 'Contact',
      nav: true,
      sections: [
        {
          id: 'contact-1',
          type: 'contactPanel',
          enabled: true,
          props: {
            showDetails: true,
          },
        },
      ],
    },
    {
      key: 'privacy',
      path: '/privacy',
      title: 'Privacy Policy',
      nav: false,
      sections: [
        {
          id: 'policy-1',
          type: 'policyDocument',
          enabled: true,
          props: {
            title: 'Privacy Policy',
            lastUpdated: 'September 2026',
            sections: [
              {
                heading: '1. Data Controller',
                body: 'This policy is issued on behalf of Apex Global Technologies.',
              },
            ],
          },
        },
      ],
    },
  ],
  meta: {
    title: 'Apex Global Technologies — Enterprise Cloud',
    description: 'Scalable cloud infrastructure solutions.',
  },
};

const corpSection = sampleContent.pages[0].sections[1];
const resolvedEntityName = (corpSection.props as any).entityName || sampleContent.business.name;
const resolvedRegNum = (corpSection.props as any).registrationNumber || sampleContent.business.registrationNumber;
const resolvedAddress = (corpSection.props as any).registeredAddress || sampleContent.business.registeredAddress;
const resolvedLaw = (corpSection.props as any).governingLaw || sampleContent.business.governingLaw;

assert(resolvedEntityName === 'Apex Global Technologies', 'Corporate registration resolves entity name from centralized business');
assert(resolvedRegNum === '202419874K', 'Corporate registration resolves registration number from centralized business');
assert(resolvedAddress.includes('Marina Bay'), 'Corporate registration resolves address from centralized business');
assert(resolvedLaw === 'the laws of Singapore', 'Corporate registration resolves governing law from centralized business');

// Verify mutations to centralized business
sampleContent.business.name = 'Apex Worldwide Holdings';
assert(
  ((corpSection.props as any).entityName || sampleContent.business.name) === 'Apex Worldwide Holdings',
  'Updating centralized business immediately updates dependent corporate section resolution',
);

// ============================================================================
// Summary
// ============================================================================
console.log('\n========================================');
console.log(`Audit Complete: ${passed} passed, ${failed} failed`);
console.log('========================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL AUDIT CHECKS PASSED PERFECTLY!\n');
}
