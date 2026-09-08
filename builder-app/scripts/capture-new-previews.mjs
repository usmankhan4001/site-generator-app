/**
 * scripts/capture-new-previews.mjs
 *
 * One-off capture script for the newly added niche starter sets (the 12 sets
 * registered in `src/site/archetypes/index.ts` as the "catalog expansion").
 *
 * Unlike `capture-template-previews.ts` (which runs in-process with `tsx` and
 * writes DB rows directly via Prisma), this script is pure ESM and talks to a
 * running dev server over HTTP:
 *
 *   1. Signs up (or signs in) a throwaway user via the better-auth REST API.
 *   2. For each new starter id, creates a throwaway `Project` through
 *      `POST /api/projects` with `{ archetypeId, starterSetId }`.
 *   3. Loads `/preview/project/[id]` in headless Chromium via Playwright and
 *      screenshots the full page to `public/template-previews/<id>.jpg`.
 *   4. Deletes the throwaway project with `DELETE /api/projects/[id]`.
 *
 * Run with:  node scripts/capture-new-previews.mjs
 *
 * Requires the dev server running at http://localhost:3001 (`npm run dev`).
 */

import { chromium } from 'playwright';
import { mkdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const THROWAWAY_EMAIL = 'internal-preview-capture@local.test';
const THROWAWAY_PASSWORD = 'InternalPreviewCapture-2026!';
const THROWAWAY_NAME = 'Internal Preview Capture';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const templatePreviewsDir = resolve(scriptDir, '../public/template-previews');

/**
 * The 12 catalog-expansion starter sets. `id` matches `StarterContentSet.id`
 * from `src/site/archetypes/index.ts`; `archetype` matches `ArchetypeId`.
 * Keep this list in sync with the entries added to `STARTER_SET_LIST`.
 */
const NEW_STARTERS = [
  { id: 'saas-lattice-infra', archetype: 'saas' },
  { id: 'saas-cyber-grc', archetype: 'saas' },
  { id: 'agency-brand-studio', archetype: 'agency' },
  { id: 'agency-motion-house', archetype: 'agency' },
  { id: 'luxury-fragrance-house', archetype: 'luxury' },
  { id: 'luxury-jewelry-house', archetype: 'luxury' },
  { id: 'services-accounting-firm', archetype: 'services' },
  { id: 'services-insurance-broker', archetype: 'services' },
  { id: 'store-athletic-gear', archetype: 'store' },
  { id: 'store-skincare-clean', archetype: 'store' },
  { id: 'local-landscaping', archetype: 'local' },
  { id: 'local-cleaning', archetype: 'local' },
];

async function ensureThrowawayUserSession() {
  const authHeaders = { 'Content-Type': 'application/json', Origin: BASE_URL };

  // Try to sign up first, then fall back to signing in (covers re-runs against
  // the same throwaway account, matching capture-template-previews.ts).
  let res = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      name: THROWAWAY_NAME,
      email: THROWAWAY_EMAIL,
      password: THROWAWAY_PASSWORD,
    }),
  });

  if (!res.ok) {
    res = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ email: THROWAWAY_EMAIL, password: THROWAWAY_PASSWORD }),
    });
  }

  if (!res.ok) {
    throw new Error(`Failed to auth throwaway user: ${res.status} ${await res.text()}`);
  }

  const setCookie = res.headers.get('set-cookie');
  if (!setCookie) throw new Error('Auth response carried no Set-Cookie header.');

  // Node's fetch folds multiple Set-Cookie headers into one string separated
  // by ", "; better-auth typically sends a single session cookie, so take the
  // first `name=value` segment of each part.
  const cookieHeader = setCookie
    .split(/,(?=[^;]+?=)/)
    .map((part) => part.split(';')[0].trim())
    .join('; ');

  return { cookieHeader };
}

async function createProject(cookieHeader, id, archetype) {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookieHeader, Origin: BASE_URL },
    body: JSON.stringify({
      archetypeId: archetype,
      starterSetId: id,
      name: `[preview-capture] ${id}`,
    }),
  });

  if (!res.ok) {
    throw new Error(`POST /api/projects failed for ${id}: ${res.status} ${await res.text()}`);
  }

  const payload = await res.json();
  return payload.project;
}

async function deleteProject(cookieHeader, projectId) {
  await fetch(`${BASE_URL}/api/projects/${projectId}`, {
    method: 'DELETE',
    headers: { Cookie: cookieHeader, Origin: BASE_URL },
  }).catch((err) => {
    console.warn(`  (failed to delete project ${projectId}: ${err.message})`);
  });
}

async function main() {
  mkdirSync(templatePreviewsDir, { recursive: true });

  const { cookieHeader } = await ensureThrowawayUserSession();
  console.log(`Authenticated as ${THROWAWAY_EMAIL}.`);

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
    const page = await context.newPage();

    for (const { id, archetype } of NEW_STARTERS) {
      let project;
      try {
        project = await createProject(cookieHeader, id, archetype);
        console.log(`Created project for ${id}.`);

        await page.goto(`${BASE_URL}/preview/project/${project.id}`, { waitUntil: 'networkidle' });
        await page.waitForSelector('main', { timeout: 15000 });

        const outPath = resolve(templatePreviewsDir, `${id}.jpg`);
        await page.screenshot({ path: outPath, fullPage: true, type: 'jpeg', quality: 80 });

        const { size } = statSync(outPath);
        console.log(`Captured ${id} -> public/template-previews/${id}.jpg (${(size / 1024).toFixed(0)} KB)`);
      } catch (err) {
        console.error(`Failed to capture ${id}: ${err.message ?? err}`);
      } finally {
        if (project) await deleteProject(cookieHeader, project.id);
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});