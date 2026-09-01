import * as React from 'react';
import { ReactNode } from 'react';

import { ScalableProps } from '../../types/common.types';

/**
 * Props base compartilhadas por todas as configurações de tooltip do select.
 */
interface BaseTooltipConfig {
  /** Lado em que o tooltip será exibido */
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
  /** Alinhamento do tooltip */
  tooltipAlign?: 'start' | 'center' | 'end';
}

/**
 * Configuração de tooltip com texto.
 * Exibe um tooltip ao redor da label do select.
 */
interface WithTooltip extends BaseTooltipConfig {
  /** Texto do tooltip exibido no hover */
  tooltipText: string;
}

/**
 * Configuração sem tooltip.
 */
interface WithoutTooltip {
  tooltipText?: never;
  tooltipSide?: never;
  tooltipAlign?: never;
}

/**
 * Union type representando a configuração de tooltip do select.
 * Pode ter tooltip com texto (e opcionalmente side/align) ou sem tooltip.
 */
export type SelectTooltipConfig = WithTooltip | WithoutTooltip;

/**
 * Representa um item do select
 */
export interface SelectItemProps extends ScalableProps {
  
  /** Texto principal do item */
  text: ReactNode;
  
  /** Subtítulo ou descrição do item */
  subTitle?: ReactNode;
  
  /** Ícone do item */
  icon?: ReactNode;
  
  /** Valor do item */
  value: string;
  
  /** Define se o item está selecionado */
  selected?: boolean;
  
  /** Subitens do select (para selects aninhados) */
  children?: SelectItemProps[];
}

/**
 * Props de um item com checkbox
 */
export interface CheckboxItemProps extends SelectItemProps {
  /** Estado de checked do checkbox */
  checked: boolean;
  
  /** Callback executado quando o estado muda: (checked) => void */
  onCheckedChange: (checked: boolean) => void;
}

/** Variantes disponíveis para o Select */
export type SelectVariant = 'text' | 'icon' | 'checkbox';

/**
 * Props do componente Select
 * @example
 * ```tsx
 * <Select 
 *   items={[
 *     { value: '1', text: 'Opção 1' },
 *     { value: '2', text: 'Opção 2' }
 *   ]}
 *   variant="text"
 *   placeholder="Selecione uma opção"
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 * @example
 * ```tsx
 * <Select 
 *   items={options}
 *   variant="checkbox"
 *   multiple={true}
 *   search={true}
 *   label="Selecione múltiplas opções"
 *   helperText="Você pode selecionar mais de uma"
 *   required={true}
 * />
 * ```
 */
interface SelectPropsBase extends ScalableProps {
  /** Array de itens do select */
  items: SelectItemProps[];
  
  /** Callback executado quando o valor muda: (value) => void */
  onValueChange?: (value: string | string[]) => void;
  
  /** Callback executado quando o select abre/fecha: (open) => void */
  onOpenChange?: (open: boolean) => void;
  
  /** Variante visual do select */
  variant: SelectVariant;
  
  /** Define se o campo é obrigatório */
  required?: boolean;
  
  /** Valor(es) selecionado(s) */
  value?: string | string[];
  
  /** Habilita seleção múltipla */
  multiple?: boolean;
  
  /** Placeholder do campo */
  placeholder?: string;
  
  /** Habilita campo de busca */
  search?: boolean;
  
  /** Label do campo */
  label?: string;
  
  /** Texto de ajuda exibido abaixo do campo */
  helperText?: string;
  
  /** Largura máxima do select */
  maxWidth?: number;
  
  /** Indica estado de erro externo */
  error?: boolean;

  /** Mensagem de erro a ser exibida */
  errorMessage?: string;
  
  /** Label acessível para leitores de tela */
  'aria-label'?: string;
  
  /** ID para testes automatizados */
  'data-testid'?: string;

  /** Habilita scroll infinito */
  enableInfiniteScroll?: boolean;
  
  /** Callback executado ao chegar ao final do scroll: () => void */
  onScrollEnd?: () => void;
  
  /** Indica se há mais itens disponíveis para carregamento */
  hasMore?: boolean;

  /** Estado de carregamento de mais itens */
  isLoadingMore?: boolean;
  
  /** Habilita busca via API */
  enableApiSearch?: boolean;
  
  /** Callback executado na busca via API: (term) => void */
  onApiSearch?: (term: string) => void;
  
  /** Estado de busca em andamento */
  isSearching?: boolean;
}

/**
 * Props completas do Select, incluindo a configuração de tooltip.
 *
 * O tooltip é ativado automaticamente quando `tooltipText` é informado,
 * e as props `tooltipSide` e `tooltipAlign` ficam disponíveis para posicionamento.
 */
export type SelectProps = SelectPropsBase & SelectTooltipConfig;

/**
 * Estado interno do componente Select
 */
export interface SelectState {
  /** Define se o select está aberto */
  isOpen: boolean;
  
  /** Valores selecionados */
  selectedValues: string[];
  
  /** Texto digitado no campo de busca */
  searchInput: string;
  
  /** Termo de busca aplicado */
  searchTerm: string;
  
  /** Define se o campo foi tocado */
  touched: boolean;
  
  /** Define se há erro de validação */
  hasError: boolean;
}

/** Ações disponíveis para o reducer do Select */
export type SelectAction =
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'SET_SELECTED_VALUES'; payload: string[] }
  | { type: 'SET_SEARCH_INPUT'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_TOUCHED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: boolean }
  | { type: 'RESET_SEARCH' }
  | { type: 'VALIDATE'; payload: { required: boolean } };

/**
 * Props do hook useSelectLogic
 */
export interface UseSelectLogicProps {
  /** Valor(es) controlado(s) */
  value?: string | string[];
  
  /** Define se o campo é obrigatório */
  required?: boolean;
  
  /** Habilita busca */
  search?: boolean;
  
  /** Callback executado quando o valor muda: (value) => void */
  onValueChange?: (value: string | string[]) => void;
  
  /** Callback executado quando o select abre/fecha: (open) => void */
  onOpenChange?: (open: boolean) => void;
  
  /** Habilita busca via API */
  enableApiSearch?: boolean;
  
  /** Callback executado na busca via API: (term) => void */
  onApiSearch?: (term: string) => void;
  
  /** Estado de busca em andamento */
  isSearching?: boolean;

  /** Indica estado de erro externo (controlado pelo pai) */
  error?: boolean;
}

/**
 * Retorno do hook useSelectLogic
 */
export interface UseSelectLogicReturn {
  /** Estado atual do select */
  state: SelectState;
  
  /** Ações disponíveis */
  actions: {
    /** Define se o select está aberto */
    setOpen: (open: boolean) => void;
    /** Define os valores selecionados */
    setSelectedValues: (values: string[]) => void;
    /** Define o texto de busca */
    setSearchInput: (input: string) => void;
    /** Define o termo de busca aplicado */
    setSearchTerm: (term: string) => void;
    /** Define se o campo foi tocado */
    setTouched: (touched: boolean) => void;
    /** Define se há erro */
    setError: (error: boolean) => void;
    /** Reseta a busca */
    resetSearch: () => void;
    /** Valida o campo */
    validate: () => void;
    /** Manipula seleção simples */
    handleSingleSelect: (value: string) => void;
    /** Manipula seleção múltipla */
    handleMultipleSelect: (value: string, checked: boolean) => void;
  };
  
  /** Valores computados */
  computed: {
    /** Texto a ser exibido no campo */
    displayText: string;
    /** Itens filtrados pela busca */
    filteredItems: SelectItemProps[];
  };
  
  /** Referências */
  refs: {
    /** Referência do input de busca */
    searchInputRef: React.RefObject<HTMLInputElement | null>;
  };
  
  /** Funções utilitárias */
  utils: {
    /** Obtém o texto a ser exibido */
    getDisplayText: (
      selectedValues: string[],
      placeholder: string,
      variant: string,
      items: SelectItemProps[]
    ) => string;
    /** Filtra os itens pela busca */
    getFilteredItems: (items: SelectItemProps[], searchTerm: string) => SelectItemProps[];
  };
}
