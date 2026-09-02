import { create } from 'zustand';
import {
  BuilderState,
  BusinessDetails,
  DeploymentLog,
  DeploymentStatus,
  HeroInfo,
  LogLevel,
  OfferingItem,
  ViewportMode,
  WizardStepId,
} from '@/types/builder';
import { ARCHETYPES, DEFAULT_ARCHETYPE_ID } from './data/archetypes';
import { DEFAULT_THEME_ID } from './data/themes';

const initialBusiness: BusinessDetails = {
  companyName: 'Vantage Cloud Systems Ltd',
  shortName: 'Vantage Cloud',
  registrationNumber: 'CR-89410294',
  address: 'Level 38, Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983',
  email: 'ops@vantagecloud.io',
  phone: '+65 6812 9400',
  domain: 'vantagecloud.io',
  governingLaw: 'Republic of Singapore',
  currency: 'USD',
  githubRepo: 'vantage-cloud-site',
  dokployHost: 'https://paas.usmankhan.xyz',
  dokployApiKey: 'GfDwKHpBloKdZLJRcEfMOwQEXirbnjSRkoYyXkNYEOypQxswuDDVEIpZSYyBXFBt',
};

export interface ExtendedBuilderState extends BuilderState {
  isDeploymentModalOpen: boolean;
  setDeploymentModalOpen: (open: boolean) => void;
  liveUrl: string | null;
  setLiveUrl: (url: string | null) => void;
  deploymentStep: number;
  setDeploymentStep: (step: number) => void;
  isAiCopilotOpen: boolean;
  setAiCopilotOpen: (open: boolean) => void;
  aiCopilotInitialAction?: 'rewrite-block' | 'generate-site' | 'audit-compliance';
  setAiCopilotInitialAction: (action?: 'rewrite-block' | 'generate-site' | 'audit-compliance') => void;
  openRouterApiKey?: string;
  setOpenRouterApiKey: (key: string) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  puckDataByRoute: Record<string, any>;
  setPuckDataForRoute: (route: string, data: any) => void;
  savePuckDataToDb: (route: string, data?: any) => Promise<boolean>;
  loadPuckDataFromDb: (route: string) => Promise<any>;
  isSavingPuck: boolean;
  setIsSavingPuck: (saving: boolean) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

export const useBuilderStore = create<ExtendedBuilderState>((set, get) => ({
  // AI Copilot Modal
  isAiCopilotOpen: false,
  setAiCopilotOpen: (open: boolean) => set({ isAiCopilotOpen: open }),
  aiCopilotInitialAction: undefined,
  setAiCopilotInitialAction: (action) => set({ aiCopilotInitialAction: action }),
  openRouterApiKey: '',
  setOpenRouterApiKey: (key: string) => set({ openRouterApiKey: key }),

  // Multi-page Route & Puck State
  activeRoute: '/',
  setActiveRoute: (route: string) => set({ activeRoute: route }),
  zoom: 100,
  setZoom: (zoom: number) => set({ zoom }),
  puckDataByRoute: {},
  setPuckDataForRoute: (route: string, data: any) =>
    set((state) => {
      const updated = {
        ...state.puckDataByRoute,
        [route]: data,
      };

      // If updating the homepage, reflect hero changes back into standard store
      const updates: Partial<ExtendedBuilderState> = { puckDataByRoute: updated };
      if (route === '/' && data?.content) {
        const heroBlock = data.content.find((item: any) => item.type === 'Hero');
        if (heroBlock?.props) {
          updates.customHero = {
            badge: heroBlock.props.badge,
            headline: heroBlock.props.headline,
            accentText: heroBlock.props.accentText,
            subtitle: heroBlock.props.subtitle,
            primaryCta: heroBlock.props.primaryCta,
            secondaryCta: heroBlock.props.secondaryCta,
            image: heroBlock.props.image,
            trustBadges: Array.isArray(heroBlock.props.trustBadges)
              ? heroBlock.props.trustBadges.map((t: any) => (typeof t === 'string' ? t : t.text))
              : [],
          };
        }
      }

      return updates as ExtendedBuilderState;
    }),

  isSavingPuck: false,
  setIsSavingPuck: (isSavingPuck: boolean) => set({ isSavingPuck }),

  savePuckDataToDb: async (route: string, dataOverride?: any) => {
    const dataToSave = dataOverride || get().puckDataByRoute[route];
    if (!dataToSave) return false;

    set({ isSavingPuck: true });
    try {
      const title =
        route === '/'
          ? 'Home'
          : route === '/about'
          ? 'About Us'
          : route === '/services'
          ? 'Services'
          : route === '/contact'
          ? 'Contact'
          : route.replace('/policies/', 'Policy: ');

      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          route,
          title,
          data: dataToSave,
        }),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      set({ isSavingPuck: false });
      return json.success;
    } catch (err) {
      console.error('Failed to save Puck page to SQLite DB:', err);
      set({ isSavingPuck: false });
      return false;
    }
  },

  loadPuckDataFromDb: async (route: string) => {
    try {
      const res = await fetch(`/api/pages?route=${encodeURIComponent(route)}`);
      if (!res.ok) return null;
      const json = await res.json();
      if (json.success && json.page && json.page.data) {
        set((state) => ({
          puckDataByRoute: {
            ...state.puckDataByRoute,
            [route]: json.page.data,
          },
        }));
        return json.page.data;
      }
      return null;
    } catch (err) {
      console.error('Failed to load Puck page from SQLite DB:', err);
      return null;
    }
  },

  // Wizard Navigation
  currentStep: 1,
  completedSteps: [],
  setStep: (step: WizardStepId) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => {
      const next = Math.min(state.currentStep + 1, 5) as WizardStepId;
      const completed = state.completedSteps.includes(state.currentStep)
        ? state.completedSteps
        : [...state.completedSteps, state.currentStep];
      return { currentStep: next, completedSteps: completed };
    }),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1) as WizardStepId,
    })),
  markStepComplete: (step: WizardStepId) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step],
    })),

  // Viewport
  viewport: 'desktop' as ViewportMode,
  setViewport: (viewport: ViewportMode) => set({ viewport }),

  // Business & KYC details
  business: initialBusiness,
  updateBusiness: (details: Partial<BusinessDetails>) =>
    set((state) => ({
      business: { ...state.business, ...details },
    })),

  // Archetype & Theme
  selectedArchetypeId: DEFAULT_ARCHETYPE_ID,
  selectedThemeId: DEFAULT_THEME_ID,
  setArchetype: (archetypeId: string) => {
    const arch = ARCHETYPES[archetypeId];
    set({
      selectedArchetypeId: archetypeId,
      customHero: arch ? { ...arch.hero } : {},
      customOfferings: arch ? [...arch.offerings] : [],
      selectedThemeId: arch?.recommendedThemes?.[0] || DEFAULT_THEME_ID,
    });
  },
  setTheme: (themeId: string) => set({ selectedThemeId: themeId }),

  // Content Overrides
  customHero: {},
  updateHero: (hero: Partial<HeroInfo>) =>
    set((state) => ({
      customHero: { ...state.customHero, ...hero },
    })),
  customOfferings: ARCHETYPES[DEFAULT_ARCHETYPE_ID]?.offerings || [],
  updateOffering: (id: string, offering: Partial<OfferingItem>) =>
    set((state) => ({
      customOfferings: state.customOfferings.map((item) =>
        item.id === id ? { ...item, ...offering } : item
      ),
    })),
  addOffering: (offering: OfferingItem) =>
    set((state) => ({
      customOfferings: [...state.customOfferings, offering],
    })),
  removeOffering: (id: string) =>
    set((state) => ({
      customOfferings: state.customOfferings.filter((item) => item.id !== id),
    })),
  resetContentToArchetype: () => {
    const arch = ARCHETYPES[get().selectedArchetypeId];
    if (arch) {
      set({
        customHero: { ...arch.hero },
        customOfferings: [...arch.offerings],
      });
    }
  },

  // Active Preview Tab
  activePreviewTab: 'preview',
  setActivePreviewTab: (tab) => set({ activePreviewTab: tab }),

  // Modal & Deployment State
  isDeploymentModalOpen: false,
  setDeploymentModalOpen: (open: boolean) => set({ isDeploymentModalOpen: open }),
  liveUrl: null,
  setLiveUrl: (url: string | null) => set({ liveUrl: url }),
  deploymentStep: 0,
  setDeploymentStep: (step: number) => set({ deploymentStep: step }),

  // Deployment Logs
  deploymentLogs: [],
  deploymentStatus: 'idle',
  isDeploying: false,
  addLog: (message: string, level: LogLevel = 'info') =>
    set((state) => ({
      deploymentLogs: [
        ...state.deploymentLogs,
        {
          id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          timestamp: new Date().toLocaleTimeString(),
          level,
          message,
        },
      ],
    })),
  clearLogs: () => set({ deploymentLogs: [], deploymentStatus: 'idle', liveUrl: null, deploymentStep: 0 }),
  setDeploymentStatus: (status: DeploymentStatus) => set({ deploymentStatus: status }),
  setIsDeploying: (isDeploying: boolean) => set({ isDeploying }),

  // Global Reset
  resetBuilder: () =>
    set({
      currentStep: 1,
      completedSteps: [],
      business: initialBusiness,
      selectedArchetypeId: DEFAULT_ARCHETYPE_ID,
      selectedThemeId: DEFAULT_THEME_ID,
      customHero: {},
      customOfferings: ARCHETYPES[DEFAULT_ARCHETYPE_ID]?.offerings || [],
      deploymentLogs: [],
      deploymentStatus: 'idle',
      isDeploying: false,
      isDeploymentModalOpen: false,
      liveUrl: null,
      deploymentStep: 0,
    }),
}));
