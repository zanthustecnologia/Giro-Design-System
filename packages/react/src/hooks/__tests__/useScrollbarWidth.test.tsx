import * as React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useScrollbarWidth } from '../useScrollbarWidth';

interface ProbeProps {
  deps?: React.DependencyList;
}

/**
 * Componente de teste que renderiza um elemento rolável e expõe, via texto,
 * a largura da scrollbar medida pelo hook.
 */
function Probe({ deps = [] }: ProbeProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const width = useScrollbarWidth(ref, deps);

  return (
    <div ref={ref} data-testid="target">
      <span data-testid="width">{width}</span>
    </div>
  );
}

describe('useScrollbarWidth', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('deve retornar 0 quando offsetWidth e clientWidth são iguais', () => {
    render(<Probe />);
    expect(screen.getByTestId('width')).toHaveTextContent('0');
  });

  it('deve medir a largura da scrollbar como offsetWidth - clientWidth na montagem', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(120);
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);

    render(<Probe />);
    expect(screen.getByTestId('width')).toHaveTextContent('20');
  });

  it('deve re-medir quando o conteúdo do elemento muda (MutationObserver)', async () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(120);
    const clientWidthSpy = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockReturnValue(100);

    render(<Probe />);
    expect(screen.getByTestId('width')).toHaveTextContent('20');

    clientWidthSpy.mockReturnValue(80);

    const target = screen.getByTestId('target');
    target.appendChild(document.createElement('div'));

    await waitFor(() => {
      expect(screen.getByTestId('width')).toHaveTextContent('40');
    });
  });

  it('deve re-medir quando o elemento é redimensionado (ResizeObserver)', () => {
    let resizeTrigger: (() => void) | null = null;

    class MockResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
      constructor(callback: ResizeObserverCallback) {
        resizeTrigger = () => callback([], this as unknown as ResizeObserver);
      }
    }
    vi.stubGlobal('ResizeObserver', MockResizeObserver);

    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(120);
    const clientWidthSpy = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockReturnValue(100);

    render(<Probe />);
    expect(screen.getByTestId('width')).toHaveTextContent('20');

    clientWidthSpy.mockReturnValue(70);

    act(() => {
      resizeTrigger?.();
    });

    expect(screen.getByTestId('width')).toHaveTextContent('50');
  });

  it('deve re-executar a medição quando as deps mudam', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(120);
    const clientWidthSpy = vi
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockReturnValue(100);

    const { rerender } = render(<Probe deps={['a']} />);
    expect(screen.getByTestId('width')).toHaveTextContent('20');

    clientWidthSpy.mockReturnValue(60);

    rerender(<Probe deps={['b']} />);
    expect(screen.getByTestId('width')).toHaveTextContent('60');
  });
});
