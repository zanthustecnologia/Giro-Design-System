import { Switch as SwitchRadix } from 'radix-ui';
import * as React from 'react';

export interface SwitchProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SwitchRadix.Root>,
  'defaultChecked' | 'disabled' | 'onCheckedChange'
> {
  defaultChecked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}