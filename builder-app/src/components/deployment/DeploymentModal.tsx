'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  X,
  Globe,
  Github,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useBuilderStore } from '@/lib/store';
import { LogLevel } from '@/types/builder';

const PIPELINE_STEPS = [
  { id: 1, label: 'Assembling Template', desc: 'Synthesizing Untitled UI tokens & KYC files' },
  { id: 2, label: 'Creating GitHub Repo', desc: 'Remote repository initialization' },
  { id: 3, label: 'Pushing Source', desc: 'Git commit & push to main' },
  { id: 4, label: 'Provisioning Dokploy', desc: 'Docker build & Traefik edge mapping' },
  { id: 5, label: 'Live URL Probe', desc: 'Health check & SSL verification' },
];

export function DeploymentModal() {
  const {
    isDeploymentModalOpen,
    setDeploymentModalOpen,
    deploymentLogs,
    deploymentStatus,
    deploymentStep,
    liveUrl,
    business,
    isDeploying,
  } = useBuilderStore();

  const [copied, setCopied] = React.useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [deploymentLogs]);

  // Trigger confetti burst on success
  useEffect(() => {
    if (deploymentStatus === 'success') {
      const duration = 3.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#6366F1', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#6366F1', '#10B981', '#F59E0B', '#EC4899', '#3B82F6'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [deploymentStatus]);

  const handleCopyLink = () => {
    if (liveUrl) {
      navigator.clipboard.writeText(liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatLogMessage = (msg: string, level: LogLevel) => {
    // Syntax highlighting for terminal output
    let colorClass = 'text-zinc-300';
    if (level === 'success') colorClass = 'text-emerald-400 font-medium';
    if (level === 'warn') colorClass = 'text-amber-400';
    if (level === 'error') colorClass = 'text-rose-400 font-semibold';

    // Highlight URLs and keywords
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = msg.split(urlRegex);

    return (
      <span className={colorClass}>
        {parts.map((part, i) => {
          if (part.match(urlRegex)) {
            return (
              <a
                key={i}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {part}
              </a>
            );
          }
          if (part.includes('[Docker]') || part.includes('[1/5]') || part.includes('[2/5]') || part.includes('[3/5]') || part.includes('[4/5]') || part.includes('[5/5]')) {
            return (
              <span key={i} className="text-cyan-400 font-mono">
                {part}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  };

  if (!isDeploymentModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isDeploying && setDeploymentModalOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                  Studio Deployment Engine
                  {isDeploying && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" /> Live Pipeline
                    </span>
                  )}
                  {deploymentStatus === 'success' && (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Sparkles className="w-3 h-3" /> Live in Production
                    </span>
                  )}
                </h3>
                <p className="text-xs text-zinc-400">
                  Target: <span className="font-mono text-zinc-300">{business.domain}</span> ({business.companyName})
                </p>
              </div>
            </div>

            <button
              onClick={() => setDeploymentModalOpen(false)}
              disabled={isDeploying}
              className="p-2 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pipeline Step Indicators */}
          <div className="px-6 py-3 bg-zinc-900/30 border-b border-zinc-800/60 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[620px] gap-2">
              {PIPELINE_STEPS.map((s, idx) => {
                const isCurrent = deploymentStep === s.id && isDeploying;
                const isPassed = deploymentStep > s.id || deploymentStatus === 'success';
                const isPending = deploymentStep < s.id && deploymentStatus !== 'success';

                return (
                  <div key={s.id} className="flex items-center gap-2 flex-1">
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-medium transition-all ${
                        isPassed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : isCurrent
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/20'
                          : 'bg-zinc-800/60 text-zinc-500 border border-zinc-700/40'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        s.id
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-xs font-medium whitespace-nowrap ${
                          isPassed
                            ? 'text-zinc-200'
                            : isCurrent
                            ? 'text-indigo-300 font-semibold'
                            : 'text-zinc-500'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {idx < PIPELINE_STEPS.length - 1 && (
                      <div
                        className={`h-[1px] flex-1 transition-colors mx-1 ${
                          isPassed ? 'bg-emerald-500/40' : 'bg-zinc-800'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Success Banner (when finished) */}
          {deploymentStatus === 'success' && liveUrl && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-6 mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-zinc-900 to-indigo-950/50 border border-emerald-500/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-200 flex items-center gap-1.5">
                    🎉 Your website is live and verified!
                  </h4>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-300 hover:text-white underline flex items-center gap-1 mt-0.5"
                  >
                    {liveUrl} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 sm:flex-initial px-3 py-2 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy URL'}
                </button>

                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5"
                >
                  Visit Site <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}

          {/* Terminal Box */}
          <div className="flex-1 flex flex-col m-6 mt-4 min-h-[320px] max-h-[460px] rounded-xl bg-black/90 border border-zinc-800 font-mono text-xs overflow-hidden shadow-inner">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 select-none">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] text-zinc-500 ml-2">studio-orchestrator — bash</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <span>UTF-8</span>
                <span>•</span>
                <span>Dokploy PaaS</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
              {deploymentLogs.length === 0 ? (
                <div className="text-zinc-600 italic">Waiting to dispatch deployment stream...</div>
              ) : (
                deploymentLogs.map((log) => (
                  <div key={log.id} className="leading-relaxed flex items-start gap-2.5">
                    <span className="text-zinc-600 select-none shrink-0">{log.timestamp}</span>
                    <span className="shrink-0 select-none">
                      {log.level === 'success' && <span className="text-emerald-500">✓</span>}
                      {log.level === 'warn' && <span className="text-amber-500">!</span>}
                      {log.level === 'error' && <span className="text-rose-500">✗</span>}
                      {log.level === 'info' && <span className="text-indigo-400">›</span>}
                    </span>
                    <div className="flex-1 break-all">{formatLogMessage(log.message, log.level)}</div>
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Status Footer */}
            <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isDeploying
                      ? 'bg-amber-400 animate-ping'
                      : deploymentStatus === 'success'
                      ? 'bg-emerald-400'
                      : deploymentStatus === 'failed'
                      ? 'bg-rose-500'
                      : 'bg-zinc-600'
                  }`}
                />
                <span>
                  {isDeploying
                    ? 'Streaming pipeline stdout...'
                    : deploymentStatus === 'success'
                    ? 'Pipeline finished with exit code 0'
                    : deploymentStatus === 'failed'
                    ? 'Pipeline halted with error'
                    : 'Ready'}
                </span>
              </div>
              <span className="text-zinc-600">{deploymentLogs.length} events received</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/40">
            <div className="text-xs text-zinc-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Airwallex KYC Statutory Footers & Policies Verified
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeploymentModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                {deploymentStatus === 'success' ? 'Close & Return to Studio' : 'Close Terminal'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
