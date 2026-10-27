'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import {
  CenteredInput,
  CenteredTextarea,
  ContinueButton,
  Slide,
  SlideHeading,
} from '@/components/onboarding/primitives';
import type { PreferredMode } from '@/components/onboarding/types';
import { ARCHETYPE_LIST, STARTER_SET_LIST } from '@/site/archetypes';
import type { ArchetypeId } from '@/site/archetypes/types';
import { cn } from '@/lib/utils';

const MODE_OPTIONS: { id: PreferredMode; label: string }[] = [
  { id: 'services', label: 'Services / Local business' },
  { id: 'ecommerce', label: 'Online store / Ecommerce' },
];

export function BusinessPromptStep({
  businessName,
  prompt,
  mode,
  archetypeId,
  starterSetId,
  onChangeName,
  onChangePrompt,
  onChangeMode,
  onChangeBlueprint,
  onContinue,
}: {
  businessName: string;
  prompt: string;
  mode: PreferredMode;
  archetypeId?: ArchetypeId;
  starterSetId?: string;
  onChangeName: (v: string) => void;
  onChangePrompt: (v: string) => void;
  onChangeMode: (v: PreferredMode) => void;
  onChangeBlueprint?: (archetypeId?: ArchetypeId, starterSetId?: string) => void;
  onContinue: () => void;
}) {
  const [showBlueprints, setShowBlueprints] = useState(Boolean(archetypeId || starterSetId));
  const canContinue = businessName.trim().length > 0 && (prompt.trim().length > 0 || Boolean(starterSetId));

  const selectedStarter = starterSetId
    ? STARTER_SET_LIST.find((s) => s.id === starterSetId)
    : undefined;

  return (
    <Slide>
      <SlideHeading>Let&apos;s build your site</SlideHeading>

      <div className="space-y-5">
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

        {/* Optional Blueprint / Starter Template Picker */}
        {onChangeBlueprint && (
          <div className="pt-1">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowBlueprints((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>
                  {selectedStarter
                    ? `Blueprint: ${selectedStarter.name}`
                    : 'Or pick a specific industry template (optional — AI auto-selects by default)'}
                </span>
                <ChevronDown
                  className={cn(
                    'h-3.5 w-3.5 transition-transform',
                    showBlueprints && 'rotate-180',
                  )}
                />
              </button>
            </div>

            {showBlueprints && (
              <div className="mt-3 max-h-52 overflow-y-auto rounded-2xl border border-border bg-background/90 p-3 shadow-sm space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    30 Ready-Made Industry Starter Kits
                  </span>
                  {(archetypeId || starterSetId) && (
                    <button
                      type="button"
                      onClick={() => onChangeBlueprint(undefined, undefined)}
                      className="text-[11px] font-medium text-primary hover:underline"
                    >
                      Reset to AI Auto-Pick
                    </button>
                  )}
                </div>

                {ARCHETYPE_LIST.map((arch) => {
                  const starters = STARTER_SET_LIST.filter(
                    (s) => s.archetype === arch.id,
                  );
                  return (
                    <div key={arch.id} className="space-y-1.5">
                      <div className="text-[11px] font-bold text-foreground px-1">
                        {arch.name}{' '}
                        <span className="font-normal text-muted-foreground">
                          — {arch.description}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {starters.map((st) => {
                          const active = starterSetId === st.id;
                          return (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => {
                                onChangeBlueprint(arch.id, st.id);
                                onChangeMode(arch.mode);
                                if (!prompt.trim()) {
                                  onChangePrompt(`${st.name} — ${st.description}`);
                                }
                              }}
                              className={cn(
                                'flex flex-col items-start rounded-xl border px-3 py-2 text-left transition-all',
                                active
                                  ? 'border-primary bg-primary/10 ring-1 ring-primary/30'
                                  : 'border-border/70 bg-card hover:border-primary/40',
                              )}
                            >
                              <span className="text-xs font-semibold text-foreground">
                                {st.name}
                              </span>
                              <span className="line-clamp-1 text-[10px] text-muted-foreground">
                                {st.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <ContinueButton onClick={onContinue} disabled={!canContinue}>
          Continue
        </ContinueButton>
      </div>
    </Slide>
  );
}
