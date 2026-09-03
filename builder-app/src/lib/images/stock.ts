import type { StockImage } from './types';

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

/**
 * Search a stock-photo provider (Unsplash) for `query`.
 *
 * When `STOCK_IMAGE_API_KEY` is unset this returns `{ configured: false,
 * results: [] }` so the onboarding UI can hide the "pick a stock image"
 * affordance without erroring. With a key set, it performs a real Unsplash
 * search and maps the response to `StockImage[]`.
 */
export async function searchStock(
  query: string,
): Promise<{ configured: boolean; results: StockImage[] }> {
  const key = process.env.STOCK_IMAGE_API_KEY;
  if (!key) {
    return { configured: false, results: [] };
  }

  const endpoint = new URL('https://api.unsplash.com/search/photos');
  endpoint.searchParams.set('query', query);
  endpoint.searchParams.set('per_page', '20');

  let res: Response;
  try {
    res = await fetch(endpoint, {
      headers: { Authorization: `Client-ID ${key}` },
    });
  } catch {
    return { configured: true, results: [] };
  }

  if (!res.ok) {
    return { configured: true, results: [] };
  }

  const data = (await res.json()) as UnsplashSearchResponse;

  const results: StockImage[] = (data.results ?? [])
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

  return { configured: true, results };
}
