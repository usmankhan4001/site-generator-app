'use client';

import { BUSINESS_CATEGORIES } from './types';
import { CategoryCard, Slide, SlideHeading } from './primitives';

export function BusinessStep({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string, label: string, mode: 'services' | 'ecommerce') => void;
}) {
  return (
    <Slide>
      <SlideHeading>What do you do?</SlideHeading>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {BUSINESS_CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            selected={selectedId === cat.id}
            onClick={() => onSelect(cat.id, cat.label, cat.mode)}
            icon={cat.icon}
            title={cat.label}
            description={cat.description}
          />
        ))}
      </div>
    </Slide>
  );
}
