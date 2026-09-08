import { NextResponse } from 'next/server';
import { db } from '@/db';
import { editAccessRequests, projects } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, companyName, email, reason } = body;

    if (!projectId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user?.id || 'anonymous_requester';

    const newRequest = await db.insert(editAccessRequests).values({
      id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      projectId,
      userId,
      companyName: companyName || null,
      email,
      reason: reason || null,
      status: 'pending',
    }).returning();

    return NextResponse.json({ success: true, request: newRequest[0] });
  } catch (error: any) {
    console.error('Failed to create edit access request:', error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = await db.select().from(editAccessRequests).orderBy(desc(editAccessRequests.createdAt));
    return NextResponse.json({ success: true, requests: list });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch requests' }, { status: 500 });
  }
}
