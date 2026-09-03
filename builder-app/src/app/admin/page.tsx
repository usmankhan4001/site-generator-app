import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const [clients, projects, activeHosting, pendingPublish, openInvites] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.project.count({ where: { hostingStatus: 'active' } }),
    prisma.project.count({ where: { publishRequestedAt: { not: null } } }),
    prisma.invite.count({ where: { acceptedAt: null } }),
  ]);

  const stats = [
    { label: 'Clients', value: clients },
    { label: 'Projects', value: projects },
    { label: 'Active hosting', value: activeHosting },
    { label: 'Pending publish requests', value: pendingPublish },
    { label: 'Open invites', value: openInvites },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Studio-wide snapshot of clients, projects and hosting.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tabular-nums">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
