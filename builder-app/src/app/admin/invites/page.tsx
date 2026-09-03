import { prisma } from '@/lib/db';
import { InviteDialog } from '@/components/admin/InviteDialog';
import { InvitesTable, type InviteRow } from '@/components/admin/InvitesTable';

export const dynamic = 'force-dynamic';

export default async function AdminInvitesPage() {
  const invites = await prisma.invite.findMany({ orderBy: { createdAt: 'desc' } });

  const now = Date.now();
  const rows: InviteRow[] = invites.map((i) => ({
    id: i.id,
    email: i.email,
    url: `/sign-up?token=${i.token}`,
    createdAt: i.createdAt.toISOString(),
    expiresAt: i.expiresAt.toISOString(),
    accepted: i.acceptedAt !== null,
    expired: i.acceptedAt === null && i.expiresAt.getTime() < now,
  }));

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Invites</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {rows.length} {rows.length === 1 ? 'invite' : 'invites'} issued.
          </p>
        </div>
        <InviteDialog triggerLabel="New invite" />
      </header>

      <InvitesTable rows={rows} />
    </div>
  );
}
