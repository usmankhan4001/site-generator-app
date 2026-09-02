'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BUSINESS,
  HERO,
  OFFERINGS,
  FAQS,
  OfferingItem,
} from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckoutDrawer } from '@/components/checkout/CheckoutDrawer';
import { PolicyDialog } from '@/components/modals/PolicyDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  Clock,
  Layers,
  HelpCircle,
  PhoneCall,
  FileCheck,
} from 'lucide-react';

export default function ServicesPage() {
  const [selectedOffering, setSelectedOffering] = useState<OfferingItem | null>(
    OFFERINGS && OFFERINGS.length > 0 ? OFFERINGS[0] : null
  );
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [policyModal, setPolicyModal] = useState<
    'privacy' | 'terms' | 'refund' | 'shipping' | null
  >(null);

  const handleSelectPackage = (item: OfferingItem) => {
    setSelectedOffering(item);
    setCartCount(1);
    setCheckoutOpen(true);
  };

  const workflowSteps = [
    {
      num: '01',
      title: 'Discovery & Requirements Audit',
      desc: 'We conduct a technical audit and scoping session to tailor architecture specifications directly to your commercial objectives.',
    },
    {
      num: '02',
      title: 'Implementation & Iterative QA',
      desc: 'Execution governed by structured sprint milestones, SOC2-aligned security controls, and transparent progress reports.',
    },
    {
      num: '03',
      title: 'Production Launch & SLA Monitoring',
      desc: 'Seamless deployment to resilient edge infrastructure with active SLA monitoring and 24/7 technical incident response.',
    },
  ];

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
              <span className="text-foreground font-medium">Services & Solutions</span>
            </div>

            <div className="max-w-3xl">
              <div className="dot-pill mb-4">
                <span className="dot-indicator" />
                <span>Enterprise Service Architecture</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Engineered Solutions, Predictable Delivery, and Strict SLAs.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Explore our commercial service packages designed for high-growth enterprises.
                Every engagement is backed by formal statements of work, PCI-DSS compliance,
                and dedicated engineering support.
              </p>
            </div>
          </div>
        </section>

        {/* Offerings Grid Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                Service Tiers
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-foreground">
                Transparent Pricing & Deliverables
              </h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Choose the service level matching your technical requirements. Instant contract
                initiation with 14-day satisfaction review guarantee.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {OFFERINGS.map((offering) => (
                <div
                  key={offering.id}
                  className={`card-elevated rounded-2xl p-8 border flex flex-col justify-between transition-all relative ${
                    offering.popular
                      ? 'border-primary ring-2 ring-primary/20 bg-card'
                      : 'border-border bg-card'
                  }`}
                >
                  {offering.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1 shadow-sm">
                        Most Popular Selection
                      </Badge>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-xl text-foreground">{offering.name}</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      {offering.description}
                    </p>

                    <div className="py-4 border-y border-border/80 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                          ${offering.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground font-medium">
                          / engagement
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Billed in {BUSINESS.currency || 'USD'} · Official VAT/GST Invoicing Included
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Included Deliverables:
                      </div>
                      <ul className="space-y-2.5">
                        {offering.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <Button
                      onClick={() => handleSelectPackage(offering)}
                      className={`w-full py-6 font-medium gap-2 shadow-xs ${
                        offering.popular
                          ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                          : ''
                      }`}
                    >
                      <span>Select Package</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <p className="text-[11px] text-center text-muted-foreground mt-2">
                      Instant secure checkout via Airwallex gateway
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bespoke Custom SOW Banner */}
            <div className="mt-16 card-elevated rounded-2xl p-8 sm:p-10 border border-border bg-muted/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase">
                  <FileCheck className="h-4 w-4" />
                  <span>Enterprise Bespoke Advisory</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Require a custom Statement of Work (SOW) or tailored SLA?
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                  Our senior engineering directors prepare customized technical architecture proposals,
                  dedicated team staffing, and compliance-tailored SOWs.
                </p>
              </div>
              <Link href="/contact" className="shrink-0">
                <Button size="lg" className="shadow-xs gap-2">
                  <span>Inquire for Custom Scope</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3-Step Delivery Methodology */}
        <section className="py-16 md:py-24 border-b border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                Execution Framework
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-foreground">
                How We Deliver
              </h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                A disciplined three-phase lifecycle ensuring precision engineering and zero downtime.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {workflowSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="card-elevated rounded-2xl p-8 border border-border bg-card relative space-y-4"
                >
                  <span className="text-4xl font-mono font-extrabold text-primary/25 block">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {FAQS && FAQS.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                  Common Questions
                </span>
                <h2 className="text-3xl font-bold tracking-tight mt-2 text-foreground">
                  Service & Engagement FAQs
                </h2>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="card-elevated rounded-xl p-6 border border-border bg-card space-y-2"
                  >
                    <h4 className="font-semibold text-foreground text-sm sm:text-base flex items-start gap-2">
                      <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground pl-6 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
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
