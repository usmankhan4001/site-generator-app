export interface BusinessInfo {
  name: string;
  shortName: string;
  registrationNumber: string;
  address: string;
  email: string;
  phone: string;
  governingLaw: string;
  website: string;
  formspreeId?: string;
}

export interface HeroInfo {
  badge: string;
  headline: string;
  accentText: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
  trustBadges: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface BentoFeature {
  title: string;
  description: string;
  image: string;
  badge: string;
}

export interface OfferingItem {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const BUSINESS: BusinessInfo = {
  "name": "Vantage Cloud Technologies Limited",
  "shortName": "Vantage",
  "registrationNumber": "76891245",
  "address": "Suite 2408, Two IFC, Central, Hong Kong",
  "email": "contact@vantagecloud.io",
  "phone": "+852 3008 5890",
  "governingLaw": "Hong Kong SAR",
  "website": "vantagecloud.io"
};

export const FORMSPREE_ID: string = "";

export const HERO: HeroInfo = {
  "badge": "Enterprise Cloud Solutions",
  "headline": "Mission-Critical Cloud & DevOps",
  "accentText": "Engineered for Scale",
  "subtitle": "We architect high-availability Kubernetes clusters, automated multi-cloud CI/CD pipelines, and zero-downtime migration strategies for high-growth enterprises.",
  "primaryCta": "Schedule Architecture Review",
  "secondaryCta": "Explore Service Tiers",
  "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
  "trustBadges": [
    "99.99% Uptime SLA",
    "AWS & GCP Certified",
    "Zero-Downtime Guarantee"
  ]
};

export const STATS: StatItem[] = [
  {
    "value": "99.99%",
    "label": "Infrastructure Uptime SLA"
  },
  {
    "value": "500+",
    "label": "Production Clusters Deployed"
  },
  {
    "value": "< 15min",
    "label": "Incident Response Time"
  },
  {
    "value": "45%",
    "label": "Average Cloud Spend Reduction"
  }
];

export const BENTO_FEATURES: BentoFeature[] = [
  {
    "title": "Automated Multi-Cloud CI/CD",
    "description": "Deterministic, immutable deployment pipelines with automated canary releases and rollback gates.",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    "badge": "Automation"
  },
  {
    "title": "Kubernetes & Microservices Mesh",
    "description": "Production-hardened service meshes with Istio and Cilium for zero-trust service communication.",
    "image": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    "badge": "Orchestration"
  },
  {
    "title": "24/7 SRE & Threat Telemetry",
    "description": "Continuous Prometheus/Grafana observability with automated self-healing infrastructure triggers.",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    "badge": "Observability"
  }
];

export const OFFERINGS: OfferingItem[] = [
  {
    "id": "cloud-audit",
    "name": "Cloud Infrastructure & Security Audit",
    "price": 1499,
    "description": "Complete architecture deep dive, cost optimization report, and threat surface vulnerability mapping.",
    "features": [
      "Full AWS/GCP architecture review",
      "Cost optimization analysis (FinOps)",
      "Security & IAM gap assessment",
      "Actionable Terraform remediation roadmap",
      "Executive summary & technical report"
    ],
    "popular": false
  },
  {
    "id": "devops-acceleration",
    "name": "DevOps & CI/CD Pipeline Modernization",
    "price": 3899,
    "description": "Turnkey implementation of end-to-end GitOps pipelines, container orchestration, and staging environments.",
    "features": [
      "Automated GitHub Actions / GitLab CI pipelines",
      "Kubernetes cluster configuration & Helm charts",
      "Infrastructure as Code (Terraform / OpenTofu)",
      "Staging & preview deployment automation",
      "3 months dedicated engineering support"
    ],
    "popular": true
  },
  {
    "id": "enterprise-sre",
    "name": "24/7 Managed Cloud & SRE Partnership",
    "price": 7499,
    "description": "Complete outsourced Site Reliability Engineering with guaranteed 15-minute SLA and disaster recovery.",
    "features": [
      "24/7/365 active monitoring & on-call SRE",
      "99.99% uptime guarantee with SLA credits",
      "Continuous disaster recovery & backup drills",
      "Monthly cost governance & optimization",
      "Dedicated Lead DevOps Architect"
    ],
    "popular": false
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    "name": "Alexander Hayes",
    "role": "CTO, Vantage FinTech Group",
    "text": "The cloud architecture overhaul reduced our server costs by 42% while handling 10x traffic spikes during our Series B launch without a stutter.",
    "rating": 5,
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    "name": "Marcus Vance",
    "role": "VP of Engineering, CloudStream",
    "text": "Their GitOps implementation turned our fragile 4-hour deployment cycle into a reliable 6-minute automated release process.",
    "rating": 5,
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export const FAQS: FaqItem[] = [
  {
    "q": "What cloud providers do you support?",
    "a": "We specialize in AWS, Google Cloud Platform (GCP), Microsoft Azure, and hybrid on-premise Kubernetes clusters."
  },
  {
    "q": "How is billing handled and what are the payment terms?",
    "a": "We support wire transfers, corporate credit cards, and milestone invoices. Audit packages are billed upfront; retainers are billed monthly."
  },
  {
    "q": "Do you provide SLAs and non-disclosure agreements?",
    "a": "Yes, all engagements include binding mutual NDAs, intellectual property transfer upon payment, and guaranteed uptime SLAs."
  }
];

/* ============================================================
   POLICY TEXT GENERATORS (Airwallex Fully Compliant)
   ============================================================ */
export function getPrivacyPolicy(b: BusinessInfo = BUSINESS): string {
  return `
# Privacy Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

This Privacy Policy describes how **${b.name}** ("we," "our," or "us"), registered in ${b.governingLaw} (Registration No. ${b.registrationNumber}), collects, uses, and protects your personal information when you visit our website (${b.website}) or engage our services.

## 1. Information We Collect
- **Contact Details:** Name, business email, telephone number, job title, and company name.
- **Billing Information:** Invoicing address, tax identification numbers, and payment details processed via secure, PCI-DSS compliant payment gateways.
- **Technical Telemetry:** IP address, browser type, device identifiers, and website usage telemetry collected via secure cookies.

## 2. How We Use Your Information
- To deliver, maintain, and optimize our professional services and deliverables.
- To execute contracts, invoice services, and comply with statutory financial auditing obligations in ${b.governingLaw}.
- To communicate project milestones, service updates, and security notices.

## 3. Data Protection & Security
We employ industry-standard 256-bit SSL encryption, role-based access control (RBAC), and SOC2-compliant cloud storage to safeguard your data against unauthorized access, alteration, or disclosure.

## 4. Third-Party Disclosures
We do not sell, rent, or trade your personal data. Data is shared strictly with essential service partners bound by strict confidentiality agreements.

## 5. Your Rights
Under applicable data protection laws, you have the right to access, rectify, or request deletion of your personal information. Contact our Data Protection Officer at **${b.email}**.

## 6. Contact Information
**${b.name}**  
Business Registration No.: ${b.registrationNumber}  
Registered Address: ${b.address}  
Email: ${b.email} | Phone: ${b.phone}
`;
}

export function getTermsConditions(b: BusinessInfo = BUSINESS): string {
  return `
# Terms and Conditions of Service

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

These Terms and Conditions ("Terms") constitute a legally binding agreement between the client ("you") and **${b.name}** ("we," "us"), registered under the laws of ${b.governingLaw} (Registration No. ${b.registrationNumber}).

## 1. Services & Deliverables
We provide professional technology and business services as described in the service tier or agreed Scope of Work (SOW). All deliverables are created to professional commercial standards.

## 2. Payment Terms
- All fees are quoted in standard currency (USD/HKD/EUR) as indicated on our website.
- Payments may be remitted via corporate bank transfer, credit card, or authorized invoice gateway.
- Invoices are due upon receipt unless agreed otherwise in writing.

## 3. Intellectual Property Rights
Upon full payment of all fees due, all custom code, configurations, and deliverables developed specifically for the client shall become the exclusive intellectual property of the client.

## 4. Limitation of Liability
To the maximum extent permitted by the laws of ${b.governingLaw}, our maximum aggregate liability arising out of or related to our services shall not exceed the total fees paid by the client in the preceding three (3) months.

## 5. Governing Law & Jurisdiction
These Terms shall be governed by and construed in accordance with the laws of **${b.governingLaw}**. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of ${b.governingLaw}.

## 6. Contact Information
**${b.name}**  
Registration No.: ${b.registrationNumber}  
Address: ${b.address}  
Email: ${b.email} | Phone: ${b.phone}
`;
}

export function getRefundPolicy(b: BusinessInfo = BUSINESS): string {
  return `
# Refund and Cancellation Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

At **${b.name}**, we are committed to delivering the highest caliber of service. This policy outlines our refund and cancellation terms in accordance with consumer protection standards and payment card network requirements.

## 1. Professional Engagements & Products
- If you request cancellation before project initiation, you are entitled to a **100% full refund**.
- If you are dissatisfied with an initial milestone delivery within **14 calendar days**, contact our support team to request a review or prorated refund for unperformed scope.

## 2. Managed & Subscription Services
- Monthly support retainers may be cancelled at any time with 30 days written notice prior to the next billing cycle.
- Annual commitments cancelled within the first 30 days are eligible for a prorated refund of unused months.

## 3. Physical Product / Hardware Purchases (If Applicable)
- Physical items may be returned in original, unopened packaging within **30 days of delivery** for a full refund.
- Defective items will be replaced immediately with express shipping at our expense.

## 4. Refund Processing Time
Approved refunds are processed to the original payment method (bank account or credit card) within **5 to 10 business days**.

## 5. How to Request a Refund
Please email **${b.email}** with your Order ID, invoice number, and reason for the request. Our management team responds within 2 business days.

**${b.name}**  
Registration No.: ${b.registrationNumber}  
Address: ${b.address}
`;
}

export function getShippingPolicy(b: BusinessInfo = BUSINESS): string {
  return `
# Shipping and Service Delivery Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

## 1. Digital Service Delivery
- **Instant Delivery:** Digital software access, account credentials, and platform provisioning are initiated within **1 to 24 hours** of confirmed payment.
- **Consulting Engagements:** Project kickoff and onboarding materials are delivered electronically via secure client portal within 1 business day.

## 2. Physical Deliveries (Hardware & Equipment)
- **Courier Partners:** We dispatch physical hardware via DHL Express, FedEx, and SF Express.
- **Estimated Transit Times:**
  - Domestic / Regional Delivery: **1 - 3 business days**
  - International Express Delivery: **3 - 7 business days**
- **Tracking:** Real-time tracking numbers are automatically emailed upon parcel dispatch.

## 3. Contact for Shipping Inquiries
For questions regarding digital provisioning or parcel dispatch, contact **${b.email}** or call **${b.phone}**.

**${b.name}**  
Registration No.: ${b.registrationNumber}  
Address: ${b.address}
`;
}
