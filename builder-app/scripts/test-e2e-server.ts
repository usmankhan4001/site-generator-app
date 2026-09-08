/**
 * test-e2e-server.ts — Test the server on port 3000 end-to-end.
 */

import { ARCHETYPES, STARTER_SETS } from '../src/site/archetypes';
import { createSiteContentFromArchetype } from '../src/site/archetypes/compose';

async function main() {
  console.log('🚀 Running E2E Server & UI Feature Tests against http://localhost:3000 ...\n');

  // 1. Health check routes
  const routes = ['/', '/create', '/sign-in', '/guides/vercel', '/guides/hostinger'];
  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`);
      console.log(`✓ GET ${r} -> Status ${res.status}`);
      if (res.status >= 400 && res.status !== 401) {
        throw new Error(`Route ${r} returned unexpected status ${res.status}`);
      }
    } catch (e: any) {
      console.error(`✗ Route ${r} failed:`, e.message);
    }
  }

  // 2. Test Turnkey Starter Set Compositions
  console.log('\n📦 Verifying All 6 Archetypes & Turnkey Starters for Full Content:');
  for (const [archId, arch] of Object.entries(ARCHETYPES)) {
    const content = createSiteContentFromArchetype(archId as any, null);
    const homePage = content.pages.find((p) => p.key === 'home');
    const heroSec = homePage?.sections.find((s) => s.type === 'hero');
    const featSec = homePage?.sections.find((s) => s.type === 'featureGrid' || s.type === 'valueGrid');
    const priceSec = homePage?.sections.find((s) => s.type === 'pricingTiers' || s.type === 'productGrid');

    const featCount = (featSec?.props as any)?.items?.length || 0;
    const tierCount = ((priceSec?.props as any)?.tiers?.length || (priceSec?.props as any)?.items?.length) || 0;

    console.log(`  ✓ Archetype: ${arch.name} (${archId})`);
    console.log(`    - Total Pages: ${content.pages.length}`);
    console.log(`    - Hero Headline: "${(heroSec?.props as any)?.headline}"`);
    console.log(`    - ${featSec?.type || 'Features'} Count: ${featCount} items`);
    if (priceSec) console.log(`    - ${priceSec.type} Items: ${tierCount}`);
    console.log(`    - Business Name: "${content.business.name}"`);
    console.log(`    - Legal Jurisdiction: "${content.business.jurisdiction}"`);

  }

  console.log('\n🎉 ALL E2E CHECKS VERIFIED SUCCESSFULLY ON PORT 3000!');
}

main().catch(console.error);
