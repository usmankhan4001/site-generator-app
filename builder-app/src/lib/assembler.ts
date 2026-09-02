import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { BusinessDetails, HeroInfo, OfferingItem } from '@/types/builder';
import { ARCHETYPES } from './data/archetypes';
import { THEMES } from './data/themes';

export interface PuckBlock {
  type: string;
  props: Record<string, any>;
  [key: string]: any;
}

export interface PuckPageData {
  content?: PuckBlock[];
  root?: {
    props?: Record<string, any>;
    [key: string]: any;
  };
  zones?: Record<string, any>;
  [key: string]: any;
}

export type PuckMultiPageTree = Record<string, PuckPageData>;

export interface AssembleTemplateOptions {
  business: BusinessDetails;
  archetypeId: string;
  themeId: string;
  customHero?: Partial<HeroInfo>;
  customOfferings?: OfferingItem[];
  outputDir?: string;
  onLog?: (message: string, level?: 'info' | 'warn' | 'error' | 'success') => void;
  /** Active Puck multi-page data tree (pages mapped by route or slug, e.g. '/', '/about', '/services', '/contact') */
  puckData?: PuckMultiPageTree | any;
  /** Explicit structured page definitions */
  pages?: Record<string, any>;
  /** Direct custom code overrides for specific relative file paths */
  customPages?: Record<string, string>;
}

// ============================================================================
// Puck Data Extraction Helpers
// ============================================================================

function extractPuckHero(puckPage?: any): Partial<HeroInfo> | undefined {
  if (!puckPage?.content || !Array.isArray(puckPage.content)) return undefined;
  const block = puckPage.content.find((b: any) => b?.type === 'Hero')?.props;
  if (!block) return undefined;
  return {
    badge: block.badge,
    headline: block.headline,
    accentText: block.accentText,
    subtitle: block.subtitle,
    primaryCta: block.primaryCta,
    secondaryCta: block.secondaryCta,
    image: block.image,
    trustBadges: Array.isArray(block.trustBadges)
      ? block.trustBadges.map((t: any) => (typeof t === 'string' ? t : t?.text || ''))
      : undefined,
  };
}

function extractPuckOfferings(puckPage?: any): OfferingItem[] | undefined {
  if (!puckPage?.content || !Array.isArray(puckPage.content)) return undefined;
  const block = puckPage.content.find((b: any) => b?.type === 'Offerings')?.props;
  if (!block?.items || !Array.isArray(block.items)) return undefined;
  return block.items.map((it: any, idx: number) => ({
    id: it.id || `offering-${idx + 1}`,
    name: it.name || 'Commercial Package',
    price: Number(it.price) || 299,
    description: it.description || '',
    features: Array.isArray(it.features) ? it.features : [],
    popular: Boolean(it.popular),
    tag: it.tag,
  }));
}

function extractPuckStats(puckPage?: any) {
  if (!puckPage?.content || !Array.isArray(puckPage.content)) return undefined;
  const block = puckPage.content.find((b: any) => b?.type === 'Stats')?.props;
  if (!block?.items || !Array.isArray(block.items)) return undefined;
  return block.items.map((s: any) => ({
    value: String(s.value || ''),
    label: String(s.label || ''),
  }));
}

function extractPuckBento(puckPage?: any) {
  if (!puckPage?.content || !Array.isArray(puckPage.content)) return undefined;
  const block = puckPage.content.find((b: any) => b?.type === 'Bento')?.props;
  if (!block?.items || !Array.isArray(block.items)) return undefined;
  return block.items.map((bf: any) => ({
    title: String(bf.title || ''),
    description: String(bf.description || ''),
    image: String(bf.image || ''),
    badge: String(bf.badge || 'Feature'),
  }));
}

function extractPuckTestimonials(puckPage?: any) {
  if (!puckPage?.content || !Array.isArray(puckPage.content)) return undefined;
  const block = puckPage.content.find((b: any) => b?.type === 'Testimonials')?.props;
  if (!block?.items || !Array.isArray(block.items)) return undefined;
  return block.items.map((t: any) => ({
    name: String(t.name || ''),
    role: String(t.role || ''),
    text: String(t.text || ''),
    rating: Number(t.rating) || 5,
    avatar: String(t.avatar || ''),
  }));
}

function extractPuckFaqs(puckPage?: any) {
  if (!puckPage?.content || !Array.isArray(puckPage.content)) return undefined;
  const block = puckPage.content.find((b: any) => b?.type === 'FAQ')?.props;
  if (!block?.items || !Array.isArray(block.items)) return undefined;
  return block.items.map((f: any) => ({
    q: String(f.q || f.question || ''),
    a: String(f.a || f.answer || ''),
  }));
}

// ============================================================================
// Core Multi-Page Assembler Implementation
// ============================================================================

export async function assembleTemplate(options: AssembleTemplateOptions): Promise<string> {
  const {
    business,
    archetypeId,
    themeId,
    customHero,
    customOfferings,
    puckData = {},
    pages = {},
    customPages = {},
    onLog = () => {},
  } = options;

  const log = (msg: string, level: 'info' | 'warn' | 'error' | 'success' = 'info') => {
    onLog(msg, level);
  };

  log('Locating base Untitled UI template files in workspace...', 'info');

  // Find template directory
  const rootDir = path.resolve(process.cwd(), '..');
  const templateDirCandidates = [
    path.join(rootDir, 'template'),
    path.join(rootDir, 'airwallex-site-template'),
    path.join(process.cwd(), 'template'),
    path.join(process.cwd(), '..', 'template'),
  ];

  let sourceTemplateDir = '';
  for (const candidate of templateDirCandidates) {
    if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'package.json'))) {
      sourceTemplateDir = candidate;
      break;
    }
  }

  if (!sourceTemplateDir) {
    throw new Error('Base template directory not found in workspace.');
  }

  log(`Using base template source: ${sourceTemplateDir}`, 'info');

  // Create workspace directory in OS temp or custom output
  const tempDirName = `site-build-${business.domain.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}`;
  const workspaceDir = options.outputDir || path.join(os.tmpdir(), tempDirName);

  if (!fs.existsSync(workspaceDir)) {
    fs.mkdirSync(workspaceDir, { recursive: true });
  }

  log(`Assembling customized codebase at: ${workspaceDir}...`, 'info');

  // 1. Copy base template files (excluding heavy folders)
  const excludeFolders = new Set(['.next', 'node_modules', 'tests', 'tool-results', '.git']);

  function copyRecursive(src: string, dest: string) {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      if (excludeFolders.has(entry.name)) continue;
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyRecursive(sourceTemplateDir, workspaceDir);
  log('Template shell and components copied cleanly.', 'info');

  // 2. Resolve Archetype & Theme
  const archetype = ARCHETYPES[archetypeId] || ARCHETYPES['tech-cloud-devops'];
  const theme = THEMES[themeId] || THEMES['indigo-enterprise'];

  // 3. Resolve active Puck multi-page data tree
  log('Parsing active Puck multi-page data tree & content blocks...', 'info');
  const homePuckPage = puckData['/'] || puckData['home'] || pages['/'] || pages['home'];
  const aboutPuckPage = puckData['/about'] || puckData['about'] || pages['/about'] || pages['about'];
  const servicesPuckPage = puckData['/services'] || puckData['services'] || pages['/services'] || pages['services'];
  const catalogPuckPage = puckData['/catalog'] || puckData['catalog'] || pages['/catalog'] || pages['catalog'];
  const contactPuckPage = puckData['/contact'] || puckData['contact'] || pages['/contact'] || pages['contact'];

  // Merge custom hero and offerings from options, Puck tree, or archetype
  const puckHero = extractPuckHero(homePuckPage);
  const finalHero = { ...archetype.hero, ...(puckHero || {}), ...(customHero || {}) };

  const puckOfferings = extractPuckOfferings(servicesPuckPage || homePuckPage);
  const finalOfferings =
    customOfferings && customOfferings.length > 0
      ? customOfferings
      : puckOfferings && puckOfferings.length > 0
      ? puckOfferings
      : archetype.offerings;

  const puckStats = extractPuckStats(homePuckPage);
  const finalStats = puckStats && puckStats.length > 0 ? puckStats : archetype.stats;

  const puckBento = extractPuckBento(homePuckPage);
  const finalBento = puckBento && puckBento.length > 0 ? puckBento : archetype.bentoFeatures;

  const puckTestimonials = extractPuckTestimonials(homePuckPage);
  const finalTestimonials = puckTestimonials && puckTestimonials.length > 0 ? puckTestimonials : archetype.testimonials;

  const puckFaqs = extractPuckFaqs(homePuckPage);
  const finalFaqs = puckFaqs && puckFaqs.length > 0 ? puckFaqs : archetype.faqs;

  // 4. Generate src/lib/constants.ts with full Airwallex KYC specifications & policies
  log('Synthesizing Airwallex compliance constants, KYC metadata, and policy text...', 'info');
  const constantsContent = `// Auto-generated by Site Builder Studio
export interface BusinessInfo {
  name: string;
  shortName: string;
  registrationNumber: string;
  address: string;
  email: string;
  phone: string;
  domain: string;
  governingLaw: string;
  currency: string;
  industry: string;
  archetypeId: string;
  themeId: string;
  website?: string;
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
  tag?: string;
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
  name: ${JSON.stringify(business.companyName)},
  shortName: ${JSON.stringify(business.shortName || business.companyName.split(' ')[0])},
  registrationNumber: ${JSON.stringify(business.registrationNumber)},
  address: ${JSON.stringify(business.address)},
  email: ${JSON.stringify(business.email)},
  phone: ${JSON.stringify(business.phone)},
  domain: ${JSON.stringify(business.domain)},
  governingLaw: ${JSON.stringify(business.governingLaw)},
  currency: ${JSON.stringify(business.currency || 'USD')},
  industry: ${JSON.stringify(archetype.industry)},
  archetypeId: ${JSON.stringify(archetype.id)},
  themeId: ${JSON.stringify(theme.id)},
  website: ${JSON.stringify(business.domain)},
};

export const FORMSPREE_ID: string = "";

export const HERO: HeroInfo = ${JSON.stringify(finalHero, null, 2)};

export const STATS: StatItem[] = ${JSON.stringify(finalStats, null, 2)};

export const BENTO_FEATURES: BentoFeature[] = ${JSON.stringify(finalBento, null, 2)};

export const OFFERINGS: OfferingItem[] = ${JSON.stringify(finalOfferings, null, 2)};

export const TESTIMONIALS: TestimonialItem[] = ${JSON.stringify(finalTestimonials, null, 2)};

export const FAQS: FaqItem[] = ${JSON.stringify(finalFaqs, null, 2)};

/* ============================================================
   POLICY TEXT GENERATORS (Airwallex Fully Compliant)
   ============================================================ */
export function getPrivacyPolicy(b: BusinessInfo = BUSINESS): string {
  return \`
# Privacy Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

This Privacy Policy describes how **\${b.name}** ("we," "our," or "us"), registered in \${b.governingLaw} (Registration No. \${b.registrationNumber}), collects, uses, and protects your personal information when you visit our website (\${b.domain}) or engage our services.

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
- All fees are quoted in standard currency (\${b.currency || 'USD'}) as indicated on our website.
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

  const libDir = path.join(workspaceDir, 'src', 'lib');
  if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });
  fs.writeFileSync(path.join(libDir, 'constants.ts'), constantsContent, 'utf8');

  // 5. Generate src/app/globals.css
  log(`Compiling Untitled UI design tokens for theme '${theme.name}'...`, 'info');
  const c = theme.colors;
  const globalsCssContent = `@import "tailwindcss";

:root {
  --primary: ${c.primary};
  --primary-hover: ${c.primaryHover};
  --primary-foreground: ${c.primaryForeground};
  --background: ${c.background};
  --foreground: ${c.foreground};
  --card: ${c.card};
  --card-foreground: ${c.cardForeground};
  --muted: ${c.muted};
  --muted-foreground: ${c.mutedForeground};
  --accent: ${c.accent};
  --accent-foreground: ${c.accentForeground};
  --border: ${c.border};
  --ring: ${c.ring};

  --radius-badge: 9999px;
  --radius-button: 0.5rem;
  --radius-card: ${theme.borderRadius};
  --font-sans: ${theme.fontSans};
  --font-display: ${theme.fontDisplay};
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}

.card-elevated {
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px 0 rgba(16, 24, 40, 0.05), 0 1px 2px -1px rgba(16, 24, 40, 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-elevated:hover {
  box-shadow: 0 10px 25px -5px rgba(16, 24, 40, 0.08), 0 8px 10px -6px rgba(16, 24, 40, 0.04);
  transform: translateY(-2px);
}

.dot-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-badge);
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--accent);
  color: var(--accent-foreground);
  border: 1px solid var(--border);
}

.dot-indicator {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background: var(--primary);
}
`;

  const appDir = path.join(workspaceDir, 'src', 'app');
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });
  fs.writeFileSync(path.join(appDir, 'globals.css'), globalsCssContent, 'utf8');

  // 6. Ensure prisma/schema.prisma & src/lib/db.ts
  log('Setting up SQLite Prisma schema & database client...', 'info');
  const prismaDir = path.join(workspaceDir, 'prisma');
  if (!fs.existsSync(prismaDir)) fs.mkdirSync(prismaDir, { recursive: true });

  const prismaSchemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Inquiry {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  company   String?
  subject   String?
  message   String
  status    String   @default("NEW")
  createdAt DateTime @default(now())
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  company   String?
  subject   String?
  message   String
  createdAt DateTime @default(now())
}

model OrderLead {
  id           String   @id @default(cuid())
  customerName String
  email        String
  offeringName String
  amount       Float?
  currency     String   @default("USD")
  status       String   @default("PENDING")
  createdAt    DateTime @default(now())
}
`;
  fs.writeFileSync(path.join(prismaDir, 'schema.prisma'), prismaSchemaContent, 'utf8');

  const dbClientContent = `import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

export const db = prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
`;
  fs.writeFileSync(path.join(libDir, 'db.ts'), dbClientContent, 'utf8');

  // Ensure .env has DATABASE_URL
  const envPath = path.join(workspaceDir, '.env');
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, 'DATABASE_URL="file:./dev.db"\n', 'utf8');
  }

  // 7. Ensure src/app/api/contact/route.ts exists
  log('Configuring contact logging route with SQLite Prisma & Formspree support...', 'info');
  const apiContactDir = path.join(appDir, 'api', 'contact');
  if (!fs.existsSync(apiContactDir)) fs.mkdirSync(apiContactDir, { recursive: true });

  const apiContactRouteContent = `import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, subject, formspreeEndpoint: overrideEndpoint } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // 1. Save inquiry into SQLite database
    let recordId = '';
    try {
      const inquiry = await prisma.inquiry.create({
        data: {
          name: name ? String(name).trim() : "Anonymous",
          email: String(email).trim(),
          phone: phone ? String(phone).trim() : null,
          company: company ? String(company).trim() : (subject ? String(subject).trim() : null),
          subject: subject ? String(subject).trim() : null,
          message: String(message).trim(),
          status: "NEW",
        },
      });
      recordId = inquiry.id;
    } catch (inqErr) {
      console.warn("Notice saving inquiry record:", inqErr);
    }

    try {
      if ((prisma as any).contactSubmission) {
        const sub = await (prisma as any).contactSubmission.create({
          data: {
            name: name ? String(name).trim() : "Anonymous",
            email: String(email).trim(),
            phone: phone ? String(phone).trim() : null,
            company: company ? String(company).trim() : null,
            subject: subject ? String(subject).trim() : null,
            message: String(message).trim(),
          },
        });
        if (!recordId) recordId = sub.id;
      }
    } catch (subErr) {
      // ignore
    }

    // 2. Optionally forward to Formspree if configured
    let forwardedToFormspree = false;
    const formspreeEndpoint =
      overrideEndpoint ||
      process.env.FORMSPREE_ENDPOINT ||
      (process.env.FORMSPREE_ID ? \`https://formspree.io/f/\${process.env.FORMSPREE_ID}\` : null) ||
      (process.env.NEXT_PUBLIC_FORMSPREE_ID ? \`https://formspree.io/f/\${process.env.NEXT_PUBLIC_FORMSPREE_ID}\` : null);

    if (formspreeEndpoint) {
      try {
        const formspreeRes = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            company,
            subject,
            message,
            inquiryId: recordId,
          }),
        });

        if (formspreeRes.ok) {
          forwardedToFormspree = true;
        }
      } catch (fErr) {
        console.error("Formspree forward notice:", fErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: { id: recordId || \`INQ-\${Date.now()}\` },
      forwardedToFormspree,
    }, { status: 201 });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Internal server error while saving contact form." },
      { status: 500 }
    );
  }
}
`;
  fs.writeFileSync(path.join(apiContactDir, 'route.ts'), apiContactRouteContent, 'utf8');

  // 8. Ensure Multi-Page Next.js 15 pages are assembled:
  // - src/app/page.tsx (Home)
  // - src/app/about/page.tsx (About)
  // - src/app/services/page.tsx (Services)
  // - src/app/catalog/page.tsx (Catalog)
  // - src/app/contact/page.tsx (Contact)
  // - src/app/policies/privacy/page.tsx
  // - src/app/policies/terms/page.tsx
  // - src/app/policies/refund/page.tsx
  // - src/app/policies/shipping/page.tsx

  log('Assembling full multi-page routes (/about, /services, /catalog, /contact, /policies/*)...', 'info');

  const writeCustomOrTemplate = (relPath: string, defaultSourcePath: string) => {
    const dest = path.join(workspaceDir, relPath);
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    if (customPages[relPath]) {
      fs.writeFileSync(dest, customPages[relPath], 'utf8');
      return;
    }

    const candidate = path.join(sourceTemplateDir, relPath);
    if (fs.existsSync(candidate)) {
      fs.copyFileSync(candidate, dest);
    } else if (fs.existsSync(defaultSourcePath)) {
      fs.copyFileSync(defaultSourcePath, dest);
    }
  };

  writeCustomOrTemplate('src/app/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'page.tsx'));
  writeCustomOrTemplate('src/app/about/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'about', 'page.tsx'));
  writeCustomOrTemplate('src/app/services/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'services', 'page.tsx'));
  writeCustomOrTemplate('src/app/catalog/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'catalog', 'page.tsx'));
  writeCustomOrTemplate('src/app/contact/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'contact', 'page.tsx'));
  writeCustomOrTemplate('src/app/policies/privacy/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'policies', 'privacy', 'page.tsx'));
  writeCustomOrTemplate('src/app/policies/terms/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'policies', 'terms', 'page.tsx'));
  writeCustomOrTemplate('src/app/policies/refund/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'policies', 'refund', 'page.tsx'));
  writeCustomOrTemplate('src/app/policies/shipping/page.tsx', path.join(sourceTemplateDir, 'src', 'app', 'policies', 'shipping', 'page.tsx'));

  // 9. Write Hardened Production Dockerfile with dumb-init and Prisma generate
  log('Synthesizing hardened production Dockerfile with dumb-init & Prisma generate...', 'info');
  const hardenedDockerfile = `# Base image with Alpine and libc6-compat for native dependency compatibility
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Stage 1: Dependencies installer
FROM base AS deps
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* bun.lockb* bun.lock* ./
RUN \\
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \\
  elif [ -f package-lock.json ]; then npm ci; \\
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \\
  elif [ -f bun.lockb ] || [ -f bun.lock ]; then corepack enable bun && bun install --frozen-lockfile; \\
  else npm install; \\
  fi

# Stage 2: Application Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Disable Next.js telemetry & set production environment for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js standalone application
RUN \\
  if [ -f yarn.lock ]; then yarn run build; \\
  elif [ -f package-lock.json ]; then npm run build; \\
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \\
  elif [ -f bun.lockb ] || [ -f bun.lock ]; then corepack enable bun && bun run build; \\
  else npm run build; \\
  fi

# Stage 3: Minimal Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install dumb-init for proper signal handling and PID 1 init process
RUN apk add --no-cache dumb-init

# Create a non-root system user and group for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and public directory
COPY --from=builder /app/public ./public

# Set permissions for Next.js prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Leverage Next.js standalone output traces
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Container healthcheck on port 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
`;

  fs.writeFileSync(path.join(workspaceDir, 'Dockerfile'), hardenedDockerfile, 'utf8');

  // Ensure .dockerignore
  const dockerignoreContent = `.git
.next
node_modules
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env.local
.env.development.local
.env.test.local
`;
  fs.writeFileSync(path.join(workspaceDir, '.dockerignore'), dockerignoreContent, 'utf8');

  log('Multi-page template assembly complete with all statutory KYC compliance layers.', 'success');
  return workspaceDir;
}
