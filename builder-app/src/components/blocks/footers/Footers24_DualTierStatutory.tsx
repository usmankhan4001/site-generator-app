'use client';

import React from 'react';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { PaymentBadgesRow } from '../../preview/PaymentBadges';

export interface Footers24_DualTierStatutoryProps {
  companyName?: string;
  registrationNumber?: string;
  registeredAddress?: string;
  governingLaw?: string;
  links?: Array<{ label: string; href: string }>;
}

export const Footers24_DualTierStatutory: React.FC<Footers24_DualTierStatutoryProps> = ({
  companyName = 'Vantage Cloud Systems Ltd',
  registrationNumber = 'CR-89410294',
  registeredAddress = 'Marina Bay Financial Centre Tower 2, Singapore 018983',
  governingLaw = 'Republic of Singapore',
  links = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Refund & Cancellation', href: '#refund' },
    { label: 'Shipping & Delivery', href: '#shipping' },
  ],
}) => {
  return (
    <footer className="w-full border-t border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--foreground,#0f172a)] transition-colors pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--border,#e5e7eb)]">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-base font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
              {companyName}
            </span>
            <p className="text-xs text-[var(--muted-foreground,#64748b)] max-w-lg">
              Institutional payment and enterprise cloud infrastructure powered by Airwallex banking rails.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--muted-foreground,#64748b)]">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-[var(--primary,#4f46e5)] transition-colors flex items-center gap-1 font-medium"
              >
                <span>{link.label}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>
        </div>

        {/* Fine Print Statutory Bar with Card Schemes */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground,#64748b)]">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} <strong className="text-[var(--foreground,#0f172a)]">{companyName}</strong>. All rights reserved.
            </p>
            <p className="text-[11px]">
              Registration No: <span className="font-mono text-[var(--foreground,#0f172a)]">{registrationNumber}</span> • Headquarters: {registeredAddress} • Governing Law: {governingLaw}
            </p>
          </div>

          {/* Scheme Badges */}
          <div className="flex items-center gap-2">
            <PaymentBadgesRow />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers24_DualTierStatutory;
