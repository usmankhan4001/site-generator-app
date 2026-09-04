/**
 * Site Kit — archetype composer.
 *
 * `createSiteContentFromArchetype(id, starterSetId)` expands an archetype's
 * `composition` blueprint into a full, renderable `SiteContent`: every
 * `PageBlueprint` -> `SitePage`, every `SectionBlueprint` -> `Section` (props =
 * section defaults <- blueprint seed props <- starter-set slot patch), plus the
 * regenerated policy pages and the `/checkout` hand-off page. Colour theme,
 * accent, business identity, nav, footer and meta come from the starter set
 * when one is supplied, else from the archetype's own defaults / placeholders.
 *
 * The result carries `content.archetype` and `content.source.archetype`, so
 * `resolveArchetype` / `resolveLayoutSystem` / the section renderers all take
 * their archetype-pinned branches. Images are spread across the curated pool by
 * `diversifyImages` before returning, exactly like the template normalizer.
 *
 * Wave 3 wires `buildProjectContentFromArchetype` (in
 * `src/lib/studio/archetypeProjects.ts`) into the create-project API + dialog.
 */

import type {
  BusinessInfo,
  NavItem,
  Section,
  SiteContent,
  SitePage,
} from '@/site/schema';
import type { ArchetypeId, StarterContentSet } from '@/site/archetypes/types';
import { ARCHETYPES, STARTER_SETS } from '@/site/archetypes';
import { defaultPropsFor } from '@/site/sections/defaults';
import { buildPolicyPage } from '@/site/archetypes/policies';
import { diversifyImages } from '@/data/diversifyImages';

/* ============================================================================
 * Placeholders
 * ========================================================================== */

/**
 * A plausible-but-obviously-generic legal entity. Every archetype-composed site
 * starts from this; the studio's personalisation step (or a starter set's
 * `business`) overwrites it before the site ships.
 */
export const PLACEHOLDER_BUSINESS: BusinessInfo = {
  name: 'Northwind Studio Pte. Ltd.',
  shortName: 'Northwind',
  registrationNumber: '2024-000000',
  jurisdiction: 'Singapore',
  governingLaw: 'the laws of Singapore',
  registeredAddress: '68 Circular Road, #02-01, Singapore 049422',
  email: 'hello@northwind.example',
  phone: '+65 6000 0000',
  website: 'northwind.example',
  supportHours: 'Monday – Friday, 09:00 – 18:00 (GMT+8)',
};

/** `source.sector` is a required field the image diversifier keys on. */
const SECTOR_FOR: Record<ArchetypeId, 'tech' | 'retail' | 'hosting'> = {
  saas: 'tech',
  agency: 'tech',
  services: 'tech',
  local: 'tech',
  luxury: 'retail',
  store: 'retail',
};

const POLICY_LABEL: Record<string, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  refund: 'Refund Policy',
  shipping: 'Shipping & Delivery',
};

/* ============================================================================
 * Small local deepMerge — plain objects merge recursively, everything else
 * (arrays included) is replaced by the later source.
 * ========================================================================== */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

function deepMerge<T = Record<string, unknown>>(...sources: unknown[]): T {
  const out: Record<string, unknown> = {};
  for (const src of sources) {
    if (!isPlainObject(src)) continue;
    for (const [k, v] of Object.entries(src)) {
      out[k] = isPlainObject(v) && isPlainObject(out[k]) ? deepMerge(out[k], v) : v;
    }
  }
  return out as T;
}

/* ============================================================================
 * Checkout page — shape copied from `src/lib/normalizeTemplates.ts`
 * (`buildCheckoutPage`). Every site gets one; it's reached via a CTA, never
 * browsed to, so it's kept out of the primary nav.
 * ========================================================================== */

function buildCheckoutPage(): SitePage {
  const section = {
    id: 'checkout-checkout-0',
    enabled: true,
    type: 'checkout',
    props: {},
  } as unknown as Section;

  return {
    key: 'checkout',
    path: '/checkout',
    title: 'Checkout',
    nav: false,
    sections: [section],
  };
}

/* ============================================================================
 * Composer
 * ========================================================================== */

export function createSiteContentFromArchetype(
  archetypeId: ArchetypeId,
  starterSetId: string | null,
): SiteContent {
  const arch = ARCHETYPES[archetypeId];
  const starterSet: StarterContentSet | undefined =
    (starterSetId && STARTER_SETS[starterSetId]) || undefined;

  const business: BusinessInfo = { ...PLACEHOLDER_BUSINESS, ...starterSet?.business };

  /* ---- pages from the composition blueprint ------------------------------ */
  const pages: SitePage[] = arch.composition.pages.map((page) => ({
    key: page.key,
    path: page.path,
    title: page.title,
    ...(page.navLabel ? { navLabel: page.navLabel } : {}),
    nav: page.nav,
    sections: page.sections.map(
      (bp) =>
        ({
          id: `${page.key}-${bp.slot}`,
          enabled: bp.enabled ?? true,
          type: bp.type,
          props: deepMerge(
            defaultPropsFor(bp.type),
            bp.props ?? {},
            starterSet?.slots?.[page.key]?.[bp.slot] ?? {},
          ),
        }) as unknown as Section,
    ),
  }));

  /* ---- regenerated policy pages + checkout hand-off --------------------- */
  for (const slug of arch.composition.policies) {
    pages.push(buildPolicyPage(slug, business));
  }
  pages.push(buildCheckoutPage());

  /* ---- brand / nav / footer / meta ------------------------------------- */
  const accent = starterSet?.accent ?? arch.accent;
  const nav: NavItem[] = starterSet?.nav ?? arch.composition.nav;

  const legalLinks: NavItem[] = arch.composition.policies.map((slug) => ({
    label: POLICY_LABEL[slug] ?? slug,
    href: `/policies/${slug}`,
  }));

  const footer: SiteContent['footer'] = {
    tagline: starterSet?.meta?.description ?? arch.description,
    columns: [],
    legalLinks,
    showLegalBar: arch.composition.footer.showLegalBar,
    showPaymentBadges: arch.composition.footer.showPaymentBadges,
    ...(isPlainObject(starterSet?.footer) ? starterSet!.footer : {}),
  };

  const meta = starterSet?.meta ?? {
    title: business.name,
    description: arch.description,
  };

  /* ---- assemble ------------------------------------------------------- */
  const site: SiteContent = {
    version: 1,
    business,
    mode: arch.mode,
    themeId: starterSet?.themeId ?? arch.defaultThemeId,
    ...(accent ? { accent } : {}),
    ...(starterSet?.layoutSystem ? { layoutSystem: starterSet.layoutSystem } : {}),
    archetype: archetypeId,
    brand: {
      logoText: starterSet?.brand?.logoText ?? business.shortName,
      ...(starterSet?.brand?.logoUrl ? { logoUrl: starterSet.brand.logoUrl } : {}),
    },
    nav,
    ...(starterSet?.headerCta ? { headerCta: starterSet.headerCta } : {}),
    ...(starterSet?.header ? { header: starterSet.header } : {}),
    footer,
    pages,
    meta,
    source: {
      templateId: `archetype:${archetypeId}${starterSetId ? `:${starterSetId}` : ''}`,
      sector: SECTOR_FOR[archetypeId],
      archetype: archetypeId,
      ...(starterSetId ? { starterSetId } : {}),
      needsPersonalization: starterSet?.needsPersonalization ?? true,
      ...(starterSet?.niche ? { niche: starterSet.niche } : {}),
      ...(starterSet?.tags ? { tags: starterSet.tags } : {}),
    },
  };

  return diversifyImages(site);
}
