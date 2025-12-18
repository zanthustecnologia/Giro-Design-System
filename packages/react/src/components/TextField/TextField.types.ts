import React from 'react';

export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export type TooltipPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

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
  /** Tooltip position */
  positionTooltip?: TooltipPosition;
  /** Custom error message for validation */
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
