import Link from 'next/link';
import { Lock, ShieldCheck } from 'lucide-react';
import type { SiteContent } from '@/site/schema';
import { Separator } from '@/site/ui/separator';
import { currentYear } from '@/site/lib/format';

/**
 * Footer — site chrome. Columns / legal links / tagline are data-driven from
 * `content.footer`. The statutory legal bar and payment-badge row are each
 * gated by their own `content.footer` flag. All policy links are real routes.
 */
export default function Footer({ content }: { content: SiteContent }) {
  const { business, brand, footer } = content;
  const logoText = brand?.logoText ?? business.shortName;
  const columns = footer.columns ?? [];
  const legalLinks = footer.legalLinks ?? [];
  const asNumber = business.asNumber ? business.asNumber.replace(/^AS/i, '') : undefined;

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand + support contact */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-xs">
                {logoText.charAt(0) || 'A'}
              </div>
              <span className="text-base font-bold text-foreground">{logoText}</span>
            </div>
            {footer.tagline && (
              <p className="text-xs text-muted-foreground leading-relaxed">{footer.tagline}</p>
            )}
            <div className="text-xs text-muted-foreground pt-1 space-y-0.5">
              <div className="font-semibold text-foreground">Customer Support Desk:</div>
              <a href={`mailto:${business.email}`} className="hover:underline text-primary block">
                {business.email}
              </a>
              <a href={`tel:${business.phone}`} className="hover:underline text-muted-foreground block">
                {business.phone}
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {col.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className="hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {footer.showPaymentBadges && (
          <div className="py-5 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium text-foreground">
                Airwallex Verified Merchant &amp; PCI-DSS Level 1 Compliant
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
              <span className="px-2.5 py-1 rounded-md bg-card border border-border/80 shadow-xs">VISA</span>
              <span className="px-2.5 py-1 rounded-md bg-card border border-border/80 shadow-xs">Mastercard</span>
              <span className="px-2.5 py-1 rounded-md bg-card border border-border/80 shadow-xs">AMEX</span>
              <span className="px-2.5 py-1 rounded-md bg-card border border-border/80 shadow-xs">Apple Pay</span>
              <span className="px-2.5 py-1 rounded-md bg-card border border-border/80 shadow-xs flex items-center gap-1 text-primary font-semibold">
                <Lock className="h-3 w-3 text-primary shrink-0" /> 256-Bit SSL
              </span>
            </div>
          </div>
        )}

        <Separator className="my-4" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground pt-2">
          <div className="text-center md:text-left space-y-1">
            <div>
              &copy; {currentYear()} {business.name}. All rights reserved.
            </div>
            {footer.showLegalBar && (
              <div className="text-[11px] text-muted-foreground/80">
                Registered in {business.jurisdiction} · Company Registration No.{' '}
                {business.registrationNumber} · {business.registeredAddress}
                {asNumber ? ` · AS${asNumber}` : ''}
              </div>
            )}
          </div>

          {legalLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {legalLinks.map((link, i) => (
                <span key={`${link.href}-${link.label}`} className="flex items-center gap-4">
                  {i > 0 && (
                    <span aria-hidden className="text-muted-foreground/50">
                      ·
                    </span>
                  )}
                  <Link href={link.href} className="hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
