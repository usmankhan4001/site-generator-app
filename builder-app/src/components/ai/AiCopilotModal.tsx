'use client';

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Textarea,
  TextInput,
  SegmentedControl,
  Select,
  Badge,
  Group,
  Stack,
  Text,
  Paper,
  Divider,
  Alert,
  Loader,
  ScrollArea,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import {
  Sparkles,
  Briefcase,
  ShieldCheck,
  RotateCw,
  Check,
  Key,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Layers,
  ArrowRight,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { useBuilderStore } from '@/lib/store';
import {
  AiTone,
  DEFAULT_OPENROUTER_MODEL,
  FALLBACK_OPENROUTER_MODEL,
  ComplianceAuditResult,
  FullSiteCopyResult,
} from '@/lib/openrouter';

const darkTheme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
});

const TONE_OPTIONS = [
  { label: 'Enterprise Corporate', value: 'Enterprise Corporate' },
  { label: 'Minimalist Luxury', value: 'Minimalist Luxury' },
  { label: 'Technical Authoritative', value: 'Technical Authoritative' },
  { label: 'Modern Friendly', value: 'Modern Friendly' },
];

const SECTION_OPTIONS = [
  { label: 'Hero Headline & Copy', value: 'hero' },
  { label: 'Retainer Services & Pricing', value: 'offerings' },
  { label: 'Bento Feature Capabilities', value: 'features' },
  { label: 'Frequently Asked Questions (FAQ)', value: 'faq' },
];

export function AiCopilotModal() {
  const {
    isAiCopilotOpen,
    setAiCopilotOpen,
    aiCopilotInitialAction,
    setAiCopilotInitialAction,
    openRouterApiKey,
    setOpenRouterApiKey,
    business,
    updateBusiness,
    customHero,
    updateHero,
    customOfferings,
    setActivePreviewTab,
  } = useBuilderStore();

  const [activeTab, setActiveTab] = useState<'generate' | 'audit' | 'settings'>('generate');
  const [tone, setTone] = useState<AiTone>('Enterprise Corporate');
  const [sectionType, setSectionType] = useState<string>('hero');
  const [prompt, setPrompt] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_OPENROUTER_MODEL);
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(false);
  const [tempApiKey, setTempApiKey] = useState<string>(openRouterApiKey || '');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Results state
  const [generatedBlock, setGeneratedBlock] = useState<any>(null);
  const [generatedSite, setGeneratedSite] = useState<FullSiteCopyResult | null>(null);
  const [complianceResult, setComplianceResult] = useState<ComplianceAuditResult | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Sync initial action from outside if provided
  useEffect(() => {
    if (aiCopilotInitialAction) {
      if (aiCopilotInitialAction === 'audit-compliance') {
        setActiveTab('audit');
        handleAuditCompliance();
      } else if (aiCopilotInitialAction === 'rewrite-block') {
        setActiveTab('generate');
        setSectionType('hero');
      }
      setAiCopilotInitialAction(undefined);
    }
  }, [aiCopilotInitialAction]);

  const handleSaveApiKey = () => {
    setOpenRouterApiKey(tempApiKey.trim());
    setShowApiKeyInput(false);
    setSuccessMsg('OpenRouter API Key saved in local session.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  /**
   * Quick Action 1: Generate Retainer Services
   */
  const handleQuickGenerateRetainers = async () => {
    setActiveTab('generate');
    setSectionType('offerings');
    setPrompt('Generate 3 transparent high-ticket B2B service retainers optimized for international merchant underwriting.');
    await executeGeneration({
      action: 'rewrite-block',
      overrideSection: 'offerings',
      overridePrompt: 'Generate 3 transparent high-ticket B2B service retainers with clear deliverables, SLAs, and refund guarantees.',
    });
  };

  /**
   * Quick Action 2: Rewrite Headline
   */
  const handleQuickRewriteHeadline = async () => {
    setActiveTab('generate');
    setSectionType('hero');
    setPrompt(`Craft a high-converting Untitled UI hero headline and subtitle for ${business.companyName || 'our brand'}.`);
    await executeGeneration({
      action: 'rewrite-block',
      overrideSection: 'hero',
      overridePrompt: `Craft an authoritative, conversion-engineered hero headline for ${business.companyName || 'our brand'}.`,
    });
  };

  /**
   * Quick Action 3: Audit Compliance
   */
  const handleAuditCompliance = async () => {
    setActiveTab('audit');
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'audit-compliance',
          apiKey: openRouterApiKey || undefined,
          model: selectedModel,
          business,
          jurisdiction: business.governingLaw || 'Republic of Singapore',
          currency: business.currency || 'USD',
          textContent: JSON.stringify({
            company: business.companyName,
            regNo: business.registrationNumber,
            address: business.address,
            email: business.email,
            phone: business.phone,
            hero: customHero,
            offerings: customOfferings,
          }),
        }),
      });

      const res = await response.json();
      if (res.success && res.data) {
        setComplianceResult(res.data);
        setLastAction('audit-compliance');
      } else {
        throw new Error(res.error || 'Failed to complete compliance audit');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error running compliance check.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Quick Action 4: Generate Full Site Copy
   */
  const handleGenerateFullSite = async () => {
    setActiveTab('generate');
    await executeGeneration({
      action: 'generate-site',
      overridePrompt: prompt || 'Craft end-to-end bespoke website copy with retainers, bento features, and compliance disclosures.',
    });
  };

  /**
   * General Generation Execution
   */
  const executeGeneration = async (opts?: {
    action?: 'rewrite-block' | 'generate-site';
    overrideSection?: string;
    overridePrompt?: string;
  }) => {
    const actionToRun = opts?.action || (sectionType === 'full-site' ? 'generate-site' : 'rewrite-block');
    const targetSection = opts?.overrideSection || sectionType;
    const effectivePrompt = opts?.overridePrompt || prompt;

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionToRun,
          apiKey: openRouterApiKey || undefined,
          model: selectedModel,
          tone,
          business,
          sectionType: targetSection,
          prompt: effectivePrompt,
          currentContent: targetSection === 'hero' ? customHero : customOfferings,
        }),
      });

      const res = await response.json();
      if (!res.success) {
        throw new Error(res.error || 'AI generation failed');
      }

      setLastAction(actionToRun);

      if (actionToRun === 'generate-site') {
        setGeneratedSite(res.data);
        setGeneratedBlock(null);
      } else {
        setGeneratedBlock(res.data);
        setGeneratedSite(null);
      }

      if (res.isFallback) {
        setSuccessMsg('Generated high-converting preset copy (Offline / Preset Mode). Add OpenRouter API key for live AI inference.');
      } else {
        setSuccessMsg('Content generated successfully via OpenRouter.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during generation.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Apply AI Results to Canvas
   */
  const handleApplyToCanvas = () => {
    if (!lastAction) return;

    if (lastAction === 'rewrite-block' && generatedBlock) {
      if (sectionType === 'hero') {
        updateHero({
          badge: generatedBlock.badge || customHero.badge,
          headline: generatedBlock.headline || customHero.headline,
          accentText: generatedBlock.accentText || customHero.accentText,
          subtitle: generatedBlock.subtitle || customHero.subtitle,
          primaryCta: generatedBlock.primaryCta || customHero.primaryCta,
          secondaryCta: generatedBlock.secondaryCta || customHero.secondaryCta,
          trustBadges: generatedBlock.trustBadges || customHero.trustBadges,
        });
      } else if (sectionType === 'offerings' && generatedBlock.offerings) {
        useBuilderStore.setState({
          customOfferings: generatedBlock.offerings,
        });
      }
      setSuccessMsg('Applied generated block directly to live canvas!');
    } else if (lastAction === 'generate-site' && generatedSite) {
      if (generatedSite.hero) {
        updateHero(generatedSite.hero);
      }
      if (generatedSite.offerings && generatedSite.offerings.length > 0) {
        useBuilderStore.setState({
          customOfferings: generatedSite.offerings,
        });
      }
      setSuccessMsg('Full website blueprint applied to live canvas!');
    } else if (lastAction === 'audit-compliance' && complianceResult) {
      if (complianceResult.merchantDisclosures) {
        updateBusiness({
          companyName: complianceResult.merchantDisclosures.legalEntity || business.companyName,
          registrationNumber: complianceResult.merchantDisclosures.registrationNumber || business.registrationNumber,
          address: complianceResult.merchantDisclosures.registeredAddress || business.address,
          governingLaw: complianceResult.merchantDisclosures.governingLaw || business.governingLaw,
        });
      }
      setSuccessMsg('Compliance registry details synced with site business settings!');
    }

    setActivePreviewTab('preview');
    setTimeout(() => {
      setAiCopilotOpen(false);
    }, 900);
  };

  const hasResults = !!generatedBlock || !!generatedSite || !!complianceResult;

  return (
    <MantineProvider theme={darkTheme} defaultColorScheme="dark">
      <Modal
        opened={isAiCopilotOpen}
        onClose={() => setAiCopilotOpen(false)}
        size="xl"
        radius="lg"
        centered
        padding="lg"
        overlayProps={{
          backgroundOpacity: 0.75,
          blur: 6,
        }}
        styles={{
          content: {
            backgroundColor: '#09090b',
            border: '1px solid #27272a',
            color: '#f4f4f5',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          },
          header: {
            backgroundColor: '#09090b',
            borderBottom: '1px solid #18181b',
            paddingBottom: '0.75rem',
          },
          close: {
            color: '#a1a1aa',
            '&:hover': {
              backgroundColor: '#27272a',
              color: '#ffffff',
            },
          },
        }}
        title={
          <Group gap="xs">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <Text fw={600} size="sm" c="zinc.1">
                Airwallex AI Copilot Studio
              </Text>
              <Text size="xs" c="dimmed">
                OpenRouter Multi-Model Copy & KYC Underwriting Assistant
              </Text>
            </div>
            <Badge
              variant="outline"
              color="indigo"
              size="sm"
              className="ml-2 hidden sm:inline-flex border-indigo-500/30 text-indigo-300"
            >
              Untitled UI Engine
            </Badge>
          </Group>
        }
      >
        <Stack gap="md" className="pt-2">
          {/* Top Quick Actions Bar */}
          <div>
            <Text size="xs" fw={500} c="dimmed" mb={6} className="uppercase tracking-wider">
              Quick Actions
            </Text>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleQuickRewriteHeadline}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 text-zinc-200 text-xs font-medium transition-all text-left group cursor-pointer"
              >
                <div className="p-1 rounded bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold">Rewrite Headline</div>
                  <div className="text-[10px] text-zinc-400">Hero copy & accent text</div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleQuickGenerateRetainers}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 text-zinc-200 text-xs font-medium transition-all text-left group cursor-pointer"
              >
                <div className="p-1 rounded bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold">Generate Retainer Services</div>
                  <div className="text-[10px] text-zinc-400">3 tiered service packages</div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleAuditCompliance}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 text-zinc-200 text-xs font-medium transition-all text-left group cursor-pointer"
              >
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold">Audit Compliance</div>
                  <div className="text-[10px] text-zinc-400">Airwallex KYC & policies</div>
                </div>
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-zinc-800">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'generate'
                  ? 'border-indigo-500 text-indigo-400 font-semibold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Content & Copy Generator
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'audit'
                  ? 'border-emerald-500 text-emerald-400 font-semibold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Airwallex Compliance Auditor
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ml-auto ${
                activeTab === 'settings'
                  ? 'border-zinc-500 text-zinc-200 font-semibold'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Key className="w-3 h-3" />
                <span>API Settings</span>
              </span>
            </button>
          </div>

          {/* Tab 1: Content Generator */}
          {activeTab === 'generate' && (
            <Stack gap="sm">
              {/* Tone Selector */}
              <div>
                <Text size="xs" fw={500} c="dimmed" mb={4}>
                  Tone of Voice
                </Text>
                <SegmentedControl
                  value={tone}
                  onChange={(val) => setTone(val as AiTone)}
                  data={TONE_OPTIONS}
                  size="xs"
                  fullWidth
                  styles={{
                    root: {
                      backgroundColor: '#18181b',
                      border: '1px solid #27272a',
                      padding: 3,
                    },
                    indicator: {
                      backgroundColor: '#27272a',
                    },
                    label: {
                      color: '#a1a1aa',
                      fontSize: '11px',
                      '&[dataActive]': {
                        color: '#f4f4f5',
                        fontWeight: 600,
                      },
                    },
                  }}
                />
              </div>

              {/* Target Section Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <Text size="xs" fw={500} c="dimmed" mb={4}>
                    Target Section
                  </Text>
                  <Select
                    value={sectionType}
                    onChange={(val) => setSectionType(val || 'hero')}
                    data={SECTION_OPTIONS}
                    size="xs"
                    styles={{
                      input: {
                        backgroundColor: '#18181b',
                        borderColor: '#27272a',
                        color: '#f4f4f5',
                      },
                      dropdown: {
                        backgroundColor: '#18181b',
                        borderColor: '#27272a',
                        color: '#f4f4f5',
                      },
                    }}
                  />
                </div>

                <div>
                  <Text size="xs" fw={500} c="dimmed" mb={4}>
                    AI Model Engine
                  </Text>
                  <Select
                    value={selectedModel}
                    onChange={(val) => setSelectedModel(val || DEFAULT_OPENROUTER_MODEL)}
                    data={[
                      { label: 'Gemini 2.0 Flash (Free / High-Speed)', value: DEFAULT_OPENROUTER_MODEL },
                      { label: 'Llama 3.3 70B Instruct (Free)', value: FALLBACK_OPENROUTER_MODEL },
                    ]}
                    size="xs"
                    styles={{
                      input: {
                        backgroundColor: '#18181b',
                        borderColor: '#27272a',
                        color: '#f4f4f5',
                      },
                      dropdown: {
                        backgroundColor: '#18181b',
                        borderColor: '#27272a',
                        color: '#f4f4f5',
                      },
                    }}
                  />
                </div>
              </div>

              {/* Prompt Textarea */}
              <div>
                <Text size="xs" fw={500} c="dimmed" mb={4}>
                  Custom Prompt or Context (Optional)
                </Text>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.currentTarget.value)}
                  placeholder="e.g. Focus on high-throughput distributed engineering, 4-hour SLA response, and Airwallex multi-currency invoicing in USD."
                  minRows={2}
                  maxRows={4}
                  size="xs"
                  styles={{
                    input: {
                      backgroundColor: '#18181b',
                      borderColor: '#27272a',
                      color: '#f4f4f5',
                      fontSize: '12px',
                    },
                  }}
                />
              </div>

              {/* Generate Trigger Button */}
              <div className="flex items-center gap-2 pt-1">
                <Button
                  onClick={() => executeGeneration()}
                  loading={isLoading}
                  leftSection={<Sparkles className="w-3.5 h-3.5" />}
                  size="xs"
                  color="indigo"
                  className="bg-indigo-600 hover:bg-indigo-500 flex-1 font-medium"
                >
                  Generate {sectionType.toUpperCase()} Copy
                </Button>
                <Button
                  onClick={handleGenerateFullSite}
                  loading={isLoading}
                  variant="default"
                  size="xs"
                  leftSection={<Layers className="w-3.5 h-3.5" />}
                  className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                >
                  Full Site Blueprint
                </Button>
              </div>
            </Stack>
          )}

          {/* Tab 2: Compliance Auditor */}
          {activeTab === 'audit' && (
            <Stack gap="sm">
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
                <div className="flex items-center gap-2 font-semibold text-zinc-100 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Airwallex Merchant Pre-Flight Verification</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Audits entity registration, refund SLAs, customer contact channels, physical address, and pricing clarity to guarantee frictionless underwriting approval.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button
                  onClick={handleAuditCompliance}
                  loading={isLoading}
                  leftSection={<RotateCw className="w-3.5 h-3.5" />}
                  size="xs"
                  color="teal"
                  className="bg-emerald-600 hover:bg-emerald-500 font-medium"
                >
                  Run Compliance Pre-Flight Audit
                </Button>
                {complianceResult && (
                  <Badge
                    color={complianceResult.passed ? 'teal' : 'red'}
                    variant="light"
                    size="md"
                    className="font-mono"
                  >
                    SCORE: {complianceResult.score}/100 • {complianceResult.status.toUpperCase()}
                  </Badge>
                )}
              </div>
            </Stack>
          )}

          {/* Tab 3: API Settings */}
          {activeTab === 'settings' && (
            <Stack gap="sm">
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs">
                <div className="flex items-center gap-2 font-semibold text-zinc-100 mb-1">
                  <Key className="w-4 h-4 text-indigo-400" />
                  <span>OpenRouter API Key Configuration</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Optionally provide your own OpenRouter key for custom inference quotas. If left empty, the studio operates using default zero-friction fallback presets.
                </p>
              </div>

              <div>
                <Text size="xs" fw={500} c="dimmed" mb={4}>
                  OpenRouter API Key
                </Text>
                <div className="flex items-center gap-2">
                  <TextInput
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.currentTarget.value)}
                    placeholder="sk-or-v1-..."
                    size="xs"
                    className="flex-1"
                    styles={{
                      input: {
                        backgroundColor: '#18181b',
                        borderColor: '#27272a',
                        color: '#f4f4f5',
                        fontFamily: 'monospace',
                      },
                    }}
                  />
                  <Button
                    onClick={handleSaveApiKey}
                    size="xs"
                    variant="filled"
                    color="indigo"
                    className="bg-indigo-600 hover:bg-indigo-500"
                  >
                    Save Key
                  </Button>
                </div>
              </div>
            </Stack>
          )}

          {/* Notifications / Alerts */}
          {errorMsg && (
            <Alert
              icon={<AlertCircle className="w-4 h-4" />}
              title="Generation Notice"
              color="red"
              variant="light"
              withCloseButton
              onClose={() => setErrorMsg(null)}
              className="bg-red-500/10 border border-red-500/20 text-red-300"
            >
              {errorMsg}
            </Alert>
          )}

          {successMsg && (
            <Alert
              icon={<Check className="w-4 h-4" />}
              color="teal"
              variant="light"
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
            >
              {successMsg}
            </Alert>
          )}

          {/* Results Preview Card */}
          {hasResults && (
            <div className="mt-2 border border-zinc-800 rounded-xl bg-zinc-950 overflow-hidden">
              <div className="px-3 py-2 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Generated Preview ({lastAction})
                </span>
                <Badge size="xs" variant="outline" color="gray" className="border-zinc-700 text-zinc-400">
                  Ready to Apply
                </Badge>
              </div>

              <ScrollArea.Autosize mah={220} className="p-3 text-xs">
                {/* 1. Hero Block Preview */}
                {generatedBlock && sectionType === 'hero' && (
                  <div className="space-y-2">
                    <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                      {generatedBlock.badge}
                    </div>
                    <div className="text-base font-bold text-zinc-100">
                      {generatedBlock.headline}{' '}
                      <span className="text-indigo-400">{generatedBlock.accentText}</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                      {generatedBlock.subtitle}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-medium text-[11px]">
                        {generatedBlock.primaryCta || 'Primary Action'}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-medium text-[11px]">
                        {generatedBlock.secondaryCta || 'Secondary Action'}
                      </span>
                    </div>
                    {generatedBlock.trustBadges && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {generatedBlock.trustBadges.map((badge: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400"
                          >
                            ✓ {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Offerings / Retainers Preview */}
                {generatedBlock && sectionType === 'offerings' && generatedBlock.offerings && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {generatedBlock.offerings.map((tier: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-xs ${
                          tier.popular
                            ? 'bg-indigo-950/30 border-indigo-500/40 text-zinc-100'
                            : 'bg-zinc-900/50 border-zinc-800 text-zinc-300'
                        }`}
                      >
                        <div className="text-[10px] font-mono uppercase text-indigo-400">
                          {tier.tag || `Tier ${idx + 1}`}
                        </div>
                        <div className="font-semibold text-zinc-100">{tier.name}</div>
                        <div className="text-base font-bold text-zinc-100 my-1">
                          ${tier.price}
                          <span className="text-[10px] text-zinc-400 font-normal">/mo</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 line-clamp-2 mb-1.5">
                          {tier.description}
                        </p>
                        <ul className="space-y-1 text-[10px] text-zinc-300">
                          {tier.features?.slice(0, 3).map((f: string, fIdx: number) => (
                            <li key={fIdx} className="truncate">
                              • {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Full Site Preview */}
                {generatedSite && (
                  <div className="space-y-3">
                    <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                      <div className="text-[10px] font-semibold text-zinc-400 uppercase">Hero Blueprint</div>
                      <div className="font-bold text-zinc-100">
                        {generatedSite.hero.headline}{' '}
                        <span className="text-indigo-400">{generatedSite.hero.accentText}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">{generatedSite.hero.subtitle}</p>
                    </div>

                    {generatedSite.offerings && (
                      <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                        <div className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">
                          Generated {generatedSite.offerings.length} Retainer Tiers
                        </div>
                        <div className="flex gap-2">
                          {generatedSite.offerings.map((o, idx) => (
                            <div key={idx} className="flex-1 p-1.5 rounded bg-zinc-950 border border-zinc-800 text-[11px]">
                              <div className="font-medium text-zinc-200">{o.name}</div>
                              <div className="font-bold text-indigo-400">${o.price}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Compliance Audit Checklist Preview */}
                {complianceResult && (
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-zinc-100">Airwallex Compliance Rating</div>
                        <p className="text-[11px] text-zinc-400">{complianceResult.summary}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold font-mono text-emerald-400">
                          {complianceResult.score}%
                        </div>
                        <div className="text-[10px] text-emerald-300">Ready to Submit</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {complianceResult.checks.map((chk, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded bg-zinc-900/40 border border-zinc-800/80 flex items-start gap-2"
                        >
                          <span className="mt-0.5">
                            {chk.status === 'pass' ? (
                              <span className="text-emerald-400">✓</span>
                            ) : (
                              <span className="text-amber-400">⚠</span>
                            )}
                          </span>
                          <div className="flex-1">
                            <div className="font-medium text-zinc-200 text-[11px]">{chk.name}</div>
                            <div className="text-[10px] text-zinc-400">{chk.description}</div>
                            {chk.fixSuggestion && (
                              <div className="text-[10px] text-amber-300 mt-0.5">
                                Fix suggestion: {chk.fixSuggestion}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea.Autosize>
            </div>
          )}

          {/* Modal Footer / Actions */}
          <Divider color="#27272a" />
          <div className="flex items-center justify-between pt-1">
            <Button
              variant="subtle"
              color="gray"
              size="xs"
              onClick={() => setAiCopilotOpen(false)}
              className="text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </Button>

            <Button
              onClick={handleApplyToCanvas}
              disabled={!hasResults}
              size="xs"
              color="indigo"
              leftSection={<Check className="w-3.5 h-3.5" />}
              className="bg-indigo-600 hover:bg-indigo-500 font-semibold shadow-md shadow-indigo-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Apply to Canvas
            </Button>
          </div>
        </Stack>
      </Modal>
    </MantineProvider>
  );
}
export default AiCopilotModal;
