'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  Globe,
  Image as ImageIcon,
  Loader2,
  Palette,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSiteContentFromArchetype } from '@/site/archetypes/compose';
import type { ArchetypeId } from '@/site/archetypes/types';
import type { SiteContent, SiteMode } from '@/site/schema';
import { auditAirwallexReadiness } from '@/site/compliance/airwallex';
import { extractPaletteFromImageUrl, type ExtractedPalette } from '@/lib/colorExtractor';
import { cn } from '@/lib/utils';

/* ============================================================================
 * Types & Country Presets
 * ========================================================================== */

export type CountryCode = 'HK' | 'GB' | 'US' | 'AE' | 'SG' | 'GLOBAL';

export interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  defaultJurisdiction: string;
  regLabel: string;
  regPlaceholder: string;
  defaultAddress: string;
  defaultLegalSuffix: string;
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: 'HK',
    name: 'Hong Kong SAR',
    flag: '🇭🇰',
    defaultJurisdiction: 'Hong Kong Special Administrative Region',
    regLabel: 'BRN & CR Number',
    regPlaceholder: 'BRN 72918341-000 / CR 2948192',
    defaultAddress: 'Two International Finance Centre, 8 Finance Street, Central, Hong Kong',
    defaultLegalSuffix: 'Limited',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    defaultJurisdiction: 'England & Wales',
    regLabel: 'Companies House Reg No.',
    regPlaceholder: 'Company No. 14920481',
    defaultAddress: '100 Bishopsgate, Level 24, London EC2N 4AG, United Kingdom',
    defaultLegalSuffix: 'Ltd',
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    defaultJurisdiction: 'State of Delaware, USA',
    regLabel: 'EIN / State File Number',
    regPlaceholder: 'EIN 84-2910482 / DE File 7182904',
    defaultAddress: '500 Howard Street, Suite 400, San Francisco, CA 94105, USA',
    defaultLegalSuffix: 'Inc.',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    defaultJurisdiction: 'Dubai International Financial Centre (DIFC)',
    regLabel: 'Commercial License / Trade No.',
    regPlaceholder: 'Commercial License No. CL-892401',
    defaultAddress: 'Gate Precinct 4, Level 5, DIFC, Dubai, UAE',
    defaultLegalSuffix: 'FZ-LLC',
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    defaultJurisdiction: 'Republic of Singapore',
    regLabel: 'UEN / ACRA Registration',
    regPlaceholder: 'UEN 202419204K',
    defaultAddress: '68 Circular Road, #02-01, Singapore 049422',
    defaultLegalSuffix: 'Pte. Ltd.',
  },
  {
    code: 'GLOBAL',
    name: 'International / Other',
    flag: '🌐',
    defaultJurisdiction: 'Global Commercial Jurisdiction',
    regLabel: 'Registration / Tax ID',
    regPlaceholder: 'REG-89201948',
    defaultAddress: '100 Global Financial Center, Suite 1200',
    defaultLegalSuffix: 'Corp',
  },
];

/* ============================================================================
 * Starting design presets
 *
 * These are hand-built starter layouts (archetype + starter content set). They
 * are NOT generated from the user's description — the description only helps
 * pick which one to start from. Everything stays editable in the studio.
 * ========================================================================== */

export interface WebsiteVariant {
  id: string;
  variantKey: 'A' | 'B' | 'C' | 'D';
  label: string;
  aestheticName: string;
  archetypeId: ArchetypeId;
  starterId: string;
  headline: string;
  subheadline: string;
  heroImage: string;
  themeId: string;
  accent: string;
  fontDisplay: string;
  fontSans: string;
  radius: string;
  badgeText: string;
  features: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
}

export const VARIANTS: WebsiteVariant[] = [
  {
    id: 'variant-a',
    variantKey: 'A',
    label: 'Variant A: High-Tech Signal',
    aestheticName: 'Minimalist Neo-Grotesque Grid',
    archetypeId: 'saas',
    starterId: 'modern_saas_pro',
    headline: 'Autonomous Cloud Infrastructure at Global Scale',
    subheadline: 'Multi-region mesh networking with zero-latency failover and sub-millisecond edge synchronization.',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    themeId: 'cyber-slate-volt',
    accent: '#84cc16',
    fontDisplay: 'Inter, sans-serif',
    fontSans: 'Inter, sans-serif',
    radius: '0.375rem',
    badgeText: 'SOC2 Type II Certified',
    features: [
      { title: 'Sub-ms Edge Routing', desc: 'Predictive packet routing across 40+ global PoPs.' },
      { title: 'Distributed Model Mesh', desc: 'Automated failover with instant state replication.' },
      { title: 'Real-Time Telemetry', desc: 'Continuous audit logging and latency telemetry.' },
    ],
    stats: [
      { value: '99.999%', label: 'Uptime SLA' },
      { value: '< 2.4ms', label: 'Global Edge Latency' },
      { value: '140M+', label: 'Daily Inferences' },
    ],
  },
  {
    id: 'variant-b',
    variantKey: 'B',
    label: 'Variant B: Bold Editorial Atelier',
    aestheticName: 'Serif Image-Forward Editorial',
    archetypeId: 'agency',
    starterId: 'agency_brand',
    headline: 'We Build Iconic Brand & Digital Experiences',
    subheadline: 'Strategy, spatial web architecture, and high-conversion digital flagships for category-defining companies.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    themeId: 'monochrome-atelier',
    accent: '#09090b',
    fontDisplay: 'Playfair Display, Georgia, serif',
    fontSans: 'Inter, sans-serif',
    radius: '0px',
    badgeText: 'Awwwards Agency of the Year',
    features: [
      { title: 'Brand Identity Systems', desc: 'Cohesive typography, visual rhythm, and motion guidelines.' },
      { title: 'Spatial Web Flagships', desc: 'Immersive digital flagships engineered for conversions.' },
      { title: 'Campaign Direction', desc: 'Global launch direction with cross-platform coherence.' },
    ],
    stats: [
      { value: '48+', label: 'Design Awards' },
      { value: '$2.8B+', label: 'Client Valuations' },
      { value: '100%', label: 'Bespoke Craft' },
    ],
  },
  {
    id: 'variant-c',
    variantKey: 'C',
    label: 'Variant C: Enterprise Metrics & M&A',
    aestheticName: 'Authoritative Corporate Blueprint',
    archetypeId: 'services',
    starterId: 'legal_corporate',
    headline: 'Cross-Border M&A & Strategic Legal Advisory',
    subheadline: 'Board-level counsel for high-stakes international commercial arbitration and regulatory enforcement.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    themeId: 'blueprint-navy',
    accent: '#1e3a8a',
    fontDisplay: 'Inter, sans-serif',
    fontSans: 'Inter, sans-serif',
    radius: '0.25rem',
    badgeText: 'London · New York · Singapore',
    features: [
      { title: 'Cross-Border Diligence', desc: 'Comprehensive regulatory compliance & antitrust reviews.' },
      { title: 'Dispute Arbitration', desc: 'High-stakes multi-jurisdiction commercial litigation.' },
      { title: 'Corporate Governance', desc: 'Executive fiduciary counsel and shareholder structuring.' },
    ],
    stats: [
      { value: '$42B+', label: 'Transactions Advised' },
      { value: '35+', label: 'Partner Jurisdictions' },
      { value: 'Top Tier', label: 'Chambers Global' },
    ],
  },
  {
    id: 'variant-d',
    variantKey: 'D',
    label: 'Variant D: Luxury Spatial Precision',
    aestheticName: 'Haute Horology & DTC Luxury',
    archetypeId: 'luxury',
    starterId: 'luxury_fashion_dtc',
    headline: 'The Art of Uncompromising Craftsmanship',
    subheadline: 'Rare horological complications and bespoke gemstone settings hand-assembled in Geneva.',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
    themeId: 'rose-gold-luxury',
    accent: '#e11d48',
    fontDisplay: 'Playfair Display, Georgia, serif',
    fontSans: 'Plus Jakarta Sans, sans-serif',
    radius: '9999px',
    badgeText: 'Limited Edition Releases',
    features: [
      { title: 'Geneva Seal Standard', desc: 'Hand-finished titanium and certified master chronometers.' },
      { title: 'Bespoke Gemstone Inlay', desc: 'Individually matched baguette-cut rare emeralds.' },
      { title: 'Private Salon Viewing', desc: 'Exclusive VIP viewing appointments in Geneva & Dubai.' },
    ],
    stats: [
      { value: '300', label: 'Numbered Pieces / Yr' },
      { value: '72hr', label: 'Power Reserve' },
      { value: 'Lifetime', label: 'Manufacture Guarantee' },
    ],
  },
];

/* ============================================================================
 * Helpers
 * ========================================================================== */

type VariantKey = WebsiteVariant['variantKey'];

const STEPS: { num: 1 | 2 | 3; label: string }[] = [
  { num: 1, label: 'Business' },
  { num: 2, label: 'Legal entity' },
  { num: 3, label: 'Design & launch' },
];

/**
 * Plain keyword match used to point at a starting preset. Deliberately dumb:
 * it is a suggestion, not generation, and the UI says so.
 */
const PRESET_KEYWORDS: { key: VariantKey; words: string[] }[] = [
  { key: 'D', words: ['luxury', 'fashion', 'jewel', 'jewellery', 'watch', 'boutique', 'couture', 'spa', 'premium', 'interior'] },
  { key: 'C', words: ['legal', 'law', 'lawyer', 'finance', 'financial', 'account', 'consult', 'advisory', 'insurance', 'corporate', 'm&a'] },
  { key: 'B', words: ['agency', 'studio', 'creative', 'design', 'brand', 'photography', 'portfolio', 'marketing', 'architecture'] },
  { key: 'A', words: ['saas', 'software', 'cloud', 'api', 'platform', 'tech', 'ai', 'data', 'infrastructure', 'app', 'hosting'] },
];

function suggestVariantKey(niche: string): VariantKey | null {
  const text = niche.toLowerCase();
  if (text.trim().length < 3) return null;
  for (const entry of PRESET_KEYWORDS) {
    if (entry.words.some((w) => text.includes(w))) return entry.key;
  }
  return null;
}

const TEXTAREA_CLASS =
  'flex w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 transition-colors';

/* ============================================================================
 * MasterPromptStudio Component
 * ========================================================================== */

export function MasterPromptStudio() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 — business
  const [brandName, setBrandName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [extractedPalette, setExtractedPalette] = useState<ExtractedPalette | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('HK');
  const [niche, setNiche] = useState('');
  const [mode, setMode] = useState<SiteMode>('services');

  // Step 2 — legal entity (always starts empty; never auto-filled)
  const [legalName, setLegalName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [regAddress, setRegAddress] = useState('');

  // Step 3 — design preset + optional Airwallex hosted checkout
  const [selectedVariantKey, setSelectedVariantKey] = useState<VariantKey>('A');
  const [airwallexUrl, setAirwallexUrl] = useState('');

  const [showErrors, setShowErrors] = useState<Record<number, boolean>>({});
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prefill from `?niche=` / `?mode=` (window.location, so no Suspense boundary).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nicheParam = params.get('niche');
    if (nicheParam) setNiche(nicheParam);
    const modeParam = params.get('mode');
    if (modeParam === 'ecommerce' || modeParam === 'services') setMode(modeParam);
  }, []);

  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === selectedCountry) ?? COUNTRIES[0],
    [selectedCountry],
  );

  const activeVariant = useMemo(
    () => VARIANTS.find((v) => v.variantKey === selectedVariantKey) ?? VARIANTS[0],
    [selectedVariantKey],
  );

  const suggestedKey = useMemo(() => suggestVariantKey(niche), [niche]);

  /* ---- validation ------------------------------------------------------- */

  const errors = useMemo(() => {
    const e: Record<string, string> = {};

    if (!brandName.trim()) {
      e.brandName = 'Enter the brand name you want shown on the site.';
    }

    if (!legalName.trim()) {
      e.legalName = 'Enter the full legal entity name exactly as registered.';
    }

    const reg = regNumber.trim();
    if (!reg) {
      e.regNumber = `Enter the ${country.regLabel} issued to this entity.`;
    } else if (reg.toLowerCase() === country.regPlaceholder.toLowerCase()) {
      e.regNumber = `That is the example format, not a real number. Enter the actual ${country.regLabel}.`;
    } else if (/^REG-?0*0+$/i.test(reg)) {
      e.regNumber = 'That looks like a placeholder. Enter the real registration number — Airwallex rejects placeholder details.';
    }

    if (!regAddress.trim()) {
      e.regAddress = 'Enter the registered office address.';
    }

    return e;
  }, [brandName, legalName, regNumber, regAddress, country]);

  const step1Valid = !errors.brandName;
  const step2Valid = !errors.legalName && !errors.regNumber && !errors.regAddress;

  /* ---- live Airwallex readiness ---------------------------------------- */

  const candidateContent = useMemo<SiteContent>(() => {
    const content = createSiteContentFromArchetype(
      activeVariant.archetypeId,
      activeVariant.starterId,
    );
    const name = brandName.trim() || 'Untitled business';

    content.brand = {
      logoText: name,
      ...(logoUrl ? { logoUrl } : {}),
    };
    content.themeId = activeVariant.themeId;
    content.accent = extractedPalette?.accent ?? activeVariant.accent;
    content.mode = mode;
    content.meta = { ...content.meta, title: name };

    content.business = {
      ...content.business,
      name,
      shortName: name,
      legalName: legalName.trim() || undefined,
      registrationNumber: regNumber.trim(),
      registeredAddress: regAddress.trim(),
      jurisdiction: country.defaultJurisdiction,
      governingLaw: `the laws of ${country.defaultJurisdiction}`,
    };

    const checkout = airwallexUrl.trim();
    if (checkout) content.airwallexCheckoutUrl = checkout;
    else delete content.airwallexCheckoutUrl;

    return content;
  }, [
    activeVariant,
    brandName,
    logoUrl,
    extractedPalette,
    mode,
    legalName,
    regNumber,
    regAddress,
    country,
    airwallexUrl,
  ]);

  const audit = useMemo(() => auditAirwallexReadiness(candidateContent), [candidateContent]);

  const orderedChecks = useMemo(() => {
    const rank = { fail: 0, warn: 1, pass: 2 } as const;
    return [...audit.checks].sort((a, b) => rank[a.status] - rank[b.status]);
  }, [audit]);

  const checkoutCheck = audit.checks.find((c) => c.id === 'checkout.liveUrl');

  /* ---- actions ---------------------------------------------------------- */

  const goToStep = (next: 1 | 2 | 3) => {
    if (next <= step) {
      setStep(next);
      return;
    }
    if (next >= 2 && !step1Valid) {
      setShowErrors((prev) => ({ ...prev, 1: true }));
      setStep(1);
      return;
    }
    if (next === 3 && !step2Valid) {
      setShowErrors((prev) => ({ ...prev, 2: true }));
      setStep(2);
      return;
    }
    setStep(next);
  };

  const handleNext = () => {
    if (step === 1 && !step1Valid) {
      setShowErrors((prev) => ({ ...prev, 1: true }));
      return;
    }
    if (step === 2 && !step2Valid) {
      setShowErrors((prev) => ({ ...prev, 2: true }));
      return;
    }
    goToStep(step === 1 ? 2 : 3);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    setLogoError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/uploads', { method: 'POST', body: formData });
      const json = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!res.ok || !json?.url) {
        throw new Error(json?.error ?? `Upload failed (${res.status}).`);
      }
      setLogoUrl(json.url);
      setExtractedPalette(await extractPaletteFromImageUrl(json.url));
    } catch (err) {
      setLogoError(err instanceof Error ? err.message : 'Logo upload failed.');
    } finally {
      setUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCreate = async () => {
    if (!step1Valid) {
      setShowErrors((prev) => ({ ...prev, 1: true }));
      setStep(1);
      return;
    }
    if (!step2Valid) {
      setShowErrors((prev) => ({ ...prev, 2: true }));
      setStep(2);
      return;
    }

    setIsCreating(true);
    setCreateError(null);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: brandName.trim(),
          archetypeId: activeVariant.archetypeId,
          starterId: activeVariant.starterId,
          content: candidateContent,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { project?: { id?: string }; id?: string; error?: string }
        | null;

      if (!res.ok) {
        throw new Error(data?.error ?? `Could not create the site (HTTP ${res.status}).`);
      }
      const projectId = data?.project?.id ?? data?.id;
      if (!projectId) {
        throw new Error('The server did not return a project id, so the site may not have been created.');
      }
      router.push(`/project/${projectId}`);
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Could not create the site.');
      setIsCreating(false);
    }
  };

  /* ---- render ----------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Sites
          </Link>
          <span className="text-xs text-muted-foreground">Step {step} of 3</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Create a site
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Three steps: your business, the registered legal entity, then a starting design.
            Nothing is invented for you — the legal details you type are the ones Airwallex
            reviewers will check.
          </p>
        </div>

        {/* Step indicator */}
        <ol className="mb-8 flex items-center gap-2">
          {STEPS.map((s, i) => {
            const done = step > s.num;
            const active = step === s.num;
            return (
              <li key={s.num} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToStep(s.num)}
                  className="flex items-center gap-2 text-left"
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors',
                      done && 'border-primary bg-primary text-primary-foreground',
                      active && 'border-primary text-primary',
                      !done && !active && 'border-border text-muted-foreground',
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : s.num}
                  </span>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      active ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <span
                    className={cn(
                      'ml-1 hidden h-px flex-1 sm:block',
                      done ? 'bg-primary/40' : 'bg-border',
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>

        {/* ================= Step 1 — Business ================= */}
        {step === 1 && (
          <section className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div>
              <h2 className="text-base font-semibold text-foreground">Business</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                What the site is for and where the entity is registered.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="brandName" className="text-xs font-medium text-foreground">
                Brand name <span className="text-destructive">*</span>
              </label>
              <Input
                id="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Vantage Cloud"
                aria-invalid={Boolean(showErrors[1] && errors.brandName)}
              />
              {showErrors[1] && errors.brandName && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.brandName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium text-foreground">Logo (optional)</span>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/30">
                  {logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logoUrl} alt="Uploaded logo" className="h-full w-full object-contain" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingLogo}
                      className="gap-1.5"
                    >
                      {uploadingLogo ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )}
                      {logoUrl ? 'Replace logo' : 'Upload logo'}
                    </Button>
                    {logoUrl && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setLogoUrl('');
                          setExtractedPalette(null);
                        }}
                        className="gap-1.5 text-muted-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    PNG, JPEG, WebP, SVG or GIF, up to 5 MB.
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>

              {logoError && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {logoError}
                </p>
              )}

              {extractedPalette && (
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
                  <Palette className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] text-muted-foreground">
                    Accent picked from your logo:
                  </span>
                  {[extractedPalette.primary, extractedPalette.secondary, extractedPalette.accent].map(
                    (c) => (
                      <span
                        key={c}
                        title={c}
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ backgroundColor: c }}
                      />
                    ),
                  )}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium text-foreground">Country of registration</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {COUNTRIES.map((c) => {
                  const isSelected = c.code === selectedCountry;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setSelectedCountry(c.code)}
                      className={cn(
                        'flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-colors',
                        isSelected
                          ? 'border-primary bg-primary/5 text-foreground'
                          : 'border-border text-muted-foreground hover:bg-muted',
                      )}
                    >
                      <span className="text-sm">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium text-foreground">Site type</span>
              <div className="inline-flex rounded-md border border-border p-0.5">
                {(['services', 'ecommerce'] as SiteMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={cn(
                      'rounded-[5px] px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                      mode === m
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">
                Ecommerce sites get product, cart and shipping pages; services sites get
                engagement and enquiry framing.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="niche" className="text-xs font-medium text-foreground">
                What does the business do?{' '}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="niche"
                rows={3}
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Cross-border legal advisory for fintechs"
                className={TEXTAREA_CLASS}
              />
              <p className="text-[11px] text-muted-foreground">
                Optional. Nothing is generated from this — it is only used to suggest which
                starting design preset to highlight on step 3.
              </p>
            </div>

            <div className="flex justify-end border-t border-border pt-4">
              <Button onClick={handleNext} className="gap-1.5">
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </section>
        )}

        {/* ================= Step 2 — Legal entity ================= */}
        {step === 2 && (
          <section className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
            <div>
              <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                Legal entity
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                These details are printed in the footer and the policy pages exactly as you
                enter them, and Airwallex checks them against the public registry. We never
                pre-fill or guess them — please copy them from the incorporation documents.
              </p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="legalName" className="text-xs font-medium text-foreground">
                Registered legal name <span className="text-destructive">*</span>
              </label>
              <Input
                id="legalName"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="e.g. Vantage Cloud Technologies Limited"
                aria-invalid={Boolean(showErrors[2] && errors.legalName)}
              />
              {showErrors[2] && errors.legalName && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.legalName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="regNumber" className="text-xs font-medium text-foreground">
                {country.regLabel} <span className="text-destructive">*</span>
              </label>
              <Input
                id="regNumber"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder={country.regPlaceholder}
                aria-invalid={Boolean(showErrors[2] && errors.regNumber)}
              />
              <p className="text-[11px] text-muted-foreground">
                Example format for {country.name}: {country.regPlaceholder}
              </p>
              {showErrors[2] && errors.regNumber && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.regNumber}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="regAddress" className="text-xs font-medium text-foreground">
                Registered address <span className="text-destructive">*</span>
              </label>
              <textarea
                id="regAddress"
                rows={2}
                value={regAddress}
                onChange={(e) => setRegAddress(e.target.value)}
                placeholder="Full registered office address on one line"
                className={TEXTAREA_CLASS}
              />
              {showErrors[2] && errors.regAddress && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.regAddress}
                </p>
              )}
            </div>

            <div className="rounded-lg border border-border bg-muted/30 px-3 py-2.5">
              <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Globe className="h-3.5 w-3.5 text-primary" />
                Governing law will read:{' '}
                <span className="font-medium text-foreground">
                  the laws of {country.defaultJurisdiction}
                </span>
              </p>
            </div>

            <div className="flex justify-between border-t border-border pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>
              <Button onClick={handleNext} className="gap-1.5">
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </section>
        )}

        {/* ================= Step 3 — Design & launch ================= */}
        {step === 3 && (
          <section className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-base font-semibold text-foreground">Starting design</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Four hand-built starting presets. Pick the closest one — every colour, section
                and word stays editable in the studio afterwards.
              </p>

              {suggestedKey && (
                <p className="mt-3 rounded-lg border border-border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
                  Based on your description,{' '}
                  <span className="font-medium text-foreground">
                    Variant {suggestedKey}
                  </span>{' '}
                  looks closest. Pick any of them.
                </p>
              )}

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {VARIANTS.map((v) => {
                  const isSelected = v.variantKey === selectedVariantKey;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantKey(v.variantKey)}
                      className={cn(
                        'rounded-xl border p-3 text-left transition-colors',
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-foreground">
                          Variant {v.variantKey}
                        </span>
                        <span className="flex items-center gap-1.5">
                          {suggestedKey === v.variantKey && (
                            <span className="rounded-full border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              Suggested
                            </span>
                          )}
                          <span
                            className="h-3 w-3 rounded-full border border-border"
                            style={{ backgroundColor: v.accent }}
                          />
                          {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">{v.aestheticName}</p>
                      <p className="mt-2 line-clamp-2 text-xs font-medium text-foreground">
                        {v.headline}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                        {v.subheadline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/40 text-primary">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-foreground">
                    Airwallex Hosted Payment Page URL{' '}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Paste the client&apos;s Hosted Payment Page / Payment Link from their own
                    Airwallex account. You can also add this later in the studio&apos;s publish
                    panel.
                  </p>
                </div>
              </div>
              <Input
                value={airwallexUrl}
                onChange={(e) => setAirwallexUrl(e.target.value)}
                placeholder="https://checkout.airwallex.com/..."
                className="mt-3"
              />
            </div>

            {/* Live Airwallex readiness */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Airwallex readiness
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  {audit.failCount === 0 && audit.warnCount === 0
                    ? 'All checks pass'
                    : `${audit.failCount} to fix · ${audit.warnCount} to review`}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Live check against the site you are about to create. Fixing these before you
                apply is what keeps payment applications out of the rejection pile.
              </p>

              <ul className="mt-4 space-y-2">
                {orderedChecks.map((c) => (
                  <li key={c.id} className="flex items-start gap-2">
                    {c.status === 'pass' ? (
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    ) : c.status === 'warn' ? (
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs text-foreground">{c.label}</p>
                      {c.fix && (
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          {c.fix}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {checkoutCheck && checkoutCheck.status !== 'pass' && (
                <p className="mt-4 rounded-lg border border-border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
                  The Airwallex checkout URL is not connected yet. That does not block creating
                  the site — connect it later in the studio&apos;s publish panel before you
                  submit the payment application.
                </p>
              )}

              <p className="mt-3 text-[11px] text-muted-foreground">
                The preset&apos;s placeholder contact email and phone still need replacing with
                the real ones in the studio&apos;s business profile.
              </p>
            </div>

            {createError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs text-destructive"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{createError} You are still on step 3 — nothing was created.</span>
              </div>
            )}

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                disabled={isCreating}
                className="gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>
              <Button onClick={handleCreate} disabled={isCreating} className="gap-1.5 shadow-sm">
                {isCreating ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Creating…
                  </>
                ) : (
                  <>
                    Create site
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default MasterPromptStudio;
