'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Shield } from 'lucide-react';

export interface Contact19_FeedbackSurveyFormProps {
  badge?: string;
  headline?: string;
  description?: string;
  officeAddress?: string;
  email?: string;
  phone?: string;
  hours?: string;
}

export const Contact19_FeedbackSurveyForm: React.FC<Contact19_FeedbackSurveyFormProps> = ({
  badge = 'We Value You',
  headline = 'Product Feedback & CSAT Survey',
  description = 'Interactive star rating and qualitative feedback form with feedback loops.',
  officeAddress = 'Marina Bay Financial Centre Tower 2, Singapore 018983',
  email = 'operations@vantagecloud.io',
  phone = '+65 6812 9400',
  hours = 'Mon-Fri: 9:00 AM - 6:00 PM SGT',
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[var(--background,#ffffff)] text-[var(--foreground,#0f172a)] transition-colors border-b border-[var(--border,#e5e7eb)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary,#4f46e5)]/10 text-[var(--primary,#4f46e5)] border border-[var(--primary,#4f46e5)]/20">
                <Shield className="w-3.5 h-3.5" />
                {badge}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground,#0f172a)]">
              {headline}
            </h2>
            {description && (
              <p className="text-sm text-[var(--muted-foreground,#64748b)] leading-relaxed">
                {description}
              </p>
            )}

            <div className="pt-4 space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--primary,#4f46e5)] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[var(--foreground,#0f172a)]">
                    Registered Headquarters
                  </strong>
                  <span className="text-[var(--muted-foreground,#64748b)]">{officeAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[var(--primary,#4f46e5)] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[var(--foreground,#0f172a)]">
                    Official Inquiries
                  </strong>
                  <span className="text-[var(--muted-foreground,#64748b)]">{email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[var(--primary,#4f46e5)] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[var(--foreground,#0f172a)]">
                    Direct Telephone
                  </strong>
                  <span className="text-[var(--muted-foreground,#64748b)]">{phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[var(--primary,#4f46e5)] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-[var(--foreground,#0f172a)]">
                    Operating Hours
                  </strong>
                  <span className="text-[var(--muted-foreground,#64748b)]">{hours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Lead Router Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl border border-[var(--border,#e5e7eb)] bg-[var(--card,#ffffff)] shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-lg font-bold text-[var(--foreground,#0f172a)]">
                    Inquiry Dispatched Successfully
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground,#64748b)] max-w-sm mx-auto">
                    Your transmission has been logged with our underwriting and legal desk. An engineer will respond within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--foreground,#0f172a)] mb-1">
                        Full Legal Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jonathan Sterling"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border,#e5e7eb)] bg-[var(--background,#ffffff)] text-xs text-[var(--foreground,#0f172a)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary,#4f46e5)]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--foreground,#0f172a)] mb-1">
                        Corporate Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="j.sterling@enterprise.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border,#e5e7eb)] bg-[var(--background,#ffffff)] text-xs text-[var(--foreground,#0f172a)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary,#4f46e5)]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--foreground,#0f172a)] mb-1">
                      Department / Scope of Inquiry
                    </label>
                    <select className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border,#e5e7eb)] bg-[var(--background,#ffffff)] text-xs text-[var(--foreground,#0f172a)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary,#4f46e5)]/30">
                      <option>Commercial Sales & Architecture</option>
                      <option>Airwallex KYC & Underwriting Verification</option>
                      <option>Technical API & Webhook Support</option>
                      <option>Legal, Privacy & Compliance Inquiries</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--foreground,#0f172a)] mb-1">
                      Project Specifications
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline your transaction volume, currency settlement requirements, or timeline..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border,#e5e7eb)] bg-[var(--background,#ffffff)] text-xs text-[var(--foreground,#0f172a)] focus:outline-hidden focus:ring-2 focus:ring-[var(--primary,#4f46e5)]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary,#4f46e5)] text-[var(--primary-foreground,#ffffff)] text-xs sm:text-sm font-semibold hover:bg-[var(--primary-hover,#4338ca)] transition-colors shadow-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact19_FeedbackSurveyForm;
