'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Building2, Smartphone, Truck, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BUSINESS } from '@/lib/constants';
import Link from 'next/link';

export function CheckoutFlow({ 
  items, 
  onBackToCart,
  onOrderComplete
}: { 
  items: any[];
  onBackToCart: () => void;
  onOrderComplete: () => void;
}) {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', company: '', address: '', city: '', country: '', notes: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    toast({ 
      title: 'Order Placed Successfully', 
      description: 'Your order has been received. We will contact you shortly.' 
    });
    onOrderComplete();
  };

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Checkout</h2>
          <p className="text-muted-foreground">Please fill in your billing and contact details.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Summary */}
          <div className="order-2 md:order-1 space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Information</h3>
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email *</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Phone *</label>
                  <Input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Billing Address</h3>
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Address</label>
                  <Input value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">City</label>
                    <Input value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Country</label>
                    <Input value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <Card className="bg-muted/30 sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full mt-6" 
                  onClick={() => {
                    if (!formData.fullName || !formData.email || !formData.phone) {
                      toast({ title: 'Missing Information', description: 'Please fill required fields.', variant: 'destructive' });
                      return;
                    }
                    setStep(2);
                  }}
                >
                  Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full" onClick={onBackToCart}>
                  Back to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Payment Method</h2>
        <p className="text-muted-foreground">Select how you would like to pay.</p>
      </div>

      <div className="space-y-3">
        <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={handlePlaceOrder}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Credit / Debit Card</div>
              <div className="text-xs text-muted-foreground">Secure payment via Airwallex.</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={handlePlaceOrder}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Bank Transfer</div>
              <div className="text-xs text-muted-foreground">Direct bank transfer.</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-4 border border-emerald-200">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
          <div className="text-sm">
            <div className="font-semibold text-emerald-800 mb-1">Secure Payment</div>
            <div className="text-emerald-700">All transactions are encrypted with SSL/TLS. Your payment information is never stored.</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-2 text-center pt-4 border-t border-border">
        <p>By placing this order, you agree to our{' '}
          <Link href="/policies/terms" className="underline hover:text-foreground">Terms</Link>,{' '}
          <Link href="/policies/privacy" className="underline hover:text-foreground">Privacy</Link>, and{' '}
          <Link href="/policies/refund" className="underline hover:text-foreground">Refund Policy</Link>.
        </p>
        <p>{BUSINESS.name} is registered in {BUSINESS.governingLaw}.</p>
      </div>

      <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>
        Back to Details
      </Button>
    </div>
  );
}
