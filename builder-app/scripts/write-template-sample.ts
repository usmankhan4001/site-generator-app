/**
 * One-off: write `template/src/content/site.ts` from a normalized template so the
 * checked-in template renders a real, schema-valid site. Also rewrites the
 * template's `globals.css` :root block to that template's theme.
 *
 *   npx tsx scripts/write-template-sample.ts [templateId]
 *
 * Default template is a tech / indigo-enterprise one so the existing :root needs
 * no change.
 */

import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NORMALIZED_TEMPLATES, getNormalizedTemplate } from '../src/lib/normalizeTemplates';
import { siteContentToModule } from '../src/lib/serializeSite';
import { getTheme, themeToRootBlock } from '../src/site/themes';

const wantId = process.argv[2];
const content =
  (wantId && getNormalizedTemplate(wantId)) ||
  NORMALIZED_TEMPLATES.find(
    (c) => c.source?.sector === 'tech' && c.themeId === 'indigo-enterprise',
  ) ||
  NORMALIZED_TEMPLATES.find((c) => c.source?.sector === 'tech') ||
  NORMALIZED_TEMPLATES[0];

if (!content) {
  console.error('No normalized templates available.');
  process.exit(1);
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const templateRoot = resolve(scriptDir, '../../template');

// 1. content/site.ts
const siteOut = resolve(templateRoot, 'src/content/site.ts');
mkdirSync(dirname(siteOut), { recursive: true });
writeFileSync(siteOut, siteContentToModule(content), 'utf8');
console.log(`wrote ${siteOut}  (${content.source?.templateId}, theme ${content.themeId})`);

// 2. globals.css :root
const cssPath = resolve(templateRoot, 'src/app/globals.css');
const css = readFileSync(cssPath, 'utf8');
const theme = getTheme(content.themeId);
const block = themeToRootBlock(theme, content.accent);
const next = css.replace(/:root\s*\{[^}]*\}/, block);
if (next !== css) {
  writeFileSync(cssPath, next, 'utf8');
  console.log(`rewrote :root in ${cssPath} -> ${theme.name}`);
} else {
  console.warn('WARN: could not locate :root block in globals.css');
}
