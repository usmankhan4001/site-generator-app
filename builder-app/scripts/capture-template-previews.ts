/**
 * scripts/capture-template-previews.ts
 *
 * One-off capture script (not part of the app). For every archetype (blank,
 * `starterSetId: null`) and every starter set (including rich turnkey flagship
 * templates: legal_corporate, luxury_fashion_dtc, construction_engineering,
 * modern_saas_pro, mega_electronics_store, and all niche starter packs), creates
 * a throwaway `Project` row, screenshots its `/preview/project/[id]` render with
 * headless Chromium, and saves the JPEG to `public/template-previews/` and `public/previews/`.
 *
 * Run with:  npx tsx scripts/capture-template-previews.ts
 *
 * Requires the dev server running at http://localhost:3001 (`npm run dev`).
 */

import { mkdirSync, statSync, copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { prisma } from '../src/lib/db';
import { ARCHETYPE_LIST, STARTER_SET_LIST, STARTER_SETS } from '../src/site/archetypes';
import { createSiteContentFromArchetype } from '../src/site/archetypes/compose';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const THROWAWAY_EMAIL = 'internal-preview-capture@local.test';
const THROWAWAY_PASSWORD = 'InternalPreviewCapture-2026!';
const THROWAWAY_NAME = 'Internal Preview Capture';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const templatePreviewsDir = resolve(scriptDir, '../public/template-previews');
const previewsDir = resolve(scriptDir, '../public/previews');

interface CaptureJob {
  /** Output filename stem, e.g. "legal_corporate", "saas-devops", or "saas-blank". */
  slug: string;
  archetypeId: string;
  starterSetId: string | null;
  /** Optional secondary aliases to copy preview image to */
  aliases?: string[];
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

export function getCaptureJobs(): CaptureJob[] {
  const jobs: CaptureJob[] = [];

  // Blank canvas archetypes
  for (const arch of ARCHETYPE_LIST) {
    jobs.push({
      slug: `${arch.id}-blank`,
      archetypeId: arch.id,
      starterSetId: null,
      aliases: [arch.id],
    });
  }

  // All turnkey & niche starter sets
  for (const starterSet of STARTER_SET_LIST) {
    const aliases: string[] = [];
    if (starterSet.id.includes('_')) {
      aliases.push(starterSet.id.replace(/_/g, '-'));
      aliases.push(`${starterSet.archetype}-${starterSet.id.replace(/_/g, '-')}`);
    }

    // Include registered aliases from STARTER_SETS dictionary
    for (const [key, val] of Object.entries(STARTER_SETS)) {
      if (val.id === starterSet.id && key !== starterSet.id && !aliases.includes(key)) {
        aliases.push(key);
      }
    }

    jobs.push({
      slug: starterSet.id,
      archetypeId: starterSet.archetype,
      starterSetId: starterSet.id,
      aliases,
    });
  }

  return jobs;
}

async function main() {
  mkdirSync(templatePreviewsDir, { recursive: true });
  mkdirSync(previewsDir, { recursive: true });

  const jobs = getCaptureJobs();
  console.log(`Planned ${jobs.length} template preview captures (writing to public/template-previews/ and public/previews/).`);

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

        const outPath = resolve(templatePreviewsDir, `${job.slug}.jpg`);
        await page.screenshot({ path: outPath, fullPage: true, type: 'jpeg', quality: 80 });

        const previewPath = resolve(previewsDir, `${job.slug}.jpg`);
        copyFileSync(outPath, previewPath);

        if (job.aliases) {
          for (const alias of job.aliases) {
            copyFileSync(outPath, resolve(templatePreviewsDir, `${alias}.jpg`));
            copyFileSync(outPath, resolve(previewsDir, `${alias}.jpg`));
          }
        }

        const { size } = statSync(outPath);
        console.log(`Captured ${job.slug} -> public/template-previews/${job.slug}.jpg & public/previews/${job.slug}.jpg (${(size / 1024).toFixed(0)} KB)`);
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

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main()
    .catch((err) => {
      console.error(err);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
