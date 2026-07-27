import { ChevronDown16Regular } from '@fluentui/react-icons';
import clsx from "clsx";
import React, { useId, useCallback, useState, useEffect } from "react";

import styles from './ListItem.module.scss';
import Checkbox from '../Checkbox/Checkbox';

import type { ListItemVariant, ListItemProps } from './ListItem.types';

const ListItem: React.FC<ListItemProps> = ({
  id,
  className,
  variant = 'text',
  text,
  subText,
  disabled = false,
  checked = false,
  selected = false,
  onClick,
  onChange,
  icon,
  hovered = true,
  width,
  scale = 1,
  children,
  defaultExpanded = false,
  expanded,
  onExpandedChange,
  ...rest
}) => {
  const componentId = useId();
  const itemId = id || componentId;
  const [internalChecked, setInternalChecked] = useState<boolean>(checked);
  const [internalSelected, setInternalSelected] = useState<boolean>(selected);
  const [internalExpanded, setInternalExpanded] = useState<boolean>(expanded ?? defaultExpanded);
  const [childrenCheckedMap, setChildrenCheckedMap] = useState<Record<number, boolean>>({});

  const childrenCount = variant === 'checkbox' ? React.Children.count(children) : 0;
  const checkedCount = Object.values(childrenCheckedMap).filter(Boolean).length;
  const isIndeterminate = childrenCount > 0 && checkedCount > 0 && checkedCount < childrenCount;

  const handleCheckboxClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    const newChecked = isIndeterminate ? true : !internalChecked;
    setInternalChecked(newChecked);
    if (childrenCount > 0) {
      const newMap: Record<number, boolean> = {};
      for (let i = 0; i < childrenCount; i++) newMap[i] = newChecked;
      setChildrenCheckedMap(newMap);
    }
    onChange?.(newChecked);
    onClick?.(e);
  }, [disabled, internalChecked, isIndeterminate, childrenCount, onChange, onClick]);

  const handleTextOrIconClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    const newSelected = !internalSelected;
    setInternalSelected(newSelected);
    onClick?.(e);
  }, [disabled, internalSelected, onClick]);

  const handleChildChange = useCallback((index: number, childChecked: boolean): void => {
    setChildrenCheckedMap(prev => {
      const next = { ...prev, [index]: childChecked };
      const total = childrenCount;
      const checked = Object.values(next).filter(Boolean).length;
      if (checked === 0) {
        setInternalChecked(false);
        onChange?.(false);
      } else if (checked === total) {
        setInternalChecked(true);
        onChange?.(true);
      }
      return next;
    });
  }, [childrenCount, onChange]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    switch (variant) {
      case 'checkbox':
        handleCheckboxClick(e as React.MouseEvent<HTMLElement>);
        break;
      case 'text':
      case 'icon':
      default:
        handleTextOrIconClick(e as React.MouseEvent<HTMLElement>);
        break;
    }
  }, [variant, handleCheckboxClick, handleTextOrIconClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      switch (variant) {
        case 'checkbox':
          handleCheckboxClick(e);
          break;
        case 'text':
        case 'icon':
        default:
          handleTextOrIconClick(e);
          break;
      }
    }
  }, [disabled, variant, handleCheckboxClick, handleTextOrIconClick]);

  const handleToggleExpand = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (disabled) return;
    const newExpanded = !internalExpanded;
    setInternalExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  }, [disabled, internalExpanded, onExpandedChange]);

  useEffect(() => {
    setInternalChecked(checked);
  }, [checked]);

  useEffect(() => {
    setInternalSelected(selected);
  }, [selected]);

  useEffect(() => {
    if (expanded !== undefined) setInternalExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    if (!internalExpanded || variant !== 'checkbox' || childrenCount === 0) return;
    setChildrenCheckedMap(prev => {
      let changed = false;
      const next = { ...prev };
      for (let i = 0; i < childrenCount; i++) {
        if (!(i in next)) { next[i] = internalChecked; changed = true; }
      }
      return changed ? next : prev;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalExpanded, childrenCount, variant]);

  const renderVariantContent = useCallback((): React.ReactNode => {
    const validVariants: ListItemVariant[] = ['text', 'checkbox', 'icon'];
    const currentVariant = validVariants.includes(variant) ? variant : 'text';

    switch (currentVariant) {
      case 'checkbox':
        return (
          <>
            <span aria-hidden="true">
              <Checkbox
                checked={internalChecked}
                indeterminate={isIndeterminate}
                disabled={disabled}
                scale={scale}
                onCheckedChange={() => handleCheckboxClick({} as React.MouseEvent<HTMLElement>)}
              />
            </span>
            <div className={styles['listItemWrapperText']}>
              <span
                id={`${itemId}-text`}
                className={styles['listItemTitle']}
              >
                {text}
              </span>
              {subText && (
                <span
                  id={`${itemId}-subtext`}
                  className={styles['listItemSubtext']}
                >
                  {subText}
                </span>
              )}
            </div>
          </>
        );

      case 'icon':
        return (
          <>
            <div className={styles['listItemWrapperIcon']}>
              {icon}
            </div>
            <div className={styles['listItemWrapperText']}>
              <span
                id={`${itemId}-text`}
                className={styles['listItemTitle']}
              >
                {text}
              </span>
              {subText && (
                <span
                  id={`${itemId}-subtext`}
                  className={styles['listItemSubtext']}
                >
                  {subText}
                </span>
              )}
            </div>
          </>
        );

      case 'text':
      default:
        return (
          <div className={styles['listItemWrapperText']}>
            <span
              id={`${itemId}-text`}
              className={styles['listItemTitle']}
            >
              {text}
            </span>
            {subText && (
              <span
                id={`${itemId}-subtext`}
                className={styles['listItemSubtext']}
              >
                {subText}
              </span>
            )}
          </div>
        );
    }
  }, [variant, itemId, internalChecked, isIndeterminate, disabled, handleCheckboxClick, text, subText, icon]);

  const listItemClass = clsx(
    styles['listItem'],
    {
      [styles[`listItem-${variant}`]]: variant,
      [styles['listItemDisabled']]: disabled,
      [styles['listItemHovered']]: hovered,
      [className || '']: className
    }
  );

  const ariaChecked = variant === 'checkbox' ? internalChecked : undefined;
  const ariaRole = variant === 'checkbox' ? 'checkbox' : 'option';
  const hasChildren = React.Children.count(children) > 0;

  return (
    <li
      id={itemId}
      className={listItemClass}
      data-testid="list-item"
      style={{
        '--giro-scale': scale,
        ...(width != null ? { width } : {}),
      } as React.CSSProperties}
      {...rest}
    >
      <div
        role={ariaRole}
        className={styles['listItemRow']}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-selected={variant === 'text' || variant === 'icon' ? internalSelected : undefined}
        aria-disabled={disabled}
        aria-checked={ariaChecked}
        aria-expanded={hasChildren ? internalExpanded : undefined}
        aria-labelledby={`${itemId}-text`}
        aria-describedby={subText ? `${itemId}-subtext` : undefined}
      >
        {renderVariantContent()}
        {hasChildren && (
          <button
            type="button"
            className={clsx(styles['listItemChevron'], {
              [styles['listItemChevronExpanded']]: internalExpanded,
            })}
            onClick={handleToggleExpand}
            tabIndex={-1}
            aria-label={internalExpanded ? 'Recolher' : 'Expandir'}
            disabled={disabled}
          >
            <ChevronDown16Regular />
          </button>
        )}
      </div>
      {hasChildren && internalExpanded && (
        <ul className={styles['listItemChildren']} role="group">
          {variant === 'checkbox'
            ? React.Children.map(children, (child, index) =>
                React.isValidElement(child)
                  ? React.cloneElement(child as React.ReactElement<ListItemProps>, {
                      checked: childrenCheckedMap[index] ?? internalChecked,
                      onChange: (childChecked: boolean) => {
                        (child.props as ListItemProps).onChange?.(childChecked);
                        handleChildChange(index, childChecked);
                      },
                    })
                  : child
              )
            : children}
        </ul>
      )}
    </li>
  );
};

export default ListItem;