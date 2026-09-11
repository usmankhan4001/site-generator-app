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
  Layers,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    description: 'Import the downloaded project into Vercel or run `vercel` CLI. Automatic HTTPS & instant deployments on every update.',
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
    description: 'Drop the exported package directly into the Netlify dashboard for instant live URL and form handling support.',
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
    description: 'Includes a production-ready `Dockerfile` and `DEPLOY.md`. Run anywhere with 100% control over infrastructure.',
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
    description: 'Export clean static output or push to GitHub to host directly on github.io with version history.',
    icon: Github,
    accentColor: 'text-blue-600 dark:text-blue-400',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40',
    guideUrl: '/guides',
    features: ['Automated GitHub Actions', 'Free unlimited bandwidth', 'Git version tracking'],
  },
];

export function ExportHostModal({
  open,
  onClose,
  projectId,
  projectName = 'my-site',
}: ExportHostModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformOption>(PLATFORMS[0]);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

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
      const filename = `${projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-source.zip`;
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
        className="relative flex h-[88vh] max-h-[750px] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground">
                  Export & Hosting Hub
                </h2>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-500">
                  Production Standalone Package
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Download your complete Next.js website package with tailored deployment guides for your target platform.
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

        {/* Content Body: Split between Platform Selector & Attached Guide Preview */}
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {/* Left Pane: Visual Platform Cards */}
          <div className="thin-scroll flex-1 overflow-y-auto p-6 space-y-4 border-r border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                1. Select Target Hosting Platform
              </span>
              <span className="text-[11px] text-muted-foreground">
                Click a card to download & view guide
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
                      <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl shadow-xs', platform.bgLight)}>
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
                          <div key={feat} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
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

            {/* Direct Zip Download Card */}
            <div className="rounded-2xl border border-border bg-muted/30 p-4 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-background border border-border text-foreground">
                  <FileCode className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Raw Standalone Next.js Bundle</p>
                  <p className="text-[11px] text-muted-foreground">Includes `package.json`, `Dockerfile`, `DEPLOY.md`, content schema & assets.</p>
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

          {/* Right Pane: Attached Interactive Guide Details */}
          <div className="thin-scroll w-full lg:w-[420px] shrink-0 bg-muted/10 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  2. Attached Platform Walkthrough
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
                  <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', selectedPlatform.bgLight)}>
                    <selectedPlatform.icon className={cn('h-6 w-6', selectedPlatform.accentColor)} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{selectedPlatform.name} Guide</h4>
                    <p className="text-[11px] text-muted-foreground">Deploy in 3 simple steps</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">1</span>
                    <p className="text-xs text-muted-foreground leading-snug">
                      <strong className="text-foreground font-medium">Download Source Zip:</strong> Grab the standalone production package below.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">2</span>
                    <p className="text-xs text-muted-foreground leading-snug">
                      <strong className="text-foreground font-medium">Import to {selectedPlatform.name}:</strong> Upload the folder or push to your Git repository.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">3</span>
                    <p className="text-xs text-muted-foreground leading-snug">
                      <strong className="text-foreground font-medium">Connect Domain & SSL:</strong> Add your custom domain in the host dashboard with free SSL.
                    </p>
                  </div>
                </div>
              </div>

              {downloadSuccess && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Source package downloaded! Open the guide below to complete deployment.</span>
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
                <span>{downloading ? 'Preparing zip...' : `Download Zip & Deploy on ${selectedPlatform.name}`}</span>
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
      </div>
    </div>
  );
}
