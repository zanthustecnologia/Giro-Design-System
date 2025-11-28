import React, { useId, useCallback, useState, useEffect } from "react";
import clsx from "clsx";
import Checkbox from '../Checkbox/Checkbox';
import Radio from '../Radio/Radio';
import './ListItem.module.scss';
import type { ListItemVariant, ListItemProps } from './ListItem.types';

/**
 * Componente ListItem do Zanthus Design System
 * Implementa item de lista unificado com variações text, checkbox, radio e icon
 * Segue padrões WCAG 2.1 AA para acessibilidade
 */
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
  hovered = false
}) => {
  const componentId = useId();
  const itemId = id || componentId;
  const [internalChecked, setInternalChecked] = useState<boolean>(checked);
  const [internalSelected, setInternalSelected] = useState<boolean>(selected);

  /**
   * Handler para clique em checkbox.
   * Alterna o estado e dispara o callback onChange.
   */
  const handleCheckboxClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    const newChecked = !internalChecked;
    setInternalChecked(newChecked);
    onChange?.(newChecked);
    onClick?.(e);
  }, [disabled, internalChecked, onChange, onClick]);

  /**
   * Handler para clique em radio.
   * Marca como selecionado se ainda não estiver e dispara o callback onChange.
   */
  const handleRadioClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    if (!internalChecked) {
      setInternalChecked(true);
      onChange?.(true);
    }
    onClick?.(e);
  }, [disabled, internalChecked, onChange, onClick]);

  /**
   * Handler para clique em variantes text e icon.
   * Alterna o estado de seleção interno.
   */
  const handleTextOrIconClick = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    if (disabled) return;
    const newSelected = !internalSelected;
    setInternalSelected(newSelected);
    onClick?.(e);
  }, [disabled, internalSelected, onClick]);

  /**
   * Handler para eventos de teclado (Enter ou Espaço).
   * Direciona para o handler correto conforme o variant.
   */
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

  // ✅ Sincronização com props externas
  useEffect(() => {
    setInternalChecked(checked);
  }, [checked]);

  useEffect(() => {
    setInternalSelected(selected);
  }, [selected]);

  /**
   * Renderiza o conteúdo do item conforme o variant.
   */
  const renderVariantContent = useCallback((): React.ReactNode => {
    const validVariants: ListItemVariant[] = ['text', 'checkbox', 'radio', 'icon'];
    const currentVariant = validVariants.includes(variant) ? variant : 'text';

    switch (currentVariant) {
      case 'checkbox':
        return (
          <>
            <Checkbox
              name={name}
              checked={internalChecked}
              disabled={disabled}
              label=""
              onChange={() => handleCheckboxClick({} as React.MouseEvent<HTMLElement>)}
              value={value}
            />
            <div className="zds-list-item__wrapper-text">
              <span
                id={`${itemId}-text`}
                className="zds-list-item__text"
                onClick={handleCheckboxClick}
              >
                {text}
              </span>
              {showSubText && subText && (
                <span
                  id={`${itemId}-subtext`}
                  className="zds-list-item__subtext"
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
            <div className="zds-list-item__wrapper-radio">
              <span className="zds-list-item__radio" aria-hidden="true">
                <Radio
                  name={name}
                  checked={internalChecked}
                  disabled={disabled}
                  onChange={() => handleRadioClick({} as React.MouseEvent<HTMLElement>)}
                  value={value}
                  aria-labelledby={`${itemId}-text`}
                />
              </span>
            </div>
            <div className="zds-list-item__wrapper-text">
              <span
                id={`${itemId}-text`}
                className="zds-list-item__title"
                onClick={handleRadioClick}
              >
                {text}
              </span>
              {showSubText && subText && (
                <span
                  id={`${itemId}-subtext`}
                  className="zds-list-item__subtext"
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
            <div className="zds-list-item__wrapper-icon">
              {icon}
            </div>
            <div className="zds-list-item__wrapper-text">
              <span
                id={`${itemId}-text`}
                className="zds-list-item__title"
                onClick={handleTextOrIconClick}
              >
                {text}
              </span>
              {showSubText && subText && (
                <span
                  id={`${itemId}-subtext`}
                  className="zds-list-item__subtext"
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
          <div className='zds-list-item__wrapper-text'>
            <span
              id={`${itemId}-text`}
              className="zds-list-item__title"
              onClick={handleTextOrIconClick}
            >
              {text}
            </span>
            {showSubText && subText && (
              <span
                id={`${itemId}-subtext`}
                className="zds-list-item__subtext"
              >
                {subText}
              </span>
            )}
          </div>
        );
    }
  }, [variant, itemId, internalChecked, disabled, handleCheckboxClick, handleRadioClick, handleTextOrIconClick, value, text, showSubText, subText, icon, name]);

  const listItemClass = clsx(
    'zds-list-item__container',
    {
      [`zds-list-item--${variant}`]: variant,
      'zds-list-item--disabled': disabled,
      'zds-list-item--hovered': hovered,
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
    >
      {renderVariantContent()}
    </li>
  );
};

export default ListItem;