import * as React from 'react';

import { BaseProps, Size } from '../../types';

/**
 * Props do componente Avatar
 * @example
 * ```tsx
 * // Avatar com ícone
 * <Avatar icon={<UserIcon />} size="lg" />
 * 
 * // Avatar com imagem
 * <Avatar src="https://example.com/avatar.jpg" icon={<UserIcon />} size="sm" />
 * ```
 */
export interface AvatarProps extends Omit<BaseProps, 'disabled'> {
  /** Ícone ou conteúdo a ser exibido no fallback quando não há imagem ou ela falha ao carregar */
  icon?: React.ReactNode;
  /** Tamanho do avatar: 'sm' (32px) ou 'lg' (44px). @default 'lg' */
  size?: Size;
  /** URL da imagem do avatar. Quando fornecido, exibe a imagem; caso contrário, mostra o ícone */
  src?: string;
  /** Texto alternativo da imagem do avatar, usado como as iniciais do nome */
  initialLetters?: string;
}
