import { ReactNode } from 'react';

import { ScalableProps, Size } from '../../types/common.types';

/** Modo do componente: 'simple' (toggle único) ou 'combined' (grupo de toggles) */
export type ToggleButtonMode = 'simple' | 'combined';

/** Tipo de seleção do grupo: 'single' (um item) ou 'multiple' (múltiplos itens) */
export type ToggleGroupType = 'single' | 'multiple';

/** Orientação do grupo de toggles */
export type ToggleButtonOrientation = 'horizontal' | 'vertical';

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
  /** Desabilita o item, impedindo sua seleção */
  disabled?: boolean;
}

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

  /** Conteúdo do botão (modo combined) */
  children?: ReactNode;

  // ----- Toggle (modo combined) -----

  /** Estado pressionado controlado (modo combined) */
  pressed?: boolean;

  /** Estado pressionado padrão não controlado (modo combined) */
  defaultPressed?: boolean;

  /** Callback ao alterar estado pressionado: `(pressed: boolean) => void` (modo combined) */
  onPressedChange?: (pressed: boolean) => void;

  // ----- ToggleGroup (modo simple) -----

  /** Tipo de seleção do grupo: `'single'` ou `'multiple'` (modo simple) */
  selectionType?: ToggleGroupType;

  /** Valor(es) selecionado(s) controlado(s) (modo simple) */
  value?: string | string[];

  /** Valor(es) padrão(ões) não controlado(s) (modo simple) */
  defaultValue?: string | string[];

  /** Callback ao alterar seleção (modo simple) */
  onValueChange?: (value: string | string[]) => void;

  /** Orientação do grupo: `'horizontal'` ou `'vertical'` (modo simple) */
  orientation?: ToggleButtonOrientation;

  /** Items do grupo de toggles (modo simple) */
  items?: ToggleGroupItem[];
} & ToggleButtonTooltipConfig;
