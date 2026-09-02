import type { Metadata } from 'next';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import {
  FileText,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Scale,
  CreditCard,
  Briefcase,
  PackageCheck,
  ShieldAlert,
  Code2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `Terms & Conditions of Service | ${BUSINESS.name}`,
  description: `Official terms of service, engagement scope, milestone delivery, and commercial agreement framework for ${BUSINESS.name} under ${BUSINESS.governingLaw} governing law.`,
  openGraph: {
    title: `Terms of Service | ${BUSINESS.name}`,
    description: `Legally binding commercial terms and service agreements for ${BUSINESS.name}.`,
    type: 'website',
  },
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();
  const effectiveDate = `January 1, ${currentYear}`;
  const lastUpdated = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const termSections = [
    {
      id: 'agreement',
      title: '1. Agreement & Legal Parties',
      icon: Scale,
      summary: 'Legally binding contract between client and the registered entity.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            These Terms and Conditions of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement entered into by and between the purchasing entity or individual (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and <strong className="text-foreground">{BUSINESS.name}</strong> (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), registered under the laws of <strong className="text-foreground">{BUSINESS.governingLaw}</strong> (Registration No. <strong className="text-foreground">{BUSINESS.registrationNumber}</strong>).
          </p>
          <p>
            By ordering digital services, accepting an executed Scope of Work (SOW), issuing a purchase order, or purchasing physical hardware from our platform (<strong className="text-foreground">{BUSINESS.website}</strong>), you confirm that you possess full legal authority to bind your organization to these Terms.
          </p>
        </div>
      ),
    },
    {
      id: 'scope-sow',
      title: '2. Services Scope, Milestones & Deliverables (SOW Framework)',
      icon: Briefcase,
      summary: 'Professional IT consulting, cloud compute provisioning, and milestone acceptance criteria.',
      content: (
        <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
          <p>
            For digital engineering, managed cloud infrastructure, and consulting services, work is executed pursuant to the selected tier or a mutually signed Scope of Work (SOW):
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
              <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                <span>Digital & Cloud Provisioning</span>
              </div>
              <ul className="space-y-1.5 text-xs">
                <li>• Cloud VPS and compute instances are provisioned within 1 to 24 hours of payment authorization.</li>
                <li>• Service availability is backed by a 99.99% infrastructure uptime Service Level Agreement (SLA).</li>
                <li>• Root credentials and API keys are issued via encrypted administrative channels.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/60 space-y-2">
              <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>SOW Milestones & Acceptance</span>
              </div>
              <ul className="space-y-1.5 text-xs">
                <li>• Deliverables are delivered in scheduled phases with documented milestone specifications.</li>
                <li>• The Client has fourteen (14) calendar days from milestone submission to review and test deliverables.</li>
                <li>• Milestone approval is deemed automatic if no written punch list is submitted within 14 days.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hardware-terms',
      title: '3. Physical Equipment & Hardware Terms',
      icon: PackageCheck,
      summary: 'Title transfer, freight inspection, and Return Merchandise Authorization (RMA) terms.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            Where an engagement includes physical hardware, server appliances, or peripheral network equipment:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Title & Risk of Loss:</strong> Title to hardware and risk of loss transfers to the Client upon carrier dispatch under Incoterms DAP / DDP as agreed on the commercial invoice.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Inspection Window:</strong> The Client must inspect delivered parcels within seven (7) business days of physical receipt and report any shipping damage or defect.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Hardware Returns & RMA:</strong> Physical returns must be processed under our official RMA policy within 30 days of receipt in original, unopened condition.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'payment',
      title: '4. Commercial Fees, Invoicing & Settlement',
      icon: CreditCard,
      summary: 'Multi-currency settlement via Airwallex, VAT handling, and payment terms.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            All fees are quoted in standard currency (USD/HKD/SGD/EUR) as indicated during checkout. Payment processing is facilitated via authorized, PCI-DSS Level 1 compliant gateway partners including Airwallex and corporate wire settlement:
          </p>
          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-lg border border-border bg-card/40 space-y-1">
              <div className="font-bold text-foreground text-xs">Payment Due Dates</div>
              <p className="text-[11px] leading-relaxed">One-time and milestone invoices are payable upon presentation unless net-30 terms are formally agreed in writing.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-border bg-card/40 space-y-1">
              <div className="font-bold text-foreground text-xs">Late Surcharges</div>
              <p className="text-[11px] leading-relaxed">Overdue amounts accrue statutory interest at 1.5% per month or the statutory maximum under {BUSINESS.governingLaw}.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-border bg-card/40 space-y-1">
              <div className="font-bold text-foreground text-xs">Tax Compliance</div>
              <p className="text-[11px] leading-relaxed">Fees are exclusive of applicable local withholding, sales tax, or VAT, which are billed in accordance with applicable tax statutes.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ip-rights',
      title: '5. Intellectual Property Rights & Ownership',
      icon: FileText,
      summary: '100% full transfer of custom deliverables upon receipt of full payment.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            <strong className="text-foreground">Full IP Ownership:</strong> Upon receipt of full and final payment for custom development or SOW deliverables, all right, title, and interest in and to custom code, configurations, technical documentation, and tailored architectures are assigned entirely to the Client.
          </p>
          <p className="text-xs">
            The Company retains ownership of its pre-existing proprietary tools, libraries, and core infrastructure frameworks (&ldquo;Background IP&rdquo;), and grants the Client a perpetual, royalty-free, worldwide license to utilize Background IP embedded within custom deliverables.
          </p>
        </div>
      ),
    },
    {
      id: 'liability',
      title: '6. Limitation of Liability & SLA Warranty',
      icon: ShieldAlert,
      summary: 'Strict liability cap equal to fees paid in preceding three (3) months.',
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            To the maximum extent permitted under the laws of <strong className="text-foreground">{BUSINESS.governingLaw}</strong>:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm pl-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Consequential Damages:</strong> Neither party shall be liable for indirect, incidental, punitive, or consequential damages, including loss of profits, data corruption, or business interruption.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Aggregate Liability Cap:</strong> In all circumstances, our maximum aggregate financial liability arising under this agreement shall be strictly capped at the total amount paid by the Client to the Company in the three (3) months preceding the claim event.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'jurisdiction',
      title: '7. Governing Law & Dispute Resolution',
      icon: Scale,
      summary: `Exclusive jurisdiction under the competent courts of ${BUSINESS.governingLaw}.`,
      content: (
        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
          <p>
            These Terms, all underlying SOW agreements, and any non-contractual obligations arising out of or in connection with them shall be governed by and construed in accordance with the substantive laws of <strong className="text-foreground">{BUSINESS.governingLaw}</strong>, without regard to conflict of law principles.
          </p>
          <p className="text-xs">
            Any dispute, controversy, or claim arising out of or relating to these Terms shall first be submitted to good-faith executive escalation for thirty (30) days. Failing amicable resolution, disputes shall be submitted to the exclusive jurisdiction of the competent courts in {BUSINESS.governingLaw}.
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
              className="px-3 py-1.5 rounded-md bg-primary/10 text-primary font-semibold transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/policies/refund"
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
              <Scale className="h-3.5 w-3.5" />
              <span>Commercial Terms & Service Agreement</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Terms and Conditions
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              These terms govern the procurement of digital cloud infrastructure, bespoke software engineering deliverables, and physical hardware appliances from {BUSINESS.name}.
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
                <span className="font-semibold text-foreground">Governing Law: </span>
                <span>{BUSINESS.governingLaw}</span>
              </div>
              <div className="hidden sm:inline text-border">•</div>
              <div>
                <span className="font-semibold text-foreground">Entity Reg No: </span>
                <span>{BUSINESS.registrationNumber}</span>
              </div>
            </div>
          </div>

          {/* Quick Notice Summary Box */}
          <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 text-xs text-foreground leading-relaxed space-y-2">
            <div className="font-bold flex items-center gap-2 text-primary">
              <FileText className="h-4 w-4" />
              <span>Binding Legal Standard</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              All commercial engagements, SOW milestone sign-offs, and physical hardware shipments are governed under clear intellectual property transfer agreements, 99.99% SLA availability guarantees, and the statutory legal framework of {BUSINESS.governingLaw}.
            </p>
          </div>

          {/* Table of Contents Pill Bar */}
          <div className="p-4 rounded-xl border border-border bg-card/60">
            <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5">
              Terms Outline
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {termSections.map((sec) => (
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
            {termSections.map((sec) => {
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
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Statutory Inquiries</span>
              <h2 className="text-xl font-bold text-foreground">8. Legal Notices & Corporate Contacts</h2>
              <p className="text-xs text-muted-foreground">
                Formal legal notices, contract escalations, and commercial inquiries must be delivered to:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                <div className="font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>Contracting Entity</span>
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
                  <span>Contact Channels</span>
                </div>
                <div className="text-muted-foreground space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>Legal Email: </span>
                    <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline font-medium">
                      {BUSINESS.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Telephone: </span>
                    <a href={`tel:${BUSINESS.phone}`} className="text-foreground hover:text-primary font-medium">
                      {BUSINESS.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    <span>Portal: </span>
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
            <Link href="/policies/refund" className="hover:text-foreground transition-colors">
              Refund & Cancellation
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
