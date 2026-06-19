import React from 'react';

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
}