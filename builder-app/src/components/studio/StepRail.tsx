'use client';

import {
  LayoutTemplate,
  Building2,
  Palette,
  LayoutList,
  Rocket,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, STUDIO_STEPS, type StudioStep } from '@/store/studio';
import { cn } from '@/lib/utils';

const STEP_META: Record<StudioStep, { label: string; hint: string; icon: LucideIcon }> = {
  template: { label: 'Template', hint: 'What you started from', icon: LayoutTemplate },
  company: { label: 'Company', hint: 'Your business details', icon: Building2 },
  design: { label: 'Design', hint: 'Theme & colours', icon: Palette },
  sections: { label: 'Sections', hint: 'Edit your pages', icon: LayoutList },
  deploy: { label: 'Deploy', hint: 'Go live', icon: Rocket },
};

export function StepRail() {
  const step = useStudio((s) => s.step);
  const visitedSteps = useStudio((s) => s.visitedSteps);
  const dirty = useStudio((s) => s.dirty);
  const setStep = useStudio((s) => s.setStep);

  return (
    <nav
      aria-label="Studio steps"
      className="flex w-56 shrink-0 flex-col gap-1 border-r border-border bg-card p-3"
    >
      <ol className="flex flex-col gap-1">
        {STUDIO_STEPS.map((s, i) => {
          const { label, hint, icon: Icon } = STEP_META[s];
          const active = step === s;
          const visited = visitedSteps.includes(s) && !active;
          return (
            <li key={s}>
              <button
                type="button"
                onClick={() => setStep(s)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-accent',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border',
                    active
                      ? 'border-primary/30 bg-primary/15 text-primary'
                      : visited
                        ? 'border-border bg-muted text-foreground'
                        : 'border-border bg-background text-muted-foreground',
                  )}
                >
                  {visited ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <span className="text-[11px] font-normal text-muted-foreground">
                      {i + 1}.
                    </span>
                    {label}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto pt-2">
        {dirty && (
          <div className="flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
            Unsaved changes
          </div>
        )}
      </div>
    </nav>
  );
}
