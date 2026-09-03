import { NextResponse } from 'next/server';
import { listProjects, createProjectFromTemplate } from '@/lib/studio/projects';
import { getActor } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({ projects: await listProjects(actor) });
}

export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { templateId?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.templateId) {
    return NextResponse.json({ error: 'templateId is required' }, { status: 400 });
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
