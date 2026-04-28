import { Align, Side } from '../../types/common.types';

  

export interface PopoverProps {

 trigger: React.ReactNode;

 content: React.ReactNode;

 align?: Align;

 side?: Side;

 /** Distância em pixels entre o conteúdo e o trigger */

 sideOffset?: number;

 /** Controla o estado de abertura em modo controlado */

 open?: boolean;

 /** Callback chamado quando o estado de abertura muda */

 onOpenChange?: (open: boolean) => void;

 /**
 * Quando `true`, o trigger atua como âncora de posicionamento e o popover
 * é aberto/fechado exclusivamente via `open`/`onOpenChange` (modo DatePicker).
 * Quando `false` (padrão), o trigger continua abrindo/fechando o popover
 * normalmente, mas o estado pode ser sincronizado via `open`/`onOpenChange`
 * (modo Filter).
 */

 asAnchor?: boolean;

 /** Callback chamado quando o foco automático é ativado ao abrir o popover */

 onOpenAutoFocus?: (event: Event) => void;

 /** Callback chamado quando o foco automático é ativado ao fechar o popover */

 onCloseAutoFocus?: (event: Event) => void;

 /** Quando `true`, exibe uma seta apontando para o trigger */

 showArrow?: boolean;

 /** Classe CSS opcional */
  className?: string;

}