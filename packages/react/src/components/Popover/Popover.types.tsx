import { Align, Side } from '../../types/common.types';

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  onDateSelect?: (date: Date) => void;
  align?: Align;
  side?: Side;
  /** Distância em pixels entre o conteúdo e o trigger */
  sideOffset?: number;
  /** Controla o estado de abertura em modo controlado */
  open?: boolean;
  /** Callback chamado quando o estado de abertura muda */
  onOpenChange?: (open: boolean) => void;
  /** Callback chamado ao abrir — chamar e.preventDefault() cancela o foco automático */
  onOpenAutoFocus?: (e: Event) => void;
}