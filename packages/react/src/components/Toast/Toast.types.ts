import { Toast } from 'radix-ui';
import * as React from 'react';

import { BaseProps } from '../../types';
export interface ToastProps extends 
  BaseProps,
  Omit<
    React.ComponentPropsWithoutRef<typeof Toast.Root>,
    'open' | 'onOpenChange' | 'duration' | 'className'
  > {
  titulo?: string;
  automaticClose?: boolean;
  duration?: number;
  icon?: React.ReactNode;
  iconClosed?: React.ReactNode;
  iconType?: 'Info' | 'Success' | 'Alert';
}