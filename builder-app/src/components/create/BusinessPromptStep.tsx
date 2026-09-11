'use client';

import { CenteredInput, CenteredTextarea, ContinueButton, Slide, SlideHeading } from '@/components/onboarding/primitives';
import type { PreferredMode } from '@/components/onboarding/types';
import { cn } from '@/lib/utils';

const MODE_OPTIONS: { id: PreferredMode; label: string }[] = [
  { id: 'services', label: 'Services / Local business' },
  { id: 'ecommerce', label: 'Online store / Ecommerce' },
];

export function BusinessPromptStep({
  businessName,
  prompt,
  mode,
  onChangeName,
  onChangePrompt,
  onChangeMode,
  onContinue,
}: {
  businessName: string;
  prompt: string;
  mode: PreferredMode;
  onChangeName: (v: string) => void;
  onChangePrompt: (v: string) => void;
  onChangeMode: (v: PreferredMode) => void;
  onContinue: () => void;
}) {
  const canContinue = businessName.trim().length > 0 && prompt.trim().length > 0;

  return (
    <Slide>
      <SlideHeading>Let&apos;s build your site</SlideHeading>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Business name
          </label>
          <CenteredInput
            value={businessName}
            onChange={onChangeName}
            placeholder="Acme Roofing Co."
            autoFocus
          />
        </div>

        <div>
          <label className="mb-2 block text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
            What&apos;s the business about? What should the site say?
          </label>
          <CenteredTextarea
            value={prompt}
            onChange={onChangePrompt}
            placeholder="e.g. We're a family-run roofing company in Austin, TX. 20 years experience, free inspections. We want the site to feel trustworthy and local, not corporate."
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {MODE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              aria-pressed={mode === opt.id}
              onClick={() => onChangeMode(opt.id)}
              className={cn(
                'rounded-full border-2 px-5 py-2 text-sm font-medium transition-all duration-200',
                mode === opt.id
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/40',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <ContinueButton onClick={onContinue} disabled={!canContinue}>
          Continue
        </ContinueButton>
      </div>
    </Slide>
  );
}
