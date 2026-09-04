'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X, Phone, Mail, Clock } from 'lucide-react';
import type { SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { CartTrigger } from '@/site/commerce/CartTrigger';

function getJurisdictionFlag(jurisdiction?: string): string {
  if (!jurisdiction) return '🌐';
  const j = jurisdiction.toLowerCase();
  if (j.includes('singapore') || j.includes('sg')) return '🇸🇬';
  if (j.includes('united kingdom') || j.includes('uk') || j.includes('london') || j.includes('england') || j.includes('scotland')) return '🇬🇧';
  if (j.includes('united states') || j.includes('usa') || j.includes('delaware') || j.includes('california') || j.includes('new york') || j.includes('texas')) return '🇺🇸';
  if (j.includes('hong kong') || j.includes('hk')) return '🇭🇰';
  if (j.includes('australia') || j.includes('au')) return '🇦🇺';
  if (j.includes('germany') || j.includes('deutschland') || j.includes('de')) return '🇩🇪';
  if (j.includes('canada') || j.includes('ca')) return '🇨🇦';
  if (j.includes('japan') || j.includes('jp')) return '🇯🇵';
  if (j.includes('france') || j.includes('fr')) return '🇫🇷';
  if (j.includes('emirates') || j.includes('uae') || j.includes('dubai')) return '🇦🇪';
  if (j.includes('switzerland') || j.includes('ch')) return '🇨🇭';
  if (j.includes('netherlands') || j.includes('nl') || j.includes('amsterdam')) return '🇳🇱';
  if (j.includes('ireland') || j.includes('ie') || j.includes('dublin')) return '🇮🇪';
  if (j.includes('new zealand') || j.includes('nz')) return '🇳🇿';
  return '🌐';
}

/**
 * Header — multi-layout site navigation chrome.
 * Supported variants:
 * - corporate_utility: Top utility info bar (phone, email, hours, jurisdiction badge) + main nav row
 * - floating_glass_pill: Floating centered glassmorphic pill bar with backdrop blur and border-white/10
 * - editorial_centered: Centered luxury brand wordmark with split left/right navigation links
 * - default: Standard clean layout with logo left, navigation center, action button right
 */
export default function Header({ content }: { content: SiteContent }) {
  const [open, setOpen] = useState(false);

  const { business, brand, header } = content;
  const nav = content.nav ?? [];
  const logoText = brand?.logoText ?? business?.shortName ?? 'Brand';
  const logoLetter = logoText.charAt(0) || 'A';
  const cta = content.headerCta;

  // Cart trigger visibility: enabled for retail sector, ecommerce mode, or store/luxury archetypes
  const showCart =
    content.mode === 'ecommerce' ||
    content.source?.sector === 'retail' ||
    content.source?.archetype === 'store' ||
    content.source?.archetype === 'luxury';

  const rawVariant = header?.variant;
  let variant: 'corporate_utility' | 'floating_glass_pill' | 'editorial_centered' | 'default' = 'default';
  if (rawVariant === 'corporate_utility') {
    variant = 'corporate_utility';
  } else if (rawVariant === 'floating_glass_pill') {
    variant = 'floating_glass_pill';
  } else if (rawVariant === 'editorial_centered' || rawVariant === 'editorial_center') {
    variant = 'editorial_centered';
  } else if (rawVariant === 'standard' || rawVariant === 'minimal' || rawVariant === 'default') {
    variant = 'default';
  } else {
    // Intelligent fallback from archetype/sector
    if (content.source?.sector === 'hosting') {
      variant = 'corporate_utility';
    } else if (content.source?.archetype === 'luxury' || content.source?.archetype === 'agency') {
      variant = 'editorial_centered';
    } else {
      variant = 'default';
    }
  }

  const jurisdiction = business?.jurisdiction;
  const flagEmoji = getJurisdictionFlag(jurisdiction);
  const supportHours = business?.supportHours ?? 'Mon–Fri: 09:00–18:00';
  const showAnnouncement = header?.showAnnouncement && header?.announcementText;

  // Announcement Bar Sub-component
  const announcementBanner = showAnnouncement ? (
    <div className="w-full bg-primary text-primary-foreground py-1.5 px-4 text-xs font-medium text-center relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span>{header.announcementText}</span>
        {header.announcementLink && (
          <Link
            href={header.announcementLink.href}
            className="underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold ml-1"
          >
            {header.announcementLink.label} &rarr;
          </Link>
        )}
      </div>
    </div>
  ) : null;

  // --------------------------------------------------------------------------
  // Variant: Floating Glass Pill
  // --------------------------------------------------------------------------
  if (variant === 'floating_glass_pill') {
    return (
      <>
        {announcementBanner}
        <header className="sticky top-3 sm:top-5 z-50 w-full px-4 sm:px-6 pointer-events-none">
          <div className="max-w-5xl mx-auto pointer-events-auto">
            <div className="rounded-full border border-border/80 dark:border-white/10 bg-background/80 dark:bg-background/70 backdrop-blur-md shadow-lg shadow-black/5 px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                  {logoLetter}
                </div>
                <span className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {logoText}
                </span>
              </Link>

              {/* Centered Desktop Nav */}
              <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {showCart && <CartTrigger className="p-1.5" />}

                {cta && (
                  <Button asChild size="sm" className="rounded-full px-4 text-xs font-semibold shadow-xs hidden sm:inline-flex">
                    <Link href={cta.href}>
                      <span>{cta.label}</span>
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full h-8 w-8"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Toggle menu"
                  aria-expanded={open}
                >
                  {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Mobile Dropdown for Glass Pill */}
            {open && (
              <div className="md:hidden mt-2 rounded-2xl border border-border/80 dark:border-white/10 bg-background/95 backdrop-blur-lg p-4 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2">
                <nav aria-label="Mobile" className="flex flex-col gap-1">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {(cta || showCart) && (
                  <div className="pt-2 border-t border-border/60 flex flex-col gap-2">
                    {showCart && (
                      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/60">
                        <span className="text-xs font-medium">Cart</span>
                        <CartTrigger />
                      </div>
                    )}
                    {cta && (
                      <Button asChild className="w-full rounded-full text-xs font-semibold">
                        <Link href={cta.href} onClick={() => setOpen(false)}>
                          {cta.label}
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
      </>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Corporate Utility
  // --------------------------------------------------------------------------
  if (variant === 'corporate_utility') {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-xs">
        {announcementBanner}

        {/* Top Info Utility Bar */}
        <div className="w-full border-b border-border/60 bg-muted/40 py-1.5 px-4 sm:px-6 lg:px-8 text-xs text-muted-foreground">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
            {/* Left Contact & Hours */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {business?.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{business.phone}</span>
                </a>
              )}

              {business?.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{business.email}</span>
                </a>
              )}

              {supportHours && (
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span>{supportHours}</span>
                </span>
              )}
            </div>

            {/* Right Badges & Regulatory Utility Links */}
            <div className="flex items-center gap-3 ml-auto">
              {jurisdiction && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-background border border-border/80 text-[11px] font-medium text-foreground shadow-2xs">
                  <span>{flagEmoji}</span>
                  <span>{jurisdiction}</span>
                  <span className="text-[10px] text-muted-foreground">Registry</span>
                </div>
              )}

              {header?.utilityLinks?.map((ulink) => (
                <Link
                  key={ulink.href}
                  href={ulink.href}
                  className="hidden md:inline-block text-[11px] font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  {ulink.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Nav Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              {logoLetter}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                {logoText}
              </span>
              {business?.registrationNumber && (
                <span className="text-[10px] text-muted-foreground tracking-normal">
                  CRN: {business.registrationNumber}
                </span>
              )}
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {showCart && <CartTrigger />}

            {cta && (
              <Button asChild size="sm" className="font-semibold shadow-xs hidden sm:inline-flex">
                <Link href={cta.href}>
                  <span>{cta.label}</span>
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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

        {/* Mobile Nav Drawer */}
        {open && (
          <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
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

            <div className="pt-3 border-t border-border space-y-2">
              {showCart && (
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/60 border border-border">
                  <span className="text-sm font-medium">Shopping Cart</span>
                  <CartTrigger />
                </div>
              )}
              {cta && (
                <Button asChild className="w-full">
                  <Link href={cta.href} onClick={() => setOpen(false)}>
                    {cta.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }

  // --------------------------------------------------------------------------
  // Variant: Editorial Centered
  // --------------------------------------------------------------------------
  if (variant === 'editorial_centered') {
    const halfNav = Math.ceil(nav.length / 2);
    const leftLinks = nav.slice(0, halfNav);
    const rightLinks = nav.slice(halfNav);

    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
        {announcementBanner}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Desktop Left Nav */}
          <nav aria-label="Primary Left" className="hidden lg:flex items-center gap-6 flex-1 justify-start">
            {leftLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Centered Brand Wordmark */}
          <div className="flex items-center justify-center lg:px-8">
            <Link href="/" className="text-center group">
              <span
                className="text-xl sm:text-2xl font-normal tracking-[0.2em] uppercase text-foreground group-hover:text-primary transition-colors"
                style={{ fontFamily: 'var(--font-display, inherit)' }}
              >
                {logoText}
              </span>
            </Link>
          </div>

          {/* Desktop Right Nav & Actions */}
          <div className="hidden lg:flex items-center justify-end gap-6 flex-1">
            <nav aria-label="Primary Right" className="flex items-center gap-6">
              {rightLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 pl-4 border-l border-border/60">
              {showCart && <CartTrigger />}
              {cta && (
                <Button asChild size="sm" variant="outline" className="text-xs uppercase tracking-wider font-semibold">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2.5">
            {showCart && <CartTrigger />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md px-6 py-6 space-y-4">
            <nav aria-label="Mobile" className="flex flex-col gap-3 text-center">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {(cta || showCart) && (
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                {showCart && (
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-muted/60 border border-border">
                    <span className="text-xs uppercase tracking-wider font-medium">Cart</span>
                    <CartTrigger />
                  </div>
                )}
                {cta && (
                  <Button asChild className="w-full text-xs uppercase tracking-wider font-semibold">
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

  // --------------------------------------------------------------------------
  // Variant: Default / Clean Standard
  // --------------------------------------------------------------------------
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      {announcementBanner}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
            {logoLetter}
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {logoText}
          </span>
        </Link>

        {/* Links Center */}
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

        {/* Action / CTA Right */}
        <div className="flex items-center gap-2.5">
          {showCart && <CartTrigger />}

          {cta && (
            <Button asChild size="sm" className="font-medium shadow-xs hidden sm:inline-flex">
              <Link href={cta.href}>
                <span>{cta.label}</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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

      {/* Mobile Drawer */}
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

          {(cta || showCart) && (
            <div className="pt-2 flex flex-col gap-2">
              {showCart && (
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/60 border border-border">
                  <span className="text-sm font-medium">Shopping Cart</span>
                  <CartTrigger />
                </div>
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
