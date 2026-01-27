import React from 'react';

export interface ButtonProps {
  as?: React.ElementType;
  children?: React.ReactNode; //É usado em varios componentes diferentes
  variant?: 'filled' | 'outlined' | 'text';
  iconOnly?: boolean; 
  iconPosition?: 'left' | 'right' | 'both';
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
