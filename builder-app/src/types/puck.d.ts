import React from 'react';

// Compatibility types that work standalone without @measured/puck installed
export type PuckFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'radio'
  | 'boolean'
  | 'array'
  | 'object'
  | 'custom';

export interface PuckFieldOption {
  label: string;
  value: string | number | boolean;
}

export interface PuckField<T = unknown> {
  type: PuckFieldType;
  label?: string;
  options?: PuckFieldOption[];
  arrayFields?: Record<string, PuckField>;
  objectFields?: Record<string, PuckField>;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: T;
}

export interface ComponentConfig<Props = Record<string, any>> {
  label?: string;
  render: React.ComponentType<Props>;
  defaultProps?: Partial<Props>;
  fields?: {
    [K in keyof Props]?: PuckField<Props[K]>;
  };
}

export interface Config {
  categories?: Record<
    string,
    {
      title?: string;
      visible?: boolean;
      defaultExpanded?: boolean;
      components: string[];
    }
  >;
  components: Record<string, ComponentConfig<any>>;
}
