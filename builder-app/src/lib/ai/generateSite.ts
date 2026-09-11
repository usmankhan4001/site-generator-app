/**
 * generateSite.ts — the AI **site generator** core.
 *
 * Given a business brief, this composes a full, schema-valid `SiteContent`
 * by CHOOSING from the existing catalog (sections, themes, logos, images)
 * and WRITING the copy — no code generation, no unsafe eval.
 *
 * Design:
 *  - Assets (theme, logo, images) are chosen deterministically by the
 *    pure pickers in `./assetPicker` — the model never invents URLs or ids.
 *  - The model only writes copy: a structured plan of per-page, per-section
 *    text-field patches, validated against `SECTION_FIELDS` allow-lists.

 *  - We START from `createSiteContentFromArchetype(archetypeId, starterSetId)`
 *    (the best-matching starter set for the brief, or the archetype's blank
 *    blueprint when nothing matches) so every page/section/nav/footer/policy
 *    is already a valid `SiteContent`; we then overlay the chosen theme/logo/
 *    images, the AI copy, the business identity and meta — and rebuild the
 *    policy pages from that final business info. This keeps the result
 *    schema-valid by construction.
 *
 * Server-only: resolves the OpenRouter key server-side, never in the browser.
 */

import type { BusinessInfo, SiteContent, Section, SectionType } from '@/site/schema';
import type { ArchetypeId } from '@/site/archetypes/types';
import { ARCHETYPES } from '@/site/archetypes';
import { createSiteContentFromArchetype } from '@/site/archetypes/compose';
import { buildPolicyPage } from '@/site/archetypes/policies';
import { diversifyImages } from '@/site/lib/diversifyImages';
import { catalogFor, buildCatalogText } from '@/lib/ai/catalog';
import {
  pickThemeForNiche,
  pickLogoForNiche,
  pickImagesForBrief,
} from '@/lib/ai/assetPicker';
import { recommendArchetypes } from '@/lib/studio/recommend';
import { THEMES_LIST } from '@/site/themes';
import {
  getOpenRouterKey,
  isConfiguredKey,
  structuredCompletion,
  SECTION_FIELDS,
} from '@/lib/openrouter';

/** The free-text brief the user supplies on the Describe step. */
export interface GenerateBrief {
  /** Short site / business name (one word encouraged). */
  name?: string;
  /** A sentence or two about what the business does. */
  niche: string;
  /** 'services' | 'ecommerce' — optional hint for archetype selection. */
  mode?: string;
  /** Optional vibe / mood hint passed to the logo picker. */
  vibe?: string;
  /** Optional additional context/instructions from user brief. */
  brief?: string;
  /** Explicit theme id chosen on the style step — overrides the automatic pick. */
  themeId?: string;
  /** Business/legal details collected on the details step. Blank fields are ignored. */
  business?: Partial<Omit<BusinessInfo, 'name' | 'shortName'>>;
}

export interface GenerateSiteInput {
  apiKey: string;
  brief: GenerateBrief;


  archetypeId?: ArchetypeId;
  model?: string;
}

/**
 * Section types the AI may switch off per business — never the identity/entry
 * section of a page (hero, pageHeader, contactPanel) or a structural section
 * (corporateRegistration, policyDocument, checkout). Every archetype's every
 * page opens with exactly one non-optional type, so disabling only from this
 * list can never leave a page with zero enabled sections.
 */
const OPTIONAL_SECTION_TYPES = new Set<SectionType>([
  'statsBar',
  'trustBar',
  'featureGrid',
  'pricingTiers',
  'productGrid',
  'testimonials',
  'faq',
  'ctaBanner',
  'prose',
  'timeline',
  'teamGrid',
  'valueGrid',
  'processSteps',
  'slaTable',
  'locationList',
]);

/* ============================================================================
 * Small local helpers
 * ========================================================================== */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

/** Coerce a brief name into a one-word brand + a full legal name. */
function deriveBrand(
  name: string | undefined,
  archetypeName: string,
): { brand: string; legalName: string } {
  const n = (name ?? '').trim();
  if (n) {
    const words = n.split(/\s+/).filter(Boolean);
    return { brand: words[0], legalName: n };
  }
  return { brand: archetypeName, legalName: `${archetypeName} Studio` };
}

/** Derive a few discovery tags from the free-text niche. */
function deriveTags(niche: string): string[] {
  const out: string[] = [];
  for (const w of niche.toLowerCase().split(/[^a-z0-9]+/i)) {
    if (w.length > 2 && !out.includes(w) && out.length < 6) out.push(w);
  }
  return out;
}

/**
 * Validate + filter a model patch for one section through its `SECTION_FIELDS`
 * allow-list — mirrors `applyAllowList` in `openrouter.ts` so the AI can only
 * ever touch writable text fields, never prices/urls/ids/enums/structure.

 */
function applySectionPatch(
  type: SectionType,
  originalProps: Record<string, unknown>,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const specs = SECTION_FIELDS[type] ?? [];
  const filtered: Record<string, unknown> = {};
  for (const spec of specs) {
    const v = patch[spec.key];
    if (v === undefined) continue;
    if (spec.kind === 'text') {
      if (typeof v === 'string' && v.trim()) filtered[spec.key] = v.trim();
      continue;
    }
    if (spec.kind === 'strings') {
      if (isStringArray(v)) {
        filtered[spec.key] = v.map((x) => x.trim()).filter(Boolean);
      }
      continue;
    }
    // kind === 'objects' — overlay text sub-fields per item, preserving the
    // original non-text fields (ids, prices, urls, enums).
    if (Array.isArray(v)) {
      const original = Array.isArray(originalProps[spec.key]) ? (originalProps[spec.key] as unknown[]) : [];
      filtered[spec.key] = v.map((item, idx) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) return {};
        const base = (original[idx] && typeof original[idx] === 'object' && !Array.isArray(original[idx])
          ? (original[idx] as Record<string, unknown>)
          : {}) as Record<string, unknown>;
        for (const k of spec.itemKeys) {
          const fv = (item as Record<string, unknown>)[k];
          if (typeof fv === 'string') base[k] = fv.trim();
          else if (isStringArray(fv) && k.endsWith('s')) {
            base[k] = fv.map((x) => x.trim()).filter(Boolean);
          }
        }
        return base;
      });
    }
  }
  return filtered;
}

/** Sync every contactPanel's support-hours line to the real business info — the
 * AI never sees `business.supportHours` (applied after copy generation), so
 * without this it would keep whatever the starter set's seed hours said. */
function syncContactSupportHours(site: SiteContent, supportHours?: string): void {
  if (!supportHours?.trim()) return;
  for (const page of site.pages) {
    for (const section of page.sections) {
      if (section.type !== 'contactPanel') continue;
      (section as unknown as { props: Record<string, unknown> }).props.supportHours = supportHours;
    }
  }
}

/** Assign the picker-chosen images to hero / feature / product / prose slots. */
function applyPickedImages(site: SiteContent, images: string[]): void {
  if (!images.length) return;
  let i = 0;
  const next = () => images[i++ % images.length];
  for (const page of site.pages) {
    for (const section of page.sections) {
      const p = (section as unknown as { props: Record<string, unknown> }).props;
      switch (section.type) {
        case 'hero':
          if (!p.image) p.image = next();
          break;
        case 'featureGrid':
        case 'productGrid': {
          const items = p.items as { image?: string }[] | undefined;
          items?.forEach((it) => {
            if (!it.image) it.image = next();
          });
          break;
        }
        case 'prose':
          if (!p.image) p.image = next();
          break;
        default:
          break;
      }
    }
  }
}

/* ============================================================================
 * Core
 * ========================================================================== */

/**
 * Compose a full `SiteContent` from a brief. Throws a descriptive Error on
 * any failure; throws a typed `AI_NOT_CONFIGURED` error when the key is missing.

 * The model only writes copy; every asset (theme, logo, images) comes from
 * the deterministic pickers, and every section/field is validated against the
 * catalog + `SECTION_FIELDS` allow-lists before being applied.
 */
export async function generateSiteFromBrief({
  apiKey,
  brief,
  archetypeId,
  model,
}: GenerateSiteInput): Promise<SiteContent> {
  if (!isConfiguredKey(apiKey)) {
    const err = new Error('AI site generation is not configured. Add an OPENROUTER_API_KEY to enable it.') as Error & {
      code?: string;
    };
    err.code = 'AI_NOT_CONFIGURED';
    throw err;
  }

  // 1. Resolve the archetype + starter set from the FULL free-text brief (name,
  // niche and the user's own description all feed the keyword match) — explicit
  // archetypeId wins for the archetype, but the best-matching starter set for
  // that archetype is still picked from the brief so the site starts from
  // niche-appropriate defaults instead of always the archetype's first pack.

  const nicheQuery = [brief.name, brief.niche, brief.brief].filter((s) => s?.trim()).join('. ');
  const recs = recommendArchetypes({ niche: nicheQuery, preferredMode: brief.mode });

  let resolvedArchetypeId = archetypeId;
  let resolvedStarterSetId: string | null = null;

  if (!resolvedArchetypeId) {
    resolvedArchetypeId = recs[0]?.archetypeId ?? 'saas';
    resolvedStarterSetId = recs[0]?.starterSetId ?? null;
  } else {
    resolvedStarterSetId =
      recs.find((r) => r.archetypeId === resolvedArchetypeId && r.starterSetId)?.starterSetId ?? null;
  }

  const arch = ARCHETYPES[resolvedArchetypeId];
  if (!arch) throw new Error(`Unknown archetype: ${resolvedArchetypeId}`);

  // 2. Build the scoped catalog prompt + page blueprint for the model.

  const catalog = catalogFor(resolvedArchetypeId);
  const catalogText = buildCatalogText(catalog);
  const pageBlueprint = arch.composition.pages
    .map((p) => `${p.key} (${p.path}): ${p.sections.map((s) => s.type).join(', ')}`)
    .join('\n');

  // 3. Choose assets deterministically — the model never invents these.



  const seed = `${brief.name || ''}:${brief.niche || ''}:${brief.brief || ''}`.trim() || resolvedArchetypeId;
  const explicitTheme = brief.themeId && THEMES_LIST.some((t) => t.id === brief.themeId) ? brief.themeId : undefined;
  const theme = explicitTheme
    ? { themeId: explicitTheme, accent: THEMES_LIST.find((t) => t.id === explicitTheme)!.preview.accent }
    : pickThemeForNiche(resolvedArchetypeId, seed);
  const logo = pickLogoForNiche(brief.niche, brief.vibe);
  const images = pickImagesForBrief(resolvedArchetypeId, seed, 6);

  // 4. Ask the model for a structured copy plan (per page, per section).

  const system = [
    'You are an expert website copywriter and site composer.',
    'Given a business brief and a catalog of available sections, write the copy for a complete business website.',
    'RULES:',
    '- Only use section types listed in the catalog. Never invent section types.',
    '- Only write the text fields listed for each section. Never invent prices, percentages, SLA values, URLs, image paths, ids, or other structural data.',
    '- Keep the tone professional, specific and confident — never generic or buzzwordy.',
    '- Ground every claim in the business brief and additional context; never invent hard numbers the user did not supply.',
    '- Keep legal/brand nouns (exact business name, registration details) untouched.',
    '- For list fields inside repeated items (e.g. a product/tier\'s "features"), write every item fully — a leftover unrelated value is worse than a shorter, on-topic one. Never leave a field that reads as a different, unrelated business or industry.',
    '- Make this site feel built specifically for THIS business, not a generic template: lean on concrete facts from the brief (services offered, location, experience, credentials, what makes it distinct) rather than filler that could apply to any company.',
    `- Some section types are OPTIONAL and may be turned off per business: ${[...OPTIONAL_SECTION_TYPES].join(', ')}. For any of these, you may add "enabled": false alongside its fields to omit it from that page — do this only when the section genuinely doesn't fit (e.g. skip "pricingTiers" if public pricing wasn't mentioned, skip "testimonials" with none to draw on, skip "faq" for a one-line service). Every other section type is required and always shown; never add "enabled" to those. Don't disable sections purely for variety, and never disable every optional section on the same page — the goal is a page shaped around what this specific business actually has to say, not a shorter page.`,
    'Output ONLY a JSON object with exactly this shape:',
    '{',
    '  "pages": {',
    '    "<pageKey>": {',
    '      "<sectionType>": { "<field>": "<value>", ..., "enabled": true|false },',
    '      ...',
    '    },',
    '    ...',
    '  },',
    '  "meta": { "description": "..." },',
    '  "footer": { "tagline": "..." }',
    '}',
    'Where <pageKey> is one of the page keys in the blueprint, <sectionType> is a section type in the catalog, and <field> is one of that section\'s writable text fields. "enabled" is optional and only meaningful for the optional section types listed above.',
    'Write copy for every section on every page. Do not include keys that are not listed.',
  ].join('\n');

  const user = [
    'BUSINESS BRIEF:',
    `Name: ${brief.name?.trim() || 'unspecified'}`,
    `Niche: ${brief.niche.trim() || 'unspecified'}`,
    `Mode: ${brief.mode || arch.mode}`,
    `Vibe: ${brief.vibe || 'n/a'}`,
    brief.brief?.trim() ? `Additional Context: ${brief.brief.trim()}` : '',
    '',
    'CATALOG:',
    catalogText,
    '',
    'PAGE BLUEPRINT (pageKey -> section types):',
    pageBlueprint,
    '',
    'Write the copy for every section on every page and return a JSON object per the schema.',
  ].filter((line) => line !== undefined && line !== null).join('\n');

  // A full multi-page, multi-section copy plan is much larger than a single
  // section rewrite — undersizing this truncates the JSON mid-response.
  const plan = await structuredCompletion({ apiKey, system, user, model, maxTokens: 8000 });
  const pagesPlan = isPlainObject(plan.pages) ? (plan.pages as Record<string, unknown>) : {};

  // 5. Compose from the blank archetype blueprint (already schema-valid).



  const content = createSiteContentFromArchetype(resolvedArchetypeId, resolvedStarterSetId);

  // 6. Apply the AI copy per section via the allow-list safe merge.


  for (const page of content.pages) {
    const pagePlan = isPlainObject(pagesPlan[page.key]) ? (pagesPlan[page.key] as Record<string, unknown>) : {};
    for (const section of page.sections) {
      const patch = isPlainObject(pagePlan[section.type]) ? (pagePlan[section.type] as Record<string, unknown>) : {};

      // Structural toggle: only optional section types may be switched off,
      // and only on the AI's say-so — this is what lets two businesses in the
      // same archetype end up with genuinely different pages instead of an
      // identical section list every time.
      if (OPTIONAL_SECTION_TYPES.has(section.type) && typeof patch.enabled === 'boolean') {
        (section as unknown as { enabled: boolean }).enabled = patch.enabled;
      }

      if (Object.keys(patch).length === 0) continue;
      const sec = section as unknown as { props: Record<string, unknown> };
      const merged = applySectionPatch(section.type, sec.props, patch);
      if (Object.keys(merged).length === 0) continue;
      sec.props = { ...sec.props, ...merged };
    }

    // Defensive floor: every archetype's every page opens with a required
    // (non-toggleable) section today, so this should never trigger — but if a
    // future archetype ever breaks that invariant, never ship an empty page.
    if (!page.sections.some((s) => (s as unknown as { enabled: boolean }).enabled)) {
      (page.sections[0] as unknown as { enabled: boolean }).enabled = true;
    }
  }

  // 7. Apply theme, logo, business identity, meta, footer, source.


  content.themeId = theme.themeId;
  if (theme.accent) content.accent = theme.accent;
  content.brand = { ...content.brand, logoUrl: logo.logoUrl };

  const { brand, legalName } = deriveBrand(brief.name, arch.name);
  content.business = {
    ...content.business,
    name: brand,
    shortName: brand,
    legalName,
  };
  content.brand = { ...content.brand, logoText: brand };
  content.meta = { ...content.meta, title: brand };

  // Overlay the business/legal details collected on the details step. Only
  // non-blank fields are applied so an untouched field keeps the starter
  // set's (or placeholder's) existing value instead of being blanked out.
  const bd = brief.business;
  if (bd) {
    const overlay: Partial<BusinessInfo> = {};
    if (bd.legalName?.trim()) overlay.legalName = bd.legalName.trim();
    if (bd.registrationNumber?.trim()) overlay.registrationNumber = bd.registrationNumber.trim();
    if (bd.jurisdiction?.trim()) overlay.jurisdiction = bd.jurisdiction.trim();
    if (bd.governingLaw?.trim()) overlay.governingLaw = bd.governingLaw.trim();
    else if (bd.jurisdiction?.trim()) overlay.governingLaw = `the laws of ${bd.jurisdiction.trim()}`;
    if (bd.registeredAddress?.trim()) overlay.registeredAddress = bd.registeredAddress.trim();
    if (bd.email?.trim()) overlay.email = bd.email.trim();
    if (bd.phone?.trim()) overlay.phone = bd.phone.trim();
    if (bd.website?.trim()) overlay.website = bd.website.trim();
    if (bd.taxId?.trim()) overlay.taxId = bd.taxId.trim();
    if (bd.asNumber?.trim()) overlay.asNumber = bd.asNumber.trim();
    if (bd.supportHours?.trim()) overlay.supportHours = bd.supportHours.trim();
    content.business = { ...content.business, ...overlay };
  }

  // The policy pages (privacy/terms/refund/shipping) are plain prose strings
  // interpolated from `business` at compose time — before the brand + details
  // overlay above ran, so they'd otherwise still name the starter set's
  // placeholder entity. Rebuild them now from the final, real business info.
  for (const slug of arch.composition.policies) {
    const idx = content.pages.findIndex((p) => p.key === `policy:${slug}`);
    if (idx !== -1) content.pages[idx] = buildPolicyPage(slug, content.business);
  }
  syncContactSupportHours(content, content.business.supportHours);

  const metaPlan = isPlainObject(plan.meta) ? (plan.meta as Record<string, unknown>) : {};
  if (typeof metaPlan.description === 'string' && metaPlan.description.trim()) {
    content.meta = { ...content.meta, description: metaPlan.description.trim() };
  }
  const footerPlan = isPlainObject(plan.footer) ? (plan.footer as Record<string, unknown>) : {};
  if (typeof footerPlan.tagline === 'string' && footerPlan.tagline.trim()) {

    content.footer = { ...content.footer, tagline: footerPlan.tagline.trim() };
  }

  content.source = {
    templateId: content.source?.templateId ?? `archetype:${resolvedArchetypeId}`,
    sector: content.source?.sector ?? 'tech',
    archetype: content.source?.archetype ?? resolvedArchetypeId,
    needsPersonalization: false,
    niche: brief.niche.trim() || undefined,
    tags: deriveTags(brief.niche),
  };

  // 8. Assign the picker-chosen images, then diversify avatars + fill gaps.



  applyPickedImages(content, images);
  return diversifyImages(content);
}

/**
 * Entry point used by routes: resolve the key, then compose. Throws a typed
 * `AI_NOT_CONFIGURED` error if the key is unconfigured or generation fails.

 */
export async function generateSiteFromBriefForUser(opts: {
  brief: GenerateBrief;

  archetypeId?: ArchetypeId;
}): Promise<SiteContent> {
  const apiKey = await getOpenRouterKey();
  if (!isConfiguredKey(apiKey)) {
    const err = new Error('AI site generation is not configured. Add an OPENROUTER_API_KEY to enable it.') as Error & {
      code?: string;
    };
    err.code = 'AI_NOT_CONFIGURED';
    throw err;
  }
  return generateSiteFromBrief({ apiKey, brief: opts.brief, archetypeId: opts.archetypeId });
}