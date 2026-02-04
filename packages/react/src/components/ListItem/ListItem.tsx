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
  text = '',
  name = '',
  subText,
  disabled = false,
  checked = false,
  selected = false,
  onClick,
  onChange,
  icon,
  value = '',
  showSubText = false,
  hovered = false,
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
            <Checkbox
              checked={internalChecked}
              disabled={disabled}
              onCheckedChange={() => handleCheckboxClick({} as React.MouseEvent<HTMLElement>)}
            />
            <div className={styles['zds-list-item__wrapper-text']}>
              <span
                id={`${itemId}-text`}
                className={styles['zds-list-item__text']}
                onClick={handleCheckboxClick}
              >
                {text}
              </span>
              {showSubText && subText && (
                <span
                  id={`${itemId}-subtext`}
                  className={styles['zds-list-item__subtext']}
                  onClick={handleCheckboxClick}
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
            <div className={styles['zds-list-item__wrapper-radio']}>
              <span className={styles['zds-list-item__radio']} aria-hidden="true">
                <Radio
                  name={name}
                  onValueChange={() => handleRadioClick({} as React.MouseEvent<HTMLElement>)}
                  items= {[{
                    value: value,
                    label: '',
                    disabled: disabled}]}
                  aria-labelledby={`${itemId}-text`}
                />
              </span>
            </div>
            <div className={styles['zds-list-item__wrapper-text']}>
              <span
                id={`${itemId}-text`}
                className={styles['zds-list-item__title']}
                onClick={handleRadioClick}
              >
                {text}
              </span>
              {showSubText && subText && (
                <span
                  id={`${itemId}-subtext`}
                  className={styles['zds-list-item__subtext']}
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
            <div className={styles['zds-list-item__wrapper-icon']}>
              {icon}
            </div>
            <div className={styles['zds-list-item__wrapper-text']}>
              <span
                id={`${itemId}-text`}
                className={styles['zds-list-item__title']}
                onClick={handleTextOrIconClick}
              >
                {text}
              </span>
              {showSubText && subText && (
                <span
                  id={`${itemId}-subtext`}
                  className={styles['zds-list-item__subtext']}
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
          <div className={styles['zds-list-item__wrapper-text']}>
            <span
              id={`${itemId}-text`}
              className={styles['zds-list-item__title']}
              onClick={handleTextOrIconClick}
            >
              {text}
            </span>
            {showSubText && subText && (
              <span
                id={`${itemId}-subtext`}
                className={styles['zds-list-item__subtext']}
              >
                {subText}
              </span>
            )}
          </div>
        );
    }
  }, [variant, itemId, internalChecked, disabled, handleCheckboxClick, handleRadioClick, handleTextOrIconClick, value, text, showSubText, subText, icon, name]);

  const listItemClass = clsx(
    styles['zds-list-item__container'],
    {
      [styles[`zds-list-item--${variant}`]]: variant,
      [styles['zds-list-item--disabled']]: disabled,
      [styles['zds-list-item--hovered']]: hovered,
      [className || '']: className
    }
  );

  const getAriaChecked = useCallback((): boolean | undefined => {
    if (variant === 'checkbox' || variant === 'radio') {
      return internalChecked;
    }
    return undefined;
  }, [variant, internalChecked]);

  return (
    <li
      className={listItemClass}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      aria-selected={variant === 'text' || variant === 'icon' ? internalSelected : undefined}
      aria-disabled={disabled}
      aria-checked={getAriaChecked()}
      aria-labelledby={`${itemId}-text`}
      aria-describedby={showSubText && subText ? `${itemId}-subtext` : undefined}
      data-testid="list-item"
      {...rest}
    >
      {renderVariantContent()}
    </li>
  );
};

export default ListItem;