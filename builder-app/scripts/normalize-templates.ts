/**
 * scripts/normalize-templates.ts
 *
 * Run with:  npx tsx scripts/normalize-templates.ts
 *
 * Exercises `normalizeAllTemplates()` over all 80 source templates and prints a
 * verification report:
 *   - count per sector
 *   - per-SectionType usage histogram
 *   - any template missing an expected route
 *   - the list of `needsPersonalization` ids
 *   - any `themeId` that fell back to the default
 *   - any source section `type` with no alias-table entry
 *
 * Exits non-zero if the count !== 80, if any template throws, or if any
 * template produced 0 pages.
 */

import {
  normalizeTemplate,
  normalizeAllTemplates,
  UNKNOWN_SECTION_TYPES,
} from '../src/lib/normalizeTemplates';
import { SECTION_TYPES } from '../src/site/schema';
import { DEFAULT_THEME_ID, THEMES } from '../src/site/themes';
import { ALL_TEMPLATES_LIST } from '../src/data/templates';

const EXPECTED_ROUTES: Record<string, string[]> = {
  tech: ['/', '/about', '/services', '/contact', '/policies/privacy', '/policies/terms', '/policies/refund'],
  retail: ['/', '/about', '/catalog', '/contact', '/policies/privacy', '/policies/terms', '/policies/refund', '/policies/shipping'],
  hosting: ['/', '/about', '/catalog', '/contact', '/policies/privacy', '/policies/terms', '/policies/refund'],
};

function bar(label: string) {
  console.log('\n' + label);
  console.log('-'.repeat(label.length));
}

function main() {
  const errors: string[] = [];

  /* ---- 1. every template converts without throwing ------------------- */
  for (const t of ALL_TEMPLATES_LIST) {
    try {
      normalizeTemplate(t);
    } catch (e) {
      errors.push(`${(t as any).id}: threw during normalizeTemplate — ${(e as Error)?.stack || e}`);
    }
  }

  let sites;
  try {
    sites = normalizeAllTemplates();
  } catch (e) {
    console.error('FATAL: normalizeAllTemplates() threw:', e);
    process.exit(1);
    return;
  }

  /* ---- 2. aggregate --------------------------------------------------- */
  const perSector: Record<string, number> = { tech: 0, retail: 0, hosting: 0 };
  const histogram: Record<string, number> = {};
  for (const s of SECTION_TYPES) histogram[s] = 0;

  const missingRoutes: string[] = [];
  const needsPersonalization: string[] = [];
  const themeFallbacks: string[] = [];
  let totalPages = 0;
  let totalSections = 0;

  const sourceById = new Map<string, any>(ALL_TEMPLATES_LIST.map((t) => [(t as any).id, t]));

  for (const site of sites) {
    const id = site.source?.templateId ?? '(unknown)';
    const sector = site.source?.sector ?? 'tech';
    perSector[sector] = (perSector[sector] ?? 0) + 1;

    if (!Array.isArray(site.pages) || site.pages.length === 0) {
      errors.push(`${id}: produced 0 pages`);
    }
    totalPages += site.pages.length;

    for (const page of site.pages) {
      for (const section of page.sections) {
        totalSections++;
        histogram[section.type] = (histogram[section.type] ?? 0) + 1;
        if (!SECTION_TYPES.includes(section.type)) {
          errors.push(`${id}: page ${page.path} has non-canonical section type '${section.type}'`);
        }
      }
    }

    const paths = new Set(site.pages.map((p) => p.path));
    for (const route of EXPECTED_ROUTES[sector] ?? []) {
      if (!paths.has(route)) missingRoutes.push(`${id} (${sector}) is missing route ${route}`);
    }

    if (site.source?.needsPersonalization) needsPersonalization.push(id);

    const src = sourceById.get(id);
    const recommended = src ? String(src.recommendedTheme ?? '') : '';
    if (recommended && !THEMES[recommended] && site.themeId === DEFAULT_THEME_ID) {
      themeFallbacks.push(`${id}: '${recommended}' -> ${DEFAULT_THEME_ID}`);
    }
  }

  /* ---- 3. report ---------------------------------------------------- */
  console.log('==================================================');
  console.log(' normalize-templates — verification report');
  console.log('==================================================');
  console.log(`Total normalized sites : ${sites.length}`);
  console.log(`Total pages            : ${totalPages}`);
  console.log(`Total sections         : ${totalSections}`);

  bar('Count per sector');
  for (const [k, v] of Object.entries(perSector)) console.log(`  ${k.padEnd(8)} ${v}`);

  bar('SectionType usage histogram');
  for (const [k, v] of Object.entries(histogram).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k.padEnd(24)} ${v}`);
  }

  bar(`Templates missing an expected route (${missingRoutes.length})`);
  if (missingRoutes.length === 0) console.log('  (none)');
  else missingRoutes.forEach((m) => console.log('  ' + m));

  bar(`needsPersonalization ids (${needsPersonalization.length})`);
  needsPersonalization.forEach((m) => console.log('  ' + m));

  bar(`themeId fell back to default (${themeFallbacks.length})`);
  if (themeFallbacks.length === 0) console.log('  (none)');
  else themeFallbacks.forEach((m) => console.log('  ' + m));

  bar('Unmapped source section types');
  if (UNKNOWN_SECTION_TYPES.size === 0) console.log('  (none — every source type is in the alias table)');
  else Array.from(UNKNOWN_SECTION_TYPES).forEach((t) => console.log('  ' + t));

  /* ---- 4. exit code ---------------------------------------------- */
  console.log('\n==================================================');
  if (errors.length) {
    console.error(`FAILED with ${errors.length} error(s):`);
    errors.forEach((e) => console.error('  - ' + e));
    process.exit(1);
    return;
  }
  if (sites.length !== 80) {
    console.error(`FAILED: expected 80 sites, got ${sites.length}`);
    process.exit(1);
    return;
  }
  console.log('OK — all 80 templates normalized cleanly.');
  console.log('==================================================');
}

main();
