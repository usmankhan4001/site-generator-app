'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
} from 'lucide-react';
import { BusinessInfo } from '@/lib/constants';

interface ContactSectionProps {
  business: BusinessInfo;
  formspreeEndpoint?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function ContactSection({
  business,
  formspreeEndpoint,
  eyebrow = 'Direct Inquiries',
  title = 'Speak With Our Advisory Team',
  description = 'Have a question or custom project scope? Connect directly with our team.',
}: ContactSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    if (formspreeEndpoint) {
      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setSubmitted(true);
        }
      } catch (err) {
        console.error('Form submission failed:', err);
      } finally {
        setLoading(false);
      }
    } else {
      // Standard stateful handler
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 600);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Office & Operating Details */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                {eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-3 text-foreground">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Entity Name & Reg */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Registered Entity
                  </div>
                  <div className="text-sm font-bold text-foreground">{business.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Reg. No. {business.registrationNumber} · {business.address}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Support & Business Email
                  </div>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {business.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Telephone Line
                  </div>
                  <a
                    href={`tel:${business.phone}`}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Operating Hours
                  </div>
                  <div className="text-sm text-foreground">
                    Monday – Friday: 09:00 - 18:00 (GMT+8)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Formspree-Ready Contact Form */}
          <Card className="card-elevated p-6 sm:p-8 border border-border/80 bg-card">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground">Message Received</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                    Thank you for reaching out to {business.name}. Our team will review your message and reply to <span className="font-semibold text-foreground">{form.email}</span> within 1 business day.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-foreground">
                  Send a Direct Message
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-foreground">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Inquiry / Consultation"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Message *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your inquiry, requirements, or timeline..."
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full font-semibold h-11 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
