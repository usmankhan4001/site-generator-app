"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { ARCHETYPES_LIST, ARCHETYPES } from "@/data/archetypes";
import { ArchetypeData } from "@/types/builder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CloudCog,
  BrainCircuit,
  CreditCard,
  Rocket,
  ShieldCheck,
  Smartphone,
  BarChart3,
  Layers,
  Cpu,
  Sparkles,
  Headphones,
  Leaf,
  Armchair,
  Flame,
  Coffee,
  Recycle,
  Monitor,
  Briefcase,
  Server,
  Globe2,
  Check,
  Search,
  ArrowRight,
  ExternalLink,
  DollarSign,
  TrendingUp,
} from "lucide-react";

// Icon mapping helper
const ICON_MAP: Record<string, React.ReactNode> = {
  CloudCog: <CloudCog className="h-5 w-5" />,
  BrainCircuit: <BrainCircuit className="h-5 w-5" />,
  CreditCard: <CreditCard className="h-5 w-5" />,
  Rocket: <Rocket className="h-5 w-5" />,
  ShieldCheck: <ShieldCheck className="h-5 w-5" />,
  Smartphone: <Smartphone className="h-5 w-5" />,
  BarChart3: <BarChart3 className="h-5 w-5" />,
  Layers: <Layers className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Headphones: <Headphones className="h-5 w-5" />,
  Leaf: <Leaf className="h-5 w-5" />,
  Armchair: <Armchair className="h-5 w-5" />,
  Flame: <Flame className="h-5 w-5" />,
  Coffee: <Coffee className="h-5 w-5" />,
  Recycle: <Recycle className="h-5 w-5" />,
  Monitor: <Monitor className="h-5 w-5" />,
  Briefcase: <Briefcase className="h-5 w-5" />,
  Server: <Server className="h-5 w-5" />,
  Globe2: <Globe2 className="h-5 w-5" />,
};

export const Step2Archetype: React.FC = () => {
  const { selectedArchetypeId, selectArchetype } = useWizardStore();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [previewArchetype, setPreviewArchetype] = useState<ArchetypeData | null>(null);

  // Filter archetypes based on category tab & search query
  const filteredArchetypes = ARCHETYPES_LIST.filter((arch) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "tech" && arch.category === "tech") ||
      (activeTab === "retail" && (arch.category === "retail" || arch.category === "ecommerce")) ||
      (activeTab === "hosting" && arch.category === "hosting");

    const matchesSearch =
      searchQuery.trim() === "" ||
      arch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      arch.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      arch.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      arch.offerings.some((o) => o.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const selectedArch = ARCHETYPES[selectedArchetypeId];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Step Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="dot-pill">
            <span className="dot-indicator" />
            20 Bespoke Archetypes
          </span>
          <Badge variant="subtle">9 Tech • 9 Retail • 2 Hosting</Badge>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Select Business Archetype & Value Proposition
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          Choose from 20 highly engineered business archetypes. Each blueprint includes
          watermark-free CDN media, tailored hero value props, bento grid features, and
          pre-configured commercial pricing tiers.
        </p>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-4 w-full sm:w-[480px]">
            <TabsTrigger value="all">All (20)</TabsTrigger>
            <TabsTrigger value="tech">Tech (9)</TabsTrigger>
            <TabsTrigger value="retail">Retail (9)</TabsTrigger>
            <TabsTrigger value="hosting">Hosting (2)</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search archetypes, offerings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
      </div>

      {/* Archetype Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArchetypes.map((arch) => {
          const isSelected = selectedArchetypeId === arch.id;
          const minPrice = Math.min(...arch.offerings.map((o) => o.price));
          const maxPrice = Math.max(...arch.offerings.map((o) => o.price));
          const isHosting = arch.category === "hosting";

          return (
            <div
              key={arch.id}
              onClick={() => selectArchetype(arch.id)}
              className={`relative rounded-2xl border p-5 transition-all flex flex-col justify-between cursor-pointer card-hover-lift ${
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary shadow-md"
                  : "border-border bg-card hover:border-primary/40 hover:bg-card/80 shadow-xs"
              }`}
            >
              {/* Selected Floating Checkmark Badge */}
              {isSelected && (
                <div className="absolute -top-2.5 -right-2.5 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md animate-in zoom-in-75">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
              )}

              <div className="space-y-4">
                {/* Top Row: Icon + Category Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {(arch.icon && ICON_MAP[arch.icon]) || <Rocket className="h-5 w-5" />}
                  </div>
                  <Badge
                    variant={
                      arch.category === "tech"
                        ? "secondary"
                        : arch.category === "retail" || arch.category === "ecommerce"
                        ? "pill"
                        : "outline"
                    }
                    className="capitalize text-xs font-medium"
                  >
                    {arch.category}
                  </Badge>
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-foreground leading-snug">
                    {arch.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {arch.tagline}
                  </p>
                </div>

                {/* Rich Trust Badges Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {arch.hero.trustBadges.slice(0, 2).map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/60"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Bento Features Preview Pills */}
                <div className="space-y-1.5 pt-2 border-t border-border/50">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                    Core Modules:
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {arch.bentoFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-center p-1 rounded bg-background/80 border border-border/40 text-foreground font-medium truncate"
                        title={feat.title}
                      >
                        {feat.badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Pricing Summary & Preview Button */}
              <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                    Offerings Range
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    ${minPrice} - ${maxPrice}
                    <span className="text-xs font-normal text-muted-foreground">
                      {isHosting ? "/mo" : ""}
                    </span>
                  </span>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs gap-1 h-8 text-primary hover:text-primary hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewArchetype(arch);
                  }}
                >
                  Inspect <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Inspection Modal */}
      {previewArchetype && (
        <Dialog open={Boolean(previewArchetype)} onOpenChange={(open) => !open && setPreviewArchetype(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="subtle" className="capitalize">
                  {previewArchetype.category} Blueprint
                </Badge>
                <span className="text-xs text-muted-foreground">{previewArchetype.industry}</span>
              </div>
              <DialogTitle className="text-xl font-bold">{previewArchetype.name}</DialogTitle>
              <DialogDescription className="text-sm">
                {previewArchetype.hero.subtitle}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 pt-2">
              {/* Hero Preview Box */}
              <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Hero Section Copy
                  </span>
                  <Badge variant="pill">{previewArchetype.hero.badge}</Badge>
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-foreground">
                    {previewArchetype.hero.headline}{" "}
                    <span className="text-primary">{previewArchetype.hero.accentText}</span>
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {previewArchetype.hero.subtitle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {previewArchetype.hero.trustBadges.map((b, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-background border text-foreground font-medium">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Offerings & Pricing Packages */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" /> Pre-Configured Commercial Packages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {previewArchetype.offerings.map((offering) => (
                    <div
                      key={offering.id}
                      className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                        offering.popular
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="space-y-2">
                        {offering.popular && (
                          <Badge variant="default" className="text-[10px] py-0 px-2 h-4 w-fit">
                            Most Popular
                          </Badge>
                        )}
                        <h5 className="font-bold text-xs text-foreground">{offering.name}</h5>
                        <div className="text-lg font-black text-foreground">
                          ${offering.price}
                          <span className="text-xs font-normal text-muted-foreground">
                            {previewArchetype.category === "hosting" ? "/mo" : ""}
                          </span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-muted-foreground">
                          {offering.features.slice(0, 3).map((f, fi) => (
                            <li key={fi} className="flex items-start gap-1.5">
                              <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bento Feature Grid Summary */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" /> Included Bento Grid Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {previewArchetype.bentoFeatures.map((bento, bi) => (
                    <div key={bi} className="p-3 rounded-lg border border-border bg-muted/20 space-y-1">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {bento.badge}
                      </span>
                      <h6 className="font-semibold text-xs text-foreground">{bento.title}</h6>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {bento.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Action */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setPreviewArchetype(null)}
                >
                  Close Preview
                </Button>
                <Button
                  onClick={() => {
                    selectArchetype(previewArchetype.id);
                    setPreviewArchetype(null);
                  }}
                  className="gap-1.5"
                >
                  Select This Archetype <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
