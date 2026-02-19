import * as React from 'react';

import { Size, BaseProps } from '../../types';

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
export interface AvatarProps extends BaseProps {
  
  /** Ícone ou conteúdo a ser exibido no avatar */
  icon: React.ReactNode;
  
  /** Tamanho do avatar */
  size?: Size;
}
