import React from 'react';

import { Side, Align } from '../../types/common.types';

export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>, 
  'onChange' | 'value' | 'type'
> {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  type?: TextFieldType;
  helperText?: string;
  tooltip?: boolean;
  tooltipText?: string;
  side?: Side;
  align?: Align;
  errorMessage?: string;
  icon?: React.ReactNode;
}

export interface ValidationParams {
  value: string;
  maxLength?: number;
  type?: TextFieldType;
  errorMessage?: string;
  required?: boolean;
}
