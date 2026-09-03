'use client';

import { Rocket, Lock, Github, Server, Download, FolderArchive } from 'lucide-react';
import { useStudio } from '@/store/studio';
import { PanelHeader, SectionLabel, FieldShell } from './fields';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Phase 3 stub. The deploy pipeline (GitHub repo + Dokploy provisioning) needs
 * real credentials that aren't wired up yet — this panel is honest about that
 * rather than faking a deploy. Export needs no credentials, so it's live.
 */
export function DeployPanel() {
  const content = useStudio((s) => s.content);
  const meta = useStudio((s) => s.meta);

  if (!content || !meta) return null;

  return (
    <div className="space-y-6 p-4">
      <PanelHeader
        title="Deploy"
        hint="Push to a private GitHub repo and provision it on Dokploy."
      />

      <div className="space-y-3">
        <SectionLabel>Domain</SectionLabel>
        <FieldShell hint="Wire this up once the deploy pipeline lands (Phase 3).">
          <Input value={meta.domain ?? ''} placeholder="example.com" disabled className="h-9" />
        </FieldShell>
      </div>

      <div className="space-y-2 rounded-lg border border-border bg-card p-3 text-xs">
        <Row icon={Github} label="GitHub" ok={false} note="No token configured" />
        <Row icon={Server} label="Dokploy" ok={false} note="No API key configured" />
      </div>

      <div className="flex gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
        <Lock className="h-4 w-4 shrink-0 text-amber-400" />
        <p>
          Deploy isn&apos;t wired up yet — it needs a GitHub personal access token and a
          Dokploy API key in Settings. Nothing here fakes a deploy; the button stays
          disabled until real credentials are in place.
        </p>
      </div>

      <Button className="w-full" disabled>
        <Rocket className="h-4 w-4" />
        Deploy site
      </Button>

      <div className="space-y-3 border-t border-border pt-5">
        <SectionLabel>Self-host it yourself</SectionLabel>
        <div className="flex gap-2.5 rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
          <FolderArchive className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p>
            Don&apos;t want to use our hosting? Export the full Next.js source — with this
            site&apos;s content, theme, and pages already baked in — and deploy it wherever
            you like.
          </p>
        </div>
        <Button asChild variant="outline" className="w-full">
          <a href={`/api/projects/${meta.id}/export`} download>
            <Download className="h-4 w-4" />
            Export source (.zip)
          </a>
        </Button>
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  ok,
  note,
}: {
  icon: typeof Github;
  label: string;
  ok: boolean;
  note: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-foreground">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        {label}
      </span>
      <span className={ok ? 'text-emerald-400' : 'text-muted-foreground'}>{note}</span>
    </div>
  );
}
