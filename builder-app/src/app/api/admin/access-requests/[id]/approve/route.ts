import { NextResponse } from 'next/server';
import { db } from '@/db';
import { editAccessRequests, projects, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Check admin permissions
    if (session?.user?.role !== 'admin') {
      // Allow in dev mode or verified admin
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
      }
    }

    const requestList = await db.select().from(editAccessRequests).where(eq(editAccessRequests.id, id));
    const accessReq = requestList[0];

    if (!accessReq) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // 1. Mark request as approved
    await db.update(editAccessRequests)
      .set({
        status: 'approved',
        reviewedBy: session?.user?.id || 'admin',
        reviewedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(editAccessRequests.id, id));

    // 2. Unlock the project
    await db.update(projects)
      .set({
        isLocked: false,
        editAccessApproved: true,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, accessReq.projectId));

    // 3. Grant global edit access to user if registered
    if (accessReq.userId && accessReq.userId !== 'anonymous_requester') {
      await db.update(user)
        .set({
          hasGlobalEditAccess: true,
          updatedAt: new Date(),
        })
        .where(eq(user.id, accessReq.userId));
    }

    return NextResponse.json({ success: true, message: 'Edit access successfully approved and project unlocked' });
  } catch (error: any) {
    console.error('Failed to approve access request:', error);
    return NextResponse.json({ error: error?.message || 'Failed to approve access request' }, { status: 500 });
  }
}
