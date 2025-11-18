import React, { useCallback, useId } from 'react';
import './Radio.module.scss';
import clsx from 'clsx';
import type { RadioProps } from './Radio.types';

/**
 * Componente Radio para seleção única em grupos
 * 
 * @description Componente de botão de rádio com label integrado,
 * suporte a estados disabled e acessibilidade completa.
 */
const Radio: React.FC<RadioProps> = ({
  name = 'radiobutton',
  value = '',
  id,
  checked = false,
  className = '',
  onChange,
  label = '',
  disabled = false,
}) => {

  const uniqueId = useId();
  const inputId = id || uniqueId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(e.target.value);
  };
  
  const radioClass = clsx(
    'zds-radiobutton',
    {
      'zds-radiobutton--disabled': disabled,
    },
    className
  );
  const labelClass = clsx(
    'zds-radiobutton__box-check',
    {
      'zds-radiobutton__disabled': disabled,
    }
  );

  return (
    <div className={radioClass}>
      <label className={labelClass} htmlFor={inputId}>
        <div className="zds-radiobutton__mini-box">
          <input
            id={inputId}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
          />
        </div>
        {label && (
          <span id={`${inputId}-description`} className="zds-radiobutton__box-check__text">{label}</span>
        )}
      </label>
    </div>
  );
};

const MemoizedRadio = React.memo(Radio);
MemoizedRadio.displayName = 'Radio';

export default MemoizedRadio;