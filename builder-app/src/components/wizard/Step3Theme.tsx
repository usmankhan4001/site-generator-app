"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { THEMES_LIST, THEMES } from "@/data/themes";
import { ARCHETYPES } from "@/data/archetypes";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Palette,
  Sun,
  Moon,
  Check,
  Type,
  Sparkles,
  Layers,
  Star,
} from "lucide-react";

export const Step3Theme: React.FC = () => {
  const { selectedThemeId, selectTheme, selectedArchetypeId } = useWizardStore();
  const [filterMode, setFilterMode] = useState<string>("all");

  const currentArchetype = ARCHETYPES[selectedArchetypeId];
  const suggestedThemeIds = currentArchetype ? (currentArchetype.suggestedThemes || currentArchetype.recommendedThemes || []) : [];

  const filteredThemes = THEMES_LIST.filter((theme) => {
    if (filterMode === "light") return !theme.isDark;
    if (filterMode === "dark") return theme.isDark;
    return true;
  });

  const activeTheme = THEMES[selectedThemeId] || THEMES["indigo-enterprise"];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Step Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="dot-pill">
            <span className="dot-indicator" />
            Untitled UI Design System
          </span>
          <Badge variant="subtle">20 Curated OKLCH Palettes</Badge>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Visual Identity, Typography & Theme Palette
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          Select an Untitled UI theme palette. Every theme features OKLCH color science for
          flawless contrast ratios, bespoke font pairings, and responsive hairline borders.
        </p>
      </div>

      {/* Suggested Themes Banner for Current Archetype */}
      {suggestedThemeIds.length > 0 && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Recommended for {currentArchetype?.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                Specially calibrated for this industry's typography and color expectations.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {suggestedThemeIds.map((sugId) => {
              const sug = THEMES[sugId];
              if (!sug) return null;
              const isSelected = selectedThemeId === sug.id;
              return (
                <button
                  key={sug.id}
                  type="button"
                  onClick={() => selectTheme(sug.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
                      : "bg-background border-border text-foreground hover:bg-accent"
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: sug.previewAccent }}
                  />
                  {sug.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Theme Filters & Active Preview Header */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <Tabs value={filterMode} onValueChange={setFilterMode} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 w-full sm:w-[320px]">
            <TabsTrigger value="all">All (20)</TabsTrigger>
            <TabsTrigger value="light" className="gap-1.5">
              <Sun className="h-3.5 w-3.5" /> Light (12)
            </TabsTrigger>
            <TabsTrigger value="dark" className="gap-1.5">
              <Moon className="h-3.5 w-3.5" /> Dark (8)
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Palette className="h-4 w-4 text-primary" /> Active Palette:{" "}
          <strong className="text-foreground">{activeTheme.name}</strong>
        </div>
      </div>

      {/* Theme Swatches 20-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredThemes.map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          const isSuggested = suggestedThemeIds.includes(theme.id);

          return (
            <div
              key={theme.id}
              onClick={() => selectTheme(theme.id)}
              className={`group relative rounded-2xl border p-4 transition-all flex flex-col justify-between cursor-pointer card-hover-lift ${
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary shadow-md"
                  : "border-border bg-card hover:border-primary/40 shadow-xs"
              }`}
            >
              {/* Selected Checkmark */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md animate-in zoom-in-75">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
              )}

              {/* Suggested Star Badge */}
              {isSuggested && !isSelected && (
                <div className="absolute top-2.5 right-2.5">
                  <Badge variant="subtle" className="text-[10px] px-1.5 py-0 h-4 gap-1">
                    <Star className="h-2.5 w-2.5 fill-primary text-primary" /> Rec
                  </Badge>
                </div>
              )}

              <div className="space-y-3">
                {/* Theme Palette Bar Preview */}
                <div
                  className="h-20 rounded-xl p-3 flex flex-col justify-between border border-black/5 dark:border-white/10 relative overflow-hidden transition-transform group-hover:scale-[1.01]"
                  style={{ backgroundColor: theme.previewBg }}
                >
                  {/* Decorative Mini-Card inside swatch */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs"
                      style={{
                        backgroundColor: theme.previewBg,
                        color: theme.previewText,
                        borderColor: theme.previewAccent + "40",
                      }}
                    >
                      {theme.isDark ? "Dark UI" : "Light UI"}
                    </span>
                    <span
                      className="h-3.5 w-3.5 rounded-full shadow-xs"
                      style={{ backgroundColor: theme.previewAccent }}
                    />
                  </div>

                  <div className="flex items-end justify-between">
                    <span
                      className="text-xs font-black tracking-tight"
                      style={{ color: theme.previewText }}
                    >
                      Aa
                    </span>
                    <div
                      className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-xs"
                      style={{ backgroundColor: theme.previewAccent }}
                    >
                      Button
                    </div>
                  </div>
                </div>

                {/* Theme Name & Industry */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-foreground">{theme.name}</h4>
                    {theme.isDark ? (
                      <Moon className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <Sun className="h-3.5 w-3.5 text-amber-500" />
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {theme.industry}
                  </p>
                </div>

                {/* Font Pairing Pill */}
                <div className="pt-2 border-t border-border/60 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Type className="h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{theme.fontPairingLabel}</span>
                </div>
              </div>

              {/* Theme Bottom Tokens Summary */}
              <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Radius: {theme.borderRadius}</span>
                <span className="capitalize">{theme.badgeStyle}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Theme Live Specimen Box */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div className="space-y-0.5">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" /> Live Specimen: {activeTheme.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Font Hierarchy: {activeTheme.fontPairingLabel} • Style: {activeTheme.isDark ? "Obsidian Dark" : "Clean Light"}
            </p>
          </div>
          <Badge variant={activeTheme.isDark ? "default" : "secondary"}>
            {activeTheme.isDark ? "Dark Mode Theme" : "Light Mode Theme"}
          </Badge>
        </div>

        {/* Live Rendering Container */}
        <div
          className="p-6 rounded-xl border border-border transition-colors space-y-4"
          style={{
            backgroundColor: activeTheme.previewBg,
            color: activeTheme.previewText,
          }}
        >
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <span
              className="dot-pill"
              style={{
                borderRadius: activeTheme.borderRadius,
                borderColor: activeTheme.previewAccent + "30",
              }}
            >
              <span
                className="dot-indicator"
                style={{ backgroundColor: activeTheme.previewAccent }}
              />
              Enterprise SLA 99.99% Guaranteed
            </span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full border"
              style={{
                borderColor: activeTheme.previewAccent + "40",
              }}
            >
              Untitled UI Standard
            </span>
          </div>

          <div className="space-y-1">
            <h2
              className="text-xl sm:text-2xl font-black tracking-tight"
              style={{ fontFamily: activeTheme.fontDisplay }}
            >
              Engineered for High-Velocity Modern Business
            </h2>
            <p className="text-xs sm:text-sm opacity-80 max-w-xl leading-relaxed">
              Bespoke typography and hairline borders designed to elevate your company's
              commercial credibility and increase checkout conversions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 text-xs font-bold rounded-lg text-white shadow-md transition-transform active:scale-95"
              style={{
                backgroundColor: activeTheme.previewAccent,
                borderRadius: activeTheme.borderRadius,
              }}
            >
              Primary Action CTA
            </button>
            <button
              type="button"
              className="px-4 py-2.5 text-xs font-semibold rounded-lg border transition-colors hover:opacity-80"
              style={{
                borderColor: activeTheme.previewText + "30",
                color: activeTheme.previewText,
                borderRadius: activeTheme.borderRadius,
              }}
            >
              Explore Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
