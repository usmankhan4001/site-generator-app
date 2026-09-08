import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { getProject } from '@/lib/studio/projects';
import { rewriteSectionForUser } from '@/lib/openrouter';
import type { Section, SectionType, SiteContent } from '@/site/schema';

export const dynamic = 'force-dynamic';

function findSection(
  content: SiteContent,
  sectionId: string,
): { type: SectionType; props: Record<string, unknown> } | null {
  if (sectionId === 'header') return null; // header/footer chrome is not AI-rewritable
  for (const page of content.pages) {
    const sec = page.sections.find((s: Section) => s.id === sectionId);
    if (sec) {
      return { type: sec.type, props: sec.props as unknown as Record<string, unknown> };
    }
  }
  return null;
}

export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { projectId?: string; sectionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.projectId || !body.sectionId) {
    return NextResponse.json({ error: 'projectId and sectionId are required' }, { status: 400 });
  }

  const project = await getProject(body.projectId, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const target = findSection(project.content, body.sectionId);
  if (!target) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  try {
    const patch = await rewriteSectionForUser({
      sectionType: target.type,
      props: target.props,
      content: project.content,
    });
    return NextResponse.json({
      success: true,
      sectionId: body.sectionId,
      sectionType: target.type,
      patch,
    });
  } catch (err) {
    const e = err as Error & { code?: string };
    const status = e.code === 'AI_NOT_CONFIGURED' ? 503 : 500;
    return NextResponse.json(
      { success: false, error: e.message || 'AI rewrite failed', code: e.code },
      { status },
    );
  }
}