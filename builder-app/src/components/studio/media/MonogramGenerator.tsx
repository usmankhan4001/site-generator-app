'use client';

import React, { useState, useId, useMemo } from 'react';
import { Check, Copy, Download, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStudio } from '@/store/studio';

export type MonogramStyle =
  | 'geometric-hex'
  | 'minimalist-circle'
  | 'abstract-fold'
  | 'split-monogram'
  | 'gradient-badge'
  | 'elegant-serif';

interface MonogramGeneratorProps {
  initials?: string;
  onSelect?: (svgDataUri: string) => void;
  className?: string;
}

const PRESET_PALETTES = [
  { name: 'Indigo / Cyan', primary: '#2563eb', secondary: '#06b6d4' },
  { name: 'Violet / Fuchsia', primary: '#7c3aed', secondary: '#d946ef' },
  { name: 'Emerald / Mint', primary: '#059669', secondary: '#34d399' },
  { name: 'Rose / Amber', primary: '#e11d48', secondary: '#f59e0b' },
  { name: 'Carbon / Slate', primary: '#0f172a', secondary: '#64748b' },
  { name: 'Gold / Champagne', primary: '#b45309', secondary: '#fcd34d' },
];

export function generateMonogramSvg({
  initials,
  style,
  primaryColor,
  secondaryColor,
  radius = 24,
  strokeWidth = 2,
  id = 'mg',
}: {
  initials: string;
  style: MonogramStyle;
  primaryColor: string;
  secondaryColor: string;
  radius?: number;
  strokeWidth?: number;
  id?: string;
}): string {
  const text = (initials || 'A').toUpperCase().slice(0, 3);
  const gradId = `monoGrad_${id}`;
  const clipId = `monoClip_${id}`;

  switch (style) {
    case 'geometric-hex': {
      return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradId}" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="${secondaryColor}"/>
    </linearGradient>
  </defs>
  <polygon points="100,16 174,58 174,142 100,184 26,142 26,58" fill="url(#${gradId})" fill-opacity="0.12" stroke="url(#${gradId})" stroke-width="${strokeWidth * 1.5}"/>
  <polygon points="100,28 162,64 162,136 100,172 38,136 38,64" stroke="${primaryColor}" stroke-width="${strokeWidth * 0.8}" stroke-dasharray="4 4" stroke-opacity="0.5"/>
  <text x="100" y="112" text-anchor="middle" dominant-baseline="central" font-family="system-ui, -apple-system, 'SF Pro Display', sans-serif" font-weight="900" font-size="${text.length > 2 ? 46 : 56}" letter-spacing="1" fill="${primaryColor}">${text}</text>
</svg>`;
    }

    case 'minimalist-circle': {
      return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="${secondaryColor}"/>
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="82" stroke="${primaryColor}" stroke-width="${strokeWidth * 1.2}"/>
  <circle cx="100" cy="100" r="72" stroke="${secondaryColor}" stroke-width="${strokeWidth * 0.8}" stroke-dasharray="6 4" stroke-opacity="0.6"/>
  <circle cx="100" cy="28" r="4.5" fill="${secondaryColor}"/>
  <text x="100" y="108" text-anchor="middle" dominant-baseline="central" font-family="'Inter', system-ui, sans-serif" font-weight="800" font-size="${text.length > 2 ? 44 : 54}" letter-spacing="2" fill="url(#${gradId})">${text}</text>
</svg>`;
    }

    case 'abstract-fold': {
      return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradId}1" x1="40" y1="40" x2="160" y2="100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="${secondaryColor}"/>
    </linearGradient>
    <linearGradient id="${gradId}2" x1="160" y1="100" x2="100" y2="160" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${secondaryColor}"/>
      <stop offset="100%" stop-color="${primaryColor}"/>
    </linearGradient>
  </defs>
  <path d="M40 50 L100 20 L160 50 L160 110 L100 80 Z" fill="url(#${gradId}1)" fill-opacity="0.9"/>
  <path d="M160 110 L100 80 L40 110 L40 150 L100 180 L160 150 Z" fill="url(#${gradId}2)" fill-opacity="0.85"/>
  <text x="100" y="104" text-anchor="middle" dominant-baseline="central" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="${text.length > 2 ? 42 : 52}" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${text}</text>
</svg>`;
    }

    case 'split-monogram': {
      return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="${clipId}">
      <rect x="20" y="20" width="160" height="160" rx="${radius}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#${clipId})">
    <rect x="20" y="20" width="160" height="80" fill="${primaryColor}"/>
    <rect x="20" y="100" width="160" height="80" fill="${secondaryColor}"/>
    <line x1="20" y1="100" x2="180" y2="100" stroke="#FFFFFF" stroke-width="2"/>
    <text x="100" y="108" text-anchor="middle" dominant-baseline="central" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="${text.length > 2 ? 50 : 64}" fill="#FFFFFF">${text}</text>
  </g>
  <rect x="20" y="20" width="160" height="160" rx="${radius}" stroke="${primaryColor}" stroke-width="${strokeWidth}" fill="none"/>
</svg>`;
    }

    case 'gradient-badge': {
      return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradId}" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="${secondaryColor}"/>
    </linearGradient>
    <filter id="shadow_${id}" x="0" y="10" width="200" height="190" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${primaryColor}" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect x="24" y="24" width="152" height="152" rx="${radius * 1.5}" fill="url(#${gradId})" filter="url(#shadow_${id})"/>
  <rect x="28" y="28" width="144" height="144" rx="${radius * 1.4}" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.35"/>
  <text x="100" y="108" text-anchor="middle" dominant-baseline="central" font-family="system-ui, -apple-system, 'SF Pro Display', sans-serif" font-weight="900" font-size="${text.length > 2 ? 46 : 58}" fill="#FFFFFF">${text}</text>
</svg>`;
    }

    case 'elegant-serif': {
      return `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradId}" x1="30" y1="30" x2="170" y2="170" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="${secondaryColor}"/>
    </linearGradient>
  </defs>
  <rect x="30" y="30" width="140" height="140" stroke="url(#${gradId})" stroke-width="${strokeWidth * 1.2}"/>
  <rect x="38" y="38" width="124" height="124" stroke="${primaryColor}" stroke-width="${strokeWidth * 0.6}" stroke-opacity="0.4"/>
  <polygon points="100,20 180,100 100,180 20,100" stroke="${secondaryColor}" stroke-width="1" stroke-opacity="0.25" fill="none"/>
  <text x="100" y="112" text-anchor="middle" dominant-baseline="central" font-family="'Times New Roman', 'Baskerville', 'Playfair Display', serif" font-weight="700" font-size="${text.length > 2 ? 46 : 58}" font-style="italic" fill="url(#${gradId})">${text}</text>
</svg>`;
    }
  }
}

export function MonogramGenerator({
  initials: propInitials,
  onSelect,
  className = '',
}: MonogramGeneratorProps) {
  const content = useStudio((s) => s.content);
  const mutate = useStudio((s) => s.mutate);
  const uid = useId().replace(/:/g, '');

  const defaultLetters = useMemo(() => {
    if (propInitials) return propInitials;
    if (content?.brand?.logoText) {
      const words = content.brand.logoText.trim().split(/\s+/);
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return words[0].slice(0, 2).toUpperCase();
    }
    if (content?.business?.name) {
      const words = content.business.name.trim().split(/\s+/);
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return words[0].slice(0, 2).toUpperCase();
    }
    return 'AW';
  }, [propInitials, content]);

  const [letters, setLetters] = useState(defaultLetters);
  const [style, setStyle] = useState<MonogramStyle>('gradient-badge');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [secondaryColor, setSecondaryColor] = useState('#06b6d4');
  const [radius, setRadius] = useState(24);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const STYLES: { id: MonogramStyle; label: string; desc: string }[] = [
    { id: 'gradient-badge', label: 'Gradient Badge', desc: 'Vibrant squircle with radial gradient' },
    { id: 'geometric-hex', label: 'Geometric Hex', desc: 'Sharp isometric tech polygon' },
    { id: 'minimalist-circle', label: 'Minimalist Circle', desc: 'Concentric precision hairline rings' },
    { id: 'abstract-fold', label: 'Abstract Fold', desc: 'Layered dimensional ribbon fold' },
    { id: 'split-monogram', label: 'Split Cut', desc: 'Dual-tone horizontal contrast split' },
    { id: 'elegant-serif', label: 'Elegant Serif', desc: 'Luxury editorial serif mark' },
  ];

  const svgString = useMemo(() => {
    return generateMonogramSvg({
      initials: letters,
      style,
      primaryColor,
      secondaryColor,
      radius,
      strokeWidth,
      id: uid,
    });
  }, [letters, style, primaryColor, secondaryColor, radius, strokeWidth, uid]);

  const dataUri = useMemo(() => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
  }, [svgString]);

  const handleApply = () => {
    if (onSelect) {
      onSelect(dataUri);
    }
    if (mutate) {
      mutate((d) => {
        if (!d.brand) {
          d.brand = { logoText: letters };
        }
        d.brand.logoUrl = dataUri;
        if (d.business) {
          // Keep business logo in sync
          (d.business as unknown as Record<string, unknown>).logo = dataUri;
        }
      });
    }
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  const handleCopyUri = async () => {
    try {
      await navigator.clipboard.writeText(dataUri);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brand-monogram-${letters.toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`}>
      {/* Left Column: Generator Controls */}
      <div className="lg:col-span-7 space-y-5">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Monogram Initials
          </Label>
          <div className="mt-1.5 flex gap-2">
            <Input
              value={letters}
              onChange={(e) => setLetters(e.target.value.toUpperCase().slice(0, 3))}
              placeholder="e.g. AW"
              maxLength={3}
              className="font-mono text-base font-bold uppercase tracking-widest max-w-[120px]"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const samples = ['AW', 'NX', 'FX', 'VL', 'AI', 'QC', 'ST'];
                const next = samples[(samples.indexOf(letters) + 1) % samples.length];
                setLetters(next);
              }}
              className="text-xs text-muted-foreground gap-1.5"
            >
              <RefreshCw className="size-3.5" />
              Randomize
            </Button>
          </div>
        </div>

        {/* Style Selector */}
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Monogram Style
          </Label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {STYLES.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStyle(st.id)}
                className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all ${
                  style === st.id
                    ? 'border-primary bg-primary/10 ring-1 ring-primary'
                    : 'border-border bg-card hover:border-muted-foreground/30'
                }`}
              >
                <span className="text-xs font-semibold text-foreground">{st.label}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                  {st.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette Presets */}
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Theme Palettes
          </Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESET_PALETTES.map((p) => {
              const active = primaryColor === p.primary && secondaryColor === p.secondary;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setPrimaryColor(p.primary);
                    setSecondaryColor(p.secondary);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-all ${
                    active ? 'border-primary bg-primary/10 font-semibold' : 'border-border bg-card hover:bg-muted'
                  }`}
                >
                  <div className="flex -space-x-1">
                    <span
                      className="size-3 rounded-full border border-background shadow-xs"
                      style={{ backgroundColor: p.primary }}
                    />
                    <span
                      className="size-3 rounded-full border border-background shadow-xs"
                      style={{ backgroundColor: p.secondary }}
                    />
                  </div>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[11px] text-muted-foreground">Primary Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="size-8 rounded border border-border cursor-pointer bg-transparent"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground">Accent Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="size-8 rounded border border-border cursor-pointer bg-transparent"
                />
                <Input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Geometry sliders */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <div className="flex justify-between">
              <Label className="text-[11px] text-muted-foreground">Border Radius</Label>
              <span className="text-[11px] font-mono text-muted-foreground">{radius}px</span>
            </div>
            <input
              type="range"
              min={4}
              max={50}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full mt-1 accent-primary"
            />
          </div>
          <div>
            <div className="flex justify-between">
              <Label className="text-[11px] text-muted-foreground">Stroke Weight</Label>
              <span className="text-[11px] font-mono text-muted-foreground">{strokeWidth}px</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={0.5}
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-full mt-1 accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Right Column: Live Interactive Preview */}
      <div className="lg:col-span-5 flex flex-col items-center justify-between p-6 rounded-xl border border-border bg-muted/30">
        <div className="w-full text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Vector Preview
          </span>
        </div>

        {/* Scalable Preview Box */}
        <div className="my-6 relative flex items-center justify-center size-48 p-4 rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svgString }}
          />
        </div>

        {/* Actions */}
        <div className="w-full space-y-2">
          <Button
            type="button"
            onClick={handleApply}
            className="w-full gap-2 shadow-xs"
          >
            {applied ? <Check className="size-4" /> : <Sparkles className="size-4" />}
            {applied ? 'Applied to Brand!' : '1-Click Apply as Brand Logo'}
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyUri}
              className="gap-1.5 text-xs"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? 'Copied' : 'Copy SVG'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-1.5 text-xs"
            >
              <Download className="size-3.5" />
              Download .svg
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
