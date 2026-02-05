import React from 'react';

import { Size, BaseProps, Variant, Position } from '../../types/common.types';

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
  variant?: Variant;
  iconOnly?: boolean; 
  iconPosition?: Position;
  href?: string;
  to?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: BaseProps['disabled']; 
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: Size;
  className?: BaseProps['className'];
  id?: BaseProps['id'];
  icon?: React.ReactNode; 
  fullWidth?: boolean;
  ariaLabel?: string; 
  loading?: boolean;
}
