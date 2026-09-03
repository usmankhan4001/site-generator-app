import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';

/**
 * Next 16 renamed `middleware` -> `proxy`. Guards the authenticated surface of
 * the studio: every matched path needs a session, and the dashboard root also
 * requires a finished onboarding.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    const signIn = new URL('/sign-in?redirect=' + encodeURIComponent(pathname), request.url);
    return NextResponse.redirect(signIn);
  }

  const user = session.user as { onboardingCompletedAt?: Date | string | null };
  if (pathname === '/' && !user.onboardingCompletedAt) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/project/:path*', '/preview/project/:path*', '/onboarding', '/admin/:path*'],
};
