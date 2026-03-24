import { Align, Side } from '../../types/common.types';

export interface PopoverProps {
  trigger: React.ReactNode;   
  content: React.ReactNode; 
  onDateSelect?: (date: Date) => void;
  align?: Align;
  side?: Side;
  /** Distância em pixels entre o conteúdo e o trigger */
  sideOffset?: number;
  /** Controla o estado aberto/fechado (modo controlado) */
  open?: boolean;
  /** Callback chamado quando o estado aberto/fechado muda */
  onOpenChange?: (open: boolean) => void;
}