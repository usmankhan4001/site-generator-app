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

    default:
      return {};
  }
}
