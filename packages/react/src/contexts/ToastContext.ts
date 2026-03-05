import * as React from 'react';

import { ToastProps } from '../components/Toast/Toast.types';

/**
 * Valor disponibilizado pelo contexto do sistema de Toast.
 *
 * Acessível via `useToast()` em componentes filhos do `ToastProvider`.
 *
 * @see {@link useToast}
 */
export interface ToastContextValue {
  /** Lista de toasts atualmente visíveis na tela. */
  toasts: ToastProps[];
  /**
   * Exibe um novo toast na tela.
   *
   * Gera um `id` único automaticamente e adiciona o toast à fila.
   * Quando o limite de `maxToasts` é atingido, o toast mais antigo é removido.
   *
   * @param toast - Propriedades do toast a ser exibido (sem `id`).
   */
  showToast: (toast: Omit<ToastProps, 'id'>) => void;
  /**
   * Remove um toast específico da tela pelo seu `id`.
   *
   * @remarks
   * Geralmente não é necessário chamar este método manualmente, pois os toasts
   * se fecham automaticamente (via `duration`) ou pelo botão de fechar do usuário.
   *
   * @param id - ID único do toast a ser removido.
   */
  dismissToast: (id: string) => void;
}

/**
 * Contexto React que armazena o estado e as ações do sistema de Toast.
 *
 * @remarks
 * Não consuma este contexto diretamente. Utilize o hook `useToast()` para
 * acessar as funcionalidades de forma segura e com verificação de provider.
 *
 * @see {@link ToastContextValue}
 * @see {@link useToast}
 */
export const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);
