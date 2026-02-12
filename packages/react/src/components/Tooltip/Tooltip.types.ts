import React from 'react';
import { BaseProps, Side, Align } from '@/types';

export interface TooltipProps extends BaseProps {
  text: React.ReactNode;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  maxWidth?: number;
  children: React.ReactNode;
}
