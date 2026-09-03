import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * Called by the just-signed-up invitee (not admin-gated). Marks the invite that
 * matches `token` as accepted, but only when it belongs to the signed-in user's
 * own email and hasn't been accepted or expired already.
 */
export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { token?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.token) {
    return NextResponse.json({ error: 'token is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: actor.userId },
    select: { email: true },
  });
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const invite = await prisma.invite.findUnique({ where: { token: body.token } });
  if (
    !invite ||
    invite.acceptedAt !== null ||
    invite.expiresAt.getTime() < Date.now() ||
    invite.email.toLowerCase() !== user.email.toLowerCase()
  ) {
    return NextResponse.json({ error: 'Invite is not valid' }, { status: 400 });
  }

  await prisma.invite.update({
    where: { id: invite.id },
    data: { acceptedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
