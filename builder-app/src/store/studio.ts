/**
 * Studio workspace store (Zustand). One project open at a time.
 *
 * Flow: `hydrate(id)` loads the project from `/api/projects/:id` → mutations run
 * through `mutate(recipe)` which structurally clones `content`, applies the
 * recipe, marks the store dirty and schedules a debounced `PATCH`. Every
 * successful save bumps `previewNonce` so the workspace can refresh the preview
 * iframe.
 *
 * All components consume this; treat the action set below as the contract.
 */

'use client';

import { useMemo } from 'react';
import { create } from 'zustand';
import type { SiteContent, Section, SectionType, NavItem } from '@/site/schema';
import { SECTION_TYPES } from '@/site/schema';
import { defaultPropsFor } from '@/site/sections/defaults';
import { buildPolicyPage } from '@/site/archetypes/policies';

export type StudioStep = 'pages' | 'sections' | 'design' | 'company' | 'deploy' | 'template';
export const STUDIO_STEPS: StudioStep[] = ['pages', 'sections', 'design', 'company', 'deploy'];

export type PreviewDevice = 'desktop' | 'tablet' | 'mobile';
export const DEVICE_WIDTH: Record<PreviewDevice, number> = {
  desktop: 1440,
  tablet: 768,
  mobile: 375,
};

export interface ProjectMeta {
  id: string;
  name: string;
  status: string;
  domain: string | null;
  customDomain: string | null;
  domainStatus: string | null;
  hostingStatus: string;
  publishRequestedAt: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  templateId: string | null;
}

interface StudioState {
  // --- data
  meta: ProjectMeta | null;
  content: SiteContent | null;

  // --- ui
  step: StudioStep;
  /** Steps the user has visited this session — drives the step rail's "done" dots. */
  visitedSteps: StudioStep[];
  activePagePath: string;
  selectedSectionId: string | null;
  device: PreviewDevice;
  /** Odoo-style edit ⇄ preview. In preview the workspace shows only the site. */
  viewMode: 'edit' | 'preview';

  // --- undo / redo (content snapshots)
  undoStack: SiteContent[];
  redoStack: SiteContent[];

  // --- persistence
  loading: boolean;
  dirty: boolean;
  saving: boolean;
  lastSavedAt: number | null;
  error: string | null;
  previewNonce: number;

  // --- lifecycle
  hydrate: (id: string) => Promise<void>;
  reset: () => void;
  saveNow: () => Promise<void>;

  // --- ui actions
  setStep: (s: StudioStep) => void;
  setActivePage: (path: string) => void;
  selectSection: (id: string | null) => void;
  setDevice: (d: PreviewDevice) => void;
  setViewMode: (v: 'edit' | 'preview') => void;
  undo: () => void;
  redo: () => void;

  // --- publish & domain actions
  setCustomDomain: (customDomain: string | null) => Promise<void>;
  requestPublish: () => Promise<void>;
  cancelPublishRequest: () => Promise<void>;

  // --- content mutations (all debounce-save)
  rename: (name: string) => void;
  setTheme: (themeId: string) => void;
  setAccent: (accent: string | undefined) => void;
  setMode: (mode: SiteContent['mode']) => void;
  setLayoutSystem: (layoutSystem: SiteContent['layoutSystem']) => void;
  updateBusiness: (patch: Partial<SiteContent['business']>) => void;
  updateMeta: (patch: Partial<SiteContent['meta']>) => void;
  setFormspreeId: (id: string | undefined) => void;
  setAirwallexCheckoutUrl: (url: string | undefined) => void;
  setNav: (nav: NavItem[]) => void;

  updateSectionProps: (sectionId: string, patch: Record<string, unknown>) => void;
  toggleSection: (sectionId: string) => void;
  reorderSections: (pagePath: string, from: number, to: number) => void;
  addSection: (pagePath: string, type: SectionType, atIndex?: number) => void;
  removeSection: (sectionId: string) => void;

  /** Escape hatch for complex edits — recipe mutates a draft in place. */
  mutate: (recipe: (draft: SiteContent) => void) => void;
}

const SAVE_DEBOUNCE_MS = 700;
/** Max content snapshots kept for undo. */
const UNDO_LIMIT = 50;
let saveTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleSave(get: () => StudioState) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    void get().saveNow();
  }, SAVE_DEBOUNCE_MS);
}

function clone(content: SiteContent): SiteContent {
  return typeof structuredClone === 'function'
    ? structuredClone(content)
    : JSON.parse(JSON.stringify(content));
}

function findPage(content: SiteContent, path: string) {
  return content.pages.find((p) => p.path === path);
}

export const useStudio = create<StudioState>((set, get) => ({
  meta: null,
  content: null,
  step: 'company',
  visitedSteps: ['template', 'company'],
  activePagePath: '/',
  selectedSectionId: null,
  device: 'desktop',
  viewMode: 'edit',
  undoStack: [],
  redoStack: [],
  loading: false,
  dirty: false,
  saving: false,
  lastSavedAt: null,
  error: null,
  previewNonce: 0,

  hydrate: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/projects/${id}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`Failed to load project (${res.status})`);
      const { project } = await res.json();
      set({
        meta: {
          id: project.id,
          name: project.name,
          status: project.status,
          domain: project.domain ?? null,
          customDomain: project.customDomain ?? null,
          domainStatus: project.domainStatus ?? null,
          hostingStatus: project.hostingStatus ?? 'none',
          publishRequestedAt: project.publishRequestedAt ?? null,
          repoUrl: project.repoUrl ?? null,
          liveUrl: project.liveUrl ?? null,
          templateId: project.templateId ?? null,
        },
        content: project.content,
        activePagePath: project.content.pages[0]?.path ?? '/',
        loading: false,
        dirty: false,
        selectedSectionId: null,
      });
    } catch (e) {
      set({ loading: false, error: e instanceof Error ? e.message : 'Load failed' });
    }
  },

  reset: () => {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = null;
    set({
      meta: null, content: null, step: 'company', visitedSteps: ['template', 'company'],
      activePagePath: '/',
      selectedSectionId: null, device: 'desktop', viewMode: 'edit',
      undoStack: [], redoStack: [],
      loading: false, dirty: false,
      saving: false, lastSavedAt: null, error: null, previewNonce: 0,
    });
  },

  saveNow: async () => {
    const { meta, content, dirty, saving } = get();
    if (!meta || !content || (!dirty && !saving) || saving) return;
    set({ saving: true });
    try {
      const res = await fetch(`/api/projects/${meta.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: meta.name, content }),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      // `dirty` may have been set again by edits made while this request was in
      // flight — only clear it if the content is unchanged since we sent it.
      const stillCurrent = get().content === content && get().meta?.name === meta.name;
      set((s) => ({
        saving: false,
        dirty: stillCurrent ? false : s.dirty,
        lastSavedAt: Date.now(),
        error: null,
        previewNonce: s.previewNonce + 1,
      }));
      if (!stillCurrent) scheduleSave(get);
    } catch (e) {
      set({ saving: false, error: e instanceof Error ? e.message : 'Save failed' });
    }
  },

  setStep: (step) =>
    set((s) => ({
      step,
      visitedSteps: s.visitedSteps.includes(step) ? s.visitedSteps : [...s.visitedSteps, step],
    })),
  setActivePage: (activePagePath) => set({ activePagePath, selectedSectionId: null }),
  selectSection: (selectedSectionId) => set({ selectedSectionId }),
  setDevice: (device) => set({ device }),
  setViewMode: (viewMode) => set({ viewMode }),

  undo: () => {
    const { content, undoStack, redoStack } = get();
    if (!content || undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    set((s) => ({
      content: prev,
      undoStack: s.undoStack.slice(0, -1),
      redoStack: [...s.redoStack, content],
      dirty: true,
      previewNonce: s.previewNonce + 1,
    }));
    scheduleSave(get);
  },

  redo: () => {
    const { content, redoStack } = get();
    if (!content || redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    set((s) => ({
      content: next,
      redoStack: s.redoStack.slice(0, -1),
      undoStack: [...s.undoStack, content],
      dirty: true,
      previewNonce: s.previewNonce + 1,
    }));
    scheduleSave(get);
  },

  setCustomDomain: async (customDomain: string | null) => {
    const { meta } = get();
    if (!meta) return;
    try {
      const res = await fetch(`/api/projects/${meta.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customDomain: customDomain?.trim() || null,
          domainStatus: customDomain?.trim() ? 'pending_dns' : null,
        }),
      });
      if (!res.ok) throw new Error('Failed to update custom domain');
      const { project } = await res.json();
      set((s) => ({
        meta: s.meta
          ? {
              ...s.meta,
              customDomain: project.customDomain ?? null,
              domainStatus: project.domainStatus ?? null,
            }
          : null,
      }));
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Failed to update domain' });
    }
  },

  requestPublish: async () => {
    const { meta } = get();
    if (!meta) return;
    try {
      const res = await fetch(`/api/projects/${meta.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'request_publish' }),
      });
      if (!res.ok) throw new Error('Failed to request publish');
      const { project } = await res.json();
      set((s) => ({
        meta: s.meta
          ? {
              ...s.meta,
              publishRequestedAt: project.publishRequestedAt ?? null,
              domainStatus: project.domainStatus ?? null,
            }
          : null,
      }));
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Failed to request publish' });
    }
  },

  cancelPublishRequest: async () => {
    const { meta } = get();
    if (!meta) return;
    try {
      const res = await fetch(`/api/projects/${meta.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel_publish' }),
      });
      if (!res.ok) throw new Error('Failed to cancel publish request');
      const { project } = await res.json();
      set((s) => ({
        meta: s.meta
          ? {
              ...s.meta,
              publishRequestedAt: project.publishRequestedAt ?? null,
              domainStatus: project.domainStatus ?? null,
            }
          : null,
      }));
    } catch (e) {
      set({ error: e instanceof Error ? e.message : 'Failed to cancel publish request' });
    }
  },

  mutate: (recipe) => {
    const { content, undoStack } = get();
    if (!content) return;
    const draft = clone(content);
    recipe(draft);
    set({
      content: draft,
      dirty: true,
      undoStack: [...undoStack, content].slice(-UNDO_LIMIT),
      redoStack: [],
    });
    scheduleSave(get);
  },

  rename: (name) => {
    const { content, undoStack } = get();
    set((s) => ({
      meta: s.meta ? { ...s.meta, name } : s.meta,
      dirty: true,
      undoStack: content ? [...undoStack, content].slice(-UNDO_LIMIT) : undoStack,
      redoStack: [],
    }));
    scheduleSave(get);
  },

  setTheme: (themeId) => get().mutate((d) => { d.themeId = themeId; }),
  setAccent: (accent) => get().mutate((d) => { d.accent = accent || undefined; }),
  setMode: (mode) => get().mutate((d) => { d.mode = mode; }),
  setLayoutSystem: (layoutSystem) => get().mutate((d) => { d.layoutSystem = layoutSystem || undefined; }),
  updateBusiness: (patch) =>
    get().mutate((d) => {
      Object.assign(d.business, patch);
      const policySlugs = ['privacy', 'terms', 'refund', 'shipping'];
      for (const slug of policySlugs) {
        const key = `policy:${slug}`;
        const idx = d.pages.findIndex((p) => p.key === key || p.path === `/policies/${slug}`);
        if (idx !== -1) {
          d.pages[idx] = buildPolicyPage(slug, d.business);
        }
      }
    }),
  updateMeta: (patch) => get().mutate((d) => { Object.assign(d.meta, patch); }),
  setFormspreeId: (id) => get().mutate((d) => { d.formspreeId = id || undefined; }),
  setAirwallexCheckoutUrl: (url) => get().mutate((d) => { d.airwallexCheckoutUrl = url || undefined; }),
  setNav: (nav) => get().mutate((d) => { d.nav = nav; }),

  updateSectionProps: (sectionId, patch) =>
    get().mutate((d) => {
      if (sectionId === 'header') {
        d.header = Object.assign({}, d.header, patch);
        return;
      }
      if (sectionId === 'footer') {
        d.footer = Object.assign({}, d.footer, patch);
        return;
      }
      for (const page of d.pages) {
        const sec = page.sections.find((s) => s.id === sectionId);
        if (sec) {
          Object.assign(sec.props as Record<string, unknown>, patch);
          return;
        }
      }
    }),

  toggleSection: (sectionId) =>
    get().mutate((d) => {
      for (const page of d.pages) {
        const sec = page.sections.find((s) => s.id === sectionId);
        if (sec) { sec.enabled = !sec.enabled; return; }
      }
    }),

  reorderSections: (pagePath, from, to) =>
    get().mutate((d) => {
      const page = findPage(d, pagePath);
      if (!page) return;
      const arr = page.sections;
      if (from < 0 || from >= arr.length || to < 0 || to >= arr.length) return;
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
    }),

  addSection: (pagePath, type, atIndex) =>
    get().mutate((d) => {
      const page = findPage(d, pagePath);
      if (!page || !SECTION_TYPES.includes(type)) return;
      const section = {
        id: `${page.key}-${type}-${Date.now().toString(36)}`,
        type,
        enabled: true,
        props: defaultPropsFor(type),
      } as unknown as Section;
      const at = atIndex ?? page.sections.length;
      page.sections.splice(at, 0, section);
    }),

  removeSection: (sectionId) =>
    get().mutate((d) => {
      for (const page of d.pages) {
        const i = page.sections.findIndex((s) => s.id === sectionId);
        if (i !== -1) { page.sections.splice(i, 1); return; }
      }
    }),
}));

/** Selector helper: the currently-active page object. */
export function useActivePage() {
  return useStudio((s) =>
    s.content?.pages.find((p) => p.path === s.activePagePath) ?? null,
  );
}

/** Selector helper: the currently-selected section object. */
export function useSelectedSection() {
  const content = useStudio((s) => s.content);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  return useMemo(() => {
    if (!content || !selectedSectionId) return null;
    if (selectedSectionId === 'header') {
      return {
        id: 'header',
        type: 'header' as any,
        enabled: true,
        props: content.header ?? {},
      } as Section;
    }
    if (selectedSectionId === 'footer') {
      return {
        id: 'footer',
        type: 'footer' as any,
        enabled: true,
        props: content.footer ?? {},
      } as Section;
    }
    for (const page of content.pages) {
      const sec = page.sections.find((x) => x.id === selectedSectionId);
      if (sec) return sec;
    }
    return null;
  }, [content, selectedSectionId]);
}
