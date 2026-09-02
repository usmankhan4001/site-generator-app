'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, Zap, Shield, Sparkles, HelpCircle } from 'lucide-react';

export interface Pricing28_AgencyPartnerTierProps {
  badge?: string;
  headline?: string;
  description?: string;
  annualBilling?: boolean;
  plans?: Array<{
    id: string;
    name: string;
    price: number;
    billingPeriod?: string;
    description: string;
    features: string[];
    popular?: boolean;
    buttonText?: string;
  }>;
}

export const Pricing28_AgencyPartnerTier: React.FC<Pricing28_AgencyPartnerTierProps> = ({
  badge = 'Agency Partner',
  headline = 'Digital Agency & Reseller Tier',
  description = 'Revenue sharing plan offering 20% perpetual interchange revenue share for implementation partners.',
  annualBilling = false,
  plans = [
    {
      id: 'tier-starter',
      name: 'Starter Gateway',
      price: 29,
      billingPeriod: '/month',
      description: 'Ideal for early-stage ventures and fast deployment.',
      features: ['Up to $50k monthly GMV', 'Standard API access', 'Community support', 'Next-day payouts'],
      popular: false,
      buttonText: 'Deploy Starter',
    },
    {
      id: 'tier-growth',
      name: 'Growth Enterprise',
      price: 99,
      billingPeriod: '/month',
      description: 'Engineered for scaling businesses needing multi-currency rails.',
      features: [
        'Up to $500k monthly GMV',
        '130+ local settlement rails',
        'Priority 24/7 technical desk',
        'Same-day T+0 settlement',
        'Advanced fraud telemetry',
      ],
      popular: true,
      buttonText: 'Accelerate Growth',
    },
    {
      id: 'tier-institutional',
      name: 'Institutional Scale',
      price: 299,
      billingPeriod: '/month',
      description: 'Dedicated sovereign infrastructure and custom SLA agreements.',
      features: [
        'Unlimited monthly throughput',
        'Custom underwriting & limits',
        'Dedicated Solutions Architect',
        '99.999% uptime guarantee',
        'Air-gapped private clusters',
      ],
      popular: false,
      buttonText: 'Contact Procurement',
    },
  ],
}) => {
  const [isAnnual, setIsAnnual] = useState(annualBilling);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background,#ffffff)] text-[var(--foreground,#0f172a)] transition-colors border-b border-[var(--border,#e5e7eb)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center max-w-3xl mx-auto space-y-3">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] border border-[var(--primary,#4f46e5)]/20">
              <Sparkles className="w-3.5 h-3.5" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
            {headline}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-[var(--muted-foreground,#64748b)]">
              {description}
            </p>
          )}

          {/* Billing Switcher Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${!isAnnual ? 'text-[var(--foreground,#0f172a)]' : 'text-[var(--muted-foreground,#64748b)]'}`}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[var(--primary,#4f46e5)] transition-colors duration-200 ease-in-out focus:outline-hidden"
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isAnnual ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-[var(--foreground,#0f172a)]' : 'text-[var(--muted-foreground,#64748b)]'}`}>
              Annual Billing
              <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const finalPrice = isAnnual ? Math.round(plan.price * 0.8) : plan.price;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? 'border-[var(--primary,#4f46e5)] bg-[var(--card,#ffffff)] shadow-xl ring-2 ring-[var(--primary,#4f46e5)]/20 md:-translate-y-2'
                    : 'border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] shadow-xs hover:border-[var(--primary,#4f46e5)]/40 hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary,#4f46e5)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--primary-foreground,#ffffff)] shadow-xs">
                    Recommended
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[var(--foreground,#0f172a)]">{plan.name}</h3>
                    {plan.popular && <Zap className="w-4 h-4 text-[var(--primary,#4f46e5)]" />}
                  </div>
                  <p className="mt-1 text-xs text-[var(--muted-foreground,#64748b)] min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="mt-6 mb-6 pb-6 border-b border-[var(--border,#e5e7eb)]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-[var(--foreground,#0f172a)]">
                        ${finalPrice}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground,#64748b)] font-medium">
                        {plan.billingPeriod || '/month'}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs sm:text-sm text-[var(--foreground,#0f172a)]">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[var(--primary,#4f46e5)] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-[var(--primary,#4f46e5)] text-[var(--primary-foreground,#ffffff)] hover:bg-[var(--primary-hover,#4338ca)]'
                      : 'border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] text-[var(--foreground,#0f172a)] hover:bg-[var(--muted,#f1f5f9)]'
                  }`}
                >
                  <span>{plan.buttonText || 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing28_AgencyPartnerTier;
