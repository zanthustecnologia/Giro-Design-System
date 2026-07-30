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
  children,
  id,
  size = 'lg',
  scale = 1,
  style,
  tooltipText,
  tooltipSide = 'top',
  tooltipAlign = 'center',
  // ToggleGroup-specific props — descartadas para não serem passadas ao DOM
  selectionType: _type,
  value: _value,
  defaultValue: _defaultValue,
  onValueChange: _onValueChange,
  orientation: _orientation,
  items: _items,
  ...rest
}) => {
  const toggle = (
    <ToggleRadix.Root
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      disabled={disabled}
      className={clsx(styles.toggle, styles[`toggle-${size}`], className)}
      id={id}
      style={{ '--giro-scale': scale, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
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

