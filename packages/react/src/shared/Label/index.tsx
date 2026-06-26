import * as React from 'react';
import { Label } from 'radix-ui';
import styles from './index.module.scss';
import clsx from 'clsx';
import Tooltip from '../../components/Tooltip/Tooltip';
import { Info12Regular } from '@fluentui/react-icons';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
  className?: string;
  tooltipText?: string;
  tooltip?: boolean;
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end";
  error?: boolean;
  disabled?: boolean;
  scale?: number;
}

const LabelComponent = ({
  children,
  htmlFor,
  required = false,
  tooltip = false,
  tooltipText,
  side = 'bottom',
	align = 'start',
  className,
  error = false,
  disabled = false,
  scale = 1,
}: LabelProps) => {
  const containerStyle = {
    '--label-scale': scale,
  } as React.CSSProperties;

  const container = (
    <div
      className={clsx(styles.labelContainer, disabled && styles.disabledContainer)}
      style={containerStyle}
    >
      <Label.Root
        className={clsx(
          styles.wrapperLabel,
          error && !disabled && styles.errorLabel,
          disabled && styles.disabledLabel,
          className
        )}
        htmlFor={htmlFor}
      >
        {children}
        {required && <span className={styles.requiredLabel}>*</span>}
      </Label.Root>
      {tooltip && (
        <span
          className={
            disabled ? styles.disabledIcon : error ?
            styles.errorIcon : styles.infoIcon
          }
        >
          <Info12Regular />
        </span>
      )}
    </div>
  );

  if (tooltip) {
    return (
      <Tooltip side={side} align={align} text={tooltipText || ''}>
        {container}
      </Tooltip>
    );
  }

  return container;
};

export default LabelComponent;
