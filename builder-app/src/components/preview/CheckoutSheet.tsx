'use client';

import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Lock,
  Plus,
  Minus,
  CheckCircle2,
  Building2,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { OfferingItem, BusinessDetails } from '@/types/builder';
import { formatCurrency } from '@/lib/utils';
import { PaymentBadgesRow } from './PaymentBadges';

interface CheckoutSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOffering: OfferingItem | null;
  business: BusinessDetails;
}

export function CheckoutSheet({
  isOpen,
  onClose,
  selectedOffering,
  business,
}: CheckoutSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'wire'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@enterprise.com',
    company: 'FinStream Global LLC',
    cardNumber: '4242 •••• •••• 4242',
    expiry: '08/28',
    cvc: '891',
    address: '100 Montgomery St, Suite 1400',
    city: 'San Francisco',
    postalCode: '94104',
  });

  if (!isOpen) return null;

  const itemPrice = selectedOffering?.price || 1499;
  const currency = business.currency || 'USD';
  const subtotal = itemPrice * quantity;
  const tax = 0; // Tax calculated at settlement
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1400);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg h-full bg-[var(--card,#ffffff)] text-[var(--card-foreground,#0f172a)] shadow-2xl flex flex-col border-l border-[var(--border,#e5e7eb)] animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border,#e5e7eb)] px-6 py-4 bg-[var(--muted,#f8fafc)]/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-button,0.5rem)] bg-[var(--primary,#4f46e5)] text-[var(--primary-foreground,#ffffff)]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--foreground,#0f172a)]">
                {isSuccess ? 'Order Confirmed' : 'Instant Checkout'}
              </h2>
              <p className="text-xs text-[var(--muted-foreground,#64748b)]">
                {business.companyName || 'Vantage Cloud Systems Ltd'}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="rounded-md p-1.5 text-[var(--muted-foreground,#64748b)] hover:bg-[var(--muted,#f1f5f9)] hover:text-[var(--foreground,#0f172a)] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[var(--card,#ffffff)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground,#0f172a)] mb-2">
              Payment Succeeded!
            </h3>
            <p className="text-sm text-[var(--muted-foreground,#64748b)] max-w-sm mb-6">
              Thank you for your order. A receipt and onboarding instructions have been sent to{' '}
              <span className="font-semibold text-[var(--foreground,#0f172a)]">{formData.email}</span>.
            </p>

            <div className="w-full rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--muted,#f8fafc)] p-4 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground,#64748b)]">Order Reference:</span>
                <span className="font-mono font-bold text-[var(--foreground,#0f172a)]">
                  ORD-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground,#64748b)]">Item:</span>
                <span className="font-semibold text-[var(--foreground,#0f172a)]">
                  {selectedOffering?.name || 'Enterprise Service Tier'} (x{quantity})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground,#64748b)]">Total Charged:</span>
                <span className="font-bold text-[var(--primary,#4f46e5)] text-sm">
                  {formatCurrency(total, currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground,#64748b)]">Merchant Entity:</span>
                <span className="text-[var(--foreground,#0f172a)]">{business.companyName}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full rounded-[var(--radius-button,0.5rem)] bg-[var(--primary,#4f46e5)] py-3 text-sm font-semibold text-[var(--primary-foreground,#ffffff)] hover:bg-[var(--primary-hover,#4338ca)] transition-colors shadow-xs"
            >
              Back to Overview
            </button>
          </div>
        ) : (
          /* Checkout Form View */
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--card,#ffffff)]">
            {/* Selected Product Card */}
            <div className="rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--muted,#f8fafc)] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block rounded-full bg-[var(--primary,#4f46e5)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--primary,#4f46e5)] uppercase tracking-wider mb-1">
                    Selected Tier
                  </span>
                  <h4 className="text-sm font-bold text-[var(--foreground,#0f172a)]">
                    {selectedOffering?.name || 'Cloud Architecture & Modernization'}
                  </h4>
                  <p className="text-xs text-[var(--muted-foreground,#64748b)] mt-0.5 line-clamp-2">
                    {selectedOffering?.description || 'Full architecture review and production implementation roadmap.'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-bold text-[var(--foreground,#0f172a)]">
                    {formatCurrency(itemPrice, currency)}
                  </span>
                  <p className="text-[10px] text-[var(--muted-foreground,#64748b)]">per unit</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border,#e5e7eb)]/60">
                <span className="text-xs font-medium text-[var(--muted-foreground,#64748b)]">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--foreground,#0f172a)] hover:bg-[var(--muted,#f1f5f9)]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[var(--foreground,#0f172a)]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--foreground,#0f172a)] hover:bg-[var(--muted,#f1f5f9)]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-[var(--foreground,#0f172a)] uppercase tracking-wider mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center p-3 rounded-[var(--radius-card,0.75rem)] border text-xs font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[var(--primary,#4f46e5)] bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] shadow-xs'
                      : 'border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--muted-foreground,#64748b)] hover:border-[var(--border,#e5e7eb)]/80'
                  }`}
                >
                  <CreditCard className="h-4 w-4 mb-1" />
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`flex flex-col items-center justify-center p-3 rounded-[var(--radius-card,0.75rem)] border text-xs font-medium transition-all ${
                    paymentMethod === 'apple'
                      ? 'border-[var(--primary,#4f46e5)] bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] shadow-xs'
                      : 'border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--muted-foreground,#64748b)] hover:border-[var(--border,#e5e7eb)]/80'
                  }`}
                >
                  <Lock className="h-4 w-4 mb-1" />
                  Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`flex flex-col items-center justify-center p-3 rounded-[var(--radius-card,0.75rem)] border text-xs font-medium transition-all ${
                    paymentMethod === 'wire'
                      ? 'border-[var(--primary,#4f46e5)] bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] shadow-xs'
                      : 'border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--muted-foreground,#64748b)] hover:border-[var(--border,#e5e7eb)]/80'
                  }`}
                >
                  <Building2 className="h-4 w-4 mb-1" />
                  Bank Wire
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[var(--foreground,#0f172a)] uppercase tracking-wider">
                  Contact & Billing Details
                </label>
                <div>
                  <label className="block text-[11px] font-medium text-[var(--muted-foreground,#64748b)] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] px-3 py-2 text-xs text-[var(--foreground,#0f172a)] focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[var(--muted-foreground,#64748b)] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] px-3 py-2 text-xs text-[var(--foreground,#0f172a)] focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[var(--muted-foreground,#64748b)] mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] px-3 py-2 text-xs text-[var(--foreground,#0f172a)] focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                    />
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] p-3 space-y-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold text-[var(--foreground,#0f172a)] flex items-center gap-1.5">
                        <CreditCard className="h-3.5 w-3.5 text-[var(--primary,#4f46e5)]" />
                        Card Details
                      </span>
                      <PaymentBadgesRow className="flex items-center gap-1 scale-75 origin-right" />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Card Number"
                        className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--muted,#f8fafc)]/60 px-3 py-2 text-xs text-[var(--foreground,#0f172a)] font-mono focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM / YY"
                        className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--muted,#f8fafc)]/60 px-3 py-2 text-xs text-[var(--foreground,#0f172a)] font-mono focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                      />
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="CVC"
                        className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--muted,#f8fafc)]/60 px-3 py-2 text-xs text-[var(--foreground,#0f172a)] font-mono focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary & Airwallex Compliance Note */}
              <div className="rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--muted,#f8fafc)] p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-[var(--muted-foreground,#64748b)]">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-[var(--muted-foreground,#64748b)]">
                  <span>Tax & Compliance Settlement</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[var(--foreground,#0f172a)] pt-1.5 border-t border-[var(--border,#e5e7eb)]">
                  <span>Total Amount</span>
                  <span className="text-[var(--primary,#4f46e5)]">{formatCurrency(total, currency)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[var(--muted-foreground,#64748b)] justify-center">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Encrypted with 256-bit TLS • PCI-DSS Level 1 Compliant</span>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 rounded-[var(--radius-button,0.5rem)] bg-[var(--primary,#4f46e5)] py-3 text-sm font-semibold text-[var(--primary-foreground,#ffffff)] hover:bg-[var(--primary-hover,#4338ca)] transition-all shadow-xs active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Authorizing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay {formatCurrency(total, currency)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
