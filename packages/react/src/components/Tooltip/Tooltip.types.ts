import React from 'react';

import { Side, Align, BaseProps } from '../../types/common.types';

/**
 * Props do componente Tooltip
 * @example
 * ```tsx
 * <Tooltip text="Informação adicional">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 * @example
 * ```tsx
 * <Tooltip 
 *   text="Clique para mais detalhes"
 *   side="top"
 *   align="center"
 *   sideOffset={10}
 *   maxWidth={300}
 * >
 *   <IconButton icon={<InfoIcon />} />
 * </Tooltip>
 * ```
 */
export interface TooltipProps {
  /** ID único do elemento */
  id?: BaseProps['id'];
  
  /** Conteúdo do tooltip */
  text: React.ReactNode;
  
  /** Lado onde o tooltip aparece em relação ao elemento */
  side?: Side;
  
  /** Alinhamento do tooltip */
  align?: Align;
  
  /** Distância em pixels do lado do elemento */
  sideOffset?: number;
  
  /** Deslocamento em pixels no eixo de alinhamento */
  alignOffset?: number;
  
  /** Largura máxima do tooltip em pixels */
  maxWidth?: number;
  
  /** Elemento que dispara o tooltip ao hover */
  children: React.ReactNode;
}
