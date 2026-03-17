import React from 'react';
import { BaseProps, Side, Align } from '@/types';

export interface TooltipProps extends BaseProps {
  text: React.ReactNode;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  
  /** Deslocamento em pixels no eixo de alinhamento */
  alignOffset?: number;
  
  /** Largura máxima do tooltip em pixels */
  maxWidth?: number;
  
  /** Elemento que dispara o tooltip ao hover */
  children: React.ReactNode;
}
