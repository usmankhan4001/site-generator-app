import { createHash } from 'node:crypto';
import { access, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * MIME type -> file extension. Only the image types the upload API accepts are
 * mapped; anything else is rejected before it reaches `saveUpload`.
 */
const MIME_EXT: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/gif': 'gif',
};

export function extForMime(mime: string): string | null {
  return MIME_EXT[mime] ?? null;
}

/**
 * Persist an uploaded file and return its public URL path.
 *
 * DESIGN NOTE — this is the local-dev implementation: it writes to
 * `public/uploads/<scope>/` on the local filesystem, content-addressed by the
 * SHA-256 of the file bytes (so re-uploading identical content is a no-op and
 * never produces a duplicate). In production this one function is the only seam
 * that has to change: point it at a Dokploy persistent volume, or swap the body
 * for an S3 `PutObject` and return the bucket's public URL. No caller changes.
 */
export async function saveUpload(file: File, scope: string): Promise<string> {
  const ext = extForMime(file.type);
  if (!ext) {
    throw new Error(`Unsupported file type: ${file.type || 'unknown'}`);
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const hash = createHash('sha256').update(bytes).digest('hex');

  // Keep the scope filesystem-safe (it is caller-supplied, e.g. `user-<id>`).
  const safeScope = scope.replace(/[^a-zA-Z0-9_-]/g, '-') || 'misc';
  const filename = `${hash}.${ext}`;

  const dir = join(process.cwd(), 'public', 'uploads', safeScope);
  const fullPath = join(dir, filename);

  await mkdir(dir, { recursive: true });

  // Content-addressed: identical bytes resolve to the same path, so skip the
  // write if the file is already there.
  let exists = true;
  try {
    await access(fullPath);
  } catch {
    exists = false;
  }
  if (!exists) {
    await writeFile(fullPath, bytes);
  }

  return `/uploads/${safeScope}/${filename}`;
}
