// Tipos para customização de tema em projetos consumidores
import type { GiroColors } from '@giro-ds/tokens';

/**
 * Utility type que torna todas propriedades opcionais recursivamente
 * @typeParam T - Tipo a ser transformado
 * @internal
 */
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Tipo para customização de cores do tema
 * 
 * Estende os tokens de cores do `@giro-ds/tokens` tornando todas as propriedades opcionais,
 * permitindo customização parcial do tema sem precisar redefinir todas as cores.
 * 
 * @remarks
 * Você pode sobrescrever apenas as cores que desejar customizar.
 * As cores não especificadas usarão os valores padrão do design system.
 * 
 * @example
 * ```tsx
 * const customColors: GiroThemeColors = {
 *   primary: {...},
 *   // Outras cores usarão valores padrão
 * };
 * ```
 * 
 * @see {@link GiroColors} do pacote `@giro-ds/tokens` para estrutura completa de cores
 * @see {@link GiroTheme} para usar este tipo no tema completo
 * 
 * @public
 */
export type GiroThemeColors = DeepPartial<GiroColors>;

/**
 * Configuração completa do tema customizado do Giro Design System
 * 
 * Define a estrutura do objeto de tema que pode ser passado ao {@link GiroThemeProvider}.
 * Atualmente, apenas cores são customizáveis através do tema.
 * 
 * @remarks
 * Outros tokens do design system (spacing, typography, border radius, shadows, etc.)
 * são importados automaticamente do pacote `@giro-ds/tokens` e não são customizáveis via tema.
 * 
 * Para customizar cores, forneça um objeto parcial seguindo a estrutura de {@link GiroThemeColors}.
 * 
 * @example
 * ```tsx
 * const lightTheme: GiroTheme = {
 *   colors: {
 *     primary: {...},
 *     background: {...}
 *   }
 * };
 * ```
 * 
 * @see {@link GiroThemeColors} para estrutura de cores customizáveis
 * @see {@link GiroThemeProvider} para usar o tema na aplicação
 * 
 * @public
 */
export interface GiroTheme {
  /**
   * Cores customizadas do tema
   * 
   * Objeto parcial que sobrescreve as cores padrão do design system.
   * Propriedades não especificadas usarão os valores padrão de `@giro-ds/tokens`.
   * 
   * @defaultValue `undefined` (usa cores padrão do design system)
   */
  colors?: GiroThemeColors;
}

/**
 * Modo do tema: claro ou escuro
 * 
 * @remarks
 * - `'light'` - Modo claro (padrão)
 * - `'dark'` - Modo escuro
 * 
 * O modo pode ser alterado via {@link GiroThemeContextValue.setMode} ou {@link GiroThemeContextValue.toggleMode}.
 * 
 * @see {@link GiroThemeProvider} para definir o modo inicial
 * @see {@link useGiroTheme} para alternar o modo em componentes
 * 
 * @public
 */
export type GiroThemeMode = 'light' | 'dark';

/**
 * Valor do contexto de tema retornado pelo hook {@link useGiroTheme}
 * 
 * Contém o estado atual do tema e métodos para manipulá-lo.
 * 
 * @remarks
 * Este tipo não deve ser usado diretamente. Use o hook {@link useGiroTheme} para acessar esses valores.
 * 
 * @example
 * ```tsx
 * import { useGiroTheme } from '@giro-ds/react';
 * 
 * function ThemeToggle() {
 *   const { mode, toggleMode } = useGiroTheme();
 *   
 *   return (
 *     <button onClick={toggleMode}>
 *       Modo atual: {mode}
 *     </button>
 *   );
 * }
 * ```
 * 
 * @see {@link useGiroTheme} para obter este valor nos componentes
 * 
 * @public
 */
export interface GiroThemeContextValue {
  /**
   * Tema customizado atual
   * 
   * Contém as customizações de cores aplicadas.
   * Será `null` se nenhum tema customizado foi fornecido ao provider.
   */
  theme: GiroTheme | null;
  
  /**
   * Modo atual do tema
   * 
   * @remarks
   * Pode ser `'light'` ou `'dark'`.
   */
  mode: GiroThemeMode;
  
  /**
   * Define o modo do tema
   * 
   * @param mode - Novo modo a ser aplicado (`'light'` ou `'dark'`)
   * 
   * @remarks
   * Se `persistMode` estiver habilitado no provider, o valor será persistido em localStorage.
   */
  setMode: (mode: GiroThemeMode) => void;
  
  /**
   * Alterna entre light e dark mode
   * 
   * @remarks
   * Equivalente a chamar `setMode(mode === 'light' ? 'dark' : 'light')`.
   * Se `persistMode` estiver habilitado, o novo valor será persistido automaticamente.
   */
  toggleMode: () => void;
}

/**
 * Props do componente {@link GiroThemeProvider}
 * 
 * Define todas as configurações disponíveis para customizar o comportamento do provider de tema.
 * 
 * @example
 * ```tsx
 * const props: GiroThemeProviderProps = {
 *   theme: { colors: { primary: { ... } } },
 *   mode: 'light',
 *   persistMode: true,
 *   children: <App />
 * };
 * ```
 * 
 * @see {@link GiroThemeProvider} para uso do componente
 * 
 * @public
 */
export interface GiroThemeProviderProps {
  /**
   * Tema customizado para light mode
   * 
   * @defaultValue `undefined` (usa tokens padrão do `@giro-ds/tokens`)
   * 
   * @remarks
   * Se não fornecido, o design system usará as cores padrão definidas no pacote de tokens.
   */
  theme?: GiroTheme;
  
  /**
   * Tema customizado para dark mode
   * 
   * @defaultValue `undefined` (usa o mesmo tema do light mode)
   * 
   * @remarks
   * Se não fornecido, ao alternar para dark mode, será usado o mesmo tema configurado em `theme`.
   * Forneça um tema específico aqui se quiser cores diferentes para o modo escuro.
   */
  darkTheme?: GiroTheme;
  
  /**
   * Modo inicial do tema
   * 
   * @defaultValue `'light'`
   * 
   * @remarks
   * Se `persistMode` estiver habilitado e houver um valor salvo em localStorage,
   * o valor do localStorage terá prioridade sobre esta prop.
   */
  mode?: GiroThemeMode;
  
  /**
   * Habilita persistência automática do modo em localStorage
   * 
   * @defaultValue `true`
   * 
   * @remarks
   * Quando habilitado, o modo selecionado pelo usuário será salvo em localStorage
   * e restaurado automaticamente nas próximas visitas.
   */
  persistMode?: boolean;
  
  /**
   * Chave customizada para armazenar o modo no localStorage
   * 
   * @defaultValue `'giro-theme-mode'`
   * 
   * @remarks
   * Útil quando você precisa de múltiplas instâncias do provider com persistência independente,
   * ou para evitar conflitos com outras bibliotecas.
   */
  storageKey?: string;
  
  /**
   * Elementos filhos que terão acesso ao contexto de tema
   * 
   * @remarks
   * Todos os componentes dentro deste provider poderão usar o hook {@link useGiroTheme}
   * para acessar e manipular o tema.
   */
  children: React.ReactNode;
}
