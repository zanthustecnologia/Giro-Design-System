import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import * as React from 'react';

export interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'checked' | 'onCheckedChange' | 'disabled' | 'id'
> {
  id?: string;
  label?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  indeterminate?: boolean;
}