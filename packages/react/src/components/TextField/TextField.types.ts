import React from 'react';

export interface TextFieldProps {
  name?: string;
  className?: string;
  value?: string | number;
  label?: string;
  placeholder?: string;
  type?: string;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  maxLength?: number;
  required?: boolean;
  helper?: boolean;
  helperText?: string;
  tooltip?: boolean;
  tooltipText?: string;
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end";
  errorMessage?: string;
  trailingIcon?: boolean;
  id?: string;
  icon?: React.ReactNode;
}
