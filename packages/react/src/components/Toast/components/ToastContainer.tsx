import { Toast as ToastRadix } from 'radix-ui';
import * as React from 'react';

import { useToastContext } from '../../../hooks/useToast';
import Toast from '../Toast';
import styles from '../Toast.module.scss';

/**
 * Componente responsável por renderizar todos os toasts ativos na tela.
 *
 * Lê a lista de toasts do contexto fornecido pelo `ToastProvider` e os
 * renderiza individualmente. Configura o `Toast.Provider` do Radix UI com
 * direção de swipe para a esquerda.
 *
 * @remarks
 * - Deve ser posicionado **dentro** do `ToastProvider`.
 * - Geralmente é colocado próximo à raiz da aplicação, após os demais filhos.
 * - Toasts sem `id` são ignorados automaticamente.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 *   <ToastContainer /> {/* Deve estar aqui *\/}
 * </ToastProvider>
 * ```
 */
export const ToastContainer: React.FC = () => {
  const { toasts } = useToastContext();

  return (
    <ToastRadix.Provider swipeDirection="left">
      {toasts.map((toast) => {
        if (!toast.id) return null;
        return <Toast key={toast.id} id={toast.id} {...toast} />;
      })}
      <ToastRadix.Viewport className={styles.toastViewport} />
    </ToastRadix.Provider>
  );
};

ToastContainer.displayName = 'ToastContainer';
