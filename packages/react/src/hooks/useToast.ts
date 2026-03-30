import * as React from 'react';

import { ToastProps } from '../components/Toast/Toast.types';
import { ToastContext } from '../contexts/ToastContext';

/**
 * Hook interno que acessa o `ToastContext` diretamente.
 *
 * @throws {Error} Lança um erro se utilizado fora de um `ToastProvider`:
 * *"useToastContext deve ser usado dentro de ToastProvider"*
 *
 * @returns O valor completo do contexto — `toasts`, `showToast` e `dismissToast`.
 *
 * @internal
 */
export const useToastContext = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext deve ser usado dentro de ToastProvider');
  }
  return context;
};

/**
 * Hook para exibir e remover toasts na aplicação.
 *
 * O componente que usa este hook deve ser filho de um `ToastProvider`.
 *
 * @throws {Error} Lança um erro se utilizado fora de um `ToastProvider`:
 * *"useToastContext deve ser usado dentro de ToastProvider"*
 *
 * @returns Objeto com os métodos `showToast` e `dismissToast`.
 *
 * @example
 * ```tsx
 * import { useToast } from '@giro-ds/react';
 *
 * function MeuComponente() {
 *   const { showToast } = useToast();
 *
 *   const handleSalvar = async () => {
 *     try {
 *       await salvarDados();
 *       showToast({ title: 'Sucesso!', iconType: 'Success', duration: 3000 });
 *     } catch (err) {
 *       showToast({ title: 'Erro ao salvar', iconType: 'Alert', automaticClose: false });
 *     }
 *   };
 *
 *   return <button onClick={handleSalvar}>Salvar</button>;
 * }
 * ```
 */
export const useToast = () => {
  const { showToast, dismissToast } = useToastContext();

  return {
    showToast: (toast: Omit<ToastProps, 'id'>) => showToast(toast),
    dismissToast: (id: string) => dismissToast(id),
  };
};
