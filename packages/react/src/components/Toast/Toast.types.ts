import { Toast } from 'radix-ui';
import * as React from 'react';

import { BaseProps } from '../../types';

/**
 * Props do componente individual de notificação `Toast`.
 *
 * Estende {@link BaseProps} e os atributos nativos do `Toast.Root` do Radix UI,
 * excluindo as propriedades controladas internamente (`open`, `onOpenChange`,
 * `duration`, `className`).
 *
 * @example
 * ```tsx
 * showToast({
 *   title: 'Sucesso!',
 *   iconType: 'Success',
 *   duration: 3000,
 * });
 * ```
 */
export interface ToastProps extends 
  BaseProps,
  Omit<
    React.ComponentPropsWithoutRef<typeof Toast.Root>,
    'open' | 'onOpenChange' | 'duration' | 'className'
  > {
  /**
   * Título principal exibido no toast.
   */
  title: string;
  /**
   * Define se o toast fecha automaticamente após o tempo definido em `duration`.
   * @default true
   */
  automaticClose?: boolean;
  /**
   * Tempo em milissegundos até o toast fechar automaticamente.
   * Só tem efeito quando `automaticClose` é `true`.
   * @default 5000
   */
  duration?: number;
  /**
   * Ícone customizado exibido no toast.
   * Quando fornecido, substitui o ícone gerado automaticamente por `iconType`.
   */
  icon?: React.ReactNode;
  /**
   * Ícone exibido no botão de fechar o toast.
   * @default <Dismiss16Filled />
   */
  iconClosed?: React.ReactNode;
  /**
   * Tipo do ícone exibido automaticamente no toast.
   *
   * - `'Info'` → ícone informativo (`Info20Filled`)
   * - `'Success'` → ícone de sucesso (`CheckmarkCircle20Filled`)
   * - `'Alert'` → ícone de alerta/erro (`Warning20Filled`)
   *
   * Ignorado quando a prop `icon` for fornecida.
   * @default 'Info'
   */
  iconType?: 'Info' | 'Success' | 'Alert';
}