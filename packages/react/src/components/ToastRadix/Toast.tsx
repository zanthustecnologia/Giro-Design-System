import { Info20Filled, CheckmarkCircle20Filled, Warning20Filled, Dismiss16Filled} from '@fluentui/react-icons';
import { Toast as ToastRadix } from 'radix-ui';
import * as React from "react";

import styles from './Toast.module.scss';
import { ToastProps } from './Toast.types';
import { useToastContext } from './useToast';

const Toast: React.FC<ToastProps> = ({ 
  id,
  titulo = 'Titulo',
  descricao,
  duration = 5000,
  icon,
  iconClosed = <Dismiss16Filled />,
  automaticClose = true,
  iconType = "Info",
}) => {
  const [open, setOpen] = React.useState(false);
  const { dismissToast } = useToastContext();

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && id) {
      // Pequeno delay para a animação de saída
      setTimeout(() => dismissToast(id), 200);
    }
  };

  let displayIcon = icon;
  const effectiveDuration = automaticClose ? duration : Infinity;

  if (!icon) {
    if (iconType === 'Info') {
      displayIcon = <Info20Filled />;
    } else if (iconType === 'Sucess') {
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
    >
      <span className={`${styles.Icon} ${iconType ? styles[`Icon${iconType}`] : ''}`} aria-hidden="true">
        {displayIcon}
      </span>
      <div>
        <ToastRadix.Title className={styles.ToastTitle}> {titulo} </ToastRadix.Title>
        {descricao && <ToastRadix.Description className={styles.ToastDescription}> {descricao} </ToastRadix.Description>}
      </div>
      <ToastRadix.Close className={styles.ToastClose}> {iconClosed} </ToastRadix.Close>
    </ToastRadix.Root>
  );
};

export default Toast;
