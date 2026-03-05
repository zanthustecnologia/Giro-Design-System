import * as React from 'react';

import { ToastProps } from '../components/Toast/Toast.types';
import { ToastContext } from '../contexts/ToastContext';

export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext deve ser usado dentro de ToastProvider');
  }
  return context;
};

export const useToast = () => {
  const { showToast, dismissToast } = useToastContext();

  return {
    showToast: (toast: Omit<ToastProps, 'id'>) => showToast(toast),
    dismissToast: (id: string) => dismissToast(id),
  };
};
