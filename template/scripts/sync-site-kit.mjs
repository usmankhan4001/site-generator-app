/**
 * sync-site-kit — vendors the shared site kit into this site.
 *
 * The site kit lives once at `builder-app/src/site/`. During local development of
 * the template (checked out next to `builder-app/`) this script mirrors it into
 * `template/src/site/` so the two never drift. In a generated/deployed site the
 * kit is already baked in by the assembler and there is no `builder-app/` sibling
 * — the script then no-ops.
 *
 * Runs from `predev` / `prebuild`. Zero dependencies.
 */

import { existsSync, mkdirSync, readdirSync, rmSync, statSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, '../../builder-app/src/site');
const DEST = resolve(here, '../src/site');

if (!existsSync(SRC)) {
  console.log('[sync-site-kit] no builder-app sibling — site kit already vendored, skipping.');
  process.exit(0);
}

function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    const s = join(from, entry);
    const d = join(to, entry);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else copyFileSync(s, d);
  }
}

if (existsSync(DEST)) rmSync(DEST, { recursive: true, force: true });
copyDir(SRC, DEST);

let count = 0;
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else count++;
  }
})(DEST);

console.log(`[sync-site-kit] vendored ${count} files -> src/site/`);
