'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/admin/table';

export interface AdminProjectRow {
  id: string;
  name: string;
  ownerEmail: string;
  status: string;
  hostingStatus: string;
  updatedAt: string;
}

const HOSTING_OPTIONS = ['none', 'active', 'paused'] as const;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ProjectsTable({ rows }: { rows: AdminProjectRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function setHosting(id: string, hostingStatus: string) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hostingStatus }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setError('Could not update hosting status.');
    } finally {
      setBusyId(null);
    }
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
            <TH>Name</TH>
            <TH>Owner</TH>
            <TH>Status</TH>
            <TH>Hosting</TH>
            <TH>Updated</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <TBody>
          {rows.length === 0 ? (
            <EmptyRow colSpan={6}>No projects yet.</EmptyRow>
          ) : (
            rows.map((p) => (
              <TR key={p.id}>
                <TD className="font-medium text-foreground">{p.name}</TD>
                <TD className="text-muted-foreground">{p.ownerEmail}</TD>
                <TD>
                  <Badge variant="outline">{p.status}</Badge>
                </TD>
                <TD>
                  <div className="flex items-center gap-2">
                    <select
                      value={p.hostingStatus}
                      disabled={busyId === p.id}
                      onChange={(e) => setHosting(p.id, e.target.value)}
                      className="h-8 rounded-md border border-input bg-background px-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                    >
                      {HOSTING_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    {busyId === p.id && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  </div>
                </TD>
                <TD className="text-muted-foreground">{fmtDate(p.updatedAt)}</TD>
                <TD className="text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/project/${p.id}`}>
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open editor
                    </Link>
                  </Button>
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  );
}
