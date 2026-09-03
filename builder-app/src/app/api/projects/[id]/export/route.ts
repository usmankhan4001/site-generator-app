import { NextResponse } from 'next/server';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getProject } from '@/lib/studio/projects';
import { assembleSite } from '@/lib/assemble';
import { zipDir } from '@/lib/zipDir';

export const dynamic = 'force-dynamic';

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'site'
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let tempDir: string | null = null;
  try {
    tempDir = await mkdtemp(join(tmpdir(), 'site-export-'));
    await assembleSite(project.content, tempDir);
    const zip = await zipDir(tempDir);
    const filename = `${slugify(project.content.business?.name ?? project.name)}-source.zip`;

    return new NextResponse(new Uint8Array(zip), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(zip.length),
      },
    });
  } catch (err) {
    console.error('[export] failed', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Export failed' },
      { status: 500 },
    );
  } finally {
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  }
}
