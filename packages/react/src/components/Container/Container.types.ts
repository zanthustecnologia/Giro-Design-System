import React from 'react';

/**
 * Props do componente Container
 * @example
 * ```tsx
 * <Container>
 *   <h1>Conteúdo da página</h1>
 *   <p>Texto dentro do container</p>
 * </Container>
 * ```
 */
export interface ContainerProps {
  /** Conteúdo a ser renderizado dentro do container */
  children: React.ReactNode;
  /** Classe CSS customizada aplicada ao elemento raiz do container */
  className?: string;
}
