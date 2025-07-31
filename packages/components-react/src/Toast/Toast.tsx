import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import clsx from 'clsx';
import './Toast.scss';
import { CheckmarkCircle20Filled, Dismiss16Regular, Warning20Filled, Info20Filled } from '@fluentui/react-icons';

/**
 * Tipos de toast disponíveis
 */
export type ToastType = 'success' | 'alert' | 'info';

/**
 * Interface para uma mensagem de toast
 */
export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  active: boolean;
  timeout: NodeJS.Timeout | null;
  closed: boolean;
  time: number | null;
  persistent: boolean;
}

/**
 * Interface para variant de toast
 */
interface ToastVariant {
  icon: React.ReactNode;
  className: string;
}

/**
 * Props do ToastProvider
 */
export interface ToastProviderProps {
  children: ReactNode;
  /** Tipo de toast (success, alert, info) */
  variant?: ToastType;
  /** Mensagem exibida ao montar o componente */
  message?: string;
  /** Se true, o toast só fecha ao clicar no X */
  persistent?: boolean;
  /** Tempo de exibição em ms (padrão: 5000) */
  duration?: number;
}

/**
 * Contexto do Toast
 */
interface ToastContextType {
  toast: (message: string, type?: ToastType, time?: number, persistent?: boolean) => void;
  clearToast: (id: string) => void;
}

/**
 * Evento customizado de toast
 */
interface ToastEvent extends CustomEvent {
  detail: ToastMessage;
}

/**
 * Ícones para cada tipo de toast.
 */
export const ToastSuccessIcon: React.FC = () => <CheckmarkCircle20Filled />;
export const ToastAlertIcon: React.FC = () => <Warning20Filled />;
export const ToastInfoIcon: React.FC = () => <Info20Filled />;

/**
 * Modelos de toast únicos.
 */
const toastVariants: Record<ToastType, ToastVariant> = {
  success: {
    icon: <ToastSuccessIcon />,
    className: 'zds-toast__success'
  },
  alert: {
    icon: <ToastAlertIcon />,
    className: 'zds-toast__alert'
  },
  info: {
    icon: <ToastInfoIcon />,
    className: 'zds-toast__info'
  }
};

const MAX_TOASTS = 5;

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Hook para gerenciar o estado dos toasts.
 */
function useToastState() {
  const [toastMessages, setToastMessages] = useState<ToastMessage[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const closeTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearToast = useCallback((id: string): void => {
    setToastMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      const index = newMessages.findIndex((message) => message.id === id);
      if (index === -1) return newMessages;
      
      newMessages[index].active = false;
      if (newMessages[index].timeout) {
        clearTimeout(newMessages[index].timeout!);
        newMessages[index].timeout = null;
      }
      
      // Close animation timeout
      const closeTimeout = setTimeout(() => {
        setToastMessages((prev) => {
          const arr = [...prev];
          const idx = arr.findIndex((msg) => msg.id === id);
          if (idx !== -1) arr[idx].closed = true;
          return arr;
        });
      }, 450);
      
      closeTimeoutsRef.current.push(closeTimeout);
      return newMessages;
    });
  }, []);

  return {
    toastMessages,
    setToastMessages,
    clearToast,
    timeoutsRef,
    closeTimeoutsRef
  };
}

/**
 * Props para o hook useToastEffects
 */
interface UseToastEffectsProps {
  setToastMessages: React.Dispatch<React.SetStateAction<ToastMessage[]>>;
  clearToast: (id: string) => void;
  timeoutsRef: React.MutableRefObject<NodeJS.Timeout[]>;
  closeTimeoutsRef: React.MutableRefObject<NodeJS.Timeout[]>;
  message?: string;
  variant?: ToastType;
  persistent?: boolean;
  duration?: number;
}

/**
 * Hook para lidar com efeitos colaterais dos toasts.
 */
function useToastEffects({
  setToastMessages,
  clearToast,
  timeoutsRef,
  closeTimeoutsRef,
  message,
  variant,
  persistent,
  duration
}: UseToastEffectsProps): void {
  useEffect(() => {
    const handleToastEvent = (event: Event): void => {
      const toastEvent = event as ToastEvent;
      
      setToastMessages((prevMessages) => {
        const activeToasts = prevMessages.filter((msg) => !msg.closed);
        if (activeToasts.length >= MAX_TOASTS) {
          const firstToast = activeToasts[0];
          if (firstToast && firstToast.id) {
            clearToast(firstToast.id);
          }
        }
        return [...prevMessages, toastEvent.detail];
      });

      // Ativa apenas o toast recém-adicionado
      setTimeout(() => {
        setToastMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          const index = newMessages.findIndex((message) => message.id === toastEvent.detail.id);
          if (index === -1) return newMessages;
          
          if (!newMessages[index].persistent && newMessages[index].time) {
            const time = setTimeout(() => {
              clearToast(toastEvent.detail.id);
            }, newMessages[index].time!);
            newMessages[index].timeout = time;
            timeoutsRef.current.push(time);
          }
          
          newMessages[index].active = true;
          return newMessages;
        });
      }, 150);
    };

    window.addEventListener('toast', handleToastEvent);
    
    return () => {
      window.removeEventListener('toast', handleToastEvent);
      timeoutsRef.current.forEach(clearTimeout);
      closeTimeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      closeTimeoutsRef.current = [];
    };
  }, [setToastMessages, clearToast, timeoutsRef, closeTimeoutsRef]);

  useEffect(() => {
    if (message) {
      toast(message, variant, duration, persistent);
    }
  }, [message, variant, persistent, duration]);
}

/**
 * Gera um ID único para o toast
 */
const ToastId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

/**
 * Função global para disparar um toast.
 */
const toast = (
  message: string, 
  type: ToastType = 'info', 
  time: number = 5000, 
  persistent: boolean = false
): void => {
  let toastType: ToastType = 'info';
  let toastTime: number | null = time;
  
  if (type === 'success') toastType = 'success';
  else if (type === 'alert') toastType = 'alert';

  if (persistent) {
    toastTime = null;
  }

  const event: ToastEvent = new CustomEvent('toast', {
    detail: {
      id: ToastId(),
      message,
      type: toastType,
      active: false,
      timeout: null,
      closed: false,
      time: toastTime,
      persistent
    }
  }) as ToastEvent;
  
  window.dispatchEvent(event);
};

/**
 * Props para o hook useToastProvider
 */
interface UseToastProviderProps {
  variant?: ToastType;
  message?: string;
  persistent?: boolean;
  duration?: number;
}

/**
 * Hook customizado para gerenciar o estado e efeitos dos toasts.
 */
function useToastProvider({ 
  variant = 'info', 
  message, 
  persistent = false, 
  duration = 5000 
}: UseToastProviderProps = {}) {
  const {
    toastMessages,
    setToastMessages,
    clearToast,
    timeoutsRef,
    closeTimeoutsRef
  } = useToastState();

  useToastEffects({
    setToastMessages,
    clearToast,
    timeoutsRef,
    closeTimeoutsRef,
    message,
    variant,
    persistent,
    duration
  });

  const getVariant = useCallback((type: ToastType): ToastVariant => {
    return toastVariants[type] || toastVariants.info;
  }, []);

  return {
    toastMessages,
    clearToast,
    getVariant
  };
}

/**
 * Provider de Toast que gerencia o estado e renderização dos toasts
 */
const ToastProvider: React.FC<ToastProviderProps> = ({ children, ...props }) => {
  const { toastMessages, clearToast, getVariant } = useToastProvider(props);

  const contextValue: ToastContextType = {
    toast,
    clearToast
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <div
        className={clsx('zds-toast__container', toastMessages.length > 0 && 'zds-toast__show')}
        role="status"
        aria-live="polite"
      >
        {toastMessages.map((toastMessage) => {
          if (toastMessage.closed) return null;
          
          const { icon, className } = getVariant(toastMessage.type || props.variant || 'info');
          
          return (
            <div
              key={toastMessage.id}
              className={clsx(
                'zds-toast__item',
                className,
                toastMessage.active && 'zds-toast__active'
              )}
            >
              <span className="zds-toast__icon">
                {icon}
              </span>
              <span className="zds-toast__message">{toastMessage.message}</span>
              <button
                type="button"
                className="zds-toast__close"
                aria-label="Fechar toast"
                aria-atomic="true"
                onClick={() => clearToast(toastMessage.id)}
              >
                <Dismiss16Regular />
              </button>
            </div>
          );
        })}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Hook para acessar o contexto de toast.
 */
const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, toast, useToast };
export default ToastProvider;