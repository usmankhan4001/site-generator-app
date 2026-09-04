import {
  CURATED_IMAGE_VAULT,
  queryCuratedVault,
  getCuratedImageById,
  getRandomCuratedImage,
  getCuratedImagesByDomain,
  getCuratedImagesByRole,
  getCuratedImagesBySubCategory,
  getCuratedVaultStats,
  type VaultDomain,
  type VaultRole,
  type VaultAspectRatio,
  type VaultBackground,
} from './vault';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

async function runVaultTests() {
  console.log('🧪 Starting Curated Image Vault Tests...\n');

  // 1. Vault Size and Integrity
  console.log('1. Verifying vault size and structure...');
  assert(CURATED_IMAGE_VAULT.length >= 60, `Expected at least 60 images, got ${CURATED_IMAGE_VAULT.length}`);
  assert(CURATED_IMAGE_VAULT.length === 80, `Expected exactly 80 curated images, got ${CURATED_IMAGE_VAULT.length}`);

  const idSet = new Set<string>();
  for (const [index, img] of CURATED_IMAGE_VAULT.entries()) {
    assert(Boolean(img.id), `Image at index ${index} must have an id`);
    assert(!idSet.has(img.id), `Duplicate ID found: ${img.id}`);
    idSet.add(img.id);

    assert(Boolean(img.url && img.url.startsWith('https://images.unsplash.com/')), `Invalid URL for ${img.id}`);
    assert(Boolean(img.thumb && img.thumb.startsWith('https://images.unsplash.com/')), `Invalid thumb for ${img.id}`);
    assert(Boolean(img.alt && img.alt.length > 5), `Invalid alt text for ${img.id}`);
    assert(Boolean(img.credit && img.credit.includes('Unsplash')), `Missing/invalid Unsplash credit for ${img.id}`);
    assert(['ecommerce', 'corporate', 'healthcare', 'legal', 'construction'].includes(img.domain), `Invalid domain for ${img.id}`);
    assert(['hero_banner', 'product_thumbnail', 'feature_photo', 'team_portrait'].includes(img.role), `Invalid role for ${img.id}`);
    assert(['1:1', '4:5', '16:9', '3:2'].includes(img.aspectRatio), `Invalid aspect ratio for ${img.id}`);
    assert(['studio_white', 'lifestyle_natural', 'dark_mode'].includes(img.background), `Invalid background for ${img.id}`);
    assert(Array.isArray(img.tags) && img.tags.length > 0, `Tags missing for ${img.id}`);
  }
  console.log(`✅ Passed: Verified 80 curated assets with valid metadata and unique IDs.\n`);

  // 2. Taxonomy Coverage
  console.log('2. Verifying domain and required subcategories coverage...');
  const requiredDomains: VaultDomain[] = ['ecommerce', 'corporate', 'healthcare', 'legal', 'construction'];
  for (const domain of requiredDomains) {
    const domainImages = getCuratedImagesByDomain(domain);
    assert(domainImages.length >= 15, `Domain ${domain} has fewer than 15 images: ${domainImages.length}`);
  }

  const requiredSubCategories = [
    'women_tops',
    'men_footwear',
    'watches',
    'medical_clinic',
    'courtroom_legal',
    'heavy_construction',
    'logistics_cargo',
  ];

  for (const subCat of requiredSubCategories) {
    const subCatImages = getCuratedImagesBySubCategory(subCat);
    assert(subCatImages.length > 0, `Subcategory ${subCat} has no images`);
    console.log(`   - ${subCat}: ${subCatImages.length} images`);
  }
  console.log('✅ Passed: All requested domains and subcategories covered.\n');

  // 3. Testing queryCuratedVault with single and combined filters
  console.log('3. Testing queryCuratedVault helper functions...');

  // Exact match 4-tuple query: domain, subCategory, aspectRatio, role
  const ecomHero = queryCuratedVault({
    domain: 'ecommerce',
    subCategory: 'women_tops',
    aspectRatio: '16:9',
    role: 'hero_banner',
  });
  assert(ecomHero.length > 0, 'queryCuratedVault should find ecommerce women_tops hero_banner 16:9');
  assert(ecomHero.every(img => img.domain === 'ecommerce' && img.subCategory === 'women_tops' && img.aspectRatio === '16:9' && img.role === 'hero_banner'), 'Every image must match criteria');

  // Product thumbnail 1:1 in healthcare
  const healthThumbs = queryCuratedVault({
    domain: 'healthcare',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
  });
  assert(healthThumbs.length > 0, 'Healthcare product thumbnails should exist');

  // Multi-aspect query
  const legalWide = queryCuratedVault({
    domain: 'legal',
    aspectRatio: '16:9',
  });
  assert(legalWide.length > 0, 'Legal 16:9 images should exist');

  // Background filter
  const darkConstruction = queryCuratedVault({
    domain: 'construction',
    background: 'dark_mode',
  });
  assert(darkConstruction.length > 0, 'Construction dark mode images should exist');

  // Tag search
  const sneakerImages = queryCuratedVault({ tags: 'sneakers' });
  assert(sneakerImages.length > 0, 'Tag search for "sneakers" should return matches');
  assert(sneakerImages.every(img => img.tags.some(t => t.toLowerCase().includes('sneaker'))), 'Tag search accuracy check');

  // Text search
  const gavelSearch = queryCuratedVault({ search: 'gavel' });
  assert(gavelSearch.length > 0, 'Search for "gavel" should return legal items');

  // Pagination (limit & offset)
  const paginated = queryCuratedVault({ domain: 'corporate', limit: 3, offset: 2 });
  const allCorp = queryCuratedVault({ domain: 'corporate' });
  assert(paginated.length === 3, 'Limit must be respected');
  assert(paginated[0].id === allCorp[2].id, 'Offset must be respected');

  // Fallback to domain test
  const fallbackResult = queryCuratedVault({
    domain: 'legal',
    subCategory: 'non_existent_subcategory' as any,
    fallbackToDomain: true,
  });
  assert(fallbackResult.length > 0, 'Fallback to domain should return items when enabled');
  assert(fallbackResult[0].domain === 'legal', 'Fallback items must be within domain');

  console.log('✅ Passed: queryCuratedVault filtering, tag searching, pagination, and fallback.\n');

  // 4. Testing utility methods
  console.log('4. Testing lookup and stats helpers...');
  const single = getCuratedImageById('ecom-wt-001');
  assert(single !== undefined && single.id === 'ecom-wt-001', 'getCuratedImageById must return item');

  const randomImg = getRandomCuratedImage({ domain: 'legal' });
  assert(randomImg !== undefined && randomImg.domain === 'legal', 'getRandomCuratedImage must match domain');

  const roleImages = getCuratedImagesByRole('team_portrait');
  assert(roleImages.length > 0, 'getCuratedImagesByRole must return team portraits');

  const stats = getCuratedVaultStats();
  assert(stats.total === 80, `Stats total should be 80, got ${stats.total}`);
  assert(stats.byDomain.ecommerce === 20, `Ecom domain count mismatch: ${stats.byDomain.ecommerce}`);
  assert(stats.byDomain.corporate === 15, `Corp domain count mismatch: ${stats.byDomain.corporate}`);
  assert(stats.byDomain.healthcare === 15, `Healthcare domain count mismatch: ${stats.byDomain.healthcare}`);
  assert(stats.byDomain.legal === 15, `Legal domain count mismatch: ${stats.byDomain.legal}`);
  assert(stats.byDomain.construction === 15, `Construction domain count mismatch: ${stats.byDomain.construction}`);

  console.log('Stats summary:', JSON.stringify(stats, null, 2));
  console.log('\n🎉 ALL CURATED IMAGE VAULT TESTS PASSED SUCCESSFULLY!');
}

runVaultTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
