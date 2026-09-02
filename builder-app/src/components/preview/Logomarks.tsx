'use client';

import React from 'react';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * 1. Isometric Cube: Multi-faceted 3D block
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
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 3V29" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <path d="M4 10L16 16L28 10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16L4 22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <path d="M16 16L28 22" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * 2. Neural Crest: AI and Neural network wave
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
      <path
        d="M6 16C6 10.4772 10.4772 6 16 6C21.5228 6 26 10.4772 26 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M10 20C10 16.6863 12.6863 14 16 14C19.3137 14 22 16.6863 22 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="24" r="2.5" fill="currentColor" />
      <circle cx="6" cy="16" r="2" fill="currentColor" />
      <circle cx="26" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

/**
 * 3. Shield Matrix: Cybersecurity and defense
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
      <path
        d="M16 4L26 8V16C26 22.5 21.5 26.5 16 28C10.5 26.5 6 22.5 6 16V8L16 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 10V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 16H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4. Monogram Apex: Luxury and high fashion
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
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 22L16 9L22 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.5 17.5H19.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * 5. Data Ring: Hosting & Server infrastructure
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
      <ellipse cx="16" cy="9" rx="11" ry="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 9V16C5 18.2 9.9 20 16 20C22.1 20 27 18.2 27 16V9"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 16V23C5 25.2 9.9 27 16 27C22.1 27 27 25.2 27 23V16"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="21" cy="9" r="1" fill="currentColor" />
      <circle cx="21" cy="16" r="1" fill="currentColor" />
      <circle cx="21" cy="23" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Dynamic Brand Logo Picker based on archetype
 */
export function DynamicBrandLogo({
  archetypeId = 'tech-cloud-devops',
  size = 28,
  className = ''
}: {
  archetypeId?: string;
  size?: number | string;
  className?: string;
}) {
  if (archetypeId.includes('ai') || archetypeId.includes('data')) {
    return <NeuralCrestLogo size={size} className={className} />;
  }
  if (archetypeId.includes('cyber') || archetypeId.includes('fintech')) {
    return <ShieldMatrixLogo size={size} className={className} />;
  }
  if (archetypeId.includes('ecommerce') || archetypeId.includes('luxury') || archetypeId.includes('fashion')) {
    return <MonogramApexLogo size={size} className={className} />;
  }
  if (archetypeId.includes('hosting') || archetypeId.includes('infra') || archetypeId.includes('vps')) {
    return <DataRingLogo size={size} className={className} />;
  }
  return <IsometricCubeLogo size={size} className={className} />;
}

/**
 * Partner Trust Logos (Monochrome Untitled UI Partner Set)
 */
export function StripePartnerLogo({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 25" fill="currentColor" className={className}>
      <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95l.48 2.22c-1.25.68-2.97 1.05-4.88 1.05-4.14 0-6.19-2.5-6.19-6.33 0-3.66 2.15-6.42 5.75-6.42 3.73 0 5.65 2.65 5.65 6.25v1.63zm-3.23-2.12c0-1.52-.77-2.61-2.42-2.61-1.57 0-2.39 1.09-2.42 2.61h4.84zM40.23 6.64h3.19v12.28h-3.19V6.64zm0-3.62h3.19v2.53h-3.19V3.02zM32.55 19.17c-3.79 0-6.1-2.73-6.1-6.33 0-3.69 2.37-6.44 6.13-6.44 1.48 0 2.76.4 3.73.99l-.51 2.31c-.85-.5-1.92-.85-3.14-.85-2.08 0-3.41 1.43-3.41 3.99 0 2.5 1.3 3.91 3.44 3.91 1.25 0 2.39-.37 3.25-.9l.51 2.28c-1.02.61-2.34 1.04-3.9 1.04zM18.84 6.64h3.11v2.12c.96-1.54 2.45-2.36 4.39-2.36v3.41c-.34-.05-.72-.08-1.14-.08-2.37 0-3.17 1.43-3.17 3.79v5.4h-3.19V6.64zM9.46 19.17c-2.47 0-4.33-.82-5.45-2.1l1.54-1.94c.91 1.01 2.34 1.62 3.96 1.62 1.62 0 2.39-.58 2.39-1.46 0-.93-.82-1.3-2.6-1.78-2.58-.72-4.46-1.57-4.46-3.88 0-2.26 1.94-3.85 4.97-3.85 2.18 0 3.75.64 4.81 1.65l-1.43 2.02c-.82-.77-2.02-1.25-3.38-1.25-1.38 0-2.05.53-2.05 1.28 0 .82.74 1.17 2.47 1.65 2.79.77 4.6 1.67 4.6 4.01 0 2.47-1.99 4.06-5.37 4.06z" />
    </svg>
  );
}

export function AwsPartnerLogo({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 20" fill="currentColor" className={className}>
      <path d="M12.4 13.5c-2.8 2.1-6.9 3.2-10.4 3.2C.6 16.7 0 16.5 0 16.2c0-.2.4-.4.8-.5 3.3-1 6.8-2.6 9.4-4.8.4-.3.9-.1 1.1.2.3.4.2.9-.1 1.2l1.2 1.2zM21.5 5.2h3.4l2.8 10h-2.8l-.6-2.6h-2.9l-.6 2.6H18l3.5-10zm2.3 5.4l-.9-3.9-.9 3.9h1.8zm11.3-5.4l1.9 6.8 1.9-6.8h2.6l-3.2 10.1h-2.6l-1.9-6.6-1.9 6.6h-2.6L29.6 5.2h2.6l1.9 6.8 1.9-6.8h1.7z" />
    </svg>
  );
}

export function VercelPartnerLogo({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
  );
}

export function SupabasePartnerLogo({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.2 24c-.7 0-1.2-.6-1-1.3l2.4-8.8H3.3c-.8 0-1.3-.8-.9-1.5L14.7.4c.6-.7 1.7-.3 1.7.6v8.4h7.3c.8 0 1.3.8.9 1.5l-10.4 12.6c-.3.3-.6.5-1 .5z" />
    </svg>
  );
}
