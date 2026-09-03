/**
 * Recommendation Engine for Archetypes and Starter Content Sets.
 *
 * Scores available archetypes and starter sets against the user's onboarding profile:
 * - Free-text niche token matching against keywords, tags, name, and description.
 * - Preferred business mode ('services' vs 'ecommerce').
 * - Visual style preference ('modern', 'classic', 'bold', 'minimal', 'warm').
 *
 * Returns a sorted list of recommendations with explanatory reasons.
 */

import type { ArchetypeId, StarterContentSet } from '@/site/archetypes/types';
import { ARCHETYPES, ARCHETYPE_LIST, STARTER_SET_LIST } from '@/site/archetypes';

export interface UserProfileInput {
  niche?: string | null;
  preferredMode?: string | null;
  stylePref?: string | null;
}

export interface ArchetypeRecommendation {
  archetypeId: ArchetypeId;
  starterSetId?: string;
  score: number;
  reason: string;
}

const STYLE_MAP: Record<string, ArchetypeId[]> = {
  modern: ['saas', 'agency'],
  classic: ['luxury', 'services'],
  bold: ['agency', 'local'],
  minimal: ['luxury', 'store'],
  warm: ['store', 'local'],
};

const STOP_WORDS = new Set([
  'a',
  'about',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'by',
  'for',
  'from',
  'how',
  'i',
  'in',
  'is',
  'it',
  'my',
  'of',
  'on',
  'or',
  'our',
  'that',
  'the',
  'this',
  'to',
  'was',
  'we',
  'what',
  'with',
  'you',
  'your',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

export function recommendArchetypes(
  userProfile: UserProfileInput,
): ArchetypeRecommendation[] {
  const nicheRaw = (userProfile.niche ?? '').trim().toLowerCase();
  const userTokens = nicheRaw ? tokenize(nicheRaw) : [];
  const preferredMode = userProfile.preferredMode?.trim().toLowerCase();
  const stylePref = userProfile.stylePref?.trim().toLowerCase();
  const targetArchetypesForStyle = stylePref ? STYLE_MAP[stylePref] ?? [] : [];

  const recommendations: ArchetypeRecommendation[] = [];

  // 1. Score Archetypes
  for (const arch of ARCHETYPE_LIST) {
    let score = 10;
    const reasons: string[] = [];
    const matchedTokens: string[] = [];

    // Mode match
    if (preferredMode) {
      if (arch.mode === preferredMode) {
        score += 30;
        reasons.push(
          arch.mode === 'ecommerce'
            ? 'built for online sales & product catalogues'
            : 'structured for services & client inquiries',
        );
      } else {
        score -= 10;
      }
    }

    // Style preference match
    if (stylePref && targetArchetypesForStyle.includes(arch.id)) {
      score += 25;
      reasons.push(`matches your ${stylePref} aesthetic`);
    }

    // Niche & keyword matching
    if (nicheRaw) {
      // Substring check against keywords
      for (const kw of arch.keywords) {
        const kwLower = kw.toLowerCase();
        if (nicheRaw.includes(kwLower) || kwLower.includes(nicheRaw)) {
          score += 35;
          matchedTokens.push(kw);
          break;
        }
      }

      // Token matching
      const archSearchSpace = [
        arch.id,
        arch.name.toLowerCase(),
        arch.description.toLowerCase(),
        ...arch.keywords.map((k) => k.toLowerCase()),
      ].join(' ');

      for (const token of userTokens) {
        if (archSearchSpace.includes(token)) {
          score += 15;
          if (!matchedTokens.includes(token)) {
            matchedTokens.push(token);
          }
        }
      }
    }

    let reason: string;
    if (matchedTokens.length > 0) {
      const topMatch = matchedTokens.slice(0, 2).join(', ');
      reason = `Direct match for "${topMatch}" with ${arch.style.treatment} layout.`;
    } else if (reasons.length > 0) {
      reason = `Tailored choice: ${reasons.join(' and ')}.`;
    } else {
      reason = arch.description;
    }

    recommendations.push({
      archetypeId: arch.id,
      score,
      reason,
    });
  }

  // 2. Score Starter Sets
  for (const set of STARTER_SET_LIST) {
    const parentArch = ARCHETYPES[set.archetype];
    if (!parentArch) continue;

    let score = 12;
    const reasons: string[] = [];
    const matchedTokens: string[] = [];

    // Mode match from parent archetype
    if (preferredMode) {
      if (parentArch.mode === preferredMode) {
        score += 30;
      } else {
        score -= 10;
      }
    }

    // Style preference match from parent archetype
    if (stylePref && targetArchetypesForStyle.includes(parentArch.id)) {
      score += 25;
      reasons.push(`matches ${stylePref} style`);
    }

    // Niche & keyword matching against starter set tags & niche
    if (nicheRaw) {
      const setNicheLower = set.niche.toLowerCase();
      if (nicheRaw.includes(setNicheLower) || setNicheLower.includes(nicheRaw)) {
        score += 45;
        matchedTokens.push(set.niche);
      }

      for (const tag of set.tags) {
        const tagLower = tag.toLowerCase();
        if (nicheRaw.includes(tagLower) || tagLower.includes(nicheRaw)) {
          score += 30;
          if (!matchedTokens.includes(tag)) {
            matchedTokens.push(tag);
          }
        }
      }

      const setSearchSpace = [
        set.id,
        set.name.toLowerCase(),
        set.description.toLowerCase(),
        set.niche.toLowerCase(),
        ...set.tags.map((t) => t.toLowerCase()),
      ].join(' ');

      for (const token of userTokens) {
        if (setSearchSpace.includes(token)) {
          score += 20;
          if (!matchedTokens.includes(token)) {
            matchedTokens.push(token);
          }
        }
      }
    }

    let reason: string;
    if (matchedTokens.length > 0) {
      const topMatch = matchedTokens.slice(0, 2).join(', ');
      reason = `Pre-built starter pack matching "${topMatch}" with ready-to-use copy.`;
    } else if (reasons.length > 0) {
      reason = `Pre-built pack for ${set.name} (${reasons.join(', ')}).`;
    } else {
      reason = set.description;
    }

    recommendations.push({
      archetypeId: set.archetype,
      starterSetId: set.id,
      score,
      reason,
    });
  }

  // Sort by score descending
  recommendations.sort((a, b) => b.score - a.score);

  return recommendations;
}
