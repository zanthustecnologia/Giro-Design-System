import { BaseProps } from '@/types';

/** Modo de exibição do Onboarding */
export type OnboardingMode = 'tour' | 'hint';

/** Posições possíveis do balão de cada passo */
export type OnboardingStepPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

/** Posições possíveis do marcador de hint */
export type OnboardingHintPosition =
  | 'top-left'
  | 'top-middle'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-middle'
  | 'bottom-right'
  | 'middle-left'
  | 'middle-middle'
  | 'middle-right';

/** Definição de um passo do tour */
export interface OnboardingStep {
  /** Seletor CSS ou referência ao elemento alvo do passo. Se omitido, o balão é centralizado */
  element?: string | Element;
  /** Conteúdo do balão (texto ou HTML) */
  intro: string;
  /** Título exibido no topo do balão */
  title?: string;
  /** Posição do balão em relação ao elemento alvo */
  position?: OnboardingStepPosition;
}

/** Definição de um hint fixo na página */
export interface OnboardingHint {
  /** Seletor CSS ou referência ao elemento onde o marcador será exibido */
  element: string | Element;
  /** Texto exibido ao clicar no marcador */
  hint: string;
  /** Posição do marcador em relação ao elemento alvo. @default 'top-middle' */
  hintPosition?: OnboardingHintPosition;
}

interface OnboardingBaseProps extends BaseProps {
  /** Controla se o onboarding está ativo */
  isOpen: boolean;
}

/** Props para o modo tour (guia passo a passo) */
export interface OnboardingTourProps extends OnboardingBaseProps {
  /** Modo de exibição. @default 'tour' */
  mode?: 'tour';
  /** Lista de passos do tour */
  steps: OnboardingStep[];
  /** Disparado quando o usuário encerra o tour antes de concluir */
  onExit?: () => void;
  /** Disparado quando o usuário conclui todos os passos */
  onComplete?: () => void;
  /** Índice do passo inicial */
  initialStep?: number;
  hints?: never;
}

/** Props para o modo hint (marcadores fixos na página) */
export interface OnboardingHintProps extends OnboardingBaseProps {
  /** Modo de exibição */
  mode: 'hint';
  /** Lista de hints a exibir na página */
  hints: OnboardingHint[];
  steps?: never;
  onExit?: never;
  onComplete?: never;
  initialStep?: never;
}

export type OnboardingProps = OnboardingTourProps | OnboardingHintProps;

