'use client';

import React, { useState, useMemo } from 'react';
import {
  Tabs,
  TextInput,
  Select,
  Textarea,
  ScrollArea,
  Badge,
  Button,
  ActionIcon,
  Card,
  Group,
  Stack,
  Text,
  Divider,
  Tooltip,
  Modal,
  Paper,
  UnstyledButton,
  ThemeIcon,
  Box,
} from '@mantine/core';
import {
  IconTemplate,
  IconShieldCheck,
  IconFiles,
  IconComponents,
  IconSearch,
  IconPlus,
  IconCheck,
  IconBuilding,
  IconMail,
  IconPhone,
  IconMapPin,
  IconScale,
  IconCoin,
  IconWorld,
  IconTrash,
  IconEdit,
  IconCopy,
  IconArrowRight,
  IconSparkles,
  IconFilter,
  IconDeviceDesktop,
  IconChevronRight,
  IconCircleCheck,
  IconAlertCircle,
  IconEye,
  IconExternalLink,
} from '@tabler/icons-react';
import { useBuilderStore } from '@/lib/store';
import { ALL_STUDIO_TEMPLATES, UnifiedStudioTemplate } from '@/data/templates/allTemplates';
import { STUDIO_BLOCKS, STUDIO_BLOCK_CATEGORIES, StudioBlockMeta } from '@/data/blocks/blocksRegistry';

export interface PageItem {
  id: string;
  name: string;
  route: string;
  isPublished: boolean;
  isSystem?: boolean;
  description?: string;
}

const INITIAL_PAGES: PageItem[] = [
  { id: 'home', name: 'Home Landing Page', route: '/', isPublished: true, isSystem: true, description: 'Main conversion landing page with Hero, Bento, Offerings, and Proof.' },
  { id: 'about', name: 'About Us & Mission', route: '/about', isPublished: true, description: 'Executive team, corporate milestones, global office footprint, and mission.' },
  { id: 'services', name: 'Solutions & Offerings', route: '/services', isPublished: true, description: 'Comprehensive catalog of products, SLA tiers, and enterprise pricing.' },
  { id: 'contact', name: 'Contact & Support', route: '/contact', isPublished: true, description: 'Official corporate registry details, map, NOC phone, and inquiry form.' },
  { id: 'policies', name: 'Statutory Policies', route: '/policies', isPublished: true, description: 'Airwallex KYC compliant Terms, Privacy, Refund, and Delivery terms.' },
];

export function MantineSidebar() {
  const {
    business,
    updateBusiness,
    activeRoute,
    setActiveRoute,
    setArchetype,
    setTheme,
    updateHero,
    addLog,
    puckDataByRoute,
    setPuckDataForRoute,
    setAiCopilotOpen,
    setAiCopilotInitialAction,
  } = useBuilderStore();

  const [activeTab, setActiveTab] = useState<string | null>('templates');

  // --- TAB 1: TEMPLATES GALLERY STATE ---
  const [templateSearch, setTemplateSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  const filteredTemplates = useMemo(() => {
    return ALL_STUDIO_TEMPLATES.filter((t) => {
      const matchesGroup = selectedGroup === 'all' || t.group === selectedGroup;
      const query = templateSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.tagline.toLowerCase().includes(query) ||
        t.industry.toLowerCase().includes(query) ||
        t.categoryLabel.toLowerCase().includes(query) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesGroup && matchesSearch;
    });
  }, [templateSearch, selectedGroup]);

  const handleApplyTemplate = (template: UnifiedStudioTemplate) => {
    // 1. Update business KYC details if template has corporate reg
    if (template.corporateRegistration) {
      updateBusiness({
        companyName: template.corporateRegistration.entityName,
        shortName: template.name.split(' ')[0],
        registrationNumber: template.corporateRegistration.registrationNumber,
        address: template.corporateRegistration.registeredAddress,
        email: template.corporateRegistration.contactEmail,
        phone: template.corporateRegistration.contactPhone,
        governingLaw: template.corporateRegistration.governingLaw,
      });
    }

    // 2. Set archetype and theme
    setArchetype(template.id);
    if (template.recommendedTheme) {
      setTheme(template.recommendedTheme);
    }

    // 3. Update Hero
    updateHero({
      badge: template.categoryLabel,
      headline: template.tagline || template.name,
      subtitle: template.description,
      image: template.previewImage,
    });

    setCopiedTemplateId(template.id);
    addLog(`Applied template: "${template.name}" (${template.categoryLabel})`, 'success');
    setTimeout(() => setCopiedTemplateId(null), 2500);
  };

  // --- TAB 2: COMPLIANCE QUICK PRESETS ---
  const handleAutofillPreset = (jurisdiction: 'singapore' | 'delaware' | 'difc' | 'london') => {
    if (jurisdiction === 'singapore') {
      updateBusiness({
        companyName: 'Vantage Cloud Systems Ltd',
        shortName: 'Vantage Cloud',
        registrationNumber: 'CR-89410294M',
        address: 'Level 38, Marina Bay Financial Centre Tower 2, 10 Marina Blvd, Singapore 018983',
        email: 'ops@vantagecloud.io',
        phone: '+65 6812 9400',
        governingLaw: 'Republic of Singapore',
        currency: 'USD',
        domain: 'vantagecloud.io',
      });
      addLog('Autofilled Singapore Corporate Entity Preset', 'info');
    } else if (jurisdiction === 'delaware') {
      updateBusiness({
        companyName: 'Apex Cloud Technologies Inc.',
        shortName: 'Apex Cloud',
        registrationNumber: 'DE-7849102-C',
        address: '1209 North Orange Street, Wilmington, DE 19801, United States',
        email: 'contact@apexcloud.io',
        phone: '+1 (302) 658-7581',
        governingLaw: 'State of Delaware, USA',
        currency: 'USD',
        domain: 'apexcloud.io',
      });
      addLog('Autofilled Delaware Corporate Entity Preset', 'info');
    } else if (jurisdiction === 'difc') {
      updateBusiness({
        companyName: 'Al-Madar Horizon Fintech Ltd',
        shortName: 'Horizon Fintech',
        registrationNumber: 'DIFC-CL-4891',
        address: 'Gate Precinct 4, Level 5, Dubai International Financial Centre, Dubai, UAE',
        email: 'ops@horizonfintech.ae',
        phone: '+971 4 362 7000',
        governingLaw: 'DIFC Common Law, United Arab Emirates',
        currency: 'AED',
        domain: 'horizonfintech.ae',
      });
      addLog('Autofilled DIFC Dubai Corporate Entity Preset', 'info');
    } else if (jurisdiction === 'london') {
      updateBusiness({
        companyName: 'Stratum Infrastructure Group Ltd',
        shortName: 'Stratum Group',
        registrationNumber: 'UK-14829105',
        address: '30 St Mary Axe (The Gherkin), 28th Floor, London EC3A 8EP, United Kingdom',
        email: 'legal@stratumcloud.co.uk',
        phone: '+44 20 7946 0912',
        governingLaw: 'Laws of England and Wales',
        currency: 'GBP',
        domain: 'stratumcloud.co.uk',
      });
      addLog('Autofilled London Corporate Entity Preset', 'info');
    }
  };

  // --- TAB 3: PAGES STATE ---
  const [pages, setPages] = useState<PageItem[]>(INITIAL_PAGES);
  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [newPageName, setNewPageName] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageDesc, setNewPageDesc] = useState('');

  const handleAddPage = () => {
    if (!newPageName.trim()) return;
    const slug = newPageSlug.startsWith('/') ? newPageSlug : `/${newPageSlug.trim()}`;
    const newPage: PageItem = {
      id: `page-${Date.now()}`,
      name: newPageName.trim(),
      route: slug,
      isPublished: true,
      description: newPageDesc.trim() || 'Custom created studio route.',
    };
    setPages((prev) => [...prev, newPage]);
    setActiveRoute(slug);
    setNewPageName('');
    setNewPageSlug('');
    setNewPageDesc('');
    setIsAddPageOpen(false);
    addLog(`Created new page: ${newPage.name} (${slug})`, 'success');
  };

  const handleDeletePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  // --- TAB 4: BLOCKS DRAWER STATE ---
  const [blockSearch, setBlockSearch] = useState('');
  const [selectedBlockCategory, setSelectedBlockCategory] = useState('all');
  const [insertedBlockId, setInsertedBlockId] = useState<string | null>(null);

  const filteredBlocks = useMemo(() => {
    return STUDIO_BLOCKS.filter((b) => {
      const matchesCategory = selectedBlockCategory === 'all' || b.category === selectedBlockCategory;
      const q = blockSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [blockSearch, selectedBlockCategory]);

  const handleInsertBlock = (block: StudioBlockMeta) => {
    const existing = puckDataByRoute[activeRoute] || { content: [], root: { props: { title: business.companyName } } };
    const newBlockItem = {
      type: block.id,
      props: {
        id: `${block.id}-${Date.now()}`,
        ...(block.sampleProps || {}),
      },
    };
    const updated = {
      ...existing,
      content: [...(existing.content || []), newBlockItem],
    };
    setPuckDataForRoute(activeRoute, updated);
    setInsertedBlockId(block.id);
    addLog(`Inserted "${block.name}" into ${activeRoute}`, 'success');
    setTimeout(() => setInsertedBlockId(null), 2000);
  };

  return (
    <aside
      aria-label="Studio Configuration Sidebar"
      className="w-full lg:w-[460px] xl:w-[500px] shrink-0 h-[calc(100vh-4rem)] border-r border-[#1e293b] bg-[#090d16] text-slate-100 flex flex-col z-20 shadow-2xl relative select-none"
    >
      {/* Top Header Strip */}
      <div className="px-4 py-2.5 border-b border-[#1e293b] bg-[#0d131f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <Text size="xs" fw={600} className="text-slate-200 tracking-wide">
            Studio Inspector & Navigator
          </Text>
        </div>
        <Badge size="xs" variant="filled" color="dark" className="bg-[#1e293b] text-slate-300 font-mono">
          80 Templates • 350+ Blocks
        </Badge>
      </div>

      {/* Mantine Tabs Navigation */}
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        className="flex-1 flex flex-col overflow-hidden"
        variant="pills"
      >
        {/* Tab Strip */}
        <div className="px-3 pt-2.5 pb-2 bg-[#0d131f]/60 border-b border-[#1e293b]">
          <Tabs.List grow className="bg-[#121826] p-1 rounded-xl border border-[#1e293b]">
            <Tabs.Tab
              value="templates"
              leftSection={<IconTemplate size={14} />}
              className="text-xs font-semibold data-[active=true]:bg-[#6366f1] data-[active=true]:text-white transition-all"
            >
              Templates (80)
            </Tabs.Tab>

            <Tabs.Tab
              value="compliance"
              leftSection={<IconShieldCheck size={14} />}
              className="text-xs font-semibold data-[active=true]:bg-[#6366f1] data-[active=true]:text-white transition-all"
            >
              Compliance & Legal
            </Tabs.Tab>

            <Tabs.Tab
              value="pages"
              leftSection={<IconFiles size={14} />}
              className="text-xs font-semibold data-[active=true]:bg-[#6366f1] data-[active=true]:text-white transition-all"
            >
              Pages ({pages.length})
            </Tabs.Tab>

            <Tabs.Tab
              value="blocks"
              leftSection={<IconComponents size={14} />}
              className="text-xs font-semibold data-[active=true]:bg-[#6366f1] data-[active=true]:text-white transition-all"
            >
              Blocks (350+)
            </Tabs.Tab>
          </Tabs.List>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: 80 TEMPLATES GALLERY WITH SEARCH & CATEGORY FILTERS    */}
        {/* ------------------------------------------------------------- */}
        <Tabs.Panel value="templates" className="flex-1 flex flex-col overflow-hidden p-3 sm:p-4">
          {/* Search & Filter Bar */}
          <div className="space-y-2 mb-3">
            <TextInput
              placeholder="Search 80 templates by name, industry, tech stack..."
              leftSection={<IconSearch size={14} className="text-slate-400" />}
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.currentTarget.value)}
              size="xs"
              radius="md"
              className="text-xs"
              styles={{
                input: {
                  backgroundColor: '#121826',
                  borderColor: '#1e293b',
                  color: '#f8fafc',
                },
              }}
            />

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All', count: 80 },
                { id: 'tech', label: 'Tech & SaaS', count: 40 },
                { id: 'hosting', label: 'Cloud & Hosting', count: 20 },
                { id: 'retail', label: 'Retail & Luxury', count: 20 },
              ].map((pill) => (
                <UnstyledButton
                  key={pill.id}
                  onClick={() => setSelectedGroup(pill.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-all border ${
                    selectedGroup === pill.id
                      ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-sm font-semibold'
                      : 'bg-[#121826] text-slate-400 border-[#1e293b] hover:text-white hover:border-slate-600'
                  }`}
                >
                  {pill.label} ({pill.count})
                </UnstyledButton>
              ))}
            </div>
          </div>

          {/* Scrollable Templates Grid */}
          <ScrollArea className="flex-1 -mx-2 px-2" scrollbars="y">
            <div className="space-y-3 pb-6">
              {filteredTemplates.map((template) => {
                const isSelected = copiedTemplateId === template.id;
                return (
                  <Card
                    key={template.id}
                    radius="md"
                    className="bg-[#121826] border border-[#1e293b] hover:border-indigo-500/50 transition-all p-3 group relative overflow-hidden"
                  >
                    {/* Top Group & Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge
                        size="xs"
                        variant="light"
                        color={
                          template.group === 'tech'
                            ? 'indigo'
                            : template.group === 'hosting'
                            ? 'cyan'
                            : 'pink'
                        }
                        className="font-medium"
                      >
                        {template.groupLabel}
                      </Badge>

                      <Text size="xs" c="dimmed" className="font-mono text-[11px] truncate">
                        {template.industry}
                      </Text>
                    </div>

                    {/* Template Title & Tagline */}
                    <Text fw={600} size="sm" className="text-white group-hover:text-indigo-300 transition-colors">
                      {template.name}
                    </Text>
                    <Text size="xs" c="dimmed" lineClamp={2} className="mt-1 text-slate-400">
                      {template.tagline || template.description}
                    </Text>

                    {/* Entity Verification Indicator */}
                    {template.corporateRegistration && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-mono bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                        <IconShieldCheck size={13} className="shrink-0" />
                        <span className="truncate">
                          {template.corporateRegistration.entityName} ({template.corporateRegistration.jurisdiction})
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex items-center gap-1 flex-wrap mt-2.5">
                      {template.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-[#1e293b] text-slate-300 border border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-3 pt-2.5 border-t border-[#1e293b] flex items-center justify-between">
                      <Button
                        size="xs"
                        variant="filled"
                        color="indigo"
                        radius="md"
                        leftSection={
                          isSelected ? <IconCheck size={14} /> : <IconSparkles size={14} />
                        }
                        onClick={() => handleApplyTemplate(template)}
                        className={`transition-all text-xs font-semibold ${
                          isSelected
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-[#6366f1] hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isSelected ? 'Applied to Studio!' : 'Select & Load Template'}
                      </Button>

                      <Text size="xs" c="dimmed" className="font-mono text-[10px]">
                        ID: {template.id.replace('template-', '')}
                      </Text>
                    </div>
                  </Card>
                );
              })}

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <IconSearch size={32} className="mx-auto mb-2 opacity-40" />
                  <Text size="sm">No templates match &quot;{templateSearch}&quot;</Text>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="indigo"
                    className="mt-2"
                    onClick={() => {
                      setTemplateSearch('');
                      setSelectedGroup('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </Tabs.Panel>

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: COMPLIANCE & LEGAL ENTITY KYC AUDIT ENGINE             */}
        {/* ------------------------------------------------------------- */}
        <Tabs.Panel value="compliance" className="flex-1 flex flex-col overflow-hidden p-3 sm:p-4">
          <ScrollArea className="flex-1 -mx-2 px-2" scrollbars="y">
            <div className="space-y-4 pb-6">
              {/* Airwallex KYC Audit Card */}
              <Card radius="md" className="bg-[#121826] border border-emerald-500/30 p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ThemeIcon color="emerald" variant="light" size="sm" radius="md">
                      <IconShieldCheck size={14} />
                    </ThemeIcon>
                    <Text size="xs" fw={700} className="text-emerald-400">
                      Airwallex KYC Pre-Flight Engine
                    </Text>
                  </div>
                  <Badge size="xs" color="emerald" variant="filled">
                    100% Ready
                  </Badge>
                </div>
                <Text size="xs" c="dimmed" className="text-slate-300 mb-3">
                  All 5 mandatory statutory fields required for merchant account activation are verified.
                </Text>

                {/* Quick Jurisdiction Autofill Chips */}
                <div className="pt-2 border-t border-[#1e293b]">
                  <Text size="xs" fw={600} className="text-slate-400 mb-1.5">
                    Quick Preset Jurisdictions:
                  </Text>
                  <div className="grid grid-cols-2 gap-1.5">
                    <Button
                      size="xs"
                      variant="outline"
                      color="gray"
                      onClick={() => handleAutofillPreset('singapore')}
                      className="border-[#1e293b] text-slate-300 hover:bg-[#1e293b] hover:text-white text-[11px]"
                    >
                      🇸🇬 Singapore ACRA
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      color="gray"
                      onClick={() => handleAutofillPreset('delaware')}
                      className="border-[#1e293b] text-slate-300 hover:bg-[#1e293b] hover:text-white text-[11px]"
                    >
                      🇺🇸 Delaware Corp
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      color="gray"
                      onClick={() => handleAutofillPreset('difc')}
                      className="border-[#1e293b] text-slate-300 hover:bg-[#1e293b] hover:text-white text-[11px]"
                    >
                      🇦🇪 Dubai DIFC
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      color="gray"
                      onClick={() => handleAutofillPreset('london')}
                      className="border-[#1e293b] text-slate-300 hover:bg-[#1e293b] hover:text-white text-[11px]"
                    >
                      🇬🇧 London Ltd
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Entity Form Fields */}
              <div className="space-y-3">
                <TextInput
                  label="Registered Company Legal Name"
                  description="Exact entity name as filed with company registry"
                  leftSection={<IconBuilding size={14} className="text-slate-400" />}
                  value={business.companyName}
                  onChange={(e) => updateBusiness({ companyName: e.currentTarget.value })}
                  size="xs"
                  radius="md"
                  styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                />

                <div className="grid grid-cols-2 gap-2">
                  <TextInput
                    label="Trading / Brand Name"
                    value={business.shortName}
                    onChange={(e) => updateBusiness({ shortName: e.currentTarget.value })}
                    size="xs"
                    radius="md"
                    styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                  />
                  <TextInput
                    label="CR / Reg Number"
                    value={business.registrationNumber}
                    onChange={(e) => updateBusiness({ registrationNumber: e.currentTarget.value })}
                    size="xs"
                    radius="md"
                    styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                  />
                </div>

                <Textarea
                  label="Registered Principal Physical Address"
                  description="Required on legal footer and Terms of Service"
                  leftSection={<IconMapPin size={14} className="text-slate-400" />}
                  value={business.address}
                  onChange={(e) => updateBusiness({ address: e.currentTarget.value })}
                  rows={2}
                  size="xs"
                  radius="md"
                  styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                />

                <div className="grid grid-cols-2 gap-2">
                  <TextInput
                    label="Corporate Support Email"
                    leftSection={<IconMail size={14} className="text-slate-400" />}
                    value={business.email}
                    onChange={(e) => updateBusiness({ email: e.currentTarget.value })}
                    size="xs"
                    radius="md"
                    styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                  />
                  <TextInput
                    label="Official Phone Number"
                    leftSection={<IconPhone size={14} className="text-slate-400" />}
                    value={business.phone}
                    onChange={(e) => updateBusiness({ phone: e.currentTarget.value })}
                    size="xs"
                    radius="md"
                    styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                  />
                </div>

                <TextInput
                  label="Governing Law & Jurisdiction"
                  description="e.g. Republic of Singapore, State of Delaware, England & Wales"
                  leftSection={<IconScale size={14} className="text-slate-400" />}
                  value={business.governingLaw}
                  onChange={(e) => updateBusiness({ governingLaw: e.currentTarget.value })}
                  size="xs"
                  radius="md"
                  styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Select
                    label="Primary Currency"
                    data={['USD', 'EUR', 'GBP', 'SGD', 'AED']}
                    value={business.currency}
                    onChange={(val) => val && updateBusiness({ currency: val })}
                    size="xs"
                    radius="md"
                    styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                  />
                  <TextInput
                    label="Custom Production Domain"
                    leftSection={<IconWorld size={14} className="text-slate-400" />}
                    value={business.domain}
                    onChange={(e) => updateBusiness({ domain: e.currentTarget.value })}
                    size="xs"
                    radius="md"
                    styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
                  />
                </div>
              </div>

              {/* AI Compliance Audit Trigger */}
              <Button
                fullWidth
                variant="light"
                color="indigo"
                radius="md"
                leftSection={<IconSparkles size={14} />}
                onClick={() => {
                  setAiCopilotInitialAction('audit-compliance');
                  setAiCopilotOpen(true);
                }}
                className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold"
              >
                Run AI Copilot Compliance Audit
              </Button>
            </div>
          </ScrollArea>
        </Tabs.Panel>

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: PAGES & MULTI-PAGE NAVIGATION                          */}
        {/* ------------------------------------------------------------- */}
        <Tabs.Panel value="pages" className="flex-1 flex flex-col overflow-hidden p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <Text size="xs" fw={700} className="text-white">
                Website Routes & Sitemaps
              </Text>
              <Text size="xs" c="dimmed" className="text-[11px] text-slate-400">
                Switch canvas routes or add dedicated pages
              </Text>
            </div>

            <Button
              size="xs"
              variant="filled"
              color="indigo"
              radius="md"
              leftSection={<IconPlus size={13} />}
              onClick={() => setIsAddPageOpen(true)}
              className="bg-[#6366f1] hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Add Page
            </Button>
          </div>

          <ScrollArea className="flex-1 -mx-2 px-2" scrollbars="y">
            <div className="space-y-2.5 pb-6">
              {pages.map((page) => {
                const isActive = activeRoute === page.route;
                return (
                  <Card
                    key={page.id}
                    radius="md"
                    className={`p-3 transition-all border ${
                      isActive
                        ? 'bg-[#121826] border-[#6366f1] shadow-lg shadow-indigo-500/10'
                        : 'bg-[#121826] border-[#1e293b] hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UnstyledButton
                          onClick={() => setActiveRoute(page.route)}
                          className="flex items-center gap-2 text-left"
                        >
                          <ThemeIcon
                            size="sm"
                            radius="md"
                            color={isActive ? 'indigo' : 'dark'}
                            variant={isActive ? 'filled' : 'light'}
                          >
                            <IconFiles size={13} />
                          </ThemeIcon>
                          <div>
                            <Text size="xs" fw={600} className={isActive ? 'text-indigo-300' : 'text-slate-200'}>
                              {page.name}
                            </Text>
                            <Text size="xs" className="font-mono text-[11px] text-slate-400">
                              {page.route}
                            </Text>
                          </div>
                        </UnstyledButton>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Badge
                          size="xs"
                          variant="light"
                          color={isActive ? 'indigo' : 'gray'}
                          className="font-mono"
                        >
                          {isActive ? 'Active Canvas' : 'Ready'}
                        </Badge>

                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          color="indigo"
                          onClick={() => setActiveRoute(page.route)}
                          title="Open Page in Canvas"
                        >
                          <IconEye size={14} />
                        </ActionIcon>

                        {!page.isSystem && (
                          <ActionIcon
                            size="sm"
                            variant="subtle"
                            color="red"
                            onClick={() => handleDeletePage(page.id)}
                            title="Delete Route"
                          >
                            <IconTrash size={13} />
                          </ActionIcon>
                        )}
                      </div>
                    </div>

                    {page.description && (
                      <Text size="xs" c="dimmed" className="mt-2 text-[11px] text-slate-400">
                        {page.description}
                      </Text>
                    )}
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </Tabs.Panel>

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: 350+ UNTITLED UI BLOCKS INSERTER DRAWER                */}
        {/* ------------------------------------------------------------- */}
        <Tabs.Panel value="blocks" className="flex-1 flex flex-col overflow-hidden p-3 sm:p-4">
          {/* Blocks Search & Filter */}
          <div className="space-y-2 mb-3">
            <TextInput
              placeholder="Search 350+ Untitled UI blocks..."
              leftSection={<IconSearch size={14} className="text-slate-400" />}
              value={blockSearch}
              onChange={(e) => setBlockSearch(e.currentTarget.value)}
              size="xs"
              radius="md"
              styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
            />

            {/* Block Category Filter Select */}
            <Select
              data={STUDIO_BLOCK_CATEGORIES.map((c) => ({
                value: c.id,
                label: `${c.label} (${c.count})`,
              }))}
              value={selectedBlockCategory}
              onChange={(val) => val && setSelectedBlockCategory(val)}
              size="xs"
              radius="md"
              styles={{ input: { backgroundColor: '#121826', borderColor: '#1e293b', color: '#f8fafc' } }}
            />
          </div>

          {/* Scrollable Block List */}
          <ScrollArea className="flex-1 -mx-2 px-2" scrollbars="y">
            <div className="space-y-3 pb-6">
              {filteredBlocks.map((block) => {
                const isInserted = insertedBlockId === block.id;
                return (
                  <Card
                    key={block.id}
                    radius="md"
                    className="bg-[#121826] border border-[#1e293b] hover:border-indigo-500/40 transition-all p-3"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Badge size="xs" variant="light" color="indigo">
                        {block.categoryLabel}
                      </Badge>
                      <Text size="xs" c="dimmed" className="font-mono text-[10px]">
                        {block.id}
                      </Text>
                    </div>

                    <Text fw={600} size="xs" className="text-white">
                      {block.name}
                    </Text>
                    <Text size="xs" c="dimmed" className="mt-1 text-slate-400 text-[11px]">
                      {block.description}
                    </Text>

                    {/* Tags */}
                    <div className="flex items-center gap-1 flex-wrap mt-2">
                      {block.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#1e293b] text-slate-300 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Insert Action */}
                    <div className="mt-3 pt-2 border-t border-[#1e293b] flex items-center justify-between">
                      <Button
                        size="xs"
                        variant="filled"
                        color="indigo"
                        radius="md"
                        leftSection={isInserted ? <IconCheck size={13} /> : <IconPlus size={13} />}
                        onClick={() => handleInsertBlock(block)}
                        className={`text-xs font-semibold ${
                          isInserted
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-[#6366f1] hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isInserted ? 'Inserted into Canvas!' : `Insert on ${activeRoute}`}
                      </Button>

                      <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="gray"
                        onClick={() => {
                          navigator.clipboard.writeText(`<${block.id} />`);
                          addLog(`Copied component code: <${block.id} />`, 'info');
                        }}
                        title="Copy JSX Component Tag"
                      >
                        <IconCopy size={13} />
                      </ActionIcon>
                    </div>
                  </Card>
                );
              })}

              {filteredBlocks.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <IconSearch size={32} className="mx-auto mb-2 opacity-40" />
                  <Text size="sm">No blocks found matching &quot;{blockSearch}&quot;</Text>
                </div>
              )}
            </div>
          </ScrollArea>
        </Tabs.Panel>
      </Tabs>

      {/* Modal for Adding New Page */}
      <Modal
        opened={isAddPageOpen}
        onClose={() => setIsAddPageOpen(false)}
        title={
          <Text fw={700} size="sm" className="text-white">
            Add New Studio Page / Route
          </Text>
        }
        radius="md"
        centered
        styles={{
          content: { backgroundColor: '#121826', border: '1px solid #1e293b', color: '#f8fafc' },
          header: { backgroundColor: '#121826', borderBottom: '1px solid #1e293b' },
        }}
      >
        <div className="space-y-3 pt-2">
          <TextInput
            label="Page Name"
            placeholder="e.g. Enterprise Security SLA"
            value={newPageName}
            onChange={(e) => {
              setNewPageName(e.currentTarget.value);
              if (!newPageSlug) {
                setNewPageSlug(
                  '/' +
                    e.currentTarget.value
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '')
                );
              }
            }}
            required
            size="xs"
            radius="md"
            styles={{ input: { backgroundColor: '#090d16', borderColor: '#1e293b', color: '#f8fafc' } }}
          />

          <TextInput
            label="Route Path / Slug"
            placeholder="/security"
            value={newPageSlug}
            onChange={(e) => setNewPageSlug(e.currentTarget.value)}
            required
            size="xs"
            radius="md"
            styles={{ input: { backgroundColor: '#090d16', borderColor: '#1e293b', color: '#f8fafc' } }}
          />

          <Textarea
            label="Meta Description (Optional)"
            placeholder="Search engine summary & route purpose..."
            value={newPageDesc}
            onChange={(e) => setNewPageDesc(e.currentTarget.value)}
            rows={2}
            size="xs"
            radius="md"
            styles={{ input: { backgroundColor: '#090d16', borderColor: '#1e293b', color: '#f8fafc' } }}
          />

          <Group justify="flex-end" className="mt-4">
            <Button
              size="xs"
              variant="subtle"
              color="gray"
              onClick={() => setIsAddPageOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="xs"
              variant="filled"
              color="indigo"
              onClick={handleAddPage}
              className="bg-[#6366f1] hover:bg-indigo-500 text-white font-semibold"
            >
              Create & Open Page
            </Button>
          </Group>
        </div>
      </Modal>
    </aside>
  );
}
