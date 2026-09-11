'use client';

import { useState, type ChangeEvent } from 'react';
import { ContinueButton, Slide, SlideHeading } from '@/components/onboarding/primitives';
import { cn } from '@/lib/utils';

/** Everything from `BusinessInfo` the details step can populate, minus the
 * name/shortName already captured on the first step. */
export interface BusinessDetails {
  email: string;
  phone: string;
  registeredAddress: string;
  website: string;
  supportHours: string;
  legalName: string;
  registrationNumber: string;
  jurisdiction: string;
  governingLaw: string;
  taxId: string;
  asNumber: string;
}

export const EMPTY_BUSINESS_DETAILS: BusinessDetails = {
  email: '',
  phone: '',
  registeredAddress: '',
  website: '',
  supportHours: '',
  legalName: '',
  registrationNumber: '',
  jurisdiction: '',
  governingLaw: '',
  taxId: '',
  asNumber: '',
};

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value);
  const fieldClass =
    'w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/10';

  return (
    <label className="block text-left">
      <span className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-primary">*</span>}
      </span>
      {textarea ? (
        <textarea value={value} onChange={handle} placeholder={placeholder} rows={2} className={cn(fieldClass, 'resize-none')} />
      ) : (
        <input value={value} onChange={handle} placeholder={placeholder} className={fieldClass} />
      )}
    </label>
  );
}

export function BusinessDetailsStep({
  value,
  onChange,
  onContinue,
}: {
  value: BusinessDetails;
  onChange: (partial: Partial<BusinessDetails>) => void;
  onContinue: () => void;
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const canContinue = Boolean(value.email.trim() && value.phone.trim() && value.registeredAddress.trim());

  return (
    <Slide>
      <div className="space-y-2">
        <SlideHeading>Your business details</SlideHeading>
        <p className="text-center text-sm text-muted-foreground">
          These populate your contact info, footer and legal pages throughout the site.
        </p>
      </div>

      <div className="max-h-[52vh] space-y-4 overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Contact email" required value={value.email} onChange={(v) => onChange({ email: v })} placeholder="hello@acme.com" />
          <Field label="Phone" required value={value.phone} onChange={(v) => onChange({ phone: v })} placeholder="+1 (555) 010-2938" />
          <div className="sm:col-span-2">
            <Field
              label="Business address"
              required
              value={value.registeredAddress}
              onChange={(v) => onChange({ registeredAddress: v })}
              placeholder="123 Main St, Austin, TX 78701"
              textarea
            />
          </div>
          <Field label="Website (optional)" value={value.website} onChange={(v) => onChange({ website: v })} placeholder="acme.com" />
          <Field
            label="Support hours (optional)"
            value={value.supportHours}
            onChange={(v) => onChange({ supportHours: v })}
            placeholder="Mon–Fri, 9am–6pm"
          />
        </div>

        <details
          open={advancedOpen}
          onToggle={(e) => setAdvancedOpen((e.target as HTMLDetailsElement).open)}
          className="rounded-xl border border-border bg-white/60 px-4 py-3 open:pb-4"
        >
          <summary className="cursor-pointer select-none text-sm font-medium text-foreground">
            Legal &amp; registration details (optional)
          </summary>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Legal / registered name" value={value.legalName} onChange={(v) => onChange({ legalName: v })} placeholder="Acme Roofing LLC" />
            <Field
              label="Registration number"
              value={value.registrationNumber}
              onChange={(v) => onChange({ registrationNumber: v })}
              placeholder="EIN / company no."
            />
            <Field label="Jurisdiction" value={value.jurisdiction} onChange={(v) => onChange({ jurisdiction: v })} placeholder="State of Texas, USA" />
            <Field
              label="Governing law"
              value={value.governingLaw}
              onChange={(v) => onChange({ governingLaw: v })}
              placeholder="Auto-filled from jurisdiction"
            />
            <Field label="Tax ID" value={value.taxId} onChange={(v) => onChange({ taxId: v })} placeholder="Optional" />
            <Field label="AS number" value={value.asNumber} onChange={(v) => onChange({ asNumber: v })} placeholder="Hosting / infra only" />
          </div>
        </details>
      </div>

      <div className="flex justify-center">
        <ContinueButton onClick={onContinue} disabled={!canContinue}>
          Generate my site
        </ContinueButton>
      </div>
    </Slide>
  );
}
