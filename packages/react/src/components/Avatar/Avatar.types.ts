import React from 'react';

/**
 * Props do componente Avatar
 * @example
 * ```tsx
 * <Avatar icon={<UserIcon />} size="large" />
 * ```
 * @example
 * ```tsx
 * <Avatar 
 *   icon={<ProfileIcon />} 
 *   size="small"
 *   className="custom-avatar"
 * />
 * ```
 */
export interface AvatarProps {
  /** ID único do elemento */
  id?: string;
  
  /** Ícone ou conteúdo a ser exibido no avatar */
  icon: React.ReactNode;
  
  /** Tamanho do avatar */
  size?: 'small' | 'large';
  
  /** Classe CSS customizada */
  className?: string;
}
