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

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Publish queue</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length === 0
            ? 'No pending publish requests.'
            : `${rows.length} ${rows.length === 1 ? 'request' : 'requests'} awaiting review, oldest first.`}
        </p>
      </header>

      <PublishQueue rows={rows} />
    </div>
  );
}
