import * as React from 'react';

import { ToastMessage } from './Toast.types';

export interface ToastContextValue {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);
