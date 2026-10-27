'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { recommendArchetypes } from '@/lib/studio/recommend';
import { ProgressBar } from '@/components/onboarding/primitives';
import { LoadingStep } from '@/components/onboarding/LoadingStep';
import type { PreferredMode } from '@/components/onboarding/types';
import type { ArchetypeId } from '@/site/archetypes/types';
import { BusinessPromptStep } from './BusinessPromptStep';
import { StylePickerStep } from './StylePickerStep';
import {
  BusinessDetailsStep,
  EMPTY_BUSINESS_DETAILS,
  type BusinessDetails,
} from './BusinessDetailsStep';

interface CreateData {
  businessName: string;
  prompt: string;
  mode: PreferredMode;
  archetypeId?: ArchetypeId;
  starterSetId?: string;
  themeId: string;
  details: BusinessDetails;
}

const EMPTY_DATA: CreateData = {
  businessName: '',
  prompt: '',
  mode: 'services',
  themeId: '',
  details: EMPTY_BUSINESS_DETAILS,
};

/**
 * Typeform-style one-question-at-a-time site creation flow:
 * 0 — Business name, what it's about, services vs ecommerce (+ optional starter blueprint)
 * 1 — Pick a look (live theme mockups)
 * 2 — Business details (contact + legal, feeds every page)
 * 3 — Loading / AI generation (with full fallback preserving theme + business details)
 */
export function CreateFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const [data, setData] = useState<CreateData>(EMPTY_DATA);
  const [notice, setNotice] = useState<string | null>(null);

  const TOTAL_STEPS = 3; // steps 0-2 are questions, step 3 is loading
  const progressPercent = Math.min((step / TOTAL_STEPS) * 100, 100);

  const patch = useCallback((partial: Partial<CreateData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const patchDetails = useCallback((partial: Partial<BusinessDetails>) => {
    setData((prev) => ({ ...prev, details: { ...prev.details, ...partial } }));
  }, []);

  const advance = useCallback(
    (delayMs = 200) => {
      if (transitioning || step >= TOTAL_STEPS) return;
      setTransitioning(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setSlideKey((k) => k + 1);
        setTransitioning(false);
      }, delayMs);
    },
    [transitioning, step],
  );

  const goBack = useCallback(() => {
    if (transitioning || step <= 0 || step >= TOTAL_STEPS) return;
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setSlideKey((k) => k + 1);
      setTransitioning(false);
    }, 200);
  }, [transitioning, step]);

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

  /** Save the profile + generate the site via AI, or fall back to the best-fit archetype blueprint. */
  const submitAndGenerate = useCallback(async () => {
    setStep(TOTAL_STEPS); // Show loading immediately

    try {
      // 1. Save the profile (best-effort — used only to prefill a future visit).
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche: data.prompt,
          preferredMode: data.mode,
          stylePref: data.themeId,
        }),
      }).catch(() => {});

      // 2. Real AI generation: archetype + starter set picked from the prompt,
      // copy written from the prompt, theme + business details applied directly.
      const aiRes = await fetch('/api/ai/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: data.archetypeId,
          brief: {
            name: data.businessName,
            niche: data.prompt,
            mode: data.mode,
            brief: data.prompt,
            themeId: data.themeId || undefined,
            business: data.details,
          },
        }),
      });

      if (aiRes.ok) {
        const aiData = await aiRes.json();
        if (aiData.success) {
          const projectId = aiData.project?.id;
          if (projectId) {
            router.push(`/project/${projectId}`);
            return;
          }
        }
      }

      // 3. Fallback: AI not configured / failed → best-fit archetype blueprint
      // WITH the user's chosen theme, business name, and legal/contact details preserved.
      setNotice(
        'Building your site from the best-matching industry blueprint with your theme and business details…',
      );

      const recommendations = recommendArchetypes({
        niche: [data.businessName, data.prompt].filter(Boolean).join('. '),
        preferredMode: data.mode,
      });

      const topRec = recommendations[0];
      const finalArchetypeId = data.archetypeId ?? topRec?.archetypeId ?? 'saas';
      const finalStarterSetId = data.starterSetId ?? topRec?.starterSetId ?? null;

      const projectRes = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: finalArchetypeId,
          starterSetId: finalStarterSetId,
          name: data.businessName || data.prompt,
          themeId: data.themeId || undefined,
          business: data.details,
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

      router.push('/');
    } catch (err) {
      console.error('[Create] Error during submission:', err);
      router.push('/');
    }
  }, [data, router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafa]">
      {/* Top progress bar */}
      <ProgressBar percent={progressPercent} />

      {/* Back button for steps 1-2 */}
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
        {transitioning && (
          <div
            key={`exit-${slideKey}`}
            className="absolute inset-0 animate-slide-out-left"
            aria-hidden
          />
        )}

        <div
          key={`slide-${slideKey}-${step}`}
          className="absolute inset-0 animate-slide-in-right"
        >
          {step === 0 && (
            <BusinessPromptStep
              businessName={data.businessName}
              prompt={data.prompt}
              mode={data.mode}
              archetypeId={data.archetypeId}
              starterSetId={data.starterSetId}
              onChangeName={(v) => patch({ businessName: v })}
              onChangePrompt={(v) => patch({ prompt: v })}
              onChangeMode={(v) => patch({ mode: v })}
              onChangeBlueprint={(archId, starterId) =>
                patch({ archetypeId: archId, starterSetId: starterId })
              }
              onContinue={() => advance(200)}
            />
          )}

          {step === 1 && (
            <StylePickerStep
              selectedId={data.themeId}
              onSelect={(id) => {
                patch({ themeId: id });
                advance(250);
              }}
            />
          )}

          {step === 2 && (
            <BusinessDetailsStep
              value={data.details}
              onChange={patchDetails}
              onContinue={() => submitAndGenerate()}
            />
          )}

          {step >= TOTAL_STEPS && <LoadingStep notice={notice} />}
        </div>
      </div>
    </div>
  );
}
