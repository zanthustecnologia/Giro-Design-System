import { Info20Filled, CheckmarkCircle20Filled, Warning20Filled, Dismiss16Filled} from '@fluentui/react-icons';
import { Toast as ToastRadix } from 'radix-ui';
import * as React from "react";

import styles from './Toast.module.scss';
import { ToastProps } from './Toast.types';

const Toast: React.FC<ToastProps> = ({ 
  children,
  titulo = 'Titulo',
  descricao,
  acao,
  duration,
  icon,
  iconClosed = <Dismiss16Filled />,
  automaticClose = true,
  iconType,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleTrigger = () => {
    setOpen(false);
    setTimeout(() => setOpen(true), 100);
  };

  const trigger = React.isValidElement(children)
    ? React.cloneElement(children, { onClick: handleTrigger } as any)
    : children;

  if (!automaticClose) {
    duration = Infinity; 
  }

  if (iconType === 'Info') {
    icon = <Info20Filled />;
  } else if (iconType === 'Sucess') {
    icon = <CheckmarkCircle20Filled />;
  } else if (iconType === 'Alert') {
    icon = <Warning20Filled />;
  }

  return (
    <ToastRadix.Provider  swipeDirection="left">
      {trigger}
      <ToastRadix.Root 
        className={styles.toastRoot} 
        open={open} 
        onOpenChange={setOpen} 
        duration={duration}
      >
          <span className={`${styles.Icon} ${iconType ? styles[`Icon${iconType}`] : ''}`} aria-hidden="true">
            {icon}
          </span>
          <div>
            <ToastRadix.Title className={styles.ToastTitle}> {titulo} </ToastRadix.Title>
            <ToastRadix.Description className={styles.ToastDescription}> {descricao} </ToastRadix.Description>
          </div>
          {/* <ToastRadix.Action className={styles.ToastAction} altText='a'> {acao} </ToastRadix.Action> */}
          <ToastRadix.Close className={styles.ToastClose}> {iconClosed} </ToastRadix.Close>
      </ToastRadix.Root>

      <ToastRadix.Viewport className={styles.ToastViewport} />
    </ToastRadix.Provider>
  );
};

export default Toast;
