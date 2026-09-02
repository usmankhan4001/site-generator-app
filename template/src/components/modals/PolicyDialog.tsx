'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  BusinessInfo,
  getPrivacyPolicy,
  getTermsConditions,
  getRefundPolicy,
  getShippingPolicy,
} from '@/lib/constants';

interface PolicyDialogProps {
  policyType: 'privacy' | 'terms' | 'refund' | 'shipping' | null;
  onClose: () => void;
  business: BusinessInfo;
}

export function PolicyDialog({
  policyType,
  onClose,
  business,
}: PolicyDialogProps) {
  const getTitle = () => {
    switch (policyType) {
      case 'privacy':
        return 'Privacy Policy';
      case 'terms':
        return 'Terms and Conditions of Service';
      case 'refund':
        return 'Refund and Cancellation Policy';
      case 'shipping':
        return 'Shipping and Service Delivery Policy';
      default:
        return 'Policy';
    }
  };

  const getContent = () => {
    switch (policyType) {
      case 'privacy':
        return getPrivacyPolicy(business);
      case 'terms':
        return getTermsConditions(business);
      case 'refund':
        return getRefundPolicy(business);
      case 'shipping':
        return getShippingPolicy(business);
      default:
        return '';
    }
  };

  return (
    <Dialog open={!!policyType} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {getTitle()}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground pt-1">
            {business.name} · Registration No. {business.registrationNumber} · {business.governingLaw}
          </DialogDescription>
        </DialogHeader>
        <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm whitespace-pre-wrap leading-relaxed py-4 text-foreground/90 font-sans border-t border-border/60 mt-2">
          {getContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
