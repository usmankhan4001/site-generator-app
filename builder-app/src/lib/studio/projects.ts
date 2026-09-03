/**
 * Server-side project data access. Used by the `/api/projects` routes and by
 * server components (dashboard, project preview). `Project.content` is a
 * JSON-serialised `SiteContent`.
 */

import { prisma } from '@/lib/db';
import type { SiteContent } from '@/site/schema';
import { getNormalizedTemplate, NORMALIZED_TEMPLATES } from '@/lib/normalizeTemplates';

export interface ProjectSummary {
  id: string;
  name: string;
  templateId: string | null;
  mode: string;
  themeId: string;
  domain: string | null;
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
  themeId: string; domain: string | null; status: string;
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

export async function listProjects(): Promise<ProjectSummary[]> {
  const rows = await prisma.project.findMany({ orderBy: { updatedAt: 'desc' } });
  return rows.map(toSummary);
}

export async function getProject(id: string): Promise<ProjectDetail | null> {
  const p = await prisma.project.findUnique({ where: { id } });
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
  name?: string,
): Promise<ProjectDetail> {
  const content = getNormalizedTemplate(templateId);
  if (!content) throw new Error(`Unknown template: ${templateId}`);

  const existing = new Set((await prisma.project.findMany({ select: { name: true } })).map((r) => r.name));
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
      content: JSON.stringify(content),
      status: 'draft',
    },
  });
  return { ...toSummary(p), content };
}

export async function updateProject(
  id: string,
  patch: Partial<{ name: string; domain: string | null; content: SiteContent; status: string }>,
): Promise<ProjectDetail | null> {
  const data: Record<string, unknown> = {};
  if (patch.name !== undefined) data.name = patch.name;
  if (patch.domain !== undefined) data.domain = patch.domain;
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

export async function duplicateProject(id: string): Promise<ProjectDetail | null> {
  const src = await prisma.project.findUnique({ where: { id } });
  if (!src) return null;
  const existing = new Set((await prisma.project.findMany({ select: { name: true } })).map((r) => r.name));
  const p = await prisma.project.create({
    data: {
      name: uniqueName(`${src.name} copy`, existing),
      templateId: src.templateId,
      mode: src.mode,
      themeId: src.themeId,
      domain: null,
      content: src.content,
      status: 'draft',
    },
  });
  const content = parseContent(p.content);
  return content ? { ...toSummary(p), content } : null;
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({ where: { id } });
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
