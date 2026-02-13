import React from 'react';

export interface AvatarRadixProps {
  id?: string;
  icon: React.ReactNode;
  size?: 'sm' | 'lg';
  src?: string;
  className?: string;
}
