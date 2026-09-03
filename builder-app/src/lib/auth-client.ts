'use client';

import { createAuthClient } from 'better-auth/react';

/**
 * Browser-side auth client. Talks to the `/api/auth/*` handler on the same
 * origin, so no `baseURL` is needed.
 */
export const authClient = createAuthClient();
