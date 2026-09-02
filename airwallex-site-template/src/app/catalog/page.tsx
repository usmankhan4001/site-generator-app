'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BUSINESS,
  HERO,
  OFFERINGS,
  OfferingItem,
} from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckoutDrawer } from '@/components/checkout/CheckoutDrawer';
import { PolicyDialog } from '@/components/modals/PolicyDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PackageCheck,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  ShoppingCart,
} from 'lucide-react';

export default function CatalogPage() {
  const [selectedOffering, setSelectedOffering] = useState<OfferingItem | null>(
    OFFERINGS && OFFERINGS.length > 0 ? OFFERINGS[0] : null
  );
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [policyModal, setPolicyModal] = useState<
    'privacy' | 'terms' | 'refund' | 'shipping' | null
  >(null);

  const handleAddToCart = (item: OfferingItem) => {
    setSelectedOffering(item);
    setCartCount(1);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <Header
        business={BUSINESS}
        cartCount={cartCount}
        onOpenCart={() => setCheckoutOpen(true)}
        onConsultation={() => setCheckoutOpen(true)}
      />

      <main className="flex-1">
        {/* Breadcrumb & Hero */}
        <section className="border-b border-border bg-muted/20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">Catalog & Products</span>
            </div>

            <div className="max-w-3xl">
              <div className="dot-pill mb-4">
                <span className="dot-indicator" />
                <span>Verified Inventory & Global Dispatch</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Curated Product Catalog & Specifications
              </h1>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Discover our complete collection of commercial hardware, precision goods, and
                verified items. Fast express courier shipping, genuine manufacturer warranties,
                and PCI-DSS secure checkout.
              </p>
            </div>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold text-foreground">All Offerings</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Showing {OFFERINGS.length} commercial items available for immediate order
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Express Courier Dispatch</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <span>30-Day RMA Return Policy</span>
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OFFERINGS.map((item) => (
                <div
                  key={item.id}
                  className="card-elevated rounded-2xl overflow-hidden border border-border bg-card flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-xl text-foreground">{item.name}</h3>
                      {item.popular && (
                        <Badge className="bg-primary text-primary-foreground text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2">
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                        ${item.price.toLocaleString()}
                        <span className="text-xs font-normal text-muted-foreground ml-1.5">
                          {BUSINESS.currency || 'USD'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">
                        Specifications & Details:
                      </span>
                      <ul className="space-y-2">
                        {item.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-border/40 mt-4">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full font-medium gap-2 shadow-xs"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Order Now</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping & Warranty Guarantees Banner */}
        <section className="py-16 bg-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base">Global Express Dispatch</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Tracked courier transit via DHL, FedEx, or SF Express with real-time dispatch tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base">PCI-DSS Encrypted Payments</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    All transactions securely processed via Airwallex merchant gateway with 256-bit SSL encryption.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base">30-Day Return Guarantee</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Unopened merchandise may be returned within 30 days of arrival for a full prompt refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        business={BUSINESS}
        offerings={OFFERINGS}
        subtitle={HERO?.subtitle}
        scrollToSection={() => {}}
        onOpenPolicyModal={(type) => setPolicyModal(type)}
      />

      {/* Checkout Drawer & Policy Dialog */}
      <CheckoutDrawer
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        selectedOffering={selectedOffering}
        business={BUSINESS}
        onOrderSuccess={() => setCartCount(0)}
      />

      <PolicyDialog
        policyType={policyModal}
        onClose={() => setPolicyModal(null)}
        business={BUSINESS}
      />
    </div>
  );
}
