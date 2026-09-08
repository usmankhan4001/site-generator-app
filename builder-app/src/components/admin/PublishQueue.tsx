'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface PublishRow {
  id: string;
  name: string;
  ownerEmail: string;
  requestedAt: string;
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function PublishQueue({
  rows,
  deployConfigured = false,
}: {
  rows: PublishRow[];
  deployConfigured?: boolean;
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function dismiss(id: string, name?: string) {
    if (!window.confirm(`Are you sure you want to dismiss the publish request for "${name || 'this project'}"?`)) {
      return;
    }
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publishRequestedAt: null }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setError('Could not dismiss that request.');
    } finally {
      setBusyId(null);
    }
  }

  async function approveDeploy(id: string, name?: string) {
    if (!window.confirm(`Are you sure you want to approve and deploy "${name || 'this project'}"?`)) {
      return;
    }
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${id}/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Deploy failed');
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not deploy that project.');
    } finally {
      setBusyId(null);
    }
  }

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground">
          <Rocket className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-base font-semibold text-foreground">Queue is clear</h2>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
          Publish requests from clients will show up here for review and approval.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      {rows.map((p) => (
        <Card key={p.id}>
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="font-medium text-foreground">{p.name}</p>
              <p className="text-sm text-muted-foreground">
                {p.ownerEmail} · requested {fmtDateTime(p.requestedAt)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={`/preview/project/${p.id}`} target="_blank" rel="noreferrer">
                  Review
                </a>
              </Button>
              {deployConfigured ? (
                <Button
                  size="sm"
                  onClick={() => approveDeploy(p.id, p.name)}
                  disabled={busyId === p.id}
                >
                  {busyId === p.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Rocket className="h-3.5 w-3.5" />
                  )}
                  Approve &amp; deploy
                </Button>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span tabIndex={0}>
                        <Button size="sm" disabled>
                          <Rocket className="h-3.5 w-3.5" />
                          Approve &amp; deploy
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Add a GitHub token / Dokploy host to enable deploys</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismiss(p.id, p.name)}
                disabled={busyId === p.id}
              >
                {busyId === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Dismiss'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
