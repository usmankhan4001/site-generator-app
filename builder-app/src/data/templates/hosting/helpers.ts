import { PuckComponent, PuckPageData } from '../tech/types';
import { HostingTemplate, HostingTemplateMetadata, ServerPlanItem } from './types';

export interface HostingBentoItem {
  title: string;
  description: string;
  badge: string;
  image: string;
}

export interface HostingTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface HostingFaq {
  q: string;
  a: string;
}

export interface HostingFactoryInput {
  metadata: HostingTemplateMetadata;
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
    networkBar: {
      metrics: { value: string; label: string }[];
      carriers: string[];
    };
    bento: {
      title: string;
      subtitle: string;
      items: HostingBentoItem[];
    };
    featuredPlans: ServerPlanItem[];
    datacenterLocations?: string[];
    testimonials: HostingTestimonial[];
    faq: HostingFaq[];
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
    architectureStory: string;
    infrastructurePhilosophy: string;
    slaDetails: { metric: string; commitment: string; description: string }[];
    facilities: { name: string; tier: string; power: string; location: string }[];
  };
  catalog: {
    heroHeadline: string;
    heroSubtitle: string;
    plans: ServerPlanItem[];
    categories?: string[];
  };
  contact: {
    heroHeadline: string;
    heroSubtitle: string;
    nocResponseTime: string;
    datacenters?: { city: string; facility: string; address: string }[];
  };
  policies?: {
    customPrivacy?: { heading: string; body: string }[];
    customTerms?: { heading: string; body: string }[];
    customRefund?: { heading: string; body: string }[];
  };
}

export function buildHostingTemplate(input: HostingFactoryInput): HostingTemplate {
  const { metadata, home, about, catalog, contact, policies } = input;
  const reg = metadata.corporateRegistration;

  const headerComponent: PuckComponent = {
    type: 'Header',
    props: {
      brandName: metadata.name,
      logoText: metadata.name.split(' ')[0],
      navItems: [
        { label: 'Infrastructure', href: '/' },
        { label: 'Server Catalog', href: '/catalog' },
        { label: 'Network & SLA', href: '/about' },
        { label: 'NOC & Contact', href: '/contact' },
      ],
      ctaText: 'Deploy Server',
      ctaHref: '/catalog',
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
      asNumber: reg.asNumber || metadata.asNumber,
      links: [
        { label: 'Server Catalog', href: '/catalog' },
        { label: 'Network & Peering', href: '/about' },
        { label: 'Support & NOC', href: '/contact' },
        { label: 'Data Privacy Policy', href: '/policies/privacy' },
        { label: 'Master Terms & AUP', href: '/policies/terms' },
        { label: 'SLA Credit Policy', href: '/policies/refund' },
      ],
      copyright: `© ${new Date().getFullYear()} ${reg.entityName}. All rights reserved.${metadata.asNumber ? ` Autonomous System ${metadata.asNumber}.` : ''}`,
    },
  };

  // 1. Home Page ('/')
  const homePage: PuckPageData = {
    title: `${metadata.name} | ${metadata.industry}`,
    root: { title: metadata.name, props: { theme: metadata.recommendedTheme } },
    content: [
      headerComponent,
      {
        type: 'HostingHero',
        props: {
          badge: home.hero.badge,
          headline: home.hero.headline,
          accentText: home.hero.accentText,
          subtitle: home.hero.subtitle,
          primaryCta: { label: home.hero.primaryCta, href: '/catalog' },
          secondaryCta: { label: home.hero.secondaryCta, href: '/about' },
          image: home.hero.image,
          trustBadges: home.hero.trustBadges,
        },
      },
      {
        type: 'NetworkThroughputBar',
        props: {
          metrics: home.networkBar.metrics,
          carriers: home.networkBar.carriers,
        },
      },
      {
        type: 'BentoInfrastructure',
        props: {
          title: home.bento.title,
          subtitle: home.bento.subtitle,
          items: home.bento.items,
        },
      },
      {
        type: 'ServerPlansGrid',
        props: {
          title: 'High-Frequency Compute Instances & Dedicated Hardware',
          subtitle: 'Instant provisioning across global enterprise nodes with unmetered DDoS mitigation.',
          plans: home.featuredPlans,
          ctaText: 'Deploy in 60s',
          ctaHref: '/catalog',
        },
      },
      {
        type: 'DatacenterMapSection',
        props: {
          title: 'Global Anycast Edge Network & Carrier-Neutral Facilities',
          subtitle: 'Sub-10ms latency routing across Tier-3 and Tier-4 enterprise datacenter nodes.',
          locations: home.datacenterLocations || ['Frankfurt FRA1', 'London LON2', 'New York NYC1', 'Amsterdam AMS1', 'Singapore SIN1', 'Tokyo TYO1'],
        },
      },
      {
        type: 'Testimonials',
        props: {
          title: 'Trusted by Lead DevOps & Infrastructure Architects',
          subtitle: 'Delivering zero-downtime compute for mission-critical production workloads.',
          testimonials: home.testimonials,
        },
      },
      {
        type: 'FAQ',
        props: {
          title: 'Infrastructure & SLA FAQ',
          subtitle: 'Network availability, hardware replacement, IPv4/IPv6 allocations, and commercial terms.',
          faqs: home.faq,
        },
      },
      {
        type: 'HostingCTA',
        props: {
          headline: home.cta.headline,
          subtitle: home.cta.subtitle,
          primaryCta: { label: home.cta.primaryCta, href: '/catalog' },
          secondaryCta: { label: home.cta.secondaryCta, href: '/contact' },
          guarantee: home.cta.guarantee,
        },
      },
      footerComponent,
    ],
  };

  // 2. About Page ('/about')
  const aboutPage: PuckPageData = {
    title: `Network Architecture & SLA | ${metadata.name}`,
    root: { title: `Network & Architecture | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'AboutHero',
        props: {
          badge: 'Network Backbone & Peering',
          headline: about.heroHeadline,
          subtitle: about.heroSubtitle,
        },
      },
      {
        type: 'NetworkArchitecture',
        props: {
          title: 'Dark Fiber Rings & Non-Blocking Core Fabric',
          story: about.architectureStory,
          philosophy: about.infrastructurePhilosophy,
        },
      },
      {
        type: 'SlaCommitment',
        props: {
          title: 'Contractual Service Level Agreements',
          subtitle: 'Financial guarantees backed by automated monthly billing invoice credits.',
          commitments: about.slaDetails,
        },
      },
      {
        type: 'DatacenterFacilities',
        props: {
          title: 'Carrier-Neutral Datacenter Facilities',
          subtitle: 'N+2 redundant power cooling, biometrics, and clean fire suppression.',
          facilities: about.facilities,
        },
      },
      {
        type: 'CorporateRegistration',
        props: {
          title: 'Corporate Infrastructure & Autonomous Entity Information',
          subtitle: 'Licensed telecommunications operator and hosting infrastructure legal entity disclosures.',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          registeredAddress: reg.registeredAddress,
          governingLaw: reg.governingLaw,
          taxId: reg.taxId || 'N/A',
          contactEmail: reg.contactEmail,
          contactPhone: reg.contactPhone,
          asNumber: reg.asNumber || metadata.asNumber,
        },
      },
      {
        type: 'HostingCTA',
        props: {
          headline: 'Evaluate Our Network with a Proof-of-Concept Cluster',
          subtitle: 'Deploy a dedicated test node or configure BGP session peering directly with our NOC.',
          primaryCta: { label: 'Explore Server Plans', href: '/catalog' },
          secondaryCta: { label: 'Contact NOC Engineers', href: '/contact' },
          guarantee: '100% Uptime SLA commitment with 15-minute emergency hardware replacement.',
        },
      },
      footerComponent,
    ],
  };

  // 3. Catalog Page ('/catalog')
  const catalogPage: PuckPageData = {
    title: `Server Catalog & Instant Provisioning | ${metadata.name}`,
    root: { title: `Server Catalog | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'CatalogHero',
        props: {
          badge: 'Hardware Inventory & Real-Time Availability',
          headline: catalog.heroHeadline,
          subtitle: catalog.heroSubtitle,
          categories: catalog.categories || ['All Instances', 'High-Frequency NVMe', 'Dedicated Bare Metal', 'Storage Optimized', 'GPU Accelerated'],
        },
      },
      {
        type: 'ServerInventoryGrid',
        props: {
          plans: catalog.plans,
        },
      },
      {
        type: 'HardwareGuarantees',
        props: {
          title: 'Enterprise Server Specifications Without Compromise',
          items: [
            { title: 'Enterprise AMD EPYC & Intel Xeon', description: 'Zero consumer-grade silicon. Dedicated high-frequency cores with ECC DDR5 memory.' },
            { title: 'Direct Gen4 NVMe RAID-10', description: 'Sustained 1,000,000+ IOPS with hardware failover and automated daily snapshot options.' },
            { title: '10Gbps - 100Gbps Redundant Uplinks', description: 'Multi-homed Tier-1 BGP transit with integrated 3.2Tbps DDoS scrubbing protection.' },
            { title: 'Full Root & IPMI/KVM Console', description: 'Out-of-band IPMI remote management, custom ISO mounting, and automated API provisioning.' },
          ],
        },
      },
      {
        type: 'HostingCTA',
        props: {
          headline: 'Need a Custom Rack, Private VLAN, or Multi-Gigabit Uplink?',
          subtitle: 'Our enterprise solutions team crafts bespoke bare-metal clusters and hybrid cloud environments.',
          primaryCta: 'Request Custom Architecture',
          secondaryCta: 'Connect with Sales',
          guarantee: 'Deployable in 60 seconds with 24/7/365 dedicated engineer support.',
        },
      },
      footerComponent,
    ],
  };

  // 4. Contact Page ('/contact')
  const contactPage: PuckPageData = {
    title: `NOC & Technical Support | ${metadata.name}`,
    root: { title: `NOC & Contact | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'ContactHero',
        props: {
          headline: contact.heroHeadline,
          subtitle: contact.heroSubtitle,
          nocResponseTime: contact.nocResponseTime,
        },
      },
      {
        type: 'HostingContactForm',
        props: {
          title: 'Contact Technical Solutions & Enterprise Sales',
          subtitle: 'Submit an architecture inquiry, custom quotation request, or IP routing coordination.',
          fields: [
            { name: 'fullName', label: 'Full Name & Title', type: 'text', required: true },
            { name: 'workEmail', label: 'Corporate Email', type: 'email', required: true },
            { name: 'companyName', label: 'Company / Autonomous System', type: 'text', required: true },
            { name: 'inquiryType', label: 'Inquiry Category', type: 'select', options: ['Dedicated Server Deployment', 'BGP Peering & IP Transit', 'Custom Colocation Cage', 'Billing & Corporate Net-30', 'Technical Support / P1 Escalation'], required: true },
            { name: 'specifications', label: 'Workload & Bandwidth Requirements', type: 'textarea', required: true },
          ],
          submitButtonText: 'Dispatch Inquiry to NOC',
        },
      },
      {
        type: 'NocDetails',
        props: {
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          registeredAddress: reg.registeredAddress,
          contactEmail: reg.contactEmail,
          contactPhone: reg.contactPhone,
          nocEmergencyPhone: reg.nocEmergencyPhone || reg.contactPhone,
          asNumber: reg.asNumber || metadata.asNumber,
          hours: '24/7/365 Live Tier-3 Systems Engineering Shift Staff',
          emergencyP1Sla: 'P1 Infrastructure Incidents: <15 Minute Live Voice Bridge',
          datacenters: contact.datacenters || [
            { city: 'Primary Headquarters & NOC', facility: 'Equinix FR5', address: reg.registeredAddress },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 5. Policies: Privacy ('/policies/privacy')
  const privacyPage: PuckPageData = {
    title: `Infrastructure Privacy Policy | ${metadata.name}`,
    root: { title: `Privacy Policy | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Infrastructure & Data Residency Privacy Policy',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customPrivacy || [
            {
              heading: '1. Regulatory Identification & Data Sovereignty',
              body: `${reg.entityName} (Company Registration No. ${reg.registrationNumber}), operating Autonomous System ${reg.asNumber || metadata.asNumber || 'Network'}, headquartered at ${reg.registeredAddress}, acts as the host and data processor. We maintain strict adherence to international data privacy statutes (including EU GDPR, Swiss FADP, and applicable local telecommunications secrecy laws).`,
            },
            {
              heading: '2. Zero Telemetry & Customer Virtual Machine Secrecy',
              body: 'We practice strict zero-telemetry inside customer compute instances. We do not monitor, inspect, store, or log the payload of customer network packets, disk images, database tables, or application memory. The customer maintains exclusive root cryptographic control over all hosted environments.',
            },
            {
              heading: '3. Administrative Telemetry & Flow Logging',
              body: 'To ensure network integrity, mitigate automated volumetric DDoS attacks, and facilitate billing metering, we collect network interface traffic byte counters, IP flow statistical metadata (NetFlow/IPFIX), and administrative access logs to customer control panels. Flow telemetry is purged on a rolling 30-day retention schedule.',
            },
            {
              heading: '4. Lawful Interception & Subpoena Protocol',
              body: `Customer data is never disclosed to commercial third parties. Disclosures to sovereign authorities occur strictly upon presentation of a valid, domestic, legally binding judicial court warrant issued within ${reg.jurisdiction}. In all non-prohibited cases, Customer is immediately notified prior to any compliance action. Contact our compliance officer at ${reg.contactEmail}.`,
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 6. Policies: Terms ('/policies/terms')
  const termsPage: PuckPageData = {
    title: `Master Services Agreement & AUP | ${metadata.name}`,
    root: { title: `Terms & AUP | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Master Infrastructure Services Agreement & Acceptable Use Policy',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customTerms || [
            {
              heading: '1. Service Scope & Provisioning Agreement',
              body: `This Master Services Agreement governs all bare-metal, VPS, cloud computing, IP transit, and colocation services provided by ${reg.entityName} ("Provider") to Customer. Services are provisioned according to the commercial specifications set forth in Customer’s active order confirmation.`,
            },
            {
              heading: '2. Acceptable Use Policy (AUP) & Security Rules',
              body: 'Customer agrees not to utilize Provider infrastructure for abusive activities including: unsolicited mass commercial electronic mail (SPAM), denial-of-service (DDoS) amplification attacks, cryptomining malware, IP spoofing, botnet command-and-control operations, or host materials violating applicable copyright statutes. Violations result in immediate null-routing and contractual termination.',
            },
            {
              heading: '3. Bandwidth Allocations & Unmetered Transit',
              body: 'Instances designated with unmetered bandwidth allow continuous 95th-percentile utilization up to the subscribed port speed (e.g. 1Gbps or 10Gbps). Burst bandwidth is guaranteed non-blocking across Provider’s upstream transit links. Out-of-band IPMI traffic and local private VLAN traffic are permanently zero-rated.',
            },
            {
              heading: '4. Limitation of Liability & Governing Law',
              body: `Provider’s sole financial liability for any service failure, hardware defect, or downtime is strictly governed by the Service Level Agreement Credit Policy. In no event shall Provider be liable for consequential losses, lost profits, or data restoration costs. This Agreement is governed by the laws of ${reg.governingLaw}.`,
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 7. Policies: Refund ('/policies/refund')
  const refundPage: PuckPageData = {
    title: `SLA Credit & Refund Policy | ${metadata.name}`,
    root: { title: `SLA Credits & Refunds | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Financial Service Level Agreement (SLA) Credit Policy',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customRefund || [
            {
              heading: '1. 99.99% Network Availability Guarantee',
              body: 'Provider guarantees 99.99% uptime for core network routing, primary border BGP switches, and physical server power feeds during each calendar month. Scheduled maintenance windows announced 72 hours in advance are excluded from downtime calculations.',
            },
            {
              heading: '2. Tiered Financial Downtime Credits',
              body: 'In the event of verified network or power interruption exceeding 0.01% in a given month, Customer is entitled to invoice credits as follows: (a) 99.0% - 99.89% uptime: 10% credit of monthly invoice; (b) 98.0% - 98.99% uptime: 25% credit; (c) <98.0% uptime: 50% credit of total monthly charges.',
            },
            {
              heading: '3. Hardware Replacement SLA (15 Minutes)',
              body: 'For dedicated bare-metal servers, Provider guarantees failed component replacement (RAM modules, power supply units, NVMe drives, or motherboards) within 15 minutes of technician diagnosis at the physical datacenter.',
            },
            {
              heading: '4. Claims Submission Protocol',
              body: `To claim SLA credits, Customer must submit a ticket via our customer portal or email ${reg.contactEmail} within 14 calendar days of the qualifying incident. Approved credits are automatically applied to the subsequent monthly billing cycle.`,
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
      '/catalog': catalogPage,
      '/contact': contactPage,
      '/policies/privacy': privacyPage,
      '/policies/terms': termsPage,
      '/policies/refund': refundPage,
    },
  };
}
