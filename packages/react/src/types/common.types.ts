export type Size = 'sm' | 'lg';

export type Variant = 'filled' | 'outlined' | 'text';

export type TextVariant = 'neutral' | 'brand' | 'color' | 'success' | 'alert';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Align = 'start' | 'center' | 'end';

export type Position = 'right' | 'left' | 'both';

export type Locale = 'pt-br' | 'en-us';

export interface BaseProps {
  id?: string;
  className?: string;
  disabled?: boolean;
}
