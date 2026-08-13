import { ReactNode } from 'react';

import { BaseProps } from '../../types/common.types';

/**
 * Representa uma aba individual do componente Tabs.
 * Agrupa o rótulo (Trigger) e o conteúdo (Content) de cada painel.
 */
export interface TabsItemProps {
  /** Identificador único da aba — deve ser único dentro do conjunto */
  value: string;

  /** Rótulo exibido no botão de aba (Trigger) */
  label: ReactNode;

  /** Conteúdo exibido quando a aba está ativa (Content) */
  content: ReactNode;

  /** Quando `true`, desabilita a aba individualmente */
  disabled?: boolean;

  /** Ícone opcional exibido ao lado do rótulo no Trigger */
  icon?: ReactNode;
}

/**
 * Props do componente Tabs
 * @example
 * ```tsx
 * <Tabs
 *   defaultValue="tab1"
 *   items={[
 *     { value: 'tab1', label: 'Geral', content: <p>Conteúdo geral</p> },
 *     { value: 'tab2', label: 'Detalhes', content: <p>Detalhes aqui</p> },
 *   ]}
 * />
 * ```
 * @example
 * ```tsx
 * <Tabs
 *   value={activeTab}
 *   onValueChange={setActiveTab}
 *   scrollAmount={200}
 *   items={tabs}
 * />
 * ```
 */
export interface TabsProps extends BaseProps {
  /** Lista de abas a serem renderizadas */
  items: TabsItemProps[];

  /** Aba ativa inicial em modo não controlado */
  defaultValue?: string;

  /** Aba ativa em modo controlado */
  value?: string;

  /** Callback executado ao trocar de aba: (value) => void */
  onValueChange?: (value: string) => void;

  /**
   * Modo de ativação das abas ao navegar por teclado.
   * - `'automatic'`: ativa a aba assim que o Trigger recebe foco.
   * - `'manual'`: requer pressionar Enter/Space para ativar.
   * @default 'automatic'
   */
  keyboardActivationMode?: 'automatic' | 'manual';

  /** Quando `true`, a navegação por teclado volta ao início ao atingir o último Trigger. @default true */
  loop?: boolean;

  /**
   * Quantidade de pixels percorridos por clique nas setas de scroll. Visível apenas em desktop quando as abas excedem o container. @default 150
   */
  scrollAmount?: number;

  /** Label acessível para leitores de tela */
  'aria-label'?: string;

  /** ID para testes automatizados */
  'data-testid'?: string;
}
