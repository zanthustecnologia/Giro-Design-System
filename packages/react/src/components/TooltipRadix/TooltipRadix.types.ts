import React from 'react';

export interface TooltipRadixProps {
  id?: string;
  text: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';
  children: React.ReactNode;
}
