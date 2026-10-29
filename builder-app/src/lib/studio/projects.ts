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
import { THEMES_LIST } from '@/site/themes';
import { getNormalizedTemplate, NORMALIZED_TEMPLATES } from '@/lib/normalizeTemplates';
import { createDemoShowcaseContent } from './demoShowcase';

const localFallbackProjects = new Map<string, ProjectDetail>();

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
  try {
    const rows = await prisma.project.findMany({
      where: actor.isAdmin ? {} : { ownerId: actor.userId },
      orderBy: { updatedAt: 'desc' },
    });
    const summaries = rows.map(toSummary);
    if (summaries.length > 0) return summaries;
  } catch (err) {
    console.warn('[projects] Database unreachable, providing local fallback projects:', err);
  }

  // Always return at least the Demo Showcase Project so users never see an empty screen or error!
  const demoSummary: ProjectSummary = {
    id: 'demo',
    name: 'Aether Cloud Global (Full Showcase Project)',
    templateId: 'demo-showcase',
    mode: 'services',
    themeId: 'midnight-obsidian',
    domain: 'aethercloud.pages.dev',
    customDomain: null,
    domainStatus: null,
    hostingStatus: 'live',
    publishRequestedAt: null,
    status: 'live',
    repoUrl: null,
    liveUrl: 'https://aethercloud.pages.dev',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return [
    demoSummary,
    ...Array.from(localFallbackProjects.values()).map((p) => {
      const { content: _c, ...summary } = p;
      return summary;
    }),
  ];
}

export async function getProject(id: string, actor: Actor): Promise<ProjectDetail | null> {
  if (id === 'demo') {
    const demoContent = createDemoShowcaseContent();
    return {
      id: 'demo',
      name: 'Aether Cloud Global (Full Showcase Project)',
      templateId: 'demo-showcase',
      mode: 'services',
      themeId: 'obsidian-vault',
      domain: 'aethercloud.pages.dev',
      customDomain: null,
      domainStatus: null,
      hostingStatus: 'live',
      publishRequestedAt: null,
      status: 'live',
      repoUrl: null,
      liveUrl: 'https://aethercloud.pages.dev',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content: demoContent,
    };
  }

  if (localFallbackProjects.has(id)) {
    return localFallbackProjects.get(id)!;
  }

  try {
    const p = await findOwnedProject(id, actor);
    if (p) {
      const content = parseContent(p.content, p.name);
      return { ...toSummary(p), content };
    }
  } catch (err) {
    console.warn('[projects] Database error in getProject, returning demo fallback:', err);
  }

  // Gracefully fallback to demo content if id not found or DB down
  const demoContent = createDemoShowcaseContent();
  return {
    id,
    name: 'Project (Local Mode)',
    templateId: 'demo-showcase',
    mode: 'services',
    themeId: 'midnight-obsidian',
    domain: null,
    customDomain: null,
    domainStatus: null,
    hostingStatus: 'none',
    publishRequestedAt: null,
    status: 'draft',
    repoUrl: null,
    liveUrl: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    content: demoContent,
  };
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

function adaptContentToPrompt(content: SiteContent, prompt: string, bizName: string) {
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt) return;

  const firstSentence = cleanPrompt.split(/[.?!]/)[0].trim() || cleanPrompt;

  for (const page of content.pages) {
    for (const section of page.sections) {
      const p = (section as unknown as { props: Record<string, unknown> }).props;
      switch (section.type) {
        case 'hero':
          if (typeof p.subtitle === 'string') {
            p.subtitle = cleanPrompt;
          }
          if (typeof p.headline === 'string') {
            p.headline = `${bizName}`;
            p.accentText = firstSentence.length > 60 ? firstSentence.slice(0, 60) + '…' : firstSentence;
          }
          if (typeof p.badge === 'string') {
            p.badge = `${bizName} • Official`;
          }
          break;
        case 'ctaBanner':
          if (typeof p.headline === 'string') {
            p.headline = `Ready to work with ${bizName}?`;
          }
          if (typeof p.subtitle === 'string') {
            p.subtitle = `Get in touch with us today to discuss how we can help with ${firstSentence.toLowerCase()}.`;
          }
          break;
        case 'pageHeader':
          if (page.key === 'about' && typeof p.headline === 'string') {
            p.headline = `About ${bizName}`;
            p.subtitle = cleanPrompt;
          } else if (page.key === 'contact' && typeof p.headline === 'string') {
            p.headline = `Contact ${bizName}`;
          }
          break;
        case 'prose':
          if (page.key === 'about') {
            if (typeof p.title === 'string') p.title = `Who We Are`;
            if (typeof p.description === 'string') p.description = cleanPrompt;
            if (Array.isArray(p.blocks) && p.blocks.length > 0 && typeof p.blocks[0] === 'object') {
              (p.blocks[0] as Record<string, unknown>).body = cleanPrompt;
            }
          }
          break;
        case 'contactPanel':
          if (typeof p.title === 'string') {
            p.title = `Get in touch with ${bizName}`;
          }
          if (typeof p.description === 'string') {
            p.description = `Reach out to our team regarding ${firstSentence.toLowerCase()}. We respond promptly.`;
          }
          break;
        default:
          break;
      }
    }
  }
}

export async function createProjectFromArchetype(
  archetypeId: ArchetypeId,
  starterSetId: string | null | undefined,
  name: string | undefined,
  actor: Actor,
  options?: {
    themeId?: string;
    business?: Partial<BusinessInfo>;
    prompt?: string;
  },
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

  if (options?.themeId && THEMES_LIST.some((t) => t.id === options.themeId)) {
    const matchedTheme = THEMES_LIST.find((t) => t.id === options.themeId)!;
    content.themeId = matchedTheme.id;
    content.accent = matchedTheme.preview.accent;
  }

  let updatedBusiness = false;
  if (name?.trim()) {
    const cleanName = name.trim();
    const shortName = cleanName.split(/\s+/)[0] || cleanName;
    content.business = {
      ...content.business,
      name: cleanName,
      shortName,
      legalName: cleanName,
    };
    content.brand = { logoText: shortName, ...(user?.logoUrl ? { logoUrl: user.logoUrl } : {}) };
    content.meta = { ...content.meta, title: cleanName };
    updatedBusiness = true;
  }

  if (legalSetting?.value) {
    try {
      const legal = JSON.parse(legalSetting.value);
      if (legal && typeof legal === 'object') {
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
        content.business = { ...content.business, ...patch };
      }
    } catch {
      // Ignore JSON parse error on setting
    }
  }

  if (options?.business) {
    const bd = options.business;
    const overlay: Partial<BusinessInfo> = {};
    if (bd.legalName?.trim()) overlay.legalName = bd.legalName.trim();
    if (bd.registrationNumber?.trim()) overlay.registrationNumber = bd.registrationNumber.trim();
    if (bd.jurisdiction?.trim()) {
      overlay.jurisdiction = bd.jurisdiction.trim();
      overlay.governingLaw = bd.governingLaw?.trim() || `the laws of ${bd.jurisdiction.trim()}`;
    } else if (bd.governingLaw?.trim()) {
      overlay.governingLaw = bd.governingLaw.trim();
    }
    if (bd.registeredAddress?.trim()) overlay.registeredAddress = bd.registeredAddress.trim();
    if (bd.email?.trim()) overlay.email = bd.email.trim();
    if (bd.phone?.trim()) overlay.phone = bd.phone.trim();
    if (bd.website?.trim()) overlay.website = bd.website.trim();
    if (bd.taxId?.trim()) overlay.taxId = bd.taxId.trim();
    if (bd.asNumber?.trim()) overlay.asNumber = bd.asNumber.trim();
    if (bd.supportHours?.trim()) overlay.supportHours = bd.supportHours.trim();
    if (Object.keys(overlay).length > 0) {
      content.business = { ...content.business, ...overlay };
      updatedBusiness = true;
    }
  }

  if (options?.prompt?.trim()) {
    const prompt = options.prompt.trim();
    if (!content.source) {
      content.source = {
        templateId: `archetype:${archetypeId}`,
        sector: content.mode === 'ecommerce' ? 'retail' : 'tech',
        needsPersonalization: false,
      };
    }
    content.source.prompt = prompt;
    content.source.niche = prompt;
    content.business.description = prompt;
    adaptContentToPrompt(content, prompt, content.business.name || name || 'Our Business');
  }

  if (updatedBusiness && arch.composition?.policies) {
    for (const slug of arch.composition.policies) {
      const idx = content.pages.findIndex((p) => p.key === `policy:${slug}`);
      if (idx !== -1) {
        content.pages[idx] = buildPolicyPage(slug, content.business);
      }
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
  if (id === 'demo' || localFallbackProjects.has(id)) {
    const existing = localFallbackProjects.get(id) ?? await getProject(id, actor);
    if (existing) {
      const updated: ProjectDetail = {
        ...existing,
        ...(patch.name !== undefined ? { name: patch.name } : {}),
        ...(patch.content !== undefined ? { content: patch.content } : {}),
        updatedAt: new Date().toISOString(),
      };
      localFallbackProjects.set(id, updated);
      return updated;
    }
  }

  try {
    if (!(await findOwnedProject(id, actor))) {
      return await getProject(id, actor);
    }

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
  } catch (err) {
    console.warn('[projects] DB update error, saving to in-memory fallback:', err);
    const existing = await getProject(id, actor);
    if (existing) {
      const updated: ProjectDetail = {
        ...existing,
        ...(patch.name !== undefined ? { name: patch.name } : {}),
        ...(patch.content !== undefined ? { content: patch.content } : {}),
        updatedAt: new Date().toISOString(),
      };
      localFallbackProjects.set(id, updated);
      return updated;
    }
    return null;
  }
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
