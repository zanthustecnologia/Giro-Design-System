import { ReactNode } from 'react';
import { BaseProps } from '../../types/common.types';

export interface DialogProps extends BaseProps {
  children?: ReactNode;
  title?: string;
  text?: ReactNode;
  textConfirm?: string;
  textCancel?: string;
}
