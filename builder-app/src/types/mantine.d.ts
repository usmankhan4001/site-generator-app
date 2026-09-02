// TypeScript ambient module declaration for Mantine UI v7
declare module '@mantine/core' {
  import React from 'react';

  export type MantineColorsTuple = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];

  export interface MantineThemeOverride {
    primaryColor?: string;
    primaryShade?: number | { light: number; dark: number };
    colors?: Record<string, MantineColorsTuple>;
    black?: string;
    white?: string;
    fontFamily?: string;
    fontFamilyMonospace?: string;
    defaultRadius?: string;
    cursorType?: 'default' | 'pointer';
    other?: Record<string, any>;
    components?: Record<string, any>;
  }

  export function createTheme(theme: MantineThemeOverride): MantineThemeOverride;

  export interface MantineProviderProps {
    children: React.ReactNode;
    theme?: MantineThemeOverride;
    defaultColorScheme?: 'light' | 'dark' | 'auto';
    forceColorScheme?: 'light' | 'dark';
    colorSchemeManager?: any;
    getRootElement?: () => HTMLElement | null;
    cssVariablesSelector?: string;
  }

  export const MantineProvider: React.FC<MantineProviderProps>;
  export const ColorSchemeScript: React.FC<{ defaultColorScheme?: 'light' | 'dark' | 'auto'; forceColorScheme?: 'light' | 'dark' }>;

  export const Box: any;
  export const Group: any;
  export const Stack: any;
  export const Text: any;
  export const Title: any;
  export const Badge: any;
  export const Button: any;
  export const ActionIcon: any;
  export const UnstyledButton: any;
  export const Tooltip: any;
  export const Menu: any;
  export const Indicator: any;
  export const SegmentedControl: any;
  export const Tabs: any;
  export const TextInput: any;
  export const Textarea: any;
  export const Select: any;
  export const ScrollArea: any;
  export const Card: any;
  export const Paper: any;
  export const Modal: any;
  export const Divider: any;
  export const ThemeIcon: any;
  export const Alert: any;
  export const Loader: any;
  export const Popover: any;
  export const Accordion: any;
  export const Drawer: any;
  export const Center: any;
  export const Flex: any;
  export const Container: any;
  export const Grid: any;
  export const SimpleGrid: any;

  export const useMantineTheme: () => any;
  export const useMantineColorScheme: () => any;
  export const rem: (val: number | string) => string;
  export const em: (val: number | string) => string;
}
