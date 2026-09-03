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

export function PublishQueue({ rows }: { rows: PublishRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function dismiss(id: string) {
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

  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center text-sm text-muted-foreground">
        The queue is empty. Publish requests from clients will show up here.
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
                  <TooltipContent>hosting credentials not configured</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismiss(p.id)}
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
