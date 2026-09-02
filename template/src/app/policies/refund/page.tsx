import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import {
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  Package,
  CreditCard,
  Briefcase,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy | ${BUSINESS.name}`,
  description: `Official refund and cancellation policy for ${BUSINESS.name}. Covers digital service milestone refunds, cloud provisioning guarantees, and physical hardware RMA return procedures.`,
  openGraph: {
    title: `Refund Policy | ${BUSINESS.name}`,
    description: `Disclosures on refunds, milestone reviews, and physical RMA returns for ${BUSINESS.name}.`,
    type: 'website',
  },
};

export default function RefundPolicyPage() {
  const currentYear = new Date().getFullYear();
  const effectiveDate = `January 1, ${currentYear}`;
  const lastUpdated = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const refundSections = [
    {
      id: 'overview',
      title: '1. Policy Framework & Core Commitment',
      icon: ShieldCheck,
      summary: 'Transparent, fair consumer protection aligned with payment card network standards.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            At <strong className="text-foreground">{BUSINESS.name}</strong> (Registration No. <strong className="text-foreground">{BUSINESS.registrationNumber}</strong>), registered under the laws of <strong className="text-foreground">{BUSINESS.governingLaw}</strong>, we are committed to delivering the highest caliber of technology infrastructure, engineering excellence, and hardware reliability.
          </p>
          <p>
            This Refund and Cancellation Policy clearly defines our terms for digital services, Scope of Work (SOW) milestones, cloud compute subscriptions, and physical equipment returns in accordance with card network guidelines (Visa/Mastercard/Airwallex) and statutory consumer rights in {BUSINESS.governingLaw}.
          </p>
        </div>
      ),
    },
    {
      id: 'digital-sow',
      title: '2. Professional Services & SOW Milestone Refunds',
      icon: Briefcase,
      summary: '100% pre-kickoff refund, 14-day milestone review period, and prorated unperformed scope.',
      content: (
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p>
            For custom development, consulting sprints, and bespoke architecture deliverables:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
              <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Pre-Kickoff Cancellation (100% Refund)</span>
              </div>
              <p className="text-xs">
                If the Client requests cancellation in writing prior to project kickoff or sprint commencement, the Client is entitled to a <strong>100% full refund</strong> of all deposit fees paid.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
              <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>14-Day Milestone Review Guarantee</span>
              </div>
              <p className="text-xs">
                Upon delivery of any documented project milestone, the Client has fourteen (14) calendar days to inspect the deliverable. If deliverables fail to conform to the agreed SOW specifications, we provide expedited remediation at no cost or a prorated refund for uncompleted scope.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'subscriptions',
      title: '3. Managed Cloud Retainers & Subscriptions',
      icon: Clock,
      summary: 'Flexible recurring cancellation terms and SLA credit guarantees.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <ul className="space-y-2 text-xs sm:text-sm pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Monthly Retainers:</strong> Monthly managed cloud retainers and support subscriptions may be cancelled at any time by providing written notice thirty (30) days prior to the next billing cycle.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Annual Contracts:</strong> Annual service commitments cancelled within the first thirty (30) days of execution are eligible for a prorated refund of unused months.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>SLA Credit Guarantee:</strong> Cloud compute availability disruptions falling below 99.99% trigger automatic SLA service credits directly applied to your account.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'physical-rma',
      title: '4. Physical Hardware & Product Returns (RMA Process)',
      icon: Package,
      summary: '30-day return window, Return Merchandise Authorization (RMA) workflow, and DOA replacements.',
      content: (
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p>
            For physical hardware appliances, server units, and networking peripherals:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg border border-border bg-card/40 space-y-1">
              <div className="font-bold text-foreground text-xs">30-Day Return Window</div>
              <p className="text-[11px] leading-relaxed">Physical items may be returned within thirty (30) calendar days from the confirmed courier delivery date.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-border bg-card/40 space-y-1">
              <div className="font-bold text-foreground text-xs">RMA Number Required</div>
              <p className="text-[11px] leading-relaxed">Prior to return dispatch, clients must obtain an authorized RMA number from our support desk at {BUSINESS.email}.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-border bg-card/40 space-y-1">
              <div className="font-bold text-foreground text-xs">Free DOA Replacement</div>
              <p className="text-[11px] leading-relaxed">Defective or Dead-on-Arrival (DOA) units are picked up via prepaid express courier and replaced immediately.</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl border border-border bg-muted/40 text-xs space-y-1">
            <span className="font-semibold text-foreground">Return Eligibility Conditions:</span>
            <p className="text-muted-foreground leading-relaxed">
              Returned hardware must be in original, undamaged packaging with all serial numbers, cables, power adapters, and anti-tamper seals intact. Customized server builds configured with customer-requested non-standard components may be subject to a 15% restocking fee.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'timeline',
      title: '5. Processing Timeframe & Settlement Method',
      icon: CreditCard,
      summary: 'Approved refunds are credited back to original payment method within 5 to 10 business days.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            Once a refund or RMA claim is reviewed and approved by our management team:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Credit & Debit Cards:</strong> Refunded directly to the issuing card via Airwallex gateway within <strong>5 to 10 business days</strong> depending on your bank network.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Bank Wire Transfers:</strong> Remitted directly to the originating corporate bank account within <strong>3 to 5 business days</strong>.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'how-to-request',
      title: '6. How to Submit a Refund or RMA Claim',
      icon: FileCheck,
      summary: 'Step-by-step submission instructions for expedited 48-hour review.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            To initiate a service cancellation, milestone review, or physical hardware RMA claim, please email our support team with:
          </p>
          <ol className="space-y-1.5 text-xs list-decimal pl-5">
            <li>Your Order / Invoice Number and Company Name</li>
            <li>Specific service tier, milestone deliverable, or hardware serial number</li>
            <li>Detailed reason for cancellation or defect description with photo evidence (if physical hardware)</li>
          </ol>
          <p className="text-xs pt-1">
            Our finance and engineering desk reviews all inquiries within two (2) business days at{' '}
            <a href={`mailto:${BUSINESS.email}`} className="text-primary font-medium hover:underline">
              {BUSINESS.email}
            </a>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* ==================== POLICY HEADER / NAVIGATION ==================== */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-85 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-xs">
              {BUSINESS.shortName.charAt(0)}
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">{BUSINESS.name}</span>
          </Link>

          {/* Quick Cross-Policy Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
            <Link
              href="/policies/privacy"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/terms"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/policies/refund"
              className="px-3 py-1.5 rounded-md bg-primary/10 text-primary font-semibold transition-colors"
            >
              Refund Policy
            </Link>
            <Link
              href="/policies/shipping"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              Shipping Policy
            </Link>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border bg-card/60 hover:bg-accent shadow-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Site</span>
          </Link>
        </div>
      </header>

      {/* ==================== HERO SECTION (Untitled UI Typography) ==================== */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Badge & Title Header */}
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 shadow-xs">
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Consumer Assurance · Cancellation & Return Standards</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Refund & Cancellation Policy
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Transparent terms governing service cancellation, milestone review guarantees, subscription renewals, and physical equipment RMA returns with {BUSINESS.name}.
            </p>

            {/* Dynamic Metadata & Effective Date Card */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs text-muted-foreground border-t border-b border-border/70 py-3.5">
              <div>
                <span className="font-semibold text-foreground">Effective Date: </span>
                <span>{effectiveDate}</span>
              </div>
              <div className="hidden sm:inline text-border">•</div>
              <div>
                <span className="font-semibold text-foreground">Last Revised: </span>
                <span className="text-primary font-medium">{lastUpdated}</span>
              </div>
              <div className="hidden sm:inline text-border">•</div>
              <div>
                <span className="font-semibold text-foreground">Jurisdiction: </span>
                <span>{BUSINESS.governingLaw}</span>
              </div>
              <div className="hidden sm:inline text-border">•</div>
              <div>
                <span className="font-semibold text-foreground">Entity Reg No: </span>
                <span>{BUSINESS.registrationNumber}</span>
              </div>
            </div>
          </div>

          {/* Quick Highlights Summary Grid */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1">
              <span className="text-xs font-bold text-primary block">100% Pre-Kickoff Refund</span>
              <p className="text-[11px] text-muted-foreground">Full refund if cancelled before project initiation or sprint start.</p>
            </div>
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1">
              <span className="text-xs font-bold text-primary block">14-Day Milestone Review</span>
              <p className="text-[11px] text-muted-foreground">Rework guarantee or prorated refund for uncompleted SOW scope.</p>
            </div>
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1">
              <span className="text-xs font-bold text-primary block">30-Day Hardware RMA</span>
              <p className="text-[11px] text-muted-foreground">Physical returns in original packaging with free DOA replacement.</p>
            </div>
          </div>

          {/* Table of Contents Pill Bar */}
          <div className="p-4 rounded-xl border border-border bg-card/60">
            <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
              Policy Sections
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {refundSections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="px-2.5 py-1 rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* ==================== SEMANTIC ARTICLE SECTIONS ==================== */}
          <article className="space-y-8">
            {refundSections.map((sec) => {
              const IconComp = sec.icon;
              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="p-6 sm:p-8 rounded-2xl border border-border bg-card card-elevated scroll-mt-24 space-y-4"
                >
                  <div className="flex items-start gap-3.5 pb-2 border-b border-border/60">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                        {sec.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">{sec.summary}</p>
                    </div>
                  </div>

                  <div className="pt-2">{sec.content}</div>
                </section>
              );
            })}
          </article>

          {/* ==================== STATUTORY ENTITY CONTACT CARD ==================== */}
          <section className="p-6 sm:p-8 rounded-2xl border border-border bg-muted/30 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Support Desk</span>
              <h2 className="text-xl font-bold text-foreground">7. Claims & Customer Assistance</h2>
              <p className="text-xs text-muted-foreground">
                To submit a refund or RMA return request, please contact our administrative offices:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>Operating Entity</span>
                </div>
                <div className="text-muted-foreground space-y-0.5">
                  <div className="font-medium text-foreground">{BUSINESS.name}</div>
                  <div>Registration Number: {BUSINESS.registrationNumber}</div>
                  <div>Jurisdiction: {BUSINESS.governingLaw}</div>
                  <div className="pt-1 flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{BUSINESS.address}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>Claims Email & Contact</span>
                </div>
                <div className="text-muted-foreground space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>Refunds Desk: </span>
                    <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline font-medium">
                      {BUSINESS.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Support Line: </span>
                    <a href={`tel:${BUSINESS.phone}`} className="text-foreground hover:text-primary font-medium">
                      {BUSINESS.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    <span>Domain: </span>
                    <span className="font-mono text-[11px] text-foreground">{BUSINESS.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-border bg-muted/20 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            &copy; {currentYear} {BUSINESS.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/policies/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/policies/terms" className="hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/policies/shipping" className="hover:text-foreground transition-colors">
              Shipping & Delivery
            </Link>
            <span>•</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
