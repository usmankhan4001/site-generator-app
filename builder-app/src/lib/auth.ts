/**
 * Better Auth server instance.
 *
 * Email + password only for now (invite-only — no public sign-up page yet).
 * Reuses the hot-reload-safe Prisma singleton from `@/lib/db`.
 */

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { prisma } from '@/lib/db';

const isProduction = process.env.NODE_ENV === 'production';

const staticTrustedOrigins = [
  // Localhost on any port
  'http://localhost:*',
  'https://localhost:*',
  // Loopback IPv4 on any port
  'http://127.0.0.1:*',
  'https://127.0.0.1:*',
  // Loopback IPv6 on any port
  'http://[::1]:*',
  'https://[::1]:*',
  // Zero IP
  'http://0.0.0.0:*',
  'https://0.0.0.0:*',
  // Subdomains of localhost & local
  'http://*.localhost:*',
  'https://*.localhost:*',
  'http://*.local:*',
  'https://*.local:*',
  // Private / LAN IPs (IPv4)
  'http://192.168.*:*',
  'https://192.168.*:*',
  'http://10.*:*',
  'https://10.*:*',
  'http://172.*:*',
  'https://172.*:*',
  // Explicit common ports (without wildcards)
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
  'http://127.0.0.1:5173',
];

/**
 * Resolves all trusted origins dynamically based on the incoming request,
 * environment variables, and local development wildcard patterns.
 */
export function resolveTrustedOrigins(request?: Request): string[] {
  const origins = new Set<string>(staticTrustedOrigins);

  if (process.env.BETTER_AUTH_URL) {
    try {
      origins.add(new URL(process.env.BETTER_AUTH_URL).origin);
    } catch {
      origins.add(process.env.BETTER_AUTH_URL);
    }
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    try {
      origins.add(new URL(process.env.NEXT_PUBLIC_APP_URL).origin);
    } catch {
      origins.add(process.env.NEXT_PUBLIC_APP_URL);
    }
  }

  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }

  if (process.env.BETTER_AUTH_TRUSTED_ORIGINS) {
    process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(',').forEach((o) => {
      const trimmed = o.trim();
      if (trimmed) origins.add(trimmed);
    });
  }

  if (request && typeof request.headers?.get === 'function') {
    const origin = request.headers.get('origin');
    if (origin && origin !== 'null') {
      origins.add(origin);
    }

    const referer = request.headers.get('referer');
    if (referer) {
      try {
        origins.add(new URL(referer).origin);
      } catch {
        // ignore malformed referer
      }
    }

    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    if (host) {
      const proto =
        request.headers.get('x-forwarded-proto') || (isProduction ? 'https' : 'http');
      origins.add(`${proto}://${host}`);
    }
  }

  return Array.from(origins);
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'sqlite' }),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  trustedOrigins: async (request) => resolveTrustedOrigins(request),
  advanced: {
    useSecureCookies: isProduction,
    defaultCookieAttributes: {
      sameSite: 'lax',
      secure: isProduction,
      path: '/',
      httpOnly: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  user: {
    additionalFields: {
      // App-level role. Never client-settable; seeded by the create hook below.
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
        input: false,
      },
      // Set by the onboarding flow once the user finishes it.
      onboardingCompletedAt: {
        type: 'date',
        required: false,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Promote the configured super-admin email to `role: 'admin'` on the
        // very first sign-up; everyone else is a plain `user`.
        before: async (user) => {
          const email = user.email?.trim().toLowerCase() ?? user.email;
          const superAdmin = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
          const role = superAdmin && email === superAdmin ? 'admin' : 'user';
          return { data: { ...user, email, role } };
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type Auth = typeof auth;
