'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Puck, type Data } from '@measured/puck';
import '@measured/puck/puck.css';
import {
  puckConfig,
  getDefaultPuckDataForRoute,
} from '@/lib/puck/config';
import { useBuilderStore } from '@/lib/store';
import {
  Save,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  FolderOpen,
  Eye,
  Layers,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Shield,
  FileText,
  Home,
  Briefcase,
  Mail,
  Loader2,
} from 'lucide-react';
import {
  SegmentedControl,
  Button,
  Menu,
  Badge,
  Tooltip,
  ActionIcon,
  Group,
  Text,
  Card,
} from '@mantine/core';

// Supported multi-page routes
export const AVAILABLE_ROUTES = [
  { value: '/', label: 'Home (/)', icon: Home },
  { value: '/about', label: 'About (/about)', icon: Briefcase },
  { value: '/services', label: 'Services (/services)', icon: Layers },
  { value: '/contact', label: 'Contact (/contact)', icon: Mail },
  { value: '/policies/privacy', label: 'Privacy Policy', icon: Shield },
  { value: '/policies/terms', label: 'Terms of Service', icon: FileText },
  { value: '/policies/refund', label: 'Refund Policy', icon: RotateCcw },
  { value: '/policies/shipping', label: 'Shipping Policy', icon: FileText },
];

export function PuckEditor() {
  const {
    activeRoute,
    setActiveRoute,
    puckDataByRoute,
    setPuckDataForRoute,
    savePuckDataToDb,
    loadPuckDataFromDb,
    isSavingPuck,
    viewport,
    setViewport,
  } = useBuilderStore();

  const [currentData, setCurrentData] = useState<Data>(() => {
    return puckDataByRoute[activeRoute] || getDefaultPuckDataForRoute(activeRoute);
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load from DB or Fallback on Route Change
  useEffect(() => {
    let isMounted = true;
    setIsLoadingPage(true);

    const initRouteData = async () => {
      // 1. Check if we already have it cached in Zustand
      if (puckDataByRoute[activeRoute]) {
        setCurrentData(puckDataByRoute[activeRoute]);
        setIsLoadingPage(false);
        return;
      }

      // 2. Otherwise try loading from SQLite database via API
      try {
        const dbData = await loadPuckDataFromDb(activeRoute);
        if (isMounted) {
          if (dbData && dbData.content && dbData.content.length > 0) {
            setCurrentData(dbData);
            setPuckDataForRoute(activeRoute, dbData);
          } else {
            // 3. Fallback to default template configuration for this route
            const defaultData = getDefaultPuckDataForRoute(activeRoute);
            setCurrentData(defaultData);
            setPuckDataForRoute(activeRoute, defaultData);
          }
        }
      } catch (e) {
        if (isMounted) {
          const defaultData = getDefaultPuckDataForRoute(activeRoute);
          setCurrentData(defaultData);
          setPuckDataForRoute(activeRoute, defaultData);
        }
      } finally {
        if (isMounted) {
          setIsLoadingPage(false);
        }
      }
    };

    initRouteData();

    return () => {
      isMounted = false;
    };
  }, [activeRoute, loadPuckDataFromDb, setPuckDataForRoute]);

  // Instant Zustand Store Synchronization & Debounced Auto-Save
  const handlePuckChange = useCallback(
    (data: Data) => {
      setCurrentData(data);
      // Instant synchronization with Zustand
      setPuckDataForRoute(activeRoute, data);

      // Debounced background persistence to SQLite
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        savePuckDataToDb(activeRoute, data);
      }, 2500);
    },
    [activeRoute, setPuckDataForRoute, savePuckDataToDb]
  );

  // Manual Explicit Save Trigger
  const handleManualSave = async () => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    const success = await savePuckDataToDb(activeRoute, currentData);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  // Reset to Archetype Defaults
  const handleResetCurrentPage = () => {
    const defaultData = getDefaultPuckDataForRoute(activeRoute);
    setCurrentData(defaultData);
    setPuckDataForRoute(activeRoute, defaultData);
    savePuckDataToDb(activeRoute, defaultData);
  };

  const currentRouteMeta = AVAILABLE_ROUTES.find((r) => r.value === activeRoute) || AVAILABLE_ROUTES[0];
  const CurrentIcon = currentRouteMeta.icon;

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* 1. MANTINE CONTROLS TOPBAR (Route Switcher, Viewports, Auto-save & Status) */}
      {/* ========================================================================= */}
      <header className="h-14 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between z-30 shrink-0 gap-3">
        {/* Left: Multi-page Route Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <Menu shadow="md" width={240}>
            <Menu.Target>
              <Button
                variant="default"
                size="xs"
                className="bg-zinc-800/90 hover:bg-zinc-800 border-zinc-700 text-zinc-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-2"
              >
                <CurrentIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-mono text-zinc-200">{activeRoute}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 ml-1" />
              </Button>
            </Menu.Target>

            <Menu.Dropdown className="bg-zinc-900 border-zinc-800 text-zinc-200">
              <Menu.Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Application Routes
              </Menu.Label>
              {AVAILABLE_ROUTES.slice(0, 4).map((route) => {
                const Icon = route.icon;
                return (
                  <Menu.Item
                    key={route.value}
                    leftSection={<Icon className="w-3.5 h-3.5 text-indigo-400" />}
                    onClick={() => setActiveRoute(route.value)}
                    className={`text-xs hover:bg-zinc-800 ${
                      activeRoute === route.value ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : ''
                    }`}
                  >
                    {route.label}
                  </Menu.Item>
                );
              })}

              <Menu.Divider className="border-zinc-800" />
              <Menu.Label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Compliance & Policies
              </Menu.Label>
              {AVAILABLE_ROUTES.slice(4).map((route) => {
                const Icon = route.icon;
                return (
                  <Menu.Item
                    key={route.value}
                    leftSection={<Icon className="w-3.5 h-3.5 text-emerald-400" />}
                    onClick={() => setActiveRoute(route.value)}
                    className={`text-xs hover:bg-zinc-800 ${
                      activeRoute === route.value ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : ''
                    }`}
                  >
                    {route.label}
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>

          <Badge variant="light" color="indigo" size="sm" className="hidden sm:inline-flex text-[11px]">
            Puck Visual Architect
          </Badge>
        </div>

        {/* Center: Responsive Frame Mode Controls */}
        <div className="flex items-center">
          <SegmentedControl
            size="xs"
            value={viewport}
            onChange={(val) => setViewport(val as any)}
            data={[
              {
                value: 'desktop',
                label: (
                  <Group gap={4} wrap="nowrap" px={4}>
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">1440px</span>
                  </Group>
                ),
              },
              {
                value: 'tablet',
                label: (
                  <Group gap={4} wrap="nowrap" px={4}>
                    <Tablet className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">768px</span>
                  </Group>
                ),
              },
              {
                value: 'mobile',
                label: (
                  <Group gap={4} wrap="nowrap" px={4}>
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">375px</span>
                  </Group>
                ),
              },
            ]}
            className="bg-zinc-950 border border-zinc-800"
          />
        </div>

        {/* Right: Actions & SQLite Persist Indicators */}
        <div className="flex items-center gap-2">
          {/* SQLite DB Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-zinc-400 mr-2">
            {isSavingPuck ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span className="text-amber-400 font-mono">Syncing SQLite...</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Saved to Prisma DB</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-zinc-500 font-mono">SQLite Connected</span>
              </>
            )}
          </div>

          {/* Reset Page to Defaults */}
          <Tooltip label="Reset current page to default schema" withArrow position="bottom">
            <ActionIcon
              variant="default"
              size="sm"
              onClick={handleResetCurrentPage}
              className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </ActionIcon>
          </Tooltip>

          {/* Explicit Save Button */}
          <Button
            size="xs"
            variant="filled"
            color={saveSuccess ? 'teal' : 'indigo'}
            leftSection={
              isSavingPuck ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : saveSuccess ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )
            }
            onClick={handleManualSave}
            disabled={isSavingPuck}
            className="text-xs font-semibold shadow-xs transition-all"
          >
            {isSavingPuck ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Page'}
          </Button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. RESPONSIVE FRAME WRAPPER & PUCK VISUAL EDITOR CANVAS                   */}
      {/* ========================================================================= */}
      <div className="flex-1 relative overflow-hidden bg-zinc-950 flex flex-col items-center">
        {isLoadingPage ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <span className="text-xs font-mono">Loading Puck page state for {activeRoute}...</span>
          </div>
        ) : (
          <div
            className={`flex-1 w-full h-full flex flex-col transition-all duration-300 ${
              viewport === 'mobile'
                ? 'max-w-[390px] my-4 rounded-3xl border-4 border-zinc-800 shadow-2xl overflow-hidden'
                : viewport === 'tablet'
                ? 'max-w-[768px] my-4 rounded-2xl border-4 border-zinc-800 shadow-2xl overflow-hidden'
                : 'w-full'
            }`}
          >
            <div className="flex-1 overflow-auto puck-custom-theme">
              <Puck
                config={puckConfig}
                data={currentData}
                onChange={handlePuckChange}
                onPublish={handleManualSave}
                headerPath={activeRoute}
              />
            </div>
          </div>
        )}
      </div>

      {/* Custom Scoped Puck Overrides for seamless Untitled UI dark canvas theme */}
      <style>{`
        .puck-custom-theme {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .puck-custom-theme ._Puck_130q3_1 {
          background-color: #09090b !important;
          color: #f4f4f5 !important;
        }
        .puck-custom-theme ._Sidebar_1j5j1_1 {
          background-color: #18181b !important;
          border-color: #27272a !important;
        }
        .puck-custom-theme ._Drawer_165w0_1 {
          background-color: #18181b !important;
          border-color: #27272a !important;
          color: #f4f4f5 !important;
        }
      `}</style>
    </div>
  );
}
