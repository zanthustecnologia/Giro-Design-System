import { ReactNode } from 'react';

export interface DialogRadixProps {
  children?: ReactNode;
  title?: string;
  text?: ReactNode;
  textConfirm?: string;
  textCancel?: string;
  id?: string;
  className?: string;
}
