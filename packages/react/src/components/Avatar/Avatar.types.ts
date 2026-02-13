import React from 'react';

import { BaseProps, Size } from '@/types';

export interface AvatarProps extends BaseProps {
  icon: React.ReactNode;
  size?: Size;
  src?: string;
}
