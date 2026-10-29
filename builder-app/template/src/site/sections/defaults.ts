/**
 * Site Kit — default section props.
 *
 * Rich, high-converting default props so freshly-added sections and newly composed
 * sites are always fully populated with real text, metrics, tiers, and features.
 */

import type { SectionType } from '@/site/schema';

export function defaultPropsFor(type: SectionType): Record<string, unknown> {
  switch (type) {
    case 'hero':
      return {
        badge: 'Industry Leader',
        headline: 'Engineered for Performance & Scale',
        accentText: 'Built for Modern Teams',
        subtitle: 'Deliver world-class experiences with end-to-end reliability, lightning-fast execution, and seamless workflow integration.',
        primaryCta: { label: 'Get Started Now', href: '/contact' },
        secondaryCta: { label: 'View Capabilities', href: '/about' },
        bulletPoints: ['Zero configuration required', '99.99% Guaranteed uptime', '24/7 Dedicated expert support'],
        trustBadges: ['SOC2 Certified', 'GDPR Compliant', 'Enterprise Ready'],
      };

    case 'statsBar':
      return {
        items: [
          { value: '99.99%', label: 'Uptime Guarantee', subtext: 'Enterprise SLA' },
          { value: '< 20ms', label: 'Global Latency', subtext: 'Edge delivery network' },
          { value: '10M+', label: 'Daily Requests', subtext: 'Processed securely' },
          { value: '24/7', label: 'Expert Support', subtext: 'Live chat & phone' },
        ],
      };

    case 'trustBar':
      return {
        variant: 'pills',
        title: 'Trusted by innovative market leaders globally',
        items: ['Acme Global', 'Stripe Capital', 'Vercel Labs', 'Linear Tech', 'Nexus Dynamics'],
      };

    case 'featureGrid':
      return {
        eyebrow: 'Capabilities',
        title: 'Engineered for Scale, Speed & Security',
        description: 'Everything you need to streamline operations, accelerate growth, and deliver flawless customer experiences.',
        items: [
          {
            title: 'High-Performance Engine',
            description: 'Sub-millisecond processing pipeline built on modern cloud architecture for maximum throughput.',
            badge: 'Speed',
            tag: 'Infrastructure',
            icon: 'Zap',
          },
          {
            title: 'Enterprise Security Guardrails',
            description: 'End-to-end automated encryption, role-based access control, and strict compliance monitoring.',
            badge: 'Security',
            tag: 'Compliance',
            icon: 'ShieldCheck',
          },
          {
            title: 'Automated Real-Time Sync',
            description: 'Instant event orchestration across your existing tools and custom APIs with zero manual friction.',
            badge: 'Automation',
            tag: 'Workflow',
            icon: 'Cpu',
          },
        ],
      };

    case 'pricingTiers':
      return {
        eyebrow: 'Flexible Plans',
        title: 'Simple, Transparent Pricing',
        description: 'Choose the plan that fits your business stage. No hidden fees or lock-in contracts.',
        currency: 'USD',
        discountBadge: 'Save 20% on Annual',
        footnote: 'All plans include 14-day risk-free trial and priority onboarding.',
        tiers: [
          {
            id: 'starter',
            name: 'Starter Tier',
            price: 49,
            priceUnit: '/mo',
            description: 'Ideal for emerging teams and growing projects needing essential tools.',
            features: ['Up to 5 team members', 'Core API access & webhooks', 'Standard analytics dashboard', 'Email & community support'],
          },
          {
            id: 'growth',
            name: 'Growth Pro',
            price: 149,
            priceUnit: '/mo',
            popular: true,
            badge: 'Most Popular',
            description: 'Engineered for scaling businesses that demand advanced automation & speed.',
            features: ['Unlimited team members', 'Full automation suite', 'Real-time custom reporting', 'Dedicated account manager', '24/7 Priority support SLA'],
          },
          {
            id: 'enterprise',
            name: 'Enterprise Custom',
            price: 399,
            priceUnit: '/mo',
            badge: 'Dedicated',
            description: 'For mission-critical operations requiring custom integrations & SLAs.',
            features: ['Custom infrastructure deployment', 'Unlimited throughput & storage', 'Dedicated solutions architect', '99.99% Uptime guarantee SLA', 'Custom contractual compliance'],
          },
        ],
      };

    case 'productGrid':
      return {
        eyebrow: 'Curated Catalog',
        title: 'Featured Offerings',
        description: 'Discover precision-engineered solutions crafted to the highest quality standards.',
        currency: 'USD',
        layout: 'products',
        items: [
          {
            id: 'prod-1',
            name: 'Flagship Edition Pro',
            price: 299,
            description: 'Our signature premium solution with full performance optimization and custom finishing.',
            category: 'Flagship',
            popular: true,
            badge: 'Best Seller',
            features: ['Precision craftsmanship', 'Lifetime warranty', 'Immediate global dispatch'],
          },
          {
            id: 'prod-2',
            name: 'Essential Performance Kit',
            price: 149,
            description: 'Streamlined essentials engineered for everyday reliability and seamless execution.',
            category: 'Essentials',
            features: ['High durability materials', 'Standard warranty', 'Same-day dispatch'],
          },
          {
            id: 'prod-3',
            name: 'Architectural Companion',
            price: 199,
            description: 'Advanced companion toolkit designed to expand capabilities and workflow versatility.',
            category: 'Accessories',
            features: ['Modular compatibility', 'Full documentation', '2-year warranty'],
          },
        ],
      };

    case 'testimonials':
      return {
        eyebrow: 'Customer Success',
        title: 'Loved by Founders & Industry Teams',
        description: 'See how leading organizations achieve measurable results using our platform every day.',
        items: [
          {
            text: 'Transitioning to this platform cut our deployment cycles by 70%. The reliability and attention to detail are simply unrivaled in the industry.',
            name: 'Elena Rostova',
            role: 'VP of Technology',
            company: 'Nexus Dynamics',
            metricLabel: '+70% Velocity',
          },
          {
            text: 'The onboarding was flawless and our team was productive within hours. The customer support and compliance assurances gave our enterprise clients total peace of mind.',
            name: 'Marcus Vance',
            role: 'Managing Director',
            company: 'Vanguard Capital',
            metricLabel: '100% SLA',
          },
          {
            text: 'Outstanding build quality and intuitive workflow design. It solved our compliance and performance bottlenecks in a single afternoon.',
            name: 'Sarah Chen',
            role: 'Head of Operations',
            company: 'Apex Cloud',
            metricLabel: '4.9/5 Rating',
          },
        ],
      };

    case 'faq':
      return {
        eyebrow: 'Got Questions?',
        title: 'Frequently Asked Questions',
        description: 'Everything you need to know about our service, onboarding process, and guarantees.',
        items: [
          {
            q: 'How quickly can our team get started?',
            a: 'Onboarding is instantaneous. You can configure your account, import your data, and launch your workflows within minutes of signing up.',
          },
          {
            q: 'What level of support is included in each plan?',
            a: 'All plans include comprehensive documentation and email support. Growth and Enterprise plans include dedicated account managers and 24/7 live priority channels.',
          },
          {
            q: 'Are custom enterprise contracts and billing terms available?',
            a: 'Yes, we provide flexible annual invoicing, custom payment terms via Airwallex and bank transfer, and custom SLA agreements for enterprise accounts.',
          },
          {
            q: 'How is data privacy and compliance handled?',
            a: 'We strictly adhere to GDPR, SOC2, and international data residency standards. All data is encrypted both in transit and at rest.',
          },
        ],
      };

    case 'ctaBanner':
      return {
        headline: 'Ready to Transform Your Workflow?',
        subtitle: 'Join over 10,000+ businesses delivering high-performance results. Start your 14-day trial today.',
        primaryCta: { label: 'Get Started Now', href: '/contact' },
        secondaryCta: { label: 'Talk to Sales', href: '/contact' },
        guarantee: 'No credit card required • 14-day free trial • Cancel anytime',
      };

    case 'pageHeader':
      return {
        eyebrow: 'Overview',
        headline: 'About Our Mission & Values',
        subtitle: 'Dedicated to delivering precision, speed, and uncompromising excellence across every engagement.',
      };

    case 'prose':
      return {
        eyebrow: 'Our Heritage',
        title: 'Built with Precision & Purpose',
        description: 'Founded with a clear vision: to empower modern teams with robust, high-performance infrastructure.',
        blocks: [
          {
            heading: 'Uncompromising Standards',
            body: 'We believe that great software and services are born from obsessive attention to detail, rigorous engineering principles, and a relentless focus on customer success.',
          },
          {
            heading: 'Global Scale with Local Focus',
            body: 'Operating across international jurisdictions, we combine global infrastructure reach with localized compliance, support, and payment execution.',
          },
        ],
        highlights: ['Over 10M+ operations handled', 'Certified compliance across US, UK & EU', 'Independent 99.99% uptime audit'],
      };

    case 'timeline':
      return {
        eyebrow: 'Our Journey',
        title: 'Key Milestones',
        description: 'A track record of continuous innovation, expansion, and customer delivery.',
        milestones: [
          { year: '2022', title: 'Foundation & Core Architecture', description: 'Engineered the high-performance distributed engine and launched initial beta.' },
          { year: '2023', title: 'Global Enterprise Expansion', description: 'Expanded compliance certifications across North America, Europe, and Asia-Pacific.' },
          { year: '2024', title: 'Next-Gen Platform Release', description: 'Introduced automated AI orchestration and real-time synchronization pipelines.' },
        ],
      };

    case 'teamGrid':
      return {
        eyebrow: 'Leadership',
        title: 'Meet Our Executive Team',
        description: 'Industry veterans bringing decades of engineering, operations, and financial expertise.',
        members: [
          { name: 'Alexander Wright', role: 'Chief Executive Officer', bio: 'Former infrastructure lead with 15+ years scaling global distributed systems.' },
          { name: 'Dr. Sophia Lin', role: 'Head of Product & AI', bio: 'AI researcher and architect specializing in intelligent real-time data orchestration.' },
          { name: 'David Mercer', role: 'VP of Customer Success', bio: 'Dedicated to ensuring seamless enterprise onboarding and 24/7 operational reliability.' },
        ],
      };

    case 'valueGrid':
      return {
        eyebrow: 'Core Principles',
        title: 'What Guides Every Decision We Make',
        description: 'The foundational tenets that drive our product roadmap, engineering, and partnerships.',
        items: [
          { title: 'Customer Obsession', description: 'Every feature and capability begins by listening deeply to customer challenges and goals.' },
          { title: 'Speed & Rigor', description: 'We move fast while maintaining uncompromising security, code quality, and testing standards.' },
          { title: 'Transparency & Trust', description: 'Clear contracts, transparent pricing, and direct communication in every interaction.' },
        ],
      };

    case 'processSteps':
      return {
        eyebrow: 'Process',
        title: 'How We Deliver Seamless Results',
        description: 'A structured 4-step framework from initial consultation to continuous optimization.',
        steps: [
          { step: '01', title: 'Discovery & Assessment', description: 'We analyze your requirements, workflows, and compliance parameters.' },
          { step: '02', title: 'Architecture & Setup', description: 'We configure and tailor your bespoke environment with zero downtime.' },
          { step: '03', title: 'Deployment & Launch', description: 'Seamless cutover with real-time verification and end-to-end testing.' },
          { step: '04', title: 'Continuous Optimization', description: 'Ongoing 24/7 monitoring, telemetry analysis, and performance enhancements.' },
        ],
      };

    case 'slaTable':
      return {
        eyebrow: 'Commitments',
        title: 'Service Level Guarantees',
        description: 'Contractually backed uptime, response times, and resolution guarantees.',
        rows: [
          { metric: 'Platform Uptime', commitment: '99.99%', description: 'Measured monthly across all public and private endpoints.' },
          { metric: 'Critical Incident Response', commitment: '< 15 Minutes', description: '24/7/365 direct access to senior infrastructure engineers.' },
          { metric: 'Daily Automated Backup', commitment: 'Continuous', description: 'Multi-region snapshot redundancy with point-in-time recovery.' },
        ],
      };

    case 'locationList':
      return {
        eyebrow: 'Global Presence',
        title: 'Offices & Data Center Regions',
        description: 'Direct local presence in key financial and technology hubs worldwide.',
        locations: ['San Francisco, CA (HQ)', 'London, United Kingdom', 'Singapore, Financial District', 'Frankfurt, Germany'],
      };

    case 'corporateRegistration':
      return {
        title: 'Corporate Registration & Legal Governance',
        description: 'Statutory compliance details, corporate registration, and governing law transparency.',
      };

    case 'contactPanel':
      return {
        title: 'Get in Touch with Our Team',
        subtitle: 'We typically respond to inquiries in under 2 hours during business hours.',
        submitLabel: 'Send Message',
        showDetails: true,
      };

    case 'policyDocument':
      return {
        title: 'Policy Document',
        lastUpdated: new Date().toISOString().slice(0, 10),
        sections: [
          {
            heading: '1. Overview & Scope',
            body: 'This document sets forth the operational terms, governing law, and compliance standards applicable to all services provided.',
          },
          {
            heading: '2. Data Handling & Security',
            body: 'We implement industry-standard encryption protocols and administrative safeguards to protect your personal and commercial data.',
          },
        ],
      };

    case 'bentoGrid':
      return {
        eyebrow: 'Platform Architecture',
        title: 'Engineered for High-Velocity Modern Scale',
        description: 'Unify payments, treasury, and cards into one resilient operational stack with unmatched clarity.',
        variant: 'modern',
        items: [
          {
            id: 'spotlight-1',
            title: 'Global Multi-Currency Core Engine',
            description: 'Hold, exchange, and settle in 50+ currencies with real-time interbank FX rates, automated hedging, and direct access to local RTGS and ACH clearing rails in 110+ jurisdictions.',
            badge: 'Enterprise Core',
            tag: 'Infrastructure',
            icon: 'Globe',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            metric: '$45B+',
            metricLabel: 'Annual Processing Volume',
            ctaLabel: 'Explore Global Accounts',
            ctaHref: '/capabilities',
            size: 'large',
          },
          {
            id: 'feature-1',
            title: 'Instant Virtual & Physical Card Issuance',
            description: 'Issue multi-currency corporate debit cards in seconds with custom spending rules, approval chains, and direct Apple & Google Pay provisioning.',
            badge: 'Smart Cards',
            tag: 'Spend Control',
            icon: 'CreditCard',
            size: 'medium',
          },
          {
            id: 'feature-2',
            title: 'Autonomous Compliance & Risk Screening',
            description: 'Automated AML, PEP checks, and sanction screening integrated into every transaction pipeline with sub-second decisioning.',
            badge: 'SOC2 Type II',
            tag: 'Security',
            icon: 'ShieldCheck',
            size: 'medium',
          },
          {
            id: 'badge-1',
            title: 'Mission Critical SLA',
            description: 'Round-the-clock enterprise infrastructure guaranteed with automated multi-region failover.',
            metric: '99.999%',
            metricLabel: 'Uptime Reliability',
            icon: 'Activity',
            size: 'badge',
          },
          {
            id: 'badge-2',
            title: 'Ultra-Low Latency',
            description: 'Sub-second domestic clearing and direct payment gateway orchestration.',
            metric: '< 150ms',
            metricLabel: 'Settlement Speed',
            icon: 'Zap',
            size: 'badge',
          },
        ],
      };

    case 'comparisonMatrix':
      return {
        eyebrow: 'Why Choose Us',
        title: 'Engineered Beyond Traditional Gateways',
        description: 'See how our unified architecture compares against legacy banking infrastructure and standard merchant processors.',
        competitors: [
          {
            id: 'our-product',
            name: 'Our Platform',
            isOurProduct: true,
            badge: 'Recommended Choice',
            cta: { label: 'Get Started Today', href: '/checkout' },
          },
          {
            id: 'legacy-banks',
            name: 'Traditional Banks',
            isOurProduct: false,
          },
          {
            id: 'standard-processors',
            name: 'Legacy Processors',
            isOurProduct: false,
          },
        ],
        categories: [
          {
            name: 'Core Processing & Pricing',
            rows: [
              {
                feature: 'Blended Card Processing Fee',
                tooltip: 'Actual average processing rate across domestic debit & credit cards.',
                values: { 'our-product': '1.2% + 10¢', 'legacy-banks': '3.2% + 40¢', 'standard-processors': '2.9% + 30¢' },
              },
              {
                feature: 'Zero Hidden Account Fees',
                tooltip: 'No monthly account keeping or statement maintenance fees.',
                values: { 'our-product': true, 'legacy-banks': false, 'standard-processors': false },
              },
              {
                feature: 'Instant Same-Day Payouts (T+0)',
                tooltip: 'Direct settlement to your operating cash account without weekend holds.',
                values: { 'our-product': true, 'legacy-banks': false, 'standard-processors': false },
              },
            ],
          },
          {
            name: 'Global Treasury & FX',
            rows: [
              {
                feature: 'Multi-Currency Local Accounts (50+)',
                tooltip: 'Named bank details in USD, EUR, GBP, AUD, JPY, and SGD without foreign entities.',
                values: { 'our-product': true, 'legacy-banks': false, 'standard-processors': false },
              },
              {
                feature: 'Interbank FX Spreads from 0.2%',
                tooltip: 'Wholesale interbank foreign exchange rates with transparent margin.',
                values: { 'our-product': true, 'legacy-banks': false, 'standard-processors': false },
              },
              {
                feature: 'Autonomous Hedging & Rate Locks',
                tooltip: 'Lock in currency rates up to 12 months with flexible drawdowns.',
                values: { 'our-product': true, 'legacy-banks': false, 'standard-processors': false },
              },
            ],
          },
          {
            name: 'Security & Developer Experience',
            rows: [
              {
                feature: 'Restful API & Webhooks (<100ms)',
                tooltip: 'Production-ready REST and GraphQL endpoints with 99.999% SLA.',
                values: { 'our-product': true, 'legacy-banks': false, 'standard-processors': true },
              },
              {
                feature: 'Unlimited Virtual Corporate Cards',
                tooltip: 'Issue cards programmatically with merchant locks and budget limits.',
                values: { 'our-product': true, 'legacy-banks': false, 'standard-processors': false },
              },
              {
                feature: 'Dedicated Tier-1 Solutions Engineer',
                tooltip: 'Direct Slack / Teams access to dedicated infrastructure architects.',
                values: { 'our-product': true, 'legacy-banks': false, 'standard-processors': false },
              },
            ],
          },
        ],
        footnote: 'Based on published enterprise tier documentation and publicly available benchmark reports.',
      };

    case 'logoMarquee':
      return {
        eyebrow: 'Global Trust',
        title: 'Powering Tier-1 Global Operators & Innovators',
        speed: 'normal',
        direction: 'left',
        pauseOnHover: true,
        variant: 'cards',
        items: [
          { name: 'Acme Global Holdings', subtext: 'Global Treasury', badge: 'Enterprise' },
          { name: 'HyperScale Cloud', subtext: 'Infrastructure', badge: 'Scale' },
          { name: 'Vanguard Dynamics', subtext: 'Fintech Core', badge: 'Tier 1' },
          { name: 'OmniCommerce Labs', subtext: 'Cross-Border DTC', badge: 'Verified' },
          { name: 'Kinetics Global', subtext: 'Payments Routing', badge: 'Fast Track' },
          { name: 'Apex Logistics Corp', subtext: 'Fleet Treasury', badge: 'High Volume' },
          { name: 'Vertex Systems', subtext: 'B2B SaaS', badge: 'Enterprise' },
        ],
      };

    case 'roiCalculator':
      return {
        eyebrow: 'Savings Estimator',
        title: 'Calculate Your Annual Fee Savings',
        description: 'Slide your monthly transaction volume to see the dramatic savings our automated interchange-plus routing delivers compared to flat 2.9% + 30¢ processors.',
        minVolume: 10000,
        maxVolume: 1000000,
        step: 10000,
        defaultVolume: 150000,
        currency: '$',
        traditionalFeePercent: 2.9,
        traditionalFixedFee: 0.30,
        ourFeePercent: 1.2,
        ourFixedFee: 0.10,
        primaryCta: { label: 'Start Saving Now', href: '/contact' },
        secondaryCta: { label: 'Schedule Pricing Review', href: '/about' },
        metricHighlights: [
          { label: 'Average Savings', value: '58%', subtext: 'Lower processing overhead' },
          { label: 'Zero Hidden Fees', value: '$0', subtext: 'No monthly account keeping fees' },
          { label: 'Payout Speed', value: 'T+0', subtext: 'Instant treasury settlement' },
        ],
        disclaimer: 'Estimates based on blended interchange-plus rates vs standard 2.9% + 30¢ flat card processing.',
      };

    case 'videoShowcase':
      return {
        eyebrow: 'Product Tour',
        title: 'See the Platform in Action',
        description: 'Experience how our modern financial operations suite automates accounts payable, treasury management, and corporate spend in a 2-minute overview.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoType: 'youtube',
        posterImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
        badge: '2-Minute Walkthrough',
        duration: '2:15',
        accentGlow: true,
        autoplayInModal: true,
        featurePills: ['Automated Ledger', 'Live FX Converter', 'Virtual Card Creation', 'Custom Approvals'],
        cta: { label: 'Request Full Demo', href: '/contact' },
      };

    case 'leadMagnet':
      return {
        eyebrow: 'Executive Report',
        title: 'The 2026 Global Treasury & Cross-Border Optimization Guide',
        description: 'A definitive 42-page blueprint for CFOs and finance leaders navigating FX volatility, interchange fees, and multi-entity regulatory frameworks.',
        badge: 'Free 42-Page PDF',
        guideTitle: 'The 2026 Global Treasury & Cross-Border Optimization Guide',
        guideSubtitle: 'Strategies for minimizing transaction drag, streamlining multi-currency cash pools, and automating compliance.',
        coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        bulletPoints: [
          'Actionable blueprints to cut FX spreads from 3.0% to 0.4%',
          'Multi-entity banking structure design for UK, US, EU, and APAC',
          'Automated reconciliation checklists compatible with NetSuite & Xero',
          'Corporate card spend controls that prevent budget overruns',
        ],
        buttonLabel: 'Download Instant PDF',
        successMessage: 'Success! Your guide has been sent to your inbox. Check your email for instant access.',
        privacyNotice: 'Zero spam guarantee. Unsubscribe at any time with a single click.',
        socialProofText: 'Downloaded by 4,200+ finance directors & CFOs worldwide.',
      };

    case 'caseStudyCarousel':
      return {
        eyebrow: 'Customer Success',
        title: 'Proven Results at Enterprise Scale',
        description: 'Discover how category-leading companies transform their international finance operations with our platform.',
        autoPlayInterval: 6000,
        items: [
          {
            company: 'OmniTrade Global',
            logo: 'OmniTrade',
            heroMetric: '+380%',
            heroMetricLabel: 'Annual MRR Growth',
            quote: 'Switching to this unified platform allowed us to expand into 14 countries in 60 days. Our cross-border transaction fees dropped by 64%, and automated reconciliation saved our finance team 30 hours per week.',
            authorName: 'Elena Rostova',
            authorRole: 'Chief Financial Officer',
            authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
            tags: ['E-Commerce', 'Treasury', '14 Countries'],
            href: '/case-studies/omnitrade',
          },
          {
            company: 'NovaLogix Systems',
            logo: 'NovaLogix',
            heroMetric: '< 15min',
            heroMetricLabel: 'Daily Close Time',
            quote: 'We replaced four fragmented payment vendors and two legacy bank portals. Our finance team now operates in real time with absolute confidence in every international transfer.',
            authorName: 'Marcus Vance',
            authorRole: 'VP of Finance & Operations',
            authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
            tags: ['SaaS', 'Multi-Currency', 'Automated Ledgers'],
            href: '/case-studies/novalogix',
          },
          {
            company: 'Aether Capital Partners',
            logo: 'Aether Capital',
            heroMetric: '$1.4M',
            heroMetricLabel: 'Annual FX Overhead Saved',
            quote: 'The interbank FX spreads and local clearing routes saved our portfolio companies seven figures in the first nine months alone.',
            authorName: 'Sophia Chen',
            authorRole: 'Managing Director',
            authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
            tags: ['Venture & PE', 'Global Cash Pools', 'Zero Slippage'],
            href: '/case-studies/aether-capital',
          },
        ],
      };

    case 'socialProofToast':
      return {
        position: 'bottom-left',
        cycleIntervalSeconds: 5,
        dismissible: true,
        notifications: [
          {
            title: 'Enterprise Merchant Verified',
            description: 'Aura Logistics (London, UK) activated Global Treasury Account.',
            timestamp: '2 minutes ago',
            verifiedBadge: true,
            icon: 'ShieldCheck',
          },
          {
            title: 'Transaction Processed',
            description: '€48,500 settled via SEPA Instant rail with 0.1% interchange.',
            timestamp: '4 minutes ago',
            verifiedBadge: true,
            icon: 'Zap',
          },
          {
            title: 'New Card Issued',
            description: 'Apex Studios provisioned 15 corporate debit cards with spend limits.',
            timestamp: '7 minutes ago',
            verifiedBadge: true,
            icon: 'CreditCard',
          },
        ],
      };

    case 'interactiveTabShowcase':
      return {
        eyebrow: 'Interactive Tour',
        title: 'Engineered for Complete Financial Control',
        description: 'Explore each core capability designed to streamline multi-currency workflows from collection to reconciliation.',
        variant: 'pills',
        tabs: [
          {
            id: 'global-accounts',
            label: 'Global Accounts',
            icon: 'Globe',
            badge: '50+ Currencies',
            headline: 'Collect and Hold Funds Like a Local Entity',
            description: 'Open domestic account details in USD, EUR, GBP, AUD, JPY, and SGD without setting up local foreign subsidiaries. Settle transactions through local clearing networks with zero incoming wire fees.',
            bulletPoints: [
              'Named local bank account details (routing, sort code, IBAN)',
              'Instant conversion between major and emerging currency pairs',
              'Direct integration with high-speed RTGS and automated clearing houses',
            ],
            metrics: [
              { label: 'Supported Currencies', value: '50+' },
              { label: 'Local Clearing Rails', value: '110+' },
            ],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Open Global Account', href: '/checkout' },
          },
          {
            id: 'corporate-cards',
            label: 'Corporate Cards',
            icon: 'CreditCard',
            badge: 'Zero FX Fees',
            headline: 'Automated Corporate Spend with Real-Time Guardrails',
            description: 'Issue unlimited physical and virtual payment cards for your entire team. Set granular spending limits, merchant category restrictions, and auto-freeze rules directly from the dashboard.',
            bulletPoints: [
              'Unlimited virtual cards generated in seconds via dashboard or API',
              'Auto-match card receipts with ERP expense categories',
              'Real-time transaction alerts delivered straight to Slack and mobile',
            ],
            metrics: [
              { label: 'Card Creation Time', value: '< 2s' },
              { label: 'FX Markup', value: '0%' },
            ],
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'Explore Card Program', href: '/checkout' },
          },
          {
            id: 'fx-risk',
            label: 'FX & Hedging',
            icon: 'TrendingUp',
            badge: 'Real-Time Spreads',
            headline: 'Interbank FX Rates with Automated Hedging Tools',
            description: 'Lock in competitive forward contracts and automate spot exchange executions when rates meet your target thresholds. Protect your operating margins against sudden currency fluctuations.',
            bulletPoints: [
              'Direct access to wholesale interbank liquidity pools',
              'Lock in rates for up to 12 months with flexible drawdown forwards',
              'Automated trigger orders based on pre-set FX thresholds',
            ],
            metrics: [
              { label: 'Typical Spread', value: '0.2%' },
              { label: 'Forward Lock Window', value: '12 Mo' },
            ],
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
            cta: { label: 'View FX Rates', href: '/contact' },
          },
        ],
      };

    case 'stepWizardProcess':
      return {
        eyebrow: 'Fast Onboarding',
        title: 'Up and Running in 3 Seamless Steps',
        description: 'From initial registration to live cross-border payouts in under 24 hours with zero technical roadblocks.',
        layout: 'horizontal',
        showProgressLine: true,
        steps: [
          {
            stepNumber: 1,
            title: 'Verify Your Organization',
            description: 'Submit basic business entity documentation through our secure encrypted digital portal. Instant compliance verification in under 15 minutes.',
            badge: '15 Minutes',
            icon: 'Building2',
            timeEstimate: '15 min',
          },
          {
            stepNumber: 2,
            title: 'Generate Local Account Details',
            description: 'Spin up unique domestic account numbers in USD, EUR, GBP, AUD, and SGD immediately. Connect to your existing accounting system.',
            badge: 'Instant',
            icon: 'WalletCards',
            timeEstimate: 'Instant',
          },
          {
            stepNumber: 3,
            title: 'Execute & Automate Payouts',
            description: 'Begin sending, receiving, and settling funds globally via local clearing rails with real-time tracking and automated ledger sync.',
            badge: 'Live',
            icon: 'Rocket',
            timeEstimate: 'Same Day',
          },
        ],
        cta: { label: 'Start Free Onboarding', href: '/contact' },
      };

    case 'deviceMockupHero':
      return {
        eyebrow: 'Next-Gen Financial Console',
        title: 'The Single Command Center for Modern Global Commerce',
        description: 'Monitor multi-currency cash flows, approve corporate expenditures, and execute high-speed settlements with unmatched speed and enterprise security.',
        deviceType: 'both',
        screenshotUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
        mobileScreenshotUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        tiltAngle: 'subtle',
        badge: 'v4.2 Cloud Release',
        primaryCta: { label: 'Launch Console', href: '/checkout' },
        secondaryCta: { label: 'Book Live Demo', href: '/contact' },
        trustLogos: ['Acme Global', 'Stripe Capital', 'Vercel Labs', 'Linear Tech'],
        floatingMetrics: [
          { label: 'Settlement Speed', value: '99.98% Same Day', position: 'left' },
          { label: 'Monthly Volume', value: '$84.2M+', position: 'right' },
        ],
      };

    case 'announcementBar':
      return {
        message: '🚀 New: Automated multi-currency payout routing now live with 0% FX markup for early adopters.',
        badge: 'Update',
        ctaLabel: 'Learn More',
        ctaHref: '/capabilities',
        dismissible: true,
        variant: 'glow',
        sticky: true,
      };

    default:
      return {};
  }
}
