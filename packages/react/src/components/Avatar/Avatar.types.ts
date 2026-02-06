import React from 'react';

import { Size, BaseProps } from '../../types/common.types';

/**
 * Props do componente Avatar
 * @example
 * ```tsx
 * <Avatar icon={<UserIcon />} size="lg" />
 * ```
 * @example
 * ```tsx
 * <Avatar 
 *   icon={<ProfileIcon />} 
 *   size="sm"
 *   className="custom-avatar"
 * />
 * ```
 */
export interface AvatarProps {
  /** ID único do elemento */
  id?: BaseProps['id'];
  
  /** Ícone ou conteúdo a ser exibido no avatar */
  icon: React.ReactNode;
  
  /** Tamanho do avatar */
  size?: Size;
  
  /** Classe CSS customizada */
  className?: BaseProps['className'];
}
