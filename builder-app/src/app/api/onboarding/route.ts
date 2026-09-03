import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface LegalDetailsPayload {
  entityName?: unknown;
  registrationNumber?: unknown;
  jurisdiction?: unknown;
  registeredAddress?: unknown;
  contactEmail?: unknown;
  contactPhone?: unknown;
}

interface OnboardingPayload {
  niche?: unknown;
  preferredMode?: unknown;
  targetAudience?: unknown;
  stylePref?: unknown;
  logoUrl?: unknown;
  brandColor?: unknown;
  existingUrl?: unknown;
  legal?: LegalDetailsPayload;
}

/** Trim a string-ish value; empty -> null so we don't persist blank strings. */
function clean(v: unknown): string | null {
  const s = typeof v === 'string' ? v.trim() : '';
  return s.length ? s : null;
}

/**
 * GET /api/onboarding — the signed-in user's saved questionnaire answers, so
 * a later "New site" flow can prefill the niche/mode question instead of
 * asking a returning user to retype what they already told us.
 */
export async function GET() {
  const actor = await getActor();
  if (!actor) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: actor.userId },
    select: { niche: true, preferredMode: true, stylePref: true },
  });
  return NextResponse.json({
    niche: user?.niche ?? null,
    preferredMode: user?.preferredMode ?? null,
    stylePref: user?.stylePref ?? null,
  });
}

/**
 * POST /api/onboarding — persists the questionnaire.
 *
 * The `User` model only has columns for niche / preferredMode / stylePref /
 * logoUrl / brandColor / existingUrl (+ onboardingCompletedAt), so those go
 * straight to their columns. The six legal fields (plus targetAudience) have no
 * schema home yet — Wave 3 will thread them into the created project's
 * `business` block — so they're stashed as a JSON blob in a `Setting` row keyed
 * `onboarding-legal:<userId>`.
 */
export async function POST(request: Request) {
  const actor = await getActor();
  if (!actor) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: OnboardingPayload;
  try {
    body = (await request.json()) as OnboardingPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const niche = clean(body.niche);
  if (!niche) {
    return NextResponse.json(
      { error: 'Tell us what your business does before continuing.' },
      { status: 400 },
    );
  }

  const preferredMode = body.preferredMode === 'ecommerce' ? 'ecommerce' : 'services';

  const legal = body.legal ?? {};
  const legalBlob = {
    entityName: clean(legal.entityName),
    registrationNumber: clean(legal.registrationNumber),
    jurisdiction: clean(legal.jurisdiction),
    registeredAddress: clean(legal.registeredAddress),
    contactEmail: clean(legal.contactEmail),
    contactPhone: clean(legal.contactPhone),
    targetAudience: clean(body.targetAudience),
  };

  await prisma.user.update({
    where: { id: actor.userId },
    data: {
      niche,
      preferredMode,
      stylePref: clean(body.stylePref),
      logoUrl: clean(body.logoUrl),
      brandColor: clean(body.brandColor),
      existingUrl: clean(body.existingUrl),
      onboardingCompletedAt: new Date(),
    },
  });

  const key = `onboarding-legal:${actor.userId}`;
  const value = JSON.stringify(legalBlob);
  await prisma.setting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  });

  return NextResponse.json({ ok: true });
}
