'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, ShoppingBag, MessageSquare } from 'lucide-react';
import type { SiteContent } from '@/site/schema';
import { useCart } from '@/site/commerce/useCart';

interface MobileStickyBarProps {
  content: SiteContent;
  currentPagePath?: string;
}

/**
 * High-conversion sticky mobile bottom action bar for generated sites.
 * Displayed exclusively on mobile screens (< 768px).
 * Automatically switches between:
 *  - eCommerce: Cart summary drawer trigger + checkout shortcut
 *  - Services: 1-tap phone call + primary contact/mandate CTA
 */
export function MobileStickyBar({ content, currentPagePath = '/' }: MobileStickyBarProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cart = useCart();
  const isEcommerce = content.mode === 'ecommerce';
  const phone = content.business.phone;
  const isContactPage = currentPagePath === '/contact';
  const isCheckoutPage = currentPagePath === '/checkout';

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      // Reveal sticky bar after user scrolls down 120px
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!mounted || !scrolled || isCheckoutPage) return null;

  return (
    <div
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="pointer-events-auto mx-auto max-w-md px-3 pb-3 pt-1">
        <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-background/95 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10">
          {isEcommerce ? (
            /* eCommerce Mode: Cart Drawer Trigger + Quick Checkout */
            <>
              <button
                type="button"
                onClick={() => cart.openCart()}
                className="flex flex-1 items-center justify-between rounded-xl bg-muted/80 px-3.5 py-2.5 text-xs font-semibold text-foreground transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    {cart.itemCount > 0 && (
                      <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                        {cart.itemCount}
                      </span>
                    )}
                  </div>
                  <span>Cart ({cart.itemCount})</span>
                </div>
                <span className="font-mono text-xs font-bold text-primary">
                  {cart.formattedTotal}
                </span>
              </button>

              <Link
                href="/checkout"
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Checkout</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </>
          ) : (
            /* Services / B2B Mode: 1-Tap Call + Contact / Book CTA */
            <>
              {phone ? (
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2.5 text-xs font-semibold text-foreground transition-all active:scale-[0.98]"
                  title={`Call ${content.business.shortName}`}
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Call Us</span>
                </a>
              ) : null}

              <Link
                href={isContactPage ? '#contact-form' : '/contact'}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all active:scale-[0.98]"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{content.headerCta?.label || 'Get in Touch'}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
