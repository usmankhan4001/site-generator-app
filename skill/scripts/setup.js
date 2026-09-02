/**
 * Airwallex Site Cloner - Setup & Customization Engine
 * Cross-Platform (macOS / Linux / Windows / OpenCode)
 */
const fs = require('fs');
const path = require('path');

function parseArgs() {
  const rawArgs = process.argv.slice(2);
  const options = {};

  function normalizeKey(k) {
    const cleaned = k.replace(/^--?/, '').trim();
    if (['company', 'companyName', 'company-name', 'name'].includes(cleaned)) return 'company';
    if (['shortName', 'short-name', 'short'].includes(cleaned)) return 'shortName';
    if (['regNo', 'registrationNumber', 'reg-no', 'registration-number', 'cr'].includes(cleaned)) return 'regNo';
    if (['address', 'office'].includes(cleaned)) return 'address';
    if (['domain', 'website', 'url'].includes(cleaned)) return 'domain';
    if (['email', 'contact-email'].includes(cleaned)) return 'email';
    if (['phone', 'telephone', 'tel'].includes(cleaned)) return 'phone';
    if (['governingLaw', 'governing-law', 'jurisdiction', 'law'].includes(cleaned)) return 'governingLaw';
    if (['archetype', 'archetypeId', 'archetype-id'].includes(cleaned)) return 'archetype';
    if (['theme', 'themeId', 'theme-id'].includes(cleaned)) return 'theme';
    if (['formspree', 'formspreeId', 'formspree-id', 'formId', 'form-id'].includes(cleaned)) return 'formspree';
    if (['target', 'dir', 'targetDir', 'target-dir', 'project'].includes(cleaned)) return 'target';
    return cleaned;
  }

  function cleanValue(v) {
    if (typeof v !== 'string') return v;
    let s = v.trim();
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      s = s.slice(1, -1);
    }
    return s;
  }

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg.startsWith('--')) {
      const eqIdx = arg.indexOf('=');
      if (eqIdx !== -1) {
        // --key=value flag style
        const rawKey = arg.slice(2, eqIdx);
        const rawVal = arg.slice(eqIdx + 1);
        const key = normalizeKey(rawKey);
        options[key] = cleanValue(rawVal);
        options[rawKey] = options[key];
      } else {
        // --key value flag style OR boolean flag
        const rawKey = arg.slice(2);
        const next = rawArgs[i + 1];
        const key = normalizeKey(rawKey);
        if (next !== undefined && !next.startsWith('--')) {
          options[key] = cleanValue(next);
          options[rawKey] = options[key];
          i++;
        } else {
          options[key] = true;
          options[rawKey] = true;
        }
      }
    }
  }

  // Fallback to positional arguments if named flags are not used
  if (!options.company && rawArgs.length >= 1 && !rawArgs[0].startsWith('--')) {
    options.company = rawArgs[0];
    if (rawArgs[1] && !rawArgs[1].startsWith('--')) options.regNo = rawArgs[1];
    if (rawArgs[2] && !rawArgs[2].startsWith('--')) options.address = rawArgs[2];
    if (rawArgs[3] && !rawArgs[3].startsWith('--')) options.archetype = rawArgs[3];
    if (rawArgs[4] && !rawArgs[4].startsWith('--')) options.domain = rawArgs[4];
    if (rawArgs[5] && !rawArgs[5].startsWith('--')) options.theme = rawArgs[5];
  }

  return options;
}

function loadResource(fileName) {
  const candidates = [
    path.join(__dirname, '..', 'resources', fileName),
    path.join(__dirname, 'resources', fileName),
    path.join(process.cwd(), '..', 'skill', 'resources', fileName),
    path.join(process.cwd(), 'skill', 'resources', fileName),
    path.join(process.cwd(), 'resources', fileName),
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (err) {
        console.warn(`[WARN] Failed to parse ${p}:`, err.message);
      }
    }
  }
  return null;
}

function findProjectRoots(explicitTarget) {
  if (explicitTarget) {
    const resolved = path.resolve(explicitTarget);
    if (fs.existsSync(resolved)) return [resolved];
  }

  const roots = [];
  const cwd = process.cwd();

  // If cwd contains Next.js src app/lib
  if (fs.existsSync(path.join(cwd, 'src', 'app')) || fs.existsSync(path.join(cwd, 'src', 'lib'))) {
    roots.push(cwd);
  }

  // Check template subfolder
  const templateDir = path.join(cwd, 'template');
  if (fs.existsSync(path.join(templateDir, 'src', 'app')) && !roots.includes(templateDir)) {
    roots.push(templateDir);
  }

  // Check airwallex-site-template subfolder
  const airwallexDir = path.join(cwd, 'airwallex-site-template');
  if (fs.existsSync(path.join(airwallexDir, 'src', 'app')) && !roots.includes(airwallexDir)) {
    roots.push(airwallexDir);
  }

  // Check adjacent template folder from script location
  const adjacentTemplate = path.resolve(__dirname, '..', '..', 'template');
  if (fs.existsSync(path.join(adjacentTemplate, 'src', 'app')) && !roots.includes(adjacentTemplate)) {
    roots.push(adjacentTemplate);
  }

  if (roots.length === 0) {
    roots.push(cwd);
  }

  return roots;
}

function generatePolicyPages(projectRoot, business) {
  const policiesDir = path.join(projectRoot, 'src', 'app', 'policies');

  const policies = [
    {
      slug: 'privacy',
      title: 'Privacy Policy',
      getter: 'getPrivacyPolicy',
      icon: 'ShieldCheck',
      badge: 'Data Protection & Privacy',
      desc: `Privacy Policy and data protection practices for ${business.name}.`,
    },
    {
      slug: 'terms',
      title: 'Terms of Service',
      getter: 'getTermsConditions',
      icon: 'FileText',
      badge: 'Commercial Terms',
      desc: `Terms and conditions of service governing engagements with ${business.name}.`,
    },
    {
      slug: 'refund',
      title: 'Refund & Cancellation Policy',
      getter: 'getRefundPolicy',
      icon: 'RefreshCw',
      badge: 'Consumer Protection & Billing',
      desc: `Refund and cancellation terms for products and services provided by ${business.name}.`,
    },
    {
      slug: 'shipping',
      title: 'Shipping & Delivery Policy',
      getter: 'getShippingPolicy',
      icon: 'Truck',
      badge: 'Fulfillment & Logistics',
      desc: `Digital provisioning and physical delivery policy for ${business.name}.`,
    },
  ];

  for (const pol of policies) {
    const pageDir = path.join(policiesDir, pol.slug);
    const pagePath = path.join(pageDir, 'page.tsx');

    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const componentName = `${pol.slug.charAt(0).toUpperCase() + pol.slug.slice(1)}PolicyPage`;
    const pageContent = `'use client';

import Link from 'next/link';
import { ArrowLeft, ${pol.icon}, Building2, MapPin, Mail, Phone } from 'lucide-react';
import { BUSINESS, ${pol.getter} } from '@/lib/constants';

export default function ${componentName}() {
  const policyText = ${pol.getter}(BUSINESS);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
              {BUSINESS.shortName.charAt(0)}
            </div>
            <span className="font-bold text-sm text-foreground">{BUSINESS.name}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-4 border border-border">
              <${pol.icon} className="h-3.5 w-3.5 text-primary" />
              <span>${pol.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              ${pol.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Effective Date: January 1, 2026 · Last Updated: August 1, 2026
            </p>
          </div>

          {/* Policy Card Container */}
          <div className="card-elevated rounded-2xl p-6 sm:p-10 border border-border bg-card">
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {policyText}
            </div>

            {/* Statutory Corporate Details Bar */}
            <div className="mt-10 pt-6 border-t border-border/80 grid sm:grid-cols-2 gap-4 text-xs text-muted-foreground bg-muted/30 p-4 rounded-xl">
              <div className="flex items-start gap-2.5">
                <Building2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">{BUSINESS.name}</div>
                  <div>Company Registration No.: {BUSINESS.registrationNumber}</div>
                  <div>Governing Law: {BUSINESS.governingLaw}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Registered Office Address</div>
                  <div>{BUSINESS.address}</div>
                  <div className="mt-1 flex items-center gap-3">
                    <a href={\`mailto:\${BUSINESS.email}\`} className="text-primary hover:underline">
                      {BUSINESS.email}
                    </a>
                    <span>·</span>
                    <a href={\`tel:\${BUSINESS.phone}\`} className="hover:text-foreground">
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Navigation Footer Links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="font-medium text-foreground">Policies:</span>
              <Link href="/policies/privacy" className="hover:text-primary transition-colors underline">Privacy</Link>
              <span>·</span>
              <Link href="/policies/terms" className="hover:text-primary transition-colors underline">Terms</Link>
              <span>·</span>
              <Link href="/policies/refund" className="hover:text-primary transition-colors underline">Refunds</Link>
              <span>·</span>
              <Link href="/policies/shipping" className="hover:text-primary transition-colors underline">Delivery</Link>
            </div>
            <Link href="/" className="hover:text-foreground inline-flex items-center gap-1 font-medium">
              Return to Homepage →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="border-t border-border bg-muted/20 py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-5xl mx-auto px-4">
          &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. Registered in {BUSINESS.governingLaw}.
        </div>
      </footer>
    </div>
  );
}
`;

    fs.writeFileSync(pagePath, pageContent, 'utf8');
    console.log(`[OK] Generated policy page: ${pagePath}`);
  }
}

function main() {
  const options = parseArgs();

  const companyName = options.company || 'Vantage Cloud Technologies Limited';
  const shortName = options.shortName || companyName.split(' ')[0];
  const regNo = options.regNo || '76891245';
  const address = options.address || 'Suite 2408, Two IFC, Central, Hong Kong';
  const domain = options.domain || 'vantagecloud.io';
  const email = options.email || `contact@${domain.replace(/^www\./, '')}`;
  const phone = options.phone || '+852 3008 5890';
  const governingLaw = options.governingLaw || 'Hong Kong SAR';
  const archetypeId = options.archetype || 'tech-cloud-devops';
  const themeId = options.theme || 'indigo-enterprise';
  const formspreeId = options.formspree || '';

  console.log(`\n⚡ Initializing Site Customization Engine...`);
  console.log(`   Entity:    ${companyName} (${regNo})`);
  console.log(`   Domain:    ${domain}`);
  console.log(`   Archetype: ${archetypeId}`);
  console.log(`   Theme:     ${themeId}`);
  if (formspreeId) {
    console.log(`   Formspree: ${formspreeId}`);
  }
  console.log('');

  const archetypes = loadResource('archetypes.json') || {};
  const themes = loadResource('themes.json') || {};

  const archetype = archetypes[archetypeId] || archetypes['tech-cloud-devops'] || {
    name: 'Enterprise Cloud & DevOps',
    hero: {
      badge: 'Enterprise Cloud Architecture',
      headline: 'Mission-Critical Cloud Infrastructure',
      accentText: 'Engineered for Scale',
      subtitle: 'We architect high-availability Kubernetes clusters, automated multi-cloud CI/CD pipelines, and zero-downtime migration strategies for high-growth enterprises.',
      primaryCta: 'Schedule Architecture Review',
      secondaryCta: 'Explore Service Packages',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
      trustBadges: ['99.99% Uptime SLA Guarantee', 'AWS & GCP Certified', 'Zero-Downtime Deployment'],
    },
    stats: [
      { value: '99.99%', label: 'Infrastructure Uptime SLA' },
      { value: '500+', label: 'Production Clusters Deployed' },
      { value: '< 15min', label: 'Incident Response Time' },
      { value: '45%', label: 'Average Cloud Spend Reduction' },
    ],
    bentoFeatures: [
      {
        title: 'Automated Multi-Cloud CI/CD',
        description: 'Deterministic, immutable deployment pipelines with automated canary releases, automated testing gates, and instant rollback safety.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        badge: 'Automation',
      },
      {
        title: 'Kubernetes & Service Mesh Mesh',
        description: 'Production-hardened service meshes with Istio and Cilium for secure, zero-trust microservice communication.',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
        badge: 'Orchestration',
      },
      {
        title: '24/7 SRE & Threat Telemetry',
        description: 'Continuous Prometheus and Grafana observability with automated self-healing triggers and anomaly detection.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        badge: 'Observability',
      },
    ],
    offerings: [
      {
        id: 'cloud-audit',
        name: 'Cloud Infrastructure & Security Audit',
        price: 1499,
        description: 'Complete architecture deep dive, cost optimization report, and threat surface vulnerability mapping.',
        features: [
          'Full AWS / GCP architecture review',
          'Cost optimization analysis (FinOps)',
          'Security & IAM gap assessment',
          'Actionable Terraform remediation roadmap',
          'Executive summary & technical report',
        ],
        popular: false,
      },
      {
        id: 'devops-acceleration',
        name: 'DevOps & CI/CD Pipeline Modernization',
        price: 3899,
        description: 'Turnkey implementation of end-to-end GitOps pipelines, container orchestration, and staging environments.',
        features: [
          'Automated GitHub Actions / GitLab CI pipelines',
          'Kubernetes cluster configuration & Helm charts',
          'Infrastructure as Code (Terraform / OpenTofu)',
          'Staging & preview deployment automation',
          '3 months dedicated engineering support',
        ],
        popular: true,
      },
      {
        id: 'enterprise-sre',
        name: '24/7 Managed Cloud & SRE Partnership',
        price: 7499,
        description: 'Complete outsourced Site Reliability Engineering with guaranteed 15-minute SLA and disaster recovery.',
        features: [
          '24/7/365 active monitoring & on-call SRE',
          '99.99% uptime guarantee with SLA credits',
          'Continuous disaster recovery & backup drills',
          'Monthly cost governance & optimization',
          'Dedicated Lead DevOps Architect',
        ],
        popular: false,
      },
    ],
    testimonials: [
      {
        name: 'Alexander Hayes',
        role: 'CTO, Vantage FinTech Group',
        text: 'The cloud architecture overhaul reduced our server costs by 42% while handling 10x traffic spikes during our Series B launch without a single hiccup.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      },
      {
        name: 'Marcus Vance',
        role: 'VP of Engineering, CloudStream Labs',
        text: 'Their GitOps implementation turned our fragile 4-hour deployment cycle into a reliable 6-minute automated release process.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
    ],
    faqs: [
      {
        q: 'What cloud providers and infrastructure stacks do you support?',
        a: 'We specialize in AWS, Google Cloud Platform (GCP), Microsoft Azure, and hybrid on-premise Kubernetes clusters running on bare-metal hardware.',
      },
      {
        q: 'How is payment handled and what are your billing terms?',
        a: 'We accept corporate bank wire transfers, major credit/debit cards, and payment via invoice. Fixed-scope audits are billed upfront, while managed services are billed monthly with SLA guarantees.',
      },
      {
        q: 'Do you sign non-disclosure agreements (NDAs) and transfer full IP?',
        a: 'Yes. All engagements include mutual NDAs prior to discovery, and all code, Terraform configurations, and deliverables are 100% transferred to your company upon completion.',
      },
    ],
  };

  const theme = themes[themeId] || themes['indigo-enterprise'] || {
    name: 'Indigo Enterprise',
    fontSans: "var(--font-geist-sans), 'Plus Jakarta Sans', system-ui, sans-serif",
    fontDisplay: "'Plus Jakarta Sans', system-ui, sans-serif",
    colors: {
      primary: 'oklch(0.48 0.24 275)',
      primaryHover: 'oklch(0.42 0.24 275)',
      primaryForeground: 'oklch(0.99 0 0)',
      background: 'oklch(0.99 0.003 260)',
      foreground: 'oklch(0.14 0.03 260)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.14 0.03 260)',
      muted: 'oklch(0.96 0.008 260)',
      mutedForeground: 'oklch(0.50 0.02 260)',
      accent: 'oklch(0.95 0.025 275)',
      accentForeground: 'oklch(0.35 0.15 275)',
      border: 'oklch(0.92 0.008 260)',
      ring: 'oklch(0.48 0.24 275)',
    },
    borderRadius: '0.75rem',
  };

  const businessData = {
    name: companyName,
    shortName,
    registrationNumber: regNo,
    address,
    email,
    phone,
    governingLaw,
    website: domain,
    ...(formspreeId ? { formspreeId } : {}),
  };

  // Resolve target project roots
  const projectRoots = findProjectRoots(options.target);

  for (const projectRoot of projectRoots) {
    console.log(`📁 Applying configuration to: ${projectRoot}`);

    // 1. Write src/lib/constants.ts
    const constantsPath = path.join(projectRoot, 'src', 'lib', 'constants.ts');
    const constantsContent = `export interface BusinessInfo {
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

export const BUSINESS: BusinessInfo = ${JSON.stringify(businessData, null, 2)};

export const FORMSPREE_ID: string = ${JSON.stringify(formspreeId)};

export const HERO: HeroInfo = ${JSON.stringify(archetype.hero, null, 2)};

export const STATS: StatItem[] = ${JSON.stringify(archetype.stats, null, 2)};

export const BENTO_FEATURES: BentoFeature[] = ${JSON.stringify(archetype.bentoFeatures, null, 2)};

export const OFFERINGS: OfferingItem[] = ${JSON.stringify(archetype.offerings, null, 2)};

export const TESTIMONIALS: TestimonialItem[] = ${JSON.stringify(archetype.testimonials, null, 2)};

export const FAQS: FaqItem[] = ${JSON.stringify(archetype.faqs, null, 2)};

/* ============================================================
   POLICY TEXT GENERATORS (Airwallex Fully Compliant)
   ============================================================ */
export function getPrivacyPolicy(b: BusinessInfo = BUSINESS): string {
  return \`
# Privacy Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

This Privacy Policy describes how **\${b.name}** ("we," "our," or "us"), registered in \${b.governingLaw} (Registration No. \${b.registrationNumber}), collects, uses, and protects your personal information when you visit our website (\${b.website}) or engage our services.

## 1. Information We Collect
- **Contact Details:** Name, business email, telephone number, job title, and company name.
- **Billing Information:** Invoicing address, tax identification numbers, and payment details processed via secure, PCI-DSS compliant payment gateways.
- **Technical Telemetry:** IP address, browser type, device identifiers, and website usage telemetry collected via secure cookies.

## 2. How We Use Your Information
- To deliver, maintain, and optimize our professional services and deliverables.
- To execute contracts, invoice services, and comply with statutory financial auditing obligations in \${b.governingLaw}.
- To communicate project milestones, service updates, and security notices.

## 3. Data Protection & Security
We employ industry-standard 256-bit SSL encryption, role-based access control (RBAC), and SOC2-compliant cloud storage to safeguard your data against unauthorized access, alteration, or disclosure.

## 4. Third-Party Disclosures
We do not sell, rent, or trade your personal data. Data is shared strictly with essential service partners bound by strict confidentiality agreements.

## 5. Your Rights
Under applicable data protection laws, you have the right to access, rectify, or request deletion of your personal information. Contact our Data Protection Officer at **\${b.email}**.

## 6. Contact Information
**\${b.name}**  
Business Registration No.: \${b.registrationNumber}  
Registered Address: \${b.address}  
Email: \${b.email} | Phone: \${b.phone}
\`;
}

export function getTermsConditions(b: BusinessInfo = BUSINESS): string {
  return \`
# Terms and Conditions of Service

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

These Terms and Conditions ("Terms") constitute a legally binding agreement between the client ("you") and **\${b.name}** ("we," "us"), registered under the laws of \${b.governingLaw} (Registration No. \${b.registrationNumber}).

## 1. Services & Deliverables
We provide professional technology and business services as described in the service tier or agreed Scope of Work (SOW). All deliverables are created to professional commercial standards.

## 2. Payment Terms
- All fees are quoted in standard currency (USD/HKD/EUR) as indicated on our website.
- Payments may be remitted via corporate bank transfer, credit card, or authorized invoice gateway.
- Invoices are due upon receipt unless agreed otherwise in writing.

## 3. Intellectual Property Rights
Upon full payment of all fees due, all custom code, configurations, and deliverables developed specifically for the client shall become the exclusive intellectual property of the client.

## 4. Limitation of Liability
To the maximum extent permitted by the laws of \${b.governingLaw}, our maximum aggregate liability arising out of or related to our services shall not exceed the total fees paid by the client in the preceding three (3) months.

## 5. Governing Law & Jurisdiction
These Terms shall be governed by and construed in accordance with the laws of **\${b.governingLaw}**. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of \${b.governingLaw}.

## 6. Contact Information
**\${b.name}**  
Registration No.: \${b.registrationNumber}  
Address: \${b.address}  
Email: \${b.email} | Phone: \${b.phone}
\`;
}

export function getRefundPolicy(b: BusinessInfo = BUSINESS): string {
  return \`
# Refund and Cancellation Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

At **\${b.name}**, we are committed to delivering the highest caliber of service. This policy outlines our refund and cancellation terms in accordance with consumer protection standards and payment card network requirements.

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
Please email **\${b.email}** with your Order ID, invoice number, and reason for the request. Our management team responds within 2 business days.

**\${b.name}**  
Registration No.: \${b.registrationNumber}  
Address: \${b.address}
\`;
}

export function getShippingPolicy(b: BusinessInfo = BUSINESS): string {
  return \`
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
For questions regarding digital provisioning or parcel dispatch, contact **\${b.email}** or call **\${b.phone}**.

**\${b.name}**  
Registration No.: \${b.registrationNumber}  
Address: \${b.address}
\`;
}
`;

    if (fs.existsSync(path.dirname(constantsPath))) {
      fs.writeFileSync(constantsPath, constantsContent, 'utf8');
      console.log(`[OK] Successfully wrote: ${constantsPath}`);
    } else {
      console.warn(`[WARN] Target directory not found: ${path.dirname(constantsPath)}`);
    }

    // 2. Write src/app/globals.css with full Untitled UI theme & font tokens
    const globalsCssPath = path.join(projectRoot, 'src', 'app', 'globals.css');
    const c = theme.colors;
    const fontSansToken = theme.fontSans || "var(--font-geist-sans), 'Plus Jakarta Sans', system-ui, sans-serif";
    const fontDisplayToken = theme.fontDisplay || fontSansToken;

    const globalsCssContent = `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
  --font-display: var(--font-display);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-badge: var(--radius-badge);
  --radius-button: var(--radius-button);
  --radius-card: var(--radius-card);
}

:root {
  --radius: ${theme.borderRadius || '0.75rem'};
  --radius-badge: ${theme.radiusBadge || '9999px'};
  --radius-button: ${theme.radiusButton || '0.5rem'};
  --radius-card: ${theme.radiusCard || '0.75rem'};
  --font-sans: ${fontSansToken};
  --font-display: ${fontDisplayToken};
  --ring-subtle: 0 0 0 1px var(--border);
  --background: ${c.background};
  --foreground: ${c.foreground};
  --card: ${c.card};
  --card-foreground: ${c.cardForeground};
  --popover: ${c.card};
  --popover-foreground: ${c.cardForeground};
  --primary: ${c.primary};
  --primary-foreground: ${c.primaryForeground};
  --secondary: ${c.muted};
  --secondary-foreground: ${c.foreground};
  --muted: ${c.muted};
  --muted-foreground: ${c.mutedForeground};
  --accent: ${c.accent};
  --accent-foreground: ${c.accentForeground};
  --destructive: oklch(0.577 0.245 27.325);
  --border: ${c.border};
  --input: ${c.border};
  --ring: ${c.ring};
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-family: var(--font-sans);
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  h1, h2, h3, h4, h5, h6, .font-display {
    font-family: var(--font-display);
  }
}

/* ========== Untitled UI Core Utilities ========== */
.ring-subtle {
  box-shadow: var(--ring-subtle, 0 0 0 1px var(--border));
}

.card-elevated {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-card, 0.75rem);
  box-shadow: 
    0 1px 3px 0 rgba(0, 0, 0, 0.25),
    0 1px 2px -1px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.12);
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-elevated:hover {
  border-color: color-mix(in oklch, var(--border) 70%, var(--primary) 30%);
  box-shadow: 
    0 12px 28px -6px rgba(0, 0, 0, 0.4),
    0 8px 12px -6px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.dot-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-badge, 9999px);
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--secondary);
  color: var(--secondary-foreground);
  border: 1px solid var(--border);
}

.dot-indicator {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: var(--radius-badge, 9999px);
  background: var(--primary);
}
`;

    if (fs.existsSync(path.dirname(globalsCssPath))) {
      fs.writeFileSync(globalsCssPath, globalsCssContent, 'utf8');
      console.log(`[OK] Successfully wrote: ${globalsCssPath}`);
    }

    // 3. Update src/app/layout.tsx: safe string escaping, font token connection & metadata cleanup
    const layoutPath = path.join(projectRoot, 'src', 'app', 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const pageTitle = `${companyName} | ${archetype.name}`;
      const pageDesc = archetype.hero.subtitle;
      const keywordsList = [
        shortName,
        companyName,
        archetype.name,
        ...(archetype.hero.trustBadges || []),
        ...(archetype.bentoFeatures ? archetype.bentoFeatures.map((f) => f.badge || f.title) : []),
        'enterprise solutions',
        'official website',
      ];

      const cleanLayoutContent = `import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: ${JSON.stringify(pageTitle)},
  description: ${JSON.stringify(pageDesc)},
  keywords: ${JSON.stringify(keywordsList, null, 4)},
  authors: [{ name: ${JSON.stringify(companyName)} }],
  openGraph: {
    title: ${JSON.stringify(pageTitle)},
    description: ${JSON.stringify(pageDesc)},
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={\`\${geistSans.variable} \${geistMono.variable} antialiased bg-background text-foreground\`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
`;

      fs.writeFileSync(layoutPath, cleanLayoutContent, 'utf8');
      console.log(`[OK] Updated SEO, font tokens & metadata in: ${layoutPath}`);
    }

    // 4. Automatically generate the 4 dedicated /policies/* page files
    generatePolicyPages(projectRoot, businessData);
  }

  console.log(`\n🎉 Site customization complete! All details successfully injected.\n`);
}

main();
