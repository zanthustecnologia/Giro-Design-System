import React, { useState, useId } from 'react';
import { Search16Regular, Dismiss16Regular } from '@fluentui/react-icons';
import clsx from 'clsx';
import './Search.scss';

/**
 * Props do componente Search
 */
export interface SearchProps {
  /** Texto que aparece quando o campo está vazio */
  placeholder?: string;
  /** Define se o input estará desabilitado */
  disabled?: boolean;
  /** Valor atual do input (modo controlado) */
  value?: string;
  /** Função chamada a cada alteração (modo controlado) */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Função chamada quando uma tecla é pressionada */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  /** Classe CSS personalizada */
  className?: string;

  /** ID único para o input */
  id?: string;
}

/**
 * Search input component with optional controlled/uncontrolled behavior.
 *
 * @description Componente de busca com suporte a modo controlado e não controlado,
 * incluindo ícones de busca e limpeza, estados desabilitados e acessibilidade completa.
 *
 * @example
 * ```tsx
 * // Uso não controlado
 * <Search placeholder="Buscar produtos..." />
 * 
 * // Uso controlado com handler de Enter
 * const [searchValue, setSearchValue] = useState('');
 * const handleKeyDown = (e) => {
 *   if (e.key === 'Enter') {
 *     console.log('Buscar por:', e.target.value);
 *   }
 * };
 * 
 * <Search 
 *   value={searchValue} 
 *   onChange={e => setSearchValue(e.target.value)} 
 *   onKeyDown={handleKeyDown} 
 * />
 * ```
 */
const Search: React.FC<SearchProps> = ({
  placeholder = 'Dica do que deve ser buscado',
  disabled = false,
  value,
  onChange,
  onKeyDown,
  id = '',
  className = ''
}) => {
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
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (disabled) return;
    onKeyDown?.(e);
  };
  const searchClass = clsx(
    'zds-search',
    {
      disabled,
      [className]: className
    }
  )
  return (
    <div className={searchClass}>
      <span
        className={clsx('zds-leftIcon', { disabled })}
        tabIndex={-1}
        role="presentation"
        aria-hidden="true"
      >
        <Search16Regular aria-describedby={inputId} />
      </span>

      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        aria-describedby={`${inputId}-description`}
        value={currentValue || ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      <button
        type="button"
        tabIndex={0}
        className="zds-rightIcon"
        onClick={clearInputSearch}
        aria-label="Limpar busca"
        style={{
          visibility: currentValue && currentValue.length > 0 && !disabled
            ? 'visible'
            : 'hidden'
        }}
        disabled={disabled}
      >
        <Dismiss16Regular />
      </button>
    </div>
  );
};

const MemoizedSearch = React.memo(Search);
MemoizedSearch.displayName = 'ZdsSearch';

export default MemoizedSearch;