'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import type { SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';

/**
 * Header — sticky site chrome. Nav is data-driven from `content.nav` (desktop
 * + mobile). Header CTA comes from `content.headerCta` (hidden when absent).
 * The cart button only appears in ecommerce mode, and even then it is a plain
 * "Enquire" link to /contact — there is no cart.
 */
export default function Header({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);

  const nav = content.nav ?? [];
  const logoText = content.brand?.logoText ?? content.business.shortName ?? 'A';
  const logoLetter = logoText.charAt(0) || 'A';
  const cta = content.headerCta;
  const showEnquire = content.mode === 'ecommerce';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
            {logoLetter}
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {logoText}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {showEnquire && (
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/contact">Enquire</Link>
            </Button>
          )}
          {cta && (
            <Button asChild size="sm" className="font-medium shadow-xs hidden sm:inline-flex">
              <Link href={cta.href}>
                <span>{cta.label}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-2">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {(cta || showEnquire) && (
            <div className="pt-2 flex flex-col gap-2">
              {showEnquire && (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Enquire
                  </Link>
                </Button>
              )}
              {cta && (
                <Button asChild className="w-full">
                  <Link href={cta.href} onClick={() => setOpen(false)}>
                    {cta.label}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
