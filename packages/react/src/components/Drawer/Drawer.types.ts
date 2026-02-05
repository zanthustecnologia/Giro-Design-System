import { ReactNode, ReactElement } from 'react';

import { Variant, BaseProps } from '../../types/common.types';

export interface DrawerProps {
  children?: ReactNode;
  customWidth?: string;
  onClose: () => void;
  title?: string;
  isOpen: boolean;
  onOpen?: () => void;
  className?: BaseProps['className'];
  id?: BaseProps['id'];
  disabled?: BaseProps['disabled'];
  onOverlayClick?: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface DrawerExampleProps {
  text?: string;
  icon?: ReactElement;
  children?: ReactNode;
  onOpen?: () => void;
  className?: BaseProps['className'];
  variant?: Variant;
  disabled?: BaseProps['disabled'];
}
