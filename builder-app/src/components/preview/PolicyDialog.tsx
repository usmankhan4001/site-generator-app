'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RotateCcw, Truck, Printer } from 'lucide-react';
import { BusinessDetails } from '@/types/builder';

export type PolicyType = 'privacy' | 'terms' | 'refund' | 'shipping';

interface PolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialPolicy?: PolicyType;
  business: BusinessDetails;
}

export function PolicyDialog({
  isOpen,
  onClose,
  initialPolicy = 'privacy',
  business,
}: PolicyDialogProps) {
  const [activeTab, setActiveTab] = useState<PolicyType>(initialPolicy);

  if (!isOpen) return null;

  const companyName = business.companyName || 'Vantage Cloud Systems Ltd';
  const regNo = business.registrationNumber || 'CR-89410294';
  const address = business.address || 'Level 38, Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983';
  const email = business.email || 'ops@vantagecloud.io';
  const phone = business.phone || '+65 6812 9400';
  const governingLaw = business.governingLaw || 'Republic of Singapore';
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'privacy':
        return (
          <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground,#0f172a)]/90">
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              1. Information We Collect
            </h3>
            <p>
              {companyName} (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), registered under number {regNo} at {address}, complies with applicable global data privacy regulations including GDPR and CCPA. We collect information you provide directly, including name, corporate contact details, billing information, and technical telemetry required to provide our enterprise services.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              2. How We Use Information
            </h3>
            <p>
              We process personal and corporate data exclusively for delivering services, fulfilling transactions, managing commercial billing, security anomaly detection, and compliance with statutory obligations. We do not sell or monetize personal identifiable information.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              3. Data Security & Storage
            </h3>
            <p>
              All customer transactions and sensitive payloads are encrypted using industry-standard TLS 1.3 in transit and AES-256 at rest. Access to operational systems is gated by strict role-based access control (RBAC) and multi-factor authentication.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              4. Contact & Data Rights
            </h3>
            <p>
              To exercise your right to access, rectify, or delete your data, please contact our Data Protection Officer at{' '}
              <span className="font-medium text-[var(--primary,#4f46e5)]">{email}</span> or write to our registered office at {address}.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground,#0f172a)]/90">
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              1. Commercial Agreement
            </h3>
            <p>
              By accessing or purchasing services from {companyName} (Registration No. {regNo}), you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, you represent that you have legal authority to bind that entity.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              2. Payment & Invoicing
            </h3>
            <p>
              Fees for services, software, and products are quoted in {business.currency || 'USD'}. Invoices and payment charges are processed securely via certified payment gateways. Recurring subscriptions renew automatically unless cancelled prior to the billing date.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              3. Intellectual Property
            </h3>
            <p>
              All proprietary algorithms, codebases, trade secrets, and visual materials remain the exclusive property of {companyName} or its licensors. Deliverables provided under bespoke contracts transfer ownership upon full receipt of invoiced compensation.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              4. Governing Law & Jurisdiction
            </h3>
            <p>
              These Terms and any non-contractual disputes arising out of them shall be governed by and construed in accordance with the laws of {governingLaw}, without regard to conflict of law principles.
            </p>
          </div>
        );

      case 'refund':
        return (
          <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground,#0f172a)]/90">
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              1. Satisfaction Guarantee & Cancellation
            </h3>
            <p>
              At {companyName}, we maintain an institutional commitment to quality. If you are unsatisfied with our service tiers or products, eligible refund requests must be submitted within 30 days of the original purchase date.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              2. Digital Services & Retainers
            </h3>
            <p>
              Initial technical audit and assessment fees are refundable prior to work delivery. For ongoing monthly engineering retainers, cancellation takes effect at the end of the current billing cycle with no cancellation penalty.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              3. Physical Deliverables & Returns
            </h3>
            <p>
              Physical hardware or apparel items must be returned unwashed, unworn, and in original packaging with proof of purchase. Return shipping labels are provided by contacting our support desk.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              4. Refund Processing Window
            </h3>
            <p>
              Approved refunds are credited back to the original payment method within 5 to 10 business days. For inquiries regarding pending reimbursements, email{' '}
              <span className="font-medium text-[var(--primary,#4f46e5)]">{email}</span>.
            </p>
          </div>
        );

      case 'shipping':
        return (
          <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground,#0f172a)]/90">
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              1. Digital Provisioning & Electronic Delivery
            </h3>
            <p>
              All software access licenses, cloud configurations, API credentials, and technical reports are provisioned electronically with immediate or scheduled delivery within 24 hours of successful payment confirmation.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              2. Physical Order Dispatch & Carriers
            </h3>
            <p>
              Physical orders are dispatched within 1-2 business days from our regional fulfillment centers via DHL Express, FedEx, or regional tracked couriers. Tracking details are emailed automatically upon dispatch.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              3. International Customs & Duties
            </h3>
            <p>
              For international shipments, customs duties and local import taxes may apply depending on the destination jurisdiction and are the responsibility of the recipient unless explicitly stated as DDP (Delivered Duty Paid) at checkout.
            </p>
            <h3 className="text-base font-semibold text-[var(--foreground,#0f172a)]">
              4. Delivery Assistance
            </h3>
            <p>
              For urgent delivery status updates or address corrections, reach our logistics team at{' '}
              <span className="font-medium text-[var(--primary,#4f46e5)]">{phone}</span> or <span className="font-medium text-[var(--primary,#4f46e5)]">{email}</span>.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--card-foreground,#0f172a)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border,#e5e7eb)] px-6 py-4 bg-[var(--muted,#f8fafc)]/50">
          <div>
            <h2 className="text-lg font-bold text-[var(--foreground,#0f172a)]">
              Legal & Statutory Policies
            </h2>
            <p className="text-xs text-[var(--muted-foreground,#64748b)]">
              {companyName} • Last updated {effectiveDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-[var(--muted-foreground,#64748b)] hover:bg-[var(--muted,#f1f5f9)] hover:text-[var(--foreground,#0f172a)] transition-colors"
              title="Print Policy"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-[var(--muted-foreground,#64748b)] hover:bg-[var(--muted,#f1f5f9)] hover:text-[var(--foreground,#0f172a)] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--border,#e5e7eb)] px-6 bg-[var(--card,#ffffff)] overflow-x-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 border-b-2 px-3 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-[var(--primary,#4f46e5)] text-[var(--primary,#4f46e5)]'
                : 'border-transparent text-[var(--muted-foreground,#64748b)] hover:text-[var(--foreground,#0f172a)]'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 border-b-2 px-3 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-[var(--primary,#4f46e5)] text-[var(--primary,#4f46e5)]'
                : 'border-transparent text-[var(--muted-foreground,#64748b)] hover:text-[var(--foreground,#0f172a)]'
            }`}
          >
            <FileText className="h-4 w-4" />
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`flex items-center gap-2 border-b-2 px-3 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'refund'
                ? 'border-[var(--primary,#4f46e5)] text-[var(--primary,#4f46e5)]'
                : 'border-transparent text-[var(--muted-foreground,#64748b)] hover:text-[var(--foreground,#0f172a)]'
            }`}
          >
            <RotateCcw className="h-4 w-4" />
            Refund Policy
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`flex items-center gap-2 border-b-2 px-3 py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'shipping'
                ? 'border-[var(--primary,#4f46e5)] text-[var(--primary,#4f46e5)]'
                : 'border-transparent text-[var(--muted-foreground,#64748b)] hover:text-[var(--foreground,#0f172a)]'
            }`}
          >
            <Truck className="h-4 w-4" />
            Shipping & Delivery
          </button>
        </div>

        {/* Policy Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[var(--card,#ffffff)]">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border,#e5e7eb)] px-6 py-3 bg-[var(--muted,#f8fafc)]/50 text-xs text-[var(--muted-foreground,#64748b)]">
          <div>
            Entity: <span className="font-semibold text-[var(--foreground,#0f172a)]">{companyName}</span> ({regNo})
          </div>
          <button
            onClick={onClose}
            className="rounded-[var(--radius-button,0.5rem)] bg-[var(--primary,#4f46e5)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground,#ffffff)] hover:bg-[var(--primary-hover,#4338ca)] transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
