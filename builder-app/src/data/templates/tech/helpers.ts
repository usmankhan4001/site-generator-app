import { TechTemplate, TechTemplateMetadata, TechCategory, PuckPageData, PuckComponent } from './types';

export interface ServiceTierInput {
  id: string;
  name: string;
  price: number;
  interval: string;
  setupFee?: number;
  commitment?: string;
  turnaround?: string;
  sla?: string;
  description: string;
  features: string[];
  deliverables?: string[];
  idealFor?: string;
  popular?: boolean;
}

export interface TeamMemberInput {
  name: string;
  role: string;
  bio: string;
  credentials?: string;
  avatar: string;
}

export interface MilestoneInput {
  year: string;
  title: string;
  description: string;
}

export interface EngagementStepInput {
  step: string;
  title: string;
  description: string;
  duration: string;
}

export interface TemplateFactoryInput {
  metadata: {
    id: string;
    name: string;
    category: TechCategory;
    categoryLabel: string;
    industry: string;
    description: string;
    tags: string[];
    previewImage: string;
    recommendedTheme: string;
    accentColor: string;
    targetAudience: string;
    corporateRegistration: {
      entityName: string;
      registrationNumber: string;
      jurisdiction: string;
      registeredAddress: string;
      governingLaw: string;
      contactEmail: string;
      contactPhone: string;
      taxId?: string;
    };
  };
  home: {
    hero: {
      badge: string;
      headline: string;
      accentText: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      image: string;
      trustBadges: string[];
    };
    proof: {
      title: string;
      partners: string[];
      metrics: { value: string; label: string }[];
    };
    bento: {
      title: string;
      subtitle: string;
      features: { title: string; description: string; badge: string; image: string }[];
    };
    stats: { value: string; label: string; subtext?: string }[];
    pricing: {
      title: string;
      subtitle: string;
      tiers: ServiceTierInput[];
    };
    testimonials: { quote: string; author: string; role: string; company: string; avatar: string; rating: number }[];
    faq: { q: string; a: string }[];
    cta: {
      headline: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      guarantee: string;
    };
  };
  about: {
    heroHeadline: string;
    heroSubtitle: string;
    mission: string;
    story: string;
    milestones: MilestoneInput[];
    team: TeamMemberInput[];
  };
  services: {
    heroHeadline: string;
    heroSubtitle: string;
    detailedOfferings: ServiceTierInput[];
    process: EngagementStepInput[];
  };
  contact: {
    heroHeadline: string;
    heroSubtitle: string;
    responseTime: string;
    formspreeId: string;
    officeLocations?: { city: string; address: string; role: string }[];
  };
  policies?: {
    customPrivacyClauses?: { heading: string; body: string }[];
    customTermsClauses?: { heading: string; body: string }[];
    customRefundClauses?: { heading: string; body: string }[];
  };
}

export function buildTechTemplate(input: TemplateFactoryInput): TechTemplate {
  const { metadata, home, about, services, contact, policies } = input;
  const reg = metadata.corporateRegistration;

  const headerComponent: PuckComponent = {
    type: 'Header',
    props: {
      brandName: metadata.name,
      logoText: metadata.name.split(' ')[0],
      navItems: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
      ctaText: 'Get Started',
      ctaHref: '/contact',
    },
  };

  const footerComponent: PuckComponent = {
    type: 'Footer',
    props: {
      companyName: metadata.name,
      entityName: reg.entityName,
      registrationNumber: reg.registrationNumber,
      registeredAddress: reg.registeredAddress,
      contactEmail: reg.contactEmail,
      contactPhone: reg.contactPhone,
      governingLaw: reg.governingLaw,
      links: [
        { label: 'Services', href: '/services' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy Policy', href: '/policies/privacy' },
        { label: 'Terms of Service', href: '/policies/terms' },
        { label: 'Refund & SLA Policy', href: '/policies/refund' },
      ],
      copyright: `© ${new Date().getFullYear()} ${reg.entityName}. All rights reserved.`,
    },
  };

  // 1. Home Page ('/')
  const homePage: PuckPageData = {
    title: `${metadata.name} | ${metadata.industry}`,
    root: { title: metadata.name, props: { theme: metadata.recommendedTheme } },
    content: [
      headerComponent,
      {
        type: 'Hero',
        props: {
          badge: home.hero.badge,
          headline: home.hero.headline,
          accentText: home.hero.accentText,
          subtitle: home.hero.subtitle,
          primaryCta: { label: home.hero.primaryCta, href: '/contact' },
          secondaryCta: { label: home.hero.secondaryCta, href: '/services' },
          image: home.hero.image,
          trustBadges: home.hero.trustBadges,
        },
      },
      {
        type: 'Proof',
        props: {
          title: home.proof.title,
          partners: home.proof.partners,
          metrics: home.proof.metrics,
        },
      },
      {
        type: 'Bento',
        props: {
          title: home.bento.title,
          subtitle: home.bento.subtitle,
          features: home.bento.features,
        },
      },
      {
        type: 'Stats',
        props: {
          stats: home.stats,
        },
      },
      {
        type: 'Pricing',
        props: {
          title: home.pricing.title,
          subtitle: home.pricing.subtitle,
          tiers: home.pricing.tiers.map((t) => ({
            ...t,
            currency: 'USD',
            ctaHref: '/contact',
            ctaText: t.popular ? 'Start Production' : 'Deploy Today',
          })),
        },
      },
      {
        type: 'Testimonials',
        props: {
          title: 'Validated by Engineering & Technical Leaders',
          subtitle: 'Proven impact across mission-critical enterprise workloads.',
          testimonials: home.testimonials,
        },
      },
      {
        type: 'FAQ',
        props: {
          title: 'Frequently Asked Questions',
          subtitle: 'Commercial terms, technical compliance, and deployment SLAs.',
          faqs: home.faq,
        },
      },
      {
        type: 'CTA',
        props: {
          headline: home.cta.headline,
          subtitle: home.cta.subtitle,
          primaryCta: { label: home.cta.primaryCta, href: '/contact' },
          secondaryCta: { label: home.cta.secondaryCta, href: '/services' },
          guarantee: home.cta.guarantee,
        },
      },
      footerComponent,
    ],
  };

  // 2. About Page ('/about')
  const aboutPage: PuckPageData = {
    title: `About Us | ${metadata.name}`,
    root: { title: `About | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'AboutHero',
        props: {
          headline: about.heroHeadline,
          subtitle: about.heroSubtitle,
          mission: about.mission,
          story: about.story,
        },
      },
      {
        type: 'CompanyHistory',
        props: {
          title: 'Our Evolution & Technical Milestones',
          subtitle: 'Track record of engineering excellence and institutional delivery.',
          milestones: about.milestones,
        },
      },
      {
        type: 'ExecutiveTeam',
        props: {
          title: 'Principal Leadership & Technical Fellows',
          subtitle: 'Decades of domain expertise spanning tier-1 tech, research labs, and scaleups.',
          members: about.team,
        },
      },
      {
        type: 'CorporateRegistration',
        props: {
          title: 'Corporate Governance & Entity Verification',
          subtitle: 'Full legal standing and regulatory compliance disclosures.',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          registeredAddress: reg.registeredAddress,
          governingLaw: reg.governingLaw,
          taxId: reg.taxId || 'N/A',
          contactEmail: reg.contactEmail,
          contactPhone: reg.contactPhone,
        },
      },
      {
        type: 'CTA',
        props: {
          headline: 'Partner with Our Engineering Principals',
          subtitle: 'Schedule a discovery session to evaluate architecture compatibility and timelines.',
          primaryCta: { label: 'Contact Leadership', href: '/contact' },
          secondaryCta: { label: 'Explore Service Specs', href: '/services' },
          guarantee: 'NDA-backed architecture reviews within 24 business hours.',
        },
      },
      footerComponent,
    ],
  };

  // 3. Services Page ('/services')
  const servicesPage: PuckPageData = {
    title: `Services & Unit Economics | ${metadata.name}`,
    root: { title: `Services | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'ServicesHero',
        props: {
          badge: 'Commercial Offerings & Unit Economics',
          headline: services.heroHeadline,
          subtitle: services.heroSubtitle,
        },
      },
      {
        type: 'CommercialOfferings',
        props: {
          title: 'Enterprise Service Packages & Transparent Pricing',
          subtitle: 'Predictable commercial models with rigorous contractual SLAs.',
          offerings: services.detailedOfferings.map((o) => ({
            ...o,
            currency: 'USD',
            ctaText: 'Engage Now',
            ctaHref: `/contact?tier=${encodeURIComponent(o.name)}`,
          })),
        },
      },
      {
        type: 'EngagementProcess',
        props: {
          title: 'Engagement Lifecycle & Delivery Methodology',
          subtitle: 'From initial technical audit to continuous production support.',
          steps: services.process,
        },
      },
      {
        type: 'CTA',
        props: {
          headline: 'Ready to Formalize Your Statement of Work?',
          subtitle: 'Speak directly with our solutions architects to tailor scope and onboarding.',
          primaryCta: { label: 'Request Proposal', href: '/contact' },
          secondaryCta: { label: 'Review About Details', href: '/about' },
          guarantee: 'Fixed-price and retainer options with guaranteed milestone acceptance criteria.',
        },
      },
      footerComponent,
    ],
  };

  // 4. Contact Page ('/contact')
  const contactPage: PuckPageData = {
    title: `Contact & Commercial Engagement | ${metadata.name}`,
    root: { title: `Contact | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'ContactHero',
        props: {
          headline: contact.heroHeadline,
          subtitle: contact.heroSubtitle,
          responseTime: contact.responseTime,
        },
      },
      {
        type: 'ContactForm',
        props: {
          title: 'Initiate Technical Inquiry',
          subtitle: 'Complete the form below to connect with our designated account director.',
          formspreeEndpoint: `https://formspree.io/f/${contact.formspreeId}`,
          fields: [
            { name: 'fullName', label: 'Full Name', type: 'text', required: true },
            { name: 'workEmail', label: 'Work Email Address', type: 'email', required: true },
            { name: 'companyName', label: 'Company / Organization', type: 'text', required: true },
            { name: 'phone', label: 'Direct Telephone', type: 'tel', required: false },
            {
              name: 'tierInterest',
              label: 'Service Tier of Interest',
              type: 'select',
              options: services.detailedOfferings.map((o) => `${o.name} ($${o.price.toLocaleString()}/${o.interval})`),
              required: true,
            },
            { name: 'projectScope', label: 'Project Scope & Requirements', type: 'textarea', required: true },
          ],
          submitButtonText: 'Submit Inquiry',
        },
      },
      {
        type: 'ContactDetails',
        props: {
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          registeredAddress: reg.registeredAddress,
          contactEmail: reg.contactEmail,
          contactPhone: reg.contactPhone,
          supportHours: 'Monday - Friday: 08:00 - 18:00 (UTC)',
          emergencyOnCall: '24/7/365 P1 Incident Bridge available for active SLA holders.',
          offices: contact.officeLocations || [
            { city: 'Primary Headquarters', address: reg.registeredAddress, role: 'Corporate & Legal' },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 5. Policies: Privacy ('/policies/privacy')
  const privacyPage: PuckPageData = {
    title: `Privacy Policy | ${metadata.name}`,
    root: { title: `Privacy Policy | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Corporate Privacy Policy',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customPrivacyClauses || [
            {
              heading: '1. Regulatory Compliance & Data Controller',
              body: `${reg.entityName} (Registration No. ${reg.registrationNumber}), registered at ${reg.registeredAddress}, acts as Data Controller under GDPR, CCPA, and applicable data protection regulations. We process customer telemetric, administrative, and transaction data strictly in accordance with statutory privacy principles.`,
            },
            {
              heading: '2. Information We Collect',
              body: `We collect information necessary for technical contract execution, service delivery, billing reconciliation, and security telemetry. This includes administrative contact names, corporate email addresses, IP addresses, access audit logs, and authorized payment credentials handled via certified PCI-DSS Level 1 compliant processors.`,
            },
            {
              heading: '3. Data Security & Storage Architecture',
              body: 'Customer data is encrypted in transit using TLS 1.3 with AES-256-GCM cipher suites and at rest using HSM-managed cryptographic keys. Production databases adhere to strict zero-trust boundary segmentation with role-based access control (RBAC).',
            },
            {
              heading: '4. Third-Party Disclosures & International Transfers',
              body: 'We do not sell, rent, or trade customer data. Sub-processors (such as cloud hosting providers, transactional communication gateways, and banking orchestration partners) are bound by rigorous Data Processing Agreements (DPAs) incorporating standard contractual clauses.',
            },
            {
              heading: '5. Rights of Data Subjects',
              body: `Data subjects may request data access, rectification, erasure, or portability by submitting a formal request to our Data Protection Officer at ${reg.contactEmail}. Inquiries are addressed within 30 statutory business days.`,
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 6. Policies: Terms ('/policies/terms')
  const termsPage: PuckPageData = {
    title: `Terms of Service | ${metadata.name}`,
    root: { title: `Terms of Service | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Master Commercial Terms of Service',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customTermsClauses || [
            {
              heading: '1. Legal Entity & Binding Agreement',
              body: `These Terms of Service constitute a legally enforceable master agreement between ${reg.entityName} ("Company") and the client organization ("Customer"). Accessing, subscribing to, or contracting for any Company software or engineering services affirms unconditional acceptance.`,
            },
            {
              heading: '2. Service Level Commitments & Scope',
              body: 'Company provides services in accordance with the specific Statement of Work (SOW) or active subscription tier. Service level objectives (e.g. 99.9% - 99.99% availability) apply exclusively as defined in the commercial schedule. Scheduled maintenance windows require a minimum 72-hour prior written notice.',
            },
            {
              heading: '3. Payment Terms, Retainers & Taxes',
              body: 'Invoices are issued according to agreed billing cycles (monthly, quarterly, or milestone-based) and are due upon receipt or within net-15 days. Fees are non-inclusive of applicable value-added, sales, or withholding taxes, which shall be remitted by Customer.',
            },
            {
              heading: '4. Intellectual Property & Customer Retained Rights',
              body: 'Customer retains exclusive ownership over Customer Data, proprietary schemas, and confidential trade assets. Company retains title to underlying frameworks, pre-existing algorithmic libraries, reusable tools, and generic infrastructure templates developed prior to or independently of this engagement.',
            },
            {
              heading: '5. Limitation of Liability & Governing Law',
              body: `Neither party shall be liable for indirect, punitive, or consequential damages. Total aggregate liability for direct claims is strictly capped at total amounts paid by Customer to Company during the preceding 6-month period. This Agreement is governed by the substantive laws of ${reg.governingLaw}.`,
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 7. Policies: Refund ('/policies/refund')
  const refundPage: PuckPageData = {
    title: `Refund & Cancellation Policy | ${metadata.name}`,
    root: { title: `Refund Policy | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Commercial Refund & SLA Credit Policy',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customRefundClauses || [
            {
              heading: '1. Subscription Cancellations',
              body: 'Monthly recurring software subscriptions may be canceled by providing 14 calendar days written notice prior to the subsequent billing cycle. Ongoing advisory or engineering retainers require 30 calendar days notice to allow for controlled resource offboarding.',
            },
            {
              heading: '2. Milestone Deliverable Acceptance',
              body: 'For fixed-price contracts and milestone-based engagements, deliverables are subject to a standard 10-business-day client review period. Milestones accepted in writing are deemed final and non-refundable.',
            },
            {
              heading: '3. Service Level Agreement (SLA) Failure Credits',
              body: 'If Company fails to meet contractual uptime or incident response thresholds during any calendar month, Customer is entitled to financial SLA credits ranging from 10% to 50% of the monthly fee, applied directly to the subsequent billing invoice.',
            },
            {
              heading: '4. Dispute Escalation & Claims Protocol',
              body: `Billing disputes must be raised within 30 calendar days of invoice dispatch by emailing ${reg.contactEmail}. Parties commit to good-faith mediation before initiating formal arbitration.`,
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  return {
    ...metadata,
    pages: {
      '/': homePage,
      '/about': aboutPage,
      '/services': servicesPage,
      '/contact': contactPage,
      '/policies/privacy': privacyPage,
      '/policies/terms': termsPage,
      '/policies/refund': refundPage,
    },
  };
}
