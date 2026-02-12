import * as React from 'react';

import { ToastProps } from './Toast.types';

export interface ToastContextValue {
  toasts: ToastProps[];
  showToast: (toast: Omit<ToastProps, 'id'>) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);
