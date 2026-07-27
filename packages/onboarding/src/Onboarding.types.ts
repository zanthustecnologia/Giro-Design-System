/** Modo de exibição do Onboarding */
export type OnboardingMode = 'tour' | 'hint';

/** Posições possíveis do balão de cada passo */
export type OnboardingStepPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

/** Comportamento de scroll por passo ou por tour. @default 'element' */
export type OnboardingScrollTo = 'off' | 'element' | 'tooltip';

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

/**
 * Definição de um passo do tour.
 * Cada passo pode apontar para um elemento da página ou ser um balão flutuante centralizado.
 *
 * @example
 * ```ts
 * const step: OnboardingStep = {
 *   element: '#meu-botao',
 *   title: 'Salvar',
 *   intro: 'Clique aqui para salvar as alterações.',
 *   position: 'bottom',
 *   disableInteraction: true,
 * };
 * ```
 */
export interface OnboardingStep {
  /** Seletor CSS ou referência ao elemento alvo do passo. Se omitido, o balão é centralizado */
  element?: string | Element;
  /** Conteúdo do balão (texto ou HTML) */
  intro: string;
  /** Título exibido no topo do balão */
  title?: string;
  /** Posição do balão em relação ao elemento alvo */
  position?: OnboardingStepPosition;
  /** Classe CSS adicional aplicada ao tooltip deste passo */
  tooltipClass?: string;
  /** Classe CSS adicional aplicada ao highlight (borda de destaque) deste passo */
  highlightClass?: string;
  /** Bloqueia interação com o elemento destacado durante este passo */
  disableInteraction?: boolean;
  /** Comportamento de scroll para este passo específico */
  scrollTo?: OnboardingScrollTo;
  /** Número explícito do passo para uso com o atributo data-step */
  step?: number;
}

/**
 * Definição de um hint fixo na página.
 * Hints são marcadores clicáveis que exibem um balão de informação quando ativados.
 *
 * @example
 * ```ts
 * const hint: OnboardingHint = {
 *   element: '#campo-email',
 *   hint: 'Informe seu e-mail corporativo.',
 *   hintPosition: 'top-middle',
 * };
 * ```
 */
export interface OnboardingHint {
  /** Seletor CSS ou referência ao elemento onde o marcador será exibido */
  element: string | Element;
  /** Texto exibido ao clicar no marcador */
  hint: string;
  /** Posição do marcador em relação ao elemento alvo. @default 'top-middle' */
  hintPosition?: OnboardingHintPosition;
}

interface OnboardingBaseProps {
  /** Identificador único do elemento HTML */
  id?: string;
  /** Classes CSS adicionais */
  className?: string;
  /** Controla se o onboarding está ativo */
  isOpen: boolean;
}

/**
 * Props para o modo tour (guia passo a passo).
 * O tour exibe um overlay com balões sequenciais guiando o usuário pelos elementos da página.
 *
 * @example
 * ```tsx
 * <Onboarding
 *   isOpen={isOpen}
 *   steps={[
 *     { element: '#btn-salvar', title: 'Salvar', intro: 'Clique aqui para salvar.' },
 *     { intro: 'Tour concluído!' },
 *   ]}
 *   onComplete={() => setIsOpen(false)}
 *   onExit={() => setIsOpen(false)}
 * />
 * ```
 * @example
 * ```tsx
 * // Com opções avançadas
 * <Onboarding
 *   isOpen={isOpen}
 *   steps={steps}
 *   showProgress
 *   exitOnOverlayClick={false}
 *   dontShowAgain
 *   dontShowAgainLabel="Não mostrar novamente"
 *   onBeforeChange={(el) => console.log('indo para', el)}
 *   onSkip={() => trackEvent('tour_skipped')}
 * />
 * ```
 */
export interface OnboardingTourProps extends OnboardingBaseProps {
  /** Modo de exibição. @default 'tour' */
  mode?: 'tour';
  /** Lista de passos do tour */
  steps: OnboardingStep[];
  /** Índice do passo inicial. @default 0 */
  initialStep?: number;

  // — Callbacks —
  /** Disparado quando o usuário conclui todos os passos */
  onComplete?: () => void;
  /** Disparado quando o usuário encerra o tour antes de concluir */
  onExit?: () => void;
  /** Disparado quando o usuário clica no botão de pular */
  onSkip?: () => void;
  /** Disparado quando o tour inicia, recebendo o elemento alvo */
  onStart?: (element: HTMLElement) => void;
  /** Disparado ao trocar de passo, recebendo o elemento alvo */
  onChange?: (element: HTMLElement) => void;
  /** Disparado antes de trocar de passo. Retornar `false` ou `Promise<false>` cancela a transição */
  onBeforeChange?: (element: HTMLElement) => boolean | void | Promise<boolean | void>;
  /** Disparado após a troca de passo, recebendo o elemento alvo */
  onAfterChange?: (element: HTMLElement) => void;
  /** Disparado antes de sair do tour. Retornar `false` impede a saída */
  onBeforeExit?: () => boolean | Promise<boolean>;

  // — Labels —
  /** Texto do botão "Anterior". @default 'Voltar' */
  prevLabel?: string;
  /** Texto do botão "Próximo". @default 'Próximo' */
  nextLabel?: string;
  /** Texto do botão "Concluir". @default 'Concluir' */
  doneLabel?: string;
  /** Texto do botão "Pular". @default '✕' */
  skipLabel?: string;

  // — Visual —
  /** Exibe barra de progresso no tooltip. @default false */
  showProgress?: boolean;
  /** Exibe bullets de navegação no tooltip. @default true */
  showBullets?: boolean;
  /** Exibe botões de navegação. @default true */
  showButtons?: boolean;
  /** Exibe número do passo atual. @default false */
  showStepNumbers?: boolean;
  /** Classe CSS adicional aplicada a todos os tooltips do tour */
  tooltipClass?: string;
  /** Classe CSS adicional aplicada ao highlight de todos os passos */
  highlightClass?: string;
  /** Classe CSS adicional aplicada à barra de progresso */
  progressBarAdditionalClass?: string;
  /** Opacidade do overlay (0–1). @default 0.5 */
  overlayOpacity?: number;
  /** Espaçamento interno do helper element em pixels */
  helperElementPadding?: number;
  /** Renderiza conteúdo do balão como HTML */
  tooltipRenderAsHtml?: boolean;

  // — Comportamento —
  /** Fecha o tour ao pressionar ESC. @default true */
  exitOnEsc?: boolean;
  /** Fecha o tour ao clicar no overlay. @default true */
  exitOnOverlayClick?: boolean;
  /** Habilita navegação por teclado (setas). @default true */
  keyboardNavigation?: boolean;
  /** Rola a página até o elemento alvo. @default true */
  scrollToElement?: boolean;
  /** Alvo do scroll: 'element' rola até o elemento, 'tooltip' rola até o balão. @default 'element' */
  scrollTo?: OnboardingScrollTo;
  /** Espaçamento de scroll em pixels. @default 30 */
  scrollPadding?: number;
  /** Bloqueia interação com o elemento destacado em todos os passos */
  disableInteraction?: boolean;
  /** Substitui o botão "Próximo" por "Concluir" no último passo. @default true */
  nextToDone?: boolean;
  /** Oculta o botão "Anterior" no primeiro passo */
  hidePrev?: boolean;
  /** Oculta o botão "Próximo" no último passo */
  hideNext?: boolean;
  /** Reposiciona automaticamente o balão para evitar saída da viewport. @default true */
  autoPosition?: boolean;

  // — "Não mostrar novamente" —
  /** Habilita a opção "não mostrar novamente" (salva em cookie). @default false */
  dontShowAgain?: boolean;
  /** Texto do checkbox "não mostrar novamente" */
  dontShowAgainLabel?: string;
  /** Nome do cookie para a opção "não mostrar novamente" */
  dontShowAgainCookie?: string;
  /** Dias de validade do cookie. @default 365 */
  dontShowAgainCookieDays?: number;

  hints?: never;
}

/**
 * Props para o modo hint (marcadores fixos clicáveis na página).
 * Os hints são exibidos como pontos de destaque que, ao serem clicados, revelam um balão de informação.
 *
 * @example
 * ```tsx
 * <Onboarding
 *   mode="hint"
 *   isOpen={true}
 *   hints={[
 *     { element: '#campo-email', hint: 'Informe seu e-mail corporativo.' },
 *     { element: '#btn-salvar', hint: 'Salva todas as alterações feitas.', hintPosition: 'bottom-middle' },
 *   ]}
 * />
 * ```
 */
export interface OnboardingHintProps extends OnboardingBaseProps {
  /** Modo de exibição */
  mode: 'hint';
  /** Lista de hints a exibir na página */
  hints: OnboardingHint[];
  /** Texto do botão exibido ao expandir o hint. @default 'Got it' */
  hintButtonLabel?: string;
  /** Habilita animação de pulso no marcador. @default true */
  hintAnimation?: boolean;
  /** Exibe botão de fechar no balão do hint. @default true */
  hintShowButton?: boolean;
  /** Intervalo de auto-refresh dos hints em ms (0 = desabilitado). @default 0 */
  hintAutoRefreshInterval?: number;
  /** Classe CSS adicional aplicada ao tooltip dos hints */
  tooltipClass?: string;

  steps?: never;
  onExit?: never;
  onComplete?: never;
  initialStep?: never;
}

/**
 * Props do componente Onboarding.
 * Suporta dois modos de operação: **tour** (guia sequencial) e **hint** (marcadores fixos).
 *
 * @example
 * ```tsx
 * // Modo tour
 * <Onboarding
 *   isOpen={isOpen}
 *   steps={[
 *     { element: '#menu', title: 'Menu', intro: 'Acesse as seções pelo menu lateral.' },
 *     { element: '#dashboard', title: 'Dashboard', intro: 'Acompanhe seus indicadores aqui.' },
 *   ]}
 *   onComplete={() => setIsOpen(false)}
 *   onExit={() => setIsOpen(false)}
 * />
 * ```
 * @example
 * ```tsx
 * // Modo hint
 * <Onboarding
 *   mode="hint"
 *   isOpen={showHints}
 *   hints={[
 *     { element: '#filtro', hint: 'Filtre os resultados por período.' },
 *     { element: '#exportar', hint: 'Exporte os dados em CSV ou PDF.' },
 *   ]}
 * />
 * ```
 */
export type OnboardingProps = OnboardingTourProps | OnboardingHintProps;

