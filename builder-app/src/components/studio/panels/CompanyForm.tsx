'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Check, AlertCircle } from 'lucide-react';
import { useStudio } from '@/store/studio';
import { PanelHeader, SectionLabel, TextField, TextArea } from './fields';
import { useJurisdictionPresets } from './useOptionalData';
import { LogoPicker } from './LogoPicker';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Where this single business profile flows — static hint, visual only. */
const EVERYWHERE_CHIPS = [
  'Footer legal bar',
  'Policy pages',
  'Contact',
  'Checkout',
  'Registration block',
];

export function CompanyForm() {
  const content = useStudio((s) => s.content);
  const updateBusiness = useStudio((s) => s.updateBusiness);
  const updateMeta = useStudio((s) => s.updateMeta);
  const setFormspreeId = useStudio((s) => s.setFormspreeId);
  const setAirwallexCheckoutUrl = useStudio((s) => s.setAirwallexCheckoutUrl);
  const mutate = useStudio((s) => s.mutate);
  const projectId = useStudio((s) => s.meta?.id);
  const updateSectionProps = useStudio((s) => s.updateSectionProps);
  const presets = useJurisdictionPresets();
  const [showPicker, setShowPicker] = useState(false);
  const [aiState, setAiState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [aiMsg, setAiMsg] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string>('');
  const [policyState, setPolicyState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [policyMsg, setPolicyMsg] = useState<string | null>(null);
  const [policyResult, setPolicyResult] = useState<string>('');

  if (!content) return null;
  const b = content.business;

  const generateAll = async () => {
    if (!projectId) return;
    setAiState('running');
    setAiMsg(null);
    setAiResult('');
    try {
      await useStudio.getState().saveNow();
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setAiMsg(data?.error || 'Copy generation failed.');
        setAiState('error');
        return;
      }
      const patches = (data.sections ?? {}) as Record<string, Record<string, unknown>>;
      let applied = 0;
      for (const [sectionId, patch] of Object.entries(patches)) {
        if (patch && Object.keys(patch).length > 0) {
          updateSectionProps(sectionId, patch);
          applied++;
        }
      }
      setAiResult(`${applied} section${applied === 1 ? '' : 's'} updated`);
      setAiState('done');
    } catch {
      setAiMsg('Network error while generating copy.');
      setAiState('error');
    }
  };

  const generatePolicies = async () => {
    if (!projectId) return;
    setPolicyState('running');
    setPolicyMsg(null);
    setPolicyResult('');
    try {
      await useStudio.getState().saveNow();
      const res = await fetch('/api/ai/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setPolicyMsg(data?.error || 'Policy generation failed.');
        setPolicyState('error');
        return;
      }
      const policies = (data.policies ?? {}) as Record<
        string,
        { title: string; lastUpdated: string; sections: unknown[] }
      >;
      let applied = 0;
      for (const [sectionId, patch] of Object.entries(policies)) {
        if (patch && Array.isArray(patch.sections) && patch.sections.length > 0) {
          updateSectionProps(sectionId, patch);
          applied++;
        }
      }
      setPolicyResult(`${applied} of 4 policy pages updated`);
      setPolicyState('done');
    } catch {
      setPolicyMsg('Network error while generating policies.');
      setPolicyState('error');
    }
  };

  return (
    <div className="space-y-5 p-4">
      <PanelHeader
        title="Business profile"
        hint="Set your entity details once — they flow everywhere across the site automatically."
      />

      {/* Everywhere-on-site affordance */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          Used everywhere on site
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {EVERYWHERE_CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-xs leading-snug text-muted-foreground">
          Edit once here — the footer legal bar, policy pages, contact section, checkout and
          registration block all update together.
        </p>
      </div>

      {/* AI copy generation */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <p className="text-sm font-medium text-foreground">Generate copy with AI</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          Rewrites every text section across your whole site from these business details. Prices,
          images and structural data are preserved.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={generateAll}
          disabled={aiState === 'running'}
          className="mt-2 w-full"
        >
          {aiState === 'running' ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Generating copy…
            </>
          ) : aiState === 'done' ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
              {aiResult || 'Done'}
            </>
          ) : (
            <>
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
              Generate my site copy
            </>
          )}
        </Button>
        {aiState === 'error' && aiMsg && (
          <p className={cn('mt-1.5 flex items-start gap-1.5 text-[11px] text-amber-600', 'dark:text-amber-400')}>
            <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
            <span>{aiMsg}</span>
          </p>
        )}

        <div className="mt-3 border-t border-border pt-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Regenerates the privacy policy, terms, refund and shipping pages with grounded legal
            prose from your entity details.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={generatePolicies}
            disabled={policyState === 'running'}
            className="mt-2 w-full"
          >
            {policyState === 'running' ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Regenerating policies…
              </>
            ) : policyState === 'done' ? (
              <>
                <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                {policyResult || 'Done'}
              </>
            ) : (
              <>
                <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
                Regenerate policy pages with AI
              </>
            )}
          </Button>
          {policyState === 'error' && policyMsg && (
            <p className={cn('mt-1.5 flex items-start gap-1.5 text-[11px] text-amber-600', 'dark:text-amber-400')}>
              <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
              <span>{policyMsg}</span>
            </p>
          )}
        </div>
      </div>

      {/* Brand identity */}
      <div className="space-y-3">
        <SectionLabel>Brand identity</SectionLabel>
        {content.brand.logoUrl ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.brand.logoUrl}
              alt=""
              className="h-10 w-10 rounded-md object-contain"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Logo</p>
              <p className="truncate text-xs text-muted-foreground">{content.brand.logoUrl}</p>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setShowPicker((v) => !v)}
          className="mt-1 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          {showPicker ? 'Hide library' : 'or choose from library'}
        </button>
        {showPicker ? (
          <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
            <LogoPicker
              value={content.brand.logoUrl}
              onSelect={(url) => mutate((d) => { d.brand.logoUrl = url; })}
            />
          </div>
        ) : null}
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

      {/* Registration */}
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

      {/* Contact */}
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

      {/* Forms */}
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

      {/* Payments */}
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

      {/* SEO */}
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