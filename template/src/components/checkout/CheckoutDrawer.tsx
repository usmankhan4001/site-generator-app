'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  CreditCard,
  Building2,
  Lock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { BusinessInfo, OfferingItem } from '@/lib/constants';

interface CheckoutDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOffering: OfferingItem | null;
  business: BusinessInfo;
  onOrderSuccess?: (orderData: any) => void;
}

export function CheckoutDrawer({
  open,
  onOpenChange,
  selectedOffering,
  business,
  onOrderSuccess,
}: CheckoutDrawerProps) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire'>('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setOrderPlaced(true);
    if (onOrderSuccess) {
      onOrderSuccess({
        offering: selectedOffering,
        customer: formData,
        paymentMethod,
      });
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset order placed status after close
    setTimeout(() => {
      setOrderPlaced(false);
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-6">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="text-xl font-bold text-foreground">
            {orderPlaced ? 'Order Confirmation' : 'Order & Engagement Checkout'}
          </SheetTitle>
          <SheetDescription>
            {orderPlaced
              ? `Thank you for choosing ${business.name}`
              : 'Complete your order or engagement booking.'}
          </SheetDescription>
        </SheetHeader>

        {orderPlaced ? (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-in zoom-in-50">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                Order Successfully Initiated
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                We have generated your order for{' '}
                <span className="font-semibold text-foreground">
                  {selectedOffering?.name}
                </span>{' '}
                (${selectedOffering?.price?.toLocaleString()} USD).
              </p>
              <p className="text-xs text-muted-foreground">
                An invoice and onboarding documentation have been dispatched to{' '}
                <span className="font-semibold text-foreground">
                  {formData.email}
                </span>.
              </p>
            </div>
            <Button className="w-full h-11" onClick={handleClose}>
              Return to Site
            </Button>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit} className="space-y-6">
            {/* Selected Package Card */}
            {selectedOffering && (
              <div className="p-4 rounded-xl border border-border bg-muted/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground">
                    {selectedOffering.name}
                  </span>
                  <span className="font-bold text-base text-primary">
                    ${selectedOffering.price?.toLocaleString()} USD
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedOffering.description}
                </p>
              </div>
            )}

            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Client Information
              </h4>
              <div>
                <label className="text-xs font-medium text-foreground">
                  Full Name *
                </label>
                <Input
                  required
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">
                  Email Address *
                </label>
                <Input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Phone Number
                  </label>
                  <Input
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Company / Organization
                  </label>
                  <Input
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Payment Channel
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 text-xs font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                      : 'border-border text-muted-foreground hover:border-border/80'
                  }`}
                >
                  <CreditCard className="h-4 w-4 shrink-0" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire')}
                  className={`p-3 rounded-lg border text-left flex items-center gap-2.5 text-xs font-medium transition-all ${
                    paymentMethod === 'wire'
                      ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                      : 'border-border text-muted-foreground hover:border-border/80'
                  }`}
                >
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span>Bank Wire Transfer</span>
                </button>
              </div>
            </div>

            {/* Order Security Disclaimer */}
            <div className="p-3.5 rounded-lg bg-muted/40 text-[11px] text-muted-foreground space-y-1 border border-border/50">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Lock className="h-3.5 w-3.5 text-primary" />
                <span>256-Bit SSL Airwallex Secured Gateway</span>
              </div>
              <p>
                Orders are processed under the laws of {business.governingLaw}{' '}
                by {business.name} (Reg. {business.registrationNumber}).
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-sm font-bold shadow-sm flex items-center justify-center gap-2"
            >
              <span>Confirm & Place Order</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
