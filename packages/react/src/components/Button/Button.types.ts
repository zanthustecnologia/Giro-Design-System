import React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
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
}
