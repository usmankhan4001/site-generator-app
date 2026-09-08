import { NextResponse } from 'next/server';
import { getActor } from '@/lib/session';
import { getProject } from '@/lib/studio/projects';
import { rewriteSectionForUser } from '@/lib/openrouter';
import type { Section } from '@/site/schema';

export const dynamic = 'force-dynamic';

/** Collect all rewriteable sections on all pages, keyed by sectionId. */
function collectSections(content: NonNullable<Awaited<ReturnType<typeof getProject>>>['content']) {
  const out: { id: string; type: Section['type']; props: Record<string, unknown> }[] = [];
  for (const page of content.pages) {
    for (const sec of page.sections) {
      out.push({ id: sec.id, type: sec.type, props: sec.props as unknown as Record<string, unknown> });
    }
  }
  return out;
}

export async function POST(req: Request) {
  const actor = await getActor();
  if (!actor) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { projectId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body.projectId) {
    return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
  }

  const project = await getProject(body.projectId, actor);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const sections = collectSections(project.content);
  const patches: Record<string, Record<string, unknown>> = {};
  let ok = 0;
  let skipped = 0;
  let failures = 0;

  let notConfigured = false;

  for (const sec of sections) {
    try {
      const patch = await rewriteSectionForUser({
        sectionType: sec.type,
        props: sec.props,
        content: project.content,
      });
      // applyAllowList already returns {} when the section type has no fields —
      // skip those so we don't report no-op rewrites as successes.
      if (Object.keys(patch).length === 0) {
        skipped++;
        continue;
      }
      patches[sec.id] = patch;
      ok++;
    } catch (err) {
      // A missing key affects every section — surface it honestly as a 503
      // instead of silently reporting a misleading "ok: 0" 200.
      if ((err as Error & { code?: string }).code === 'AI_NOT_CONFIGURED') {
        notConfigured = true;
        break;
      }
      // Otherwise per-section failures don't abort the whole run; the client
      // reports how many succeeded.
      failures++;
    }
  }

  if (notConfigured) {
    return NextResponse.json(
      {
        success: false,
        error: 'AI copy is not configured. Add an OPENROUTER_API_KEY to enable it.',
        code: 'AI_NOT_CONFIGURED',
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    success: true,
    sections: patches,
    counts: { ok, skipped, failures },
  });
}
