import { Workspace } from '@/components/studio/Workspace';

/**
 * Studio workspace route. `params` is a Promise in Next 16 — unwrap it here and
 * hand the id to the (client) `<Workspace>` which owns all store lifecycle.
 */
export default async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Workspace projectId={id} />;
}
