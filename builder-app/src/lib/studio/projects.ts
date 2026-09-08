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

export function normalizeSiteContent(input: unknown, fallbackName?: string): SiteContent {
  const obj = input && typeof input === 'object' ? (input as Record<string, any>) : {};

  // If input already has valid pages and business info, perform standard sanitization/normalization
  if (Array.isArray(obj.pages) && obj.pages.length > 0) {
    const bizName = String(obj.business?.name || obj.name || fallbackName || 'Untitled Business');
    const bizShort = String(obj.business?.shortName || obj.business?.name || obj.name || fallbackName || 'Business');

    const business: BusinessInfo = {
      name: bizName,
      shortName: bizShort,
      registrationNumber: String(obj.business?.registrationNumber || ''),
      jurisdiction: String(obj.business?.jurisdiction || 'Singapore'),
      governingLaw: String(obj.business?.governingLaw || 'the laws of Singapore'),
      registeredAddress: String(obj.business?.registeredAddress || ''),
      email: String(obj.business?.email || ''),
      phone: String(obj.business?.phone || ''),
      website: String(obj.business?.website || ''),
      taxId: obj.business?.taxId ? String(obj.business?.taxId) : undefined,
      asNumber: obj.business?.asNumber ? String(obj.business?.asNumber) : undefined,
      supportHours: obj.business?.supportHours ? String(obj.business?.supportHours) : undefined,
    };

    return {
      version: 1,
      business,
      mode: obj.mode === 'ecommerce' ? 'ecommerce' : 'services',
      themeId: typeof obj.themeId === 'string' && obj.themeId ? obj.themeId : 'indigo-enterprise',
      ...(obj.accent ? { accent: String(obj.accent) } : {}),
      ...(obj.layoutSystem ? { layoutSystem: obj.layoutSystem } : {}),
      ...(obj.archetype ? { archetype: obj.archetype } : {}),
      ...(obj.formspreeId ? { formspreeId: String(obj.formspreeId) } : {}),
      ...(obj.airwallexCheckoutUrl ? { airwallexCheckoutUrl: String(obj.airwallexCheckoutUrl) } : {}),
      brand: {
        logoText: String(obj.brand?.logoText || bizShort),
        ...(obj.brand?.logoUrl ? { logoUrl: String(obj.brand.logoUrl) } : {}),
      },
      nav: Array.isArray(obj.nav) && obj.nav.length > 0
        ? obj.nav
        : [{ label: 'Home', href: '/' }],
      ...(obj.headerCta ? { headerCta: obj.headerCta } : {}),
      ...(obj.header ? { header: obj.header } : {}),
      footer: obj.footer && typeof obj.footer === 'object'
        ? obj.footer
        : {
            columns: [],
            legalLinks: [],
            showLegalBar: true,
            showPaymentBadges: obj.mode === 'ecommerce',
          },
      pages: obj.pages.map((p: any, idx: number) => ({
        key: String(p?.key || `page-${idx}`),
        path: String(p?.path || (idx === 0 ? '/' : `/page-${idx}`)),
        title: String(p?.title || 'Page'),
        navLabel: p?.navLabel ? String(p.navLabel) : undefined,
        nav: typeof p?.nav === 'boolean' ? p.nav : false,
        sections: Array.isArray(p?.sections)
          ? p.sections.map((s: any, sIdx: number) => ({
              id: String(s?.id || `sec-${idx}-${sIdx}`),
              enabled: typeof s?.enabled === 'boolean' ? s.enabled : true,
              type: s?.type || 'prose',
              props: s?.props && typeof s.props === 'object' ? s.props : {},
            }))
          : [],
      })),
      meta: {
        title: String(obj.meta?.title || bizName),
        description: String(obj.meta?.description || ''),
        ...(obj.meta?.ogImage ? { ogImage: String(obj.meta.ogImage) } : {}),
      },
      source: obj.source && typeof obj.source === 'object'
        ? obj.source
        : {
            templateId: typeof obj.templateId === 'string' ? obj.templateId : 'archetype:saas',
            sector: obj.mode === 'ecommerce' ? 'retail' : 'tech',
            needsPersonalization: false,
          },
    };
  }

  // Fallback to default archetype content with business name preserved
  const archetypeId: ArchetypeId =
    obj.archetype && ARCHETYPES[obj.archetype as ArchetypeId]
      ? (obj.archetype as ArchetypeId)
      : obj.source?.archetype && ARCHETYPES[obj.source.archetype as ArchetypeId]
      ? (obj.source.archetype as ArchetypeId)
      : obj.mode === 'ecommerce'
      ? 'store'
      : 'saas';

  const starterSetId = typeof obj.source?.starterSetId === 'string' ? obj.source.starterSetId : null;
  const base = createSiteContentFromArchetype(archetypeId, starterSetId);

  const bizName = String(obj.business?.name || obj.name || fallbackName || base.business.name);
  const bizShort = String(obj.business?.shortName || obj.business?.name || obj.name || fallbackName || base.business.shortName);

  const business: BusinessInfo = {
    ...base.business,
    name: bizName,
    shortName: bizShort,
    ...(obj.business?.registrationNumber ? { registrationNumber: String(obj.business.registrationNumber) } : {}),
    ...(obj.business?.jurisdiction ? { jurisdiction: String(obj.business.jurisdiction) } : {}),
    ...(obj.business?.governingLaw ? { governingLaw: String(obj.business.governingLaw) } : {}),
    ...(obj.business?.registeredAddress ? { registeredAddress: String(obj.business.registeredAddress) } : {}),
    ...(obj.business?.email ? { email: String(obj.business.email) } : {}),
    ...(obj.business?.phone ? { phone: String(obj.business.phone) } : {}),
    ...(obj.business?.website ? { website: String(obj.business.website) } : {}),
    ...(obj.business?.taxId ? { taxId: String(obj.business.taxId) } : {}),
    ...(obj.business?.asNumber ? { asNumber: String(obj.business.asNumber) } : {}),
    ...(obj.business?.supportHours ? { supportHours: String(obj.business.supportHours) } : {}),
  };

  const pages = base.pages.map((page) => {
    if (page.key.startsWith('policy:')) {
      const slug = page.key.replace('policy:', '');
      return buildPolicyPage(slug, business);
    }
    return page;
  });

  return {
    ...base,
    business,
    mode: obj.mode === 'ecommerce' || obj.mode === 'services' ? obj.mode : base.mode,
    themeId: typeof obj.themeId === 'string' && obj.themeId ? obj.themeId : base.themeId,
    ...(obj.accent ? { accent: String(obj.accent) } : base.accent ? { accent: base.accent } : {}),
    brand: {
      logoText: String(obj.brand?.logoText || bizShort),
      ...(obj.brand?.logoUrl ? { logoUrl: String(obj.brand.logoUrl) } : base.brand.logoUrl ? { logoUrl: base.brand.logoUrl } : {}),
    },
    meta: {
      title: String(obj.meta?.title || bizName),
      description: String(obj.meta?.description || base.meta.description),
      ...(obj.meta?.ogImage ? { ogImage: String(obj.meta.ogImage) } : {}),
    },
    pages,
  };
}

export function parseContent(raw: string, fallbackName?: string): SiteContent {
  try {
    const c = JSON.parse(raw);
    if (c && typeof c === 'object' && Array.isArray(c.pages) && c.pages.length > 0) {
      return c as SiteContent;
    }
    return normalizeSiteContent(c, fallbackName);
  } catch {
    return normalizeSiteContent(null, fallbackName);
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
  const content = parseContent(p.content, p.name);
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

export async function createProjectFromContent(
  content: SiteContent,
  name: string | undefined,
  actor: Actor,
): Promise<ProjectDetail> {
  const existing = new Set(
    (await prisma.project.findMany({ where: { ownerId: actor.userId }, select: { name: true } })).map(
      (r) => r.name,
    ),
  );
  const finalName = uniqueName(
    name?.trim() || content.business?.name || 'My New Site',
    existing,
  );

  const cleanContent = JSON.parse(JSON.stringify(content)) as SiteContent;

  const p = await prisma.project.create({
    data: {
      name: finalName,
      templateId: content.source?.templateId || null,
      mode: cleanContent.mode || 'services',
      themeId: cleanContent.themeId || 'indigo-enterprise',
      domain: null,
      customDomain: null,
      domainStatus: null,
      hostingStatus: 'none',
      publishRequestedAt: null,
      content: JSON.stringify(cleanContent),
      status: 'draft',
      ownerId: actor.userId,
    },
  });
  return { ...toSummary(p), content: cleanContent };
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
  const content = parseContent(p.content, p.name);
  return { ...toSummary(p), content };
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
  const content = parseContent(p.content, p.name);
  return { ...toSummary(p), content };
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
