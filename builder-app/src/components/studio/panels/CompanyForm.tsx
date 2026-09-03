'use client';

import { useStudio } from '@/store/studio';
import { PanelHeader, SectionLabel, TextField, TextArea } from './fields';
import { useJurisdictionPresets } from './useOptionalData';

export function CompanyForm() {
  const content = useStudio((s) => s.content);
  const updateBusiness = useStudio((s) => s.updateBusiness);
  const updateMeta = useStudio((s) => s.updateMeta);
  const setFormspreeId = useStudio((s) => s.setFormspreeId);
  const setAirwallexCheckoutUrl = useStudio((s) => s.setAirwallexCheckoutUrl);
  const mutate = useStudio((s) => s.mutate);
  const presets = useJurisdictionPresets();

  if (!content) return null;
  const b = content.business;

  return (
    <div className="space-y-6 p-4">
      <PanelHeader
        title="Company & compliance"
        hint="This appears in the footer legal bar, policy pages and the contact section — natural KYC, not a banner."
      />

      <div className="space-y-3">
        <SectionLabel>Brand</SectionLabel>
        <TextField
          label="Legal entity name"
          value={b.name}
          onChange={(v) => updateBusiness({ name: v })}
        />
        <TextField
          label="Short name"
          value={b.shortName}
          onChange={(v) => updateBusiness({ shortName: v })}
          hint="Used in casual copy, e.g. footer brand line."
        />
        <TextField
          label="Logo text"
          value={content.brand.logoText}
          onChange={(v) => mutate((d) => { d.brand.logoText = v; })}
          hint="Shown next to the logo mark in the header."
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>Registration</SectionLabel>

        {presets && presets.length ? (
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  updateBusiness({ jurisdiction: p.jurisdiction, governingLaw: p.governingLaw })
                }
                className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                title={p.regNumberFormat}
              >
                {p.label}
              </button>
            ))}
          </div>
        ) : null}

        <TextField
          label="Registration number"
          value={b.registrationNumber}
          onChange={(v) => updateBusiness({ registrationNumber: v })}
        />
        <TextField
          label="Jurisdiction"
          value={b.jurisdiction}
          onChange={(v) => updateBusiness({ jurisdiction: v })}
          placeholder="Singapore"
        />
        <TextField
          label="Governing law"
          value={b.governingLaw}
          onChange={(v) => updateBusiness({ governingLaw: v })}
          placeholder="the laws of Singapore"
        />
        <TextArea
          label="Registered address"
          value={b.registeredAddress}
          onChange={(v) => updateBusiness({ registeredAddress: v })}
          rows={2}
        />
        <TextField
          label="Tax / VAT ID"
          value={b.taxId}
          onChange={(v) => updateBusiness({ taxId: v || undefined })}
        />
        {content.source?.sector === 'hosting' || b.asNumber ? (
          <TextField
            label="AS Number"
            value={b.asNumber}
            onChange={(v) => updateBusiness({ asNumber: v || undefined })}
            placeholder="AS201432"
          />
        ) : null}
      </div>

      <div className="space-y-3">
        <SectionLabel>Contact</SectionLabel>
        <TextField
          label="Support email"
          value={b.email}
          onChange={(v) => updateBusiness({ email: v })}
          type="email"
        />
        <TextField
          label="Phone"
          value={b.phone}
          onChange={(v) => updateBusiness({ phone: v })}
        />
        <TextField
          label="Website"
          value={b.website}
          onChange={(v) => updateBusiness({ website: v })}
          placeholder="example.com"
          hint="No protocol — used for display and the domain field."
        />
        <TextField
          label="Support hours"
          value={b.supportHours}
          onChange={(v) => updateBusiness({ supportHours: v || undefined })}
          placeholder="Monday – Friday, 09:00–18:00 (GMT+8)"
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>Forms</SectionLabel>
        <TextField
          label="Formspree form ID"
          value={content.formspreeId}
          onChange={(v) => setFormspreeId(v || undefined)}
          placeholder="xbjnkyrq"
          hint="Optional — the contact form always posts to /api/contact; set this to also forward submissions to Formspree."
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>Payments</SectionLabel>
        <TextField
          label="Airwallex checkout URL"
          value={content.airwallexCheckoutUrl}
          onChange={(v) => setAirwallexCheckoutUrl(v || undefined)}
          placeholder="https://checkout.airwallex.com/..."
          hint="Your own Airwallex Hosted Payment Page or Payment Link — generated in your Airwallex account, not ours. The site's /checkout page hands off to this. Leave blank and it shows a 'contact us' fallback instead of a broken pay button."
        />
      </div>

      <div className="space-y-3">
        <SectionLabel>SEO</SectionLabel>
        <TextField
          label="Page title"
          value={content.meta.title}
          onChange={(v) => updateMeta({ title: v })}
        />
        <TextArea
          label="Meta description"
          value={content.meta.description}
          onChange={(v) => updateMeta({ description: v })}
          rows={2}
        />
      </div>
    </div>
  );
}
