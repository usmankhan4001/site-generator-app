/**
 * scripts/capture-template-previews.ts
 *
 * One-off capture script (not part of the app). For every archetype (blank,
 * `starterSetId: null`) and every starter set, creates a throwaway `Project`
 * row, screenshots its `/preview/project/[id]` render with headless
 * Chromium, and saves the JPEG to `public/template-previews/`.
 *
 * Run with:  npx tsx scripts/capture-template-previews.ts
 *
 * Requires the dev server running at http://localhost:3001 (`npm run dev`).
 */

import { mkdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { prisma } from '../src/lib/db';
import { ARCHETYPE_LIST, STARTER_SETS } from '../src/site/archetypes';
import { createSiteContentFromArchetype } from '../src/site/archetypes/compose';

const BASE_URL = 'http://localhost:3001';
const THROWAWAY_EMAIL = 'internal-preview-capture@local.test';
const THROWAWAY_PASSWORD = 'InternalPreviewCapture-2026!';
const THROWAWAY_NAME = 'Internal Preview Capture';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(scriptDir, '../public/template-previews');

interface CaptureJob {
  /** Output filename stem, e.g. "saas-devops" or "saas-blank". */
  slug: string;
  archetypeId: string;
  starterSetId: string | null;
}

async function ensureThrowawayUserSession(): Promise<{ userId: string; cookieHeader: string }> {
  // Sign up (or, if it already exists from a previous run, sign in) via
  // better-auth's REST API so we get a real, valid session cookie — the
  // preview route is behind `getActor()`, a real auth check.
  const authHeaders = { 'Content-Type': 'application/json', Origin: BASE_URL };

  const signUpRes = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      name: THROWAWAY_NAME,
      email: THROWAWAY_EMAIL,
      password: THROWAWAY_PASSWORD,
    }),
  });

  let res = signUpRes;
  if (!signUpRes.ok) {
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
  // Node's fetch folds multiple Set-Cookie headers into one string joined by
  // ", " in some runtimes; better-auth typically sends a single session
  // cookie here, so just take the first `name=value` segment of each part.
  const cookieHeader = setCookie
    .split(/,(?=[^;]+?=)/)
    .map((part) => part.split(';')[0].trim())
    .join('; ');

  const user = await prisma.user.findUniqueOrThrow({ where: { email: THROWAWAY_EMAIL } });
  return { userId: user.id, cookieHeader };
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  const jobs: CaptureJob[] = [];
  for (const arch of ARCHETYPE_LIST) {
    jobs.push({ slug: `${arch.id}-blank`, archetypeId: arch.id, starterSetId: null });
  }
  for (const starterSet of Object.values(STARTER_SETS)) {
    jobs.push({ slug: starterSet.id, archetypeId: starterSet.archetype, starterSetId: starterSet.id });
  }

  console.log(`Planned ${jobs.length} captures.`);

  const { userId, cookieHeader } = await ensureThrowawayUserSession();
  console.log(`Using throwaway user ${THROWAWAY_EMAIL} (${userId}).`);

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1200 },
      extraHTTPHeaders: { Cookie: cookieHeader },
    });
    const page = await context.newPage();

    for (const job of jobs) {
      const content = createSiteContentFromArchetype(job.archetypeId as never, job.starterSetId);

      const project = await prisma.project.create({
        data: {
          name: `[preview-capture] ${job.slug}`,
          templateId: `archetype:${job.archetypeId}${job.starterSetId ? `:${job.starterSetId}` : ''}`,
          mode: content.mode,
          themeId: content.themeId,
          content: JSON.stringify(content),
          status: 'draft',
          ownerId: userId,
        },
      });

      try {
        await page.goto(`${BASE_URL}/preview/project/${project.id}`, { waitUntil: 'networkidle' });
        await page.waitForSelector('main', { timeout: 15000 });

        const outPath = resolve(outDir, `${job.slug}.jpg`);
        await page.screenshot({ path: outPath, fullPage: true, type: 'jpeg', quality: 80 });

        const { size } = statSync(outPath);
        console.log(`Captured ${job.slug} -> public/template-previews/${job.slug}.jpg (${(size / 1024).toFixed(0)} KB)`);
      } finally {
        await prisma.project.delete({ where: { id: project.id } });
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }

  await prisma.user.delete({ where: { id: userId } });
  console.log('Cleaned up throwaway user. Done.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
