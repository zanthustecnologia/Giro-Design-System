// ✅ NOVA IMPLEMENTAÇÃO SIMPLIFICADA
import React, { createContext, useContext, useState, useCallback, useRef, useEffect, useMemo, ReactNode } from 'react';
import clsx from 'clsx';
import './Toast.scss';
import {
  CheckmarkCircle20Filled,
  Dismiss16Regular,
  Warning20Filled,
  Info20Filled,
} from '@fluentui/react-icons';

export type ToastType = 'success' | 'alert' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  persistent?: boolean;
  duration?: number;
  timestamp: number;
}

export interface ToastOptions {
  persistent?: boolean;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => string;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

const sanitizeMessage = (message: string): string => {
  if (typeof message !== 'string') return 'Mensagem inválida';
  
  return message
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/&/g, '&amp;')
    .slice(0, 500); 
};

const generateId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

const MAX_TOASTS = 5;
const DEFAULT_DURATION = 5000;

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const toastVariants = {
  success: {
    icon: <CheckmarkCircle20Filled />,
    className: 'zds-toast__success',
  },
  alert: {
    icon: <Warning20Filled />,
    className: 'zds-toast__alert',
  },
  info: {
    icon: <Info20Filled />,
    className: 'zds-toast__info',
  },
} as const;

interface ToastItemProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
  isVisible: boolean;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose, isVisible }) => {
  const variant = toastVariants[toast.type];
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose(toast.id);
    }
  };

  return (
    <div
      className={clsx(
        'zds-toast__item',
        variant.className,
        isVisible && 'zds-toast__active'
      )}
      role={toast.type === 'alert' ? 'alert' : 'status'}
      aria-live={toast.type === 'alert' ? 'assertive' : 'polite'}
      aria-atomic="true"
      tabIndex={toast.persistent ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <span className="zds-toast__icon" aria-hidden="true">
        {variant.icon}
      </span>
      <span 
        className="zds-toast__message"
        dangerouslySetInnerHTML={{ __html: sanitizeMessage(toast.message) }}
      />
      <button
        type="button"
        className="zds-toast__close"
        aria-label={`Fechar notificação: ${toast.message.slice(0, 50)}${toast.message.length > 50 ? '...' : ''}`}
        onClick={() => onClose(toast.id)}
      >
        <Dismiss16Regular aria-hidden="true" />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
  visibleToasts: Set<string>;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose, visibleToasts }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="zds-toast__container"
      role="log"
      aria-label="Notificações do sistema"
    >
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={onClose}
          isVisible={visibleToasts.has(toast.id)}
        />
      ))}
    </div>
  );
};

export interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  maxToasts = MAX_TOASTS 
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [visibleToasts, setVisibleToasts] = useState<Set<string>>(new Set());
  const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const clearToastTimeout = useCallback((id: string) => {
    const timeoutId = timeouts.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeouts.current.delete(id);
    }
  }, []);

  const showToast = useCallback((
    message: string, 
    type: ToastType = 'info', 
    options: ToastOptions = {}
  ): string => {
    const id = generateId();
    const sanitizedMessage = sanitizeMessage(message);
    
    if (!sanitizedMessage || sanitizedMessage === 'Mensagem inválida') {
      console.warn('Toast: Mensagem inválida ou vazia');
      return '';
    }

    const newToast: ToastMessage = {
      id,
      message: sanitizedMessage,
      type,
      persistent: options.persistent || false,
      duration: options.duration || DEFAULT_DURATION,
      timestamp: Date.now(),
    };

    // ✅ LIMITE DE TOASTS
    setToasts(prev => {
      const filtered = prev.slice(-(maxToasts - 1));
      return [...filtered, newToast];
    });

    // ✅ ANIMAÇÃO DE ENTRADA
    setTimeout(() => {
      setVisibleToasts(prev => new Set([...prev, id]));
    }, 50);

    // ✅ AUTO-HIDE SE NÃO FOR PERSISTENTE
    if (!newToast.persistent) {
      const timeoutId = setTimeout(() => {
        hideToast(id);
      }, newToast.duration);
      
      timeouts.current.set(id, timeoutId);
    }

    return id;
  }, [maxToasts]);

  const hideToast = useCallback((id: string) => {
    clearToastTimeout(id);
    
    // ✅ ANIMAÇÃO DE SAÍDA
    setVisibleToasts(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });

    // ✅ REMOÇÃO APÓS ANIMAÇÃO
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 450);
  }, [clearToastTimeout]);

  const hideAllToasts = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current.clear();
    
    setVisibleToasts(new Set());
    setTimeout(() => {
      setToasts([]);
    }, 450);
  }, []);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current.clear();
    };
  }, []);

  const contextValue = useMemo<ToastContextType>(() => ({
    showToast,
    hideToast,
    hideAllToasts,
  }), [showToast, hideToast, hideAllToasts]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onClose={hideToast}
        visibleToasts={visibleToasts}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};


export const Toast = (() => {
  let toastContext: ToastContextType | null = null;
  
  const setContext = (context: ToastContextType) => {
    toastContext = context;
  };
  
  const show = (message: string, type: ToastType = 'info', options?: ToastOptions) => {
    if (!toastContext) {
      console.error('Toast context not available. Make sure ToastProvider is mounted.');
      return '';
    }
    return toastContext.showToast(message, type, options);
  };
  
  return { show, setContext };
})();

export default ToastProvider;