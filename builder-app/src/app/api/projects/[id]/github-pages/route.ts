import { NextResponse } from 'next/server';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Octokit } from '@octokit/rest';
import { getActor } from '@/lib/session';
import { getProject, updateProject } from '@/lib/studio/projects';
import { assembleSite } from '@/lib/assemble';
import { automateGitHubPush, createPagesWorkflow } from '@/lib/github';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'site'
  );
}

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const dbGithubToken = await prisma.setting.findUnique({ where: { key: 'github:token' } });
  const githubToken = dbGithubToken?.value || process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
  if (!githubToken) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 400 });
  }

  let tempDir: string | null = null;
  try {
    tempDir = await mkdtemp(join(tmpdir(), 'github-pages-'));
    await assembleSite(project.content, tempDir);

    // Write the Pages workflow BEFORE pushing so it ships inside the repo.
    const workflowDir = join(tempDir, '.github', 'workflows');
    await mkdir(workflowDir, { recursive: true });
    await writeFile(join(workflowDir, 'pages.yml'), createPagesWorkflow(), 'utf8');

    const repoSlug = `site-pages-${slugify(project.content.business?.name ?? project.name)}`;
    const ghResult = await automateGitHubPush({
      token: githubToken,
      repoName: repoSlug,
      workspaceDir: tempDir,
      commitMessage: `Publish ${project.name} to GitHub Pages`,
      isPrivate: true,
    });

    if (!ghResult.success || !ghResult.owner || !ghResult.repoName) {
      throw new Error(`GitHub sync failed: ${ghResult.error || 'Unknown error'}`);
    }

    // Enable Pages with the workflow build type (fall back to updating the
    // existing Pages site when the repo already has one configured).
    const octokit = new Octokit({ auth: githubToken });
    try {
      await octokit.rest.repos.createPagesSite({
        owner: ghResult.owner,
        repo: ghResult.repoName,
        build_type: 'workflow',
      });
    } catch {
      await octokit.rest.repos.updateInformationAboutPagesSite({
        owner: ghResult.owner,
        repo: ghResult.repoName,
        build_type: 'workflow',
      });
    }

    const pagesUrl = `https://${ghResult.owner}.github.io/${ghResult.repoName}/`;

    const deployment = await prisma.deployment.create({
      data: {
        projectId: id,
        status: 'success',
        repoUrl: ghResult.htmlUrl,
        liveUrl: pagesUrl,
        logs: JSON.stringify([
          `[init] Publishing ${project.name} to GitHub Pages...`,
          `[github] Repository: ${ghResult.htmlUrl}`,
          `[github] Pages workflow enabled (build_type: workflow)`,
          `[github] Live at ${pagesUrl}`,
        ]),
      },
    });

    await updateProject(
      id,
      {
        hostingStatus: 'active',
        domainStatus: 'active',
        status: 'live',
      },
      actor,
    );

    await prisma.project.update({
      where: { id },
      data: { liveUrl: pagesUrl, repoUrl: ghResult.htmlUrl },
    });

    return NextResponse.json({
      success: true,
      deploymentId: deployment.id,
      pagesUrl,
      repoUrl: ghResult.htmlUrl,
    });
  } catch (err: unknown) {
    console.error('[github-pages] error:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'GitHub Pages publish failed' },
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