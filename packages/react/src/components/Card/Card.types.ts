import React from 'react';

/** Valores permitidos para o raio das bordas do Card, baseados nos tokens de border-radius do design system */
export type CardBorderRadius = 4 | 8 | 12 | 16 | 24 | 'none' | 'pill' | 'circular';

/**
 * Props do componente Card
 * @example
 * ```tsx
 * <Card>
 *   <h1>Conteúdo da página</h1>
 *   <p>Texto dentro do card</p>
 * </Card>
 * ```
 */
export interface CardProps {
  /** Conteúdo a ser renderizado dentro do card */
  children: React.ReactNode;
  /** Classe CSS customizada aplicada ao elemento raiz do card */
  className?: string;

  /** Define se o card é interativo, aplicando estilos de hover e cursor pointer */
  hoverable?: boolean;

  /** Raio das bordas do card, baseado nos tokens de border-radius do design system. O padrão é 8 (8px) */
  borderRadius?: CardBorderRadius;
}