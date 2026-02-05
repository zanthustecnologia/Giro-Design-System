import React from 'react';

import { TextVariant, BaseProps } from '../../types/common.types';

export interface CalloutProps {
  type?: TextVariant;
  title?: string | null;
  text?: string;
  icon?: React.ReactNode;
  className?: BaseProps['className'];
  id?: BaseProps['id'];
  [key: string]: any;
}
