import type { StockImage } from './types';
import { getCuratedStockImages } from './curated';

/**
 * Shape of a single photo in the Unsplash `search/photos` response (only the
 * fields we consume).
 */
interface UnsplashPhoto {
  urls?: { regular?: string; small?: string; thumb?: string };
  alt_description?: string | null;
  description?: string | null;
  user?: { name?: string | null };
  links?: { html?: string };
}

interface UnsplashSearchResponse {
  results?: UnsplashPhoto[];
}

export interface StockSearchResult {
  configured: boolean;
  results: StockImage[];
  source?: 'unsplash' | 'curated';
}

/**
 * Search a stock-photo provider (Unsplash) for `query`.
 *
 * When `STOCK_IMAGE_API_KEY` is present, attempts live Unsplash query.
 * If unset, rate-limited (HTTP 429/403), network-errored, or returning empty results,
 * it automatically falls back to our curated high-resolution editorial photography vault
 * so that high-quality imagery is ALWAYS available and empty results are NEVER returned.
 */
export async function searchStock(
  query: string,
): Promise<StockSearchResult> {
  const key = process.env.STOCK_IMAGE_API_KEY;

  // If no Unsplash key is configured, instantly serve our zero-slop curated library
  if (!key) {
    const curated = getCuratedStockImages(query, 24);
    return {
      configured: true,
      results: curated,
      source: 'curated',
    };
  }

  const endpoint = new URL('https://api.unsplash.com/search/photos');
  endpoint.searchParams.set('query', query || 'business editorial');
  endpoint.searchParams.set('per_page', '24');

  try {
    const res = await fetch(endpoint, {
      headers: { Authorization: `Client-ID ${key}` },
    });

    if (!res.ok) {
      // Rate-limited or API error -> graceful fallback to curated
      console.warn(`Unsplash API returned status ${res.status}, falling back to curated library`);
      return {
        configured: true,
        results: getCuratedStockImages(query, 24),
        source: 'curated',
      };
    }

    const data = (await res.json()) as UnsplashSearchResponse;
    const rawResults = data.results ?? [];

    if (rawResults.length === 0) {
      // Empty search results -> graceful fallback
      return {
        configured: true,
        results: getCuratedStockImages(query, 24),
        source: 'curated',
      };
    }

    const results: StockImage[] = rawResults
      .map((photo): StockImage | null => {
        const url = photo.urls?.regular ?? photo.urls?.small;
        if (!url) return null;
        return {
          url,
          thumb: photo.urls?.thumb ?? url,
          alt: photo.alt_description ?? photo.description ?? query,
          credit: photo.user?.name
            ? `Photo by ${photo.user.name} on Unsplash`
            : undefined,
        };
      })
      .filter((img): img is StockImage => img !== null);

    if (results.length === 0) {
      return {
        configured: true,
        results: getCuratedStockImages(query, 24),
        source: 'curated',
      };
    }

    return { configured: true, results, source: 'unsplash' };
  } catch (err) {
    console.error('Error fetching from Unsplash API:', err);
    return {
      configured: true,
      results: getCuratedStockImages(query, 24),
      source: 'curated',
    };
  }
}
