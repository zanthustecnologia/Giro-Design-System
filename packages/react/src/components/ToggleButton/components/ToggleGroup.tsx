import clsx from 'clsx';
import { ToggleGroup as ToggleGroupRadix } from 'radix-ui';
import React from 'react';

import styles from '../ToggleButton.module.scss';

import type { ToggleButtonProps } from '../ToggleButton.types';

const ToggleGroup: React.FC<ToggleButtonProps> = ({
  type = 'single',
  value,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  disabled = false,
  items = [],
  children,
  className,
  id,
  // Toggle-specific props — descartadas para não serem passadas ao DOM
  pressed: _pressed,
  defaultPressed: _defaultPressed,
  onPressedChange: _onPressedChange,
  ...rest
}) => {
  const rootProps =
    type === 'multiple'
      ? {
          type: 'multiple' as const,
          value: value as string[] | undefined,
          defaultValue: defaultValue as string[] | undefined,
          onValueChange: onValueChange as
            | ((value: string[]) => void)
            | undefined,
        }
      : {
          type: 'single' as const,
          value: value as string | undefined,
          defaultValue: defaultValue as string | undefined,
          onValueChange: onValueChange as
            | ((value: string) => void)
            | undefined,
        };

  return (
    <ToggleGroupRadix.Root
      {...rootProps}
      orientation={orientation}
      disabled={disabled}
      className={clsx(styles.group, className)}
      id={id}
      {...rest}
    >
      {children ??
        items.map((item) => (
          <ToggleGroupRadix.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={styles.item}
          >
            {item.icon}
            {item.label}
          </ToggleGroupRadix.Item>
        ))}
    </ToggleGroupRadix.Root>
  );
};

export default ToggleGroup;
