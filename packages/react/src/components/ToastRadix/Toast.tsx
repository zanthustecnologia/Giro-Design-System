import { Toast as ToastRadix } from 'radix-ui';
import * as React from "react";
import styles from './Toast.module.scss';
import { ToastProps } from './Toast.types';

const Toast: React.FC<ToastProps> = ({ children }) => {
  return (
    <ToastRadix.Provider>
      {children}
      <ToastRadix.Root>
        <ToastRadix.Title />
        <ToastRadix.Description />
        {/* <ToastRadix.Action /> */}
        <ToastRadix.Close />
      </ToastRadix.Root>

      <ToastRadix.Viewport />
    </ToastRadix.Provider>
  );
};

export default Toast;
