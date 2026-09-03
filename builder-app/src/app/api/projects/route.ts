import { NextResponse } from 'next/server';
import { listProjects, createProjectFromTemplate } from '@/lib/studio/projects';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ projects: await listProjects() });
}

export async function POST(req: Request) {
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
    const project = await createProjectFromTemplate(body.templateId, body.name);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create project' },
      { status: 400 },
    );
  }
}
