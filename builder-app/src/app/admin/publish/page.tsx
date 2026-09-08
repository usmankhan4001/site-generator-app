import { prisma } from '@/lib/db';
import { PublishQueue, type PublishRow } from '@/components/admin/PublishQueue';

export const dynamic = 'force-dynamic';

export default async function AdminPublishPage() {
  const projects = await prisma.project.findMany({
    where: { publishRequestedAt: { not: null } },
    orderBy: { publishRequestedAt: 'asc' },
    include: { owner: { select: { email: true } } },
  });

  const rows: PublishRow[] = projects.map((p) => ({
    id: p.id,
    name: p.name,
    ownerEmail: p.owner.email,
    requestedAt: p.publishRequestedAt!.toISOString(),
  }));

  const [dbDokployKey, dbDokployHost, dbGithubToken] = await Promise.all([
    prisma.setting.findUnique({ where: { key: 'dokploy:apiKey' } }),
    prisma.setting.findUnique({ where: { key: 'dokploy:host' } }),
    prisma.setting.findUnique({ where: { key: 'github:token' } }),
  ]);
  const deployConfigured = Boolean(
    (dbDokployKey?.value || process.env.DOKPLOY_API_KEY) &&
      (dbDokployHost?.value || process.env.DOKPLOY_HOST) &&
      (dbGithubToken?.value || process.env.GITHUB_TOKEN || process.env.GH_TOKEN),
  );

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Publish queue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length === 0
            ? 'No pending publish requests.'
            : `${rows.length} ${rows.length === 1 ? 'request' : 'requests'} awaiting review, oldest first.`}
        </p>
      </header>

      <PublishQueue rows={rows} deployConfigured={deployConfigured} />
    </div>
  );
}
