import * as React from 'react';
import { ReactNode, ReactElement } from 'react';

import { DropdownItem, DropdownType } from '../Dropdown/Dropdown.types';

type FilterButtonVariant = 'filled' | 'outlined' | 'text';

export interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
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
  variant?: FilterButtonVariant;
  /** Callback chamado quando o filtro é aberto */
  onOpen?: () => void;
  /** Callback chamado quando o filtro é fechado */
  onClose?: () => void;
  /** Posição do dropdown */
  position?: 'left' | 'right';
  /** Se o filtro está desabilitado */
  disabled?: boolean;
  /** Classes CSS adicionais */
  className?: string;
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
  locale?: 'pt-br' | 'en-us';
}
