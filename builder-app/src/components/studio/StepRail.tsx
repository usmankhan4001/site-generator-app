'use client';

import {
  Building2,
  Palette,
  LayoutList,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, type StudioStep } from '@/store/studio';
import { cn } from '@/lib/utils';

/** Plain workspace navigation — equal-weight destinations, not a wizard. */
const NAV: { step: StudioStep; label: string; hint: string; icon: LucideIcon }[] = [
  { step: 'sections', label: 'Pages', hint: 'Sections & content', icon: LayoutList },
  { step: 'design', label: 'Design', hint: 'Theme & colours', icon: Palette },
  { step: 'company', label: 'Business', hint: 'Your business details', icon: Building2 },
  { step: 'deploy', label: 'Publish', hint: 'Go live', icon: Rocket },
];

export function StepRail() {
  const step = useStudio((s) => s.step);
  const dirty = useStudio((s) => s.dirty);
  const setStep = useStudio((s) => s.setStep);

  return (
    <nav
      aria-label="Studio navigation"
      className="flex w-56 shrink-0 flex-col gap-1 border-r border-border bg-card p-3"
    >
      <ul className="flex flex-col gap-1">
        {NAV.map(({ step: s, label, hint, icon: Icon }) => {
          const active = step === s;
          return (
            <li key={s}>
              <button
                type="button"
                onClick={() => setStep(s)}
                aria-current={active ? 'page' : undefined}
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
                      : 'border-border bg-background text-muted-foreground',
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

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
