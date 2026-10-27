/**
 * sync-template.mjs — mirrors `builder-app/src/site/` into `builder-app/template/src/site/`
 * (and `../template/src/site/` if present) so the embedded template shell and the
 * studio site kit never drift.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  copyFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, '../src/site');
const TARGETS = [
  resolve(here, '../template/src/site'),
  resolve(here, '../../template/src/site'),
];

function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    const s = join(from, entry);
    const d = join(to, entry);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else copyFileSync(s, d);
  }
}

function countFiles(dir) {
  let count = 0;
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) count += countFiles(p);
    else count++;
  }
  return count;
}

if (!existsSync(SRC)) {
  console.error(`[sync-template] Source site kit not found at ${SRC}`);
  process.exit(1);
}

for (const dest of TARGETS) {
  const parentTemplateDir = resolve(dest, '../..');
  if (!existsSync(parentTemplateDir)) continue;
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  copyDir(SRC, dest);
  console.log(`[sync-template] Vendored ${countFiles(dest)} files -> ${dest}`);
}
