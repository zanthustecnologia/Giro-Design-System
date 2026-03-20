import { Align, Side } from '../../types/common.types';

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  onDateSelect?: (date: Date) => void;
  align?: Align;
  side?: Side;
  /** Controla o estado de abertura em modo controlado */
  open?: boolean;
  /** Callback chamado quando o estado de abertura muda */
  onOpenChange?: (open: boolean) => void;
  /** Exibe a seta indicadora. Padrão: true */
  showArrow?: boolean;
  /** Callback chamado ao abrir — chamar e.preventDefault() cancela o foco automático */
  onOpenAutoFocus?: (e: Event) => void;
}