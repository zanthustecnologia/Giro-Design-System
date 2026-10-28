import * as React from 'react';

/**
 * Mede a largura reservada pela scrollbar (`offsetWidth - clientWidth`) de um elemento rolável,
 * reagindo a mudanças de tamanho (`ResizeObserver`) e de conteúdo (`MutationObserver`).
 *
 * Usado para compensar `scrollbar-gutter: stable`, que reserva o espaço da scrollbar mesmo
 * sem overflow real, via uma CSS var exposta pelo componente consumidor.
 *
 * @internal
 */
export function useScrollbarWidth<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  deps: React.DependencyList
): number {
  const [scrollbarWidth, setScrollbarWidth] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
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
  }, deps);

  return scrollbarWidth;
}
