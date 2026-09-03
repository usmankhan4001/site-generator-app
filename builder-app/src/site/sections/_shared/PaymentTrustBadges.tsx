import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { cn } from '@/site/lib/cn';

export interface PaymentTrustBadgesProps {
  className?: string;
  showComplianceText?: boolean;
}

/**
 * Trust badges matching the exact visual spec:
 * [ VISA ] [ Mastercard ] [ AMEX ] [ Apple Pay ] [ 🔒 256-Bit SSL ]
 */
export function PaymentTrustBadges({
  className,
  showComplianceText = false,
}: PaymentTrustBadgesProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {showComplianceText && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
          <span className="font-medium text-foreground">
            Airwallex Verified Merchant &middot; PCI-DSS Level 1 Compliant
          </span>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-foreground">
        <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-card border border-border/80 shadow-xs hover:border-primary/40 transition-colors">
          VISA
        </span>
        <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-card border border-border/80 shadow-xs hover:border-primary/40 transition-colors">
          Mastercard
        </span>
        <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-card border border-border/80 shadow-xs hover:border-primary/40 transition-colors">
          AMEX
        </span>
        <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-card border border-border/80 shadow-xs hover:border-primary/40 transition-colors">
          Apple Pay
        </span>
        <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-card border border-border/80 shadow-xs text-primary font-semibold hover:border-primary/40 transition-colors">
          <Lock className="h-3.5 w-3.5 text-primary shrink-0" />
          256-Bit SSL
        </span>
      </div>
    </div>
  );
}

export default PaymentTrustBadges;
