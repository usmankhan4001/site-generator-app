/**
 * assembleSite(content, destDir) — writes a full, standalone copy of the
 * `template/` Next.js project into `destDir`, baked with `content` as its
 * site data (mirrors what `scripts/write-template-sample.ts` does for the
 * checked-in sample, and what `template/scripts/sync-site-kit.mjs` does for
 * the site kit). Used by the export-to-zip route so an operator can
 * self-host the generated site without our GitHub/Dokploy pipeline.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import type { SiteContent } from '@/site/schema';
import { siteContentToModule } from './serializeSite';
import { getTheme, themeToRootBlock } from '@/site/themes';

const TEMPLATE_ROOT = resolve(process.cwd(), '../template');
const SITE_KIT_SRC = resolve(process.cwd(), 'src/site');

// Same junk this repo already knows to keep out of a packaged template copy —
// see `template/.dockerignore`, curated by the Phase-0 audit.
const EXCLUDE_DIR_NAMES = new Set([
  'node_modules',
  '.next',
  '.git',
  'db',
  'tests',
  'examples',
  'mini-services',
  '.zscripts',
  'tool-results',
  'download',
]);
const EXCLUDE_FILE_NAMES = new Set([
  'Caddyfile',
  'worklog.md',
  'airwallex.json',
  'ref1.json',
  'ref2.json',
  'bun.lock',
  'README.md',
]);

function shouldSkip(name: string, isDir: boolean): boolean {
  if (isDir) return EXCLUDE_DIR_NAMES.has(name);
  if (EXCLUDE_FILE_NAMES.has(name)) return true;
  if (name.includes('.db')) return true; // *.db, *.db-journal, *.db-shm, *.db-wal
  if (name.endsWith('.tsbuildinfo')) return true;
  if (name.endsWith('.log')) return true;
  return false;
}

function copyDir(from: string, to: string): void {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    const s = join(from, entry);
    const isDir = statSync(s).isDirectory();
    if (shouldSkip(entry, isDir)) continue;
    const d = join(to, entry);
    if (isDir) copyDir(s, d);
    else copyFileSync(s, d);
  }
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'exported-site'
  );
}

export async function assembleSite(content: SiteContent, destDir: string): Promise<void> {
  if (!existsSync(TEMPLATE_ROOT)) {
    throw new Error(`template/ sibling not found at ${TEMPLATE_ROOT}`);
  }
  if (!existsSync(SITE_KIT_SRC)) {
    throw new Error(`site kit not found at ${SITE_KIT_SRC}`);
  }

  copyDir(TEMPLATE_ROOT, destDir);
  copyDir(SITE_KIT_SRC, join(destDir, 'src/site'));

  const contentDir = join(destDir, 'src/content');
  mkdirSync(contentDir, { recursive: true });
  writeFileSync(join(contentDir, 'site.ts'), siteContentToModule(content), 'utf8');

  const cssPath = join(destDir, 'src/app/globals.css');
  if (existsSync(cssPath)) {
    const css = readFileSync(cssPath, 'utf8');
    const theme = getTheme(content.themeId);
    const block = themeToRootBlock(theme, content.accent);
    const next = css.replace(/:root\s*\{[^}]*\}/, block);
    if (next !== css) writeFileSync(cssPath, next, 'utf8');
  }

  const pkgPath = join(destDir, 'package.json');
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    pkg.name = slugify(content.business?.name ?? 'exported-site');
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  }
}
