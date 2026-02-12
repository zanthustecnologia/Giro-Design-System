import { ReactNode } from 'react';

export type ToastType = 'success' | 'alert' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  persistent?: boolean;
  duration?: number;
  timestamp: number;
}

export interface ToastOptions {
  persistent?: boolean;
  duration?: number;
}

export interface ToastContextType {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => string;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}
