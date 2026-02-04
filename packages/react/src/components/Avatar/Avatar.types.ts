import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  icon: React.ReactNode;
  size?: 'small' | 'large';
  className?: string;
}
