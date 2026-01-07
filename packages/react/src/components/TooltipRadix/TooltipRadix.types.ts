import React from 'react';

export interface TooltipRadixProps {
  id?: string;
  text: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  children: React.ReactNode;
}
