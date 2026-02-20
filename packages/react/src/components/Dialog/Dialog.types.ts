import { ReactNode } from 'react';

import { BaseProps } from '../../types/common.types';

export interface DialogProps extends BaseProps, React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  title?: string;
  text?: ReactNode;
  textConfirm?: string;
  textCancel?: string;
}
