import { Align, Side } from '../../types/common.types';

export interface PopoverProps {
  children: React.ReactNode;
  onDateSelect?: (date: Date) => void;
  align?: Align;
  side?: Side;
}