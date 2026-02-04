import React, { useState, useId } from 'react';
import { Search16Regular, Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
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
      id = '',
      className = '',
      'data-testid': testId, 
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>('');
    const isControlled = value !== undefined && onChange !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const inputId = id || useId();
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
    const searchClass = clsx(styles['zds-search'], {
      disabled,
      [className]: className,
    });
    return (
      <div className={searchClass} onClick={onClick} onMouseDown={onMouseDown}>
        <span
          className={clsx(styles['zds-search__leftIcon'], { disabled })}
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
        />
        {currentValue && currentValue.length > 0 && (
          <span
            className={styles['zds-search__clearIcon']}
            aria-hidden="true"
            onClick={clearInputSearch}
          >
            <Dismiss16Regular />
          </span>
        )}
      </div>
    );
  }
);

Search.displayName = 'ZdsSearch';

export default Search;
