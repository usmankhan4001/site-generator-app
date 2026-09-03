'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Gem,
  Layers,
  Layout,
  Loader2,
  MapPin,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ARCHETYPES, ARCHETYPE_LIST, STARTER_SETS } from '@/site/archetypes';
import type { ArchetypeId, ArchetypeMeta, StarterContentSet } from '@/site/archetypes/types';
import { getTheme } from '@/site/themes';
import { cn } from '@/lib/utils';
import { recommendArchetypes } from '@/lib/studio/recommend';
import { Field, SelectableCard, textareaClass } from '@/components/onboarding/primitives';
import type { PreferredMode } from '@/components/onboarding/types';
import { TemplatePreviewCard } from './TemplatePreviewCard';

export interface TemplateOption {
  id: string;
  name: string;
  sector: 'tech' | 'retail' | 'hosting';
  mode: 'services' | 'ecommerce';
  themeId: string;
  accent?: string;
  description: string;
  ogImage?: string;
  needsPersonalization: boolean;
}

/** Internal flow phase. Steps 1-3 map onto these as: niche -> {match|browseArchetype|browseStarter} -> name. */
type Phase = 'niche' | 'match' | 'browseArchetype' | 'browseStarter' | 'name';

interface Match {
  starterSet: StarterContentSet;
  archetype: ArchetypeMeta;
}

/** Top starter-set recommendation for a niche + mode, resolved to its archetype. */
function computeMatch(nicheText: string, modeVal: PreferredMode | ''): Match | null {
  const recs = recommendArchetypes({
    niche: nicheText,
    preferredMode: modeVal || undefined,
  });
  const topStarterRec = recs.find((r) => r.starterSetId);
  if (!topStarterRec?.starterSetId) return null;
  const starterSet = STARTER_SETS[topStarterRec.starterSetId];
  if (!starterSet) return null;
  const archetype = ARCHETYPES[starterSet.archetype];
  if (!archetype) return null;
  return { starterSet, archetype };
}

const ARCHETYPE_ICONS: Record<ArchetypeId, React.ComponentType<{ className?: string }>> = {
  saas: Layers,
  agency: Palette,
  luxury: Gem,
  services: Briefcase,
  store: ShoppingBag,
  local: MapPin,
};

const ARCHETYPE_DISPLAY_TAGS: Record<ArchetypeId, string[]> = {
  saas: ['DevOps & CI/CD', 'AI Platforms', 'B2B SaaS', 'APIs & Cloud'],
  agency: ['Design Studios', 'Brand Identity', 'Growth Labs', 'Dev Shops'],
  luxury: ['Haute Horlogerie', 'Bespoke Leather', 'Fine Jewelry', 'High-End Retail'],
  services: ['Strategic Advisory', 'Managed IT & SOC', 'Corporate Finance', 'Consulting'],
  store: ['Nordic Homeware', 'Specialty Coffee', 'Audiophile Gear', 'DTC Brands'],
  local: ['Dental Clinics', 'Master Builders', 'Auto Detailing', 'Trade & Services'],
};

export function NewProjectDialog({
  open,
  onOpenChange,
  skipToStep2,
  initialNiche,
  initialMode,
}: {
  templates?: TemplateOption[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Skip Step 1 and land straight on Step 2, seeded from initialNiche/initialMode. */
  skipToStep2?: boolean;
  initialNiche?: string;
  initialMode?: PreferredMode;
}) {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('niche');
  /** Where Step 3's Back/Change controls should return to. */
  const [returnPhase, setReturnPhase] = useState<'match' | 'browseStarter'>('match');

  // Step 1 inputs
  const [niche, setNiche] = useState('');
  const [mode, setMode] = useState<PreferredMode | ''>('');
  const [match, setMatch] = useState<Match | null>(null);

  // Fallback "browse all templates" grid state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId | null>(null);
  const [selectedStarterSetId, setSelectedStarterSetId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset dialog state when closed
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setPhase('niche');
      setReturnPhase('match');
      setNiche('');
      setMode('');
      setMatch(null);
      setSearchQuery('');
      setSelectedArchetypeId(null);
      setSelectedStarterSetId(null);
      setName('');
      setCreating(false);
      setError(null);
    }, 200);
    return () => clearTimeout(t);
  }, [open]);

  // Opened straight into Step 2 (e.g. right after onboarding) — skip the niche re-ask.
  useEffect(() => {
    if (!open || !skipToStep2 || !initialNiche) return;
    const seededMode: PreferredMode | '' = initialMode ?? '';
    setNiche(initialNiche);
    setMode(seededMode);
    setMatch(computeMatch(initialNiche, seededMode));
    setPhase('match');
  }, [open, skipToStep2, initialNiche, initialMode]);

  // A returning user's saved profile prefills Step 1 (still editable) — but
  // never overrides the onboarding hand-off above, which already knows better.
  useEffect(() => {
    if (!open || skipToStep2) return;
    let cancelled = false;
    fetch('/api/onboarding')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        if (typeof d.niche === 'string' && d.niche) setNiche((cur) => cur || d.niche);
        if (d.preferredMode === 'ecommerce' || d.preferredMode === 'services') {
          setMode((cur) => cur || d.preferredMode);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open, skipToStep2]);

  // Selected Archetype Metadata
  const selectedArchetype: ArchetypeMeta | null = useMemo(() => {
    return selectedArchetypeId ? ARCHETYPES[selectedArchetypeId] : null;
  }, [selectedArchetypeId]);

  // Starter sets for the chosen archetype
  const availableStarterSets: StarterContentSet[] = useMemo(() => {
    if (!selectedArchetypeId) return [];
    const arch = ARCHETYPES[selectedArchetypeId];
    if (!arch) return [];
    return arch.starterSetIds
      .map((id) => STARTER_SETS[id])
      .filter((s): s is StarterContentSet => Boolean(s));
  }, [selectedArchetypeId]);

  // Selected Starter Set Object
  const selectedStarterSet: StarterContentSet | null = useMemo(() => {
    if (!selectedStarterSetId) return null;
    return STARTER_SETS[selectedStarterSetId] ?? null;
  }, [selectedStarterSetId]);

  // Recommendation Scoring for the "browse all" archetype grid
  const scoredArchetypes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ARCHETYPE_LIST.map((arch) => {
      let score = 0;
      if (q) {
        if (arch.name.toLowerCase().includes(q)) score += 50;
        if (arch.description.toLowerCase().includes(q)) score += 30;
        if (arch.keywords.some((k) => k.toLowerCase().includes(q))) score += 40;
        const tags = ARCHETYPE_DISPLAY_TAGS[arch.id] || [];
        if (tags.some((t) => t.toLowerCase().includes(q))) score += 45;
      } else {
        // Default baseline scoring: SaaS & Agency have high initial popularity
        if (arch.id === 'saas') score = 95;
        else if (arch.id === 'agency') score = 90;
        else if (arch.id === 'store') score = 85;
        else if (arch.id === 'services') score = 80;
        else if (arch.id === 'luxury') score = 75;
        else if (arch.id === 'local') score = 70;
      }
      return { arch, score };
    }).sort((a, b) => b.score - a.score);
  }, [searchQuery]);

  // The top recommended archetype ID
  const topRecommendedId = useMemo(() => {
    if (scoredArchetypes.length === 0) return 'saas';
    return scoredArchetypes[0].arch.id;
  }, [scoredArchetypes]);

  function handleSelectArchetype(archId: ArchetypeId) {
    setSelectedArchetypeId(archId);
    const arch = ARCHETYPES[archId];
    const firstSetId = arch.starterSetIds[0] ?? null;
    setSelectedStarterSetId(firstSetId);
    setPhase('browseStarter');
    setError(null);
  }

  function handleSelectStarterSet(setId: string | null) {
    setSelectedStarterSetId(setId);
    if (setId && STARTER_SETS[setId]) {
      setName(STARTER_SETS[setId].business?.name || STARTER_SETS[setId].name);
    } else if (selectedArchetype) {
      setName(selectedArchetype.name + ' Site');
    }
    setReturnPhase('browseStarter');
    setPhase('name');
    setError(null);
  }

  function handleSelectMatchedStarter() {
    if (!match) return;
    setSelectedArchetypeId(match.archetype.id);
    setSelectedStarterSetId(match.starterSet.id);
    setName(match.starterSet.business?.name || match.starterSet.name);
    setReturnPhase('match');
    setPhase('name');
    setError(null);
  }

  function handleSelectMatchedBlank() {
    if (!match) return;
    setSelectedArchetypeId(match.archetype.id);
    setSelectedStarterSetId(null);
    setName(match.archetype.name + ' Site');
    setReturnPhase('match');
    setPhase('name');
    setError(null);
  }

  async function handleCreate() {
    if (!selectedArchetypeId) return;
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please provide a name for your site.');
      return;
    }

    setCreating(true);
    setError(null);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetypeId: selectedArchetypeId,
          starterSetId: selectedStarterSetId,
          name: trimmed,
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.status !== 201 || !data?.project?.id) {
        throw new Error(data?.error || `Failed to create site (${res.status}).`);
      }

      router.push(`/project/${data.project.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setCreating(false);
    }
  }

  const stepNumber = phase === 'niche' ? 1 : phase === 'name' ? 3 : 2;
  const stepLabel =
    phase === 'niche'
      ? "What's this site for?"
      : phase === 'match'
        ? 'Pick a starting point'
        : phase === 'browseArchetype'
          ? 'Select Archetype'
          : phase === 'browseStarter'
            ? 'Choose Starter Content Set'
            : 'Name & Launch Site';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden border-border/80 bg-background/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-3xl">
        {/* Stepper Header */}
        <div className="border-b border-border/60 bg-muted/20 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                {stepNumber}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Step {stepNumber} of 3
              </span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-xs font-medium text-foreground">{stepLabel}</span>
            </div>

            {/* Stepper progress dots */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    stepNumber === s
                      ? 'w-6 bg-primary'
                      : stepNumber > s
                        ? 'w-2.5 bg-primary/50'
                        : 'w-2.5 bg-muted-foreground/20',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          {/* STEP 1: WHAT'S THIS SITE FOR? */}
          {phase === 'niche' && (
            <div className="space-y-6">
              <div>
                <DialogTitle className="text-lg font-semibold tracking-tight">
                  What&apos;s this site for?
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Tell us what the business does and we&apos;ll match you to a starter template.
                </DialogDescription>
              </div>

              <Field
                label="Tell us about this site"
                htmlFor="new-project-niche"
                hint="A sentence or two, in plain language."
              >
                <textarea
                  id="new-project-niche"
                  rows={3}
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. We help small dental clinics manage bookings, reminders and patient records in one place."
                  className={textareaClass}
                />
              </Field>

              <Field label="Which best describes you?">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <SelectableCard
                    selected={mode === 'services'}
                    onClick={() => setMode('services')}
                    icon={<Briefcase />}
                    title="Services"
                    description="Consulting, agencies, software, professional or done-for-you work."
                  />
                  <SelectableCard
                    selected={mode === 'ecommerce'}
                    onClick={() => setMode('ecommerce')}
                    icon={<ShoppingBag />}
                    title="Products"
                    description="Physical or digital goods, a catalogue, an online store."
                  />
                </div>
              </Field>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={!niche.trim()}
                  onClick={() => {
                    setMatch(computeMatch(niche, mode));
                    setPhase('match');
                  }}
                >
                  Continue
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 (default): MATCHED NICHE — TWO-PATH CHOICE */}
          {phase === 'match' && (
            <div className="space-y-4">
              <div>
                <DialogTitle className="text-lg font-semibold tracking-tight">
                  {match ? `${match.archetype.name} looks like a good fit` : 'Pick a starting point'}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Start from ready-made copy for your niche, or the same layout with a clean slate.
                </DialogDescription>
              </div>

              {match ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TemplatePreviewCard
                    src={`/template-previews/${match.starterSet.id}.jpg`}
                    alt={match.starterSet.name}
                    label={match.starterSet.name}
                    sublabel="Ready to launch"
                    onClick={handleSelectMatchedStarter}
                  />
                  <TemplatePreviewCard
                    src={`/template-previews/${match.archetype.id}-blank.jpg`}
                    alt={`${match.archetype.name} template`}
                    label={`${match.archetype.name} template`}
                    sublabel="Build it your way"
                    onClick={handleSelectMatchedBlank}
                  />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  We couldn&apos;t find a close match for that. Browse all templates below.
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <Button type="button" variant="ghost" size="sm" onClick={() => setPhase('niche')}>
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back
                </Button>
                <button
                  type="button"
                  onClick={() => setPhase('browseArchetype')}
                  className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Not quite right? Browse all templates
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 (fallback): FULL ARCHETYPE GRID */}
          {phase === 'browseArchetype' && (
            <div className="space-y-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <DialogTitle className="text-lg font-semibold tracking-tight">
                    Pick a Site Archetype
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Archetypes configure the fundamental layout treatment, section blueprint, and conversion structure.
                  </DialogDescription>
                </div>
                <div className="relative mt-2 w-full sm:mt-0 sm:w-56">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter archetypes..."
                    className="h-8 pl-8 text-xs"
                  />
                </div>
              </div>

              <div className="thin-scroll grid max-h-[52vh] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
                {scoredArchetypes.map(({ arch }) => {
                  const Icon = ARCHETYPE_ICONS[arch.id] || Layers;
                  const isRecommended = arch.id === topRecommendedId;
                  const themeAccent = getTheme(arch.defaultThemeId).preview.accent;
                  const displayTags = ARCHETYPE_DISPLAY_TAGS[arch.id] || [];

                  return (
                    <button
                      key={arch.id}
                      type="button"
                      onClick={() => handleSelectArchetype(arch.id)}
                      className={cn(
                        'group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card/60 p-4 text-left transition-all duration-200',
                        'hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/40 hover:shadow-md',
                        isRecommended && 'border-primary/40 ring-1 ring-primary/20',
                      )}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-muted/40 shadow-sm group-hover:scale-105 transition-transform"
                              style={{ color: themeAccent }}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                                {arch.name}
                              </h3>
                              <span className="text-[10px] font-medium capitalize text-muted-foreground">
                                {arch.mode} • {arch.treatment} style
                              </span>
                            </div>
                          </div>

                          {isRecommended && (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                              <Sparkles className="h-2.5 w-2.5" />
                              Recommended
                            </span>
                          )}
                        </div>

                        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {arch.description}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-3 border-t border-border/40">
                        <div className="flex flex-wrap gap-1">
                          {displayTags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md border border-border/60 bg-muted/30 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setPhase(match ? 'match' : 'niche')}
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 (fallback): PICK STARTER CONTENT SET */}
          {phase === 'browseStarter' && selectedArchetype && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-lg font-semibold tracking-tight">
                    Select Starter Content Set
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Start with a pre-configured niche copy pack, or begin with a clean blank blueprint.
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: getTheme(selectedArchetype.defaultThemeId).preview.accent }}
                  />
                  <span className="font-medium text-foreground">{selectedArchetype.name}</span>
                </div>
              </div>

              <div className="thin-scroll grid max-h-[52vh] grid-cols-1 gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                {/* Starter Set Options */}
                {availableStarterSets.map((set) => {
                  const isSelected = selectedStarterSetId === set.id;
                  const themeAccent = set.accent || (set.themeId ? getTheme(set.themeId).preview.accent : '#6366f1');

                  return (
                    <button
                      key={set.id}
                      type="button"
                      onClick={() => setSelectedStarterSetId(set.id)}
                      className={cn(
                        'group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200',
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-sm'
                          : 'border-border/80 bg-card/60 hover:border-foreground/30 hover:bg-accent/30',
                      )}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{ background: themeAccent }}
                            />
                            <h4 className="text-sm font-semibold tracking-tight text-foreground">
                              {set.name}
                            </h4>
                          </div>
                          {isSelected ? (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                            </span>
                          ) : (
                            <span className="rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {set.niche}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {set.description}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-3 border-t border-border/40 flex flex-wrap items-center justify-between gap-1 text-[10px] text-muted-foreground">
                        <span className="font-medium text-foreground/80">
                          {selectedArchetype.composition.pages.length} Pages Blueprint
                        </span>
                        <div className="flex gap-1">
                          {set.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="rounded border border-border/60 bg-muted/30 px-1 py-0.2 text-[9px]"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Option to start blank / default blueprint */}
                <button
                  type="button"
                  onClick={() => setSelectedStarterSetId(null)}
                  className={cn(
                    'group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200',
                    selectedStarterSetId === null
                      ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-sm'
                      : 'border-border/80 bg-card/40 border-dashed hover:border-foreground/30 hover:bg-accent/20',
                  )}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground">
                          <Layout className="h-3 w-3" />
                        </div>
                        <h4 className="text-sm font-semibold tracking-tight text-foreground">
                          Clean Archetype Blueprint
                        </h4>
                      </div>
                      {selectedStarterSetId === null && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3 stroke-[2.5]" />
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      Start with the unopinionated layout structure, default section blueprints, and clean placeholders.
                    </p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="font-medium">Blank Canvas</span>
                    <span>Customize everything in Studio</span>
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setPhase('browseArchetype')}
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back to Archetypes
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleSelectStarterSet(selectedStarterSetId)}
                >
                  Continue
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: NAME SITE & CREATE */}
          {phase === 'name' && selectedArchetype && (
            <div className="space-y-4">
              <div>
                <DialogTitle className="text-lg font-semibold tracking-tight">
                  Name your site
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Give your site a workspace title. You can customize brand details, domains, and copy inside the studio anytime.
                </DialogDescription>
              </div>

              {/* Summary of selection */}
              <div className="rounded-xl border border-border/80 bg-muted/20 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-card shadow-sm"
                      style={{ color: getTheme(selectedArchetype.defaultThemeId).preview.accent }}
                    >
                      {(() => {
                        const Icon = ARCHETYPE_ICONS[selectedArchetype.id] || Layers;
                        return <Icon className="h-5 w-5" />;
                      })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">{selectedArchetype.name}</h4>
                        <span className="rounded border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground uppercase">
                          {selectedArchetype.mode}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {selectedStarterSet
                          ? `Starter Kit: ${selectedStarterSet.name}`
                          : 'Clean Blueprint (Blank Canvas)'}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() => setPhase(returnPhase)}
                  >
                    Change
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-site-name" className="text-xs font-medium">
                  Site Name
                </Label>
                <Input
                  id="new-site-name"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !creating) handleCreate();
                  }}
                  placeholder="e.g. Acme Corp, Vaudreuil Studio, Apex Cloud"
                  className="h-10 text-sm"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setPhase(returnPhase)}
                  disabled={creating}
                >
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenChange(false)}
                    disabled={creating}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleCreate}
                    disabled={creating}
                    className="min-w-[110px]"
                  >
                    {creating ? (
                      <>
                        <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        Creating…
                      </>
                    ) : (
                      'Create Site'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
