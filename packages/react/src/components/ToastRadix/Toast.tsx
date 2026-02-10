import { Info16Regular, CheckmarkCircle16Color, Warning16Regular, Dismiss16Filled} from '@fluentui/react-icons';
import { Toast as ToastRadix } from 'radix-ui';
import * as React from "react";

import styles from './Toast.module.scss';
import { ToastProps } from './Toast.types';
import Button from '../Button/Button';

const Toast: React.FC<ToastProps> = ({ 
  children,
  message = 'Show Toast',
  titulo = 'Titulo',
  descricao = 'Descrição',
  acao = 'Ação',
  duration,
  icon,
  iconClosed = <Dismiss16Filled />,
  automaticClose = true,
  iconType,
}) => {
  const [open, setOpen] = React.useState(false);

  if (!automaticClose) {
    duration = Infinity; 
  }

  if (iconType === 'Info') {
    icon = <Info16Regular />;
  } else if (iconType === 'Sucess') {
    icon = <CheckmarkCircle16Color />;
  } else if (iconType === 'Alert') {
    icon = <Warning16Regular />;
  }

  return (
    <ToastRadix.Provider swipeDirection="right">
      <Button
        onClick={() => {
          setOpen(false);
          setTimeout(() => setOpen(true), 100);
          }}
      >
        {message}  
      </Button>
      <ToastRadix.Root 
        className={styles.toastRoot} 
        open={open} 
        onOpenChange={setOpen} 
        duration={duration}
      >
          <span className={styles.Icon} aria-hidden="true">
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
