import * as React from 'react';

export interface SearchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onKeyDown' | 'onFocus' | 'onBlur' | 'type'
> {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  id?: string;
  'data-testid'?: string; // prop feita para facilitar testes e2e
}
