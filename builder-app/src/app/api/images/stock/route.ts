import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { searchStock } from '@/lib/images/stock';

export const dynamic = 'force-dynamic';

/**
 * GET /api/images/stock?q=term
 *
 * Auth-gated stock photo search proxying Unsplash via `STOCK_IMAGE_API_KEY`,
 * with automated zero-slop fallback to our high-resolution curated library.
 * Even when the key is unset or rate-limited, high quality editorial imagery
 * is always returned.
 */
export async function GET(request: Request) {
  const actor = await getActor();
  if (!actor) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || searchParams.get('query') || '';

  const result = await searchStock(query.trim() || 'featured');
  return NextResponse.json(result);
}
