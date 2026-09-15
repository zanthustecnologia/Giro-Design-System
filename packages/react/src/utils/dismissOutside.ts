/**
 * Atributo usado para marcar raízes de elementos portalizados (ex.: renderizados via
 * `createPortal` em `document.body`) que devem ser ignorados pela lógica de
 * "clique/foco fora" de camadas dispensáveis do Radix UI (Dialog, Popover, DropdownMenu etc.).
 *
 * Componentes que renderizam conteúdo fora da árvore DOM do elemento pai (como o
 * `VirtualKeyboard` em modo `native`) devem adicionar este atributo à raiz portalizada
 * para evitar que o Radix trate cliques nesse conteúdo como "fora" do componente,
 * o que causaria fechamentos indesejados quando usados dentro de um `Modal` (ou outro
 * componente baseado em Radix Dialog/Popover).
 */
export const DISMISS_OUTSIDE_IGNORE_ATTRIBUTE = 'data-dismiss-outside-ignore';

/**
 * Verifica se o alvo de um evento de "interação fora" (Radix `onInteractOutside`,
 * `onPointerDownOutside`, `onFocusOutside`) está dentro de um elemento marcado com
 * {@link DISMISS_OUTSIDE_IGNORE_ATTRIBUTE}.
 */
export const isDismissOutsideIgnored = (target: EventTarget | null): boolean => {
  if (!(target instanceof Element)) return false;
  return target.closest(`[${DISMISS_OUTSIDE_IGNORE_ATTRIBUTE}]`) !== null;
};
