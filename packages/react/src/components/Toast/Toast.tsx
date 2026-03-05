import { Info20Filled, CheckmarkCircle20Filled, Warning20Filled, Dismiss16Filled} from '@fluentui/react-icons';
import { Toast as ToastRadix } from 'radix-ui';
import * as React from "react";

import styles from './Toast.module.scss';
import { ToastProps } from './Toast.types';
import { useToastContext } from '../../hooks/useToast';

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
