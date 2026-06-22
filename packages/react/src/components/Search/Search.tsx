import { Search16Regular, Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import React, { useState, useId } from 'react';

import useInputKeyboardValue from '../../hooks/useInputKeyboardValue';
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
      searchMode = 'instant',
      onSearch,
      id,
      scale = 1,
      className,
      virtualKeyboard,
      'data-testid': testId,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>('');
    const { internalRef: inputRef, setRefs: setInputRefs } = useInputKeyboardValue(ref);
    const isControlled = value !== undefined && onChange !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const generatedId = useId();
    const inputId = id || generatedId;

    const scaleClass = {
      1: 'scale-1-0',
      1.5: 'scale-1-5',
      2: 'scale-2-0',
    }[scale];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (disabled) return;

      if (isControlled) {
        onChange?.(e);
      } else {
        setInternalValue(e.target.value);
      }

      if (searchMode === 'instant') {
        onSearch?.(e.target.value);
      }
    };
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
      if (disabled) return;
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

      if (searchMode === 'on-enter' && e.key === 'Enter') {
        onSearch?.(currentValue || '');
      }

      onKeyDown?.(e);
    };
    return (
      <div 
        className={clsx(
          styles.search,
          scaleClass,
          { [styles.disabled]: disabled },
          className
        )} 
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
          ref={setInputRefs}
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
          inputMode={(virtualKeyboard === 'default' || virtualKeyboard === 'numeric') ? 'none' : rest.inputMode}
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

        {(virtualKeyboard === 'default' || virtualKeyboard === 'numeric') && (
          <div className="virtualKeyboardWrapper">
            <VirtualKeyboard
              variant="native"
              type={virtualKeyboard}
              value={currentValue || ''}
              targetRef={inputRef}
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
