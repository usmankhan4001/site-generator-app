import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface OnboardingPayload {
  niche?: unknown;
  preferredMode?: unknown;
  stylePref?: unknown;
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
 * Only saves niche, preferredMode, and stylePref. Legal details are
 * deferred to the studio workspace.
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

  await prisma.user.update({
    where: { id: actor.userId },
    data: {
      niche,
      preferredMode,
      stylePref: clean(body.stylePref),
      onboardingCompletedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}
