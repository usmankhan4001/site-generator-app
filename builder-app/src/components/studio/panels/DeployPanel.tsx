'use client';

import { useState } from 'react';
import {
  Rocket,
  Download,
  FolderArchive,
  Globe,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  FileCode,
  Loader2,
  X,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useStudio } from '@/store/studio';
import { PanelHeader, SectionLabel, FieldShell } from './fields';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function DeployPanel() {
  const meta = useStudio((s) => s.meta);
  const setCustomDomain = useStudio((s) => s.setCustomDomain);
  const requestPublish = useStudio((s) => s.requestPublish);
  const cancelPublishRequest = useStudio((s) => s.cancelPublishRequest);

  const [domainInput, setDomainInput] = useState(meta?.customDomain ?? meta?.domain ?? '');
  const [savingDomain, setSavingDomain] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Domain Verification States
  const [verifyingDomain, setVerifyingDomain] = useState(false);
  const [domainCheckResult, setDomainCheckResult] = useState<{
    configured?: boolean;
    isLive?: boolean;
    details?: string;
    resolvedValues?: string[];
    recordType?: string;
    expectedTarget?: string;
    error?: string;
  } | null>(null);

  // Direct 1-Click Deploy State
  const [deployingDirect, setDeployingDirect] = useState(false);
  const [deployResult, setDeployResult] = useState<{
    success?: boolean;
    liveUrl?: string;
    repoUrl?: string;
    message?: string;
    error?: string;
  } | null>(null);

  if (!meta) return null;

  const currentDomain = meta.customDomain || meta.domain || '';
  const isPublishRequested = Boolean(meta.publishRequestedAt);
  const isLive = meta.hostingStatus === 'active' || Boolean(meta.liveUrl);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleSaveDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingDomain(true);
    setDomainCheckResult(null);
    try {
      await setCustomDomain(domainInput.trim() || null);
    } finally {
      setSavingDomain(false);
    }
  };

  const handleVerifyDns = async () => {
    if (!meta.id) return;
    setVerifyingDomain(true);
    try {
      const res = await fetch(`/api/projects/${meta.id}/domain`);
      const data = await res.json();
      if (res.ok && data.success) {
        setDomainCheckResult({
          configured: data.dns?.configured,
          isLive: data.live?.isLive,
          details: data.dns?.details,
          resolvedValues: data.dns?.resolvedValues,
          recordType: data.dns?.recordType,
          expectedTarget: data.dns?.expectedTarget,
        });
      } else {
        setDomainCheckResult({
          error: data.error || data.message || 'DNS check returned pending state.',
        });
      }
    } catch (err: unknown) {
      setDomainCheckResult({
        error: err instanceof Error ? err.message : 'Network error verifying domain.',
      });
    } finally {
      setVerifyingDomain(false);
    }
  };

  const handleDirectDeploy = async () => {
    if (!meta.id) return;
    setDeployingDirect(true);
    setDeployResult(null);
    try {
      const res = await fetch(`/api/projects/${meta.id}/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customDomain: currentDomain || undefined }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setDeployResult({
          success: true,
          liveUrl: data.liveUrl,
          repoUrl: data.repoUrl,
          message: data.message || 'Deployment triggered successfully.',
        });
        if (data.mode === 'queued_for_operator') {
          await requestPublish();
        }
      } else {
        setDeployResult({
          success: false,
          error: data.error || 'Deployment failed to complete.',
        });
      }
    } catch (err: unknown) {
      setDeployResult({
        success: false,
        error: err instanceof Error ? err.message : 'Deployment request failed.',
      });
    } finally {
      setDeployingDirect(false);
    }
  };

  const handlePublishToggle = async () => {
    setPublishing(true);
    try {
      if (isPublishRequested) {
        await cancelPublishRequest();
      } else {
        await requestPublish();
      }
    } finally {
      setPublishing(false);
    }
  };

  // Status calculation
  let statusBadge = {
    label: 'Draft',
    variant: 'bg-muted text-muted-foreground border-border',
  };
  if (isLive) {
    statusBadge = {
      label: 'Live / Active',
      variant: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    };
  } else if (isPublishRequested) {
    statusBadge = {
      label: 'Pending Admin Review',
      variant: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    };
  } else if (currentDomain) {
    statusBadge = {
      label: 'Pending DNS Setup',
      variant: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    };
  }

  // Domain records breakdown
  const cleanDomain = currentDomain
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .toLowerCase();
  const isSubdomain = cleanDomain.split('.').length > 2 && !cleanDomain.startsWith('www.');
  const subdomainPrefix = isSubdomain ? cleanDomain.split('.')[0] : 'www';

  return (
    <div className="space-y-6 p-4">
      <PanelHeader
        title="Publish & Deploy"
        hint="Request managed hosting or export standalone source code."
      />

      {/* Status Header Bar */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-foreground">Project Status</div>
          <div className="text-[11px] text-muted-foreground">
            {isLive
              ? 'Site is live and serving traffic.'
              : isPublishRequested
              ? 'Awaiting review from an administrator.'
              : 'Ready for review or export.'}
          </div>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
            statusBadge.variant,
          )}
        >
          {isLive ? (
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ) : isPublishRequested ? (
            <Clock className="h-3 w-3 text-amber-400" />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
          )}
          {statusBadge.label}
        </span>
      </div>

      {/* Managed Hosting & Request Publish */}
      <div className="space-y-3.5">
        <SectionLabel>Managed Hosting</SectionLabel>

        {isPublishRequested ? (
          <div className="space-y-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
            <div className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-amber-300">Publish Requested</p>
                <p className="text-amber-200/90 leading-relaxed text-[11px]">
                  Your request was submitted on{' '}
                  <span className="font-medium text-amber-100">
                    {new Date(meta.publishRequestedAt!).toLocaleString()}
                  </span>
                  . An operator will review your site content and provision Dokploy hosting.
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={publishing}
              onClick={handlePublishToggle}
              className="h-8 w-full border-amber-500/40 text-xs text-amber-200 hover:bg-amber-500/20"
            >
              {publishing ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <X className="mr-1.5 h-3.5 w-3.5" />
              )}
              Cancel publish request
            </Button>
          </div>
        ) : (
          <div className="space-y-3 rounded-lg border border-border bg-card p-3.5">
            <div className="flex items-start gap-2.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Trigger 1-click automated cloud deployment to Dokploy PaaS or request operator review
                for managed SSL and custom domain attachment.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                className="w-full font-medium"
                disabled={deployingDirect || publishing}
                onClick={handleDirectDeploy}
              >
                {deployingDirect ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying Container Pipeline...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-4 w-4" />
                    1-Click Deploy to Cloud
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full text-xs"
                disabled={publishing || deployingDirect}
                onClick={handlePublishToggle}
              >
                {publishing ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                )}
                Request Operator Review
              </Button>
            </div>

            {deployResult && (
              <div
                className={cn(
                  'rounded-md p-2.5 text-xs',
                  deployResult.success
                    ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border border-destructive/30 bg-destructive/10 text-destructive',
                )}
              >
                {deployResult.success ? (
                  <div className="space-y-1">
                    <p className="font-semibold">🚀 {deployResult.message}</p>
                    {deployResult.liveUrl && (
                      <a
                        href={deployResult.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 underline font-mono text-emerald-200 hover:text-emerald-100"
                      >
                        {deployResult.liveUrl} <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ) : (
                  <p>❌ {deployResult.error}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Domain Configuration */}
      <div className="space-y-3.5">
        <SectionLabel>Custom Domain & DNS</SectionLabel>
        <form onSubmit={handleSaveDomain} className="space-y-2">
          <FieldShell hint="Enter your custom apex domain (e.g. acme.com) or subdomain (e.g. portal.acme.com).">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="acme.com"
                  className="h-9 pl-9 text-xs"
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={savingDomain || domainInput === (meta.customDomain ?? '')}
                className="h-9 text-xs"
              >
                {savingDomain ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </FieldShell>
        </form>

        {cleanDomain ? (
          <div className="space-y-3 rounded-lg border border-border bg-card p-3.5 text-xs">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="font-semibold text-foreground">Required DNS Records</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={verifyingDomain}
                onClick={handleVerifyDns}
                className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground"
              >
                {verifyingDomain ? (
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="mr-1 h-3 w-3" />
                )}
                Verify DNS Readiness
              </Button>
            </div>

            {/* DNS Check Feedback Alert */}
            {domainCheckResult && (
              <div
                className={cn(
                  'rounded-md p-2.5 text-[11px] space-y-1',
                  domainCheckResult.configured
                    ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border border-amber-500/30 bg-amber-500/10 text-amber-300',
                )}
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  {domainCheckResult.configured ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                  )}
                  {domainCheckResult.configured
                    ? 'DNS Record Verified & Ready'
                    : 'DNS Record Pending or Propagating'}
                </div>
                <p className="text-muted-foreground">
                  {domainCheckResult.details || domainCheckResult.error}
                </p>
                {domainCheckResult.resolvedValues && domainCheckResult.resolvedValues.length > 0 && (
                  <p className="font-mono text-[10px] opacity-80">
                    Resolved DNS: {domainCheckResult.resolvedValues.join(', ')}
                  </p>
                )}
              </div>
            )}

            {/* CNAME Record */}
            <div className="space-y-1 rounded-md border border-border/80 bg-background/60 p-2.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                <span className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">
                  CNAME
                </span>
                <span>Subdomain / Routing</span>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-muted-foreground">Host / Name:</span>
                  <div className="flex items-center justify-between font-mono text-foreground">
                    <span>{subdomainPrefix}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('cname-host', subdomainPrefix)}
                      className="text-muted-foreground hover:text-foreground"
                      title="Copy host"
                    >
                      {copiedKey === 'cname-host' ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Points to:</span>
                  <div className="flex items-center justify-between font-mono text-foreground">
                    <span className="truncate">cname.dokploy.app</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('cname-target', 'cname.dokploy.app')}
                      className="text-muted-foreground hover:text-foreground"
                      title="Copy target"
                    >
                      {copiedKey === 'cname-target' ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* A Record */}
            <div className="space-y-1 rounded-md border border-border/80 bg-background/60 p-2.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                <span className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">
                  A Record
                </span>
                <span>Apex Domain</span>
              </div>
              <div className="mt-1.5 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-muted-foreground">Host / Name:</span>
                  <div className="flex items-center justify-between font-mono text-foreground">
                    <span>@</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('a-host', '@')}
                      className="text-muted-foreground hover:text-foreground"
                      title="Copy host"
                    >
                      {copiedKey === 'a-host' ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Points to:</span>
                  <div className="flex items-center justify-between font-mono text-foreground">
                    <span>76.76.21.21</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('a-target', '76.76.21.21')}
                      className="text-muted-foreground hover:text-foreground"
                      title="Copy IP"
                    >
                      {copiedKey === 'a-target' ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Export Source & Deploy Guides */}
      <div className="space-y-3.5 border-t border-border pt-5">
        <SectionLabel>Export & Self-Host</SectionLabel>
        <div className="space-y-2.5 rounded-lg border border-border bg-card p-3.5 text-xs text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <FolderArchive className="h-4 w-4 shrink-0 text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">Standalone Next.js Package</p>
              <p className="text-[11px] leading-relaxed">
                Export the complete, production-ready Next.js source code with your content, themes,
                production <code className="font-mono text-foreground">Dockerfile</code>, and a
                comprehensive <code className="font-mono text-foreground">DEPLOY.md</code> guide.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <FileCode className="h-3 w-3 text-emerald-400" />
              <span>Vercel (1-Click)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCode className="h-3 w-3 text-blue-400" />
              <span>Netlify</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCode className="h-3 w-3 text-amber-400" />
              <span>Cloudflare Pages</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCode className="h-3 w-3 text-purple-400" />
              <span>Docker / VPS</span>
            </div>
          </div>
        </div>

        <Button asChild variant="outline" className="w-full">
          <a href={`/api/projects/${meta.id}/export`} download>
            <Download className="mr-2 h-4 w-4" />
            Export source (.zip)
          </a>
        </Button>
      </div>
    </div>
  );
}

export { DeployPanel as PublishPanel };
