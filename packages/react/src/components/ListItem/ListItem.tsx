import clsx from "clsx";
import React, { useId, useCallback, useState, useEffect } from "react";

import styles from './ListItem.module.scss';
import Checkbox from '../Checkbox/Checkbox';
import Radio from '../Radio/Radio';

import type { ListItemVariant, ListItemProps } from './ListItem.types';

const ListItem: React.FC<ListItemProps> = ({
  id,
  className,
  variant = 'text',
  text,
  name,
  subText,
  disabled = false,
  checked = false,
  selected = false,
  onClick,
  onChange,
  icon,
  value,
  showSubText = false,
  hovered = true,
  width,
  scale = 1,
  ...rest
}) => {
  const componentId = useId();
  const itemId = id || componentId;
  const [internalChecked, setInternalChecked] = useState<boolean>(checked);
  const [internalSelected, setInternalSelected] = useState<boolean>(selected);

  const handleCheckboxClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    const newChecked = !internalChecked;
    setInternalChecked(newChecked);
    onChange?.(newChecked);
    onClick?.(e);
  }, [disabled, internalChecked, onChange, onClick]);

  const handleRadioClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    if (!internalChecked) {
      setInternalChecked(true);
      onChange?.(true);
    }
    onClick?.(e);
  }, [disabled, internalChecked, onChange, onClick]);

  const handleTextOrIconClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    const newSelected = !internalSelected;
    setInternalSelected(newSelected);
    onClick?.(e);
  }, [disabled, internalSelected, onClick]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLLIElement>): void => {
    switch (variant) {
      case 'checkbox':
        handleCheckboxClick(e as React.MouseEvent<HTMLElement>);
        break;
      case 'radio':
        handleRadioClick(e as React.MouseEvent<HTMLElement>);
        break;
      case 'text':
      case 'icon':
      default:
        handleTextOrIconClick(e as React.MouseEvent<HTMLElement>);
        break;
    }
  }, [variant, handleCheckboxClick, handleRadioClick, handleTextOrIconClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLLIElement>): void => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      switch (variant) {
        case 'checkbox':
          handleCheckboxClick(e);
          break;
        case 'radio':
          handleRadioClick(e);
          break;
        case 'text':
        case 'icon':
        default:
          handleTextOrIconClick(e);
          break;
      }
    }
  }, [disabled, variant, handleCheckboxClick, handleRadioClick, handleTextOrIconClick]);

  useEffect(() => {
    setInternalChecked(checked);
  }, [checked]);

  useEffect(() => {
    setInternalSelected(selected);
  }, [selected]);

  const renderVariantContent = useCallback((): React.ReactNode => {
    const validVariants: ListItemVariant[] = ['text', 'checkbox', 'radio', 'icon'];
    const currentVariant = validVariants.includes(variant) ? variant : 'text';

    switch (currentVariant) {
      case 'checkbox':
        return (
          <>
            <span aria-hidden="true">
              <Checkbox
                checked={internalChecked}
                disabled={disabled}
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
              {showSubText && subText && (
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

      case 'radio':
        return (
          <>
            <div className={styles['listItemWrapperRadio']}>
              <span className={styles['listItemRadio']} aria-hidden="true">
                <Radio
                  name={name}
                  onValueChange={() => handleRadioClick({} as React.MouseEvent<HTMLElement>)}
                  items= {[{
                    value: value || '',
                    label: '',
                    disabled: disabled}]}
                  aria-labelledby={`${itemId}-text`}
                />
              </span>
            </div>
            <div className={styles['listItemWrapperText']}>
              <span
                id={`${itemId}-text`}
                className={styles['listItemTitle']}
              >
                {text}
              </span>
              {showSubText && subText && (
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
              {showSubText && subText && (
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
            {showSubText && subText && (
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
  }, [variant, itemId, internalChecked, disabled, handleCheckboxClick, handleRadioClick, value, text, showSubText, subText, icon, name]);

  const listItemClass = clsx(
    styles['listItem'],
    {
      [styles[`listItem-${variant}`]]: variant,
      [styles['listItemDisabled']]: disabled,
      [styles['listItemHovered']]: hovered,
      [className || '']: className
    }
  );

  const ariaChecked = (variant === 'checkbox' || variant === 'radio') ? internalChecked : undefined;
  const ariaRole = variant === 'checkbox' ? 'checkbox' : variant === 'radio' ? 'radio' : 'option';

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- role is dynamic (checkbox/radio/option) and cannot be resolved statically by the linter
    <li
      role={ariaRole}
      className={listItemClass}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-selected={variant === 'text' || variant === 'icon' ? internalSelected : undefined}
      aria-disabled={disabled}
      aria-checked={ariaChecked}
      aria-labelledby={`${itemId}-text`}
      aria-describedby={showSubText && subText ? `${itemId}-subtext` : undefined}
      data-testid="list-item"
      style={{
        '--giro-scale': scale,
        ...(width != null ? { width } : {}),
      } as React.CSSProperties}
      {...rest}
    >
      {renderVariantContent()}
    </li>
  );
};

export default ListItem;