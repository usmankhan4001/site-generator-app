'use client';

import React, { useState, useCallback } from 'react';
import { MantineTopBar } from '@/components/studio/MantineTopBar';
import { MantineSidebar } from '@/components/studio/MantineSidebar';
import { StepWizard } from '@/components/wizard/StepWizard';
import { DeviceFrame } from '@/components/preview/DeviceFrame';
import { DeploymentModal } from '@/components/deployment/DeploymentModal';
import { AiCopilotModal } from '@/components/ai/AiCopilotModal';
import { PuckEditor } from '@/components/editor/PuckEditor';
import { useBuilderStore } from '@/lib/store';

export default function StudioPage() {
  const {
    business,
    selectedArchetypeId,
    selectedThemeId,
    customHero,
    customOfferings,
    activePreviewTab,
    setDeploymentModalOpen,
    setIsDeploying,
    setDeploymentStatus,
    setDeploymentStep,
    setLiveUrl,
    addLog,
    clearLogs,
  } = useBuilderStore();

  const handleStartDeployment = useCallback(async () => {
    // 1. Open deployment terminal modal & reset pipeline state
    setDeploymentModalOpen(true);
    clearLogs();
    setIsDeploying(true);
    setDeploymentStatus('building');
    setDeploymentStep(1);

    addLog('Connecting to Studio Deployment Server-Sent Events (SSE) pipeline...', 'info');

    try {
      const payload = {
        business,
        selectedArchetypeId,
        selectedThemeId,
        customHero,
        customOfferings,
        dokployApiKey: business.dokployApiKey,
        dokployHost: business.dokployHost,
      };

      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Failed to initiate deployment stream (HTTP ${response.status})`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() || '';

        for (const chunk of chunks) {
          const trimmed = chunk.trim();
          if (!trimmed) continue;

          let eventType = 'log';
          let eventData = '';

          const lines = trimmed.split('\n');
          for (const line of lines) {
            if (line.startsWith('event: ')) {
              eventType = line.replace('event: ', '').trim();
            } else if (line.startsWith('data: ')) {
              eventData = line.replace('data: ', '').trim();
            }
          }

          if (!eventData) continue;

          try {
            const parsed = JSON.parse(eventData);

            if (eventType === 'step') {
              setDeploymentStep(parsed.step);
              addLog(`▶ [Step ${parsed.step}/5] ${parsed.title}`, 'info');
            } else if (eventType === 'log') {
              addLog(parsed.message, parsed.level || 'info');
            } else if (eventType === 'complete') {
              setDeploymentStatus('success');
              setIsDeploying(false);
              setLiveUrl(parsed.liveUrl);
              addLog(`🎉 Live Production Site Ready: ${parsed.liveUrl}`, 'success');
            } else if (eventType === 'error') {
              setDeploymentStatus('failed');
              setIsDeploying(false);
              addLog(`❌ Deployment Error: ${parsed.message}`, 'error');
            }
          } catch {
            addLog(eventData, 'info');
          }
        }
      }
    } catch (err: any) {
      setDeploymentStatus('failed');
      setIsDeploying(false);
      addLog(`❌ Pipeline Failure: ${err?.message || 'Unknown network error'}`, 'error');
    }
  }, [
    business,
    selectedArchetypeId,
    selectedThemeId,
    customHero,
    customOfferings,
    setDeploymentModalOpen,
    clearLogs,
    setIsDeploying,
    setDeploymentStatus,
    setDeploymentStep,
    addLog,
    setLiveUrl,
  ]);

  const [sidebarMode, setSidebarMode] = useState<'mantine' | 'wizard'>('mantine');

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#090d16] text-slate-100 antialiased select-none">
      {/* 1. Mantine v7 Studio TopBar */}
      <MantineTopBar onDeploy={handleStartDeployment} />

      {/* 2. Main Studio Workspace: Toggleable between Puck Visual Editor and Split-Screen Canvas */}
      {activePreviewTab === 'puck' ? (
        <main className="flex-1 flex overflow-hidden">
          <PuckEditor />
        </main>
      ) : (
        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel: Mantine Studio Sidebar with optional Wizard switch */}
          {sidebarMode === 'mantine' ? (
            <div className="relative flex shrink-0">
              <MantineSidebar />
              <button
                onClick={() => setSidebarMode('wizard')}
                className="absolute top-2.5 right-3 z-30 text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                title="Switch to 5-Step Guided Wizard"
              >
                Wizard Mode
              </button>
            </div>
          ) : (
            <section
              aria-label="Configuration Panel"
              className="w-full lg:w-[480px] xl:w-[530px] shrink-0 h-[calc(100vh-4rem)] border-r border-[#1e293b] bg-[#090d16] backdrop-blur-xl flex flex-col z-10 shadow-2xl relative"
            >
              <div className="px-5 py-3 border-b border-[#1e293b] bg-[#0d131f] flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium flex items-center gap-2 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Airwallex Compliance Engine
                </span>
                <button
                  onClick={() => setSidebarMode('mantine')}
                  className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider underline cursor-pointer"
                >
                  ← Back to Mantine Studio
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6">
                <StepWizard hideHeader={true} />
              </div>
            </section>
          )}

          {/* Right Panel: Floating Device Frame with Live 0ms Preview Canvas */}
          <section
            aria-label="Live Preview Canvas"
            className="hidden lg:flex flex-1 h-[calc(100vh-4rem)] relative overflow-hidden studio-canvas-pattern flex-col items-center justify-center p-4 xl:p-8 bg-[#07090e]"
          >
            {/* Subtle Radial Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-indigo-500/5 blur-[140px] pointer-events-none rounded-full" />

            {/* Live Device Frame with macOS/iOS styling */}
            <div className="w-full h-full max-w-[1440px] flex items-center justify-center relative z-10">
              <DeviceFrame />
            </div>
          </section>
        </main>
      )}

      {/* 3. Terminal Deployment Modal with Live Logs & Confetti */}
      <DeploymentModal />

      {/* 4. AI Copilot Modal for OpenRouter Copy Generation & Compliance Audit */}
      <AiCopilotModal />
    </div>
  );
}
