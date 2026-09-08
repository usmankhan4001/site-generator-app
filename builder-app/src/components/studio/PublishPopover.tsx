'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Rocket,
  ExternalLink,
  Loader2,
  Download,
  Globe,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useStudio } from '@/store/studio';
import { auditAirwallexReadiness } from '@/site/compliance/airwallex';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Compact publish card rendered inside the right panel when the user
 * clicks the toolbar's Publish button. Acts as a clean popover — one
 * card, essential actions, no sprawling settings.
 */
export function PublishPopover() {
  const meta = useStudio((s) => s.meta);
  const content = useStudio((s) => s.content);
  const setCustomDomain = useStudio((s) => s.setCustomDomain);
  const requestPublish = useStudio((s) => s.requestPublish);
  const cancelPublishRequest = useStudio((s) => s.cancelPublishRequest);
  const setAirwallexCheckoutUrl = useStudio((s) => s.setAirwallexCheckoutUrl);

  const [domainInput, setDomainInput] = useState(
    meta?.customDomain ?? meta?.domain ?? '',
  );
  const [publishing, setPublishing] = useState(false);
  const [deployResult, setDeployResult] = useState<{
    success?: boolean;
    liveUrl?: string;
    message?: string;
    error?: string;
  } | null>(null);
  const [savingDomain, setSavingDomain] = useState(false);

  // Checkout URL for demo-mode callout
  const [checkoutUrlInput, setCheckoutUrlInput] = useState(
    content?.airwallexCheckoutUrl ?? '',
  );
  const [savingCheckoutUrl, setSavingCheckoutUrl] = useState(false);

  // Airwallex onboarding readiness — computed live from the site content.
  const airwallexAudit = content ? auditAirwallexReadiness(content) : null;

  if (!meta) return null;

  const currentDomain = meta.customDomain || meta.domain || '';
  const isLive = meta.hostingStatus === 'active' || Boolean(meta.liveUrl);
  const isQueued =
    Boolean(meta.publishRequestedAt) &&
    !isLive &&
    meta.hostingStatus !== 'active';

  /* ── handlers ──────────────────────────────────────────────────────── */

  const handlePublish = async () => {
    if (!meta.id) return;
    setPublishing(true);
    setDeployResult(null);
    try {
      // Optionally save domain first
      if (domainInput.trim() !== (meta.customDomain ?? '')) {
        await setCustomDomain(domainInput.trim() || null);
      }

      const res = await fetch(`/api/projects/${meta.id}/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customDomain: domainInput.trim() || currentDomain || undefined,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setDeployResult({
          success: true,
          liveUrl: data.liveUrl,
          message: data.message || 'Deployment triggered.',
        });
        // If queued for operator (no credentials), request review
        if (data.mode === 'queued_for_operator') {
          await requestPublish();
        }
      } else {
        setDeployResult({
          success: false,
          error: data.error || 'Deployment failed.',
        });
      }
    } catch (err: unknown) {
      setDeployResult({
        success: false,
        error: err instanceof Error ? err.message : 'Request failed.',
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleRepublish = async () => {
    if (!meta.id) return;
    setPublishing(true);
    setDeployResult(null);
    try {
      const res = await fetch(`/api/projects/${meta.id}/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customDomain: currentDomain || undefined,
        }),
      });
      const data = await res.json();
      setDeployResult({
        success: res.ok && data.success,
        liveUrl: data.liveUrl,
        message: data.success
          ? data.message || 'Republished.'
          : data.error || 'Republish failed.',
        error: res.ok && data.success ? undefined : data.error,
      });
    } catch (err: unknown) {
      setDeployResult({
        success: false,
        error: err instanceof Error ? err.message : 'Request failed.',
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveCheckoutUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCheckoutUrl(true);
    try {
      setAirwallexCheckoutUrl(checkoutUrlInput.trim() || undefined);
    } finally {
      setSavingCheckoutUrl(false);
    }
  };

  const handleCancelRequest = async () => {
    setPublishing(true);
    try {
      await cancelPublishRequest();
    } finally {
      setPublishing(false);
    }
  };

  /* ── live URL for display ──────────────────────────────────────────── */

  const displayUrl =
    deployResult?.liveUrl || meta.liveUrl || null;

  /* ── render ────────────────────────────────────────────────────────── */

  return (
    <div className="space-y-4 p-4">
      {/* Airwallex demo-mode callout */}
      {!content?.airwallexCheckoutUrl && (
        <form
          onSubmit={handleSaveCheckoutUrl}
          className="space-y-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-[11px] text-amber-200"
        >
          <p className="font-medium text-amber-300">
            Checkout is in demo mode
          </p>
          <p className="text-amber-200/80 leading-relaxed">
            Add your Airwallex Hosted Payment Page URL to enable live
            payments.
          </p>
          <div className="flex gap-1.5">
            <Input
              value={checkoutUrlInput}
              onChange={(e) => setCheckoutUrlInput(e.target.value)}
              placeholder="https://checkout.airwallex.com/pay/..."
              className="h-8 flex-1 text-[11px]"
            />
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              disabled={savingCheckoutUrl}
              className="h-8 px-2.5 text-[11px]"
            >
              {savingCheckoutUrl ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      )}

      {/* ── Airwallex readiness checklist ─────────────────────────── */}
      {airwallexAudit && airwallexAudit.checks.length > 0 && (
        <div
          className={cn(
            'rounded-xl border p-3 text-[11px] space-y-2',
            airwallexAudit.ready
              ? 'border-emerald-500/30 bg-emerald-500/10'
              : 'border-destructive/40 bg-destructive/10',
          )}
        >
          <p
            className={cn(
              'font-medium',
              airwallexAudit.ready ? 'text-emerald-300' : 'text-destructive',
            )}
          >
            {airwallexAudit.ready
              ? 'Airwallex onboarding checklist — ready'
              : `Airwallex onboarding checklist — ${airwallexAudit.failCount} issue${airwallexAudit.failCount > 1 ? 's' : ''} blocking publish`}
          </p>
          <ul className="space-y-1">
            {airwallexAudit.checks.map((c) => (
              <li key={c.id} className="flex items-start gap-1.5">
                <span
                  className={cn(
                    'mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full',
                    c.status === 'pass' && 'bg-emerald-400',
                    c.status === 'warn' && 'bg-amber-400',
                    c.status === 'fail' && 'bg-destructive',
                  )}
                />
                <span className="text-muted-foreground leading-snug">
                  {c.label}
                  {c.status !== 'pass' && c.fix && (
                    <span className="block text-muted-foreground/70">{c.fix}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Main card ─────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
        {/* STATE: Live */}
        {isLive && !deployResult && (
          <>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex h-2 w-2 shrink-0 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              Your site is live
            </div>

            {displayUrl && (
              <a
                href={displayUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-primary underline underline-offset-2 hover:text-primary/80"
              >
                {displayUrl.replace(/^https?:\/\//, '')}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                disabled={publishing}
                onClick={handleRepublish}
                className="flex-1"
              >
                {publishing ? (
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Rocket className="mr-1.5 h-3.5 w-3.5" />
                )}
                Republish
              </Button>
              {displayUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="flex-1"
                >
                  <a href={displayUrl} target="_blank" rel="noreferrer">
                    View live site
                    <ExternalLink className="ml-1.5 h-3 w-3" />
                  </a>
                </Button>
              )}
            </div>
          </>
        )}

        {/* STATE: Queued for operator review */}
        {isQueued && !deployResult && (
          <>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Clock className="h-4 w-4 shrink-0 text-amber-400" />
              Queued for operator review
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Submitted{' '}
              {new Date(meta.publishRequestedAt!).toLocaleString()}. An
              operator will review your site and provision hosting.
            </p>
            <Button
              size="sm"
              variant="outline"
              disabled={publishing}
              onClick={handleCancelRequest}
              className="w-full text-xs"
            >
              Cancel request
            </Button>
          </>
        )}

        {/* STATE: Not published / Draft (or show result after publish) */}
        {!isLive && !isQueued && !deployResult && (
          <>
            <div className="text-sm font-semibold text-foreground">
              Ready to publish?
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Deploy your site to managed hosting. Optionally attach a
              custom domain.
            </p>

            <div className="space-y-2">
              <div className="relative">
                <Globe className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="yourdomain.com (optional)"
                  className="h-9 pl-8 text-xs"
                />
              </div>

              <Button
                className="w-full"
                disabled={publishing || (airwallexAudit ? !airwallexAudit.ready : false)}
                onClick={handlePublish}
              >
                {publishing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-4 w-4" />
                    Publish
                  </>
                )}
              </Button>
            </div>
          </>
        )}

        {/* STATE: Deploy result feedback (success or error) */}
        {deployResult && (
          <div
            className={cn(
              'space-y-2 rounded-lg p-3 text-xs',
              deployResult.success
                ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : 'border border-destructive/30 bg-destructive/10 text-destructive',
            )}
          >
            {deployResult.success ? (
              <>
                <p className="font-semibold">
                  {deployResult.message || 'Published!'}
                </p>
                {deployResult.liveUrl && (
                  <a
                    href={deployResult.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono underline underline-offset-2 text-emerald-200 hover:text-emerald-100"
                  >
                    {deployResult.liveUrl.replace(/^https?:\/\//, '')}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                <div className="pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/20"
                    onClick={() => setDeployResult(null)}
                  >
                    Dismiss
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="font-medium">
                  {deployResult.error || 'Something went wrong.'}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => {
                    setDeployResult(null);
                    // Reset to the publish form
                  }}
                >
                  Try again
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* ── Secondary actions ─────────────────────────────────────────── */}

      {/* Export zip — quiet secondary */}
      <a
        href={`/api/projects/${meta.id}/export`}
        download
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-xs text-muted-foreground shadow-sm transition-colors hover:bg-muted/50 hover:text-foreground"
      >
        <Download className="h-3.5 w-3.5 shrink-0" />
        Export source (.zip)
      </a>

      {/* Need more options? → guides */}
      <Link
        href="/guides"
        className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-xs text-muted-foreground shadow-sm transition-colors hover:bg-muted/50 hover:text-foreground"
      >
        <span className="text-muted-foreground">
          Need more options?{' '}
          <span className="text-foreground font-medium">
            View deployment guides
          </span>
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0" />
      </Link>
    </div>
  );
}
