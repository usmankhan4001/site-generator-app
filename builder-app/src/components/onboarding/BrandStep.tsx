'use client';

import { useEffect, useRef } from 'react';
import type { Ref } from 'react';
import { CenteredInput, ContinueButton, Slide, SlideHeading } from './primitives';

export function BrandStep({
  value,
  onChange,
  onContinue,
}: {
  value: string;
  onChange: (v: string) => void;
  onContinue: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus the input when this slide appears
    const timer = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Slide>
      <SlideHeading>What&apos;s it called?</SlideHeading>
      <div className="space-y-4">
        <CenteredInput
          ref={inputRef as Ref<HTMLInputElement>}
          value={value}
          onChange={onChange}
          placeholder="e.g. Nova, Ember, Atlas"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              onContinue();
            }
          }}
          autoFocus
        />
        <p className="text-center text-sm text-muted-foreground">
          One or two words works best.
        </p>
      </div>
      <ContinueButton onClick={onContinue} disabled={!value.trim()}>
        Continue
      </ContinueButton>
    </Slide>
  );
}
