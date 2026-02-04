import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import * as React from 'react';

export interface RadioProps {
  id?: string | number;
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  'defaultValue' | 'onValueChange' | 'name' | 'orientation'
> {
  id?: string;
  items: RadioProps[];
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  name?: string;
  ariaLabel?: string;
  orientation?: "horizontal" | "vertical";
}