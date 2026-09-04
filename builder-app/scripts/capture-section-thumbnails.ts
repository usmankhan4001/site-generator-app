/**
 * scripts/capture-section-thumbnails.ts
 *
 * Captures one thumbnail JPEG per `SectionType`, for the studio's visual
 * "+ Add section" picker. Builds a single throwaway `Project` whose home page
 * holds every section type at once (with representative sample content so
 * list-backed sections don't render empty), loads its `/preview/project/[id]`
 * once, then screenshots each `[data-section-type="…"]` element individually.
 *
 * Run with:  npx tsx scripts/capture-section-thumbnails.ts
 *
 * Requires the dev server running at http://localhost:3001 (`npm run dev`).
 */

import { mkdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { prisma } from '../src/lib/db';
import { SECTION_TYPES, type Section, type SectionType } from '../src/site/schema';
import { createSiteContentFromArchetype } from '../src/site/archetypes/compose';
import { defaultPropsFor } from '../src/site/sections/defaults';

const BASE_URL = 'http://localhost:3001';
const THROWAWAY_EMAIL = 'internal-section-thumbs@local.test';
const THROWAWAY_PASSWORD = 'InternalSectionThumbs-2026!';
const THROWAWAY_NAME = 'Internal Section Thumbnail Capture';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(scriptDir, '../public/section-thumbs');

/**
 * Sample props for list/array-backed section types. `defaultPropsFor()`
 * deliberately returns empty arrays (`items: []`, `tiers: []`, …) as a blank
 * starting point for real project editing — several section components
 * early-return `null` on an empty array, which would produce a blank
 * thumbnail. These overrides give each a few short, generic, archetype-
 * neutral sample entries purely so the picker shows the section's real
 * layout. Any type not listed here falls back to `defaultPropsFor()`.
 */
const THUMBNAIL_SAMPLE_PROPS: Partial<Record<SectionType, Record<string, unknown>>> = {
  statsBar: {
    items: [
      { value: '128%', label: 'YoY growth' },
      { value: '99.9%', label: 'Uptime' },
      { value: '4.2s', label: 'Avg. response' },
    ],
  },
  trustBar: {
    variant: 'pills',
    title: 'Trusted by teams at',
    items: ['Acme Co', 'Globex', 'Initech', 'Umbrella'],
  },
  featureGrid: {
    eyebrow: 'Capabilities',
    title: 'Built for speed',
    description: 'A short supporting line.',
    items: [
      { title: 'Feature one', description: 'A short supporting line.' },
      { title: 'Feature two', description: 'A short supporting line.' },
      { title: 'Feature three', description: 'A short supporting line.' },
    ],
  },
  pricingTiers: {
    title: 'Pricing',
    currency: 'USD',
    tiers: [
      {
        id: 'starter',
        name: 'Starter',
        price: 29,
        priceUnit: '/mo',
        description: 'For small teams.',
        features: ['Feature A', 'Feature B'],
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 79,
        priceUnit: '/mo',
        description: 'For growing teams.',
        features: ['Feature A', 'Feature B', 'Feature C'],
        popular: true,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 0,
        description: 'Custom needs.',
        features: ['Everything in Pro', 'Dedicated support'],
      },
    ],
  },
  productGrid: {
    title: 'Catalogue',
    layout: 'products',
    items: [
      { id: 'p1', name: 'Product one', price: 49, description: 'A short supporting line.', features: [] },
      { id: 'p2', name: 'Product two', price: 69, description: 'A short supporting line.', features: [] },
      { id: 'p3', name: 'Product three', price: 89, description: 'A short supporting line.', features: [] },
    ],
  },
  testimonials: {
    title: 'What clients say',
    items: [
      { name: 'Jordan Lee', role: 'Operations Lead', text: 'A short supporting quote about the experience.' },
      { name: 'Casey Kim', role: 'Founder', text: 'A short supporting quote about the experience.' },
    ],
  },
  faq: {
    title: 'FAQ',
    items: [
      { q: 'A short question?', a: 'A short supporting answer.' },
      { q: 'Another question?', a: 'A short supporting answer.' },
    ],
  },
  teamGrid: {
    title: 'Leadership',
    members: [
      { name: 'Jordan Lee', role: 'CEO', bio: 'A short supporting bio line.' },
      { name: 'Casey Kim', role: 'CTO', bio: 'A short supporting bio line.' },
    ],
  },
  valueGrid: {
    title: 'Our principles',
    items: [
      { icon: 'ShieldCheck', title: 'Value one', description: 'A short supporting line.' },
      { icon: 'Zap', title: 'Value two', description: 'A short supporting line.' },
      { icon: 'Users', title: 'Value three', description: 'A short supporting line.' },
    ],
  },
  processSteps: {
    title: 'How we work',
    steps: [
      { step: '01', title: 'Discover', description: 'A short supporting line.' },
      { step: '02', title: 'Build', description: 'A short supporting line.' },
      { step: '03', title: 'Launch', description: 'A short supporting line.' },
    ],
  },
  slaTable: {
    title: 'Service levels',
    rows: [
      { metric: 'Uptime', commitment: '99.9%', description: 'A short supporting line.' },
      { metric: 'Response time', commitment: '< 1 hour', description: 'A short supporting line.' },
    ],
  },
  locationList: {
    title: 'Locations',
    locations: ['Singapore', 'London', 'New York'],
  },
  timeline: {
    title: 'Milestones',
    milestones: [
      { year: '2022', title: 'Founded', description: 'A short supporting line.' },
      { year: '2023', title: 'Series A', description: 'A short supporting line.' },
      { year: '2024', title: 'Global launch', description: 'A short supporting line.' },
    ],
  },
};

function samplePropsFor(type: SectionType): Record<string, unknown> {
  return THUMBNAIL_SAMPLE_PROPS[type] ?? defaultPropsFor(type);
}

async function ensureThrowawayUserSession(): Promise<{ userId: string; cookieHeader: string }> {
  // Same pattern as scripts/capture-template-previews.ts — sign up (or, if it
  // already exists from a previous run, sign in) via better-auth's REST API
  // so we get a real session cookie for the auth-gated preview route.
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
  const cookieHeader = setCookie
    .split(/,(?=[^;]+?=)/)
    .map((part) => part.split(';')[0].trim())
    .join('; ');

  const user = await prisma.user.findUniqueOrThrow({ where: { email: THROWAWAY_EMAIL } });
  return { userId: user.id, cookieHeader };
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  const content = createSiteContentFromArchetype('saas', null);
  const home = content.pages.find((p) => p.key === 'home');
  if (!home) throw new Error('saas archetype produced no "home" page.');

  home.sections = SECTION_TYPES.map(
    (type) =>
      ({
        id: type,
        enabled: true,
        type,
        props: samplePropsFor(type),
      }) as unknown as Section,
  );

  console.log(`Planned ${SECTION_TYPES.length} section thumbnails.`);

  const { userId, cookieHeader } = await ensureThrowawayUserSession();
  console.log(`Using throwaway user ${THROWAWAY_EMAIL} (${userId}).`);

  const browser = await chromium.launch();
  let project: { id: string } | null = null;
  try {
    project = await prisma.project.create({
      data: {
        name: '[section-thumb-capture] all-types',
        templateId: 'internal:section-thumbnails',
        mode: content.mode,
        themeId: content.themeId,
        content: JSON.stringify(content),
        status: 'draft',
        ownerId: userId,
      },
    });

    const context = await browser.newContext({
      viewport: { width: 1440, height: 1200 },
      extraHTTPHeaders: { Cookie: cookieHeader },
    });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/preview/project/${project.id}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('main', { timeout: 15000 });

    let ok = 0;
    for (const type of SECTION_TYPES) {
      try {
        const locator = page.locator(`[data-section-type="${type}"]`).first();
        const outPath = resolve(outDir, `${type}.jpg`);
        await locator.screenshot({ path: outPath, type: 'jpeg', quality: 82 });

        const { size } = statSync(outPath);
        console.log(`Captured ${type} -> public/section-thumbs/${type}.jpg (${(size / 1024).toFixed(1)} KB)`);
        ok++;
      } catch (err) {
        console.warn(`Skipping ${type}: ${(err as Error).message}`);
      }
    }

    console.log(`Done: ${ok}/${SECTION_TYPES.length} thumbnails captured.`);

    await context.close();
  } finally {
    if (project) {
      await prisma.project.delete({ where: { id: project.id } });
    }
    await browser.close();
    await prisma.user.delete({ where: { id: userId } });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
