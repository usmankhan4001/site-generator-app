'use client';

import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Check,
  Star,
  ShoppingBag,
  Shield,
  Zap,
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  ChevronRight,
  Building,
} from 'lucide-react';
import { useBuilderStore } from '@/lib/store';
import { getArchetypeById } from '@/data/archetypes';
import { getThemeById } from '@/data/themes';
import { formatCurrency } from '@/lib/utils';
import { OfferingItem } from '@/types/builder';
import { DynamicBrandLogo, StripePartnerLogo, AwsPartnerLogo, VercelPartnerLogo, SupabasePartnerLogo } from './Logomarks';
import { PaymentBadgesRow } from './PaymentBadges';
import { FaqAccordion } from './FaqAccordion';
import { PolicyDialog, PolicyType } from './PolicyDialog';
import { CheckoutSheet } from './CheckoutSheet';

export function PreviewRenderer() {
  const {
    business,
    selectedArchetypeId,
    selectedThemeId,
    customHero,
    customOfferings,
  } = useBuilderStore();

  // Resolved Archetype & Theme
  const archetype = useMemo(() => getArchetypeById(selectedArchetypeId), [selectedArchetypeId]);
  const theme = useMemo(() => getThemeById(selectedThemeId), [selectedThemeId]);

  // Interactive UI States
  const [selectedOfferingForCheckout, setSelectedOfferingForCheckout] = useState<OfferingItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [policyDialogOpen, setPolicyDialogOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState<PolicyType>('privacy');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Content Merging (Store Overrides > Archetype Defaults)
  const heroData = {
    badge: customHero?.badge || archetype.hero.badge,
    headline: customHero?.headline || archetype.hero.headline,
    accentText: customHero?.accentText || archetype.hero.accentText,
    subtitle: customHero?.subtitle || archetype.hero.subtitle,
    primaryCta: customHero?.primaryCta || archetype.hero.primaryCta,
    secondaryCta: customHero?.secondaryCta || archetype.hero.secondaryCta,
    image: customHero?.image || archetype.hero.image,
    trustBadges: customHero?.trustBadges || archetype.hero.trustBadges,
  };

  const offerings = customOfferings && customOfferings.length > 0 ? customOfferings : archetype.offerings;

  const handleOpenCheckout = (offering?: OfferingItem) => {
    setSelectedOfferingForCheckout(offering || offerings[0] || null);
    setIsCheckoutOpen(true);
  };

  const handleOpenPolicy = (policy: PolicyType) => {
    setActivePolicyTab(policy);
    setPolicyDialogOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  // Dynamic CSS Variables Object
  const dynamicCssVariables: React.CSSProperties = {
    // Colors
    '--primary': theme.colors.primary,
    '--primary-hover': theme.colors.primaryHover,
    '--primary-foreground': theme.colors.primaryForeground,
    '--background': theme.colors.background,
    '--foreground': theme.colors.foreground,
    '--card': theme.colors.card,
    '--card-foreground': theme.colors.cardForeground,
    '--muted': theme.colors.muted,
    '--muted-foreground': theme.colors.mutedForeground,
    '--accent': theme.colors.accent,
    '--accent-foreground': theme.colors.accentForeground,
    '--border': theme.colors.border,
    '--ring': theme.colors.ring,
    // Radii & Fonts
    '--radius-card': theme.borderRadius,
    '--radius-button': '0.5rem',
    '--radius-badge': '9999px',
    fontFamily: theme.fontSans,
  } as React.CSSProperties;

  return (
    <div
      style={dynamicCssVariables}
      className="w-full min-h-screen bg-[var(--background,#ffffff)] text-[var(--foreground,#0f172a)] transition-colors duration-150 antialiased selection:bg-[var(--primary)] selection:text-[var(--primary-foreground)]"
    >
      {/* ============================================================ */}
      {/* 1. HEADER / NAVIGATION                                       */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border,#e5e7eb)] bg-[var(--background,#ffffff)]/90 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <div className="text-[var(--primary,#4f46e5)] flex items-center justify-center">
              <DynamicBrandLogo archetypeId={archetype.id} size={30} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight leading-tight text-[var(--foreground,#0f172a)]">
                {business.companyName || 'Vantage Cloud Systems'}
              </span>
              <span className="text-[10px] sm:text-xs text-[var(--muted-foreground,#64748b)] font-medium">
                {archetype.name}
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted-foreground,#64748b)]">
            <a href="#features" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
              Features
            </a>
            <a href="#offerings" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
              {archetype.category === 'ecommerce' ? 'Products' : 'Solutions'}
            </a>
            <a href="#testimonials" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
              Contact
            </a>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenCheckout()}
              className="relative flex items-center justify-center p-2 rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--foreground,#0f172a)] hover:bg-[var(--muted,#f1f5f9)] transition-colors shadow-2xs"
              title="View Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary,#4f46e5)] text-[9px] font-bold text-[var(--primary-foreground,#ffffff)]">
                1
              </span>
            </button>

            <button
              onClick={() => handleOpenCheckout()}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[var(--radius-button,0.5rem)] bg-[var(--primary,#4f46e5)] text-[var(--primary-foreground,#ffffff)] hover:bg-[var(--primary-hover,#4338ca)] text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <span>{heroData.primaryCta || 'Get Started'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Subtle background radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--primary,#4f46e5)]/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Dot Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-[var(--primary,#4f46e5)] animate-pulse" />
                <span className="text-xs font-semibold text-[var(--foreground,#0f172a)] tracking-wide">
                  {heroData.badge}
                </span>
              </div>

              {/* Main Headline with Accent Emphasis */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-[var(--foreground,#0f172a)]">
                {heroData.headline}{' '}
                <span className="text-[var(--primary,#4f46e5)] block sm:inline">
                  {heroData.accentText}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[var(--muted-foreground,#64748b)] leading-relaxed max-w-2xl font-normal">
                {heroData.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleOpenCheckout()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[var(--radius-button,0.5rem)] bg-[var(--primary,#4f46e5)] text-[var(--primary-foreground,#ffffff)] hover:bg-[var(--primary-hover,#4338ca)] text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                >
                  <span>{heroData.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href="#offerings"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--foreground,#0f172a)] hover:bg-[var(--muted,#f1f5f9)] text-sm font-semibold transition-all shadow-2xs cursor-pointer"
                >
                  <span>{heroData.secondaryCta}</span>
                </a>
              </div>

              {/* Trust Badges Bar */}
              {heroData.trustBadges && heroData.trustBadges.length > 0 && (
                <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-[var(--muted-foreground,#64748b)]">
                  {heroData.trustBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-[var(--muted,#f8fafc)] px-2.5 py-1 rounded-md border border-[var(--border,#e5e7eb)]"
                    >
                      <Shield className="h-3.5 w-3.5 text-[var(--primary,#4f46e5)]" />
                      <span className="font-medium text-[var(--foreground,#0f172a)]">{badge}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] p-2.5 shadow-2xl overflow-hidden group">
                <div className="relative aspect-4/3 w-full rounded-[calc(var(--radius-card,0.75rem)-4px)] overflow-hidden bg-[var(--muted,#f1f5f9)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroData.image}
                    alt={heroData.headline}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-white mb-1.5">
                      {business.shortName || business.companyName}
                    </span>
                    <p className="text-xs sm:text-sm font-medium leading-snug line-clamp-2 text-white/90">
                      {archetype.tagline || archetype.industry}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TRUST CLIENT LOGO BAR                                     */}
      {/* ============================================================ */}
      <section className="py-8 border-y border-[var(--border,#e5e7eb)] bg-[var(--muted,#f8fafc)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground,#64748b)] mb-6">
            Trusted by modern teams & enterprises worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <StripePartnerLogo className="h-5 sm:h-6 w-auto text-[var(--foreground,#0f172a)]" />
            <AwsPartnerLogo className="h-5 sm:h-6 w-auto text-[var(--foreground,#0f172a)]" />
            <VercelPartnerLogo className="h-5 sm:h-6 w-auto text-[var(--foreground,#0f172a)]" />
            <SupabasePartnerLogo className="h-5 sm:h-6 w-auto text-[var(--foreground,#0f172a)]" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. STATS METRIC BAR                                          */}
      {/* ============================================================ */}
      {archetype.stats && archetype.stats.length > 0 && (
        <section className="py-14 border-b border-[var(--border,#e5e7eb)] bg-[var(--background,#ffffff)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border,#e5e7eb)]">
              {archetype.stats.map((stat, idx) => (
                <div key={idx} className={`text-center ${idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''}`}>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--primary,#4f46e5)] tracking-tight">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-[var(--muted-foreground,#64748b)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. BENTO FEATURE GRID                                        */}
      {/* ============================================================ */}
      {archetype.bentoFeatures && archetype.bentoFeatures.length > 0 && (
        <section id="features" className="py-20 bg-[var(--muted,#f8fafc)]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="inline-block rounded-full bg-[var(--primary,#4f46e5)]/10 px-3 py-1 text-xs font-bold text-[var(--primary,#4f46e5)] uppercase tracking-wider">
                Engineered Capabilities
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
                Bespoke Architecture & Features
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted-foreground,#64748b)]">
                Tailored for high velocity, institutional reliability, and seamless scalability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {archetype.bentoFeatures.map((bento, idx) => (
                <div
                  key={idx}
                  className={`group rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    idx === 0 ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                >
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] text-xs font-bold">
                      <Zap className="h-3 w-3" />
                      {bento.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground,#0f172a)] group-hover:text-[var(--primary,#4f46e5)] transition-colors">
                      {bento.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted-foreground,#64748b)] leading-relaxed">
                      {bento.description}
                    </p>
                  </div>

                  <div className="mt-6 aspect-16/9 w-full rounded-[calc(var(--radius-card,0.75rem)-6px)] overflow-hidden bg-[var(--muted,#f1f5f9)] border border-[var(--border,#e5e7eb)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bento.image}
                      alt={bento.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. OFFERINGS & PRICING SECTION                               */}
      {/* ============================================================ */}
      <section id="offerings" className="py-20 bg-[var(--background,#ffffff)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-block rounded-full bg-[var(--primary,#4f46e5)]/10 px-3 py-1 text-xs font-bold text-[var(--primary,#4f46e5)] uppercase tracking-wider">
              {archetype.category === 'ecommerce' ? 'Curated Catalog' : 'Commercial Tiers'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
              {archetype.category === 'ecommerce' ? 'Featured Products & Collections' : 'Transparent Service Packages'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-foreground,#64748b)]">
              Clear deliverables, fixed pricing, and satisfaction guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {offerings.map((offering, idx) => {
              const isPopular = offering.popular || idx === 1;
              return (
                <div
                  key={offering.id || idx}
                  className={`relative flex flex-col justify-between rounded-[var(--radius-card,0.75rem)] border bg-[var(--card,#ffffff)] p-6 sm:p-8 transition-all duration-300 ${
                    isPopular
                      ? 'border-[var(--primary,#4f46e5)] shadow-xl ring-2 ring-[var(--primary,#4f46e5)]/20 scale-102'
                      : 'border-[var(--border,#e5e7eb)] shadow-xs hover:border-[var(--primary,#4f46e5)]/40 hover:shadow-md'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary,#4f46e5)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--primary-foreground,#ffffff)] shadow-xs">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-[var(--foreground,#0f172a)] mb-1">
                      {offering.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted-foreground,#64748b)] min-h-[40px] leading-relaxed">
                      {offering.description}
                    </p>

                    <div className="mt-5 mb-6 pb-6 border-b border-[var(--border,#e5e7eb)]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground,#0f172a)]">
                          {formatCurrency(offering.price, business.currency || 'USD')}
                        </span>
                        <span className="text-xs text-[var(--muted-foreground,#64748b)] font-medium">
                          {archetype.category === 'hosting' ? '/month' : 'one-time'}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 text-xs sm:text-sm text-[var(--foreground,#0f172a)]/90 mb-8">
                      {offering.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-[var(--primary,#4f46e5)] mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleOpenCheckout(offering)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-[var(--radius-button,0.5rem)] text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-98 cursor-pointer ${
                      isPopular
                        ? 'bg-[var(--primary,#4f46e5)] text-[var(--primary-foreground,#ffffff)] hover:bg-[var(--primary-hover,#4338ca)]'
                        : 'border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--foreground,#0f172a)] hover:bg-[var(--muted,#f1f5f9)]'
                    }`}
                  >
                    <span>{archetype.category === 'ecommerce' ? 'Buy Now' : 'Select Plan'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. TESTIMONIALS SECTION                                      */}
      {/* ============================================================ */}
      {archetype.testimonials && archetype.testimonials.length > 0 && (
        <section id="testimonials" className="py-20 bg-[var(--muted,#f8fafc)]/50 border-t border-[var(--border,#e5e7eb)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="inline-block rounded-full bg-[var(--primary,#4f46e5)]/10 px-3 py-1 text-xs font-bold text-[var(--primary,#4f46e5)] uppercase tracking-wider">
                Client Reviews
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
                Validated by Industry Leaders
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {archetype.testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base italic text-[var(--foreground,#0f172a)]/90 leading-relaxed">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border,#e5e7eb)] flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-10 w-10 rounded-full object-cover border border-[var(--border,#e5e7eb)]"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--foreground,#0f172a)]">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-[var(--muted-foreground,#64748b)]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 8. FAQ SECTION                                               */}
      {/* ============================================================ */}
      {archetype.faqs && archetype.faqs.length > 0 && (
        <section id="faq" className="py-20 bg-[var(--background,#ffffff)] border-t border-[var(--border,#e5e7eb)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              <span className="inline-block rounded-full bg-[var(--primary,#4f46e5)]/10 px-3 py-1 text-xs font-bold text-[var(--primary,#4f46e5)] uppercase tracking-wider">
                Support & Inquiries
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
                Frequently Asked Questions
              </h2>
            </div>

            <FaqAccordion items={archetype.faqs} />
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 9. CONTACT / CONSULTATION SECTION                            */}
      {/* ============================================================ */}
      <section id="contact" className="py-20 bg-[var(--muted,#f8fafc)]/50 border-t border-[var(--border,#e5e7eb)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block rounded-full bg-[var(--primary,#4f46e5)]/10 px-3 py-1 text-xs font-bold text-[var(--primary,#4f46e5)] uppercase tracking-wider">
                Get In Touch
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
                Connect with our Leadership
              </h2>
              <p className="text-sm text-[var(--muted-foreground,#64748b)] leading-relaxed">
                Have a customized requirement or enterprise question? Reach out directly and our advisory team will respond within 12 hours.
              </p>

              <div className="space-y-4 pt-2 text-sm text-[var(--foreground,#0f172a)]">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[var(--primary,#4f46e5)] mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Registered Office</strong>
                    <span className="text-xs text-[var(--muted-foreground,#64748b)]">
                      {business.address || 'Marina Bay Financial Centre Tower 2, Singapore 018983'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-[var(--primary,#4f46e5)] mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Support & Commercial Inquiries</strong>
                    <span className="text-xs text-[var(--muted-foreground,#64748b)]">
                      {business.email || 'ops@vantagecloud.io'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-[var(--primary,#4f46e5)] mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Direct Telephone Line</strong>
                    <span className="text-xs text-[var(--muted-foreground,#64748b)]">
                      {business.phone || '+65 6812 9400'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-[var(--radius-card,0.75rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] p-6 sm:p-8 shadow-xs">
                {contactSubmitted ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--foreground,#0f172a)]">
                      Inquiry Dispatched
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground,#64748b)] max-w-sm mx-auto">
                      Thank you. Your message has been routed to our corporate desk. We will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--foreground,#0f172a)] mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Doe"
                          className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] px-3.5 py-2.5 text-xs text-[var(--foreground,#0f172a)] focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--foreground,#0f172a)] mb-1">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@company.com"
                          className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] px-3.5 py-2.5 text-xs text-[var(--foreground,#0f172a)] focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--foreground,#0f172a)] mb-1">
                        Message & Requirements
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your timeline, current architecture, and goals..."
                        className="w-full rounded-[var(--radius-button,0.5rem)] border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] px-3.5 py-2.5 text-xs text-[var(--foreground,#0f172a)] focus:border-[var(--primary,#4f46e5)] focus:outline-hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[var(--radius-button,0.5rem)] bg-[var(--primary,#4f46e5)] px-6 py-3 text-xs sm:text-sm font-semibold text-[var(--primary-foreground,#ffffff)] hover:bg-[var(--primary-hover,#4338ca)] transition-colors shadow-xs cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FOOTER (Untitled UI Caliber + Natural Airwallex Standard) */}
      {/* ============================================================ */}
      <footer className="border-t border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Brand & Bio */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="text-[var(--primary,#4f46e5)]">
                  <DynamicBrandLogo archetypeId={archetype.id} size={24} />
                </div>
                <span className="font-bold text-base text-[var(--foreground,#0f172a)]">
                  {business.companyName || 'Vantage Cloud Systems Ltd'}
                </span>
              </div>
              <p className="text-xs text-[var(--muted-foreground,#64748b)] max-w-sm leading-relaxed">
                {archetype.hero.subtitle}
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground,#0f172a)] uppercase tracking-wider mb-3">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-[var(--muted-foreground,#64748b)]">
                <li>
                  <a href="#features" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
                    Core Capabilities
                  </a>
                </li>
                <li>
                  <a href="#offerings" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
                    Pricing & Tiers
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
                    Verified Reviews
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[var(--foreground,#0f172a)] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Statutory Policies */}
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground,#0f172a)] uppercase tracking-wider mb-3">
                Legal & Compliance
              </h4>
              <ul className="space-y-2 text-xs text-[var(--muted-foreground,#64748b)]">
                <li>
                  <button
                    onClick={() => handleOpenPolicy('privacy')}
                    className="hover:text-[var(--primary,#4f46e5)] transition-colors flex items-center gap-1 text-left"
                  >
                    Privacy Policy
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenPolicy('terms')}
                    className="hover:text-[var(--primary,#4f46e5)] transition-colors flex items-center gap-1 text-left"
                  >
                    Terms of Service
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenPolicy('refund')}
                    className="hover:text-[var(--primary,#4f46e5)] transition-colors flex items-center gap-1 text-left"
                  >
                    Refund & Cancellation
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenPolicy('shipping')}
                    className="hover:text-[var(--primary,#4f46e5)] transition-colors flex items-center gap-1 text-left"
                  >
                    Shipping & Delivery
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Natural Airwallex & Statutory Compliance Fine Print */}
          <div className="pt-8 border-t border-[var(--border,#e5e7eb)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground,#64748b)]">
            <div className="space-y-1 text-center md:text-left">
              <p>
                © {new Date().getFullYear()} <strong className="text-[var(--foreground,#0f172a)]">{business.companyName}</strong>. (Registration No: {business.registrationNumber || 'CR-89410294'}).
              </p>
              <p className="text-[11px]">
                Registered Office: {business.address || 'Marina Bay Financial Centre, Singapore 018983'} • Governing Law: {business.governingLaw || 'Republic of Singapore'}
              </p>
            </div>

            {/* Accepted Payment Scheme Badges */}
            <div className="flex items-center gap-3">
              <PaymentBadgesRow />
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* INTERACTIVE MODALS & DRAWERS                                  */}
      {/* ============================================================ */}
      <CheckoutSheet
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedOffering={selectedOfferingForCheckout}
        business={business}
      />

      <PolicyDialog
        isOpen={policyDialogOpen}
        onClose={() => setPolicyDialogOpen(false)}
        initialPolicy={activePolicyTab}
        business={business}
      />
    </div>
  );
}
