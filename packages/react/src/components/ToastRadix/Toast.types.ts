import { Toast as ToastRadix } from 'radix-ui';
import * as React from 'react';

export interface ToastProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ToastRadix.Root>,
   'disabled' 
> {
  disabled?: boolean;
  children: React.ReactNode;
}