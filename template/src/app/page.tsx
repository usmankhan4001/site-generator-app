'use client';

import { useState, useEffect } from 'react';
import {
  BUSINESS,
  HERO,
  STATS,
  BENTO_FEATURES,
  OFFERINGS,
  TESTIMONIALS,
  FAQS,
  OfferingItem,
} from '@/lib/constants';

// Modular Layout & Section Components
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsBar } from '@/components/sections/StatsBar';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { OfferingsSection } from '@/components/sections/OfferingsSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { CheckoutDrawer } from '@/components/checkout/CheckoutDrawer';
import { PolicyDialog } from '@/components/modals/PolicyDialog';

export default function HomePage() {
  const [selectedOffering, setSelectedOffering] = useState<OfferingItem | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | 'refund' | 'shipping' | null>(null);

  useEffect(() => {
    // Select first offering by default
    if (OFFERINGS && OFFERINGS.length > 0) {
      setSelectedOffering(OFFERINGS[0]);
    }
  }, []);

  const handleSelectOffering = (item: OfferingItem) => {
    setSelectedOffering(item);
    setCartCount(1);
    setCheckoutOpen(true);
  };

  const handleOpenCart = () => {
    if (!selectedOffering && OFFERINGS && OFFERINGS.length > 0) {
      setSelectedOffering(OFFERINGS[0]);
    }
    setCheckoutOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* 1. Header (Untitled UI Navigation with Cart Count & Consultation CTA) */}
      <Header
        business={BUSINESS}
        cartCount={cartCount}
        onOpenCart={handleOpenCart}
        onConsultation={() => scrollToSection('offerings')}
        scrollToSection={scrollToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 2. Hero Section (Supports badge, split or centered layout, trust pills) */}
        <HeroSection
          hero={HERO}
          layout="centered"
          onPrimaryCta={() => scrollToSection('offerings')}
          onSecondaryCta={() => scrollToSection('features')}
        />

        {/* 3. Stats Bar (4-Column Metric Counter) */}
        <StatsBar stats={STATS} />

        {/* 4. Bento Grid (True Asymmetric Cards with Tags & CDN Imagery) */}
        <BentoGrid features={BENTO_FEATURES} />

        {/* 5. Offerings / Products Section (Differentiates B2B Retainers / B2C Products with Instant Drawer Trigger) */}
        <OfferingsSection
          offerings={OFFERINGS}
          onSelectOffering={handleSelectOffering}
        />

        {/* 6. Testimonials (5-Star Ratings with Executive Avatar Headshots) */}
        <Testimonials testimonials={TESTIMONIALS} />

        {/* 7. FAQ Section (Collapsible Radix UI Accordion Rows) */}
        <FAQSection faqs={FAQS} />

        {/* 8. Contact Section (Two-Column Layout with Formspree-Enabled Contact Form) */}
        <ContactSection business={BUSINESS} />
      </main>

      {/* 9. Statutory Footer (Natural Legal Bar, Card Badges, Links to /policies/*) */}
      <Footer
        business={BUSINESS}
        offerings={OFFERINGS}
        subtitle={HERO.subtitle}
        scrollToSection={scrollToSection}
        onOpenPolicyModal={(type) => setPolicyModal(type)}
      />

      {/* Interactive Checkout Drawer (Instant Slide-over Trigger) */}
      <CheckoutDrawer
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        selectedOffering={selectedOffering}
        business={BUSINESS}
        onOrderSuccess={() => setCartCount(0)}
      />

      {/* Interactive Compliance & Policy Modal */}
      <PolicyDialog
        policyType={policyModal}
        onClose={() => setPolicyModal(null)}
        business={BUSINESS}
      />
    </div>
  );
}
