/**
 * Server-side project data access. Used by the `/api/projects` routes and by
 * server components (dashboard, project preview). `Project.content` is a
 * JSON-serialised `SiteContent`.
 */

import { prisma } from '@/lib/db';
import type { BusinessInfo, SiteContent } from '@/site/schema';
import type { Actor } from '@/lib/session';
import type { ArchetypeId } from '@/site/archetypes/types';
import { ARCHETYPES, STARTER_SETS } from '@/site/archetypes';
import { createSiteContentFromArchetype } from '@/site/archetypes/compose';
import { buildPolicyPage } from '@/site/archetypes/policies';
import { getNormalizedTemplate, NORMALIZED_TEMPLATES } from '@/lib/normalizeTemplates';

export interface ProjectSummary {
  id: string;
  name: string;
  templateId: string | null;
  mode: string;
  themeId: string;
  domain: string | null;
  customDomain: string | null;
  domainStatus: string | null;
  hostingStatus: string;
  publishRequestedAt: string | null;
  status: string;
  repoUrl: string | null;
  liveUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetail extends ProjectSummary {
  content: SiteContent;
}

function toSummary(p: {
  id: string; name: string; templateId: string | null; mode: string;
  themeId: string; domain: string | null; customDomain?: string | null;
  domainStatus?: string | null; hostingStatus?: string;
  publishRequestedAt?: Date | null; status: string;
  repoUrl: string | null; liveUrl: string | null;
  createdAt: Date; updatedAt: Date;
}): ProjectSummary {
  return {
    id: p.id,
    name: p.name,
    templateId: p.templateId,
    mode: p.mode,
    themeId: p.themeId,
    domain: p.domain,
    customDomain: p.customDomain ?? null,
    domainStatus: p.domainStatus ?? null,
    hostingStatus: p.hostingStatus ?? 'none',
    publishRequestedAt: p.publishRequestedAt ? p.publishRequestedAt.toISOString() : null,
    status: p.status,
    repoUrl: p.repoUrl,
    liveUrl: p.liveUrl,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

function parseContent(raw: string): SiteContent | null {
  try {
    const c = JSON.parse(raw);
    return c && typeof c === 'object' && Array.isArray(c.pages) ? (c as SiteContent) : null;
  } catch {
    return null;
  }
}

/**
 * Look up a project the actor is allowed to touch. Admins see every project;
 * everyone else is scoped to the ones they own. Returns `null` both when the id
 * doesn't exist and when it belongs to someone else — callers must not
 * distinguish the two.
 */
async function findOwnedProject(id: string, actor: Actor) {
  return prisma.project.findFirst({
    where: { id, ...(actor.isAdmin ? {} : { ownerId: actor.userId }) },
  });
}

export async function listProjects(actor: Actor): Promise<ProjectSummary[]> {
  const rows = await prisma.project.findMany({
    where: actor.isAdmin ? {} : { ownerId: actor.userId },
    orderBy: { updatedAt: 'desc' },
  });
  return rows.map(toSummary);
}

export async function getProject(id: string, actor: Actor): Promise<ProjectDetail | null> {
  const p = await findOwnedProject(id, actor);
  if (!p) return null;
  const content = parseContent(p.content);
  if (!content) return null;
  return { ...toSummary(p), content };
}

function uniqueName(base: string, existing: Set<string>): string {
  if (!existing.has(base)) return base;
  let n = 2;
  while (existing.has(`${base} (${n})`)) n++;
  return `${base} (${n})`;
}

export async function createProjectFromTemplate(
  templateId: string,
  name: string | undefined,
  actor: Actor,
): Promise<ProjectDetail> {
  const content = getNormalizedTemplate(templateId);
  if (!content) throw new Error(`Unknown template: ${templateId}`);

  const existing = new Set(
    (await prisma.project.findMany({ where: { ownerId: actor.userId }, select: { name: true } })).map(
      (r) => r.name,
    ),
  );
  const finalName = uniqueName(
    name?.trim() || content.business.name || 'Untitled site',
    existing,
  );

  const p = await prisma.project.create({
    data: {
      name: finalName,
      templateId,
      mode: content.mode,
      themeId: content.themeId,
      domain: null,
      customDomain: null,
      domainStatus: null,
      hostingStatus: 'none',
      publishRequestedAt: null,
      content: JSON.stringify(content),
      status: 'draft',
      ownerId: actor.userId,
    },
  });
  return { ...toSummary(p), content };
}

export async function createProjectFromArchetype(
  archetypeId: ArchetypeId,
  starterSetId: string | null | undefined,
  name: string | undefined,
  actor: Actor,
): Promise<ProjectDetail> {
  const arch = ARCHETYPES[archetypeId];
  if (!arch) throw new Error(`Unknown archetype: ${archetypeId}`);

  let content = createSiteContentFromArchetype(archetypeId, starterSetId ?? null);

  // Check user profile and onboarding-legal Setting
  const [user, legalSetting] = await Promise.all([
    prisma.user.findUnique({
      where: { id: actor.userId },
      select: { brandColor: true, logoUrl: true },
    }),
    prisma.setting.findUnique({
      where: { key: `onboarding-legal:${actor.userId}` },
    }),
  ]);

  if (user?.brandColor) {
    content.accent = user.brandColor;
  }
  if (user?.logoUrl) {
    content.brand = { ...content.brand, logoUrl: user.logoUrl };
  }

  if (legalSetting?.value) {
    try {
      const legal = JSON.parse(legalSetting.value);
      if (legal && typeof legal === 'object') {
        let updatedBusiness = false;
        const patch: Partial<BusinessInfo> = {};
        if (legal.entityName && typeof legal.entityName === 'string' && legal.entityName.trim()) {
          patch.name = legal.entityName.trim();
          patch.shortName = legal.entityName.trim();
          content.brand.logoText = legal.entityName.trim();
          content.meta.title = legal.entityName.trim();
          updatedBusiness = true;
        }
        if (legal.registrationNumber && typeof legal.registrationNumber === 'string' && legal.registrationNumber.trim()) {
          patch.registrationNumber = legal.registrationNumber.trim();
          updatedBusiness = true;
        }
        if (legal.jurisdiction && typeof legal.jurisdiction === 'string' && legal.jurisdiction.trim()) {
          patch.jurisdiction = legal.jurisdiction.trim();
          patch.governingLaw = `the laws of ${legal.jurisdiction.trim()}`;
          updatedBusiness = true;
        }
        if (legal.registeredAddress && typeof legal.registeredAddress === 'string' && legal.registeredAddress.trim()) {
          patch.registeredAddress = legal.registeredAddress.trim();
          updatedBusiness = true;
        }
        if (legal.contactEmail && typeof legal.contactEmail === 'string' && legal.contactEmail.trim()) {
          patch.email = legal.contactEmail.trim();
          updatedBusiness = true;
        }
        if (legal.contactPhone && typeof legal.contactPhone === 'string' && legal.contactPhone.trim()) {
          patch.phone = legal.contactPhone.trim();
          updatedBusiness = true;
        }

        if (updatedBusiness) {
          content.business = { ...content.business, ...patch };
          if (arch.composition?.policies) {
            for (const slug of arch.composition.policies) {
              const idx = content.pages.findIndex((p) => p.key === `policy:${slug}`);
              if (idx !== -1) {
                content.pages[idx] = buildPolicyPage(slug, content.business);
              }
            }
          }
        }
      }
    } catch {
      // Ignore JSON parse error on setting
    }
  }

  // Ensure JSON clean serialization without undefined fields
  content = JSON.parse(JSON.stringify(content)) as SiteContent;

  const existing = new Set(
    (await prisma.project.findMany({ where: { ownerId: actor.userId }, select: { name: true } })).map(
      (r) => r.name,
    ),
  );
  const starterSet = starterSetId ? STARTER_SETS[starterSetId] : undefined;
  const defaultBaseName = starterSet?.name || arch.name || content.business.name || 'Untitled site';
  const finalName = uniqueName(
    name?.trim() || defaultBaseName,
    existing,
  );

  const p = await prisma.project.create({
    data: {
      name: finalName,
      templateId: `archetype:${archetypeId}${starterSetId ? `:${starterSetId}` : ''}`,
      mode: content.mode,
      themeId: content.themeId,
      domain: null,
      customDomain: null,
      domainStatus: null,
      hostingStatus: 'none',
      publishRequestedAt: null,
      content: JSON.stringify(content),
      status: 'draft',
      ownerId: actor.userId,
    },
  });
  return { ...toSummary(p), content };
}

export async function updateProject(
  id: string,
  patch: Partial<{
    name: string;
    domain: string | null;
    customDomain: string | null;
    domainStatus: string | null;
    hostingStatus: string;
    publishRequestedAt: Date | string | null;
    content: SiteContent;
    status: string;
  }>,
  actor: Actor,
): Promise<ProjectDetail | null> {
  if (!(await findOwnedProject(id, actor))) return null;

  const data: Record<string, unknown> = {};
  if (patch.name !== undefined) data.name = patch.name;
  if (patch.domain !== undefined) data.domain = patch.domain;
  if (patch.customDomain !== undefined) data.customDomain = patch.customDomain;
  if (patch.domainStatus !== undefined) data.domainStatus = patch.domainStatus;
  if (patch.hostingStatus !== undefined) data.hostingStatus = patch.hostingStatus;
  if (patch.publishRequestedAt !== undefined) {
    data.publishRequestedAt =
      patch.publishRequestedAt === null
        ? null
        : typeof patch.publishRequestedAt === 'string'
        ? new Date(patch.publishRequestedAt)
        : patch.publishRequestedAt;
  }
  if (patch.status !== undefined) data.status = patch.status;
  if (patch.content !== undefined) {
    data.content = JSON.stringify(patch.content);
    data.themeId = patch.content.themeId;
    data.mode = patch.content.mode;
  }
  const p = await prisma.project.update({ where: { id }, data });
  const content = parseContent(p.content);
  return content ? { ...toSummary(p), content } : null;
}

export async function duplicateProject(id: string, actor: Actor): Promise<ProjectDetail | null> {
  const src = await findOwnedProject(id, actor);
  if (!src) return null;
  const existing = new Set(
    (await prisma.project.findMany({ where: { ownerId: actor.userId }, select: { name: true } })).map(
      (r) => r.name,
    ),
  );
  const p = await prisma.project.create({
    data: {
      name: uniqueName(`${src.name} copy`, existing),
      templateId: src.templateId,
      mode: src.mode,
      themeId: src.themeId,
      domain: null,
      content: src.content,
      status: 'draft',
      ownerId: actor.userId,
    },
  });
  const content = parseContent(p.content);
  return content ? { ...toSummary(p), content } : null;
}

/** Returns `false` when the project doesn't exist or isn't the actor's. */
export async function deleteProject(id: string, actor: Actor): Promise<boolean> {
  if (!(await findOwnedProject(id, actor))) return false;
  await prisma.project.delete({ where: { id } });
  return true;
}

/** Template catalogue for the "new project" picker. */
export function listTemplateOptions() {
  return NORMALIZED_TEMPLATES.map((c) => ({
    id: c.source!.templateId,
    name: c.business.name,
    sector: c.source!.sector,
    mode: c.mode,
    themeId: c.themeId,
    accent: c.accent,
    description: c.meta.description,
    ogImage: c.meta.ogImage,
    needsPersonalization: c.source!.needsPersonalization,
  }));
}
