import clsx from 'clsx';
import { ToggleGroup as ToggleGroupRadix } from 'radix-ui';
import React from 'react';

import Tooltip from '../../Tooltip';
import styles from '../ToggleButton.module.scss';

import type { ToggleButtonProps } from '../ToggleButton.types';

const ToggleGroup: React.FC<ToggleButtonProps> = ({
  selectionType = 'single',
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  items = [],
  className,
  id,
  size = 'lg',
  scale = 1,
  style,
  tooltipText,
  tooltipSide = 'top',
  tooltipAlign = 'center',
  mode: _mode,
  icon: _icon,
  iconOnly: _iconOnly,
  pressed: _pressed,
  defaultPressed: _defaultPressed,
  onPressedChange: _onPressedChange,
  ...rest
}) => {
  const rootProps =
    selectionType === 'multiple'
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

  const hasExpandableItems = items.some((item) => item.expandOnSelect);

  const group = (
    <ToggleGroupRadix.Root
      {...rootProps}
      disabled={disabled}
      className={clsx(styles.group, { [styles.groupExpandable]: hasExpandableItems }, className)}
      id={id}
      style={{ '--giro-scale': scale, ...style } as React.CSSProperties}
      {...rest}
    >
      {items.map((item) => (
        <ToggleGroupRadix.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={clsx(
            styles.item,
            styles[`item-${size}`],
            {
              [styles.toggleIconOnly]: item.iconOnly && !item.expandOnSelect,
              [styles.toggleWithIcon]: !!item.icon && !item.iconOnly && !item.expandOnSelect,
              [styles.itemExpandOnSelect]: item.expandOnSelect,
            },
          )}
          style={{ '--giro-scale': scale } as React.CSSProperties}
        >
          {item.expandOnSelect ? (
            <>
              {item.icon && <span className={styles.toggleIconLeft} aria-hidden="true">{item.icon}</span>}
              <span className={styles.toggleLabel}>{item.label}</span>
            </>
          ) : item.iconOnly ? (
            <span className={styles.toggleIconLeft} aria-hidden="true">{item.icon}</span>
          ) : (
            <>
              {item.icon && <span className={styles.toggleIconLeft} aria-hidden="true">{item.icon}</span>}
              {item.label}
            </>
          )}
        </ToggleGroupRadix.Item>
      ))}
    </ToggleGroupRadix.Root>
  );

  if (tooltipText) {
    return (
      <Tooltip text={tooltipText} side={tooltipSide} align={tooltipAlign}>
        {group}
      </Tooltip>
    );
  }

  return group;
};

export default ToggleGroup;
