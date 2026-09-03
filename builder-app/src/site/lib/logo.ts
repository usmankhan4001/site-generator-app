/**
 * Real company logos, fetched live by domain — no scraping, no stored
 * assets, no license needed. Clearbit's public logo endpoint is the
 * long-standing free convention for exactly this "trusted by" use case;
 * it needs no API key. Callers must handle the image failing to load
 * (a domain with no logo, or the service being unreachable) — never
 * treat this URL as guaranteed to resolve.
 */
export function resolveLogoUrl(domain: string, size = 128): string {
  const clean = domain.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return `https://logo.clearbit.com/${clean}?size=${size}`;
}
