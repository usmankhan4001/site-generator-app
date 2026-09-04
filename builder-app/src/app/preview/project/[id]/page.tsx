/**
 * Project-backed live preview — the iframe target inside the studio workspace.
 * Reads the project's `SiteContent` from the DB and renders exactly what a
 * generated site would, scoped with the theme's CSS variables.
 */

import { notFound } from 'next/navigation';
import { getProject } from '@/lib/studio/projects';
import { getActor } from '@/lib/session';
import { LivePreviewContainer } from '@/components/preview/LivePreviewContainer';

export const dynamic = 'force-dynamic';

export default async function ProjectPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page = '/' } = await searchParams;

  const actor = await getActor();
  if (!actor) notFound();

  const project = await getProject(id, actor);
  if (!project) notFound();

  return <LivePreviewContainer initialContent={project.content} page={page} />;
}
