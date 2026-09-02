'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Building2, MapPin, Mail, Phone } from 'lucide-react';
import { BUSINESS, getTermsConditions } from '@/lib/constants';

export default function TermsPolicyPage() {
  const policyText = getTermsConditions(BUSINESS);

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
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span>Commercial Terms</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Terms of Service
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
                    <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">
                      {BUSINESS.email}
                    </a>
                    <span>·</span>
                    <a href={`tel:${BUSINESS.phone}`} className="hover:text-foreground">
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
