import { NextResponse } from 'next/server';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getProject } from '@/lib/studio/projects';
import { getActor } from '@/lib/session';
import { assembleSite } from '@/lib/assemble';
import { zipDir } from '@/lib/zipDir';
import {
  generateDeploySh,
  generateDeployPs1,
  generateWranglerToml,
  generateVercelJson,
} from '@/lib/export/deploy-scripts';

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
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let tempDir: string | null = null;
  try {
    tempDir = await mkdtemp(join(tmpdir(), 'site-export-'));
    await assembleSite(project.content, tempDir);

    const projectNameSlug = slugify(project.content.business?.name ?? project.name);

    // Inject 1-command deployment scripts and cloud platform configs into root
    await writeFile(
      join(tempDir, 'deploy.sh'),
      generateDeploySh(projectNameSlug),
      { encoding: 'utf8', mode: 0o755 },
    );
    await writeFile(
      join(tempDir, 'deploy.ps1'),
      generateDeployPs1(projectNameSlug),
      { encoding: 'utf8' },
    );
    await writeFile(
      join(tempDir, 'wrangler.toml'),
      generateWranglerToml(projectNameSlug),
      { encoding: 'utf8' },
    );
    await writeFile(
      join(tempDir, 'vercel.json'),
      generateVercelJson(projectNameSlug),
      { encoding: 'utf8' },
    );

    const zip = await zipDir(tempDir);
    const filename = `${projectNameSlug}-source.zip`;

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
