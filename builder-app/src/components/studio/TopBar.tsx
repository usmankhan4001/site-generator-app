'use client';

import React from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { useBuilderStore } from '@/lib/store';
import { ViewportMode } from '@/types/builder';
import { THEMES } from '@/lib/data/themes';

interface TopBarProps {
  onDeploy: () => void;
}

export function TopBar({ onDeploy }: TopBarProps) {
  const {
    viewport,
    setViewport,
    business,
    selectedThemeId,
    selectedArchetypeId,
    isDeploying,
    resetBuilder,
    activePreviewTab,
    setActivePreviewTab,
    setAiCopilotOpen,
    setAiCopilotInitialAction,
  } = useBuilderStore();

  const theme = THEMES[selectedThemeId] || THEMES['indigo-enterprise'];

  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-800 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
      {/* Brand & Workspace Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20 font-bold text-sm">
          UI
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-zinc-100">
              Site Builder Studio
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
              Untitled UI Engine
            </span>
          </div>
          <p className="text-xs text-zinc-400 truncate max-w-[220px] sm:max-w-xs">
            {business.companyName || 'Untitled Project'} • <span className="font-mono text-zinc-300">{business.domain}</span>
          </p>
        </div>
      </div>

      {/* Center Studio View Mode Toggle & Viewport Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => setActivePreviewTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePreviewTab === 'preview'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Wizard & Preview</span>
          </button>
          <button
            onClick={() => setActivePreviewTab('puck' as any)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activePreviewTab === ('puck' as any)
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Puck Visual Editor</span>
          </button>
        </div>

        <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
        <button
          onClick={() => setViewport('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewport === 'desktop'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Desktop View (1440px)"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop</span>
        </button>
        <button
          onClick={() => setViewport('tablet')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewport === 'tablet'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Tablet View (768px)"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>Tablet</span>
        </button>
        <button
          onClick={() => setViewport('mobile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            viewport === 'mobile'
              ? 'bg-zinc-800 text-white shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Mobile View (375px)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile</span>
        </button>
        </div>
      </div>

      {/* Right Controls: AI Copilot, Compliance, Theme Badge, Reset & Deploy */}
      <div className="flex items-center gap-3">
        {/* AI Copilot Button */}
        <button
          onClick={() => setAiCopilotOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-xs font-medium transition-all shadow-sm shadow-indigo-500/10 cursor-pointer"
          title="Open AI Copilot Studio"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>AI Copilot</span>
        </button>

        {/* Compliance Pre-Flight Pill */}
        <button
          onClick={() => {
            setAiCopilotInitialAction('audit-compliance');
            setAiCopilotOpen(true);
          }}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-medium transition-colors cursor-pointer"
          title="Run Airwallex KYC Pre-Flight Audit"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Airwallex KYC Ready</span>
        </button>

        {/* Current Theme Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs">
          <div
            className="w-2.5 h-2.5 rounded-full border border-white/20"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <span className="truncate max-w-[100px]">{theme.name}</span>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetBuilder}
          className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors text-xs"
          title="Reset to default template"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Deploy Action */}
        <button
          onClick={onDeploy}
          disabled={isDeploying}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Rocket className="w-4 h-4" />
          <span>{isDeploying ? 'Deploying...' : 'Deploy Website'}</span>
        </button>
      </div>
    </header>
  );
}
