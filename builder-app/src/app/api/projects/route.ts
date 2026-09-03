import { NextResponse } from 'next/server';
import {
  listProjects,
  createProjectFromTemplate,
  createProjectFromArchetype,
} from '@/lib/studio/projects';
import { getActor } from '@/lib/session';
import type { ArchetypeId } from '@/site/archetypes/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({ projects: await listProjects(actor) });
}

export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: {
    templateId?: string;
    archetypeId?: ArchetypeId;
    starterSetId?: string | null;
    name?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (body.archetypeId) {
    try {
      const project = await createProjectFromArchetype(
        body.archetypeId,
        body.starterSetId,
        body.name,
        actor,
      );
      return NextResponse.json({ project }, { status: 201 });
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : 'Failed to create project' },
        { status: 400 },
      );
    }
  }

  if (!body.templateId) {
    return NextResponse.json(
      { error: 'archetypeId or templateId is required' },
      { status: 400 },
    );
  }
  try {
    const project = await createProjectFromTemplate(body.templateId, body.name, actor);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create project' },
      { status: 400 },
    );
  }
}
