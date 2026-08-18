import clsx from 'clsx';
import { Toggle as ToggleRadix } from 'radix-ui';
import React from 'react';

import Tooltip from '../../Tooltip';
import styles from '../ToggleButton.module.scss';

import type { ToggleButtonProps } from '../ToggleButton.types';

const Toggle: React.FC<ToggleButtonProps> = ({
  pressed,
  defaultPressed,
  onPressedChange,
  disabled = false,
  className,
  label,
  id,
  size = 'lg',
  scale = 1,
  style,
  tooltipText,
  tooltipSide = 'top',
  tooltipAlign = 'center',
  icon,
  iconOnly = false,
  mode: _mode,
  selectionType: _type,
  value: _value,
  defaultValue: _defaultValue,
  onValueChange: _onValueChange,
  items: _items,
  ...rest
}) => {
  const toggle = (
    <ToggleRadix.Root
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
      className={clsx(
        styles.toggle,
        styles[`toggle-${size}`],
        {
          [styles.toggleIconOnly]: iconOnly,
          [styles.toggleWithIcon]: !!icon && !iconOnly,
        },
        className,
      )}
      id={id}
      style={{ '--giro-scale': scale, ...style } as React.CSSProperties}
      {...rest}
    >
      {iconOnly ? (
        <span className={styles.toggleIconLeft} aria-hidden="true">{icon}</span>
      ) : (
        <>
          {icon && <span className={styles.toggleIconLeft} aria-hidden="true">{icon}</span>}
          {label}
        </>
      )}
    </ToggleRadix.Root>
  );

  if (tooltipText) {
    return (
      <Tooltip text={tooltipText} side={tooltipSide} align={tooltipAlign}>
        {toggle}
      </Tooltip>
    );
  }

  return toggle;
};

export default Toggle;

