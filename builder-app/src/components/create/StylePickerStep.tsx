'use client';

import { THEMES_LIST } from '@/site/themes';
import { Slide, SlideHeading } from '@/components/onboarding/primitives';
import { ThemePreviewCard } from './ThemePreviewCard';

/** One combined stylesheet request for every theme's Google Fonts, so the
 * whole grid renders in its real typefaces at once. */
function allGoogleFontsHref(): string {
  const families = Array.from(new Set(THEMES_LIST.flatMap((t) => t.googleFonts)));
  const q = families.map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`).join('&');
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

const FONTS_HREF = allGoogleFontsHref();

export function StylePickerStep({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONTS_HREF} />
      <Slide>
        <SlideHeading>Pick a look</SlideHeading>
        <div className="grid max-h-[62vh] grid-cols-1 gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
          {THEMES_LIST.map((theme) => (
            <ThemePreviewCard
              key={theme.id}
              theme={theme}
              selected={selectedId === theme.id}
              onClick={() => onSelect(theme.id)}
            />
          ))}
        </div>
      </Slide>
    </>
  );
}
