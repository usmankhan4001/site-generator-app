import { NextResponse } from 'next/server';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { getActor } from '@/lib/session';
import { getProject, updateProject } from '@/lib/studio/projects';
import { assembleSite } from '@/lib/assemble';
import { DokployClient } from '@/lib/dokploy';
import { automateGitHubPush } from '@/lib/github';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  try {
    const deployments = await prisma.deployment.findMany({
      where: { projectId: id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        domain: project.domain,
        customDomain: project.customDomain,
        hostingStatus: project.hostingStatus,
        publishRequestedAt: project.publishRequestedAt,
        liveUrl: project.liveUrl,
        repoUrl: project.repoUrl,
        status: project.status,
      },
      deployments,
    });
  } catch (err: unknown) {
    console.error('[deploy:GET] error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch deployments' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  let body: {
    domain?: string;
    customDomain?: string;
    forceRedeploy?: boolean;
  } = {};

  try {
    body = await req.json();
  } catch {
    // Body is optional
  }

  const targetDomain =
    body.customDomain ||
    body.domain ||
    project.customDomain ||
    project.domain ||
    `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.cname.dokploy.app`;

  const cleanDomain = targetDomain
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .trim()
    .toLowerCase();

  // Create pending deployment record
  const deployment = await prisma.deployment.create({
    data: {
      projectId: id,
      status: 'running',
      logs: JSON.stringify([`[init] Starting 1-click deployment for ${cleanDomain}...`]),
    },
  });

  const logs: string[] = [`[init] Initializing deployment pipeline for ${cleanDomain}`];

  const appendLog = async (msg: string) => {
    logs.push(msg);
    try {
      await prisma.deployment.update({
        where: { id: deployment.id },
        data: { logs: JSON.stringify(logs) },
      });
    } catch {
      // Non-blocking log update
    }
  };

  // Check Dokploy and GitHub credentials
  const [dbDokployKey, dbDokployHost, dbGithubToken] = await Promise.all([
    prisma.setting.findUnique({ where: { key: 'dokploy:apiKey' } }),
    prisma.setting.findUnique({ where: { key: 'dokploy:host' } }),
    prisma.setting.findUnique({ where: { key: 'github:token' } }),
  ]);

  const dokployApiKey = dbDokployKey?.value || process.env.DOKPLOY_API_KEY || '';
  const dokployHost = dbDokployHost?.value || process.env.DOKPLOY_HOST || 'https://paas.usmankhan.xyz';
  const githubToken = dbGithubToken?.value || process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

  const hasAutomatedPaaS = Boolean(dokployApiKey && dokployHost && githubToken);

  let tempDir: string | null = null;
  try {
    if (!hasAutomatedPaaS) {
      // Queue for operator review
      await appendLog('Dokploy automated credentials not configured in environment.');
      await appendLog('Placing deployment request in operator queue for review.');

      await updateProject(
        id,
        {
          publishRequestedAt: new Date(),
          domainStatus: 'pending_review',
          customDomain: cleanDomain,
          status: 'pending',
        },
        actor,
      );

      await prisma.deployment.update({
        where: { id: deployment.id },
        data: {
          status: 'pending',
          logs: JSON.stringify(logs),
        },
      });

      return NextResponse.json({
        success: true,
        mode: 'queued_for_operator',
        deploymentId: deployment.id,
        message: 'Deployment request queued for operator review.',
        domain: cleanDomain,
      });
    }

    // Automated 1-Click Pipeline
    await appendLog('Step 1/3: Assembling standalone Next.js production codebase...');
    tempDir = await mkdtemp(join(tmpdir(), 'dokploy-deploy-'));
    await assembleSite(project.content, tempDir);
    await appendLog('Codebase assembled successfully with custom content, Dockerfile, and theme tokens.');

    await appendLog('Step 2/3: Synchronizing Git repository with GitHub automation...');
    const repoSlug = `site-${cleanDomain.replace(/[^a-z0-9-]/g, '-')}`;
    const ghResult = await automateGitHubPush({
      token: githubToken,
      repoName: repoSlug,
      workspaceDir: tempDir,
      commitMessage: `Deploy ${cleanDomain} via Airwallex Site Cloner`,
      isPrivate: false,
      onLog: (msg) => void appendLog(`[GitHub] ${msg}`),
    });

    if (!ghResult.success || !ghResult.cloneUrl) {
      throw new Error(`GitHub sync failed: ${ghResult.error || 'Unknown error'}`);
    }
    await appendLog(`GitHub repository active: ${ghResult.htmlUrl}`);

    await appendLog('Step 3/3: Provisioning Dokploy PaaS container and Traefik edge routing...');
    const client = new DokployClient({
      apiKey: dokployApiKey,
      baseUrl: dokployHost,
    });

    const provisionResult = await client.provisionAndDeploy({
      projectName: `Airwallex - ${cleanDomain}`,
      gitUrl: ghResult.cloneUrl,
      branch: ghResult.defaultBranch || 'main',
      domain: cleanDomain,
      port: 3000,
      https: true,
      onLog: (msg) => void appendLog(`[Dokploy] ${msg}`),
    });

    if (!provisionResult.success) {
      throw new Error('Dokploy provisioning pipeline returned unsuccessful status.');
    }

    const liveUrl = `https://${cleanDomain}`;
    await appendLog(`🎉 Live deployment verified at ${liveUrl}`);

    await updateProject(
      id,
      {
        hostingStatus: 'active',
        domainStatus: 'active',
        domain: cleanDomain,
        customDomain: cleanDomain,
        status: 'live',
      },
      actor,
    );

    await prisma.project.update({
      where: { id },
      data: {
        liveUrl,
        repoUrl: ghResult.htmlUrl,
      },
    });

    await prisma.deployment.update({
      where: { id: deployment.id },
      data: {
        status: 'success',
        liveUrl,
        repoUrl: ghResult.htmlUrl,
        logs: JSON.stringify(logs),
      },
    });

    return NextResponse.json({
      success: true,
      mode: 'automated',
      deploymentId: deployment.id,
      liveUrl,
      repoUrl: ghResult.htmlUrl,
      domain: cleanDomain,
      logs,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Deployment failed';
    await appendLog(`❌ ERROR: ${errorMsg}`);

    await prisma.deployment.update({
      where: { id: deployment.id },
      data: {
        status: 'error',
        logs: JSON.stringify(logs),
      },
    });

    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        deploymentId: deployment.id,
        logs,
      },
      { status: 500 },
    );
  } finally {
    if (tempDir) {
      try {
        await rm(tempDir, { recursive: true, force: true });
      } catch {
        // Temp cleanup error ignored
      }
    }
  }
}