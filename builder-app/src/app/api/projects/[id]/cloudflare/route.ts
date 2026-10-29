import { NextResponse } from 'next/server';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getActor } from '@/lib/session';
import { getProject, updateProject } from '@/lib/studio/projects';
import { assembleSite } from '@/lib/assemble';
import { zipDir } from '@/lib/zipDir';
import { generateWranglerToml } from '@/lib/export/deploy-scripts';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 58) || 'my-site'
  );
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let body: {
    accountId?: string;
    apiToken?: string;
    projectName?: string;
  } = {};

  try {
    body = await req.json();
  } catch {
    // Empty body
  }

  // Allow setting from DB or environment if not passed explicitly
  const dbCfAccount = await prisma.setting.findUnique({ where: { key: 'cloudflare:accountId' } }).catch(() => null);
  const dbCfToken = await prisma.setting.findUnique({ where: { key: 'cloudflare:apiToken' } }).catch(() => null);

  const accountId = (body.accountId || dbCfAccount?.value || process.env.CLOUDFLARE_ACCOUNT_ID || '').trim();
  const apiToken = (body.apiToken || dbCfToken?.value || process.env.CLOUDFLARE_API_TOKEN || '').trim();

  if (!accountId) {
    return NextResponse.json({ error: 'Cloudflare Account ID is required.' }, { status: 400 });
  }

  if (!apiToken) {
    return NextResponse.json({ error: 'Cloudflare API Token is required.' }, { status: 400 });
  }

  const cleanProjectName = slugify(
    body.projectName || project.content.business?.name || project.name || 'my-site',
  );

  let tempDir: string | null = null;
  try {
    // 1. Verify or create the Cloudflare Pages project
    const projectUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${cleanProjectName}`;
    const checkRes = await fetch(projectUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (checkRes.status === 404) {
      // Create Cloudflare Pages project
      const createRes = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: cleanProjectName,
            production_branch: 'main',
          }),
        },
      );

      if (!createRes.ok) {
        const createErr = await createRes.json().catch(() => ({}));
        const errMsg =
          createErr?.errors?.[0]?.message ||
          `Failed to initialize Cloudflare Pages project (${createRes.status})`;
        console.warn('[cloudflare] Project creation notice:', errMsg);
      }
    } else if (!checkRes.ok && checkRes.status !== 200) {
      const checkErr = await checkRes.json().catch(() => ({}));
      const errMsg =
        checkErr?.errors?.[0]?.message ||
        `Cloudflare account verification failed (${checkRes.status})`;
      return NextResponse.json({ error: errMsg }, { status: checkRes.status });
    }

    // 2. Assemble static bundle and package project
    tempDir = await mkdtemp(join(tmpdir(), 'cloudflare-pages-'));
    await assembleSite(project.content, tempDir);
    await writeFile(
      join(tempDir, 'wrangler.toml'),
      generateWranglerToml(cleanProjectName),
      'utf8',
    );

    const zipBuffer = await zipDir(tempDir);

    // 3. Deploy using Cloudflare Pages Direct Upload API
    const formData = new FormData();
    const zipBlob = new Blob([new Uint8Array(zipBuffer)], { type: 'application/zip' });
    formData.append('file', zipBlob, `${cleanProjectName}.zip`);

    const deployRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${cleanProjectName}/deployments`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        body: formData,
      },
    );

    if (!deployRes.ok) {
      const deployErr = await deployRes.json().catch(() => ({}));
      const errMsg =
        deployErr?.errors?.[0]?.message ||
        deployErr?.messages?.[0]?.message ||
        `Cloudflare deployment failed with status ${deployRes.status}`;
      return NextResponse.json({ error: errMsg, details: deployErr }, { status: deployRes.status });
    }

    const deployData = await deployRes.json().catch(() => ({}));
    const liveUrl =
      deployData?.result?.url || `https://${cleanProjectName}.pages.dev`;

    // 4. Record deployment to database
    let deploymentRecord: { id: string } | null = null;
    try {
      deploymentRecord = await prisma.deployment.create({
        data: {
          projectId: id,
          status: 'success',
          liveUrl,
          logs: JSON.stringify([
            `[cloudflare] Initializing deployment to Cloudflare Pages: ${cleanProjectName}`,
            `[cloudflare] Verified Cloudflare Account: ${accountId}`,
            `[cloudflare] Packaged and uploaded site bundle via Direct Upload API`,
            `[cloudflare] Live URL: ${liveUrl}`,
          ]),
        },
      });

      await updateProject(
        id,
        {
          hostingStatus: 'active',
          status: 'live',
        },
        actor,
      );

      await prisma.project
        .update({
          where: { id },
          data: { liveUrl },
        })
        .catch(() => {});
    } catch (dbErr) {
      console.warn('[cloudflare] Failed to record deployment in DB:', dbErr);
    }

    return NextResponse.json({
      success: true,
      liveUrl,
      deploymentId: deploymentRecord?.id,
      dnsInstructions: {
        type: 'CNAME',
        name: '@',
        target: `${cleanProjectName}.pages.dev`,
      },
    });
  } catch (err) {
    console.error('[cloudflare:POST] error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Cloudflare deployment failed' },
      { status: 500 },
    );
  } finally {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true }).catch(() => {});
    }
  }
}
