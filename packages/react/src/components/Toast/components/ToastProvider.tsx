import * as React from 'react';

import { ToastContext } from '../context';
import { ToastProps } from '../Toast.types';

export const ToastProvider: React.FC<{ children: React.ReactNode; maxToasts?: number }> = ({ 
  children, 
  maxToasts = 5 
}) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const showToast = React.useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastProps = { ...toast, id };

    setToasts((prevToasts) => {
      const updatedToasts = [...prevToasts, newToast];
      if (updatedToasts.length > maxToasts) {
        return updatedToasts.slice(updatedToasts.length - maxToasts);
      }
      return updatedToasts;
    });
  }, [maxToasts]);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const value = React.useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';
