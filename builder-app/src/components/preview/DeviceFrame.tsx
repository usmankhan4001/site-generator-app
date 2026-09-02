'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Lock,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '@/lib/store';
import { ViewportMode } from '@/types/builder';
import { PreviewRenderer } from './PreviewRenderer';

export type ZoomScale = 0.5 | 0.75 | 1.0;

export function DeviceFrame() {
  const { viewport, setViewport, business, selectedArchetypeId, selectedThemeId, zoom: storeZoom, setZoom: setStoreZoom, activeRoute } = useBuilderStore();

  const zoom = storeZoom ? storeZoom / 100 : 1.0;
  const setZoom = (scale: ZoomScale) => setStoreZoom(Math.round(scale * 100));
  const [isLandscape, setIsLandscape] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Viewport Dimensions Config
  const dimensionsMap: Record<ViewportMode, { width: number; height: number; label: string }> = {
    desktop: { width: 1440, height: 900, label: '1440 × 900' },
    tablet: { width: isLandscape ? 1024 : 768, height: isLandscape ? 768 : 1024, label: isLandscape ? '1024 × 768' : '768 × 1024' },
    mobile: { width: isLandscape ? 812 : 375, height: isLandscape ? 375 : 812, label: isLandscape ? '812 × 375' : '375 × 812' },
  };

  const currentDim = dimensionsMap[viewport];
  const displayDomain = business.domain || 'vantagecloud.io';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${displayDomain}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div
      className={`relative flex flex-col h-full w-full bg-slate-950 text-slate-100 overflow-hidden transition-all select-none ${
        isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl border border-slate-800 shadow-2xl'
      }`}
    >
      {/* ============================================================ */}
      {/* 1. TOP CONTROL BAR / BROWSER CHROME                          */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs z-30">
        {/* Left: Window Controls & URL Bar */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Traffic light dots */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 hover:opacity-100 cursor-pointer" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 hover:opacity-100 cursor-pointer" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 hover:opacity-100 cursor-pointer" />
          </div>

          {/* Simulated URL Bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs max-w-[280px] sm:max-w-md truncate">
            <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="truncate text-slate-300">https://{displayDomain}{activeRoute === '/' ? '' : activeRoute}</span>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="ml-auto text-slate-400 hover:text-slate-200 transition-colors"
              title="Copy URL"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            className={`p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors ${
              isRefreshing ? 'animate-spin text-indigo-400' : ''
            }`}
            title="Reload Frame"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Center: Responsive Viewport Switcher */}
        <div className="flex items-center rounded-lg bg-slate-950 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewport === 'desktop'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewport === 'tablet'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewport === 'mobile'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right: Zoom Scale, Dimensions & Orientation */}
        <div className="flex items-center gap-2">
          {/* Dimensions Badge */}
          <span className="hidden md:inline-block px-2 py-1 rounded-md bg-slate-950 text-slate-400 border border-slate-800 font-mono text-[11px]">
            {currentDim.label}
          </span>

          {/* Orientation Flip (Mobile / Tablet only) */}
          {(viewport === 'mobile' || viewport === 'tablet') && (
            <button
              type="button"
              onClick={() => setIsLandscape((prev) => !prev)}
              className={`p-1.5 rounded-md border border-slate-800 transition-colors ${
                isLandscape ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
              title="Rotate Device Orientation"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Zoom Scale Selector */}
          <div className="flex items-center rounded-md bg-slate-950 border border-slate-800 p-0.5 text-slate-300">
            <button
              type="button"
              onClick={() => setZoom(0.5)}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                zoom === 0.5 ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              50%
            </button>
            <button
              type="button"
              onClick={() => setZoom(0.75)}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                zoom === 0.75 ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              75%
            </button>
            <button
              type="button"
              onClick={() => setZoom(1.0)}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                zoom === 1.0 ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              100%
            </button>
          </div>

          {/* Fullscreen Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="p-1.5 rounded-md bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Canvas'}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. RESPONSIVE CANVAS VIEWPORT AREA                           */}
      {/* ============================================================ */}
      <div className="relative flex-1 overflow-auto bg-slate-950/80 p-4 sm:p-8 flex items-start justify-center">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Animated Frame Wrapper */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="relative origin-top transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoom})`,
            width: viewport === 'desktop' ? '100%' : `${currentDim.width}px`,
            maxWidth: viewport === 'desktop' ? '1440px' : `${currentDim.width}px`,
          }}
        >
          {/* DEVICE CASING */}
          {viewport === 'mobile' ? (
            /* === SMARTPHONE CHASSIS === */
            <div className="relative rounded-[2.5rem] p-3.5 bg-slate-900 border-4 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-slate-700/50">
              {/* Dynamic Island / Speaker Pill */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center">
                <div className="h-5 w-24 rounded-full bg-black border border-slate-800 flex items-center justify-end px-2.5 gap-1.5 shadow-inner">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-900 border border-slate-700/60" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/90 animate-pulse" />
                </div>
              </div>

              {/* Screen Container */}
              <div className="relative w-full rounded-[2rem] overflow-hidden bg-white shadow-inner max-h-[812px] overflow-y-auto">
                <PreviewRenderer />
              </div>

              {/* Bottom Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-28 rounded-full bg-slate-700" />
            </div>
          ) : viewport === 'tablet' ? (
            /* === TABLET CHASSIS === */
            <div className="relative rounded-[1.75rem] p-4 bg-slate-900 border-4 border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-slate-700/50">
              {/* Camera Dot */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-slate-950 border border-slate-700" />

              {/* Screen Container */}
              <div className="relative w-full rounded-[1.25rem] overflow-hidden bg-white shadow-inner max-h-[960px] overflow-y-auto">
                <PreviewRenderer />
              </div>
            </div>
          ) : (
            /* === DESKTOP BROWSER CONTAINER === */
            <div className="relative w-full rounded-lg overflow-hidden bg-white shadow-2xl border border-slate-800">
              <div className="w-full max-h-[860px] overflow-y-auto">
                <PreviewRenderer />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* 3. BOTTOM STATUS / COMPLIANCE BAR                            */}
      {/* ============================================================ */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400 z-30">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-slate-300">Live 0ms Sync Engine Active</span>
          <span className="text-slate-600">•</span>
          <span>Archetype: <strong className="text-slate-200">{selectedArchetypeId}</strong></span>
          <span className="text-slate-600">•</span>
          <span>Theme: <strong className="text-slate-200">{selectedThemeId}</strong></span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Airwallex Compliance: 100% Ready
          </span>
        </div>
      </div>
    </div>
  );
}
