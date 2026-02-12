import * as React from 'react';

export interface ToastMessage {
  id?: string;
  titulo?: string;
  descricao?: string;
  automaticClose?: boolean;
  duration?: number;
  icon?: React.ReactNode;
  iconClosed?: React.ReactNode;
  iconType?: 'Info' | 'Sucess' | 'Alert';
}

export interface ToastProps extends ToastMessage {
  id: string;
}