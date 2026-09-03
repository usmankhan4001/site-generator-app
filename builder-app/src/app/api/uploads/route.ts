import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { saveUpload } from '@/lib/storage';

export const dynamic = 'force-dynamic';

const ALLOWED_MIME = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
  'image/gif',
];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * POST /api/uploads — multipart/form-data with a single `file` field.
 * Auth-gated; validates MIME + size, then hands off to the storage layer.
 * Returns `{ url }` — a public path under `/uploads/...`.
 */
export async function POST(request: Request) {
  const actor = await getActor();
  if (!actor) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'Expected a multipart/form-data request.' },
      { status: 400 },
    );
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'No file provided. Attach it as the "file" field.' },
      { status: 400 },
    );
  }

  if (!ALLOWED_MIME.includes(file.type)) {
    return NextResponse.json(
      {
        error: `Unsupported file type "${file.type || 'unknown'}". Use PNG, JPEG, WebP, SVG or GIF.`,
      },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      {
        error: `That file is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 5 MB.`,
      },
      { status: 400 },
    );
  }

  try {
    const url = await saveUpload(file, `user-${actor.userId}`);
    return NextResponse.json({ url });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed.' },
      { status: 400 },
    );
  }
}
