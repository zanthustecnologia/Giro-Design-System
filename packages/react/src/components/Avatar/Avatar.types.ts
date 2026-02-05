import React from 'react';

import { Size, BaseProps } from '../../types/common.types';

export interface AvatarProps {
  id?: BaseProps['id'];
  icon: React.ReactNode;
  size?: Size;
  className?: BaseProps['className'];
}
