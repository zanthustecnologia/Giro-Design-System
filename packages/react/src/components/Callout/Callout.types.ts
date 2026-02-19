import * as React from 'react';

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: 'neutral' | 'color' | 'brand' | 'alert' | 'success';
  title?: string | null;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  id?: string;
}
