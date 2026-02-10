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
  close = 'Fechar',
  duration,
  automaticClose = true,
}) => {
  const [open, setOpen] = React.useState(false);

  if (!automaticClose) {
    duration = Infinity; 
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
          <ToastRadix.Title className="ToastTitle"> {titulo} </ToastRadix.Title>
          <ToastRadix.Description className="ToastDescription"> {descricao} </ToastRadix.Description>
          <ToastRadix.Action className="ToastAction" altText='funcionaaaaaa'> {acao} </ToastRadix.Action>
          <ToastRadix.Close> {close} </ToastRadix.Close>
      </ToastRadix.Root>

      <ToastRadix.Viewport className="ToastViewport" />
    </ToastRadix.Provider>
  );
};

export default Toast;
