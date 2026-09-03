import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { searchStock } from '@/lib/images/stock';

export const dynamic = 'force-dynamic';

/**
 * GET /api/images/stock?q=term
 *
 * Auth-gated stock photo search proxying Unsplash via `STOCK_IMAGE_API_KEY`.
 * If no key is set in the environment, returns `{ configured: false, results: [] }`
 * so the frontend can honestly convey keyless status.
 */
export async function GET(request: Request) {
  const actor = await getActor();
  if (!actor) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || searchParams.get('query') || '';

  if (!query.trim()) {
    const isConfigured = Boolean(process.env.STOCK_IMAGE_API_KEY);
    return NextResponse.json({ configured: isConfigured, results: [] });
  }

  const result = await searchStock(query.trim());
  return NextResponse.json(result);
}
