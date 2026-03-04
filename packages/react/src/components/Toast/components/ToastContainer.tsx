import { Toast as ToastRadix } from 'radix-ui';
import * as React from 'react';

import Toast from '../Toast';
import styles from '../Toast.module.scss';
import { useToastContext } from '../useToast';

export const ToastContainer: React.FC = () => {
  const { toasts } = useToastContext();

  return (
    <ToastRadix.Provider swipeDirection="left">
      {toasts.map((toast) => {
        if (!toast.id) return null;
        return <Toast key={toast.id} id={toast.id} {...toast} />;
      })}
      <ToastRadix.Viewport className={styles.toastViewport} />
    </ToastRadix.Provider>
  );
};

ToastContainer.displayName = 'ToastContainer';
