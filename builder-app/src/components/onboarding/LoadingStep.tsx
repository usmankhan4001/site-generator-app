'use client';

import { useEffect, useState } from 'react';
import { Slide, SlideHeading } from './primitives';
import { cn } from '@/lib/utils';

const STEPS = [
  'Understanding your business…',
  'Choosing a theme…',
  'Writing your homepage copy…',
  'Assembling your site…',
];

export function LoadingStep({ notice }: { notice?: string | null }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate through the loading steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 1800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1.5;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <Slide>
      <div className="space-y-10 text-center">
        <SlideHeading>Building your site…</SlideHeading>

        {/* Animated skeleton of a site layout */}
        <div className="mx-auto max-w-md space-y-4">
          {/* Header bar */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
            <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 flex-1 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>

          {/* Hero area */}
          <div className="space-y-3 rounded-xl border border-border bg-white p-6">
            <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="mx-auto h-10 w-24 animate-pulse rounded-full bg-muted" />
          </div>

          {/* Content cards */}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="space-y-2 rounded-xl border border-border bg-white p-3"
              >
                <div className="h-16 animate-pulse rounded-lg bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>

        {/* Progress steps */}
        <div className="mx-auto max-w-sm space-y-3">
          {/* Progress bar */}
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Current step text */}
          <div className="space-y-1.5">
            {STEPS.map((step, i) => (
              <p
                key={step}
                className={cn(
                  'text-sm transition-all duration-500',
                  i === currentStep
                    ? 'font-medium text-foreground'
                    : i < currentStep
                      ? 'text-muted-foreground'
                      : 'text-muted-foreground/50',
                )}
              >
                {i < currentStep ? '✓ ' : i === currentStep ? '→ ' : '  '}
                {step}
              </p>
            ))}
          </div>
        </div>

        {notice && (
          <p className="mx-auto max-w-sm text-xs text-muted-foreground">
            {notice}
          </p>
        )}
      </div>
    </Slide>
  );
}
