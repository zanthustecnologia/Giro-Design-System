/** Tamanho do componente: 'sm' (pequeno) ou 'lg' (grande) */
export type Size = 'sm' | 'lg';

/** Variante visual do componente: 'filled' (preenchido), 'outlined' (contorno) ou 'text' (apenas texto) */
export type Variant = 'filled' | 'outlined' | 'text';

/** Variante de cor do texto: 'neutral' (neutro), 'brand' (marca), 'color' (colorido), 'success' (sucesso) ou 'alert' (alerta) */
export type TextVariant = 'neutral' | 'brand' | 'color' | 'success' | 'alert';

/** Lado de posicionamento: 'top' (topo), 'right' (direita), 'bottom' (base) ou 'left' (esquerda) */
export type Side = 'top' | 'right' | 'bottom' | 'left';

/** Alinhamento do componente: 'start' (início), 'center' (centro) ou 'end' (fim) */
export type Align = 'start' | 'center' | 'end';

/** Posição horizontal de um elemento secundário: 'right' (direita), 'left' (esquerda) ou 'both' (ambos os lados) */
export type Position = 'right' | 'left' | 'both';

/** Localidade do componente: 'pt-br' (Português do Brasil) ou 'en-us' (Inglês dos EUA) */
export type Locale = 'pt-br' | 'en-us';

/** Props base compartilhadas por todos os componentes do design system */
export interface BaseProps {
  /** Identificador único do elemento HTML */
  id?: string;
  /** Classes CSS adicionais a serem aplicadas ao componente */
  className?: string;
  /** Quando `true`, desabilita interações com o componente */
  disabled?: boolean;
}
