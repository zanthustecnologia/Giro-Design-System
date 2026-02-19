import * as React from 'react';

export interface ChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'neutral' | 'brand' | 'color' | 'success' | 'alert';
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}
