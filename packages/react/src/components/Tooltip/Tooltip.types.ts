import React from 'react';

import { Side, Align, BaseProps } from '../../types/common.types';

export interface TooltipProps {
  id?: BaseProps['id'];
  text: React.ReactNode;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  maxWidth?: number;
  children: React.ReactNode;
}
