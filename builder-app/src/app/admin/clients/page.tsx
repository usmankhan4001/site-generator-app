import { prisma } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { InviteDialog } from '@/components/admin/InviteDialog';
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/admin/table';

export const dynamic = 'force-dynamic';

function fmtDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function AdminClientsPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { projects: true } } },
  });

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {users.length} {users.length === 1 ? 'account' : 'accounts'} in the studio.
          </p>
        </div>
        <InviteDialog />
      </header>

      <Table>
        <THead>
          <TR>
            <TH>Email</TH>
            <TH>Name</TH>
            <TH>Role</TH>
            <TH>Joined</TH>
            <TH className="text-right">Projects</TH>
          </TR>
        </THead>
        <TBody>
          {users.length === 0 ? (
            <EmptyRow colSpan={5}>No clients yet.</EmptyRow>
          ) : (
            users.map((u) => (
              <TR key={u.id}>
                <TD className="font-medium text-foreground">{u.email}</TD>
                <TD className="text-muted-foreground">{u.name}</TD>
                <TD>
                  <Badge variant={u.role === 'admin' ? 'subtle' : 'outline'}>{u.role}</Badge>
                </TD>
                <TD className="text-muted-foreground">{fmtDate(u.createdAt)}</TD>
                <TD className="text-right tabular-nums">{u._count.projects}</TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  );
}
