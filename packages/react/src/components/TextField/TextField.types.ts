import React from 'react';

export type TextFieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';

export type TooltipPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface TextFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>, 
  'onChange' | 'value' | 'type'
> {
  /** Controlled value */
  value?: string | number;
  /** Change handler - receives string value */
  onChange?: (value: string) => void;
  label?: string;
  type?: TextFieldType;
  helperText?: string;
  tooltip?: boolean;
  tooltipText?: string;
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end";
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
