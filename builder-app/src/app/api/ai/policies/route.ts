import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { getProject } from '@/lib/studio/projects';
import { rewritePoliciesForUser } from '@/lib/openrouter';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { projectId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.projectId) {
    return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
  }

  const project = await getProject(body.projectId, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  try {
    const policies = await rewritePoliciesForUser({ content: project.content });
    return NextResponse.json({ success: true, policies });
  } catch (err) {
    const e = err as Error & { code?: string };
    const status = e.code === 'AI_NOT_CONFIGURED' ? 503 : 500;
    return NextResponse.json(
      { success: false, error: e.message || 'Policy generation failed', code: e.code },
      { status },
    );
  }
}