export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
  since?: string;
  deprecated?: string;
}

export interface ComponentMetadata {
  name: string;
  description: string;
  category: string;
  props: ComponentProp[];
  examples: string[];
  keywords?: string[];
}

export interface DesignToken {
  name: string;
  value: string;
  category: string;
}
