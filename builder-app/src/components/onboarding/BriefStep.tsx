'use client';

import { CenteredTextarea, ContinueButton, Slide, SlideHeading } from './primitives';

export function BriefStep({
  value,
  onChange,
  onContinue,
  onSkip,
}: {
  value: string;
  onChange: (v: string) => void;
  onContinue: () => void;
  onSkip: () => void;
}) {
  return (
    <Slide>
      <SlideHeading>Anything else?</SlideHeading>
      <div className="space-y-4">
        <CenteredTextarea
          value={value}
          onChange={onChange}
          placeholder="e.g. We make handcrafted leather bags in Florence."
        />
        <p className="text-center text-sm text-muted-foreground">
          Help us write better copy for your site.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <ContinueButton onClick={onContinue}>Continue</ContinueButton>
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Skip
        </button>
      </div>
    </Slide>
  );
}
