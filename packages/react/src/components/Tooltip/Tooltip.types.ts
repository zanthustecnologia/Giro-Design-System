import React from 'react';

import { BaseProps, Side, Align } from '@/types';

export interface TooltipProps extends BaseProps {
  /** Conteúdo textual exibido dentro do tooltip */
  text: React.ReactNode;

  /** Lado em que o tooltip aparece em relação ao elemento filho. @default 'top' */
  side?: Side;

  /** Alinhamento do tooltip em relação ao elemento filho. @default 'center' */
  align?: Align;
  
  /** Deslocamento em pixels no eixo lateral (side) entre o tooltip e o elemento filho */
  sideOffset?: number;
  
  /** Deslocamento em pixels no eixo de alinhamento */
  alignOffset?: number;
  
  /** Largura máxima do tooltip em pixels */
  maxWidth?: number;
  
  /** Elemento que dispara o tooltip ao hover */
  children: React.ReactNode;

  /** Classe CSS opcional */
  className?: string;
}
