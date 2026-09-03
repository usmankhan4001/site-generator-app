/**
 * Server-side session helper. Wraps `auth.api.getSession` into a small `Actor`
 * shape used by the project data layer and API routes for per-user scoping.
 */

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export interface Actor {
  userId: string;
  isAdmin: boolean;
}

export async function getActor(): Promise<Actor | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  const user = session.user as { id: string; role?: string | null };
  let role = user.role ?? null;

  // Fallback: `role` is a better-auth `additionalField`, so depending on type
  // inference it may not be surfaced on the session user type. Read it straight
  // from the DB when it's missing.
  if (role == null) {
    const row = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });
    role = row?.role ?? null;
  }

  return { userId: user.id, isAdmin: role === 'admin' };
}
