import React from 'react';

export interface TooltipRadixProps {
  id?: string;
  text: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  children: React.ReactNode;
}
