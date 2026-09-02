declare module '@measured/puck' {
  import React from 'react';

  export type Field<T = any> = {
    type: 'text' | 'textarea' | 'number' | 'select' | 'radio' | 'boolean' | 'array' | 'object' | 'custom';
    label?: string;
    options?: Array<{ label: string; value: any }>;
    arrayFields?: Record<string, Field>;
    objectFields?: Record<string, Field>;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: T;
  };

  export type ComponentConfig<Props = Record<string, any>> = {
    label?: string;
    render: React.ComponentType<Props>;
    defaultProps?: Partial<Props>;
    fields?: {
      [K in keyof Props]?: Field<Props[K]>;
    };
  };

  export type Config<Props = Record<string, any>, RootProps = Record<string, any>> = {
    categories?: Record<
      string,
      {
        title?: string;
        visible?: boolean;
        defaultExpanded?: boolean;
        components: string[];
      }
    >;
    components: {
      [K in keyof Props]: ComponentConfig<Props[K]>;
    };
    root?: ComponentConfig<RootProps>;
  };

  export type Data<Props = Record<string, any>, RootProps = Record<string, any>> = {
    content: Array<{
      type: keyof Props | string;
      props: any;
      [key: string]: any;
    }>;
    root: {
      props?: RootProps;
      [key: string]: any;
    };
    zones?: Record<string, any>;
    [key: string]: any;
  };

  export const Puck: React.FC<any>;
  export const Render: React.FC<any>;
  export default Puck;
}
