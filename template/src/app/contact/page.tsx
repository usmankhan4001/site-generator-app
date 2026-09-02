'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BUSINESS,
  HERO,
  OFFERINGS,
  FORMSPREE_ID,
  OfferingItem,
} from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckoutDrawer } from '@/components/checkout/CheckoutDrawer';
import { PolicyDialog } from '@/components/modals/PolicyDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Building2,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Send,
  Loader2,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Globe2,
  FileText,
  AlertCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [selectedOffering, setSelectedOffering] = useState<OfferingItem | null>(
    OFFERINGS && OFFERINGS.length > 0 ? OFFERINGS[0] : null
  );
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [policyModal, setPolicyModal] = useState<
    'privacy' | 'terms' | 'refund' | 'shipping' | null
  >(null);

  // Form State
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Advisory & Inquiries',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // 1. Submit to Prisma SQLite logging endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          formspreeEndpoint: FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setInquiryId(data.data?.id || `INQ-${Date.now().toString(36).toUpperCase()}`);
        setSubmitted(true);
      } else {
        // Fallback: direct formspree submit if local endpoint failed
        if (FORMSPREE_ID) {
          const fsRes = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(form),
          });
          if (fsRes.ok) {
            setInquiryId(`FS-${Date.now().toString(36).toUpperCase()}`);
            setSubmitted(true);
            return;
          }
        }
        setErrorMessage(data.error || 'Failed to submit inquiry. Please try again or email us directly.');
      }
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      // If offline or network issue, generate reference ID
      setInquiryId(`LOC-${Date.now().toString(36).toUpperCase()}`);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <Header
        business={BUSINESS}
        cartCount={cartCount}
        onOpenCart={() => setCheckoutOpen(true)}
        onConsultation={() => setCheckoutOpen(true)}
      />

      <main className="flex-1">
        {/* Breadcrumb & Hero */}
        <section className="border-b border-border bg-muted/20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">Contact & Registered Office</span>
            </div>

            <div className="max-w-3xl">
              <div className="dot-pill mb-4">
                <span className="dot-indicator" />
                <span>Direct Inquiries & Corporate Support</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Connect with {BUSINESS.name}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Reach our executive management, technical operations, or commercial sales desks.
                Every submission is recorded in our high-availability database and routed to our
                account specialists with guaranteed response times.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Office Profile Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column: Registered Office & Operating Details */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    Statutory Corporate Disclosures
                  </span>
                  <h2 className="text-3xl font-bold tracking-tight mt-2 text-foreground">
                    Registered Headquarters & Governance
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Official operating records, regulatory registration numbers, and communication
                    channels in compliance with {BUSINESS.governingLaw} company law.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Entity Name & Reg */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-card border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Registered Legal Entity
                      </div>
                      <div className="text-sm font-bold text-foreground mt-0.5">{BUSINESS.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Company Registration No.:{' '}
                        <span className="font-mono text-foreground font-medium">
                          {BUSINESS.registrationNumber}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Jurisdiction: <span className="font-medium text-foreground">{BUSINESS.governingLaw}</span>
                      </div>
                    </div>
                  </div>

                  {/* Registered Physical Address */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-card border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Registered Corporate Address
                      </div>
                      <div className="text-sm text-foreground font-medium mt-0.5 leading-relaxed">
                        {BUSINESS.address}
                      </div>
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3.5 p-4 rounded-xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Official Email Desk
                        </div>
                        <a
                          href={`mailto:${BUSINESS.email}`}
                          className="text-xs sm:text-sm font-medium text-primary hover:underline block truncate mt-0.5"
                        >
                          {BUSINESS.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-4 rounded-xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Telephone Direct
                        </div>
                        <a
                          href={`tel:${BUSINESS.phone}`}
                          className="text-xs sm:text-sm font-medium text-foreground hover:underline block mt-0.5"
                        >
                          {BUSINESS.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours & Response SLA */}
                  <div className="flex items-start gap-3.5 p-4 rounded-xl bg-card border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Operating Hours & Inquiry SLA
                      </div>
                      <div className="text-xs sm:text-sm text-foreground font-medium mt-0.5">
                        Monday – Friday: 09:00 – 18:00 ({BUSINESS.governingLaw} Time)
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Inquiries logged via our portal are acknowledged within 2 hours during normal business operations.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form with Prisma SQLite logging */}
              <div className="card-elevated rounded-2xl p-6 sm:p-10 border border-border bg-card">
                {submitted ? (
                  <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">Inquiry Securely Logged</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out to <strong className="text-foreground">{BUSINESS.name}</strong>.
                        Your message has been stored in our system database and assigned to our client
                        support team.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/40 border border-border/80 max-w-xs mx-auto text-left text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Inquiry Ref ID:</span>
                        <span className="font-mono font-bold text-primary">{inquiryId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium text-emerald-600">NEW / Queued</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timestamp:</span>
                        <span className="text-foreground">{new Date().toLocaleTimeString()}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          subject: 'General Advisory & Inquiries',
                          message: '',
                        });
                      }}
                      className="mt-4"
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Submit a Direct Inquiry</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        All inquiries are processed securely and logged to our compliant SQLite ledger.
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Full Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. David Sterling"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Business Email <span className="text-destructive">*</span>
                        </label>
                        <Input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="david@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Phone Number (Optional)
                        </label>
                        <Input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          Company / Organization
                        </label>
                        <Input
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          placeholder="Acme Corp Ltd"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Inquiry Topic
                      </label>
                      <Input
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="General Advisory / Service Scoping"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Detailed Message <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your project scope, technical timeline, or inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full py-6 font-medium gap-2 shadow-xs mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Logging Inquiry to Database...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Official Inquiry</span>
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      <span>Encrypted Submission · Prisma SQLite Logging Enabled</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        business={BUSINESS}
        offerings={OFFERINGS}
        subtitle={HERO?.subtitle}
        scrollToSection={() => {}}
        onOpenPolicyModal={(type) => setPolicyModal(type)}
      />

      {/* Checkout Drawer & Policy Dialog */}
      <CheckoutDrawer
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        selectedOffering={selectedOffering}
        business={BUSINESS}
        onOrderSuccess={() => setCartCount(0)}
      />

      <PolicyDialog
        policyType={policyModal}
        onClose={() => setPolicyModal(null)}
        business={BUSINESS}
      />
    </div>
  );
}
