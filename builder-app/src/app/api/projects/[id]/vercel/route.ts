import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { getProject, updateProject } from '@/lib/studio/projects';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 100) || 'my-site'
  );
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let body: {
    token?: string;
    projectName?: string;
    deployHookUrl?: string;
    deployHook?: string;
    teamId?: string;
  } = {};

  try {
    body = await req.json();
  } catch {
    // Empty body
  }

  const cleanProjectName = slugify(
    body.projectName || project.content.business?.name || project.name || 'my-site',
  );

  const hookUrl = (body.deployHookUrl || body.deployHook || '').trim();

  // Case 1: Deploy Hook URL Trigger
  if (hookUrl) {
    try {
      const hookRes = await fetch(hookUrl, { method: 'POST' });
      if (!hookRes.ok) {
        const hookErr = await hookRes.text().catch(() => '');
        return NextResponse.json(
          { error: `Deploy hook trigger failed (${hookRes.status}): ${hookErr}` },
          { status: hookRes.status },
        );
      }

      const liveUrl = `https://${cleanProjectName}.vercel.app`;
      let deploymentRecord: { id: string } | null = null;
      try {
        deploymentRecord = await prisma.deployment.create({
          data: {
            projectId: id,
            status: 'success',
            liveUrl,
            logs: JSON.stringify([
              `[vercel] Triggered deployment via Webhook`,
              `[vercel] Target Project: ${cleanProjectName}`,
              `[vercel] Live URL: ${liveUrl}`,
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
        console.warn('[vercel] Failed to save deployment in DB:', dbErr);
      }

      return NextResponse.json({
        success: true,
        liveUrl,
        deploymentId: deploymentRecord?.id,
        dnsInstructions: {
          type: 'CNAME',
          name: '@',
          target: 'cname.vercel-dns.com',
        },
      });
    } catch (err) {
      console.error('[vercel:deployHook] error:', err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : 'Failed to call Vercel deploy hook' },
        { status: 500 },
      );
    }
  }

  // Case 2: Direct Vercel REST API Token Flow
  const dbVercelToken = await prisma.setting
    .findUnique({ where: { key: 'vercel:token' } })
    .catch(() => null);
  const token = (body.token || dbVercelToken?.value || process.env.VERCEL_TOKEN || '').trim();

  if (!token) {
    return NextResponse.json(
      { error: 'Vercel API Token is required to trigger deployment.' },
      { status: 400 },
    );
  }

  const teamQuery = body.teamId ? `?teamId=${encodeURIComponent(body.teamId)}` : '';

  try {
    // 1. Verify or create project on Vercel
    const checkProjectRes = await fetch(
      `https://api.vercel.com/v9/projects/${cleanProjectName}${teamQuery}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (checkProjectRes.status === 404) {
      // Create project on Vercel
      const createRes = await fetch(
        `https://api.vercel.com/v10/projects${teamQuery}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: cleanProjectName,
            framework: 'nextjs',
          }),
        },
      );

      if (!createRes.ok) {
        const createErr = await createRes.json().catch(() => ({}));
        const msg = createErr?.error?.message || `Failed to create Vercel project (${createRes.status})`;
        console.warn('[vercel] project create notice:', msg);
      }
    } else if (!checkProjectRes.ok && checkProjectRes.status !== 200) {
      const checkErr = await checkProjectRes.json().catch(() => ({}));
      const msg = checkErr?.error?.message || `Vercel token verification failed (${checkProjectRes.status})`;
      return NextResponse.json({ error: msg }, { status: checkProjectRes.status });
    }

    // 2. Trigger deployment via Vercel REST API v13
    const deployRes = await fetch(
      `https://api.vercel.com/v13/deployments${teamQuery}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: cleanProjectName,
          project: cleanProjectName,
          target: 'production',
        }),
      },
    );

    if (!deployRes.ok) {
      const deployErr = await deployRes.json().catch(() => ({}));
      const msg =
        deployErr?.error?.message ||
        deployErr?.message ||
        `Vercel deployment failed with status ${deployRes.status}`;
      return NextResponse.json({ error: msg, details: deployErr }, { status: deployRes.status });
    }

    const deployData = await deployRes.json().catch(() => ({}));
    const rawUrl =
      (Array.isArray(deployData?.alias) && deployData.alias[0]) ||
      deployData?.url ||
      `${cleanProjectName}.vercel.app`;

    const liveUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;

    // 3. Record deployment in database
    let deploymentRecord: { id: string } | null = null;
    try {
      deploymentRecord = await prisma.deployment.create({
        data: {
          projectId: id,
          status: 'success',
          liveUrl,
          logs: JSON.stringify([
            `[vercel] Initializing deployment to Vercel for ${cleanProjectName}`,
            `[vercel] REST API deployment triggered (v13/deployments)`,
            `[vercel] Target: production`,
            `[vercel] Live URL: ${liveUrl}`,
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
      console.warn('[vercel] Failed to record deployment in DB:', dbErr);
    }

    return NextResponse.json({
      success: true,
      liveUrl,
      deploymentId: deploymentRecord?.id,
      dnsInstructions: {
        type: 'CNAME',
        name: '@',
        target: 'cname.vercel-dns.com',
      },
    });
  } catch (err) {
    console.error('[vercel:POST] error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Vercel deployment failed' },
      { status: 500 },
    );
  }
}
