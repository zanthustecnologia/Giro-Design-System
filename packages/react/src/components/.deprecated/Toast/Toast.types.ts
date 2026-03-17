import { ReactNode } from 'react';

/** Tipos de toast disponíveis */
export type ToastType = 'success' | 'alert' | 'info';

/**
 * Representa uma mensagem de toast
 */
export interface ToastMessage {
  /** ID único da mensagem */
  id: string;
  
  /** Conteúdo da mensagem */
  message: string;
  
  /** Tipo visual do toast */
  type: ToastType;
  
  /** Define se o toast permanece até ser fechado manualmente */
  persistent?: boolean;
  
  /** Duração em milissegundos antes de auto-fechar */
  duration?: number;
  
  /** Timestamp de quando foi criado */
  timestamp: number;
}

/**
 * Opções para exibição do toast
 */
export interface ToastOptions {
  /** Define se o toast permanece até ser fechado manualmente */
  persistent?: boolean;
  
  /** Duração em milissegundos antes de auto-fechar */
  duration?: number;
}

/**
 * Contexto do sistema de toasts
 * @example
 * ```tsx
 * const { showToast, hideToast } = useToast();
 * 
 * showToast('Operação realizada com sucesso!', 'success');
 * ```
 */
export interface ToastContextType {
  /** Exibe um toast e retorna seu ID: (message, type?, options?) => string */
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => string;
  
  /** Oculta um toast específico: (id) => void */
  hideToast: (id: string) => void;
  
  /** Oculta todos os toasts: () => void */
  hideAllToasts: () => void;
}

/**
 * Props do componente ToastProvider
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 */
export interface ToastProviderProps {
  /** Conteúdo da aplicação */
  children: ReactNode;
}
