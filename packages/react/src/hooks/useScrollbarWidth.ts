import * as React from 'react';

/**
 * Mede a largura reservada pela scrollbar (`offsetWidth - clientWidth`) de um elemento rolável,
 * reagindo a mudanças de tamanho (`ResizeObserver`) e de conteúdo (`MutationObserver`).
 *
 * Usado para compensar `scrollbar-gutter: stable`, que reserva o espaço da scrollbar mesmo
 * sem overflow real, via uma CSS var exposta pelo componente consumidor.
 *
 * O elemento é capturado via callback ref (em vez de um `RefObject` externo) para que o efeito
 * de medição reexecute assim que o elemento monta, mesmo quando isso acontece em um render
 * posterior ao de `deps` (ex.: conteúdo de `Dialog.Content` do Radix montado após `isOpen`).
 *
 * @internal
 */
export function useScrollbarWidth<T extends HTMLElement>(
  deps: React.DependencyList
): [React.RefCallback<T>, number] {
  const [el, setEl] = React.useState<T | null>(null);
  const [scrollbarWidth, setScrollbarWidth] = React.useState(0);

  React.useEffect(() => {
    if (!el) return;

    const measureScrollbar = (): void => {
      setScrollbarWidth(el.offsetWidth - el.clientWidth);
    };

    measureScrollbar();

    const resizeObserver = new ResizeObserver(measureScrollbar);
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(measureScrollbar);
    mutationObserver.observe(el, { childList: true, subtree: true, characterData: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el, ...deps]);

  return [setEl, scrollbarWidth];
}
