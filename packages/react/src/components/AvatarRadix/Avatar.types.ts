import React from 'react';

import { BaseProps, Size } from '@/types';

export interface AvatarRadixProps extends BaseProps {
  icon: React.ReactNode;
  size?: Size;
  src?: string;
}
