import React, { useCallback, useId } from 'react';
import './Radio.scss';
import clsx from 'clsx';

export interface RadioProps {
  /** Definirá o nome do grupo de radio */
  name?: string;
  /** O valor associado ao botão de rádio */
  value: string;
  /** O identificador único para o input do rádio */
  id?: string;
  /** Indica se o botão de rádio está selecionado */
  checked?: boolean;
  /** Classes adicionais para estilização personalizada */
  className?: string;
  /** Função de callback acionada quando o valor do botão de rádio muda */
  onChange?: (value: string | number) => void;
  /** O texto do rótulo exibido ao lado do botão de rádio */
  label?: string;
  /** Indica se o botão de rádio está desabilitado */
  disabled?: boolean;
  /** Props adicionais para o elemento input */
  [key: string]: any;
}

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (disabled) return;
      onChange?.(e.target.value);
    },
    [onChange, disabled]
  );
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
            disabled={disabled}
            type="radio"
            aria-disabled={disabled}
            aria-describedby={label ? `${inputId}-description` : undefined}
            tabIndex={disabled ? -1 : 0}
            role="radio"
            aria-checked={checked}
            name={name}
            value={value}
            checked={checked}
            onChange={handleChange}
          />
        </div>
        {label && (
          <span className="zds-radiobutton__box-check__text">{label}</span>
        )}
      </label>
    </div>
  );
};

const MemoizedRadio = React.memo(Radio);
MemoizedRadio.displayName = 'Radio';

export default MemoizedRadio;