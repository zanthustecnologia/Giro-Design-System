import * as React from 'react';

import { ToastContext } from '../../../contexts/ToastContext';
import { ToastProps } from '../Toast.types';

/**
 * Provider que gerencia o estado global dos toasts na aplicação.
 *
 * Deve envolver toda a árvore de componentes que precisará exibir toasts.
 * Disponibiliza o contexto com `showToast` e `dismissToast` para todos os
 * componentes filhos via `useToast()`.
 *
 * @remarks
 * O `ToastContainer` deve ser renderizado **dentro** do `ToastProvider`.
 *
 * @example
 * ```tsx
 * // App.tsx ou layout principal
 * import { ToastProvider, ToastContainer } from '@giro-ds/react';
 *
 * function App() {
 *   return (
 *     <ToastProvider maxToasts={5}>
 *       <Routes />
 *       <ToastContainer />
 *     </ToastProvider>
 *   );
 * }
 * ```
 *
 * @param children - Árvore de componentes filhos da aplicação.
 * @param maxToasts - Número máximo de toasts exibidos simultaneamente.
 *   Quando o limite é excedido, o toast mais antigo é removido automaticamente.
 *   @default 5
 */
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
