'use client';

import { createAuthClient } from 'better-auth/react';

function getClientBaseURL(): string | undefined {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || undefined;
}

export const authClient = createAuthClient({
  baseURL: getClientBaseURL(),
});
