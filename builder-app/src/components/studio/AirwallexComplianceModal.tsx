'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Wrench,
  Loader2,
  ExternalLink,
  Building2,
  Scale,
  FileText,
  Clock,
} from 'lucide-react';
import { useStudio } from '@/store/studio';
import { auditSiteForAirwallex, type AirwallexAudit, type ComplianceCheck } from '@/site/compliance/airwallex';
import { buildPolicyPage } from '@/site/archetypes/policies';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface AirwallexComplianceModalProps {
  open: boolean;
  onClose: () => void;
}

export function AirwallexComplianceModal({ open, onClose }: AirwallexComplianceModalProps) {
  const content = useStudio((s) => s.content);
  const mutate = useStudio((s) => s.mutate);
  const [fixing, setFixing] = useState(false);
  const [fixSuccess, setFixSuccess] = useState(false);

  if (!content) return null;

  const audit: AirwallexAudit = auditSiteForAirwallex(content);

  const handleAutoFix = async () => {
    setFixing(true);
    setFixSuccess(false);

    try {
      mutate((d) => {
        // 1. Ensure support hours exist
        if (!d.business.supportHours?.trim()) {
          d.business.supportHours = 'Mon–Fri, 09:00–18:00 (GMT+8)';
        }

        // 2. Ensure governing law matches jurisdiction
        if (!d.business.governingLaw?.trim() && d.business.jurisdiction?.trim()) {
          d.business.governingLaw = `the laws of ${d.business.jurisdiction.trim()}`;
        }

        // 3. Ensure required policies (privacy, terms, refund) exist
        const requiredPolicies = ['privacy', 'terms', 'refund'] as const;
        for (const slug of requiredPolicies) {
          const idx = d.pages.findIndex((p) => p.key === `policy:${slug}` || p.path === `/policies/${slug}`);
          if (idx === -1) {
            d.pages.push(buildPolicyPage(slug, d.business));
          } else {
            // Rebuild with current entity details
            d.pages[idx] = buildPolicyPage(slug, d.business);
          }
        }

        // 4. Update contact support hours
        for (const page of d.pages) {
          for (const sec of page.sections) {
            if (sec.type === 'contactPanel') {
              (sec as any).props.supportHours = d.business.supportHours;
            }
          }
        }
      });

      await useStudio.getState().saveNow();
      setFixSuccess(true);
      setTimeout(() => setFixSuccess(false), 3000);
    } finally {
      setFixing(false);
    }
  };

  const totalChecks = audit.checks.length;
  const passedChecks = totalChecks - audit.failCount - audit.warnCount;
  const scorePercent = Math.round((passedChecks / totalChecks) * 100);

  return (
    <Dialog open={open} onOpenChange={(o) => (!o ? onClose() : undefined)}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm',
                audit.ready
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              )}
            >
              {audit.ready ? <ShieldCheck className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                Airwallex Merchant Compliance Shield
              </DialogTitle>
              <DialogDescription className="text-xs">
                Live compliance audit against official Airwallex & Visa/Mastercard onboarding mandates.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Score & Auto-Fix Banner */}
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">
                  {scorePercent}%
                </span>
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                    audit.ready
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                      : 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
                  )}
                >
                  {audit.ready ? 'Onboarding Ready' : `${audit.failCount} Action${audit.failCount === 1 ? '' : 's'} Required`}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {audit.ready
                  ? 'All mandatory merchant disclosures, refund policies, and legal entity details are verified.'
                  : 'Resolve failing items below or use 1-click auto-fix to generate missing disclosures.'}
              </p>
            </div>

            {!audit.ready && (
              <Button
                onClick={handleAutoFix}
                disabled={fixing}
                className="shrink-0 gap-2 font-semibold shadow-sm"
              >
                {fixing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Auto-fixing…
                  </>
                ) : fixSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Compliance Fixed!
                  </>
                ) : (
                  <>
                    <Wrench className="h-4 w-4" />
                    1-Click Auto-Fix
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Detailed Checks Breakdown */}
        <div className="space-y-2 mt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Compliance Requirements Checklist
          </h4>

          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {audit.checks.map((check) => {
              const isPass = check.status === 'pass';
              const isWarn = check.status === 'warn';
              return (
                <div key={check.id} className="flex items-start gap-3 p-3">
                  <div className="mt-0.5 shrink-0">
                    {isPass ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : isWarn ? (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-foreground">{check.label}</p>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider shrink-0">
                        {check.requirement}
                      </span>
                    </div>
                    {check.fix && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                        {check.fix}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Airwallex Merchant Link Guidance */}
        <div className="flex items-center justify-between rounded-xl bg-primary/5 p-3 text-xs text-muted-foreground border border-primary/10">
          <span>Official Airwallex Merchant Guidelines</span>
          <a
            href="https://www.airwallex.com/docs/payments/payment-methods/payment-method-onboarding-requirement"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            Documentation
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
