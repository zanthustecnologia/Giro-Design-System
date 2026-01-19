import React from 'react';

export interface TooltipProps {
  id?: string;
  text: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  maxWidth?: number;
  children: React.ReactNode;
}
