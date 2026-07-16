import { BaseProps } from '@/types';

/** Posições possíveis do balão de cada passo */
export type TourStepPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

/** Definição de um passo do tour */
export interface TourStep {
  /** Seletor CSS ou referência ao elemento alvo do passo. Se omitido, o balão é centralizado */
  element?: string | Element;
  /** Conteúdo do balão (texto ou HTML) */
  intro: string;
  /** Título exibido no topo do balão */
  title?: string;
  /** Posição do balão em relação ao elemento alvo */
  position?: TourStepPosition;
}

export interface TourProps extends BaseProps {
  /** Lista de passos do tour */
  steps: TourStep[];
  /** Controla se o tour está ativo */
  isOpen: boolean;
  /** Disparado quando o usuário encerra o tour antes de concluir */
  onExit?: () => void;
  /** Disparado quando o usuário conclui todos os passos */
  onComplete?: () => void;
  /** Índice do passo inicial */
  initialStep?: number;
}
