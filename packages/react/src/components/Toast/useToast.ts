import * as React from 'react';

import { ToastContext } from './context';
import { ToastMessage } from './Toast.types';

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
    showToast: (toast: Omit<ToastMessage, 'id'>) => showToast(toast),
    dismissToast: (id: string) => dismissToast(id),
  };
};
