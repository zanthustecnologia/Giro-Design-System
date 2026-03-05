import * as React from 'react';

import { ToastProps } from '../components/Toast/Toast.types';

export interface ToastContextValue {
  toasts: ToastProps[];
  showToast: (toast: Omit<ToastProps, 'id'>) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);
