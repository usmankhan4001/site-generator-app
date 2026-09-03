/**
 * Serialise a `SiteContent` object into the source of `src/content/site.ts` —
 * the file baked into every generated site (and checked in to `template/` as a
 * sample). Kept dependency-free so the Phase-3 assembler can call it directly.
 */

import type { SiteContent } from '@/site/schema';

export function siteContentToModule(content: SiteContent): string {
  const json = JSON.stringify(content, null, 2);
  return `/**
 * Generated site content — the single data object this website renders from.
 * Produced by the Airwallex Site Cloner studio. Edit in the studio, not here.
 */
import type { SiteContent } from '@/site/schema';

export const SITE: SiteContent = ${json} as const satisfies SiteContent;

export default SITE;
`;
}
