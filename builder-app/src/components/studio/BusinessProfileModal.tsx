'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  Sparkles,
  Loader2,
  Check,
  AlertCircle,
  ShieldCheck,
  Globe,
  Mail,
  Phone,
  Clock,
  CreditCard,
  X,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { useStudio } from '@/store/studio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogoPicker } from './panels/LogoPicker';
import { useJurisdictionPresets } from './panels/useOptionalData';
import { cn } from '@/lib/utils';

interface BusinessProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const TABS = [
  { id: 'brand', label: 'Brand & Identity', icon: Building2 },
  { id: 'legal', label: 'Legal & Jurisdiction', icon: ShieldCheck },
  { id: 'contact', label: 'Contact & Hours', icon: Mail },
  { id: 'integrations', label: 'Payments & Forms', icon: CreditCard },
  { id: 'ai', label: 'AI Copy Engine', icon: Sparkles },
] as const;

type TabId = (typeof TABS)[number]['id'];

const EVERYWHERE_SYNC = [
  'Header Brand & Logo',
  'Footer Legal Bar',
  'Contact Form & Map',
  'Corporate Registration Block',
  '4 Policy Pages (Privacy, Terms, Refund, Shipping)',
  'Checkout & Payment Badges',
];

export function BusinessProfileModal({ open, onClose }: BusinessProfileModalProps) {
  const content = useStudio((s) => s.content);
  const updateBusiness = useStudio((s) => s.updateBusiness);
  const updateMeta = useStudio((s) => s.updateMeta);
  const setFormspreeId = useStudio((s) => s.setFormspreeId);
  const setAirwallexCheckoutUrl = useStudio((s) => s.setAirwallexCheckoutUrl);
  const mutate = useStudio((s) => s.mutate);
  const projectId = useStudio((s) => s.meta?.id);
  const updateSectionProps = useStudio((s) => s.updateSectionProps);
  const presets = useJurisdictionPresets();

  const [activeTab, setActiveTab] = useState<TabId>('brand');
  const [showLogoPicker, setShowLogoPicker] = useState(false);

  // AI states
  const [aiState, setAiState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [aiMsg, setAiMsg] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string>('');
  const [policyState, setPolicyState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [policyMsg, setPolicyMsg] = useState<string | null>(null);
  const [policyResult, setPolicyResult] = useState<string>('');

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || !content) return null;
  const b = content.business;

  // Calculate completeness score
  const checks = [
    Boolean(b.name),
    Boolean(b.registrationNumber),
    Boolean(b.registeredAddress),
    Boolean(b.email),
    Boolean(b.jurisdiction),
  ];
  const completedCount = checks.filter(Boolean).length;

  const generateAllCopy = async () => {
    if (!projectId) return;
    setAiState('running');
    setAiMsg(null);
    setAiResult('');
    try {
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
      setAiResult(`${applied} section${applied === 1 ? '' : 's'} rewritten`);
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
      setPolicyResult(`${applied} legal policy pages synchronized`);
      setPolicyState('done');
    } catch {
      setPolicyMsg('Network error while generating policies.');
      setPolicyState('error');
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-label="Centralized Business Profile"
        className="relative flex h-[85vh] max-h-[720px] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">
                  Centralized Business Details
                </h2>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-medium',
                    completedCount === checks.length
                      ? 'bg-emerald-500/15 text-emerald-500'
                      : 'bg-amber-500/15 text-amber-500',
                  )}
                >
                  {completedCount}/{checks.length} details set
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Single source of truth — changes automatically sync across all pages, footers & policies.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sync Guarantee Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-border/70 bg-primary/5 px-6 py-2 text-[11px] text-primary">
          <BadgeCheck className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium shrink-0">Auto-synced to:</span>
          <div className="flex items-center gap-1.5 overflow-hidden">
            {EVERYWHERE_SYNC.map((place, i) => (
              <span key={place} className="inline-flex items-center gap-1 whitespace-nowrap text-muted-foreground">
                {i > 0 && <span className="opacity-40">•</span>}
                {place}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Body: Sidebar Tabs + Form Content */}
        <div className="flex min-h-0 flex-1">
          {/* Navigation Sidebar */}
          <div className="w-56 shrink-0 border-r border-border bg-muted/20 p-3">
            <nav className="flex flex-col gap-1">
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition-colors',
                      active
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Form Pane */}
          <div className="thin-scroll min-h-0 flex-1 overflow-y-auto p-6">
            {/* TAB 1: Brand & Identity */}
            {activeTab === 'brand' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Brand Identity</h3>
                  <p className="text-xs text-muted-foreground">
                    Define your brand name, legal entity, and logo mark.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Primary Brand Name</Label>
                    <Input
                      value={b.name}
                      onChange={(e) => updateBusiness({ name: e.target.value })}
                      placeholder="e.g. Apex Global"
                      className="h-9 text-xs"
                    />
                    <p className="text-[10px] text-muted-foreground">Main name displayed across the hero and headers.</p>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Short Brand Name</Label>
                    <Input
                      value={b.shortName}
                      onChange={(e) => updateBusiness({ shortName: e.target.value })}
                      placeholder="e.g. Apex"
                      className="h-9 text-xs"
                    />
                    <p className="text-[10px] text-muted-foreground">Used in casual copy and footer wordmarks.</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Full Legal Statutory Entity Name</Label>
                  <Input
                    value={b.legalName || b.name}
                    onChange={(e) => updateBusiness({ legalName: e.target.value })}
                    placeholder="e.g. Apex Global Technologies Pte. Ltd."
                    className="h-9 text-xs"
                  />
                  <p className="text-[10px] text-muted-foreground">Used on compliance footers, registration panels, and terms.</p>
                </div>

                {/* Logo Section */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-xs font-semibold">Brand Logo</Label>
                      <p className="text-[11px] text-muted-foreground">Pick a vector logo from our curated icon library or provide a URL.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLogoPicker((v) => !v)}
                      className="h-7 text-xs"
                    >
                      {showLogoPicker ? 'Hide Library' : 'Choose Logo'}
                    </Button>
                  </div>

                  {content.brand.logoUrl ? (
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.brand.logoUrl}
                        alt="Logo Preview"
                        className="h-9 w-9 rounded-md object-contain bg-background p-1 border border-border"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-foreground">Current Logo</p>
                        <p className="truncate text-[10px] text-muted-foreground">{content.brand.logoUrl}</p>
                      </div>
                    </div>
                  ) : null}

                  {showLogoPicker && (
                    <div className="pt-2">
                      <LogoPicker
                        value={content.brand.logoUrl}
                        onSelect={(url) => mutate((d) => { d.brand.logoUrl = url; })}
                      />
                    </div>
                  )}

                  <div className="space-y-1.5 pt-1">
                    <Label className="text-xs">Logo Header Text</Label>
                    <Input
                      value={content.brand.logoText}
                      onChange={(e) => mutate((d) => { d.brand.logoText = e.target.value; })}
                      placeholder="e.g. Apex"
                      className="h-9 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Legal & Jurisdiction */}
            {activeTab === 'legal' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Legal & Regulatory Details</h3>
                  <p className="text-xs text-muted-foreground">
                    Required for statutory compliance, refund disclosures, and corporate registrations.
                  </p>
                </div>

                {/* Quick Jurisdiction Presets */}
                {presets && presets.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-3 shadow-sm space-y-2">
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      Quick Jurisdiction Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {presets.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() =>
                            updateBusiness({
                              jurisdiction: p.jurisdiction,
                              governingLaw: p.governingLaw,
                            })
                          }
                          className={cn(
                            'rounded-full border px-2.5 py-1 text-[11px] transition-colors',
                            b.jurisdiction === p.jurisdiction
                              ? 'border-primary bg-primary/10 text-primary font-medium'
                              : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground',
                          )}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Registration / Company Number</Label>
                    <Input
                      value={b.registrationNumber}
                      onChange={(e) => updateBusiness({ registrationNumber: e.target.value })}
                      placeholder="e.g. 202319874K or 7849201"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Jurisdiction</Label>
                    <Input
                      value={b.jurisdiction}
                      onChange={(e) => updateBusiness({ jurisdiction: e.target.value })}
                      placeholder="e.g. Singapore"
                      className="h-9 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Governing Law Clause</Label>
                  <Input
                    value={b.governingLaw}
                    onChange={(e) => updateBusiness({ governingLaw: e.target.value })}
                    placeholder="e.g. the laws of Singapore"
                    className="h-9 text-xs"
                  />
                  <p className="text-[10px] text-muted-foreground">Injected verbatim into Terms of Service and Privacy Policy dispute sections.</p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Full Statutory Registered Address</Label>
                  <textarea
                    rows={2}
                    value={b.registeredAddress}
                    onChange={(e) => updateBusiness({ registeredAddress: e.target.value })}
                    placeholder="e.g. 10 Marina Boulevard, #38-01 Marina Bay Financial Centre, Singapore 018983"
                    className="w-full rounded-md border border-input bg-background p-2.5 text-xs text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Tax / VAT Identifier (Optional)</Label>
                    <Input
                      value={b.taxId || ''}
                      onChange={(e) => updateBusiness({ taxId: e.target.value || undefined })}
                      placeholder="e.g. GB 123 4567 89 / GST M90367201"
                      className="h-9 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">AS Number (Hosting / Infra only)</Label>
                    <Input
                      value={b.asNumber || ''}
                      onChange={(e) => updateBusiness({ asNumber: e.target.value || undefined })}
                      placeholder="e.g. AS201432"
                      className="h-9 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Contact & Hours */}
            {activeTab === 'contact' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Contact & Operating Hours</h3>
                  <p className="text-xs text-muted-foreground">
                    Public channels for customer inquiries, support routing, and policy notices.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Primary Support Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={b.email}
                        onChange={(e) => updateBusiness({ email: e.target.value })}
                        placeholder="support@yourcompany.com"
                        className="h-9 pl-8 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Contact Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        value={b.phone}
                        onChange={(e) => updateBusiness({ phone: e.target.value })}
                        placeholder="+65 6123 4567"
                        className="h-9 pl-8 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Public Website Domain</Label>
                    <div className="relative">
                      <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={b.website}
                        onChange={(e) => updateBusiness({ website: e.target.value })}
                        placeholder="yourdomain.com"
                        className="h-9 pl-8 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Operating Support Hours</Label>
                    <div className="relative">
                      <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={b.supportHours || ''}
                        onChange={(e) => updateBusiness({ supportHours: e.target.value || undefined })}
                        placeholder="Mon–Fri, 09:00–18:00 (GMT+8)"
                        className="h-9 pl-8 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Meta */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
                  <Label className="text-xs font-semibold">Search Engine Optimization (SEO)</Label>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Global Site Title</Label>
                    <Input
                      value={content.meta.title}
                      onChange={(e) => updateMeta({ title: e.target.value })}
                      className="h-9 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Global Meta Description</Label>
                    <textarea
                      rows={2}
                      value={content.meta.description}
                      onChange={(e) => updateMeta({ description: e.target.value })}
                      className="w-full rounded-md border border-input bg-background p-2.5 text-xs text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Payments & Forms */}
            {activeTab === 'integrations' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Payments & Form Endpoints</h3>
                  <p className="text-xs text-muted-foreground">
                    Connect your merchant Airwallex checkout link and form handler.
                  </p>
                </div>

                {/* Airwallex Integration */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Airwallex Hosted Checkout URL</p>
                      <p className="text-[11px] text-muted-foreground">
                        Your Airwallex Hosted Payment Page / Payment Link from your merchant account.
                      </p>
                    </div>
                  </div>

                  <Input
                    value={content.airwallexCheckoutUrl || ''}
                    onChange={(e) => setAirwallexCheckoutUrl(e.target.value || undefined)}
                    placeholder="https://checkout.airwallex.com/pay/..."
                    className="h-9 text-xs font-mono"
                  />
                  <p className="text-[10px] leading-relaxed text-muted-foreground">
                    When provided, clicking checkout buttons takes customers directly to your secured Airwallex checkout flow.
                  </p>
                </div>

                {/* Formspree Integration */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/10 text-blue-500">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Formspree Form ID (Optional)</p>
                      <p className="text-[11px] text-muted-foreground">
                        In addition to the built-in database inbox, forward inquiries to Formspree.
                      </p>
                    </div>
                  </div>

                  <Input
                    value={content.formspreeId || ''}
                    onChange={(e) => setFormspreeId(e.target.value || undefined)}
                    placeholder="e.g. xbjnkyrq"
                    className="h-9 text-xs font-mono"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: AI Engine */}
            {activeTab === 'ai' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">AI Site Personalizer</h3>
                  <p className="text-xs text-muted-foreground">
                    Use your centralized entity details to instantly tailor every heading, paragraph, and policy document.
                  </p>
                </div>

                {/* Full site copy pass */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">Personalize Whole Site Copy</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    AI analyzes your business name, jurisdiction, and niche to craft tailored headlines and value propositions while preserving your catalog and pricing.
                  </p>

                  <Button
                    type="button"
                    onClick={generateAllCopy}
                    disabled={aiState === 'running'}
                    className="w-full h-9 text-xs"
                  >
                    {aiState === 'running' ? (
                      <>
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        Generating Tailored Copy…
                      </>
                    ) : aiState === 'done' ? (
                      <>
                        <Check className="mr-2 h-3.5 w-3.5 text-emerald-400" />
                        {aiResult || 'Site Copy Personalised!'}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-3.5 w-3.5" />
                        Generate & Personalize Entire Site Copy
                      </>
                    )}
                  </Button>

                  {aiState === 'error' && aiMsg && (
                    <div className="flex items-center gap-1.5 text-xs text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{aiMsg}</span>
                    </div>
                  )}
                </div>

                {/* Legal policies pass */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">Grounded Legal Policy Generator</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Generates 4 fully customized policy pages (Privacy Policy, Terms of Service, Refund Policy, Shipping Policy) with exact company registration numbers and governing law.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={generatePolicies}
                    disabled={policyState === 'running'}
                    className="w-full h-9 text-xs"
                  >
                    {policyState === 'running' ? (
                      <>
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        Drafting Legal Clauses…
                      </>
                    ) : policyState === 'done' ? (
                      <>
                        <Check className="mr-2 h-3.5 w-3.5 text-emerald-500" />
                        {policyResult || 'Policies Updated!'}
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 h-3.5 w-3.5" />
                        Regenerate 4 Legal Policy Documents
                      </>
                    )}
                  </Button>

                  {policyState === 'error' && policyMsg && (
                    <div className="flex items-center gap-1.5 text-xs text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{policyMsg}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-6 py-3.5">
          <span className="text-xs text-muted-foreground">
            All edits save automatically to your site.
          </span>
          <Button size="sm" onClick={onClose} className="px-5">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
