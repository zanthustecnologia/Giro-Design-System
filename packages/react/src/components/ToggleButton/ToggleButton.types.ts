import { ReactNode } from 'react';

import { ScalableProps, Size } from '../../types/common.types';

/** Modo do componente: 'simple' (toggle único) ou 'combined' (grupo de toggles) */
export type ToggleButtonMode = 'simple' | 'combined';

/** Tipo de seleção do grupo: 'single' (um item) ou 'multiple' (múltiplos itens) */
export type ToggleGroupType = 'single' | 'multiple';

interface BaseTooltipConfig {
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
  tooltipAlign?: 'start' | 'center' | 'end';
}

interface WithTooltip extends BaseTooltipConfig {
  /** Texto do tooltip exibido no hover */
  tooltipText: string;
}

interface WithoutTooltip {
  tooltipText?: never;
  tooltipSide?: never;
  tooltipAlign?: never;
}

export type ToggleButtonTooltipConfig = WithTooltip | WithoutTooltip;

/**
 * Item de um ToggleGroup
 */
export interface ToggleGroupItem {
  /** Valor único do item (usado em `value` e `onValueChange`) */
  value: string;
  /** Conteúdo textual ou nó React exibido no item */
  label?: ReactNode;
  /** Ícone exibido à esquerda do label */
  icon?: ReactNode;
  /** Exibe somente o ícone, sem label */
  iconOnly?: boolean;
  /** Exibe somente o ícone quando não selecionado; ícone + label quando selecionado */
  expandOnSelect?: boolean;
  /** Desabilita o item, impedindo sua seleção */
  disabled?: boolean;
}

/** @internal */
type ToggleGroupSingleSelectionProps = {
  selectionType?: 'single';
  /** Valor do Toggle selecionado controlado */
  value?: string;
  /** Valor do Toggle selecionado padrão (não controlado) */
  defaultValue?: string;
  /**
   * Callback chamado quando o Toggle selecionado muda.
   * Retorna o `value` do Toggle selecionado.
   */
  onValueChange?: (value: string) => void;
};

/** @internal */
type ToggleGroupMultipleSelectionProps = {
  selectionType: 'multiple';
  /** Valores dos Toggles selecionados controlados */
  value?: string[];
  /** Valores dos Toggles selecionados padrão (não controlados) */
  defaultValue?: string[];
  /**
   * Callback chamado quando os Toggles selecionados mudam.
   * Retorna um array com os `value`s dos Toggles selecionados.
   */
  onValueChange?: (value: string[]) => void;
};

/**
 * Props específicas do ToggleGroup (modo `combined`).
 *
 * Use a prop `onValueChange` para saber qual Toggle está selecionado:
 * - `selectionType="single"` → `onValueChange: (value: string) => void`
 * - `selectionType="multiple"` → `onValueChange: (value: string[]) => void`
 */
export type ToggleGroupProps = {
  /** Items do grupo de toggles */
  items?: ToggleGroupItem[];
  /**
   * Exibe somente o ícone dos itens não selecionados; ícone + label no item selecionado.
   * Aplica-se a todos os itens do grupo. Pode ser sobrescrito individualmente via `item.expandOnSelect`.
   */
  expandOnSelect?: boolean;
} & (ToggleGroupSingleSelectionProps | ToggleGroupMultipleSelectionProps);

/**
 * Props do componente ToggleButton
 * @example
 * ```tsx
 * // Toggle único (modo simple — padrão)
 * <ToggleButton mode="simple" onPressedChange={(pressed) => console.log(pressed)}>
 *   Negrito
 * </ToggleButton>
 * ```
 * @example
 * ```tsx
 * // Grupo de toggles (modo combined)
 * <ToggleButton
 *   mode="combined"
 *   type="single"
 *   items={[
 *     { value: 'left', label: 'Esquerda' },
 *     { value: 'center', label: 'Centro' },
 *     { value: 'right', label: 'Direita' },
 *   ]}
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 */
export type ToggleButtonProps = ScalableProps & {
  /** Modo do componente: `'simple'` (toggle único, padrão) ou `'combined'` (grupo de toggles) */
  mode?: ToggleButtonMode;

  /** Tamanho do componente: `'lg'` (padrão) ou `'sm'` */
  size?: Size;

  /** Ícone exibido à esquerda do conteúdo (modo simple) */
  icon?: ReactNode;

  /** Exibe somente o ícone, sem texto (modo simple) */
  iconOnly?: boolean;

  /** Texto exibido no botão (modo simple) */
  label?: string;

  // ----- Toggle (modo simple) -----

  /** Estado pressionado controlado (modo simple) */
  pressed?: boolean;

  /** Estado pressionado padrão não controlado (modo simple) */
  defaultPressed?: boolean;

  /** Callback ao alterar estado pressionado: `(pressed: boolean) => void` (modo simple) */
  onPressedChange?: (pressed: boolean) => void;

  // ----- ToggleGroup (modo combined) -----

} & ToggleGroupProps & ToggleButtonTooltipConfig;
