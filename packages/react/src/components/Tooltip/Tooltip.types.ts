import { Tooltip as TooltipRadix } from 'radix-ui';
import React from 'react';

export interface TooltipProps extends Omit<
  React.ComponentPropsWithoutRef<typeof TooltipRadix.Content>,
  'side' | 'align' | 'sideOffset'
> {
  text: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  maxWidth?: number;
  children: React.ReactNode;
}
