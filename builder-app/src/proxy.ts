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

  // Never intercept auth endpoints, public assets, or sign-in/sign-up pages to prevent loops
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/_next') ||
    pathname.includes('/favicon.') ||
    pathname.includes('/icon.')
  ) {
    return NextResponse.next();
  }

  // Clone headers and ensure host, proto, and cookies are explicitly forwarded to Better Auth
  const reqHeaders = new Headers(request.headers);
  if (!reqHeaders.has('host')) {
    reqHeaders.set('host', request.nextUrl.host);
  }
  if (!reqHeaders.has('x-forwarded-proto')) {
    reqHeaders.set('x-forwarded-proto', request.nextUrl.protocol.replace(':', ''));
  }
  if (!reqHeaders.has('x-forwarded-host')) {
    reqHeaders.set('x-forwarded-host', request.nextUrl.host);
  }

  // Fallback: If cookie header was omitted from Headers, extract from request.cookies
  if (!reqHeaders.get('cookie')) {
    const allCookies = request.cookies.getAll();
    if (allCookies.length > 0) {
      reqHeaders.set('cookie', allCookies.map((c) => `${c.name}=${c.value}`).join('; '));
    }
  }

  let session: Awaited<ReturnType<typeof auth.api.getSession>> | null = null;
  try {
    session = await auth.api.getSession({ headers: reqHeaders });
  } catch (error) {
    console.error('[Proxy] Failed to retrieve auth session:', error);
    session = null;
  }

  if (!session) {
    const redirectTarget = pathname === '/sign-in' ? '/' : pathname;
    const signInUrl = new URL('/sign-in', request.url);
    if (redirectTarget && redirectTarget !== '/') {
      signInUrl.searchParams.set('redirect', redirectTarget);
    }
    return NextResponse.redirect(signInUrl);
  }

  const user = session.user as {
    onboardingCompletedAt?: Date | string | null;
    role?: string | null;
  };

  // Guard admin routes
  if (pathname.startsWith('/admin') && user.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Guard onboarding on dashboard root
  if (pathname === '/' && !user.onboardingCompletedAt) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.next();
}

export const middleware = proxy;
export default proxy;

export const config = {
  matcher: ['/', '/project/:path*', '/preview/project/:path*', '/onboarding', '/admin/:path*'],
};
