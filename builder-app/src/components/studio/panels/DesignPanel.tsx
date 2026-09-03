'use client';

import { useState } from 'react';
import { Check, RotateCcw, Store, Briefcase } from 'lucide-react';
import { useStudio } from '@/store/studio';
import { THEMES_LIST, getTheme } from '@/site/themes';
import { LAYOUT_SYSTEMS, resolveLayoutSystem } from '@/site/layoutSystems';
import { cn } from '@/lib/utils';
import { PanelHeader, SectionLabel, FieldShell } from './fields';
import { Input } from '@/components/ui/input';

export function DesignPanel() {
  const content = useStudio((s) => s.content);
  const setTheme = useStudio((s) => s.setTheme);
  const setAccent = useStudio((s) => s.setAccent);
  const setMode = useStudio((s) => s.setMode);
  const setLayoutSystem = useStudio((s) => s.setLayoutSystem);
  const [accentDraft, setAccentDraft] = useState<string | null>(null);

  if (!content) return null;

  const activeTheme = getTheme(content.themeId);
  const light = THEMES_LIST.filter((t) => !t.isDark);
  const dark = THEMES_LIST.filter((t) => t.isDark);
  const accentValue = accentDraft ?? content.accent ?? '';

  const commitAccent = () => {
    setAccent(accentDraft?.trim() || undefined);
    setAccentDraft(null);
  };

  return (
    <div className="space-y-6 p-4">
      <PanelHeader title="Design" hint="Theme, brand colour and site mode." />

      <div className="space-y-3">
        <SectionLabel>Site mode</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          <ModeButton
            active={content.mode === 'services'}
            icon={Briefcase}
            label="Services"
            hint="Offerings + consultation flow"
            onClick={() => setMode('services')}
          />
          <ModeButton
            active={content.mode === 'ecommerce'}
            icon={Store}
            label="Store"
            hint="Catalogue + product cards"
            onClick={() => setMode('ecommerce')}
          />
        </div>
      </div>

      <div className="space-y-3">
        <SectionLabel>Layout system</SectionLabel>
        <FieldShell hint="Structural composition — headers, card treatment, spacing rhythm. Independent of colour theme.">
          <div className="space-y-2">
            {LAYOUT_SYSTEMS.map((sys) => {
              const active = resolveLayoutSystem(content) === sys.id;
              return (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setLayoutSystem(content.layoutSystem === sys.id ? undefined : sys.id)}
                  className={cn(
                    'flex w-full flex-col items-start gap-0.5 rounded-lg border p-3 text-left transition-colors',
                    active ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/40',
                  )}
                >
                  <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    {sys.name}
                    {!content.layoutSystem && active ? (
                      <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        default for this site
                      </span>
                    ) : null}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{sys.description}</span>
                </button>
              );
            })}
          </div>
        </FieldShell>
      </div>

      <div className="space-y-3">
        <SectionLabel>Accent colour</SectionLabel>
        <FieldShell hint="Overrides the theme's primary colour. Leave blank to use the theme default.">
          <div className="flex items-center gap-2">
            <span
              className="h-9 w-9 shrink-0 rounded-md border border-border"
              style={{ background: accentValue || activeTheme.colors.primary }}
            />
            <Input
              value={accentValue}
              placeholder={activeTheme.colors.primary}
              onChange={(e) => setAccentDraft(e.target.value)}
              onBlur={commitAccent}
              onKeyDown={(e) => e.key === 'Enter' && commitAccent()}
              className="h-9 flex-1 font-mono text-xs"
            />
            {content.accent ? (
              <button
                type="button"
                title="Reset to theme default"
                onClick={() => {
                  setAccentDraft(null);
                  setAccent(undefined);
                }}
                className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        </FieldShell>
      </div>

      <div className="space-y-3">
        <SectionLabel>Theme — light ({light.length})</SectionLabel>
        <ThemeGrid themes={light} activeId={content.themeId} onPick={setTheme} />
      </div>

      <div className="space-y-3">
        <SectionLabel>Theme — dark ({dark.length})</SectionLabel>
        <ThemeGrid themes={dark} activeId={content.themeId} onPick={setTheme} />
      </div>
    </div>
  );
}

function ModeButton({
  active,
  icon: Icon,
  label,
  hint,
  onClick,
}: {
  active: boolean;
  icon: typeof Store;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors',
        active ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/40',
      )}
    >
      <Icon className={cn('h-4 w-4', active ? 'text-primary' : 'text-muted-foreground')} />
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <span className="text-[11px] text-muted-foreground">{hint}</span>
    </button>
  );
}

function ThemeGrid({
  themes,
  activeId,
  onPick,
}: {
  themes: typeof THEMES_LIST;
  activeId: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {themes.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onPick(t.id)}
            className={cn(
              'relative flex flex-col gap-1.5 rounded-lg border p-2.5 text-left transition-colors',
              active ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/40',
            )}
            style={{ background: t.preview.bg }}
          >
            {active ? (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-2.5 w-2.5" />
              </span>
            ) : null}
            <span
              className="block h-6 w-6 rounded-full border border-black/10"
              style={{ background: t.preview.accent }}
            />
            <span className="truncate text-[11px] font-medium" style={{ color: t.preview.text }}>
              {t.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
