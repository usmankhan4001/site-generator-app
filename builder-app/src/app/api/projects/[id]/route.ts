import { NextResponse } from 'next/server';
import type { SiteContent } from '@/site/schema';
import {
  getProject,
  updateProject,
  deleteProject,
  duplicateProject,
} from '@/lib/studio/projects';
import { getActor } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  let body: {
    name?: string;
    domain?: string | null;
    customDomain?: string | null;
    domainStatus?: string | null;
    publishRequestedAt?: string | null;
    status?: string;
    content?: SiteContent;
    action?: 'duplicate' | 'request_publish' | 'cancel_publish';
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (body.action === 'duplicate') {
    const copy = await duplicateProject(id, actor);
    if (!copy) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ project: copy }, { status: 201 });
  }

  let publishRequestedAt = body.publishRequestedAt;
  let domainStatus = body.domainStatus;
  if (body.action === 'request_publish') {
    publishRequestedAt = new Date().toISOString();
    domainStatus = 'pending_review';
  } else if (body.action === 'cancel_publish') {
    publishRequestedAt = null;
    domainStatus = null;
  }

  const project = await updateProject(
    id,
    {
      name: body.name,
      domain: body.domain,
      customDomain: body.customDomain,
      domainStatus,
      publishRequestedAt,
      status: body.status,
      content: body.content,
    },
    actor,
  );
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const deleted = await deleteProject(id, actor);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
