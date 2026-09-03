'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import {
  Building2,
  Mail,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Send,
  Loader2,
} from 'lucide-react';
import { Button } from '@/site/ui/button';
import { Input } from '@/site/ui/input';
import { Textarea } from '@/site/ui/textarea';
import { cn } from '@/site/lib/cn';
import type { ContactPanelProps, SiteContent } from '@/site/schema';

type Status = 'idle' | 'loading' | 'success' | 'error';

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

/**
 * Two-column contact section ported from the template `ContactSection`. Left
 * column (optional) carries the registered entity, email, phone, support hours
 * and any offices. Right column is the form — it POSTs JSON to `/api/contact`
 * (same-origin) and only shows the success panel on a real `res.ok`.
 */
export default function ContactPanel({
  props,
  content,
}: {
  props: ContactPanelProps;
  content: SiteContent;
}) {
  const b = content.business;
  const {
    eyebrow = 'Direct Inquiries',
    title = 'Speak With Our Team',
    description = 'Have a question or a custom project scope? Connect directly with our team.',
    formVariant = 'standard',
    inquiryOptions,
    submitLabel = 'Submit Inquiry',
    showDetails = true,
    supportHours,
    offices,
  } = props;

  const hours =
    supportHours ?? b.supportHours ?? 'Monday – Friday: 09:00 - 18:00';
  const showCompany = formVariant !== 'standard';
  const companyRequired = formVariant === 'enterprise' || formVariant === 'noc';
  const showInquiry = !!inquiryOptions?.length;

  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: inquiryOptions?.[0] ?? '',
  };

  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState(emptyForm);

  const set =
    (key: keyof typeof form) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    if (companyRequired && !form.company) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: form.subject,
          message: form.message,
          inquiryType: form.inquiryType,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'grid gap-12 lg:gap-16 items-start',
            showDetails ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto',
          )}
        >
          {showDetails && (
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
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Registered Entity
                    </div>
                    <div className="text-sm font-bold text-foreground">{b.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Reg. No. {b.registrationNumber} · {b.registeredAddress}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Support &amp; Business Email
                    </div>
                    <a
                      href={`mailto:${b.email}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {b.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Telephone Line
                    </div>
                    <a
                      href={`tel:${b.phone}`}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {b.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Operating Hours
                    </div>
                    <div className="text-sm text-foreground">{hours}</div>
                  </div>
                </div>

                {offices?.length
                  ? offices.map((o, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 p-3.5 rounded-xl bg-muted/30 border border-border/60"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            {o.role ?? 'Office'}
                          </div>
                          <div className="text-sm font-bold text-foreground">
                            {o.city}
                            {o.facility ? ` · ${o.facility}` : ''}
                          </div>
                          {o.address ? (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {o.address}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          )}

          <div className="card-elevated rounded-2xl p-6 sm:p-8 border border-border/80 bg-card">
            {status === 'success' ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-foreground">Message Received</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                    Thank you for reaching out to {b.name}. Our team will review your
                    message and reply to{' '}
                    <span className="font-semibold text-foreground">{form.email}</span>{' '}
                    within 1 business day.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setForm(emptyForm);
                    setStatus('idle');
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
                  <Field label="Full Name *">
                    <Input
                      required
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Jane Doe"
                      className="mt-1"
                    />
                  </Field>
                  <Field label="Email Address *">
                    <Input
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="jane@company.com"
                      className="mt-1"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone">
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="+1 555 000 0000"
                      className="mt-1"
                    />
                  </Field>
                  {showCompany ? (
                    <Field label={companyRequired ? 'Company *' : 'Company'}>
                      <Input
                        required={companyRequired}
                        value={form.company}
                        onChange={set('company')}
                        placeholder="Company Ltd."
                        className="mt-1"
                      />
                    </Field>
                  ) : null}
                </div>

                {showInquiry ? (
                  <Field label="Nature of Inquiry">
                    <select
                      value={form.inquiryType}
                      onChange={set('inquiryType')}
                      className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    >
                      {inquiryOptions!.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>
                ) : null}

                <Field label="Subject">
                  <Input
                    value={form.subject}
                    onChange={set('subject')}
                    placeholder="Inquiry / Consultation"
                    className="mt-1"
                  />
                </Field>

                <Field label="Message *">
                  <Textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Describe your inquiry, requirements, or timeline..."
                    className="mt-1"
                  />
                </Field>

                {status === 'error' ? (
                  <p className="text-sm text-destructive">
                    Something went wrong sending your message. Please try again or
                    email{' '}
                    <a href={`mailto:${b.email}`} className="font-medium underline">
                      {b.email}
                    </a>
                    .
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full font-semibold h-11 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{submitLabel}</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
