import { NextResponse } from 'next/server';
import type { SiteContent } from '@/site/schema';
import {
  getProject,
  updateProject,
  deleteProject,
  duplicateProject,
} from '@/lib/studio/projects';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: {
    name?: string;
    domain?: string | null;
    status?: string;
    content?: SiteContent;
    action?: 'duplicate';
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (body.action === 'duplicate') {
    const copy = await duplicateProject(id);
    if (!copy) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ project: copy }, { status: 201 });
  }

  const project = await updateProject(id, {
    name: body.name,
    domain: body.domain,
    status: body.status,
    content: body.content,
  });
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await deleteProject(id);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
