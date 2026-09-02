import { createTheme, MantineColorsTuple } from '@mantine/core';

// Primary brand colors centered on #6366f1 (Indigo 500)
const brand: MantineColorsTuple = [
  '#eef2ff',
  '#e0e7ff',
  '#c7d2fe',
  '#a5b4fc',
  '#818cf8',
  '#6366f1', // 5: primary
  '#4f46e5',
  '#4338ca',
  '#3730a3',
  '#312e81',
];

// Obsidian dark palette:
// dark[7] is #121826 (surface / card)
// dark[9] is #090d16 (background / obsidian deep)
const dark: MantineColorsTuple = [
  '#f8fafc',
  '#e2e8f0',
  '#cbd5e1',
  '#94a3b8',
  '#64748b',
  '#334155',
  '#1e293b',
  '#121826', // 7: obsidian surface
  '#0d1424', // 8: obsidian intermediate
  '#090d16', // 9: obsidian deep canvas
];

export const mantineTheme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 5, dark: 5 },
  colors: {
    brand,
    dark,
  },
  black: '#090d16',
  white: '#f8fafc',
  fontFamily: 'var(--font-plus-jakarta), var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: 'var(--font-geist-mono), ui-monospace, monospace',
  defaultRadius: 'md',
  cursorType: 'pointer',
  other: {
    obsidianBg: '#090d16',
    obsidianSurface: '#121826',
    obsidianBorder: '#1e293b',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Paper: {
      defaultProps: {
        bg: '#121826',
      },
    },
    Card: {
      defaultProps: {
        bg: '#121826',
      },
    },
  },
});
