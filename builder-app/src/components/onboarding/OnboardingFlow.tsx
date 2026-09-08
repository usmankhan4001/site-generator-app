'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { recommendArchetypes } from '@/lib/studio/recommend';
import { BusinessStep } from './BusinessStep';
import { BrandStep } from './BrandStep';
import { StyleStep } from './StyleStep';
import { BriefStep } from './BriefStep';
import { LoadingStep } from './LoadingStep';
import { ProgressBar } from './primitives';
import { EMPTY_ONBOARDING, type OnboardingData } from './types';

/**
 * Typeform-style one-question-at-a-time onboarding flow.
 *
 * Each question fills the entire viewport. Transitions slide the current
 * question out to the left and the next one in from the right. No back
 * button — press Escape to go back. Enter or Continue advances.
 *
 * Steps:
 * 0 — What do you do? (category cards)
 * 1 — What's it called? (business name)
 * 2 — Pick a vibe (theme swatches)
 * 3 — Anything else? (optional brief)
 * 4 — Loading / AI generation
 */
export function OnboardingFlow({ firstName }: { firstName?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const [data, setData] = useState<OnboardingData>(EMPTY_ONBOARDING);
  const [notice, setNotice] = useState<string | null>(null);

  const TOTAL_STEPS = 4; // steps 0-3 are questions, step 4 is loading
  const progressPercent = Math.min((step / TOTAL_STEPS) * 100, 100);

  const patch = useCallback((partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  /** Advance to the next slide. */
  const advance = useCallback(
    (delayMs = 200) => {
      if (transitioning || step >= TOTAL_STEPS) return;
      setTransitioning(true);
      // Wait for exit animation, then mount new slide
      setTimeout(() => {
        setStep((s) => s + 1);
        setSlideKey((k) => k + 1);
        setTransitioning(false);
      }, delayMs);
    },
    [transitioning, step],
  );

  /** Go back one slide (Escape key). */
  const goBack = useCallback(() => {
    if (transitioning || step <= 0 || step >= TOTAL_STEPS) return;
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setSlideKey((k) => k + 1);
      setTransitioning(false);
    }, 200);
  }, [transitioning, step]);

  // Keyboard: Escape goes back
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (step >= TOTAL_STEPS) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        goBack();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [step, goBack]);

  /** Save onboarding + create site via AI, or fallback to archetype blueprint. */
  const submitAndGenerate = useCallback(async () => {
    setStep(TOTAL_STEPS); // Show loading immediately

    try {
      // 1. Save onboarding data
      const saveRes = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: data.niche,
          preferredMode: data.preferredMode,
          stylePref: data.stylePref,
        }),
      });
      if (!saveRes.ok) {
        const err = await saveRes.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save onboarding.');
      }

      // 2. Try AI generation
      const aiRes = await fetch('/api/ai/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief: {
            name: data.businessName || data.niche,
            niche: data.niche,
            mode: data.preferredMode,
            vibe: data.stylePref,
            brief: data.brief,
          },
        }),
      });

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        if (aiData.success) {
          const projectId = aiData.project?.id || aiData.content?.projectId;
          if (projectId) {
            router.push(`/project/${projectId}`);
            return;
          }
        }
      }

      // 3. Fallback: 503 or any AI failure → archetype blueprint
      setNotice(
        "AI isn't configured yet — you have a starting template to customize.",
      );

      const recommendations = recommendArchetypes({
        niche: data.niche,
        preferredMode: data.preferredMode,
        stylePref: data.stylePref,
      });

      const topRec = recommendations[0];
      if (!topRec) {
        throw new Error('No suitable template found.');
      }

      const projectRes = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: topRec.archetypeId,
          starterSetId: topRec.starterSetId ?? null,
          name: data.businessName || data.niche,
        }),
      });

      if (!projectRes.ok) {
        const err = await projectRes.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create project.');
      }

      const projectData = await projectRes.json();
      const projectId = projectData.project?.id;
      if (projectId) {
        router.push(`/project/${projectId}`);
        return;
      }

      // Safety net
      router.push('/');
    } catch (err) {
      console.error('[Onboarding] Error during submission:', err);
      router.push('/');
    }
  }, [data, router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa]">
      {/* Top progress bar */}
      <ProgressBar percent={progressPercent} />

      {/* Back button for steps 1-3 */}
      {step > 0 && step < TOTAL_STEPS && (
        <button
          type="button"
          onClick={goBack}
          className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/90 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:bg-background hover:text-foreground hover:shadow active:scale-95"
          aria-label="Back to previous step"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      )}

      {/* Sliding viewport */}
      <div className="relative h-screen w-full">
        {/* Outgoing slide (exits left or right) */}
        {transitioning && (
          <div
            key={`exit-${slideKey}`}
            className="absolute inset-0 animate-slide-out-left"
            aria-hidden
          />
        )}

        {/* Incoming slide */}
        <div
          key={`slide-${slideKey}-${step}`}
          className="absolute inset-0 animate-slide-in-right"
        >
          {step === 0 && (
            <BusinessStep
              selectedId={
                data.niche === 'Local Business'
                  ? 'local'
                  : data.niche === 'Online Store'
                    ? 'store'
                    : data.niche === 'Professional Services'
                      ? 'professional'
                      : data.niche === 'Agency / Studio'
                        ? 'agency'
                        : data.niche === 'SaaS / Software'
                          ? 'saas'
                          : data.niche === 'Luxury / Premium'
                            ? 'luxury'
                            : ''
              }
              onSelect={(_id, label, mode) => {
                setData((prev) => ({
                  ...prev,
                  niche: label,
                  preferredMode: mode,
                }));
                advance(250);
              }}
            />
          )}

          {step === 1 && (
            <BrandStep
              value={data.businessName}
              onChange={(v) => patch({ businessName: v })}
              onContinue={() => advance(200)}
            />
          )}

          {step === 2 && (
            <StyleStep
              selectedId={data.stylePref}
              onSelect={(id) => {
                patch({ stylePref: id });
                advance(250);
              }}
            />
          )}

          {step === 3 && (
            <BriefStep
              value={data.brief}
              onChange={(v) => patch({ brief: v })}
              onContinue={() => submitAndGenerate()}
              onSkip={() => submitAndGenerate()}
            />
          )}

          {step >= TOTAL_STEPS && <LoadingStep notice={notice} />}
        </div>
      </div>

      {/* Subtle footer */}
      {step < TOTAL_STEPS && (
        <div className="fixed inset-x-0 bottom-0 z-40 pb-4 text-center text-xs text-muted-foreground/60">
          {firstName ? `Welcome, ${firstName}` : ''}
        </div>
      )}
    </div>
  );
}
