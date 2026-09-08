/**
 * Starter content set — `modern_saas_pro`: Apex Cloud Orchestration.
 * Authentic copy for multi-cloud Kubernetes fleet control, eBPF telemetry mesh,
 * autonomous FinOps bin-packing, and zero-trust policy-as-code enforcement.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const modernSaasPro: StarterContentSet = {
  id: 'modern_saas_pro',
  archetype: 'saas',
  name: 'Apex Cloud Orchestration',
  description:
    'Declarative multi-cloud control plane unifying AWS, GCP, Azure, and bare-metal edge clusters with zero-latency eBPF telemetry, autonomous bin-packing, and zero-drift security.',
  niche: 'Autonomous Kubernetes & Multi-Cloud Fleet Control',
  tags: [
    'saas',
    'cloud-orchestration',
    'kubernetes',
    'devops',
    'finops',
    'ebpf',
    'zero-trust',
    'infrastructure-as-code',
  ],
  needsPersonalization: false,
  themeId: 'indigo-enterprise',
  accent: '#6366f1',
  layoutSystem: 'signal',
  business: {
    name: 'Apex Cloud Technologies, Inc.',
    shortName: 'Apex Cloud',
    registrationNumber: 'DE-7182904',
    jurisdiction: 'Delaware, USA (SOC 2 Type II & ISO 27001 Certified)',
    governingLaw: 'the laws of the State of California',
    registeredAddress: '500 Howard Street, Suite 400, San Francisco, CA 94105, USA',
    email: 'enterprise@apexcloud.example',
    phone: '+1 (415) 555-0142',
    website: 'apexcloud.example',
    taxId: 'US-EIN 83-1928374',
    supportHours: '24/7/365 Global Enterprise Operations · 15-Minute Critical SLA',
  },
  brand: {
    logoText: 'Apex Cloud',
  },
  header: {
    variant: 'floating_glass_pill',
    sticky: true,
    transparent: true,
    showAnnouncement: true,
    announcementText: 'Apex v4.8 Released: Zero-Downtime Multi-Region Failover with eBPF 2.0',
    announcementLink: { label: 'Explore Changelog', href: '/pricing' },
    secondaryCta: { label: 'Live Sandbox Demo', href: '/pricing' },
  },
  headerCta: {
    label: 'Start 14-Day Enterprise Trial',
    href: '/pricing',
  },
  meta: {
    title: 'Apex Cloud Orchestration — Declarative Multi-Cloud Kubernetes Control Plane',
    description:
      'Unify AWS, GCP, Azure, and edge clusters into one resilient control plane. Automate FinOps cost savings by 42% and achieve 99.999% availability.',
    ogImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },
  footer: {
    variant: 'columns',
    tagline:
      'Apex Cloud Technologies, Inc. — 500 Howard Street, Suite 400, San Francisco, CA 94105. Registered in Delaware (DE-7182904). Delivering autonomous, resilient cloud orchestration for Global 2000 engineering teams.',
    secondaryLegalText:
      'SOC 2 Type II Certified. ISO/IEC 27001:2022 Certified. Cloud Native Computing Foundation (CNCF) Certified Kubernetes Distribution. HIPAA & FedRAMP Ready.',
    badgeText: 'SOC 2 Type II · ISO 27001:2022 · CNCF Certified · 99.999% SLA',
    columns: [
      {
        title: 'Platform Capabilities',
        links: [
          { label: 'Multi-Cluster Service Mesh', href: '/pricing' },
          { label: 'Autonomous FinOps & Bin-Packing', href: '/pricing' },
          { label: 'eBPF Distributed Telemetry', href: '/pricing' },
          { label: 'Zero-Trust OPA Policy Engine', href: '/pricing' },
          { label: 'Disaster Recovery & Failover', href: '/pricing' },
        ],
      },
      {
        title: 'Developers & Platform',
        links: [
          { label: 'Terraform & Pulumi Provider', href: '/pricing' },
          { label: 'CLI & Kubernetes Operator', href: '/pricing' },
          { label: 'Architecture Benchmarks', href: '/about' },
          { label: 'Security & Compliance Whitepaper', href: '/about' },
          { label: 'Global Systems Status', href: '/pricing' },
        ],
      },
      {
        title: 'Company & Compliance',
        links: [
          { label: 'About Apex Cloud', href: '/about' },
          { label: 'Customer Case Studies', href: '/about' },
          { label: 'Enterprise Pricing & SLAs', href: '/pricing' },
          { label: 'Contact Solution Architects', href: '/contact' },
        ],
      },
    ],
  },
  slots: {
    home: {
      hero: {
        variant: 'asymmetric_bento_collage',
        badge: 'Next-Gen Autonomous Kubernetes & Multi-Cloud Fleet Control',
        headline: 'Zero-drift multi-cloud orchestration for',
        accentText: 'global enterprise workloads',
        subtitle:
          'Apex unifies AWS, GCP, Azure, and bare-metal edge clusters into a single declarative control plane. Eliminate configuration drift, automate cross-region failover, and reduce cloud infrastructure spend by 42%.',
        primaryCta: { label: 'Deploy Control Plane (Free)', href: '/pricing' },
        secondaryCta: { label: 'Book Solution Architect', href: '/contact' },
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        trustBadges: [
          'SOC 2 Type II Certified',
          '99.999% Uptime Guarantee',
          'CNCF Certified Kubernetes',
          '42% Average Cloud Cost Reduction',
        ],
      },
      trust: {
        variant: 'logos',
        title: 'Trusted by platform engineering teams at global scale',
        items: [
          { name: 'Stripe', domain: 'stripe.com' },
          { name: 'Datadog', domain: 'datadoghq.com' },
          { name: 'Cloudflare', domain: 'cloudflare.com' },
          { name: 'HashiCorp', domain: 'hashicorp.com' },
          { name: 'GitHub', domain: 'github.com' },
        ],
      },
      features: {
        variant: 'tabbed_showcase',
        eyebrow: 'Architecture & Capabilities',
        title: 'Engineered for planetary scale & zero-maintenance operations',
        description:
          'Apex replaces fragmented Kubernetes operators and ad-hoc scripts with a unified, kernel-level orchestration layer.',
        tabs: [
          { id: 'mesh', label: 'Multi-Cluster Mesh', icon: 'Network' },
          { id: 'finops', label: 'Autonomous FinOps', icon: 'TrendingDown' },
          { id: 'security', label: 'Zero-Trust Security', icon: 'ShieldCheck' },
          { id: 'telemetry', label: 'Kernel eBPF Telemetry', icon: 'Activity' },
        ],
        items: [
          {
            icon: 'Network',
            title: 'Global eBPF Multi-Cloud Service Mesh',
            description:
              'WireGuard-encrypted inter-cluster tunnels connecting VPCs across AWS, GCP, and Azure with sub-millisecond latency and automatic mTLS 1.3 rotation.',
            badge: 'Kernel Networking',
            category: 'mesh',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'TrendingDown',
            title: 'Autonomous FinOps & Predictive Bin-Packing',
            description:
              'Dynamic spot instance migration, rightsizing recommendations, and automated pod bin-packing saving an average of 42% on raw compute bills.',
            badge: '42% Cost Savings',
            category: 'finops',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'ShieldCheck',
            title: 'Continuous Zero-Drift Policy Engine',
            description:
              'Open Policy Agent (OPA) gatekeeper rules enforced in real time at kernel level. Block non-compliant deployments before they ever touch the Kubernetes API.',
            badge: 'Zero-Trust',
            category: 'security',
            image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Zap',
            title: 'Sub-Second Multi-Region Failover',
            description:
              'Automated health probes that detect regional cloud outages in under 400ms, seamlessly shifting traffic to healthy standby clusters without dropped TCP connections.',
            badge: 'High Availability',
            category: 'mesh',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      stats: {
        items: [
          { value: '99.999%', label: 'Guaranteed platform control-plane uptime SLA' },
          { value: '42.4%', label: 'Average cloud infrastructure spend reduction' },
          { value: '<400ms', label: 'Cross-cloud automated failover latency' },
          { value: '3.2M+', label: 'Containers orchestrated across 45 countries' },
        ],
      },
      pricing: {
        variant: 'glow_card_deck',
        eyebrow: 'Transparent SaaS Pricing',
        title: 'Predictable pricing scaled to your cluster footprint',
        description:
          'No per-seat licensing penalties. Pay exclusively for active nodes orchestrated with complete feature access.',
        currency: 'USD',
        discountBadge: 'Save 20% on Annual Billing',
        billingIntervals: ['monthly', 'annually'],
        tiers: [
          {
            id: 'apex-starter',
            name: 'Platform Growth',
            price: 490,
            priceUnit: '/mo',
            description: 'For fast-growing engineering teams managing up to 25 Kubernetes nodes across 2 clouds.',
            features: [
              'Up to 25 managed nodes across AWS / GCP / Azure',
              'Global eBPF service mesh with automatic mTLS',
              'Autonomous FinOps bin-packing (up to 30% savings)',
              '14-day telemetry retention & Slack alerting',
              'Standard 99.9% uptime SLA guarantee',
            ],
          },
          {
            id: 'apex-scale',
            name: 'Enterprise Scale',
            price: 1850,
            priceUnit: '/mo',
            description: 'For mission-critical production fleets requiring automated multi-region failover and compliance.',
            popular: true,
            badge: 'Most Popular',
            features: [
              'Up to 150 managed nodes across unlimited cloud providers',
              'Sub-second automated cross-cloud failover routing',
              'SOC 2 Type II, HIPAA, and PCI-DSS compliance dashboards',
              'Custom OPA policy gatekeepers & GitOps drift auto-remediation',
              '30-day kernel eBPF distributed tracing retention',
              '24/7/365 Dedicated Slack bridge with Solution Architects',
            ],
          },
          {
            id: 'apex-custom',
            name: 'Mission Critical Fleet',
            price: 4500,
            priceUnit: '/mo',
            description: 'For planetary-scale enterprises requiring bespoke air-gapped deployments and custom SLAs.',
            badge: 'Planetary Fleet',
            features: [
              'Unlimited nodes, clusters, and bare-metal edge locations',
              'Air-gapped on-premise & sovereign cloud deployment support',
              'Custom eBPF kernel instrumentation & telemetry pipelines',
              '15-Minute emergency response SLA with dedicated TAM',
              'Custom contractual indemnity and FedRAMP certification package',
            ],
          },
        ],
      },
      testimonials: {
        variant: 'cards',
        eyebrow: 'Customer Proof',
        title: 'What Platform Architects Say About Apex',
        description: 'Real testimonials from engineering leaders running mission-critical workloads.',
        items: [
          {
            name: 'Devin Thorne',
            role: 'VP of Infrastructure',
            company: 'Finscale Technologies',
            text: 'Apex cut our multi-cloud Kubernetes bill by $380,000 in the first quarter alone through autonomous spot bin-packing. More importantly, during the major AWS us-east-1 outage, Apex shifted all transactional traffic to GCP in 320 milliseconds without a single dropped API request.',
            rating: 5,
          },
          {
            name: 'Aisha Al-Mansoor',
            role: 'Head of Platform Engineering',
            company: 'Quantum Logistics Global',
            text: 'Managing 80+ Kubernetes clusters across hybrid clouds was an operational nightmare before Apex. The declarative control plane and zero-trust OPA gatekeepers have given our security team complete confidence while doubling developer deployment velocity.',
            rating: 5,
          },
          {
            name: 'Lukas Meyer',
            role: 'Chief Information Security Officer',
            company: 'Nordic Health Cloud',
            text: 'The kernel-level eBPF telemetry provides unprecedented observability into pod-to-pod communications with zero CPU overhead. Apex enabled us to achieve SOC 2 Type II and HIPAA compliance in record time.',
            rating: 5,
          },
        ],
      },
      faq: {
        eyebrow: 'Technical FAQ',
        title: 'Frequently Asked Questions',
        description: 'Everything you need to know about architecture, installation, and security.',
        items: [
          {
            q: 'How long does it take to connect an existing Kubernetes cluster?',
            a: 'Installation takes under 3 minutes. You deploy our lightweight, open-source Helm chart or Kubernetes Operator, which connects securely to your Apex control plane without requiring inbound firewall openings.',
          },
          {
            q: 'Does Apex require access to my proprietary application data?',
            a: 'No. Apex operates strictly at the infrastructure control plane and network packet metadata level using eBPF. We never ingest, inspect, or store your application payload data.',
          },
          {
            q: 'Can Apex orchestrate on-premise bare-metal servers or edge nodes?',
            a: 'Yes. Apex treats bare-metal nodes (Ubuntu, RHEL, Talos Linux) identically to cloud provider clusters, bridging them into your global service mesh automatically.',
          },
          {
            q: 'What happens if the Apex SaaS control plane experiences an outage?',
            a: 'Your clusters continue running locally without interruption. Apex agents operate autonomously with local state caching; even in a total network partition, your workloads remain 100% online.',
          },
        ],
      },
      cta: {
        headline: 'Automate your multi-cloud Kubernetes fleet in under 5 minutes',
        subtitle:
          'Start your 14-day unrestricted Enterprise pilot today. No credit card required. Instant Helm deployment.',
        primaryCta: { label: 'Start Free Enterprise Pilot', href: '/pricing' },
        secondaryCta: { label: 'Schedule Architect Demo', href: '/contact' },
        guarantee: 'Includes 14 days of complimentary Solution Architect onboarding and cluster audit.',
      },
    },
    about: {
      header: {
        eyebrow: 'About Apex Cloud',
        headline: 'Building the autonomous nervous system for planetary computing',
        subtitle:
          'Founded by former cloud infrastructure architects from AWS, Google Cloud, and HashiCorp to eliminate cloud complexity.',
      },
      story: {
        eyebrow: 'Our Vision',
        title: 'Infrastructure should be invisible, autonomous, and self-healing',
        description:
          'We believe developers should ship features while intelligent kernel-level software manages infrastructure resilience and cost.',
        blocks: [
          {
            heading: 'The Multi-Cloud Reality',
            body: 'Modern enterprises cannot afford vendor lock-in. Yet managing heterogeneous cloud environments creates crippling configuration drift, security blind spots, and runaway compute expenditures. Apex was engineered from day one as the universal declarative control plane.',
          },
          {
            heading: 'Kernel-Level Innovation',
            body: 'By leveraging extended Berkeley Packet Filters (eBPF), Apex intercepts networking, security, and telemetry events directly in the Linux kernel—delivering 10x higher performance with zero sidecar proxy bloat.',
          },
        ],
        highlights: [
          'Over 3.2M containers orchestrated daily across 45 countries',
          'Certified Kubernetes Conformance Partner (CNCF)',
          'SOC 2 Type II, ISO 27001:2022, and HIPAA certified',
          'Backed by leading enterprise venture capital firms',
        ],
      },
      stats: {
        items: [
          { value: '$42M+', label: 'Total venture funding from top Tier-1 enterprise investors' },
          { value: '3.2M+', label: 'Daily active production containers orchestrated' },
          { value: '140+', label: 'Global 2000 enterprise customers' },
          { value: '99.999%', label: 'Control plane availability track record' },
        ],
      },
      team: {
        eyebrow: 'Engineering Leadership',
        title: 'Meet the Architects Behind Apex',
        description: 'Deep distributed systems expertise from world-class cloud platforms.',
        members: [
          {
            name: 'Dr. Zachary Chen',
            role: 'Co-Founder & Chief Executive Officer',
            bio: 'Former Principal Distributed Systems Engineer at AWS EC2 Core. Led architectural design of large-scale VPC peering and hypervisor networking.',
            credentials: 'Ph.D Computer Science (MIT), CNCF Ambassador',
          },
          {
            name: 'Elena Rostova',
            role: 'Co-Founder & Chief Technology Officer',
            bio: 'Kernel hacker and eBPF maintainer. Previously Senior Staff Engineer at Google Cloud Kubernetes Engine (GKE) focusing on network datapath security.',
            credentials: 'MS Systems Engineering (Stanford)',
          },
          {
            name: 'Marcus Brody',
            role: 'VP of Product & Customer Engineering',
            bio: '15 years leading enterprise developer platforms at HashiCorp and Datadog. Passionate about FinOps automation and GitOps developer workflows.',
            credentials: 'BS Electrical Eng & CS (UC Berkeley)',
          },
        ],
      },
      cta: {
        headline: 'Join hundreds of forward-thinking platform teams',
        subtitle: 'Experience the power of declarative, kernel-level multi-cloud orchestration.',
        primaryCta: { label: 'Explore Pricing Plans', href: '/pricing' },
      },
    },
    offerings: {
      header: {
        eyebrow: 'Pricing & Tiers',
        headline: 'Simple, transparent pricing for modern engineering teams',
        subtitle:
          'Choose the right plan for your cluster footprint. All tiers include full eBPF service mesh capabilities and 24/7 platform support.',
      },
      pricing: {
        variant: 'glow_card_deck',
        eyebrow: 'Tiered Options',
        title: 'Scale seamlessly from prototype to planetary deployment',
        description: 'All plans include unlimited users, unlimited deployments, and full API access.',
        currency: 'USD',
        discountBadge: 'Save 20% with Annual Plan',
        billingIntervals: ['monthly', 'annually'],
        tiers: [
          {
            id: 'apex-starter',
            name: 'Platform Growth',
            price: 490,
            priceUnit: '/mo',
            description: 'For fast-growing engineering teams managing up to 25 Kubernetes nodes across 2 clouds.',
            features: [
              'Up to 25 managed nodes across AWS / GCP / Azure',
              'Global eBPF service mesh with automatic mTLS',
              'Autonomous FinOps bin-packing (up to 30% savings)',
              '14-day telemetry retention & Slack alerting',
              'Standard 99.9% uptime SLA guarantee',
            ],
          },
          {
            id: 'apex-scale',
            name: 'Enterprise Scale',
            price: 1850,
            priceUnit: '/mo',
            description: 'For mission-critical production fleets requiring automated multi-region failover and compliance.',
            popular: true,
            badge: 'Most Popular',
            features: [
              'Up to 150 managed nodes across unlimited cloud providers',
              'Sub-second automated cross-cloud failover routing',
              'SOC 2 Type II, HIPAA, and PCI-DSS compliance dashboards',
              'Custom OPA policy gatekeepers & GitOps drift auto-remediation',
              '30-day kernel eBPF distributed tracing retention',
              '24/7/365 Dedicated Slack bridge with Solution Architects',
            ],
          },
          {
            id: 'apex-custom',
            name: 'Mission Critical Fleet',
            price: 4500,
            priceUnit: '/mo',
            description: 'For planetary-scale enterprises requiring bespoke air-gapped deployments and custom SLAs.',
            badge: 'Planetary Fleet',
            features: [
              'Unlimited nodes, clusters, and bare-metal edge locations',
              'Air-gapped on-premise & sovereign cloud deployment support',
              'Custom eBPF kernel instrumentation & telemetry pipelines',
              '15-Minute emergency response SLA with dedicated TAM',
              'Custom contractual indemnity and FedRAMP certification package',
            ],
          },
        ],
      },
      features: {
        variant: 'even',
        eyebrow: 'Included in All Plans',
        title: 'Standard Enterprise Capabilities',
        description: 'Every Apex subscription includes our core security and orchestration guarantees.',
        items: [
          {
            icon: 'Lock',
            title: 'Kernel-Level Zero-Trust',
            description: 'Automatic mTLS encryption and cryptographic workload identity verification on every packet.',
          },
          {
            icon: 'Activity',
            title: 'Real-Time Health Telemetry',
            description: 'High-frequency metric streaming with native Prometheus, Datadog, and OpenTelemetry integrations.',
          },
          {
            icon: 'Terminal',
            title: 'Universal CLI & Terraform Provider',
            description: 'Manage clusters declaratively via GitOps, GitHub Actions, Terraform, or our standalone CLI.',
          },
        ],
      },
      faq: {
        eyebrow: 'Billing FAQ',
        title: 'Frequently asked billing questions',
        description: 'Clear answers on billing metrics, annual discounts, and enterprise procurement.',
        items: [
          {
            q: 'How does Apex calculate node count for billing?',
            a: 'Node counts are calculated based on the 95th percentile of active worker nodes orchestrated in a given billing cycle. Control plane master nodes are always free of charge.',
          },
          {
            q: 'Can we pay via AWS Marketplace or GCP Marketplace credits?',
            a: 'Yes. Enterprise Scale and Mission Critical plans can be drawn down directly against your existing AWS EDP or GCP committed spend contracts.',
          },
        ],
      },
      cta: {
        headline: 'Ready to deploy Apex on your production clusters?',
        subtitle: 'Connect with an Enterprise Solution Architect to initiate your 14-day technical proof of concept.',
        primaryCta: { label: 'Start 14-Day Free Trial', href: '/pricing' },
      },
    },
    contact: {
      header: {
        eyebrow: 'Get In Touch',
        headline: 'Connect with our Enterprise Architecture Team',
        subtitle:
          'Whether you need a custom multi-cloud migration architecture or a security deep-dive, our engineers are ready to assist.',
      },
      form: {
        eyebrow: 'Enterprise Inquiry',
        title: 'Request a Solution Architecture Consultation',
        description:
          'Fill out your workload parameters. An Enterprise Solutions Architect will respond within two hours.',
        formVariant: 'enterprise',
        submitLabel: 'Schedule Technical Consultation',
        showDetails: true,
        supportHours: '24/7/365 Global Enterprise Support · 15-Minute Critical SLA',
        inquiryOptions: [
          'Enterprise Scale Pilot (>50 nodes)',
          'Multi-Cloud Disaster Recovery & Failover Design',
          'FinOps & Compute Cost Reduction Audit',
          'Security, Compliance (SOC 2 / HIPAA) & Air-Gap',
          'AWS/GCP Marketplace Procurement',
        ],
        offices: [
          {
            city: 'San Francisco HQ',
            facility: '500 Howard Street, Suite 400',
            address: 'San Francisco, CA 94105, USA',
            role: 'Global Headquarters & Core R&D Lab',
          },
          {
            city: 'Dublin Engineering Hub',
            facility: 'Grand Canal Dock, Level 4',
            address: 'Dublin 2, Ireland',
            role: 'European Support & EMEA Cloud Infrastructure Desk',
          },
        ],
      },
      faq: {
        eyebrow: 'Direct Support',
        title: 'Enterprise Support Channels',
        description: 'How to reach our technical staff.',
        items: [
          {
            q: 'What are the response times for Enterprise tier support tickets?',
            a: 'We offer a 15-minute response SLA for Severity-1 (Production Down) incidents 24/7/365, with direct video bridge escalation to on-call core engineers.',
          },
        ],
      },
    },
  },
};
