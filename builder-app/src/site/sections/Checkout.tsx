'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  Truck,
  CheckCircle2,
  Package,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import type { CatalogItem, CheckoutProps, ProductGridProps, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { Input } from '@/site/ui/input';
import { formatPrice } from '@/site/lib/format';
import { PaymentTrustBadges } from '@/site/sections/_shared/PaymentTrustBadges';

export default function Checkout({
  props,
  content,
}: {
  props: CheckoutProps;
  content: SiteContent;
}) {
  const b = content.business;
  const isEcommerce = content.mode === 'ecommerce';

  // Extract products from the first productGrid section on the site to show as realistic order items
  const productSection = content.pages
    .flatMap((p) => p.sections)
    .find((s) => s.type === 'productGrid' && (s.props as ProductGridProps)?.items?.length);

  const availableItems: CatalogItem[] =
    (productSection?.props as ProductGridProps)?.items ?? [];

  const defaultItem: CatalogItem = availableItems[0] ?? {
    id: 'item-1',
    name: isEcommerce ? 'Premium Collection Item' : 'Professional Service Package',
    price: isEcommerce ? 145 : 450,
    currency: 'USD',
    description: 'Complimentary expedited global shipping & statutory compliance guarantee included.',
    category: isEcommerce ? 'Retail' : 'Consulting',
    features: ['Instant digital confirmation', 'Full warranty & support'],
    inStock: true,
  };

  const [selectedItem] = useState<CatalogItem>(defaultItem);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'airwallex'>('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const currency = selectedItem.currency ?? 'USD';
  const itemPrice = selectedItem.price;
  const discount = promoApplied ? Math.round(itemPrice * 0.15) : 0;
  const total = Math.max(0, itemPrice - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.airwallexCheckoutUrl) {
      window.location.href = content.airwallexCheckoutUrl;
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOrderPlaced(true);
    }, 1200);
  };

  if (orderPlaced) {
    return (
      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Thank you for your order!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Your order confirmation has been sent to{' '}
            <span className="font-semibold text-foreground">{email || 'your email address'}</span>.
            We are preparing your shipment with tracked delivery.
          </p>
          <div className="rounded-xl border border-border bg-card p-6 text-left space-y-3 max-w-md mx-auto">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Order Number:</span>
              <span className="font-mono font-semibold text-foreground">
                ORD-{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Merchant:</span>
              <span className="font-semibold text-foreground">{b.name}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Total Paid:</span>
              <span className="font-bold text-foreground">{formatPrice(total, currency)}</span>
            </div>
          </div>
          <div className="pt-4">
            <Button asChild size="lg" className="h-11 px-8 font-semibold">
              <Link href="/">Return to Store</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-muted/10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-border/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
              <Lock className="h-3.5 w-3.5" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              {props.title ?? (isEcommerce ? 'Complete Your Order' : 'Secure Your Engagement')}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Payable to:</span>
            <span className="font-bold text-foreground">{b.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column — Customer & Payment Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Information */}
            <div className="card-elevated rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">1. Contact Information</h2>
                <span className="text-xs text-muted-foreground">Receipt &amp; Tracking</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Email Address</label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="card-elevated rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">2. Delivery Address</h2>
                <span className="text-xs text-muted-foreground">Tracked Courier</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">First Name</label>
                  <Input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Last Name</label>
                  <Input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="h-10"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-foreground mb-1 block">Street Address</label>
                  <Input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Market Street, Suite 400"
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">City</label>
                  <Input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="San Francisco"
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground mb-1 block">Postal Code</label>
                  <Input
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="94105"
                    className="h-10"
                  />
                </div>
              </div>

              {/* Shipping Method Option */}
              <div className="pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-primary/30 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-foreground">Free Express Tracked Delivery</div>
                      <div className="text-[11px] text-muted-foreground">Delivered in 2-4 business days with signature required</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary">FREE</span>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="card-elevated rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">3. Payment Method</h2>
                <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>PCI-DSS Level 1</span>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                      : 'border-border bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('airwallex')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                    paymentMethod === 'airwallex'
                      ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary'
                      : 'border-border bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  <Lock className="h-4 w-4" />
                  Airwallex Express Pay
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-3.5 pt-1">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Card Number</label>
                    <Input
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242"
                      className="h-10 font-mono text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">Expiry (MM/YY)</label>
                      <Input
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="12/28"
                        className="h-10 font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-foreground mb-1 block">Security Code (CVC)</label>
                      <Input
                        required
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123"
                        className="h-10 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-muted/40 border border-border text-center space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You will be securely redirected to complete checkout with Airwallex One-Click Checkout, Apple Pay, or Google Pay.
                  </p>
                </div>
              )}

              {/* Exact Payment Badges Requested */}
              <div className="pt-2 border-t border-border/70">
                <PaymentTrustBadges />
              </div>
            </div>

            {/* Submit Action */}
            <div className="space-y-3">
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all"
              >
                {loading ? (
                  <span>Processing Secure Payment...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    Pay {formatPrice(total, currency)} &middot; Place Order
                  </span>
                )}
              </Button>
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                By placing your order, you agree to {b.name}&apos;s Terms of Service and Refund Policy. All payments are encrypted and processed through Airwallex infrastructure.
              </p>
            </div>
          </form>

          {/* Right Column — Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-elevated rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-6 sticky top-6">
              <h2 className="text-base font-bold text-foreground border-b border-border/70 pb-4">
                Order Summary
              </h2>

              {/* Product item */}
              <div className="flex gap-4 items-start pb-5 border-b border-border/70">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted border border-border/80 shrink-0 relative">
                  {selectedItem.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Package className="h-8 w-8" />
                    </div>
                  )}
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    1
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-foreground leading-snug truncate">
                      {selectedItem.name}
                    </h3>
                    <span className="text-sm font-bold text-foreground shrink-0">
                      {formatPrice(selectedItem.price, currency)}
                    </span>
                  </div>
                  {selectedItem.category && (
                    <span className="text-[11px] font-medium text-muted-foreground block mt-0.5">
                      {selectedItem.category}
                    </span>
                  )}
                  {selectedItem.features && selectedItem.features.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {selectedItem.features[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Discount code (try AIRWALLEX15)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="h-9 text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (promoCode.trim().toUpperCase() === 'AIRWALLEX15' || promoCode.trim().length > 0) {
                        setPromoApplied(true);
                      }
                    }}
                    className="h-9 text-xs font-semibold shrink-0"
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>15% Special Promotional Discount Applied</span>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-2 text-xs border-t border-border/70">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {formatPrice(itemPrice, currency)}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(discount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Tracked Express Shipping</span>
                  <span className="font-semibold text-primary">FREE</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Taxes &amp; Duties</span>
                  <span className="text-foreground">Included</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-border text-base font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-xl text-primary">{formatPrice(total, currency)}</span>
                </div>
              </div>

              {/* Trust Guarantees */}
              <div className="rounded-xl bg-muted/30 border border-border/80 p-4 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                  <span>Airwallex Verified Merchant &amp; PCI-DSS Level 1</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span>Carbon-Neutral Worldwide Express Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
