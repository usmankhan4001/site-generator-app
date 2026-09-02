import React from 'react';
import type { Config, Data } from '@measured/puck';
import {
  ArrowRight,
  Check,
  Star,
  Shield,
  Zap,
  Mail,
  Phone,
  MapPin,
  Send,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  DynamicBrandLogo,
} from '@/components/preview/Logomarks';
import { PaymentBadgesRow } from '@/components/preview/PaymentBadges';

export type RootProps = {
  title?: string;
  themePrimaryColor?: string;
};

export type HeroProps = {
  badge: string;
  headline: string;
  accentText: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
  trustBadges: { text: string }[];
};

export type BentoProps = {
  categoryTitle: string;
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    badge: string;
    image: string;
  }[];
};

export type StatsProps = {
  items: {
    value: string;
    label: string;
  }[];
};

export type OfferingsProps = {
  categoryTitle: string;
  title: string;
  subtitle: string;
  currency: string;
  items: {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    popular: boolean;
  }[];
};

export type TestimonialsProps = {
  categoryTitle: string;
  title: string;
  items: {
    name: string;
    role: string;
    text: string;
    rating: number;
    avatar: string;
  }[];
};

export type FaqProps = {
  categoryTitle: string;
  title: string;
  items: {
    q: string;
    a: string;
  }[];
};

export type ContactProps = {
  categoryTitle: string;
  title: string;
  subtitle: string;
  companyName: string;
  address: string;
  email: string;
  phone: string;
};

export type FooterProps = {
  companyName: string;
  tagline: string;
  registrationNumber: string;
  address: string;
  governingLaw: string;
  platformLinks: { label: string; href: string }[];
  legalLinks: { label: string; href: string }[];
};

export type PoliciesProps = {
  companyName: string;
  registrationNumber: string;
  address: string;
  email: string;
  phone: string;
  governingLaw: string;
  activePolicy: 'privacy' | 'terms' | 'refund' | 'shipping';
};

export type Props = {
  Hero: HeroProps;
  Bento: BentoProps;
  Stats: StatsProps;
  Offerings: OfferingsProps;
  Testimonials: TestimonialsProps;
  FAQ: FaqProps;
  Contact: ContactProps;
  Footer: FooterProps;
  Policies: PoliciesProps;
};

export const puckConfig: Config<Props, RootProps> = {
  components: {
    Hero: {
      fields: {
        badge: { type: 'text', label: 'Badge Text' },
        headline: { type: 'text', label: 'Headline' },
        accentText: { type: 'text', label: 'Accent Text' },
        subtitle: { type: 'textarea', label: 'Subtitle Description' },
        primaryCta: { type: 'text', label: 'Primary CTA Text' },
        secondaryCta: { type: 'text', label: 'Secondary CTA Text' },
        image: { type: 'text', label: 'Hero Image URL' },
        trustBadges: {
          type: 'array',
          label: 'Trust Badges',
          
          arrayFields: {
            text: { type: 'text', label: 'Badge Label' },
          },
        },
      },
      defaultProps: {
        badge: 'Institutional Cloud Infrastructure',
        headline: 'Automate Next-Gen Global Operations with',
        accentText: 'Zero Friction',
        subtitle:
          'High-performance cloud scaling, unified multi-region payment routing, and enterprise-grade reliability.',
        primaryCta: 'Get Started Today',
        secondaryCta: 'Explore Solutions',
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        trustBadges: [
          { text: 'PCI-DSS Level 1' },
          { text: 'SOC 2 Type II Certified' },
          { text: '99.99% Uptime SLA' },
        ],
      },
      render: ({
        badge,
        headline,
        accentText,
        subtitle,
        primaryCta,
        secondaryCta,
        image,
        trustBadges,
      }) => (
        <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-white text-slate-900 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                {badge && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 shadow-xs">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-900 tracking-wide">
                      {badge}
                    </span>
                  </div>
                )}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
                  {headline}{' '}
                  <span className="text-indigo-600 block sm:inline">{accentText}</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold shadow-md cursor-pointer transition-all"
                  >
                    <span>{primaryCta}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  {secondaryCta && (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-sm font-semibold shadow-xs cursor-pointer transition-all"
                    >
                      <span>{secondaryCta}</span>
                    </button>
                  )}
                </div>
                {trustBadges && trustBadges.length > 0 && (
                  <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    {trustBadges.map((tb, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200"
                      >
                        <Shield className="h-3.5 w-3.5 text-indigo-600" />
                        <span className="font-medium text-slate-800">{tb.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl overflow-hidden group">
                  <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={headline}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    Bento: {
      fields: {
        categoryTitle: { type: 'text', label: 'Category Tag' },
        title: { type: 'text', label: 'Section Title' },
        description: { type: 'textarea', label: 'Section Description' },
        items: {
          type: 'array',
          label: 'Bento Grid Items',
          
          arrayFields: {
            title: { type: 'text', label: 'Title' },
            description: { type: 'textarea', label: 'Description' },
            badge: { type: 'text', label: 'Badge' },
            image: { type: 'text', label: 'Image URL' },
          },
        },
      },
      defaultProps: {
        categoryTitle: 'Engineered Capabilities',
        title: 'Bespoke Architecture & Features',
        description:
          'Tailored for high velocity, institutional reliability, and seamless scalability.',
        items: [
          {
            title: 'Global High-Availability Edge Mesh',
            description:
              'Multi-datacenter fault tolerance with automated failover and sub-50ms latency across 32 worldwide nodes.',
            badge: 'Multi-Region Mesh',
            image:
              'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
          },
          {
            title: 'Autonomous Scalability Engine',
            description:
              'Elastic computing cluster that dynamically orchestrates load balancing and burst scaling during peak demand.',
            badge: 'Instant Provisioning',
            image:
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
          },
          {
            title: 'Hardened Zero-Trust Defense',
            description:
              'Enterprise key rotation, automated telemetry auditing, and TLS 1.3 enforced throughout the cluster.',
            badge: 'SOC2 & ISO Ready',
            image:
              'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      render: ({ categoryTitle, title, description, items }) => (
        <section className="py-20 bg-slate-50 border-b border-slate-200 text-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              {categoryTitle && (
                <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {categoryTitle}
                </span>
              )}
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">{description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {items?.map((bento, idx) => (
                <div
                  key={idx}
                  className={`group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    idx === 0 ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                >
                  <div className="space-y-3">
                    {bento.badge && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                        <Zap className="h-3 w-3" />
                        {bento.badge}
                      </span>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {bento.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {bento.description}
                    </p>
                  </div>
                  {bento.image && (
                    <div className="mt-6 aspect-16/9 w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bento.image}
                        alt={bento.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    Stats: {
      fields: {
        items: {
          type: 'array',
          label: 'Metric Counters',
          
          arrayFields: {
            value: { type: 'text', label: 'Metric Value' },
            label: { type: 'text', label: 'Metric Label' },
          },
        },
      },
      defaultProps: {
        items: [
          { value: '99.99%', label: 'Guaranteed System Uptime' },
          { value: '250M+', label: 'Monthly Telemetry Transactions' },
          { value: '< 15ms', label: 'Global Edge Response Time' },
          { value: '24/7/365', label: 'Dedicated Engineering Support' },
        ],
      },
      render: ({ items }) => (
        <section className="py-14 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              {items?.map((stat, idx) => (
                <div
                  key={idx}
                  className={`text-center ${idx > 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''}`}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-indigo-600 tracking-tight">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    Offerings: {
      fields: {
        categoryTitle: { type: 'text', label: 'Category Tag' },
        title: { type: 'text', label: 'Section Title' },
        subtitle: { type: 'textarea', label: 'Section Subtitle' },
        currency: { type: 'text', label: 'Currency Code (e.g. USD, EUR)' },
        items: {
          type: 'array',
          label: 'Offerings / Pricing Packages',
          
          arrayFields: {
            id: { type: 'text', label: 'ID' },
            name: { type: 'text', label: 'Plan Name' },
            price: { type: 'number', label: 'Price' },
            description: { type: 'textarea', label: 'Description' },
            popular: {
              type: 'radio',
              label: 'Popular / Featured',
              options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ],
            },
            features: {
              type: 'array',
              label: 'Features List',
              
              arrayFields: {
                f: { type: 'text', label: 'Feature description' },
              },
            },
          },
        },
      },
      defaultProps: {
        categoryTitle: 'Commercial Tiers',
        title: 'Transparent Service Packages',
        subtitle: 'Clear deliverables, fixed pricing, and satisfaction guaranteed.',
        currency: 'USD',
        items: [
          {
            id: 'starter',
            name: 'Cloud Core Tier',
            price: 249,
            description:
              'Foundational managed cloud node with multi-zone DNS failover and TLS management.',
            features: [
              'Single Dedicated Virtual Pod',
              'Automated Daily Snapshots',
              '99.9% Uptime Guarantee',
              'Standard Email Support Desk',
            ],
            popular: false,
          },
          {
            id: 'pro',
            name: 'Enterprise Mesh Tier',
            price: 699,
            description:
              'Full multi-region orchestration mesh with automated burst provisioning and dedicated support.',
            features: [
              'High-Density Multi-Region Cluster',
              'Real-Time Telemetry & APM',
              'PCI-DSS & SOC2 Hardened Image',
              'Priority 1-Hour SLA Support',
            ],
            popular: true,
          },
          {
            id: 'enterprise',
            name: 'Dedicated Private Cloud',
            price: 1499,
            description:
              'Custom isolated infrastructure running on bare-metal hardware with bespoke compliance auditing.',
            features: [
              'Bespoke Dedicated Bare-Metal',
              'Custom Data Residency Guarantees',
              'Dedicated Systems Architect',
              '24/7 War Room Phone Hotline',
            ],
            popular: false,
          },
        ],
      },
      render: ({ categoryTitle, title, subtitle, currency, items }) => (
        <section className="py-20 bg-white border-b border-slate-200 text-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              {categoryTitle && (
                <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {categoryTitle}
                </span>
              )}
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">{subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {items?.map((offering, idx) => {
                const isPopular = offering.popular || idx === 1;
                const features = Array.isArray(offering.features)
                  ? offering.features.map((f: any) => (typeof f === 'string' ? f : f?.f || ''))
                  : [];
                return (
                  <div
                    key={offering.id || idx}
                    className={`relative flex flex-col justify-between rounded-xl border bg-white p-6 sm:p-8 transition-all duration-300 ${
                      isPopular
                        ? 'border-indigo-600 shadow-xl ring-2 ring-indigo-600/20 scale-102'
                        : 'border-slate-200 shadow-xs hover:border-indigo-300'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                        Most Popular
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{offering.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 min-h-[40px] leading-relaxed">
                        {offering.description}
                      </p>
                      <div className="mt-5 mb-6 pb-6 border-b border-slate-200">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                            ${offering.price}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {currency || 'USD'} / one-time
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                        {features.map((feat: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-start gap-2.5">
                            <Check className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                        isPopular
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <span>Select Tier</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ),
    },

    Testimonials: {
      fields: {
        categoryTitle: { type: 'text', label: 'Category Tag' },
        title: { type: 'text', label: 'Section Title' },
        items: {
          type: 'array',
          label: 'Client Testimonials',
          
          arrayFields: {
            name: { type: 'text', label: 'Name' },
            role: { type: 'text', label: 'Title / Organization' },
            text: { type: 'textarea', label: 'Review Text' },
            rating: { type: 'number', label: 'Rating (1-5)' },
            avatar: { type: 'text', label: 'Avatar URL' },
          },
        },
      },
      defaultProps: {
        categoryTitle: 'Client Reviews',
        title: 'Validated by Industry Leaders',
        items: [
          {
            name: 'Marcus Sterling',
            role: 'VP Infrastructure, Zenith Horizon',
            text:
              'Deploying our core banking routing through this architecture cut failover latency by 80%. Exceptional compliance rigor and zero downtime.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          },
          {
            name: 'Elena Rostova',
            role: 'Principal Cloud Architect, FinGlobal AG',
            text:
              'The automated compliance blueprints and Airwallex KYC synergy allowed us to enter 4 new regional markets without rewriting billing logic.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
        ],
      },
      render: ({ categoryTitle, title, items }) => (
        <section className="py-20 bg-slate-50 border-b border-slate-200 text-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              {categoryTitle && (
                <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {categoryTitle}
                </span>
              )}
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items?.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base italic text-slate-700 leading-relaxed">
                      &quot;{t.text}&quot;
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    FAQ: {
      fields: {
        categoryTitle: { type: 'text', label: 'Category Tag' },
        title: { type: 'text', label: 'Section Title' },
        items: {
          type: 'array',
          label: 'FAQ Q&A Pairs',
          
          arrayFields: {
            q: { type: 'text', label: 'Question' },
            a: { type: 'textarea', label: 'Answer' },
          },
        },
      },
      defaultProps: {
        categoryTitle: 'Support & Inquiries',
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'How quickly is cloud infrastructure provisioned after onboarding?',
            a: 'Immediate. All core routing pods, TLS credentials, and telemetry streams are initialized via our automated pipeline within 15 minutes of onboarding confirmation.',
          },
          {
            q: 'What compliance certifications are supported out of the box?',
            a: 'Our deployments operate on SOC 2 Type II, ISO 27001, and PCI-DSS Level 1 compliant infrastructure patterns with full data residency guarantees.',
          },
          {
            q: 'Can we configure custom domain routing and dedicated IPs?',
            a: 'Yes. Dedicated IP allocation, custom reverse-proxy routing, and custom SSL termination can be enabled directly from the console.',
          },
          {
            q: 'What refund terms apply to digital services and retainers?',
            a: 'All initial audit fees are covered by our 30-day satisfaction guarantee. Monthly retainers can be cancelled anytime with no cancellation penalties.',
          },
        ],
      },
      render: ({ categoryTitle, title, items }) => (
        <section className="py-20 bg-white border-b border-slate-200 text-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              {categoryTitle && (
                <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {categoryTitle}
                </span>
              )}
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h2>
            </div>
            <div className="space-y-4">
              {items?.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-2xs space-y-2"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center justify-between">
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    Contact: {
      fields: {
        categoryTitle: { type: 'text', label: 'Category Tag' },
        title: { type: 'text', label: 'Section Title' },
        subtitle: { type: 'textarea', label: 'Section Subtitle' },
        companyName: { type: 'text', label: 'Company Name' },
        address: { type: 'text', label: 'Registered Address' },
        email: { type: 'text', label: 'Contact Email' },
        phone: { type: 'text', label: 'Contact Phone' },
      },
      defaultProps: {
        categoryTitle: 'Get In Touch',
        title: 'Connect with our Leadership',
        subtitle:
          'Have a customized requirement or enterprise question? Reach out directly and our advisory team will respond within 12 hours.',
        companyName: 'Vantage Cloud Systems Ltd',
        address: 'Level 38, Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983',
        email: 'ops@vantagecloud.io',
        phone: '+65 6812 9400',
      },
      render: ({ categoryTitle, title, subtitle, address, email, phone }) => (
        <section className="py-20 bg-slate-50 border-b border-slate-200 text-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-6">
                {categoryTitle && (
                  <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    {categoryTitle}
                  </span>
                )}
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  {title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{subtitle}</p>
                <div className="space-y-4 pt-2 text-sm text-slate-800">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Registered Office</strong>
                      <span className="text-xs text-slate-600">{address}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Support & Inquiries</strong>
                      <span className="text-xs text-slate-600">{email}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Direct Telephone Line</strong>
                      <span className="text-xs text-slate-600">{phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-900 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Jane Doe"
                          className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-900 mb-1">
                          Work Email
                        </label>
                        <input
                          type="email"
                          defaultValue="jane@company.com"
                          className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 mb-1">
                        Message & Architecture Details
                      </label>
                      <textarea
                        rows={4}
                        defaultValue="Requesting enterprise onboarding briefing and compliance review."
                        className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    Footer: {
      fields: {
        companyName: { type: 'text', label: 'Company Name' },
        tagline: { type: 'text', label: 'Tagline' },
        registrationNumber: { type: 'text', label: 'Registration Number' },
        address: { type: 'text', label: 'Registered Address' },
        governingLaw: { type: 'text', label: 'Governing Law' },
        platformLinks: {
          type: 'array',
          label: 'Platform Links',
          
          arrayFields: {
            label: { type: 'text', label: 'Label' },
            href: { type: 'text', label: 'Href' },
          },
        },
        legalLinks: {
          type: 'array',
          label: 'Legal Links',
          
          arrayFields: {
            label: { type: 'text', label: 'Label' },
            href: { type: 'text', label: 'Href' },
          },
        },
      },
      defaultProps: {
        companyName: 'Vantage Cloud Systems Ltd',
        tagline:
          'Institutional cloud infrastructure and multi-region deployment automation designed for high-growth enterprises.',
        registrationNumber: 'CR-89410294',
        address: 'Level 38, Marina Bay Financial Centre Tower 2, Singapore 018983',
        governingLaw: 'Republic of Singapore',
        platformLinks: [
          { label: 'Core Capabilities', href: '#features' },
          { label: 'Pricing & Tiers', href: '#offerings' },
          { label: 'Client Reviews', href: '#testimonials' },
          { label: 'FAQ', href: '#faq' },
        ],
        legalLinks: [
          { label: 'Privacy Policy', href: '/policies/privacy' },
          { label: 'Terms of Service', href: '/policies/terms' },
          { label: 'Refund & Cancellation', href: '/policies/refund' },
          { label: 'Shipping & Delivery', href: '/policies/shipping' },
        ],
      },
      render: ({
        companyName,
        tagline,
        registrationNumber,
        address,
        governingLaw,
        platformLinks,
        legalLinks,
      }) => (
        <footer className="border-t border-slate-200 bg-white pt-14 pb-10 text-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="text-indigo-600">
                    <DynamicBrandLogo archetypeId="cloud-devops" size={24} />
                  </div>
                  <span className="font-bold text-base text-slate-900">{companyName}</span>
                </div>
                <p className="text-xs text-slate-600 max-w-sm leading-relaxed">{tagline}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Platform
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {platformLinks?.map((l, idx) => (
                    <li key={idx}>
                      <a href={l.href} className="hover:text-slate-900 transition-colors">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Legal & Compliance
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  {legalLinks?.map((l, idx) => (
                    <li key={idx}>
                      <a
                        href={l.href}
                        className="hover:text-indigo-600 transition-colors flex items-center gap-1"
                      >
                        {l.label}
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="space-y-1 text-center md:text-left">
                <p>
                  © {new Date().getFullYear()}{' '}
                  <strong className="text-slate-800">{companyName}</strong>. (Registration No:{' '}
                  {registrationNumber}).
                </p>
                <p className="text-[11px]">
                  Registered Office: {address} • Governing Law: {governingLaw}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <PaymentBadgesRow />
              </div>
            </div>
          </div>
        </footer>
      ),
    },

    Policies: {
      fields: {
        companyName: { type: 'text', label: 'Company Name' },
        registrationNumber: { type: 'text', label: 'Registration Number' },
        address: { type: 'text', label: 'Registered Address' },
        email: { type: 'text', label: 'Contact Email' },
        phone: { type: 'text', label: 'Contact Phone' },
        governingLaw: { type: 'text', label: 'Governing Law' },
        activePolicy: {
          type: 'select',
          label: 'Active Policy Content',
          options: [
            { label: 'Privacy Policy', value: 'privacy' },
            { label: 'Terms of Service', value: 'terms' },
            { label: 'Refund & Cancellation', value: 'refund' },
            { label: 'Shipping & Delivery', value: 'shipping' },
          ],
        },
      },
      defaultProps: {
        companyName: 'Vantage Cloud Systems Ltd',
        registrationNumber: 'CR-89410294',
        address: 'Level 38, Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983',
        email: 'ops@vantagecloud.io',
        phone: '+65 6812 9400',
        governingLaw: 'Republic of Singapore',
        activePolicy: 'privacy',
      },
      render: ({
        companyName,
        registrationNumber,
        address,
        email,
        phone,
        governingLaw,
        activePolicy,
      }) => {
        return (
          <div className="py-16 bg-white text-slate-900 border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10 pb-6 border-b border-slate-200">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-3">
                  <Shield className="h-3.5 w-3.5" />
                  Statutory Regulatory Policy
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 capitalize">
                  {activePolicy === 'terms'
                    ? 'Terms of Service'
                    : activePolicy === 'refund'
                    ? 'Refund & Cancellation Policy'
                    : activePolicy === 'shipping'
                    ? 'Shipping & Delivery Policy'
                    : 'Privacy Policy'}
                </h1>
                <p className="text-xs text-slate-500 mt-2">
                  Entity: <strong>{companyName}</strong> (Reg No: {registrationNumber}) • Governing
                  Law: {governingLaw}
                </p>
              </div>

              {activePolicy === 'privacy' && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <h3 className="text-base font-bold text-slate-900">
                    1. Information We Collect
                  </h3>
                  <p>
                    {companyName} (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;) complies with global data protection
                    laws including GDPR and CCPA. We collect information you provide directly,
                    including names, corporate contact details, billing telemetry, and API logs.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    2. Commercial Data Usage
                  </h3>
                  <p>
                    Data is processed exclusively to deliver high-availability cloud services, verify
                    transactions, detect anomalies, and satisfy institutional compliance
                    obligations.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    3. Security & Storage
                  </h3>
                  <p>
                    All customer payloads are encrypted using TLS 1.3 in transit and AES-256 at rest.
                    Access is restricted via role-based access control (RBAC).
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    4. Contact Our Data Desk
                  </h3>
                  <p>
                    Inquiries can be addressed to our Data Protection Officer at{' '}
                    <span className="text-indigo-600 font-semibold">{email}</span> or via phone at{' '}
                    <span className="text-indigo-600 font-semibold">{phone}</span>.
                  </p>
                </div>
              )}

              {activePolicy === 'terms' && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <h3 className="text-base font-bold text-slate-900">
                    1. Commercial Agreement
                  </h3>
                  <p>
                    By engaging {companyName}, you agree to be bound by these Terms of Service. If
                    entering into this agreement on behalf of a company, you warrant you have legal
                    authority to bind that entity.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    2. Invoicing & Billing
                  </h3>
                  <p>
                    Fees are quoted in USD or contractual currency. Invoices are dispatched via
                    automated encrypted channels. Subscriptions renew automatically unless cancelled
                    prior to cycle end.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    3. Intellectual Property
                  </h3>
                  <p>
                    All proprietary algorithms, codebases, and templates remain the property of{' '}
                    {companyName}. Deliverables transfer ownership upon full receipt of invoiced
                    compensation.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    4. Jurisdiction
                  </h3>
                  <p>
                    These terms are governed exclusively by the laws of {governingLaw}.
                  </p>
                </div>
              )}

              {activePolicy === 'refund' && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <h3 className="text-base font-bold text-slate-900">
                    1. Satisfaction Guarantee
                  </h3>
                  <p>
                    At {companyName}, we maintain an institutional commitment to quality. Eligible
                    refund requests must be submitted within 30 days of initial onboarding.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    2. Engineering Retainers
                  </h3>
                  <p>
                    Initial technical audit fees are refundable prior to deliverable hand-off. For
                    recurring retainers, cancellation takes effect at the end of the billing period.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    3. Refund Window
                  </h3>
                  <p>
                    Reimbursements are returned to the original card or bank account within 5 to 10
                    business days. Contact <span className="text-indigo-600 font-semibold">{email}</span>.
                  </p>
                </div>
              )}

              {activePolicy === 'shipping' && (
                <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
                  <h3 className="text-base font-bold text-slate-900">
                    1. Electronic Delivery
                  </h3>
                  <p>
                    Software licenses, cloud configurations, API credentials, and technical reports
                    are provisioned electronically within 24 hours of payment authorization.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    2. Hardware Order Dispatch
                  </h3>
                  <p>
                    Physical components are dispatched via DHL Express or FedEx within 1-2 business
                    days from our regional hubs.
                  </p>
                  <h3 className="text-base font-bold text-slate-900">
                    3. Logistics Desk
                  </h3>
                  <p>
                    For tracking inquiries, contact our logistics desk at{' '}
                    <span className="text-indigo-600 font-semibold">{phone}</span>.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      },
    },
  },
};

export const getDefaultPuckDataForRoute = (route: string): Data => {
  if (route === '/about') {
    return {
      content: [
        {
          type: 'Hero',
          props: {
            id: 'about-hero',
            badge: 'About Our Mission',
            headline: 'Engineering Scalable Operations for',
            accentText: 'Global Ambition',
            subtitle:
              'Built by systems architects and distributed systems engineers dedicated to cloud sovereignty and reliability.',
            primaryCta: 'Join Our Team',
            secondaryCta: 'Contact Leadership',
            image:
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
            trustBadges: [
              { text: 'Founded 2021' },
              { text: '32 Global Data Centers' },
              { text: '100% Bootstrapped' },
            ],
          },
        },
        {
          type: 'Stats',
          props: {
            id: 'about-stats',
            items: [
              { value: '50+', label: 'Core Infrastructure Engineers' },
              { value: '14', label: 'Offices in Financial Hubs' },
              { value: '99.99%', label: 'Historical Uptime Record' },
              { value: '$2B+', label: 'Annual Volume Processed' },
            ],
          },
        },
        {
          type: 'Testimonials',
          props: {
            id: 'about-testimonials',
            categoryTitle: 'Executive Endorsements',
            title: 'Trusted by Leaders in Finance & Cloud',
            items: [
              {
                name: 'Alexander Croft',
                role: 'Chief Technology Officer, PayScale Global',
                text:
                  'Vantage Cloud Systems provided the exact institutional security and automated routing we required for our Tier-1 compliance audit.',
                rating: 5,
                avatar:
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
              },
            ],
          },
        },
        {
          type: 'Footer',
          props: {
            id: 'about-footer',
            companyName: 'Vantage Cloud Systems Ltd',
            tagline:
              'Institutional cloud infrastructure and multi-region deployment automation designed for high-growth enterprises.',
            registrationNumber: 'CR-89410294',
            address: 'Level 38, Marina Bay Financial Centre Tower 2, Singapore 018983',
            governingLaw: 'Republic of Singapore',
            platformLinks: [
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Contact', href: '/contact' },
            ],
            legalLinks: [
              { label: 'Privacy Policy', href: '/policies/privacy' },
              { label: 'Terms of Service', href: '/policies/terms' },
            ],
          },
        },
      ],
      root: { props: { title: 'About Us' } },
    };
  }

  if (route === '/services') {
    return {
      content: [
        {
          type: 'Hero',
          props: {
            id: 'services-hero',
            badge: 'Enterprise Service Offerings',
            headline: 'Complete Managed Infrastructure &',
            accentText: 'Deployment Services',
            subtitle:
              'From zero-trust perimeter deployment to automated multi-cloud failover and 24/7 SOC monitoring.',
            primaryCta: 'Explore Tiers',
            secondaryCta: 'Book Architect Call',
            image:
              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
            trustBadges: [
              { text: 'Custom SLAs' },
              { text: 'SOC 2 Ready' },
              { text: 'Zero Downtime Migration' },
            ],
          },
        },
        {
          type: 'Bento',
          props: {
            id: 'services-bento',
            categoryTitle: 'Service Pillars',
            title: 'Engineered Infrastructure Disciplines',
            description:
              'Comprehensive operational management designed to let your engineering team focus on shipping products.',
            items: [
              {
                title: 'Multi-Region Kubernetes Mesh',
                description:
                  'Automated continuous delivery pipelines with canary rollouts and instant rollbacks across all environments.',
                badge: 'GitOps Workflow',
                image:
                  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Real-Time Telemetry & Threat Defense',
                description:
                  'Distributed anomaly detection and DDoS mitigation filtering 100M+ malicious edge requests daily.',
                badge: 'Zero-Trust Shield',
                image:
                  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
              },
            ],
          },
        },
        {
          type: 'Offerings',
          props: {
            id: 'services-offerings',
            categoryTitle: 'Commercial Tiers',
            title: 'Fixed Transparent Pricing',
            subtitle: 'Institutional grade deliverables with satisfaction guaranteed.',
            currency: 'USD',
            items: [
              {
                id: 'standard',
                name: 'Core Managed Pod',
                price: 499,
                description: 'Full stack cluster monitoring and automated weekly backups.',
                popular: false,
                features: ['Single Cluster Deployment', 'Daily Snapshots', 'Standard SLA'],
              },
              {
                id: 'growth',
                name: 'Global High-Availability',
                price: 1299,
                description: 'Multi-region mesh with automated traffic balancing and 24/7 on-call.',
                popular: true,
                features: ['Multi-Region Edge', '1-Hour SLA', 'PCI-DSS Compliant Image'],
              },
            ],
          },
        },
        {
          type: 'Footer',
          props: {
            id: 'services-footer',
            companyName: 'Vantage Cloud Systems Ltd',
            tagline: 'Enterprise cloud systems and infrastructure.',
            registrationNumber: 'CR-89410294',
            address: 'Singapore 018983',
            governingLaw: 'Republic of Singapore',
            platformLinks: [
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ],
            legalLinks: [{ label: 'Privacy Policy', href: '/policies/privacy' }],
          },
        },
      ],
      root: { props: { title: 'Our Services' } },
    };
  }

  if (route === '/contact') {
    return {
      content: [
        {
          type: 'Hero',
          props: {
            id: 'contact-hero',
            badge: 'Direct Advisory Channel',
            headline: 'Speak Directly With Our',
            accentText: 'Systems Architects',
            subtitle:
              'Have a bespoke deployment or enterprise RFP? Our engineering directors are available around the clock.',
            primaryCta: 'Message Us Below',
            secondaryCta: 'View Locations',
            image:
              'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80',
            trustBadges: [
              { text: '12-Hour Response SLA' },
              { text: 'NDA Guaranteed' },
              { text: 'Direct Engineering Access' },
            ],
          },
        },
        {
          type: 'Contact',
          props: {
            id: 'contact-form',
            categoryTitle: 'Inquiries',
            title: 'Connect with our Leadership Desk',
            subtitle:
              'Submit your technical specifications or RFP details and receive a proposal within one business day.',
            companyName: 'Vantage Cloud Systems Ltd',
            address:
              'Level 38, Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983',
            email: 'ops@vantagecloud.io',
            phone: '+65 6812 9400',
          },
        },
        {
          type: 'FAQ',
          props: {
            id: 'contact-faq',
            categoryTitle: 'FAQ',
            title: 'Common Onboarding Questions',
            items: [
              {
                q: 'What is the fastest way to arrange a technical NDA?',
                a: 'Send a request through the form above or email ops@vantagecloud.io; our legal counsel signs standard bilateral NDAs within 4 hours.',
              },
              {
                q: 'Do you offer on-premise or private-cloud deployments?',
                a: 'Yes, we support air-gapped bare metal and customer-controlled VPC orchestrations.',
              },
            ],
          },
        },
        {
          type: 'Footer',
          props: {
            id: 'contact-footer',
            companyName: 'Vantage Cloud Systems Ltd',
            tagline: 'Enterprise cloud systems and infrastructure.',
            registrationNumber: 'CR-89410294',
            address: 'Singapore 018983',
            governingLaw: 'Republic of Singapore',
            platformLinks: [
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
            ],
            legalLinks: [{ label: 'Privacy Policy', href: '/policies/privacy' }],
          },
        },
      ],
      root: { props: { title: 'Contact Us' } },
    };
  }

  if (route.startsWith('/policies')) {
    const policyType = route.includes('terms')
      ? 'terms'
      : route.includes('refund')
      ? 'refund'
      : route.includes('shipping')
      ? 'shipping'
      : 'privacy';

    return {
      content: [
        {
          type: 'Policies',
          props: {
            id: 'policy-content',
            companyName: 'Vantage Cloud Systems Ltd',
            registrationNumber: 'CR-89410294',
            address:
              'Level 38, Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983',
            email: 'ops@vantagecloud.io',
            phone: '+65 6812 9400',
            governingLaw: 'Republic of Singapore',
            activePolicy: policyType,
          },
        },
        {
          type: 'Footer',
          props: {
            id: 'policy-footer',
            companyName: 'Vantage Cloud Systems Ltd',
            tagline:
              'Institutional cloud infrastructure and multi-region deployment automation designed for high-growth enterprises.',
            registrationNumber: 'CR-89410294',
            address: 'Level 38, Marina Bay Financial Centre Tower 2, Singapore 018983',
            governingLaw: 'Republic of Singapore',
            platformLinks: [
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/services' },
              { label: 'Contact', href: '/contact' },
            ],
            legalLinks: [
              { label: 'Privacy Policy', href: '/policies/privacy' },
              { label: 'Terms of Service', href: '/policies/terms' },
              { label: 'Refund Policy', href: '/policies/refund' },
              { label: 'Shipping Policy', href: '/policies/shipping' },
            ],
          },
        },
      ],
      root: { props: { title: 'Legal & Policies' } },
    };
  }

  // Default Homepage ('/')
  return {
    content: [
      {
        type: 'Hero',
        props: {
          id: 'home-hero',
          badge: 'Airwallex Compliance Engine',
          headline: 'Automate Next-Gen Global Operations with',
          accentText: 'Zero Friction',
          subtitle:
            'High-performance cloud scaling, unified multi-region payment routing, and enterprise-grade reliability.',
          primaryCta: 'Get Started Today',
          secondaryCta: 'Explore Solutions',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          trustBadges: [
            { text: 'PCI-DSS Level 1' },
            { text: 'SOC 2 Type II' },
            { text: '99.99% SLA' },
          ],
        },
      },
      {
        type: 'Stats',
        props: {
          id: 'home-stats',
          items: [
            { value: '99.99%', label: 'Guaranteed System Uptime' },
            { value: '250M+', label: 'Monthly Telemetry Transactions' },
            { value: '< 15ms', label: 'Global Edge Response Time' },
            { value: '24/7/365', label: 'Dedicated Support Desk' },
          ],
        },
      },
      {
        type: 'Bento',
        props: {
          id: 'home-bento',
          categoryTitle: 'Engineered Capabilities',
          title: 'Bespoke Architecture & Features',
          description:
            'Tailored for high velocity, institutional reliability, and seamless scalability.',
          items: [
            {
              title: 'Global High-Availability Edge Mesh',
              description:
                'Multi-datacenter fault tolerance with automated failover and sub-50ms latency across 32 worldwide nodes.',
              badge: 'Multi-Region Mesh',
              image:
                'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Autonomous Scalability Engine',
              description:
                'Elastic computing cluster that dynamically orchestrates load balancing during peak demand.',
              badge: 'Instant Provisioning',
              image:
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'Hardened Zero-Trust Defense',
              description:
                'Enterprise key rotation, automated telemetry auditing, and TLS 1.3 enforced throughout the cluster.',
              badge: 'SOC2 & ISO Ready',
              image:
                'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
            },
          ],
        },
      },
      {
        type: 'Offerings',
        props: {
          id: 'home-offerings',
          categoryTitle: 'Commercial Tiers',
          title: 'Transparent Service Packages',
          subtitle: 'Clear deliverables, fixed pricing, and satisfaction guaranteed.',
          currency: 'USD',
          items: [
            {
              id: 'starter',
              name: 'Cloud Core Tier',
              price: 249,
              description:
                'Foundational managed cloud node with multi-zone DNS failover and TLS management.',
              popular: false,
              features: [
                'Single Dedicated Virtual Pod',
                'Automated Daily Snapshots',
                '99.9% Uptime Guarantee',
                'Standard Email Support',
              ],
            },
            {
              id: 'pro',
              name: 'Enterprise Mesh Tier',
              price: 699,
              description:
                'Full multi-region orchestration mesh with automated burst provisioning and dedicated support.',
              popular: true,
              features: [
                'High-Density Multi-Region Cluster',
                'Real-Time Telemetry & APM',
                'PCI-DSS & SOC2 Hardened Image',
                'Priority 1-Hour SLA Support',
              ],
            },
            {
              id: 'enterprise',
              name: 'Dedicated Private Cloud',
              price: 1499,
              description:
                'Custom isolated infrastructure running on bare-metal hardware with bespoke compliance auditing.',
              popular: false,
              features: [
                'Bespoke Dedicated Bare-Metal',
                'Custom Data Residency Guarantees',
                'Dedicated Systems Architect',
                '24/7 War Room Phone Hotline',
              ],
            },
          ],
        },
      },
      {
        type: 'Testimonials',
        props: {
          id: 'home-testimonials',
          categoryTitle: 'Client Reviews',
          title: 'Validated by Industry Leaders',
          items: [
            {
              name: 'Marcus Sterling',
              role: 'VP Infrastructure, Zenith Horizon',
              text:
                'Deploying our core banking routing through this architecture cut failover latency by 80%. Exceptional compliance rigor.',
              rating: 5,
              avatar:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            },
            {
              name: 'Elena Rostova',
              role: 'Principal Cloud Architect, FinGlobal AG',
              text:
                'The automated compliance blueprints and Airwallex KYC synergy allowed us to enter 4 new regional markets without rewriting billing logic.',
              rating: 5,
              avatar:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            },
          ],
        },
      },
      {
        type: 'FAQ',
        props: {
          id: 'home-faq',
          categoryTitle: 'Support & Inquiries',
          title: 'Frequently Asked Questions',
          items: [
            {
              q: 'How quickly is cloud infrastructure provisioned after onboarding?',
              a: 'Immediate. All core routing pods, TLS credentials, and telemetry streams are initialized within 15 minutes.',
            },
            {
              q: 'What compliance certifications are supported out of the box?',
              a: 'SOC 2 Type II, ISO 27001, and PCI-DSS Level 1 compliant infrastructure patterns with full data residency.',
            },
          ],
        },
      },
      {
        type: 'Contact',
        props: {
          id: 'home-contact',
          categoryTitle: 'Get In Touch',
          title: 'Connect with our Leadership',
          subtitle:
            'Have a customized requirement or enterprise question? Reach out directly and our advisory team will respond within 12 hours.',
          companyName: 'Vantage Cloud Systems Ltd',
          address:
            'Level 38, Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983',
          email: 'ops@vantagecloud.io',
          phone: '+65 6812 9400',
        },
      },
      {
        type: 'Footer',
        props: {
          id: 'home-footer',
          companyName: 'Vantage Cloud Systems Ltd',
          tagline:
            'Institutional cloud infrastructure and multi-region deployment automation designed for high-growth enterprises.',
          registrationNumber: 'CR-89410294',
          address: 'Level 38, Marina Bay Financial Centre Tower 2, Singapore 018983',
          governingLaw: 'Republic of Singapore',
          platformLinks: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#offerings' },
            { label: 'Reviews', href: '#testimonials' },
            { label: 'FAQ', href: '#faq' },
          ],
          legalLinks: [
            { label: 'Privacy Policy', href: '/policies/privacy' },
            { label: 'Terms of Service', href: '/policies/terms' },
            { label: 'Refund Policy', href: '/policies/refund' },
            { label: 'Shipping Policy', href: '/policies/shipping' },
          ],
        },
      },
    ],
    root: { props: { title: 'Home' } },
  };
};
