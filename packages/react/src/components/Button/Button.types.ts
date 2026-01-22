import React from 'react';

export interface ButtonProps {
  as?: React.ElementType;
  children?: React.ReactNode;
  variant?: 'filled' | 'outlined' | 'text';
  iconOnly?: boolean;
  iconPosition?: 'none' | 'left' | 'right';
  href?: string;
  to?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  routerProps?: Record<string, any>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: 'lg' | 'sm';
  className?: string;
  id?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
  loading?: boolean;
  [key: string]: any;
}
