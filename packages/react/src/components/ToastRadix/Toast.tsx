import { Toast as ToastRadix } from 'radix-ui';
import { Info16Regular, CheckmarkCircle16Color, Warning16Regular} from '@fluentui/react-icons';
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
  close = 'Fechar',
  duration,
  icon,
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
        className="ToastRoot" 
        open={open} 
        onOpenChange={setOpen} 
        duration={duration}
      >
          <span className={styles.buttonIconLeft} aria-hidden="true">
            {icon}
          </span>
          <ToastRadix.Title className="ToastTitle"> {titulo} </ToastRadix.Title>
          <ToastRadix.Description className="ToastDescription"> {descricao} </ToastRadix.Description>
          <ToastRadix.Action className="ToastAction" altText='a'> {acao} </ToastRadix.Action>
          <ToastRadix.Close> {close} </ToastRadix.Close>
      </ToastRadix.Root>

      <ToastRadix.Viewport className="ToastViewport" />
    </ToastRadix.Provider>
  );
};

export default Toast;
