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

  // Never intercept auth API endpoints, Next internals, or static assets
  if (
    pathname.startsWith('/api/auth') ||
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

  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  if (!session) {
    if (isAuthPage) {
      return NextResponse.next();
    }
    const signInUrl = new URL('/sign-in', request.url);
    if (pathname && pathname !== '/') {
      signInUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(signInUrl);
  }

  // If an authenticated user visits /sign-in or /sign-up, redirect them to `?redirect=` or `/`
  if (isAuthPage) {
    const redirectParam = request.nextUrl.searchParams.get('redirect');
    const target =
      redirectParam &&
      redirectParam.startsWith('/') &&
      !redirectParam.startsWith('//') &&
      !redirectParam.startsWith('/sign-in') &&
      !redirectParam.startsWith('/sign-up')
        ? redirectParam
        : '/';
    return NextResponse.redirect(new URL(target, request.url));
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
    return NextResponse.redirect(new URL('/create', request.url));
  }

  return NextResponse.next();
}

export const middleware = proxy;
export default proxy;

export const config = {
  matcher: [
    '/',
    '/create',
    '/project/:path*',
    '/preview/project/:path*',
    '/admin/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
