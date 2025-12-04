import * as React from 'react';
import { Label } from 'radix-ui';
import styles from './index.module.scss';
import clsx from 'clsx';
import Tooltip from '../../components/Tooltip';
import { Info12Regular } from '@fluentui/react-icons';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
  className?: string;
  tooltipMessage?: string;
  tooltip?: boolean;
  error?: boolean;
  disabled?: boolean;
}

const LabelComponent = ({
  children,
  htmlFor,
  required = false,
  tooltip = false,
  tooltipMessage,
  className,
  error = false,
  disabled = false
}: LabelProps) => (
  <div className={styles.containerLabel}>
    {tooltip ? (
      <Tooltip position="top-left" text={tooltipMessage || ''} >
        <Label.Root
          className={clsx(
            styles.wrapperLabel,
            error && styles.errorLabel,
            className
          )}
          htmlFor={htmlFor}
        >
          {children}
          {required && <span className={styles.requiredLabel}>*</span>}
          <Info12Regular className={styles.infoIcon} />
        </Label.Root>
      </Tooltip>
    ) : (
      <Label.Root
        className={clsx(
          styles.wrapperLabel,
          error && styles.errorLabel,
          disabled && styles.disabledLabel,
          className
        )}
        htmlFor={htmlFor}
      >
        {children}
        {required && <span className={styles.requiredLabel}>*</span>}
      </Label.Root>
    )}
  </div>
);

export default LabelComponent;
