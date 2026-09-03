'use client';

import type { ReactNode } from 'react';
import { Sparkles, Landmark, Zap, Minus, Sun } from 'lucide-react';
import { SelectableCard } from './primitives';
import type { OnboardingData, StylePref } from './types';

const STYLES: {
  value: StylePref;
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    value: 'modern',
    title: 'Modern',
    description: 'Clean lines, generous whitespace, cool and precise.',
    icon: <Sparkles />,
  },
  {
    value: 'classic',
    title: 'Classic',
    description: 'Timeless and trustworthy, with restrained serif touches.',
    icon: <Landmark />,
  },
  {
    value: 'bold',
    title: 'Bold',
    description: 'High contrast, large type, confident colour.',
    icon: <Zap />,
  },
  {
    value: 'minimal',
    title: 'Minimal',
    description: 'Stripped back to essentials, mostly monochrome.',
    icon: <Minus />,
  },
  {
    value: 'warm',
    title: 'Warm',
    description: 'Friendly and inviting, rounded shapes, earthy palette.',
    icon: <Sun />,
  },
];

export function StyleStep({
  data,
  patch,
}: {
  data: OnboardingData;
  patch: (p: Partial<OnboardingData>) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {STYLES.map((s) => (
        <SelectableCard
          key={s.value}
          selected={data.stylePref === s.value}
          onClick={() => patch({ stylePref: s.value })}
          icon={s.icon}
          title={s.title}
          description={s.description}
        />
      ))}
    </div>
  );
}
