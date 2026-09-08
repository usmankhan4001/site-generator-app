/**
 * Client-Side Canvas Logo Palette Extractor
 *
 * Extracts dominant Primary, Secondary, and Accent hex colors from an image
 * using an HTML5 Canvas pixel histogram with luminance filtering.
 */

export interface ExtractedPalette {
  primary: string;
  secondary: string;
  accent: string;
  isDark: boolean;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
}

function getLuminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function getColorDistance(c1: [number, number, number], c2: [number, number, number]): number {
  return Math.sqrt(
    Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2),
  );
}

export async function extractPaletteFromImageUrl(imageUrl: string): Promise<ExtractedPalette> {
  return new Promise((resolve) => {
    const fallback: ExtractedPalette = {
      primary: '#0ea5e9',
      secondary: '#1e293b',
      accent: '#84cc16',
      isDark: false,
    };

    if (typeof window === 'undefined') {
      return resolve(fallback);
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(fallback);

        const width = (canvas.width = Math.min(img.naturalWidth || 200, 200));
        const height = (canvas.height = Math.min(img.naturalHeight || 200, 200));

        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height).data;

        const colorMap = new Map<string, { count: number; rgb: [number, number, number] }>();

        for (let i = 0; i < imageData.length; i += 16) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];

          // Ignore transparent or near-white / near-black extreme pixels
          if (a < 128) continue;
          const lum = getLuminance(r, g, b);
          if (lum < 15 || lum > 245) continue;

          // Bucket to reduce noise (quantize by 16)
          const qr = Math.round(r / 16) * 16;
          const qg = Math.round(g / 16) * 16;
          const qb = Math.round(b / 16) * 16;
          const key = `${qr},${qg},${qb}`;

          const existing = colorMap.get(key);
          if (existing) {
            existing.count++;
          } else {
            colorMap.set(key, { count: 1, rgb: [qr, qg, qb] });
          }
        }

        const sorted = Array.from(colorMap.values()).sort((a, b) => b.count - a.count);
        if (sorted.length === 0) return resolve(fallback);

        const primaryRgb = sorted[0].rgb;
        const primary = rgbToHex(...primaryRgb);

        // Find secondary with sufficient perceptual distance
        let secondaryRgb = primaryRgb;
        for (let i = 1; i < sorted.length; i++) {
          if (getColorDistance(primaryRgb, sorted[i].rgb) > 50) {
            secondaryRgb = sorted[i].rgb;
            break;
          }
        }
        const secondary = rgbToHex(...secondaryRgb);

        // Find accent with vibrant luminance or contrast
        let accentRgb = secondaryRgb;
        for (let i = 2; i < sorted.length; i++) {
          if (
            getColorDistance(primaryRgb, sorted[i].rgb) > 60 &&
            getColorDistance(secondaryRgb, sorted[i].rgb) > 60
          ) {
            accentRgb = sorted[i].rgb;
            break;
          }
        }
        const accent = rgbToHex(...accentRgb);

        const avgLum = getLuminance(...primaryRgb);

        resolve({
          primary,
          secondary,
          accent,
          isDark: avgLum < 128,
        });
      } catch {
        resolve(fallback);
      }
    };

    img.onerror = () => {
      resolve(fallback);
    };

    img.src = imageUrl;
  });
}
