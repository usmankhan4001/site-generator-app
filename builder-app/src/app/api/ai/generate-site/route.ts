import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { generateSiteFromBriefForUser } from '@/lib/ai/generateSite';
import { createProjectFromContent } from '@/lib/studio/projects';
import { ARCHETYPE_LIST } from '@/site/archetypes';
import type { ArchetypeId } from '@/site/archetypes/types';

export const dynamic = 'force-dynamic';

function isArchetypeId(v: unknown): v is ArchetypeId {
  return typeof v === 'string' && ARCHETYPE_LIST.some((a) => a.id === v);
}

export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { brief?: unknown; archetypeId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.brief || typeof body.brief !== 'object' || Array.isArray(body.brief)) {
    return NextResponse.json({ error: 'brief is required' }, { status: 400 });
  }
  const brief = body.brief as {
    name?: unknown;
    niche?: unknown;
    mode?: unknown;
    vibe?: unknown;
    brief?: unknown;
  };
  if (typeof brief.niche !== 'string' || !brief.niche.trim()) {
    return NextResponse.json({ error: 'brief.niche is required' }, { status: 400 });
  }
  if (body.archetypeId !== undefined && !isArchetypeId(body.archetypeId)) {
    return NextResponse.json({ error: 'Unknown archetypeId' }, { status: 400 });
  }

  try {
    const content = await generateSiteFromBriefForUser({
      brief: {
        name: typeof brief.name === 'string' ? brief.name : undefined,
        niche: brief.niche,
        mode: typeof brief.mode === 'string' ? brief.mode : undefined,
        vibe: typeof brief.vibe === 'string' ? brief.vibe : undefined,
        brief: typeof brief.brief === 'string' ? brief.brief : undefined,
      },
      archetypeId: body.archetypeId,
    });

    const projectName =
      typeof brief.name === 'string' && brief.name.trim()
        ? brief.name.trim()
        : content.business?.name || brief.niche;

    const project = await createProjectFromContent(content, projectName, actor);

    return NextResponse.json({ success: true, project: { id: project.id }, content });
  } catch (err) {
    const e = err as Error & { code?: string };
    const status = e.code === 'AI_NOT_CONFIGURED' ? 503 : 500;
    return NextResponse.json(
      { success: false, error: e.message || 'AI site generation failed', code: e.code },
      { status },
    );
  }
}