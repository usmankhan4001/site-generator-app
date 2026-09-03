import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const HOSTING_STATUSES = ['active', 'paused', 'none'] as const;
type HostingStatus = (typeof HOSTING_STATUSES)[number];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!actor.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id } = await params;

  let body: { hostingStatus?: string; publishRequestedAt?: string | null };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const data: { hostingStatus?: HostingStatus; publishRequestedAt?: Date | null } = {};

  if (body.hostingStatus !== undefined) {
    if (!HOSTING_STATUSES.includes(body.hostingStatus as HostingStatus)) {
      return NextResponse.json({ error: 'Invalid hostingStatus' }, { status: 400 });
    }
    data.hostingStatus = body.hostingStatus as HostingStatus;
  }

  if (body.publishRequestedAt !== undefined) {
    data.publishRequestedAt = body.publishRequestedAt === null ? null : new Date(body.publishRequestedAt);
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  try {
    const p = await prisma.project.update({ where: { id }, data });
    return NextResponse.json({
      project: {
        id: p.id,
        hostingStatus: p.hostingStatus,
        publishRequestedAt: p.publishRequestedAt ? p.publishRequestedAt.toISOString() : null,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
