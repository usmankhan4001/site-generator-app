'use client';

import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export interface Policies14_ConsumerWarrantyNoticeProps {
  badge?: string;
  title?: string;
  lastUpdated?: string;
  governingLaw?: string;
  companyName?: string;
  registrationNumber?: string;
  sections?: Array<{
    heading: string;
    body: string;
  }>;
}

export const Policies14_ConsumerWarrantyNotice: React.FC<Policies14_ConsumerWarrantyNoticeProps> = ({
  badge = 'Consumer Rights',
  title = 'Consumer Statutory Warranty & Rights Notice',
  lastUpdated = 'October 2026',
  governingLaw = 'Republic of Singapore',
  companyName = 'Vantage Cloud Systems Ltd',
  registrationNumber = 'CR-89410294',
  sections = [
    {
      heading: '1. Regulatory Scope & Legal Governance',
      body: 'This binding agreement is entered between the subscribing merchant entity and the Company under statutory oversight. All transactions and underwriting covenants are governed by the laws of the jurisdiction indicated.',
    },
    {
      heading: '2. Payment Scheme Compliance & Settlement Rails',
      body: 'All payment processing is executed in strict adherence to Visa, Mastercard, and American Express merchant acquiring rules. Settled client funds are segregated within dedicated tier-1 financial custodian accounts.',
    },
    {
      heading: '3. Cancellation, Refunds & Dispute Arbitration',
      body: 'Refund requests submitted within thirty (30) calendar days are honored via original settlement rails. Controversies or claims arising out of this agreement shall be settled through binding institutional arbitration.',
    },
    {
      heading: '4. Data Sovereignty & Confidentiality',
      body: 'The Company implements AES-256 encryption at rest and TLS 1.3 in transit. Personal data is handled in accordance with the General Data Protection Regulation (GDPR) and local statutory privacy standards.',
    },
  ],
}) => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background,#ffffff)] text-[var(--foreground,#0f172a)] transition-colors border-b border-[var(--border,#e5e7eb)]">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3 pb-8 border-b border-[var(--border,#e5e7eb)]">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] border border-[var(--primary,#4f46e5)]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground,#64748b)]">
            Last Updated: {lastUpdated} • Entity: <strong className="text-[var(--foreground,#0f172a)]">{companyName}</strong> ({registrationNumber}) • Law: {governingLaw}
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((sec, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] shadow-xs space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[var(--foreground,#0f172a)] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--primary,#4f46e5)]" />
                {sec.heading}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground,#64748b)] leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Policies14_ConsumerWarrantyNotice;
