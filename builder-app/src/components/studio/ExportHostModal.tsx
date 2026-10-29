'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Download,
  ExternalLink,
  Terminal,
  Server,
  Rocket,
  Github,
  CheckCircle2,
  X,
  FileCode,
  BookOpen,
  Loader2,
  Globe,
  Cloud,
  Copy,
  Check,
  Code2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStudio } from '@/store/studio';
import { cn } from '@/lib/utils';

interface ExportHostModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectName?: string;
}

interface PlatformOption {
  id: 'vercel' | 'netlify' | 'hostinger' | 'github' | 'standalone';
  name: string;
  badge: string;
  tagline: string;
  description: string;
  icon: typeof Terminal;
  accentColor: string;
  bgLight: string;
  guideUrl: string;
  features: string[];
}

const PLATFORMS: PlatformOption[] = [
  {
    id: 'vercel',
    name: 'Vercel Edge Cloud',
    badge: 'Fastest Deploy',
    tagline: 'Global CDN, Edge Functions & Custom Domains in 1 minute.',
    description:
      'Import the downloaded project into Vercel or run `vercel` CLI. Automatic HTTPS & instant deployments on every update.',
    icon: Terminal,
    accentColor: 'text-zinc-900 dark:text-zinc-100',
    bgLight: 'bg-zinc-100 dark:bg-zinc-800',
    guideUrl: '/guides/vercel',
    features: ['Automatic Next.js optimization', 'Custom domain with free SSL', 'Global Edge CDN'],
  },
  {
    id: 'netlify',
    name: 'Netlify Drag-&-Drop',
    badge: 'No Code Deploy',
    tagline: 'Drag-and-drop your exported folder or connect Git repository.',
    description:
      'Drop the exported package directly into the Netlify dashboard for instant live URL and form handling support.',
    icon: Server,
    accentColor: 'text-teal-600 dark:text-teal-400',
    bgLight: 'bg-teal-50 dark:bg-teal-950/40',
    guideUrl: '/guides/netlify',
    features: ['Drag & drop deploy', 'Managed DNS & SSL', 'Built-in Form handling'],
  },
  {
    id: 'hostinger',
    name: 'Hostinger / Cloud VPS',
    badge: 'Full Ownership',
    tagline: 'Self-host with Docker container or Node PM2 on your own VPS.',
    description:
      'Includes a production-ready `Dockerfile` and `DEPLOY.md`. Run anywhere with 100% control over infrastructure.',
    icon: Rocket,
    accentColor: 'text-purple-600 dark:text-purple-400',
    bgLight: 'bg-purple-50 dark:bg-purple-950/40',
    guideUrl: '/guides/hostinger',
    features: ['Pre-configured Dockerfile', 'Zero vendor lock-in', 'Complete server control'],
  },
  {
    id: 'github',
    name: 'GitHub Pages / Git',
    badge: 'Free Hosting',
    tagline: 'Push to a GitHub repository with automated GitHub Actions CI/CD.',
    description:
      'Export clean static output or push to GitHub to host directly on github.io with version history.',
    icon: Github,
    accentColor: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40',
    guideUrl: '/guides',
    features: ['Automated GitHub Actions', 'Free unlimited bandwidth', 'Git version tracking'],
  },
];

type HostTab = 'zip' | 'cloudflare' | 'vercel' | 'managed';

const MODAL_TABS = [
  { id: 'zip', label: 'Export ZIP & CLI', icon: Download, badge: 'Scripts Included' },
  { id: 'cloudflare', label: 'Cloudflare Pages', icon: Cloud, badge: '1-Click Direct' },
  { id: 'vercel', label: 'Vercel Edge', icon: Rocket, badge: '1-Click Direct' },
  { id: 'managed', label: 'Managed & GitHub', icon: Server, badge: 'Standard Cloud' },
] as const;

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'my-site'
  );
}

export function ExportHostModal({
  open,
  onClose,
  projectId,
  projectName = 'my-site',
}: ExportHostModalProps) {
  const meta = useStudio((s) => s.meta);
  const requestPublish = useStudio((s) => s.requestPublish);

  const [activeTab, setActiveTab] = useState<HostTab>('zip');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformOption>(PLATFORMS[0]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // ZIP Download state
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Managed & GitHub state
  const [customDomain, setCustomDomain] = useState(meta?.customDomain ?? meta?.domain ?? '');
  const [deploying, setDeploying] = useState<'managed' | 'github' | null>(null);
  const [deployBanner, setDeployBanner] = useState<{
    ok: boolean;
    message: string;
    liveUrl?: string;
  } | null>(null);

  // Cloudflare Pages Form State
  const defaultSlug = slugify(projectName);
  const [cfAccountId, setCfAccountId] = useState('');
  const [cfApiToken, setCfApiToken] = useState('');
  const [cfProjectName, setCfProjectName] = useState(defaultSlug);
  const [cfDeploying, setCfDeploying] = useState(false);
  const [cfResult, setCfResult] = useState<{
    ok: boolean;
    message: string;
    liveUrl?: string;
    dnsInstructions?: { type: string; name: string; target: string };
  } | null>(null);

  // Vercel Form State
  const [vercelToken, setVercelToken] = useState('');
  const [vercelProjectName, setVercelProjectName] = useState(defaultSlug);
  const [vercelHookUrl, setVercelHookUrl] = useState('');
  const [vercelDeploying, setVercelDeploying] = useState(false);
  const [vercelResult, setVercelResult] = useState<{
    ok: boolean;
    message: string;
    liveUrl?: string;
    dnsInstructions?: { type: string; name: string; target: string };
  } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const exportUrl = `/api/projects/${projectId}/export`;

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(id);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.warn('Clipboard write failed', err);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);
    try {
      const res = await fetch(exportUrl);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Export failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const filename = `${defaultSlug}-source.zip`;
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
    } catch (err) {
      console.error('[export] error:', err);
      setDownloadError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setDownloading(false);
    }
  };

  const handleCloudflareDeploy = async () => {
    if (!cfAccountId.trim() || !cfApiToken.trim()) {
      setCfResult({
        ok: false,
        message: 'Please provide both your Cloudflare Account ID and API Token.',
      });
      return;
    }
    setCfDeploying(true);
    setCfResult(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/cloudflare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: cfAccountId.trim(),
          apiToken: cfApiToken.trim(),
          projectName: cfProjectName.trim() || defaultSlug,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setCfResult({
          ok: true,
          message: 'Deployed directly to Cloudflare Pages!',
          liveUrl: data.liveUrl,
          dnsInstructions: data.dnsInstructions,
        });
      } else {
        setCfResult({
          ok: false,
          message: data.error || 'Cloudflare deployment failed.',
        });
      }
    } catch (err) {
      setCfResult({
        ok: false,
        message: err instanceof Error ? err.message : 'Cloudflare deployment failed.',
      });
    } finally {
      setCfDeploying(false);
    }
  };

  const handleVercelDeploy = async () => {
    if (!vercelToken.trim() && !vercelHookUrl.trim()) {
      setVercelResult({
        ok: false,
        message: 'Please provide a Vercel API Token or Deploy Hook URL.',
      });
      return;
    }
    setVercelDeploying(true);
    setVercelResult(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/vercel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: vercelToken.trim() || undefined,
          deployHookUrl: vercelHookUrl.trim() || undefined,
          projectName: vercelProjectName.trim() || defaultSlug,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setVercelResult({
          ok: true,
          message: 'Deployed directly to Vercel!',
          liveUrl: data.liveUrl,
          dnsInstructions: data.dnsInstructions,
        });
      } else {
        setVercelResult({
          ok: false,
          message: data.error || 'Vercel deployment failed.',
        });
      }
    } catch (err) {
      setVercelResult({
        ok: false,
        message: err instanceof Error ? err.message : 'Vercel deployment failed.',
      });
    } finally {
      setVercelDeploying(false);
    }
  };

  const handleInstantDeploy = async (mode: 'managed' | 'github') => {
    setDeploying(mode);
    setDeployBanner(null);
    try {
      const endpoint =
        mode === 'github'
          ? `/api/projects/${projectId}/github-pages`
          : `/api/projects/${projectId}/deploy`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customDomain: customDomain.trim() || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        if (data.mode === 'queued_for_operator') {
          await requestPublish();
        }
        setDeployBanner({
          ok: true,
          message: data.message || 'Deployment started!',
          liveUrl: data.liveUrl,
        });
      } else {
        setDeployBanner({
          ok: false,
          message: data.error || 'Deployment failed.',
        });
      }
    } catch (err) {
      setDeployBanner({
        ok: false,
        message: err instanceof Error ? err.message : 'Deployment failed.',
      });
    } finally {
      setDeploying(null);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
    >
      <div
        role="dialog"
        aria-label="Export and Host Hub"
        className="relative flex h-[88vh] max-h-[780px] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground">Export & Hosting Hub</h2>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-500">
                  Universal Multi-Cloud
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                1-Click Direct Cloud Deployments, Downloadable 1-Command CLI Scripts & Self-Hosting
                Packages.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close export hub"
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Tab Bar */}
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/20 px-6 py-2 overflow-x-auto">
          {MODAL_TABS.map((tab) => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as HostTab)}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.2 text-[9px] font-medium tracking-tight',
                    active
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Export ZIP & CLI Scripts */}
        {activeTab === 'zip' && (
          <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
            {/* Left Pane */}
            <div className="thin-scroll flex-1 overflow-y-auto p-6 space-y-4 border-r border-border">
              {/* Highlight Card for 1-Command CLI Scripts */}
              <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 space-y-3.5 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        Universal 1-Command CLI Deploy Scripts Included
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                          Pre-Configured
                        </span>
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        ZIP packages contain self-contained interactive scripts and cloud configs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border/80 bg-background/80 p-3 font-mono text-[11px] text-muted-foreground space-y-1.5">
                  <div className="flex items-center justify-between text-foreground font-semibold">
                    <span>⚡ Bundled Automation Scripts:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('./deploy.sh', 'sh-cmd')}
                      className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                    >
                      {copiedField === 'sh-cmd' ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy command</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-foreground font-medium">
                    • <code className="text-primary font-bold">deploy.sh</code> — Bash script for
                    macOS/Linux (Cloudflare, Vercel, Netlify, Docker)
                  </div>
                  <div className="text-xs text-foreground font-medium">
                    • <code className="text-primary font-bold">deploy.ps1</code> — PowerShell script
                    for Windows with colored menu
                  </div>
                  <div className="text-[11px] opacity-80">
                    • <code className="font-semibold">wrangler.toml</code> &{' '}
                    <code className="font-semibold">vercel.json</code> ready for immediate zero-config
                    deployment
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Works offline, fully self-contained</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="gap-2 font-semibold shadow-xs"
                  >
                    <Download className="h-4 w-4" />
                    <span>{downloading ? 'Packing ZIP...' : 'Download ZIP Package'}</span>
                  </Button>
                </div>
              </div>

              {/* Platform Cards Section */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Select Target Platform Guide
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Click a card to inspect workflow
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PLATFORMS.map((platform) => {
                  const isSelected = selectedPlatform.id === platform.id;
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlatform(platform);
                        setDownloadSuccess(false);
                      }}
                      className={cn(
                        'group relative flex flex-col items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200',
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20 -translate-y-0.5'
                          : 'border-border bg-card hover:border-primary/40 hover:bg-accent/40',
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-xl shadow-xs',
                            platform.bgLight,
                          )}
                        >
                          <Icon className={cn('h-5 w-5', platform.accentColor)} />
                        </div>
                        <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          {platform.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-foreground group-hover:text-primary">
                          {platform.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          {platform.tagline}
                        </p>
                      </div>

                      <div className="mt-auto w-full pt-2 border-t border-border/60">
                        <div className="flex flex-col gap-1">
                          {platform.features.map((feat) => (
                            <div
                              key={feat}
                              className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                            >
                              <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Direct Raw Bundle Card */}
              <div className="rounded-2xl border border-border bg-muted/30 p-4 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background border border-border text-foreground">
                    <FileCode className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Complete Standalone Next.js Source Bundle
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Includes `package.json`, `Dockerfile`, `deploy.sh`, `deploy.ps1`, `wrangler.toml`,
                      `vercel.json`.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-background border border-border px-3 py-2 text-xs font-medium text-foreground hover:bg-accent shadow-xs disabled:opacity-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{downloading ? 'Exporting...' : 'Download .zip'}</span>
                </button>
              </div>
            </div>

            {/* Right Pane: Platform Walkthrough */}
            <div className="thin-scroll w-full lg:w-[400px] shrink-0 bg-muted/10 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Attached Platform Walkthrough
                  </span>
                  <Link
                    href={selectedPlatform.guideUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] text-primary font-medium hover:underline"
                  >
                    <span>Full Guide</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-xl',
                        selectedPlatform.bgLight,
                      )}
                    >
                      <selectedPlatform.icon
                        className={cn('h-6 w-6', selectedPlatform.accentColor)}
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {selectedPlatform.name} Guide
                      </h4>
                      <p className="text-[11px] text-muted-foreground">Deploy in 3 simple steps</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                        1
                      </span>
                      <p className="text-xs text-muted-foreground leading-snug">
                        <strong className="text-foreground font-medium">Download Source ZIP:</strong>{' '}
                        Grab the standalone production package below.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                        2
                      </span>
                      <p className="text-xs text-muted-foreground leading-snug">
                        <strong className="text-foreground font-medium">
                          Run 1-Command CLI or Import:
                        </strong>{' '}
                        Run <code className="text-primary font-mono">./deploy.sh</code> or upload to{' '}
                        {selectedPlatform.name}.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                        3
                      </span>
                      <p className="text-xs text-muted-foreground leading-snug">
                        <strong className="text-foreground font-medium">Connect Domain & SSL:</strong>{' '}
                        Add your custom domain in the host dashboard with free SSL.
                      </p>
                    </div>
                  </div>
                </div>

                {downloadSuccess && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>
                      Package downloaded! Run <code className="font-mono">./deploy.sh</code> or open the guide below.
                    </span>
                  </div>
                )}

                {downloadError && (
                  <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                    <X className="h-4 w-4 shrink-0" />
                    <span>{downloadError}</span>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 space-y-2">
                <Button
                  size="lg"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full gap-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  <Download className="h-4 w-4" />
                  <span>
                    {downloading
                      ? 'Preparing ZIP...'
                      : `Download ZIP & Deploy on ${selectedPlatform.name}`}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full text-xs rounded-xl"
                >
                  <Link href={selectedPlatform.guideUrl} target="_blank">
                    <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                    <span>Open Step-by-Step {selectedPlatform.name} Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Cloudflare Pages (1-Click Direct Token Deploy) */}
        {activeTab === 'cloudflare' && (
          <div className="thin-scroll flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header Box */}
              <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-500 shadow-xs">
                    <Cloud className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Deploy to Cloudflare Pages
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      1-Click direct upload to Cloudflare’s ultra-fast Edge Network with unlimited bandwidth and free SSL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1.5">
                      Cloudflare Account ID <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={cfAccountId}
                      onChange={(e) => setCfAccountId(e.target.value)}
                      placeholder="e.g. 7d8c6b4e1f2a3c5d6e7f8a9b0c1d2e3f"
                      className="text-xs font-mono"
                    />
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Found in Cloudflare Dashboard under Overview → Account ID.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-foreground">
                        Cloudflare API Token <span className="text-destructive">*</span>
                      </label>
                      <a
                        href="https://dash.cloudflare.com/profile/api-tokens"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                      >
                        <span>Create Token</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <Input
                      type="password"
                      value={cfApiToken}
                      onChange={(e) => setCfApiToken(e.target.value)}
                      placeholder="Cloudflare API Token (Pages: Edit permission)"
                      className="text-xs font-mono"
                    />
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Requires <strong className="text-foreground">Cloudflare Pages: Edit</strong> permission.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1.5">
                      Project Name (Subdomain)
                    </label>
                    <div className="flex items-center">
                      <Input
                        value={cfProjectName}
                        onChange={(e) => setCfProjectName(e.target.value)}
                        placeholder="my-site"
                        className="text-xs font-mono rounded-r-none border-r-0"
                      />
                      <span className="inline-flex h-9 items-center rounded-r-md border border-input bg-muted px-3 text-xs text-muted-foreground font-mono">
                        .pages.dev
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCloudflareDeploy}
                  disabled={cfDeploying}
                  className="w-full gap-2 rounded-xl text-xs font-semibold h-10 shadow-sm"
                >
                  {cfDeploying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deploying bundle to Cloudflare Pages...</span>
                    </>
                  ) : (
                    <>
                      <Cloud className="h-4 w-4" />
                      <span>Deploy to Cloudflare Pages</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Status / Output Section */}
              {cfResult && (
                <div
                  className={cn(
                    'rounded-2xl border p-5 space-y-4 transition-all',
                    cfResult.ok
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-destructive/30 bg-destructive/5',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {cfResult.ok ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      ) : (
                        <ShieldAlert className="h-5 w-5 text-destructive shrink-0" />
                      )}
                      <div>
                        <h4
                          className={cn(
                            'text-sm font-bold',
                            cfResult.ok ? 'text-emerald-500' : 'text-destructive',
                          )}
                        >
                          {cfResult.ok ? 'Live on Cloudflare Pages!' : 'Deployment Failed'}
                        </h4>
                        <p className="text-xs text-muted-foreground">{cfResult.message}</p>
                      </div>
                    </div>

                    {cfResult.liveUrl && (
                      <a
                        href={cfResult.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 shadow-xs"
                      >
                        <span>Open Site</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {/* DNS Instructions Card */}
                  {cfResult.dnsInstructions && (
                    <div className="rounded-xl border border-border/80 bg-background/90 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">
                          Custom Domain DNS Setup Instructions
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Point your custom domain
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                        <div className="rounded-lg bg-muted/50 p-2">
                          <span className="block text-[10px] uppercase text-muted-foreground font-sans font-semibold">
                            Type
                          </span>
                          <span className="font-bold text-foreground">
                            {cfResult.dnsInstructions.type}
                          </span>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-2">
                          <span className="block text-[10px] uppercase text-muted-foreground font-sans font-semibold">
                            Host
                          </span>
                          <span className="font-bold text-foreground">
                            {cfResult.dnsInstructions.name}
                          </span>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-2 flex items-center justify-between">
                          <div className="overflow-hidden">
                            <span className="block text-[10px] uppercase text-muted-foreground font-sans font-semibold">
                              Target
                            </span>
                            <span className="font-bold text-foreground truncate block">
                              {cfResult.dnsInstructions.target}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(cfResult.dnsInstructions!.target, 'cf-target')
                            }
                            className="text-muted-foreground hover:text-foreground shrink-0 ml-1"
                            title="Copy target"
                          >
                            {copiedField === 'cf-target' ? (
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Vercel Edge (1-Click Direct Token Deploy) */}
        {activeTab === 'vercel' && (
          <div className="thin-scroll flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Header Box */}
              <div className="rounded-2xl border border-zinc-500/30 bg-zinc-500/5 p-5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Deploy to Vercel</h3>
                    <p className="text-xs text-muted-foreground">
                      Instant Edge deployment with automatic Next.js optimization, global CDN, and zero configuration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-foreground">
                        Vercel API Token <span className="text-destructive">*</span>
                      </label>
                      <a
                        href="https://vercel.com/account/tokens"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                      >
                        <span>Create Token</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <Input
                      type="password"
                      value={vercelToken}
                      onChange={(e) => setVercelToken(e.target.value)}
                      placeholder="Vercel Personal Access Token"
                      className="text-xs font-mono"
                    />
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Generated under Vercel Dashboard → Account Settings → Tokens.
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1.5">
                      Vercel Project Name
                    </label>
                    <div className="flex items-center">
                      <Input
                        value={vercelProjectName}
                        onChange={(e) => setVercelProjectName(e.target.value)}
                        placeholder="my-site"
                        className="text-xs font-mono rounded-r-none border-r-0"
                      />
                      <span className="inline-flex h-9 items-center rounded-r-md border border-input bg-muted px-3 text-xs text-muted-foreground font-mono">
                        .vercel.app
                      </span>
                    </div>
                  </div>

                  {/* Deploy Hook Option */}
                  <div className="pt-2 border-t border-border/70">
                    <label className="text-xs font-bold text-foreground block mb-1">
                      Or Deploy Hook URL <span className="text-muted-foreground text-[10px] font-normal">(Optional)</span>
                    </label>
                    <Input
                      value={vercelHookUrl}
                      onChange={(e) => setVercelHookUrl(e.target.value)}
                      placeholder="https://api.vercel.com/v1/integrations/deploy/..."
                      className="text-xs font-mono"
                    />
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      If you already created a Deploy Hook inside your Vercel Project Settings.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleVercelDeploy}
                  disabled={vercelDeploying}
                  className="w-full gap-2 rounded-xl text-xs font-semibold h-10 shadow-sm"
                >
                  {vercelDeploying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Triggering Vercel deployment...</span>
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" />
                      <span>Deploy to Vercel</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Status / Output Section */}
              {vercelResult && (
                <div
                  className={cn(
                    'rounded-2xl border p-5 space-y-4 transition-all',
                    vercelResult.ok
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-destructive/30 bg-destructive/5',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {vercelResult.ok ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      ) : (
                        <ShieldAlert className="h-5 w-5 text-destructive shrink-0" />
                      )}
                      <div>
                        <h4
                          className={cn(
                            'text-sm font-bold',
                            vercelResult.ok ? 'text-emerald-500' : 'text-destructive',
                          )}
                        >
                          {vercelResult.ok ? 'Live on Vercel Edge!' : 'Deployment Failed'}
                        </h4>
                        <p className="text-xs text-muted-foreground">{vercelResult.message}</p>
                      </div>
                    </div>

                    {vercelResult.liveUrl && (
                      <a
                        href={vercelResult.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 shadow-xs"
                      >
                        <span>Open Site</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {/* DNS Instructions Card */}
                  {vercelResult.dnsInstructions && (
                    <div className="rounded-xl border border-border/80 bg-background/90 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">
                          Vercel Custom Domain DNS Guide
                        </span>
                        <span className="text-[10px] text-muted-foreground">CNAME target</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                        <div className="rounded-lg bg-muted/50 p-2">
                          <span className="block text-[10px] uppercase text-muted-foreground font-sans font-semibold">
                            Type
                          </span>
                          <span className="font-bold text-foreground">
                            {vercelResult.dnsInstructions.type}
                          </span>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-2">
                          <span className="block text-[10px] uppercase text-muted-foreground font-sans font-semibold">
                            Host
                          </span>
                          <span className="font-bold text-foreground">
                            {vercelResult.dnsInstructions.name}
                          </span>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-2 flex items-center justify-between">
                          <div className="overflow-hidden">
                            <span className="block text-[10px] uppercase text-muted-foreground font-sans font-semibold">
                              Target
                            </span>
                            <span className="font-bold text-foreground truncate block">
                              {vercelResult.dnsInstructions.target}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(vercelResult.dnsInstructions!.target, 'vercel-target')
                            }
                            className="text-muted-foreground hover:text-foreground shrink-0 ml-1"
                            title="Copy target"
                          >
                            {copiedField === 'vercel-target' ? (
                              <Check className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Managed Cloud & GitHub Pages */}
        {activeTab === 'managed' && (
          <div className="thin-scroll flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Managed Cloud Card */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Rocket className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">
                        Managed Infrastructure Publish
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Publish directly to managed cloud hosting with automated SSL and monitoring.
                      </p>
                    </div>
                  </div>
                  {meta?.liveUrl && (
                    <a
                      href={meta.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-500 hover:underline"
                    >
                      <span>Current Live</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1.5">
                      Custom Domain (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        placeholder="yourcompany.com"
                        className="h-9 pl-8 text-xs bg-background"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <Button
                      size="sm"
                      onClick={() => handleInstantDeploy('managed')}
                      disabled={deploying !== null}
                      className="flex-1 h-9 gap-1.5 text-xs font-semibold"
                    >
                      {deploying === 'managed' ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Rocket className="h-3.5 w-3.5" />
                      )}
                      <span>Publish Live to Cloud</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleInstantDeploy('github')}
                      disabled={deploying !== null}
                      className="flex-1 h-9 gap-1.5 text-xs bg-background"
                    >
                      {deploying === 'github' ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Github className="h-3.5 w-3.5" />
                      )}
                      <span>Deploy to GitHub Pages</span>
                    </Button>
                  </div>
                </div>

                {deployBanner && (
                  <div
                    className={cn(
                      'flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs',
                      deployBanner.ok
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : 'border-destructive/30 bg-destructive/10 text-destructive',
                    )}
                  >
                    <span>{deployBanner.message}</span>
                    {deployBanner.liveUrl && (
                      <a
                        href={deployBanner.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono font-semibold underline"
                      >
                        {deployBanner.liveUrl.replace(/^https?:\/\//, '')}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
