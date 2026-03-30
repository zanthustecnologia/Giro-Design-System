import { Info20Filled, CheckmarkCircle20Filled, Warning20Filled, Dismiss16Filled} from '@fluentui/react-icons';
import { Toast as ToastRadix } from 'radix-ui';
import * as React from "react";

import styles from './Toast.module.scss';
import { ToastProps } from './Toast.types';
import { useToastContext } from '../../hooks/useToast';

/**
 * Componente individual de notificação Toast.
 *
 * Consome o contexto do `ToastProvider` para gerenciar seu próprio ciclo de vida.
 * Cada instância recebe um `id` único gerado pelo provider e o utiliza para
 * se remover da fila ao ser fechada.
 *
 * Construído sobre `Toast.Root` do **Radix UI**, com suporte completo a
 * acessibilidade (ARIA) e gesto de swipe para a esquerda.
 *
 * @remarks
 * Este componente não deve ser usado diretamente. Utilize o hook `useToast`
 * para exibir toasts programaticamente.
 *
 * @example
 * ```tsx
 * // Uso indireto via hook (recomendado)
 * const { showToast } = useToast();
 *
 * showToast({
 *   title: 'Item salvo',
 *   iconType: 'Success',
 *   duration: 3000,
 * });
 * ```
 *
 * @param props - {@link ToastProps} combinadas com o `id` único do toast
 */
const Toast: React.FC<ToastProps & { id: string }> = ({ 
  id,
  title,
  duration = 5000,
  icon,
  iconClosed = <Dismiss16Filled />,
  automaticClose = true,
  iconType = "Info",
  ...restProps
}) => {
  const [open, setOpen] = React.useState(false);
  const { dismissToast } = useToastContext();

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && id) {
      setTimeout(() => dismissToast(id), 200);
    }
  };

  let displayIcon = icon;
  const effectiveDuration = automaticClose ? duration : Infinity;

  if (!icon) {
    if (iconType === 'Info') {
      displayIcon = <Info20Filled />;
    } else if (iconType === 'Success') {
      displayIcon = <CheckmarkCircle20Filled />;
    } else if (iconType === 'Alert') {
      displayIcon = <Warning20Filled />;
    }
  }

  return (
    <ToastRadix.Root 
      className={styles.toastRoot} 
      open={open} 
      onOpenChange={handleOpenChange} 
      duration={effectiveDuration}
      {...restProps}
    >
      <span className={`${styles.Icon} ${iconType ? styles[`icon${iconType}`] : ''}`} aria-hidden="true">
        {displayIcon}
      </span>
      <div className={styles.toastContent}>
        <ToastRadix.Title className={styles.toastTitle}> {title} </ToastRadix.Title>
      </div>
      <ToastRadix.Close className={styles.toastClose}> {iconClosed} </ToastRadix.Close>
    </ToastRadix.Root>
  );
};

export default Toast;
