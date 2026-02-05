import React from 'react';

import { TextVariant, BaseProps } from '../../types/common.types';

export interface ChipsProps {
  type?: TextVariant;
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: BaseProps['disabled'];
  className?: BaseProps['className'];
  [key: string]: any;
}
