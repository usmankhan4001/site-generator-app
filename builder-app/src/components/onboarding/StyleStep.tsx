'use client';

import { THEMES_LIST } from '@/site/themes';
import { ThemeSwatch, Slide, SlideHeading } from './primitives';

export function StyleStep({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Slide>
      <SlideHeading>Pick a vibe</SlideHeading>
      <div className="grid max-h-[60vh] grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2 pr-1">
        {THEMES_LIST.map((theme) => (
          <ThemeSwatch
            key={theme.id}
            selected={selectedId === theme.id}
            onClick={() => onSelect(theme.id)}
            name={theme.name}
            industry={theme.industry}
            preview={theme.preview}
          />
        ))}
      </div>
    </Slide>
  );
}
