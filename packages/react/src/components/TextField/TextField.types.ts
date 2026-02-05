import React from 'react';

import { Side, Align } from '../../types/common.types';

export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>, 
  'onChange' | 'value' | 'type'
> {
  /** Controlled value */
  value?: string;
  /** Change handler - receives string value */
  onChange?: (value: string) => void;
  /** Label text */
  label?: string;
  /** Input type */
  type?: TextFieldType;
  /** Helper text (shown below input) */
  helperText?: string;
  /** Show tooltip with info icon */
  tooltip?: boolean;
  /** Tooltip content */
  tooltipText?: string;
  side?: Side;
  align?: Align;
  errorMessage?: string;
  /** Leading icon */
  icon?: React.ReactNode;
}

export interface ValidationParams {
  value: string;
  maxLength?: number;
  type?: TextFieldType;
  errorMessage?: string;
  required?: boolean;
}
