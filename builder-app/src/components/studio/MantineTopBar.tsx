'use client';

import React from 'react';
import {
  Group,
  Text,
  Badge,
  Button,
  ActionIcon,
  Tooltip,
  Menu,
  UnstyledButton,
  Indicator,
  Box,
} from '@mantine/core';
import {
  IconDeviceDesktop,
  IconDeviceTablet,
  IconDeviceMobile,
  IconRocket,
  IconShieldCheck,
  IconSparkles,
  IconZoomIn,
  IconZoomOut,
  IconPercentage,
  IconChevronDown,
  IconRotate,
  IconCheck,
} from '@tabler/icons-react';
import { useBuilderStore } from '@/lib/store';
import { ViewportMode } from '@/types/builder';
import { THEMES } from '@/lib/data/themes';

interface MantineTopBarProps {
  onDeploy: () => void;
}

const ROUTE_PILLS = [
  { label: 'Home', route: '/', pathBadge: '/' },
  { label: 'About', route: '/about', pathBadge: '/about' },
  { label: 'Services', route: '/services', pathBadge: '/services' },
  { label: 'Contact', route: '/contact', pathBadge: '/contact' },
  { label: 'Policies', route: '/policies', pathBadge: '/policies' },
];

const ZOOM_OPTIONS = [
  { label: '50%', value: 50 },
  { label: '75%', value: 75 },
  { label: '100% (Fit)', value: 100 },
  { label: '125%', value: 125 },
];

export function MantineTopBar({ onDeploy }: MantineTopBarProps) {
  const {
    viewport,
    setViewport,
    business,
    selectedThemeId,
    isDeploying,
    resetBuilder,
    activePreviewTab,
    setActivePreviewTab,
    setAiCopilotOpen,
    setAiCopilotInitialAction,
    activeRoute,
    setActiveRoute,
    zoom,
    setZoom,
  } = useBuilderStore();

  const theme = THEMES[selectedThemeId] || THEMES['indigo-enterprise'];

  const handleZoomIn = () => {
    if (zoom < 150) setZoom(Math.min(zoom + 25, 150));
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(Math.max(zoom - 25, 50));
  };

  return (
    <header className="h-16 w-full bg-[#090d16] border-b border-[#1e293b] px-3 sm:px-5 flex items-center justify-between z-30 shrink-0 text-slate-100 select-none">
      {/* 1. Brand & Workspace Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] via-[#4f46e5] to-[#4338ca] text-white shadow-lg shadow-indigo-500/25 font-bold text-sm border border-indigo-400/30">
          AW
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-white tracking-tight">
              Site Builder Studio
            </h1>
            <Badge
              size="xs"
              variant="outline"
              color="indigo"
              className="border-indigo-500/30 text-indigo-300 font-mono"
            >
              Mantine v7 Shell
            </Badge>
          </div>
          <p className="text-xs text-slate-400 truncate max-w-[180px] sm:max-w-xs">
            {business.companyName || 'Vantage Cloud Systems Ltd'} •{' '}
            <span className="font-mono text-slate-300">{business.domain}</span>
          </p>
        </div>
      </div>

      {/* 2. Center: Active Route Pills & Viewport & Zoom */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Route Pills Switcher */}
        <div className="flex items-center bg-[#121826] p-1 rounded-xl border border-[#1e293b] shadow-inner gap-0.5">
          {ROUTE_PILLS.map((pill) => {
            const isActive = activeRoute === pill.route;
            return (
              <UnstyledButton
                key={pill.route}
                onClick={() => setActiveRoute(pill.route)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#6366f1] text-white shadow-md shadow-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]/60'
                }`}
                title={`Switch canvas to ${pill.label} (${pill.pathBadge})`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                <span>{pill.label}</span>
                <span
                  className={`text-[10px] font-mono opacity-60 ${
                    isActive ? 'text-indigo-100' : 'text-slate-500'
                  }`}
                >
                  {pill.pathBadge}
                </span>
              </UnstyledButton>
            );
          })}
        </div>

        {/* Viewport Switcher (Desktop 1440, Tablet 768, Mobile 375) */}
        <div className="flex items-center bg-[#121826] p-1 rounded-xl border border-[#1e293b] shadow-inner gap-0.5">
          <Tooltip label="Desktop View (1440px)" withArrow position="bottom">
            <UnstyledButton
              onClick={() => setViewport('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                viewport === 'desktop'
                  ? 'bg-[#1e293b] text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]/40'
              }`}
            >
              <IconDeviceDesktop size={14} />
              <span className="hidden xl:inline">1440</span>
            </UnstyledButton>
          </Tooltip>

          <Tooltip label="Tablet View (768px)" withArrow position="bottom">
            <UnstyledButton
              onClick={() => setViewport('tablet')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                viewport === 'tablet'
                  ? 'bg-[#1e293b] text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]/40'
              }`}
            >
              <IconDeviceTablet size={14} />
              <span className="hidden xl:inline">768</span>
            </UnstyledButton>
          </Tooltip>

          <Tooltip label="Mobile View (375px)" withArrow position="bottom">
            <UnstyledButton
              onClick={() => setViewport('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                viewport === 'mobile'
                  ? 'bg-[#1e293b] text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#1e293b]/40'
              }`}
            >
              <IconDeviceMobile size={14} />
              <span className="hidden xl:inline">375</span>
            </UnstyledButton>
          </Tooltip>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center bg-[#121826] p-1 rounded-xl border border-[#1e293b] shadow-inner gap-0.5">
          <Tooltip label="Zoom Out" withArrow position="bottom">
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="text-slate-400 hover:text-white disabled:opacity-30"
            >
              <IconZoomOut size={13} />
            </ActionIcon>
          </Tooltip>

          <Menu shadow="md" width={120}>
            <Menu.Target>
              <UnstyledButton className="px-2 py-0.5 rounded text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1">
                <span>{zoom}%</span>
                <IconChevronDown size={11} className="opacity-60" />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown className="bg-[#121826] border-[#1e293b] text-slate-200">
              {ZOOM_OPTIONS.map((opt) => (
                <Menu.Item
                  key={opt.value}
                  onClick={() => setZoom(opt.value)}
                  className={`text-xs ${
                    zoom === opt.value
                      ? 'text-[#6366f1] font-semibold bg-[#1e293b]'
                      : 'hover:bg-[#1e293b]'
                  }`}
                  rightSection={zoom === opt.value ? <IconCheck size={12} /> : null}
                >
                  {opt.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>

          <Tooltip label="Zoom In" withArrow position="bottom">
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 150}
              className="text-slate-400 hover:text-white disabled:opacity-30"
            >
              <IconZoomIn size={13} />
            </ActionIcon>
          </Tooltip>
        </div>
      </div>

      {/* 3. Right Controls: Compliance Dot, AI Copilot, Deploy Website */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Compliance Status Dot & Badge */}
        <Tooltip
          label="Airwallex KYC Pre-Flight: All 5 statutory disclosures verified (Entity, CR, Address, Policies, Phone)"
          withArrow
          position="bottom"
          multiline
          w={260}
        >
          <UnstyledButton
            onClick={() => {
              setAiCopilotInitialAction('audit-compliance');
              setAiCopilotOpen(true);
            }}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 text-xs font-medium transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">Airwallex KYC Ready</span>
          </UnstyledButton>
        </Tooltip>

        {/* AI Copilot Trigger */}
        <Button
          variant="light"
          color="indigo"
          size="xs"
          radius="md"
          leftSection={<IconSparkles size={14} className="text-indigo-400 animate-pulse" />}
          onClick={() => setAiCopilotOpen(true)}
          className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
        >
          <span className="hidden sm:inline">AI Copilot</span>
        </Button>

        {/* Reset Quick Action */}
        <Tooltip label="Reset Builder to Default Template" withArrow position="bottom">
          <ActionIcon
            variant="subtle"
            color="gray"
            size="md"
            radius="md"
            onClick={resetBuilder}
            className="text-slate-400 hover:text-white hover:bg-[#1e293b]"
          >
            <IconRotate size={16} />
          </ActionIcon>
        </Tooltip>

        {/* Deploy Website Primary Button */}
        <Button
          variant="gradient"
          gradient={{ from: '#6366f1', to: '#8b5cf6', deg: 105 }}
          size="xs"
          radius="md"
          loading={isDeploying}
          leftSection={!isDeploying ? <IconRocket size={14} /> : undefined}
          onClick={onDeploy}
          className="shadow-lg shadow-indigo-500/25 font-semibold border border-indigo-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          {isDeploying ? 'Deploying...' : 'Deploy Website'}
        </Button>
      </div>
    </header>
  );
}
