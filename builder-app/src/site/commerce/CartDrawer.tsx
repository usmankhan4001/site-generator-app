'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Lock,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Tag,
  Package,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from './useCart';
import { formatCurrency } from './formatCurrency';

export interface CartDrawerProps {
  /** Optional custom checkout URL (defaults to /checkout) */
  checkoutUrl?: string;
  /** Optional custom catalog URL (defaults to /#catalog) */
  catalogUrl?: string;
  /** Optional merchant name */
  merchantName?: string;
  /** Optional callback after checkout click */
  onCheckout?: () => void;
}

export function CartDrawer({
  checkoutUrl = '/checkout',
  catalogUrl = '/#catalog',
  merchantName,
  onCheckout,
}: CartDrawerProps) {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    subtotal,
    itemCount,
    currency,
    freeShippingThreshold,
    freeShippingProgress,
    amountUntilFreeShipping,
    isFreeShippingQualified,
    appliedPromo,
    applyPromo,
    removePromo,
    total,
    discountAmount,
    isHydrated,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press & prevent body scrolling when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeCart]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'AIRWALLEX15' || cleanCode === 'SAVE15' || cleanCode === 'WELCOME15') {
      applyPromo({
        code: cleanCode,
        percentage: 15,
        description: '15% Airwallex Welcome Discount',
      });
      setPromoSuccess('15% discount applied!');
      setPromoError('');
      setPromoInput('');
    } else if (cleanCode === 'FREESHIP') {
      applyPromo({
        code: cleanCode,
        amount: 0,
        description: 'Free Tracked Shipping Promo',
      });
      setPromoSuccess('Free Shipping discount code active!');
      setPromoError('');
      setPromoInput('');
    } else {
      // Allow any 10% demo fallback coupon
      applyPromo({
        code: cleanCode,
        percentage: 10,
        description: `Promo ${cleanCode} (10% off)`,
      });
      setPromoSuccess(`Promo code ${cleanCode} applied!`);
      setPromoError('');
      setPromoInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-md bg-background text-foreground shadow-2xl flex flex-col h-full border-l border-border transition-transform duration-300 ease-out animate-in slide-in-from-right"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground">Your Cart</h2>
                {isHydrated && itemCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              {merchantName && (
                <p className="text-[11px] text-muted-foreground">{merchantName}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {freeShippingThreshold > 0 && isHydrated && items.length > 0 && (
          <div className="px-5 py-3.5 bg-muted/40 border-b border-border">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {isFreeShippingQualified ? (
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>You&apos;ve unlocked <strong>FREE Express Shipping</strong>!</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-foreground font-medium">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    Add <strong>{formatCurrency(amountUntilFreeShipping, currency)}</strong> more for <strong>FREE Shipping</strong>
                  </span>
                </div>
              )}
              <span className="text-[11px] font-bold text-muted-foreground">
                {freeShippingProgress}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFreeShippingQualified
                    ? 'bg-emerald-500'
                    : 'bg-primary'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Items Body */}
        <div className="flex-1 overflow-y-auto thin-scroll p-5 space-y-4">
          {!isHydrated || items.length === 0 ? (
            /* Empty Cart View */
            <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-muted/80 border border-border flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">Your cart is empty</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Looks like you haven&apos;t added any products to your cart yet.
                </p>
              </div>
              <Link
                href={catalogUrl}
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors shadow-xs"
              >
                <span>Explore Products</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            /* Cart Items List */
            <div className="space-y-3.5 divide-y divide-border/60">
              {items.map((item) => {
                const itemTotal = (item.price || 0) * (item.quantity || 1);
                return (
                  <div
                    key={item.id}
                    className="pt-3.5 first:pt-0 flex gap-3.5 items-start group"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-18 h-18 rounded-xl overflow-hidden bg-muted border border-border/80 shrink-0 relative">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/60">
                          <Package className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-foreground leading-snug truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            {item.category && (
                              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                                {item.category}
                              </span>
                            )}
                            {item.variant && (
                              <span className="text-[10px] text-muted-foreground">
                                &bull; {item.variant}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive p-1 rounded-md transition-colors"
                          title="Remove item"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-center border border-border rounded-lg bg-card overflow-hidden">
                          <button
                            type="button"
                            onClick={() => decrementItem(item.id)}
                            className="px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 py-1 text-xs font-bold text-foreground min-w-[24px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementItem(item.id)}
                            className="px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                            disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-bold text-foreground">
                            {formatCurrency(itemTotal, item.currency || currency)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-muted-foreground">
                              {formatCurrency(item.price, item.currency || currency)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Actions */}
        {isHydrated && items.length > 0 && (
          <div className="border-t border-border bg-card/90 backdrop-blur-md p-5 space-y-4">
            {/* Promo Code & Discount Form */}
            <div className="space-y-2">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{appliedPromo.description || appliedPromo.code}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-muted-foreground hover:text-destructive text-[11px] font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError('');
                      }}
                      placeholder="Discount code (e.g. AIRWALLEX15)"
                      className="w-full h-8 px-3 text-xs bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!promoInput.trim()}
                    className="h-8 px-3 text-xs font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoSuccess && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {promoSuccess}
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-destructive font-medium">
                  {promoError}
                </p>
              )}
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(subtotal, currency)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Discount</span>
                  <span>-{formatCurrency(discountAmount, currency)}</span>
                </div>
              )}

              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-semibold text-primary">
                  {isFreeShippingQualified ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Taxes &amp; Duties</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-border text-base font-bold text-foreground">
                <span>Estimated Total</span>
                <span className="text-lg text-primary">{formatCurrency(total, currency)}</span>
              </div>
            </div>

            {/* Dynamic Tax & Shipping Notice */}
            <p className="text-[11px] text-muted-foreground text-center leading-normal">
              Taxes, international shipping rates, and custom duties are computed securely during final checkout.
            </p>

            {/* Checkout CTA */}
            <div className="space-y-2">
              <Link
                href={checkoutUrl}
                onClick={() => {
                  closeCart();
                  onCheckout?.();
                }}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md active:scale-[0.99]"
              >
                <Lock className="h-4 w-4" />
                <span>Checkout &middot; {formatCurrency(total, currency)}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>

              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2 text-xs font-semibold text-muted-foreground hover:text-foreground text-center transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Airwallex / Apple Pay / Visa Trust Badges */}
            <div className="pt-2 border-t border-border/80 space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>Airwallex Verified Merchant &middot; PCI-DSS Level 1</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-bold text-foreground">
                <span className="px-2 py-1 rounded bg-muted/60 border border-border">VISA</span>
                <span className="px-2 py-1 rounded bg-muted/60 border border-border">Mastercard</span>
                <span className="px-2 py-1 rounded bg-muted/60 border border-border">AMEX</span>
                <span className="px-2 py-1 rounded bg-muted/60 border border-border">Apple Pay</span>
                <span className="px-2 py-1 rounded bg-muted/60 border border-border">Google Pay</span>
                <span className="px-2 py-1 rounded bg-muted/60 border border-border text-primary flex items-center gap-1">
                  <Lock className="h-2.5 w-2.5" /> 256-Bit SSL
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
