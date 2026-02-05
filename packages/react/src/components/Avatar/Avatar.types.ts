import React from 'react';

export interface AvatarProps {
  id?: string;
  icon: React.ReactNode;
  size?: 'sm' | 'lg';
  className?: string;
}
