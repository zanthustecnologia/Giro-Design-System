import { Toast as ToastRadix } from 'radix-ui';
import * as React from 'react';

export interface ToastProps extends Omit<
  React.ComponentPropsWithoutRef<typeof ToastRadix.Root>,
   'disabled' 
> {
  disabled?: boolean;
  children: React.ReactNode;
  message?: string;
  titulo?: string;
  descricao?: string;
  acao?: string;
  close?: string;
  automaticClose?: boolean;
  duration?: number;
}