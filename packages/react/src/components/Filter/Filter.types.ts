import { ReactNode, ReactElement } from 'react';
import { DropdownItem, DropdownType } from '../Dropdown/Dropdown.types';

import { Variant, BaseProps, Locale } from '../../types/common.types';

export interface FilterProps {
  /** Items para o dropdown */
  items?: DropdownItem[];
  /** Tipo do dropdown */
  type?: DropdownType | 'calendar';
  /** IDs selecionados */
  selectedIds?: string[];
  /** Callback quando aplicar filtros */
  onApplyFilter?: (selectedIds: string[]) => void;
  /** Placeholder do dropdown */
  placeholder?: string;
  /** Habilita busca no dropdown */
  enableSearch?: boolean;
  /** Texto do botão do filtro */
  buttonText?: string | ReactNode;
  /** Ícone do botão */
  icon?: ReactElement;
  /** Variante do botão */
  variant?: Variant;
  /** Callback chamado quando o filtro é aberto */
  onOpen?: () => void;
  /** Callback chamado quando o filtro é fechado */
  onClose?: () => void;
  /** Posição do dropdown */
  position?: 'left' | 'right';
  /** Se o filtro está desabilitado */
  disabled?: BaseProps['disabled'];
  /** Classes CSS adicionais */
  className?: BaseProps['className'];
  /** Data selecionada (quando type='calendar') */
  selectedDate?: Date | null;
  /** Callback quando data é selecionada */
  onDateSelect?: (date: Date) => void;
  /** Callback para limpar data */
  onClearDate?: () => void;
  /** Data mínima permitida */
  minDate?: Date;
  /** Data máxima permitida */
  maxDate?: Date;
  /** Locale do calendar */
  locale?: Locale;
}
