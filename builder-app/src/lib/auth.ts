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

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'sqlite' }),
  emailAndPassword: {
    enabled: true,
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
