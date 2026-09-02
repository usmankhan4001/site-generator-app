'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ShieldCheck, Lock } from 'lucide-react';
import { BusinessInfo, OfferingItem } from '@/lib/constants';

interface FooterProps {
  business: BusinessInfo;
  offerings?: OfferingItem[];
  subtitle?: string;
  scrollToSection: (id: string) => void;
  onOpenPolicyModal?: (type: 'privacy' | 'terms' | 'refund' | 'shipping') => void;
}

export function Footer({
  business,
  offerings = [],
  subtitle,
  scrollToSection,
  onOpenPolicyModal,
}: FooterProps) {
  const handlePolicyClick = (
    e: React.MouseEvent,
    type: 'privacy' | 'terms' | 'refund' | 'shipping'
  ) => {
    if (onOpenPolicyModal) {
      e.preventDefault();
      onOpenPolicyModal(type);
    }
  };

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Contact Info */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-xs">
                {business.shortName.charAt(0)}
              </div>
              <span className="text-base font-bold text-foreground">
                {business.name}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            <div className="text-xs text-muted-foreground pt-1 space-y-0.5">
              <div className="font-semibold text-foreground">Customer Support Desk:</div>
              <a
                href={`mailto:${business.email}`}
                className="hover:underline text-primary block"
              >
                {business.email}
              </a>
              <a
                href={`tel:${business.phone}`}
                className="hover:underline text-muted-foreground block"
              >
                {business.phone}
              </a>
            </div>
          </div>

          {/* Column 2: Solutions / Products */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              Offerings
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {offerings.length > 0 ? (
                offerings.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection('offerings')}
                      className="hover:text-foreground transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))
              ) : (
                <li>
                  <button
                    onClick={() => scrollToSection('offerings')}
                    className="hover:text-foreground transition-colors"
                  >
                    View Packages
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:text-foreground transition-colors"
                >
                  Capabilities & Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="hover:text-foreground transition-colors"
                >
                  Client Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-foreground transition-colors"
                >
                  Knowledge Base & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-foreground transition-colors"
                >
                  Contact & Registered Office
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/policies/privacy"
                  onClick={(e) => handlePolicyClick(e, 'privacy')}
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Privacy Policy
                  <ChevronRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/terms"
                  onClick={(e) => handlePolicyClick(e, 'terms')}
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Terms of Service
                  <ChevronRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/refund"
                  onClick={(e) => handlePolicyClick(e, 'refund')}
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Refund & Cancellation
                  <ChevronRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/shipping"
                  onClick={(e) => handlePolicyClick(e, 'shipping')}
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Shipping & Delivery
                  <ChevronRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Security & Card Badges Bar */}
        <div className="py-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">
              Airwallex Verified Merchant & PCI-DSS Level 1 Compliant
            </span>
          </div>

          {/* Payment Card Badges */}
          <div className="flex items-center gap-2 text-[11px] font-semibold">
            <span className="px-2 py-1 rounded bg-background border border-border">VISA</span>
            <span className="px-2 py-1 rounded bg-background border border-border">Mastercard</span>
            <span className="px-2 py-1 rounded bg-background border border-border">AMEX</span>
            <span className="px-2 py-1 rounded bg-background border border-border">Apple Pay</span>
            <span className="px-2 py-1 rounded bg-background border border-border flex items-center gap-1">
              <Lock className="h-3 w-3 text-primary" /> 256-Bit SSL
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Natural Airwallex Required Statutory Legal KYC Details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground pt-2">
          <div className="text-center md:text-left space-y-1">
            <div>
              &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
            </div>
            <div className="text-[11px] text-muted-foreground/80">
              Registered in {business.governingLaw} · Company Registration No. {business.registrationNumber} · {business.address}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link
              href="/policies/privacy"
              onClick={(e) => handlePolicyClick(e, 'privacy')}
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <span>·</span>
            <Link
              href="/policies/terms"
              onClick={(e) => handlePolicyClick(e, 'terms')}
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <span>·</span>
            <Link
              href="/policies/refund"
              onClick={(e) => handlePolicyClick(e, 'refund')}
              className="hover:text-foreground transition-colors"
            >
              Refunds
            </Link>
            <span>·</span>
            <Link
              href="/policies/shipping"
              onClick={(e) => handlePolicyClick(e, 'shipping')}
              className="hover:text-foreground transition-colors"
            >
              Delivery
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
