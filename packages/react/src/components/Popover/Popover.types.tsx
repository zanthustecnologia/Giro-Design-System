import { Align, Side } from '../../types/common.types';

export interface PopoverProps {
  trigger: React.ReactNode;   
  content: React.ReactNode; 
  onDateSelect?: (date: Date) => void;
  align?: Align;
  side?: Side;
}