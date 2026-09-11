/**
 * openrouter.ts — server-only AI copy layer.
 *
 * Calls OpenRouter's OpenAI-compatible `/chat/completions` endpoint to rewrite
 * site copy. Never used in the browser: every path resolves the API key from
 * server env / the Setting table and does the HTTP call server-side, so the
 * key is never exposed to clients.
 *
 * Design:
 *  - `SECTION_FIELDS` is an allow-list of text fields per section type. The AI
 *    may only rewrite these; numbers, enums, URLs, image paths, ids, prices and
 *    other structural data are never touched (we strip them before applying).
 *  - `rewriteSectionWithAI()` builds a section-specific prompt, asks for a
 *    JSON patch, validates/filters it against the allow-list, and returns a
 *    shallow-safe patch that the studio's `updateSectionProps` can merge in.
 */

import { prisma } from '@/lib/db';
import { POLICY_SLUGS } from '@/site/schema';
import type {
  PolicyBlock,
  PolicyDocumentProps,
  PolicySlug,
  SiteContent,
  SectionType,
} from '@/site/schema';

export const OPENROUTER_BASE = 'https://openrouter.ai/api/v1/chat/completions';
export const DEFAULT_MODEL = 'google/gemini-2.5-flash';

/** Resolve the OpenRouter key: stored Setting (admin-editable) or env fallback. */
export async function getOpenRouterKey(): Promise<string> {
  const setting = await prisma.setting.findUnique({
    where: { key: 'openrouter:key' },
  });
  return (setting?.value || process.env.OPENROUTER_API_KEY || '').trim();
}

export function isConfiguredKey(key: string): boolean {
  return key.length > 0;
}

/* ============================================================================
 * Field allow-list — the only props the AI may rewrite per section type.
 * ========================================================================== */

export type FieldSpec =
  /** A single text value (string). */
  | { kind: 'text'; key: string }
  /** An array of plain strings, e.g. bulletPoints. */
  | { kind: 'strings'; key: string }
  /** An array of objects; `itemKeys` names the text sub-fields within each. */
  | { kind: 'objects'; key: string; itemKeys: string[] };

export const SECTION_FIELDS: Partial<Record<SectionType, FieldSpec[]>> = {
  hero: [
    { kind: 'text', key: 'badge' },
    { kind: 'text', key: 'headline' },
    { kind: 'text', key: 'accentText' },
    { kind: 'text', key: 'subtitle' },
    { kind: 'strings', key: 'bulletPoints' },
    { kind: 'strings', key: 'trustBadges' },
  ],
  statsBar: [{ kind: 'objects', key: 'items', itemKeys: ['value', 'label', 'subtext'] }],
  trustBar: [
    { kind: 'text', key: 'title' },
    { kind: 'strings', key: 'items' },
  ],
  featureGrid: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    {
      kind: 'objects',
      key: 'items',
      itemKeys: ['title', 'description', 'badge', 'category', 'tag', 'stat', 'statLabel'],
    },
  ],
  pricingTiers: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'text', key: 'discountBadge' },
    { kind: 'text', key: 'footnote' },
    { kind: 'objects', key: 'tiers', itemKeys: ['name', 'description', 'badge', 'features'] },
  ],
  productGrid: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'items', itemKeys: ['name', 'description', 'category', 'features'] },
  ],
  testimonials: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'items', itemKeys: ['text', 'name', 'role', 'company', 'metricLabel'] },
  ],
  faq: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'items', itemKeys: ['q', 'a'] },
  ],
  ctaBanner: [
    { kind: 'text', key: 'headline' },
    { kind: 'text', key: 'subtitle' },
    { kind: 'text', key: 'guarantee' },
  ],
  pageHeader: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'headline' },
    { kind: 'text', key: 'subtitle' },
    { kind: 'text', key: 'meta' },
  ],
  prose: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'blocks', itemKeys: ['heading', 'body'] },
    { kind: 'strings', key: 'highlights' },
  ],
  timeline: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'milestones', itemKeys: ['title', 'description'] },
  ],
  teamGrid: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'members', itemKeys: ['name', 'role', 'bio'] },
  ],
  valueGrid: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'items', itemKeys: ['title', 'description'] },
  ],
  processSteps: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'steps', itemKeys: ['title', 'description'] },
  ],
  slaTable: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'objects', key: 'rows', itemKeys: ['metric', 'commitment', 'description'] },
  ],
  locationList: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'description' },
    { kind: 'strings', key: 'locations' },
  ],
  contactPanel: [
    { kind: 'text', key: 'eyebrow' },
    { kind: 'text', key: 'title' },
    { kind: 'text', key: 'subtitle' },
    { kind: 'text', key: 'description' },
    { kind: 'text', key: 'submitLabel' },
    { kind: 'strings', key: 'inquiryOptions' },
  ],
};

/* ============================================================================
 * Prompt builder + call
 * ========================================================================== */

function makeContext(content: SiteContent): string {
  const b = content.business;
  const lines: string[] = [
    `Business name: ${b.name || 'unspecified'}`,
    `Short name: ${b.shortName || b.name}`,
    `Industry / archetype: ${content.source?.niche || content.archetype || content.mode}`,
    `Sector: ${content.source?.sector || 'n/a'}`,
    `What the business does (tags): ${(content.source?.tags ?? []).join(', ') || 'n/a'}`,
    `Jurisdiction: ${b.jurisdiction || 'n/a'}`,
    `Website: ${b.website || 'n/a'}`,
  ];
  return lines.join('\n');
}

async function chatCompletion(opts: {
  apiKey: string;
  system: string;
  user: string;
  model?: string;
  maxTokens?: number;
}): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 60_000);
  try {
    const res = await fetch(OPENROUTER_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${opts.apiKey}`,
        'HTTP-Referer': 'https://site-studio.local',
        'X-Title': 'Site Studio',
      },
      body: JSON.stringify({
        model: opts.model || DEFAULT_MODEL,
        messages: [
          { role: 'system', content: opts.system },
          { role: 'user', content: opts.user },
        ],
        temperature: 0.85,
        max_tokens: opts.maxTokens ?? 2000,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`OpenRouter request failed (${res.status}): ${body.slice(0, 200)}`);
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content ?? '';
    if (!text.trim()) throw new Error('OpenRouter returned an empty response.');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Run a completion and parse the model's response as a JSON object.
 * Thin wrapper over `chatCompletion` + `extractJson` for callers (e.g. the
 * `generateSite` core) that want a single structured-object response.
 */
export async function structuredCompletion(opts: {
  apiKey: string;
  system: string;
  user: string;
  model?: string;
  maxTokens?: number;
}): Promise<Record<string, unknown>> {
  const raw = await chatCompletion(opts);
  try {
    return extractJson(raw);
  } catch (err) {
    throw new Error(
      `AI response could not be parsed as JSON (${(err as Error).message}). It may have been cut off — try again` +
        `${opts.maxTokens ? '' : ' with a higher maxTokens'}.`,
    );
  }
}

/** Crudely extract the largest JSON object from a model response. */
function extractJson(text: string): Record<string, unknown> {
  const trimmed = text.trim();
  // Sometimes the model wraps JSON in ```json fences.
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : trimmed;
  try {
    const parsed = JSON.parse(candidate) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    /* fall through to brace-matching */
  }
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('AI response did not contain a JSON object.');
  }
  return JSON.parse(candidate.slice(start, end + 1)) as Record<string, unknown>;
}

/** Validate + filter the model patch through the section's allow-list. */
function applyAllowList(
  type: SectionType,
  originalProps: Record<string, unknown>,
  aiPatch: Record<string, unknown>,
): Record<string, unknown> {
  const specs = SECTION_FIELDS[type] ?? [];
  const filtered: Record<string, unknown> = {};

  for (const spec of specs) {
    const aiValue = aiPatch[spec.key];
    if (aiValue === undefined) continue;

    if (spec.kind === 'text') {
      if (typeof aiValue === 'string' && aiValue.trim()) filtered[spec.key] = aiValue.trim();
      continue;
    }

    if (spec.kind === 'strings') {
      if (Array.isArray(aiValue) && aiValue.every((v) => typeof v === 'string')) {
        filtered[spec.key] = aiValue.map((v) => v.trim()).filter(Boolean);
      }
      continue;
    }

    // kind === 'objects' — overlay text sub-fields per item, preserving the
    // original non-text fields (ids, prices, urls, enums).
    if (Array.isArray(aiValue)) {
      const original = Array.isArray(originalProps[spec.key]) ? (originalProps[spec.key] as unknown[]) : [];
      const merged = aiValue.map((item, idx) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) return {};
        const base = (original[idx] && typeof original[idx] === 'object' && !Array.isArray(original[idx])
          ? (original[idx] as Record<string, unknown>)
          : {}) as Record<string, unknown>;
        for (const k of spec.itemKeys) {
          const v = (item as Record<string, unknown>)[k];
          if (typeof v === 'string') base[k] = v.trim();
          else if (Array.isArray(v) && k.endsWith('s') && v.every((x) => typeof x === 'string')) {
            base[k] = v.map((x) => x.trim()).filter(Boolean);
          }
        }
        return base;
      });
      filtered[spec.key] = merged;
    }
  }

  return filtered;
}

export interface RewriteSectionInput {
  apiKey: string;
  sectionType: SectionType;
  props: Record<string, unknown>;
  content: SiteContent;
  model?: string;
}

/**
 * Rewrite the copy for one section. Returns a validated patch (top-level props
 * to merge). Throws a descriptive Error on any failure.
 */
export async function rewriteSectionWithAI({
  apiKey,
  sectionType,
  props,
  content,
  model,
}: RewriteSectionInput): Promise<Record<string, unknown>> {
  const specs = SECTION_FIELDS[sectionType];
  if (!specs || specs.length === 0) {
    throw new Error(`AI copy is not supported for this section type (${sectionType}).`);
  }

  const context = makeContext(content);
  const fieldList = specs
    .map((s) => {
      if (s.kind === 'text') return `- "${s.key}": a short piece of text`;
      if (s.kind === 'strings') return `- "${s.key}": an array of short strings`;
      return `- "${s.key}": an array of objects with text fields: ${s.itemKeys.join(', ')}`;
    })
    .join('\n');

  const system = [
    "You are an expert B2B website copywriter. Rewrite the copy for a single section of a business website.",
    "Keep the tone professional, specific and confident — never generic or buzzwordy.",
    "Ground every claim in the business context provided; never invent hard numbers (prices, percentages, SLA values) unless the user already supplied them.",
    "Keep legal/brand nouns (exact business name, registration details) untouched.",
    "Output ONLY a JSON object of the fields you changed, with exactly these keys and shapes:",
    fieldList,
    "Return every listed key you improve. Do not include keys that are not listed.",
  ].join('\n');

  const user = [
    `Here is the business context:\n${context}`,
    ``,
    `Here is the current section JSON (for style/length reference only — only rewrite text, keep structure):`,
    `\`\`\`json\n${JSON.stringify(props, null, 2)}\n\`\`\``,
    `Return a JSON object of the rewritten text fields per the schema.`,
  ].join('\n');

  const raw = await chatCompletion({ apiKey, system, user, model });
  const parsed = extractJson(raw);
  return applyAllowList(sectionType, props, parsed);
}

/**
 * Entry point used by routes: resolve the key, then rewrite. Throws a typed
 * error if the key is unconfigured or generation fails.
 */
export async function rewriteSectionForUser(opts: {
  sectionType: SectionType;
  props: Record<string, unknown>;
  content: SiteContent;
}): Promise<Record<string, unknown>> {
  const apiKey = await getOpenRouterKey();
  if (!isConfiguredKey(apiKey)) {
    const err = new Error('AI copy is not configured. Add an OPENROUTER_API_KEY to enable it.') as Error & {
      code?: string;
    };
    err.code = 'AI_NOT_CONFIGURED';
    throw err;
  }
  return rewriteSectionWithAI({ apiKey, sectionType: opts.sectionType, props: opts.props, content: opts.content });
}

/* ============================================================================
 * Policy-page regeneration (Privacy / Terms / Refund / Shipping)
 *
 * Separate from the generic per-section copy rewrite: this grounds AI-authored
 * legal prose on the business's legal fields + the existing policy blocks, and
 * returns structured `{ title, lastUpdated, sections }` patches keyed by the
 * policyDocument section id. Each policy runs in its own request; a single
 * failure is skipped and reported rather than aborting the whole run.
 * ========================================================================== */

/** A validated policy patch the studio can merge into a policyDocument section. */
export interface PolicyPatch {
  title: string;
  lastUpdated: string;
  sections: PolicyBlock[];
}

/** Resolve the policy slug from a page path (`/policies/<slug>`). */
export function policySlugFromPath(path: string): PolicySlug | undefined {
  const m = path.match(/^\/policies\/([^/]+)/);
  if (!m) return undefined;
  return (POLICY_SLUGS as readonly string[]).includes(m[1]) ? (m[1] as PolicySlug) : undefined;
}

/** Legal/brand nouns that must stay verbatim in every policy. */
export function makeLegalContext(content: SiteContent): string {
  const b = content.business;
  return [
    `Legal entity name: ${b.name || 'unspecified'}`,
    `Statutory legal name: ${b.legalName || b.name}`,
    `Registration number: ${b.registrationNumber || 'n/a'}`,
    `Jurisdiction: ${b.jurisdiction || 'n/a'}`,
    `Governing law: ${b.governingLaw || 'n/a'}`,
    `Registered address: ${b.registeredAddress || 'n/a'}`,
    `Support email: ${b.email || 'n/a'}`,
    `Phone: ${b.phone || 'n/a'}`,
    `Website: ${b.website || 'n/a'}`,
    `Tax / VAT ID: ${b.taxId || 'n/a'}`,
    `Support hours: ${b.supportHours || 'n/a'}`,
  ].join('\n');
}

/** Rewrite one policy page and return a validated structured patch. */
export async function rewriteOnePolicy(opts: {
  apiKey: string;
  slug: PolicySlug;
  title: string;
  blocks: PolicyBlock[];
  content: SiteContent;
  model?: string;
}): Promise<PolicyPatch> {
  const context = makeContext(opts.content);
  const legal = makeLegalContext(opts.content);
  const existing = opts.blocks.map((blk) => `## ${blk.heading}\n${blk.body}`).join('\n\n');

  const system = [
    'You are an expert legal copywriter for business websites. Rewrite a single policy page.',
    'Ground every clause in the business context and legal facts provided; never invent registration numbers, addresses, emails, phone numbers, governing law, or other legal/brand nouns.',
    'Keep legal/brand nouns EXACTLY as provided (business name, legal name, registration number, jurisdiction, governing law, address, email, phone, website, tax ID). Do not paraphrase, abbreviate, or alter them.',
    `Keep the same number of sections (## headings) as the existing policy, but you may tighten the wording and rephrase for clarity.`, 
    'Do not invent hard numbers (refund percentages, day counts, monetary amounts) unless they already appear in the existing policy or business context.',
    'Output ONLY a JSON object with this exact shape:',
    '{ "title": "<page title, preserve the existing title>", "sections": [ { "heading": "<section heading>", "body": "<markdown-lite body: paragraphs, **bold**, - lists>" } ] }',
    'Return every section. Do not include any other keys or text.',
  ].join('\n');

  const user = [
    `Business context:\n${context}`,
    '',
    `Legal facts (keep these exact):\n${legal}`,
    '',
    'Existing policy (style/contract reference — keep the same section headings, tighten wording):',
    `\`\`\`markdown\n${existing}\n\`\`\``,
    'Return the rewritten policy as JSON per the schema.',
  ].join('\n');

  const raw = await chatCompletion({ apiKey: opts.apiKey, system, user, model: opts.model });
  const parsed = extractJson(raw);

  const title =
    typeof parsed.title === 'string' && parsed.title.trim() ? parsed.title.trim() : opts.title;
  const sections = Array.isArray(parsed.sections)
    ? parsed.sections
        .filter((s): s is { heading?: unknown; body?: unknown } => !!s && typeof s === 'object')
        .map((s) => ({
          heading:
            typeof s.heading === 'string' && s.heading.trim() ? s.heading.trim() : 'Overview',
          body: typeof s.body === 'string' && s.body.trim() ? s.body.trim() : '',
        }))
        .filter((s) => s.body.length > 0)
    : [];
  if (sections.length === 0) {
    throw new Error('AI returned no usable policy sections.');
  }

  return { title, lastUpdated: new Date().toISOString().slice(0, 10), sections };
}

/**
 * Regenerate every policy page in `content.pages`. Resolves the OpenRouter key
 * (throws AI_NOT_CONFIGURED when unset), then runs each policy independently.
 * Returns patches keyed by the policyDocument section id; failed policies are
 * skipped rather than aborting the run.
 */
export async function rewritePoliciesForUser(opts: {
  content: SiteContent;
  model?: string;
}): Promise<Record<string, PolicyPatch>> {
  const apiKey = await getOpenRouterKey();
  if (!isConfiguredKey(apiKey)) {
    const err = new Error('AI copy is not configured. Add an OPENROUTER_API_KEY to enable it.') as Error & {
      code?: string;
    };
    err.code = 'AI_NOT_CONFIGURED';
    throw err;
  }

  const results: Record<string, PolicyPatch> = {};
  for (const page of opts.content.pages) {
    for (const sec of page.sections) {
      if (sec.type !== 'policyDocument' || !sec.enabled) continue;
      const slug = policySlugFromPath(page.path);
      if (!slug) continue;
      const props = sec.props as PolicyDocumentProps;
      try {
        results[sec.id] = await rewriteOnePolicy({
          apiKey,
          slug,
          title: props.title,
          blocks: props.sections,
          content: opts.content,
          model: opts.model,
        });
      } catch {
        // Per-policy failures don't abort the run; the client reports how many succeeded.
      }
    }
  }
  return results;
}