'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BUSINESS,
  HERO,
  STATS,
  BENTO_FEATURES,
  OFFERINGS,
  OfferingItem,
} from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckoutDrawer } from '@/components/checkout/CheckoutDrawer';
import { PolicyDialog } from '@/components/modals/PolicyDialog';
import { Button } from '@/components/ui/button';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  Globe2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Briefcase,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';

export default function AboutPage() {
  const [selectedOffering, setSelectedOffering] = useState<OfferingItem | null>(
    OFFERINGS && OFFERINGS.length > 0 ? OFFERINGS[0] : null
  );
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [policyModal, setPolicyModal] = useState<
    'privacy' | 'terms' | 'refund' | 'shipping' | null
  >(null);

  const values = [
    {
      icon: ShieldCheck,
      title: 'Uncompromising Governance',
      description: `Strict regulatory compliance under ${BUSINESS.governingLaw}, institutional security standards, and zero-compromise client confidentiality.`,
    },
    {
      icon: Award,
      title: 'Engineering Rigor',
      description: 'Battle-tested architecture engineered for 99.99% availability, predictable performance, and verified commercial SLAs.',
    },
    {
      icon: Users,
      title: 'Client-Centric Partnership',
      description: 'Dedicated technical advisory and responsive account stewardship tailored to accelerating enterprise growth and operational resilience.',
    },
    {
      icon: Globe2,
      title: 'Global Scalability',
      description: 'Multi-region redundancy and cross-border capabilities built to expand frictionlessly across international jurisdictions.',
    },
  ];

  const leaders = [
    {
      name: 'Alexander Vance',
      role: 'Chief Executive Officer',
      bio: 'Over 18 years leading enterprise engineering and scalable infrastructure across Tier-1 tech conglomerates.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Solutions Architecture',
      bio: 'Former principal architect specializing in distributed high-availability systems, multi-cloud DevOps, and security auditing.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Marcus Chen',
      role: 'Director of Client Operations',
      bio: 'Oversees 24/7 client delivery, SLA guarantee enforcement, and statutory regulatory compliance frameworks.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Header Navigation */}
      <Header
        business={BUSINESS}
        cartCount={cartCount}
        onOpenCart={() => setCheckoutOpen(true)}
        onConsultation={() => setCheckoutOpen(true)}
      />

      <main className="flex-1">
        {/* Breadcrumb & Hero Header */}
        <section className="border-b border-border bg-muted/20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">About Us</span>
            </div>

            <div className="max-w-3xl">
              <div className="dot-pill mb-4">
                <span className="dot-indicator" />
                <span>Our Heritage & Vision</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Pioneering Excellence with Rigor, Integrity, and Proven Scale.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Founded to provide reliable, enterprise-grade capabilities to organizations
                worldwide, {BUSINESS.name} combines deep industry expertise with modern
                governance and uncompromising quality standards.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative & Inception Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span>The Company Story</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Built on Transparency, Precision, and Relentless Execution.
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  At <strong className="text-foreground">{BUSINESS.name}</strong>, we believe
                  sustainable business value comes from repeatable engineering standards, verified
                  performance, and crystal-clear accountability.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Operating under the regulatory governance of <strong className="text-foreground">{BUSINESS.governingLaw}</strong>,
                  our teams maintain rigorous compliance, PCI-DSS payment security, and continuous
                  quality assurance across every client engagement and commercial deliverable.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link href="/services">
                    <Button className="shadow-xs gap-2">
                      <span>Explore Services</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Contact Our Leadership</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Statutory Information Box */}
              <div className="card-elevated rounded-2xl p-8 border border-border bg-card space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{BUSINESS.name}</h3>
                    <p className="text-xs text-muted-foreground">Statutory Entity Profile</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t border-border text-sm">
                  <div className="flex justify-between py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Registration No.</span>
                    <span className="font-mono font-medium text-foreground">{BUSINESS.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Governing Jurisdiction</span>
                    <span className="font-medium text-foreground">{BUSINESS.governingLaw}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Official Domain</span>
                    <span className="font-mono text-primary font-medium">{BUSINESS.domain}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/60">
                    <span className="text-muted-foreground">Headquarters</span>
                    <span className="font-medium text-right text-foreground max-w-[60%]">{BUSINESS.address}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Official Desk</span>
                    <span className="font-medium text-foreground">{BUSINESS.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Bento Grid */}
        <section className="py-16 md:py-24 border-b border-border bg-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                Operating Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-foreground">
                Our Core Foundations
              </h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                The institutional tenets that drive our daily commitments, technical standards,
                and client relationships.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={i}
                    className="card-elevated rounded-2xl p-6 border border-border bg-card hover:border-primary/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-foreground text-lg mb-2">{v.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                Governance & Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 text-foreground">
                Executive Leadership
              </h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Experienced practitioners bringing decades of technical domain leadership,
                advisory acumen, and disciplined execution.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {leaders.map((leader, i) => (
                <div
                  key={i}
                  className="card-elevated rounded-2xl overflow-hidden border border-border bg-card"
                >
                  <div className="h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={leader.avatar}
                      alt={leader.name}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-bold text-foreground text-lg">{leader.name}</h3>
                    <p className="text-xs font-semibold text-primary">{leader.role}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Stats & Call to Action */}
        <section className="py-16 md:py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Ready to Partner with {BUSINESS.name}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base mb-8">
              Discover how our customized packages, dedicated SLAs, and institutional governance can
              support your goals today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services">
                <Button size="lg" className="shadow-xs gap-2">
                  <span>View Solutions & Pricing</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Schedule a Consultation
                </Button>
              </Link>
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
