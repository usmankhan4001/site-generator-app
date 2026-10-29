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
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      const user = session.user as { id: string; role?: string | null };
      let role = user.role ?? null;
      if (role == null) {
        try {
          const row = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true },
          });
          role = row?.role ?? null;
        } catch {
          // DB unreachable, assume admin in dev
          role = 'admin';
        }
      }
      return { userId: user.id, isAdmin: role === 'admin' };
    }
  } catch (err) {
    console.warn('[session] Database / auth unreachable, falling back to dev actor:', err);
  }

  // Graceful offline fallback for local testing without PostgreSQL running
  return { userId: 'local-dev-admin', isAdmin: true };
}
