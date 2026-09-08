/**
 * Reassigns repeated stock images across a `SiteContent` using `IMAGE_POOL`,
 * deterministically seeded by the business name so results are stable per site
 * but vary across templates that would otherwise share the same handful of
 * stock photos (the factory-generated retail/hosting templates in particular).
 * Pure — returns a new `SiteContent`, does not mutate the input.
 */

import type { SiteContent, Section } from '@/site/schema';
import { pickImages, pickAvatars, type ImageCategory } from './imagePool';

function categoriesFor(content: SiteContent): ImageCategory[] {
  switch (content.source?.sector) {
    case 'retail':
      return ['retail-product', 'luxury-goods', 'workshop-craft'];
    case 'hosting':
      return ['datacenter', 'infrastructure', 'tech-abstract'];
    case 'tech':
    default:
      return ['tech-abstract', 'infrastructure', 'office-team'];
  }
}

export function diversifyImages(content: SiteContent): SiteContent {
  const clone: SiteContent =
    typeof structuredClone === 'function'
      ? structuredClone(content)
      : JSON.parse(JSON.stringify(content));

  const cats = categoriesFor(clone);
  const seed = clone.business.name || clone.source?.templateId || 'site';

  const heroImages = pickImages(cats[0], 12, `${seed}:hero`);
  const featureImages = pickImages(cats[1] ?? cats[0], 12, `${seed}:feature`);
  const productImages = pickImages(cats[0], 24, `${seed}:product`);
  const avatars = pickAvatars(24, seed);

  let heroI = 0;
  let featureI = 0;
  let productI = 0;
  let avatarI = 0;

  const nextHero = () => heroImages[heroI++ % (heroImages.length || 1)];
  const nextFeature = () => featureImages[featureI++ % (featureImages.length || 1)];
  const nextProduct = () => productImages[productI++ % (productImages.length || 1)];
  const nextAvatar = () => avatars[avatarI++ % (avatars.length || 1)];

  for (const page of clone.pages) {
    for (const section of page.sections) {
      applyToSection(section, { nextHero, nextFeature, nextProduct, nextAvatar });
    }
  }

  return clone;
}

function applyToSection(
  section: Section,
  fns: {
    nextHero: () => string | undefined;
    nextFeature: () => string | undefined;
    nextProduct: () => string | undefined;
    nextAvatar: () => string | undefined;
  },
) {
  const p = section.props as Record<string, unknown>;
  switch (section.type) {
    case 'hero': {
      if (p.image === 'seed' || !p.image) {
        p.image = fns.nextHero() ?? p.image;
      }
      break;
    }
    case 'featureGrid': {
      const items = p.items as { image?: string }[] | undefined;
      items?.forEach((it) => {
        if (!it.image || it.image === 'seed') {
          it.image = fns.nextFeature() ?? it.image;
        }
      });
      break;
    }
    case 'prose': {
      if (p.image === 'seed' || !p.image) {
        p.image = fns.nextFeature() ?? p.image;
      }
      break;
    }
    case 'productGrid': {
      const items = p.items as { image?: string }[] | undefined;
      items?.forEach((it) => {
        if (!it.image || it.image === 'seed') {
          it.image = fns.nextProduct() ?? it.image;
        }
      });
      break;
    }
    case 'testimonials': {
      const items = p.items as { avatar?: string }[] | undefined;
      items?.forEach((it) => {
        if (!it.avatar || it.avatar === 'seed') {
          it.avatar = fns.nextAvatar() ?? it.avatar;
        }
      });
      break;
    }
    case 'teamGrid': {
      const members = p.members as { avatar?: string }[] | undefined;
      members?.forEach((m) => {
        if (!m.avatar || m.avatar === 'seed') {
          m.avatar = fns.nextAvatar() ?? m.avatar;
        }
      });
      break;
    }
    default:
      break;
  }
}
