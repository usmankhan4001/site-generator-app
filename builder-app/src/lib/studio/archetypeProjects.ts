/**
 * Bridge between the archetype composer and the studio's project layer.
 *
 * `buildProjectContentFromArchetype` is a thin wrapper over
 * `createSiteContentFromArchetype` that returns a JSON-ready `SiteContent`
 * (round-tripped through `JSON` so no `undefined` holes reach `JSON.stringify`
 * when the API persists `Project.content`).
 *
 * Wave 3 calls this from the real create-project API route + "new from
 * archetype" dialog; it deliberately does NOT touch `src/lib/studio/projects.ts`
 * (the template-backed path) so the two creation flows stay independent.
 */

import type { SiteContent } from '@/site/schema';
import type { ArchetypeId } from '@/site/archetypes/types';
import { createSiteContentFromArchetype } from '@/site/archetypes/compose';

export function buildProjectContentFromArchetype(
  archetypeId: ArchetypeId,
  starterSetId: string | null,
): SiteContent {
  const content = createSiteContentFromArchetype(archetypeId, starterSetId);
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}
