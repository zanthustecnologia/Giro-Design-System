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
  customWidth,
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

  const childrenCount = variant === 'checkbox'
    ? React.Children.toArray(children).filter(
        child => React.isValidElement(child) && !(child.props as ListItemProps).disabled
      ).length
    : 0;
  const checkedCount = Object.values(childrenCheckedMap).filter(Boolean).length;
  const isIndeterminate = childrenCount > 0 && checkedCount > 0 && checkedCount < childrenCount;
  const hasChildren = React.Children.count(children) > 0;

  const handleCheckboxClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    const newChecked = isIndeterminate ? true : !internalChecked;
    setInternalChecked(newChecked);
    if (childrenCount > 0) {
      const newMap: Record<number, boolean> = {};
      React.Children.forEach(children, (child, index) => {
        if (React.isValidElement(child) && !(child.props as ListItemProps).disabled) {
          newMap[index] = newChecked;
        }
      });
      setChildrenCheckedMap(newMap);
    }
    onChange?.(newChecked);
    onClick?.(e);
  }, [disabled, internalChecked, isIndeterminate, childrenCount, onChange, onClick, children]);

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
    if (hasChildren) {
      if (disabled) return;
      const newExpanded = !internalExpanded;
      setInternalExpanded(newExpanded);
      onExpandedChange?.(newExpanded);
      return;
    }
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
  }, [hasChildren, disabled, internalExpanded, onExpandedChange, variant, handleCheckboxClick, handleTextOrIconClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      if (hasChildren) {
        const newExpanded = !internalExpanded;
        setInternalExpanded(newExpanded);
        onExpandedChange?.(newExpanded);
        return;
      }
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
  }, [disabled, hasChildren, internalExpanded, onExpandedChange, variant, handleCheckboxClick, handleTextOrIconClick]);

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
      React.Children.forEach(children, (child, index) => {
        if (React.isValidElement(child) && !(child.props as ListItemProps).disabled && !(index in next)) {
          next[index] = internalChecked;
          changed = true;
        }
      });
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
            <span
              aria-hidden="true"
              onClick={hasChildren ? (e) => e.stopPropagation() : undefined}
            >
              <Checkbox
                checked={internalChecked}
                indeterminate={isIndeterminate}
                disabled={disabled}
                scale={scale}
                onCheckedChange={() => handleCheckboxClick({} as React.MouseEvent<HTMLElement>)}
              />
            </span>
            <div className={styles.listItemWrapperText}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
              <span
                id={`${itemId}-text`}
                className={styles.listItemTitle}
                onClick={hasChildren ? (e) => { e.stopPropagation(); handleCheckboxClick(e as React.MouseEvent<HTMLElement>); } : undefined}
              >
                {text}
              </span>
              {subText && (
                <span
                  id={`${itemId}-subtext`}
                  className={styles.listItemSubtext}
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
            <div className={styles.listItemWrapperIcon}>
              {icon}
            </div>
            <div className={styles.listItemWrapperText}>
              <span
                id={`${itemId}-text`}
                className={styles.listItemTitle}
              >
                {text}
              </span>
              {subText && (
                <span
                  id={`${itemId}-subtext`}
                  className={styles.listItemSubtext}
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
          <div className={styles.listItemWrapperText}>
            <span
              id={`${itemId}-text`}
              className={styles.listItemTitle}
            >
              {text}
            </span>
            {subText && (
              <span
                id={`${itemId}-subtext`}
                className={styles.listItemSubtext}
              >
                {subText}
              </span>
            )}
          </div>
        );
    }
  }, [variant, itemId, internalChecked, isIndeterminate, disabled, handleCheckboxClick, text, subText, icon, scale, hasChildren]);

  const listItemClass = clsx(
    styles.listItem,
    {
      [styles[`listItem-${variant}`]]: variant,
      [styles.listItemDisabled]: disabled,
      [className || '']: className
    }
  );

  const ariaChecked = variant === 'checkbox' ? internalChecked : undefined;
  const ariaRole = variant === 'checkbox' ? 'checkbox' : 'option';

  return (
    <li
      id={itemId}
      className={listItemClass}
      data-testid="list-item"
      style={{
        '--giro-scale': scale,
        ...(customWidth != null ? { width: customWidth } : {}),
      } as React.CSSProperties}
      {...rest}
    >
      <div
        role={ariaRole}
        className={styles.listItemRow}
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
          <span
            data-testid="list-item-chevron"
            aria-hidden="true"
            className={clsx(styles.listItemChevron, {
              [styles.listItemChevronExpanded]: internalExpanded,
            })}
          >
            <ChevronDown16Regular />
          </span>
        )}
      </div>
      {hasChildren && internalExpanded && (
        <ul className={styles.listItemChildren} role="group">
          {variant === 'checkbox'
            ? React.Children.map(children, (child, index) =>
                React.isValidElement(child)
                  ? React.cloneElement(child as React.ReactElement<ListItemProps>, {
                      checked: (child.props as ListItemProps).disabled
                        ? (child.props as ListItemProps).checked
                        : (childrenCheckedMap[index] ?? internalChecked),
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