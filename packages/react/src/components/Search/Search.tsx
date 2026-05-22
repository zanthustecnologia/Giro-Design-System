import { Search16Regular, Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useId, useRef, useEffect } from 'react';

import VirtualKeyboard from '../VirtualKeyboard';
import styles from './Search.module.scss';

import type { SearchProps } from './Search.types';

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      placeholder = 'Dica do que deve ser buscado',
      disabled = false,
      value,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      onClear,
      onClick,
      onMouseDown,
      id,
      className,
      virtualKeyboard = false,
      virtualKeyboardLayout,
      virtualKeyboardMaxLength,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isControlled = value !== undefined && onChange !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const generatedId = useId();
    const inputId = id || generatedId;

    useEffect(() => {
      if (!virtualKeyboard || !isKeyboardOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsKeyboardOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [virtualKeyboard, isKeyboardOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (disabled) return;

      if (isControlled) {
        onChange?.(e);
      } else {
        setInternalValue(e.target.value);
      }
    };
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
      if (disabled) return;
      if (virtualKeyboard) setIsKeyboardOpen(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
      if (disabled) return;
      onBlur?.(e);
    };
    const clearInputSearch = (): void => {
      if (disabled) return;

      if (isControlled) {
        const syntheticEvent = {
          target: { value: '' },
          currentTarget: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange?.(syntheticEvent);
      } else {
        setInternalValue('');
      }
      onClear?.();
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (disabled) return;
      onKeyDown?.(e);
    };
    return (
      <div 
        className={clsx(
          styles.search,
          { [styles.disabled]: disabled },
          className
        )} 
        ref={containerRef}
        onClick={onClick} 
        onMouseDown={onMouseDown}
        role={onClick || onMouseDown ? "button" : undefined}
        tabIndex={onClick || onMouseDown ? 0 : undefined}
        onKeyDown={onClick || onMouseDown ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.(e as any);
          }
        } : undefined}
      >
        <span
          className={clsx(styles.searchLeftIcon, { [styles.disabled]: disabled })}
          tabIndex={-1}
          role="presentation"
          aria-hidden="true"
        >
          <Search16Regular />
        </span>

        <input
          ref={ref}
          id={inputId}
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          value={currentValue || ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-testid={testId}
          {...rest}
          inputMode={virtualKeyboard ? 'none' : rest.inputMode}
          className={clsx({ [styles.inputWithClearIcon]: currentValue && currentValue.length > 0 })}  
        />
        {currentValue && currentValue.length > 0 && (
          <span
            className={styles.searchClearIcon}
            aria-hidden="true"
            onClick={clearInputSearch}
          >
            <Dismiss16Regular />
          </span>
        )}

        {virtualKeyboard && isKeyboardOpen && (
          <div className={styles.virtualKeyboardWrapper}>
            <VirtualKeyboard
              mode="native"
              layout={virtualKeyboardLayout}
              maxLength={virtualKeyboardMaxLength}
              value={currentValue || ''}
              onChange={(val) => {
                if (disabled) return;
                if (isControlled) {
                  const syntheticEvent = {
                    target: { value: val },
                    currentTarget: { value: val },
                  } as React.ChangeEvent<HTMLInputElement>;
                  onChange?.(syntheticEvent);
                } else {
                  setInternalValue(val);
                }
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

Search.displayName = 'Search';

export default Search;
