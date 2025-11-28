import React from 'react';

export interface AvatarProps {
  id?: string;
  icon: React.ReactNode;
  size?: 'small' | 'large';
  className?: string;
}
