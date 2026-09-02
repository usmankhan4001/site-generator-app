'use client';

import React from 'react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export type LogomarkCategory =
  | 'abstract-cubes'
  | 'neural-crests'
  | 'shield-matrices'
  | 'minimalist-monograms'
  | 'data-rings';

export type LogomarkId =
  | 'isometric-cube'
  | 'hexagon-prism'
  | 'hyper-cube'
  | 'stacked-layers'
  | 'neural-crest'
  | 'quantum-wave'
  | 'synapse-cluster'
  | 'helix-spire'
  | 'shield-matrix'
  | 'vault-badge'
  | 'cyber-bastion'
  | 'sentinel-node'
  | 'monogram-apex'
  | 'monogram-nexus'
  | 'infinity-loop'
  | 'vortex-knot'
  | 'data-ring'
  | 'orbital-pulse'
  | 'radial-radar'
  | 'solaris-rays';

export type PartnerLogoId =
  | 'stripe'
  | 'shopify'
  | 'aws'
  | 'vercel'
  | 'supabase'
  | 'brex'
  | 'ramp'
  | 'carta'
  | 'plaid'
  | 'deel'
  | 'mercury'
  | 'linear'
  | 'figma'
  | 'github'
  | 'snowflake'
  | 'datadog';

export interface LogomarkMeta {
  id: LogomarkId;
  name: string;
  category: LogomarkCategory;
  description: string;
  suggestedIndustries: string[];
  tags: string[];
}

export interface PartnerLogoMeta {
  id: PartnerLogoId;
  name: string;
  category: string;
  description: string;
}

// ==========================================
// 1. ABSTRACT CUBES & ISOMETRIC BLOCKS
// ==========================================

/**
 * 1. Isometric Cube: Multi-faceted 3D block with isometric axes
 */
export function IsometricCubeLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M16 3L28 10V22L16 29L4 22V10L16 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16 3L28 10L16 17L4 10L16 3Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M4 10L16 17V29L4 22V10Z" fill="currentColor" fillOpacity="0.65" />
      <path d="M28 10L16 17V29L28 22V10Z" fill="currentColor" fillOpacity="0.4" />
      <path
        d="M16 17V9M16 17L9 21M16 17L23 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
    </svg>
  );
}

/**
 * 2. Hexagon Prism: 6-faceted crystal prism with radial shading
 */
export function HexagonPrismLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <polygon
        points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon points="16,16 16,3 27,9.5" fill="currentColor" fillOpacity="0.95" />
      <polygon points="16,16 27,9.5 27,22.5" fill="currentColor" fillOpacity="0.75" />
      <polygon points="16,16 27,22.5 16,29" fill="currentColor" fillOpacity="0.55" />
      <polygon points="16,16 16,29 5,22.5" fill="currentColor" fillOpacity="0.4" />
      <polygon points="16,16 5,22.5 5,9.5" fill="currentColor" fillOpacity="0.6" />
      <polygon points="16,16 5,9.5 16,3" fill="currentColor" fillOpacity="0.8" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" fillOpacity="0.9" />
    </svg>
  );
}

/**
 * 3. HyperCube Tesseract: 4D hypercube projection
 */
export function HyperCubeLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M16 2.5L28.5 9.5V22.5L16 29.5L3.5 22.5V9.5L16 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.5L22.5 13.25V20.25L16 24L9.5 20.25V13.25L16 9.5Z"
        fill="currentColor"
        fillOpacity="0.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="16" y1="2.5" x2="16" y2="9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28.5" y1="9.5" x2="22.5" y2="13.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28.5" y1="22.5" x2="22.5" y2="20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="29.5" x2="16" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.5" y1="22.5" x2="9.5" y2="20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.5" y1="9.5" x2="9.5" y2="13.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4. Stacked Layers: Offset floating isometric tiered plates
 */
export function StackedLayersLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M16 3L27 9L16 15L5 9L16 3Z"
        fill="currentColor"
        fillOpacity="0.95"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M5 14L16 20L27 14L27 16L16 22L5 16V14Z" fill="currentColor" fillOpacity="0.7" />
      <path d="M5 14L16 20L27 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 21L16 27L27 21L27 23L16 29L5 23V21Z" fill="currentColor" fillOpacity="0.45" />
      <path d="M5 21L16 27L27 21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// ==========================================
// 2. NEURAL CRESTS & AI GEOMETRY
// ==========================================

/**
 * 5. Neural Crest: Interweaving neural ribbon arcs with synaptic nodes
 */
export function NeuralCrestLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M6 26C6 14 16 6 26 6C26 14 18 20 10 26H6Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M26 26C26 14 16 6 6 6C6 14 14 20 22 26H26Z" fill="currentColor" fillOpacity="0.55" />
      <circle cx="16" cy="11" r="2.5" fill="currentColor" />
      <circle cx="10" cy="19" r="2" fill="currentColor" fillOpacity="0.75" />
      <circle cx="22" cy="19" r="2" fill="currentColor" fillOpacity="0.75" />
    </svg>
  );
}

/**
 * 6. Quantum Wave: Resonant harmonic sine wave crests
 */
export function QuantumWaveLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M4 22C8 22 9 10 16 10C23 10 24 22 28 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M4 16C8 16 10 6 16 6C22 6 24 16 28 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M4 27C9 27 11 17 16 17C21 17 23 27 28 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.35" />
      <circle cx="16" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}

/**
 * 7. Synapse Cluster: Interconnected neural lattice and active core
 */
export function SynapseClusterLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <line x1="16" y1="16" x2="16" y2="5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="16" y1="16" x2="25.5" y2="10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="16" y1="16" x2="25.5" y2="21.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="16" y1="16" x2="16" y2="27" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="16" y1="16" x2="6.5" y2="21.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="16" y1="16" x2="6.5" y2="10.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="16" y1="5" x2="25.5" y2="10.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="25.5" y1="10.5" x2="25.5" y2="21.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="25.5" y1="21.5" x2="16" y2="27" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="16" y1="27" x2="6.5" y2="21.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="6.5" y1="21.5" x2="6.5" y2="10.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="6.5" y1="10.5" x2="16" y2="5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="16" cy="16" r="4" fill="currentColor" />
      <circle cx="16" cy="5" r="2.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="25.5" cy="10.5" r="2.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="25.5" cy="21.5" r="2.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="16" cy="27" r="2.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="6.5" cy="21.5" r="2.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="6.5" cy="10.5" r="2.5" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}

/**
 * 8. Helix Spire: Algorithmic double helix spiral crest
 */
export function HelixSpireLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M8 5C14 5 18 11 16 16C14 21 18 27 24 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 5C18 5 14 11 16 16C18 21 14 27 8 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.55" />
      <line x1="10" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.75" />
      <line x1="14" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="24" x2="22" y2="24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeOpacity="0.75" />
    </svg>
  );
}

// ==========================================
// 3. SHIELD MATRICES & SECURITY GLYPHS
// ==========================================

/**
 * 9. Shield Matrix: 4-quadrant segmented security shield
 */
export function ShieldMatrixLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M6 6H14.5V14.5H6V6Z" fill="currentColor" fillOpacity="0.95" />
      <path d="M17.5 6H26V14.5H17.5V6Z" fill="currentColor" fillOpacity="0.75" />
      <path d="M6 17.5H14.5V23C14.5 25 10 27 6 25V17.5Z" fill="currentColor" fillOpacity="0.6" />
      <path d="M17.5 17.5H26V25C22 27 17.5 25 17.5 23V17.5Z" fill="currentColor" fillOpacity="0.4" />
      <rect x="13.5" y="13.5" width="5" height="5" rx="1" transform="rotate(45 16 16)" fill="currentColor" />
    </svg>
  );
}

/**
 * 10. Vault Badge: Faceted diamond bank vault emblem
 */
export function VaultBadgeLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <polygon
        points="16,3 27,8 27,24 16,29 5,24 5,8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon
        points="16,7 23,11 23,21 16,25 9,21 9,11"
        fill="currentColor"
        fillOpacity="0.35"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="16" cy="16" r="4.5" fill="currentColor" fillOpacity="0.9" />
      <circle cx="16" cy="16" r="1.75" fill="#fff" fillOpacity="0.95" />
      <line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="8" x2="23" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="24" x2="23" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="29" x2="16" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="24" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="8" x2="9" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 11. Cyber Bastion: Triple interlocking chevron armor fortress
 */
export function CyberBastionLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M5 5L16 11L27 5L27 9L16 15L5 9V5Z" fill="currentColor" fillOpacity="0.95" />
      <path d="M5 12L16 18L27 12L27 16L16 22L5 16V12Z" fill="currentColor" fillOpacity="0.7" />
      <path d="M5 19L16 25L27 19L27 23L16 29L5 23V19Z" fill="currentColor" fillOpacity="0.45" />
    </svg>
  );
}

/**
 * 12. Sentinel Node: Delta triangle perimeter with aperture core
 */
export function SentinelNodeLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <polygon points="16,3 29,26 3,26" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <polygon points="16,9 24,23 8,23" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="18" r="3.5" fill="currentColor" fillOpacity="0.9" />
      <line x1="16" y1="3" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" />
      <line x1="3" y1="26" x2="8" y2="23" stroke="currentColor" strokeWidth="1.5" />
      <line x1="29" y1="26" x2="24" y2="23" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ==========================================
// 4. MINIMALIST MONOGRAMS & MODERN GLYPHS
// ==========================================

/**
 * 13. Monogram Apex: Architectural modern 'A' monogram
 */
export function MonogramApexLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M16 3L4 27H11L16 16L21 27H28L16 3Z" fill="currentColor" fillOpacity="0.95" />
      <polygon points="16,10 12.5,18 19.5,18" fill="currentColor" fillOpacity="0.3" />
      <rect x="11" y="20" width="10" height="2.5" rx="1.25" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}

/**
 * 14. Monogram Nexus: Isometric folded ribbon 'N' monogram
 */
export function MonogramNexusLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M5 5H11V21L5 17V5Z" fill="currentColor" fillOpacity="0.9" />
      <path d="M11 5L21 21H27V27H21L11 11V5Z" fill="currentColor" fillOpacity="0.65" />
      <path d="M21 11L27 15V27H21V11Z" fill="currentColor" fillOpacity="0.4" />
      <polygon points="5,5 11,5 21,21 27,21 27,27 21,27 11,11 5,11" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
    </svg>
  );
}

/**
 * 15. Infinity Loop: Precision Möbius strip loop
 */
export function InfinityLoopLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M10 9C5.5 9 3 12 3 16C3 20 5.5 23 10 23C13.5 23 15 20.5 16 18.5C17 20.5 18.5 23 22 23C26.5 23 29 20 29 16C29 12 26.5 9 22 9C18.5 9 17 11.5 16 13.5C15 11.5 13.5 9 10 9Z"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinejoin="round"
      />
      <path
        d="M10 9C5.5 9 3 12 3 16C3 20 5.5 23 10 23C13.5 23 15 20.5 16 18.5"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeOpacity="0.5"
      />
      <circle cx="10" cy="16" r="2" fill="currentColor" />
      <circle cx="22" cy="16" r="2" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

/**
 * 16. Vortex Knot: Triquetra 3-blade vortex knot
 */
export function VortexKnotLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M16 4C19 9 21 13 25 15C21 16 18 19 16 24C14 19 11 16 7 15C11 13 13 9 16 4Z" fill="currentColor" fillOpacity="0.9" />
      <path
        d="M16 4C19 9 21 13 25 15C25 21 21 25 16 28C11 25 7 21 7 15C11 13 13 9 16 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
      <circle cx="16" cy="15" r="2.5" fill="#fff" fillOpacity="0.9" />
    </svg>
  );
}

// ==========================================
// 5. DATA RINGS & ORBITAL ECOSYSTEMS
// ==========================================

/**
 * 17. Data Ring: Triple concentric segmented telemetry ring
 */
export function DataRingLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M16 3C23.18 3 29 8.82 29 16" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M29 16C29 23.18 23.18 29 16 29" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeOpacity="0.65" />
      <path d="M16 29C8.82 29 3 23.18 3 16" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeOpacity="0.4" />
      <path d="M8 16C8 11.58 11.58 8 16 8C20.42 8 24 11.58 24 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 4" />
      <circle cx="16" cy="16" r="3.5" fill="currentColor" />
    </svg>
  );
}

/**
 * 18. Orbital Pulse: Intersecting gyroscopic elliptical orbits
 */
export function OrbitalPulseLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(45 16 16)" stroke="currentColor" strokeWidth="1.75" strokeOpacity="0.85" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(-45 16 16)" stroke="currentColor" strokeWidth="1.75" strokeOpacity="0.55" />
      <circle cx="16" cy="16" r="3.75" fill="currentColor" />
      <circle cx="24" cy="8" r="1.75" fill="currentColor" />
      <circle cx="8" cy="8" r="1.75" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

/**
 * 19. Radial Radar: Quartered telemetry radar disk
 */
export function RadialRadarLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d="M16 3A13 13 0 0 1 29 16L16 16Z" fill="currentColor" fillOpacity="0.85" />
      <line x1="16" y1="2" x2="16" y2="30" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * 20. Solaris Rays: 8-facet geometric starburst
 */
export function SolarisRaysLogo({ size = 32, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M16 2L18.5 11.5L28 14L18.5 16.5L16 26L13.5 16.5L4 14L13.5 11.5L16 2Z" fill="currentColor" fillOpacity="0.95" />
      <path
        d="M16 5.5L17.8 12.2L24.5 14L17.8 15.8L16 22.5L14.2 15.8L7.5 14L14.2 12.2L16 5.5Z"
        fill="currentColor"
        fillOpacity="0.4"
        transform="rotate(45 16 14)"
      />
      <circle cx="16" cy="14" r="2.5" fill="#fff" fillOpacity="0.95" />
    </svg>
  );
}

// ==========================================
// PARTNER & TRUST LOGOS (MONOCHROME)
// ==========================================

/** Stripe Logo */
export function StripeLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 60 25"
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M59.64 14.28c0-4.44-2.18-7.98-6.3-7.98-4.14 0-6.66 3.54-6.66 7.94 0 5.2 2.98 7.9 7.22 7.9 2.06 0 3.62-.48 4.8-1.16v-3.34c-1.18.62-2.5.96-3.92.96-1.62 0-2.98-.62-3.2-2.38h8c.04-.3.06-.62.06-.84zm-8.1-1.66c0-1.62.98-2.3 2.14-2.3 1.12 0 2.06.68 2.06 2.3h-4.2zm-9.36-6.32c-1.44 0-2.36.68-2.88 1.16l-.2-1h-4.3v19.78l4.82-1.02v-5.26c.54.42 1.34 1 2.52 1 3.54 0 6.1-2.92 6.1-7.36 0-4.66-2.62-7.3-6.06-7.3zm-1.52 11.2c-1.14 0-1.82-.42-2.28-.94v-5.74c.48-.56 1.18-.96 2.28-.96 1.76 0 2.92 1.6 2.92 3.82 0 2.24-1.14 3.82-2.92 3.82zm-12.78-7.94h-4.66v-3.14l-4.8 1.02v2.12h-2.3v3.86h2.3v6.72c0 3.24 1.72 5.04 4.7 5.04 1.62 0 2.82-.32 3.44-.7v-3.64c-.54.22-1.24.36-1.98.36-1.12 0-1.54-.54-1.54-1.78v-5.98h4.84v-3.88zm-13.88-3.26l-4.82 1.02v14.78h4.82V6.3zm0-3.96L9.14 3.4v3.18h4.82V2.34zM4.94 11.14c-1.32-.66-2.14-1.04-2.14-1.84 0-.7.62-1.22 1.7-1.22 1.54 0 3.12.56 4.3 1.24V5.2c-1.3-.54-2.8-.8-4.3-.8C1.84 4.4 0 6.06 0 8.84c0 3.66 2.96 4.64 5.34 5.48 1.58.56 2.12 1.02 2.12 1.84 0 .82-.74 1.34-1.86 1.34-1.82 0-3.7-.82-5.06-1.7v4.24c1.5.64 3.2.94 4.9.94 3.02 0 5.02-1.62 5.02-4.52-.02-3.48-2.66-4.6-5.52-5.32z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Shopify Logo */
export function ShopifyLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M18.8 6.4c-.1-.3-.3-.4-.5-.4-.1 0-1.2.1-1.2.1s-.8-.8-1-1c-.6-.7-1.4-1.1-2.3-1.1h-.2c-.4-1.6-1.7-2.8-3.4-2.9-1.9-.1-3.6 1.1-4.2 2.9-.6.2-1.3.4-1.4.5-.4.1-.5.3-.6.6L2 19.3l12.4 3.6 7.6-2.1-3.2-14.4zM11.6 3.2c.9 0 1.6.7 1.8 1.6l-3.5 1.1c.3-1.6 1-2.7 1.7-2.7zm-2.7 8.3c.3-.1.6-.2 1-.3.8-.2 1.6-.4 2.4-.4 1.4 0 2.2.7 2.2 1.7 0 2.3-3.6 2.5-3.6 4.5 0 .7.5 1.2 1.3 1.2.6 0 1.2-.2 1.8-.5l-.3 1.4c-.5.2-1.1.4-1.8.4-1.7 0-2.6-1-2.6-2.2 0-2.4 3.7-2.7 3.7-4.5 0-.5-.3-.9-1.1-.9-.5 0-1.1.1-1.7.4l.1-.9z"
        fill="currentColor"
      />
    </svg>
  );
}

/** AWS Logo */
export function AwsLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 20"
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M6.8 6.5C6.1 6.5 5.5 6.7 5.1 7.1C4.7 7.5 4.5 8 4.5 8.7C4.5 9.7 5.1 10.3 6.3 10.3C7 10.3 7.8 10.1 8.5 9.7V8.1C8.5 7.6 8.3 7.2 8 6.9C7.7 6.6 7.3 6.5 6.8 6.5ZM9.9 12.7C9.3 13.1 8.5 13.4 7.6 13.5C6.9 13.6 6.3 13.7 5.7 13.7C4.4 13.7 3.4 13.3 2.7 12.6C2 11.9 1.6 10.9 1.6 9.6C1.6 8.5 2 7.6 2.8 6.9C3.6 6.2 4.7 5.8 6.1 5.8C6.9 5.8 7.7 5.9 8.5 6.2V5.7C8.5 4.9 8.3 4.3 7.9 3.9C7.5 3.5 6.8 3.3 5.9 3.3C5.1 3.3 4.2 3.5 3.4 3.9L2.8 2.2C3.8 1.7 5 1.4 6.3 1.4C7.8 1.4 8.9 1.8 9.7 2.6C10.5 3.4 10.9 4.6 10.9 6.2V13.3H9.9V12.7ZM14.7 1.6H17.2L19.4 9.9L21.6 1.6H23.9L26.1 9.9L28.3 1.6H30.7L27.4 13.3H25.1L22.8 5.2L20.5 13.3H18.2L14.7 1.6ZM28.5 16.5C23.9 19.3 17.5 20.3 11.2 19.2C6.4 18.3 2.2 15.9 0 13.2C-.1 13.1 0 12.9.2 13C2.5 15.2 6.5 17.3 11 18C17 18.9 23.3 17.8 27.9 14.8C28.3 14.5 28.7 14.9 28.5 16.5ZM29.8 14.8C29.7 13.8 28.6 13.1 27.6 12.8C27.4 12.7 27.2 12.9 27.3 13.1C27.7 13.9 28.3 14.8 29.3 15.3C29.6 15.4 29.9 15.2 29.8 14.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Vercel Logo */
export function VercelLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M12 2L24 22H0L12 2Z" fill="currentColor" />
    </svg>
  );
}

/** Supabase Logo */
export function SupabaseLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M11.9 1.1c.5-.7 1.6-.3 1.5.6L12.1 11h9.1c.8 0 1.2 1 .6 1.5L10.3 23c-.5.6-1.5.3-1.5-.6l1.3-9.5H2.3c-.8 0-1.2-1-.6-1.5L11.9 1.1z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Brex Logo */
export function BrexLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 20"
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M3 3H16C19.3 3 22 5.7 22 9C22 10.9 21.1 12.6 19.7 13.6L24 19H17.5L14 14.5H9V19H3V3ZM9 7.5V10.5H15.5C16.3 10.5 17 9.8 17 9C17 8.2 16.3 7.5 15.5 7.5H9Z" fill="currentColor" />
      <path d="M26 3H29V10H26V3Z" fill="currentColor" />
    </svg>
  );
}

/** Ramp Logo */
export function RampLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 28 20"
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M4 17L12 4L16.5 11.5L10.5 17H4Z" fill="currentColor" />
      <path d="M13 17L19 7L24 17H18L16 13.5L14 17H13Z" fill="currentColor" fillOpacity="0.75" />
    </svg>
  );
}

/** Carta Logo */
export function CartaLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.7 4 17.1 5.3 18.6 7.4L12 12V4ZM4 12C4 8.7 6.1 5.9 9 4.6V12L4 12ZM5.4 16.6C4.5 15.3 4 13.7 4 12L12 12L7.4 18.6C6.6 18.1 5.9 17.4 5.4 16.6ZM12 20C9.3 20 6.9 18.7 5.4 16.6L12 12V20ZM20 12C20 15.3 17.9 18.1 15 19.4V12L20 12ZM18.6 7.4C19.5 8.7 20 10.3 20 12L12 12L16.6 5.4C17.4 5.9 18.1 6.6 18.6 7.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Plaid Logo */
export function PlaidLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM3 14H10V21H3V14ZM14 14H21V21H14V14Z" fill="currentColor" />
      <path d="M8 8H16V16H8V8Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  );
}

/** Deel Logo */
export function DeelLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 18"
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2 2H10C13.86 2 17 5.14 17 9C17 12.86 13.86 16 10 16H2V2ZM7 12H10C11.66 12 13 10.66 13 9C13 7.34 11.66 6 10 6H7V12Z"
        fill="currentColor"
      />
      <path d="M20 7H28V10H23V11H27V13H23V14H28V16H20V7Z" fill="currentColor" />
      <path d="M30 7H38V10H33V11H37V13H33V14H38V16H30V7Z" fill="currentColor" />
    </svg>
  );
}

/** Mercury Logo */
export function MercuryLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM6.5 17L10 7H12L14 13L16 7H18L14.5 17H12.5L10.5 11L8.5 17H6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Linear Logo */
export function LinearLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M3.5 18.5C3.5 19.33 4.17 20 5 20C5.83 20 6.5 19.33 6.5 18.5C6.5 17.67 5.83 17 5 17C4.17 17 3.5 17.67 3.5 18.5ZM3 6.5C3 13.4 8.6 19 15.5 19V16.5C10 16.5 5.5 12 5.5 6.5H3ZM18.5 3.5C17.67 3.5 17 4.17 17 5C17 5.83 17.67 6.5 18.5 6.5C19.33 6.5 20 5.83 20 5C20 4.17 19.33 3.5 18.5 3.5ZM6.5 3C13.4 3 19 8.6 19 15.5H16.5C16.5 10 12 5.5 6.5 5.5V3Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Figma Logo */
export function FigmaLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8 2H12V8H8C6.34 8 5 6.66 5 5C5 3.34 6.34 2 8 2ZM12 2H16C17.66 2 19 3.34 19 5C19 6.66 17.66 8 16 8H12V2ZM8 8H12V14H8C6.34 14 5 12.66 5 11C5 9.34 6.34 8 8 8ZM12 8H16C17.66 8 19 9.34 19 11C19 12.66 17.66 14 16 14C14.34 14 13 12.66 13 11V8H12ZM8 14H12V20C12 21.66 10.66 23 9 23C7.34 23 6 21.66 6 20C6 18.34 7.34 17 9 17L8 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** GitHub Logo */
export function GitHubLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.84 21.523C9.34 21.617 9.52 21.306 9.52 21.045C9.52 20.814 9.51 20.04 9.51 19.227C6.73 19.829 6.14 18.01 6.14 18.01C5.68 16.848 5.03 16.539 5.03 16.539C4.12 15.918 5.1 15.93 5.1 15.93C6.1 16.002 6.63 16.96 6.63 16.96C7.52 18.494 8.97 18.051 9.54 17.795C9.63 17.149 9.89 16.708 10.17 16.458C7.95 16.208 5.62 15.346 5.62 11.517C5.62 10.426 6.01 9.531 6.65 8.83C6.55 8.577 6.21 7.558 6.75 6.196C6.75 6.196 7.59 5.926 9.5 7.218C10.3 6.995 11.15 6.884 12 6.88C12.85 6.884 13.7 6.995 14.5 7.218C16.41 5.926 17.25 6.196 17.25 6.196C17.79 7.558 17.45 8.577 17.35 8.83C17.99 9.531 18.38 10.426 18.38 11.517C18.38 15.358 16.04 16.205 13.81 16.45C14.17 16.761 14.49 17.375 14.49 18.318C14.49 19.67 14.48 20.758 14.48 21.045C14.48 21.309 14.66 21.624 15.17 21.522C19.135 20.193 22 16.444 22 12.017C22 6.484 17.522 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Snowflake Logo */
export function SnowflakeLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M12 2V22M3.34 7L20.66 17M3.34 17L20.66 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 5L10 3M12 5L14 3M12 19L10 21M12 19L14 21M5.94 8.5L3.94 8.5M5.94 8.5L4.94 6.77M18.06 15.5L20.06 15.5M18.06 15.5L19.06 17.23M5.94 15.5L3.94 15.5M5.94 15.5L4.94 17.23M18.06 8.5L20.06 8.5M18.06 8.5L19.06 6.77" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Datadog Logo */
export function DatadogLogo({ size = 24, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5 4C4.45 4 4 4.45 4 5V14C4 18.42 7.58 22 12 22C16.42 22 20 18.42 20 14V5C20 4.45 19.55 4 19 4L15 6L12 4L9 6L5 4ZM8 10C8.83 10 9.5 10.67 9.5 11.5C9.5 12.33 8.83 13 8 13C7.17 13 6.5 12.33 6.5 11.5C6.5 10.67 7.17 10 8 10ZM16 10C16.83 10 17.5 10.67 17.5 11.5C17.5 12.33 16.83 13 16 13C15.17 13 14.5 12.33 14.5 11.5C14.5 10.67 15.17 10 16 10ZM12 14C13.66 14 15 14.9 15 16H9C9 14.9 10.34 14 12 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ==========================================
// REGISTRIES & DICTIONARIES
// ==========================================

export const LOGOMARKS: Record<LogomarkId, React.ComponentType<LogoProps>> = {
  'isometric-cube': IsometricCubeLogo,
  'hexagon-prism': HexagonPrismLogo,
  'hyper-cube': HyperCubeLogo,
  'stacked-layers': StackedLayersLogo,
  'neural-crest': NeuralCrestLogo,
  'quantum-wave': QuantumWaveLogo,
  'synapse-cluster': SynapseClusterLogo,
  'helix-spire': HelixSpireLogo,
  'shield-matrix': ShieldMatrixLogo,
  'vault-badge': VaultBadgeLogo,
  'cyber-bastion': CyberBastionLogo,
  'sentinel-node': SentinelNodeLogo,
  'monogram-apex': MonogramApexLogo,
  'monogram-nexus': MonogramNexusLogo,
  'infinity-loop': InfinityLoopLogo,
  'vortex-knot': VortexKnotLogo,
  'data-ring': DataRingLogo,
  'orbital-pulse': OrbitalPulseLogo,
  'radial-radar': RadialRadarLogo,
  'solaris-rays': SolarisRaysLogo,
};

export const PARTNER_LOGOS: Record<PartnerLogoId, React.ComponentType<LogoProps>> = {
  stripe: StripeLogo,
  shopify: ShopifyLogo,
  aws: AwsLogo,
  vercel: VercelLogo,
  supabase: SupabaseLogo,
  brex: BrexLogo,
  ramp: RampLogo,
  carta: CartaLogo,
  plaid: PlaidLogo,
  deel: DeelLogo,
  mercury: MercuryLogo,
  linear: LinearLogo,
  figma: FigmaLogo,
  github: GitHubLogo,
  snowflake: SnowflakeLogo,
  datadog: DatadogLogo,
};

export const LOGOMARK_METADATA: Record<LogomarkId, LogomarkMeta> = {
  'isometric-cube': {
    id: 'isometric-cube',
    name: 'Isometric Cube',
    category: 'abstract-cubes',
    description: 'Multi-faceted isometric block structure with dimensional lighting and internal coordinate axis.',
    suggestedIndustries: ['Cloud Computing', 'DevOps & SRE', 'Infrastructure', 'Web3 & Blockchain', 'Data Platforms'],
    tags: ['cube', '3d', 'isometric', 'modular', 'infrastructure', 'blocks'],
  },
  'hexagon-prism': {
    id: 'hexagon-prism',
    name: 'Hexagon Prism',
    category: 'abstract-cubes',
    description: '6-faceted hexagonal crystal prism with dynamic radial lighting facets and center core.',
    suggestedIndustries: ['Cybersecurity', 'Applied AI', 'Enterprise Software', 'Analytics'],
    tags: ['hexagon', 'prism', 'crystal', 'facets', 'geometry'],
  },
  'hyper-cube': {
    id: 'hyper-cube',
    name: 'HyperCube Tesseract',
    category: 'abstract-cubes',
    description: '4D hypercube projection with suspended inner isometric cube interconnected to outer frame.',
    suggestedIndustries: ['Quantum Computing', 'Advanced AI', 'Cloud Networking', 'Research'],
    tags: ['tesseract', 'hypercube', '4d', 'geometry', 'network'],
  },
  'stacked-layers': {
    id: 'stacked-layers',
    name: 'Stacked Layers',
    category: 'abstract-cubes',
    description: 'Three offset floating isometric plates symbolizing multi-tiered architecture and virtualization.',
    suggestedIndustries: ['Cloud Platforms', 'Database Systems', 'API Gateways', 'Enterprise Tech'],
    tags: ['layers', 'stack', 'isometric', 'tier', 'architecture'],
  },
  'neural-crest': {
    id: 'neural-crest',
    name: 'Neural Crest',
    category: 'neural-crests',
    description: 'Dynamic interweaving neural ribbon arcs with node synapse focal points.',
    suggestedIndustries: ['Machine Learning', 'Artificial Intelligence', 'Autonomous Systems', 'BioTech'],
    tags: ['neural', 'ai', 'crest', 'curves', 'synapse'],
  },
  'quantum-wave': {
    id: 'quantum-wave',
    name: 'Quantum Wave',
    category: 'neural-crests',
    description: 'Harmonic resonant sine wave crests overlapping into a coherent energy shield.',
    suggestedIndustries: ['Audio & Signal Processing', 'Fintech Quant', 'Telecom', 'Deep Tech'],
    tags: ['wave', 'sine', 'quantum', 'resonance', 'harmonic'],
  },
  'synapse-cluster': {
    id: 'synapse-cluster',
    name: 'Synapse Cluster',
    category: 'neural-crests',
    description: 'Hexagonal interconnected neural lattice surrounding an intensified command nucleus.',
    suggestedIndustries: ['Distributed Systems', 'Graph Databases', 'AI Agents', 'Mesh Networks'],
    tags: ['synapse', 'graph', 'network', 'nodes', 'cluster'],
  },
  'helix-spire': {
    id: 'helix-spire',
    name: 'Helix Spire',
    category: 'neural-crests',
    description: 'Double helix spiraling upward into an algorithmic crest symbol.',
    suggestedIndustries: ['Biotech', 'Genomics', 'Data Pipelines', 'Evolving Systems'],
    tags: ['helix', 'dna', 'spiral', 'algorithm', 'growth'],
  },
  'shield-matrix': {
    id: 'shield-matrix',
    name: 'Shield Matrix',
    category: 'shield-matrices',
    description: 'Precision segmented security shield divided into 4 interlocking quadrants with center core.',
    suggestedIndustries: ['Cybersecurity', 'Fintech Banking', 'Authentication & IAM', 'Compliance'],
    tags: ['shield', 'security', 'matrix', 'protection', 'trust'],
  },
  'vault-badge': {
    id: 'vault-badge',
    name: 'Vault Badge',
    category: 'shield-matrices',
    description: 'Faceted bank vault emblem with diamond beveling and multi-directional security geometry.',
    suggestedIndustries: ['Treasury Management', 'Crypto Custody', 'WealthTech', 'Payment Gateways'],
    tags: ['vault', 'badge', 'security', 'custody', 'fintech'],
  },
  'cyber-bastion': {
    id: 'cyber-bastion',
    name: 'Cyber Bastion',
    category: 'shield-matrices',
    description: 'Three interlocking defensive chevron plates forming an impenetrable high-tech fortress.',
    suggestedIndustries: ['Zero-Trust Networks', 'Cloud Firewalls', 'Threat Intelligence', 'Defense Tech'],
    tags: ['bastion', 'armor', 'chevron', 'defense', 'shield'],
  },
  'sentinel-node': {
    id: 'sentinel-node',
    name: 'Sentinel Node',
    category: 'shield-matrices',
    description: 'Delta triangle shield perimeter with integrated telemetry aperture and security crosshairs.',
    suggestedIndustries: ['Monitoring & Observability', 'SIEM', 'Incident Response', 'Hardware Security'],
    tags: ['sentinel', 'delta', 'triangle', 'radar', 'node'],
  },
  'monogram-apex': {
    id: 'monogram-apex',
    name: 'Monogram Apex',
    category: 'minimalist-monograms',
    description: 'Architectural modern \'A\' monogram with angular geometric negative space.',
    suggestedIndustries: ['Architecture & Design', 'Fintech Leaders', 'Venture Capital', 'High-End SaaS'],
    tags: ['apex', 'monogram', 'letter-a', 'minimalist', 'modern'],
  },
  'monogram-nexus': {
    id: 'monogram-nexus',
    name: 'Monogram Nexus',
    category: 'minimalist-monograms',
    description: 'Continuous folded isometric 3D ribbon forming an interlocking \'N\' monogram.',
    suggestedIndustries: ['Next-Gen Protocols', 'Enterprise Platforms', 'Collaboration Software', 'Fintech'],
    tags: ['nexus', 'monogram', 'letter-n', 'ribbon', 'isometric'],
  },
  'infinity-loop': {
    id: 'infinity-loop',
    name: 'Infinity Loop',
    category: 'minimalist-monograms',
    description: 'Precision geometric Möbius strip infinity loop with progressive ribbon depth.',
    suggestedIndustries: ['DevOps & CI/CD', 'Continuous Intelligence', 'Automation', 'Fintech'],
    tags: ['infinity', 'loop', 'mobius', 'continuous', 'automation'],
  },
  'vortex-knot': {
    id: 'vortex-knot',
    name: 'Vortex Knot',
    category: 'minimalist-monograms',
    description: 'Triquetra three-blade vortex knot with aerodynamic curved bevels and rotational symmetry.',
    suggestedIndustries: ['Renewable Energy', 'Decentralized Finance', 'Aerospace', 'Cloud Mesh'],
    tags: ['vortex', 'triquetra', 'knot', 'rotation', 'energy'],
  },
  'data-ring': {
    id: 'data-ring',
    name: 'Data Ring',
    category: 'data-rings',
    description: 'Triple concentric segmented telemetry ring with radar notches and central data pulse.',
    suggestedIndustries: ['Big Data', 'Real-Time Streaming', 'Fintech Markets', 'IoT & Telemetry'],
    tags: ['ring', 'radar', 'telemetry', 'stream', 'data'],
  },
  'orbital-pulse': {
    id: 'orbital-pulse',
    name: 'Orbital Pulse',
    category: 'data-rings',
    description: 'Intersecting elliptical gyroscopic orbits centered around an active atomic core.',
    suggestedIndustries: ['SpaceTech', 'Quantum Physics', 'Global Communications', 'AI Models'],
    tags: ['orbit', 'gyroscope', 'atom', 'pulse', 'space'],
  },
  'radial-radar': {
    id: 'radial-radar',
    name: 'Radial Radar',
    category: 'data-rings',
    description: 'Quartered telemetry disk with progressive radar sweep arcs and coordinate reticle.',
    suggestedIndustries: ['Cyber Defense', 'Market Intelligence', 'Geospatial Analytics', 'Observability'],
    tags: ['radar', 'radial', 'sweep', 'sonar', 'coordinates'],
  },
  'solaris-rays': {
    id: 'solaris-rays',
    name: 'Solaris Rays',
    category: 'data-rings',
    description: '8-facet geometric radial starburst with diamond lozenges radiating outward.',
    suggestedIndustries: ['Solar & Cleantech', 'Elite Capital', 'Global Commerce', 'Enterprise SaaS'],
    tags: ['solaris', 'starburst', 'sun', 'rays', 'radial'],
  },
};

export const PARTNER_LOGO_METADATA: Record<PartnerLogoId, PartnerLogoMeta> = {
  stripe: { id: 'stripe', name: 'Stripe', category: 'Fintech & Payments', description: 'Global payment infrastructure provider.' },
  shopify: { id: 'shopify', name: 'Shopify', category: 'E-Commerce', description: 'Leading global commerce platform.' },
  aws: { id: 'aws', name: 'Amazon Web Services', category: 'Cloud & Hosting', description: 'Comprehensive hyperscale cloud provider.' },
  vercel: { id: 'vercel', name: 'Vercel', category: 'Developer Tools', description: 'Frontend cloud and Next.js platform.' },
  supabase: { id: 'supabase', name: 'Supabase', category: 'Developer Tools', description: 'Open source Firebase alternative.' },
  brex: { id: 'brex', name: 'Brex', category: 'Fintech & Banking', description: 'Corporate card and spend management.' },
  ramp: { id: 'ramp', name: 'Ramp', category: 'Fintech & Banking', description: 'Finance automation and corporate cards.' },
  carta: { id: 'carta', name: 'Carta', category: 'Equity & Cap Table', description: 'Ownership management and equity platform.' },
  plaid: { id: 'plaid', name: 'Plaid', category: 'Fintech & API', description: 'Financial data network and banking APIs.' },
  deel: { id: 'deel', name: 'Deel', category: 'Global Payroll & HR', description: 'Global hiring and international payroll.' },
  mercury: { id: 'mercury', name: 'Mercury', category: 'Fintech & Banking', description: 'Banking built for startups and modern businesses.' },
  linear: { id: 'linear', name: 'Linear', category: 'Developer Tools', description: 'Issue tracking and project management for software teams.' },
  figma: { id: 'figma', name: 'Figma', category: 'Design Tools', description: 'Collaborative interface design platform.' },
  github: { id: 'github', name: 'GitHub', category: 'Developer Tools', description: 'Developer platform and version control repository.' },
  snowflake: { id: 'snowflake', name: 'Snowflake', category: 'Data & Cloud', description: 'Data cloud and warehousing platform.' },
  datadog: { id: 'datadog', name: 'Datadog', category: 'Observability', description: 'Cloud scale observability and security platform.' },
};

// ==========================================
// DYNAMIC COMPONENT HELPERS
// ==========================================

export interface DynamicLogomarkProps extends LogoProps {
  name: LogomarkId;
}

/**
 * Renders any of the 20 geometric logomarks dynamically by ID
 */
export function Logomark({ name, ...props }: DynamicLogomarkProps) {
  const Component = LOGOMARKS[name] || IsometricCubeLogo;
  return <Component {...props} />;
}

export interface DynamicPartnerLogoProps extends LogoProps {
  name: PartnerLogoId;
}

/**
 * Renders any partner/trust logo dynamically by ID
 */
export function PartnerLogo({ name, ...props }: DynamicPartnerLogoProps) {
  const Component = PARTNER_LOGOS[name];
  if (!Component) return null;
  return <Component {...props} />;
}

/**
 * Pre-built Social Proof / Partner Trust Cloud Component
 */
export function LogoCloud({
  title = 'Trusted by engineering and finance teams worldwide',
  logos = ['stripe', 'aws', 'vercel', 'supabase', 'brex', 'plaid', 'mercury', 'linear'],
  className = '',
}: {
  title?: string;
  logos?: PartnerLogoId[];
  className?: string;
}) {
  return (
    <div className={`w-full py-12 ${className}`}>
      {title && (
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-8">
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
        {logos.map((id) => {
          const Comp = PARTNER_LOGOS[id];
          if (!Comp) return null;
          return (
            <div key={id} className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center">
              <Comp size={24} className="h-6 w-auto max-w-[110px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Seamless Infinite Horizontal Marquee for Partner Logos
 */
export function PartnerMarquee({
  logos = ['stripe', 'shopify', 'aws', 'vercel', 'supabase', 'brex', 'ramp', 'carta', 'plaid', 'deel', 'mercury', 'linear', 'figma', 'github', 'snowflake', 'datadog'],
  className = '',
}: {
  logos?: PartnerLogoId[];
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden py-6 ${className}`}>
      <div className="flex w-max animate-marquee gap-12 items-center text-muted-foreground/60 hover:text-muted-foreground">
        {[...logos, ...logos].map((id, index) => {
          const Comp = PARTNER_LOGOS[id];
          if (!Comp) return null;
          return (
            <div key={`${id}-${index}`} className="flex items-center justify-center transition-opacity hover:opacity-100">
              <Comp size={22} className="h-5.5 w-auto" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
