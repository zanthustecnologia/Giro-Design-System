import { ReactNode } from 'react';

export interface DialogRadixProps {
  children?: ReactNode;
  show: boolean;
  title: string;
  text?: ReactNode;
  textConfirm?: string;
  textCancel?: string;
  fnConfirm?: () => void;
  fnCancel?: () => void;
  onClose?: () => void;
  id?: string;
  className?: string;
}
