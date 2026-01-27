import React from 'react';

export interface ButtonProps {
  as?: React.ElementType;
  children?: React.ReactNode; //É usado em varios componentes diferentes
  variant?: 'filled' | 'outlined' | 'text';
  iconOnly?: boolean; 
  iconPosition?: 'none' | 'left' | 'right' | 'both';
  href?: string;
  to?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  routerProps?: Record<string, any>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean; //É usado em varios componentes diferentes
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: 'lg' | 'sm'; //É usado em varios componentes diferentes
  className?: string;
  id?: string;
  icon?: React.ReactNode; //É usado em varios componentes diferentes
  fullWidth?: boolean;
  ariaLabel?: string; //É usado em varios componentes diferentes
  loading?: boolean;
  [key: string]: any;
}
