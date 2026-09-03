'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { BusinessStep } from './BusinessStep';
import { LegalStep } from './LegalStep';
import { StyleStep } from './StyleStep';
import { BrandStep } from './BrandStep';
import { EMPTY_ONBOARDING, type LegalDetails, type OnboardingData } from './types';

const STEPS = [
  {
    title: 'Tell us about your business',
    subtitle: 'This helps us pick the best site archetype and generate relevant copy.',
  },
  {
    title: 'Entity & compliance details',
    subtitle: 'These details are woven into your footer, contact section, and legal policies.',
  },
  {
    title: 'Pick your aesthetic',
    subtitle: 'Choose the visual tone that matches your brand.',
  },
  {
    title: 'Add your brand assets',
    subtitle: 'Upload your logo and pick your accent color.',
  },
];

export function OnboardingFlow({ firstName }: { firstName?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(EMPTY_ONBOARDING);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const patchLegal = (partial: Partial<LegalDetails>) => {
    setData((prev) => ({
      ...prev,
      legal: { ...prev.legal, ...partial },
    }));
  };

  const canContinue = () => {
    if (step === 0) {
      return data.niche.trim().length > 0;
    }
    return true;
  };

  const handleNext = async () => {
    setError(null);
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || 'Failed to save onboarding answers.');
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    setError(null);
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const progressPercent = ((step + 1) / STEPS.length) * 100;
  const current = STEPS[step];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        {/* Header with progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>
              {firstName ? `Welcome, ${firstName} — ` : ''}Step {step + 1} of {STEPS.length}
            </span>
            <span>{Math.round(progressPercent)}% completed</span>
          </div>
          <Progress value={progressPercent} className="h-1.5" />
        </div>

        {/* Step Title */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {current.title}
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">{current.subtitle}</p>
        </div>

        {/* Step Body */}
        <Card className="border border-border bg-card">
          <CardContent className="p-6 sm:p-8">
            {step === 0 && <BusinessStep data={data} patch={patch} />}
            {step === 1 && <LegalStep data={data} patchLegal={patchLegal} />}
            {step === 2 && <StyleStep data={data} patch={patch} />}
            {step === 3 && <BrandStep data={data} patch={patch} />}

            {error && (
              <div className="mt-6 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0 || submitting}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          <Button
            type="button"
            onClick={handleNext}
            disabled={!canContinue() || submitting}
            className="gap-2 min-w-[120px]"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Setting up…
              </>
            ) : step === STEPS.length - 1 ? (
              <>
                <Check className="size-4" />
                Finish & create site
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <footer className="text-center text-xs text-muted-foreground py-4">
        You can always adjust these settings later in the site workspace.
      </footer>
    </div>
  );
}
