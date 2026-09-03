'use client';

import {
  LayoutTemplate,
  Building2,
  Palette,
  LayoutList,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, STUDIO_STEPS, type StudioStep } from '@/store/studio';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const STEP_META: Record<StudioStep, { label: string; icon: LucideIcon }> = {
  template: { label: 'Template', icon: LayoutTemplate },
  company: { label: 'Company', icon: Building2 },
  design: { label: 'Design', icon: Palette },
  sections: { label: 'Sections', icon: LayoutList },
  deploy: { label: 'Deploy', icon: Rocket },
};

export function StepRail() {
  const step = useStudio((s) => s.step);
  const dirty = useStudio((s) => s.dirty);
  const setStep = useStudio((s) => s.setStep);

  return (
    <nav
      aria-label="Studio steps"
      className="flex w-14 shrink-0 flex-col items-center gap-1 border-r border-border bg-card py-3"
    >
      {STUDIO_STEPS.map((s, i) => {
        const { label, icon: Icon } = STEP_META[s];
        const active = step === s;
        return (
          <Tooltip key={s}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setStep(s)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                {active && (
                  <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary" />
                )}
                <span className="sr-only">
                  Step {i + 1}: {label}
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
        );
      })}

      <div className="mt-auto pt-2">
        {dirty && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className="block h-2 w-2 rounded-full bg-amber-400"
                aria-label="Unsaved changes"
              />
            </TooltipTrigger>
            <TooltipContent side="right">Unsaved changes</TooltipContent>
          </Tooltip>
        )}
      </div>
    </nav>
  );
}
