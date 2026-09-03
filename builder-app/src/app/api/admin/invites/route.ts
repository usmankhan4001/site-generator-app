import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { getActor } from '@/lib/session';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function GET() {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!actor.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const invites = await prisma.invite.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({
    invites: invites.map((i) => ({
      id: i.id,
      email: i.email,
      token: i.token,
      invitedBy: i.invitedBy,
      expiresAt: i.expiresAt.toISOString(),
      createdAt: i.createdAt.toISOString(),
      acceptedAt: i.acceptedAt ? i.acceptedAt.toISOString() : null,
      accepted: i.acceptedAt !== null,
      url: `/sign-up?token=${i.token}`,
    })),
  });
}

export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!actor.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }

  const token = randomBytes(24).toString('base64url');
  const invite = await prisma.invite.create({
    data: {
      email,
      token,
      invitedBy: actor.userId,
      expiresAt: new Date(Date.now() + INVITE_TTL_MS),
    },
  });

  return NextResponse.json(
    {
      invite: {
        id: invite.id,
        email: invite.email,
        token: invite.token,
        url: `/sign-up?token=${invite.token}`,
      },
    },
    { status: 201 },
  );
}
