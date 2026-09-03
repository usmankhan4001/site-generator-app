import { prisma } from '@/lib/db';
import { ProjectsTable, type AdminProjectRow } from '@/components/admin/ProjectsTable';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { owner: { select: { email: true } } },
  });

  const rows: AdminProjectRow[] = projects.map((p) => ({
    id: p.id,
    name: p.name,
    ownerEmail: p.owner.email,
    status: p.status,
    hostingStatus: p.hostingStatus,
    updatedAt: p.updatedAt.toISOString(),
  }));

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? 'project' : 'projects'} across all clients.
        </p>
      </header>

      <ProjectsTable rows={rows} />
    </div>
  );
}
