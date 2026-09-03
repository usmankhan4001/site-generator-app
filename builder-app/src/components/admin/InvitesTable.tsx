'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Copy, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/admin/table';

export interface InviteRow {
  id: string;
  email: string;
  url: string;
  createdAt: string;
  expiresAt: string;
  accepted: boolean;
  expired: boolean;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function InvitesTable({ rows }: { rows: InviteRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function copy(row: InviteRow) {
    try {
      await navigator.clipboard.writeText(new URL(row.url, window.location.origin).toString());
      setCopiedId(row.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard blocked */
    }
  }

  async function revoke(id: string) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/invites/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setError('Could not revoke that invite.');
    } finally {
      setBusyId(null);
    }
  }

  function statusBadge(row: InviteRow) {
    if (row.accepted) return <Badge variant="success">Accepted</Badge>;
    if (row.expired) return <Badge variant="outline">Expired</Badge>;
    return <Badge variant="subtle">Pending</Badge>;
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Table>
        <THead>
          <TR>
            <TH>Email</TH>
            <TH>Status</TH>
            <TH>Created</TH>
            <TH>Expires</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <TBody>
          {rows.length === 0 ? (
            <EmptyRow colSpan={5}>No invites issued yet.</EmptyRow>
          ) : (
            rows.map((row) => (
              <TR key={row.id}>
                <TD className="font-medium text-foreground">{row.email}</TD>
                <TD>{statusBadge(row)}</TD>
                <TD className="text-muted-foreground">{fmtDate(row.createdAt)}</TD>
                <TD className="text-muted-foreground">{fmtDate(row.expiresAt)}</TD>
                <TD className="text-right">
                  <div className="flex justify-end gap-2">
                    {!row.accepted && (
                      <Button variant="outline" size="sm" onClick={() => copy(row)}>
                        {copiedId === row.id ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        Copy link
                      </Button>
                    )}
                    {!row.accepted && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => revoke(row.id)}
                        disabled={busyId === row.id}
                      >
                        {busyId === row.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          'Revoke'
                        )}
                      </Button>
                    )}
                  </div>
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  );
}
