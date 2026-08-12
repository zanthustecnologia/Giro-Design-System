import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mocks ───────────────────────────────────────────────────────────────────

vi.mock('@fluentui/react-icons', () => ({
  ChevronLeftRegular: () => <span data-testid="icon-left" />,
  ChevronRightRegular: () => <span data-testid="icon-right" />,
}));

vi.mock('radix-ui', () => {
  const React = require('react');

  // Contexto interno para propagar aba ativa sem prop drilling
  const Ctx = React.createContext({ active: '', onChange: (_: string) => {} });

  const Root = ({
    children,
    defaultValue = '',
    value: controlledValue,
    onValueChange,
    className,
    id,
    'data-testid': testId,
  }: any) => {
    const [internal, setInternal] = React.useState(defaultValue);
    const active = controlledValue !== undefined ? controlledValue : internal;

    const onChange = (v: string) => {
      if (controlledValue === undefined) setInternal(v);
      onValueChange?.(v);
    };

    return (
      <Ctx.Provider value={{ active, onChange }}>
        <div id={id} className={className} data-testid={testId}>
          {children}
        </div>
      </Ctx.Provider>
    );
  };

  const List = ({ children, 'aria-label': ariaLabel, className }: any) => (
    <div role="tablist" aria-label={ariaLabel} className={className}>
      {children}
    </div>
  );

  const Trigger = ({ children, value, disabled, className }: any) => {
    const { active, onChange } = React.useContext(Ctx);
    return (
      <button
        role="tab"
        className={className}
        disabled={disabled}
        data-state={active === value ? 'active' : 'inactive'}
        data-disabled={disabled ? '' : undefined}
        aria-selected={active === value}
        onClick={() => !disabled && onChange(value)}
      >
        {children}
      </button>
    );
  };

  const Content = ({ children, value, className }: any) => {
    const { active } = React.useContext(Ctx);
    return active === value ? (
      <div role="tabpanel" className={className}>
        {children}
      </div>
    ) : null;
  };

  return { Tabs: { Root, List, Trigger, Content } };
});

// ─── Importação após os mocks ─────────────────────────────────────────────────

import Tabs from '../Tabs';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const defaultItems = [
  { value: 'tab1', label: 'Tab 1', content: <div>Conteúdo 1</div> },
  { value: 'tab2', label: 'Tab 2', content: <div>Conteúdo 2</div> },
  { value: 'tab3', label: 'Tab 3', content: <div>Conteúdo 3</div> },
];

/** Configura propriedades de scroll no container scrollável */
const mockScrollProps = (
  el: Element,
  { scrollLeft = 0, scrollWidth = 800, clientWidth = 400 } = {},
) => {
  Object.defineProperty(el, 'scrollLeft', { value: scrollLeft, writable: true, configurable: true });
  Object.defineProperty(el, 'scrollWidth', { value: scrollWidth, configurable: true });
  Object.defineProperty(el, 'clientWidth', { value: clientWidth, configurable: true });
};

const getScrollContainer = (container: HTMLElement) =>
  container.querySelector('[role="none"]') as HTMLElement;

const getScrollButtons = () => {
  const [left, right] = screen.getAllByRole('button', { hidden: true }).filter(
    (btn) => btn.getAttribute('aria-hidden') === 'true',
  );
  return { left, right };
};

// ─── Testes ───────────────────────────────────────────────────────────────────

describe('Tabs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Renderização básica ──────────────────────────────────────────────────

  describe('Renderização básica', () => {
    it('renderiza sem erros com props mínimas', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('renderiza o número correto de triggers', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('renderiza os rótulos das abas', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    });

    it('renderiza o conteúdo da aba ativa inicial', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(screen.getByText('Conteúdo 1')).toBeInTheDocument();
      expect(screen.queryByText('Conteúdo 2')).not.toBeInTheDocument();
    });

    it('aplica id ao elemento raiz', () => {
      const { container } = render(
        <Tabs items={defaultItems} defaultValue="tab1" id="meu-tabs" />,
      );
      expect(container.firstChild).toHaveAttribute('id', 'meu-tabs');
    });

    it('aplica className adicional ao elemento raiz', () => {
      const { container } = render(
        <Tabs items={defaultItems} defaultValue="tab1" className="extra-class" />,
      );
      expect(container.firstChild).toHaveClass('extra-class');
    });

    it('aplica data-testid ao elemento raiz', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" data-testid="tabs-test" />);
      expect(screen.getByTestId('tabs-test')).toBeInTheDocument();
    });

    it('aplica aria-label na tablist', () => {
      render(
        <Tabs items={defaultItems} defaultValue="tab1" aria-label="Navegação por abas" />,
      );
      expect(screen.getByRole('tablist', { name: 'Navegação por abas' })).toBeInTheDocument();
    });

    it('renderiza o ícone do item quando fornecido', () => {
      const items = [
        {
          value: 'tab1',
          label: 'Tab 1',
          content: <div>C1</div>,
          icon: <span data-testid="icon-tab">★</span>,
        },
      ];
      render(<Tabs items={items} defaultValue="tab1" />);
      expect(screen.getByTestId('icon-tab')).toBeInTheDocument();
    });

    it('exibe os ícones de navegação (setas) no DOM', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(screen.getByTestId('icon-left')).toBeInTheDocument();
      expect(screen.getByTestId('icon-right')).toBeInTheDocument();
    });
  });

  // ── Troca de aba ────────────────────────────────────────────────────────

  describe('Troca de aba', () => {
    it('marca a aba clicada como ativa', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      fireEvent.click(tab2);

      expect(tab2).toHaveAttribute('data-state', 'active');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('exibe o conteúdo da aba clicada', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(screen.getByText('Conteúdo 2')).toBeInTheDocument();
      expect(screen.queryByText('Conteúdo 1')).not.toBeInTheDocument();
    });

    it('oculta o conteúdo da aba anterior ao trocar', () => {
      render(<Tabs items={defaultItems} defaultValue="tab3" />);

      expect(screen.getByText('Conteúdo 3')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));

      expect(screen.queryByText('Conteúdo 3')).not.toBeInTheDocument();
      expect(screen.getByText('Conteúdo 1')).toBeInTheDocument();
    });

    it('a aba ativa tem aria-selected="true"', () => {
      render(<Tabs items={defaultItems} defaultValue="tab2" />);
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'false');
    });
  });

  // ── Modo controlado ──────────────────────────────────────────────────────

  describe('Modo controlado', () => {
    it('respeita a prop value para determinar aba ativa', () => {
      render(<Tabs items={defaultItems} value="tab2" onValueChange={() => {}} />);
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'active');
      expect(screen.getByText('Conteúdo 2')).toBeInTheDocument();
    });

    it('chama onValueChange com o valor correto ao clicar', () => {
      const onValueChange = vi.fn();
      render(<Tabs items={defaultItems} value="tab1" onValueChange={onValueChange} />);

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 3' }));

      expect(onValueChange).toHaveBeenCalledWith('tab3');
    });

    it('não muda o estado interno quando controlado', () => {
      const onValueChange = vi.fn();
      render(<Tabs items={defaultItems} value="tab1" onValueChange={onValueChange} />);

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

      // A aba controlada continua sendo tab1
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active');
    });

    it('atualiza a aba ativa quando value muda externamente', () => {
      const { rerender } = render(
        <Tabs items={defaultItems} value="tab1" onValueChange={() => {}} />,
      );
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active');

      rerender(<Tabs items={defaultItems} value="tab3" onValueChange={() => {}} />);
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveAttribute('data-state', 'active');
    });
  });

  // ── Estado desabilitado ──────────────────────────────────────────────────

  describe('Estado desabilitado', () => {
    it('item individual desabilitado tem atributo disabled', () => {
      const items = [
        { value: 'tab1', label: 'Tab 1', content: <div>C1</div> },
        { value: 'tab2', label: 'Tab 2', content: <div>C2</div>, disabled: true },
      ];
      render(<Tabs items={items} defaultValue="tab1" />);
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeDisabled();
    });

    it('clicar em item desabilitado não troca a aba', () => {
      const onValueChange = vi.fn();
      const items = [
        { value: 'tab1', label: 'Tab 1', content: <div>C1</div> },
        { value: 'tab2', label: 'Tab 2', content: <div>C2</div>, disabled: true },
      ];
      render(<Tabs items={items} defaultValue="tab1" onValueChange={onValueChange} />);

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(onValueChange).not.toHaveBeenCalled();
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active');
    });

    it('prop disabled global desabilita todos os triggers', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" disabled />);
      screen.getAllByRole('tab').forEach((tab) => expect(tab).toBeDisabled());
    });

    it('prop disabled global impede troca de aba', () => {
      const onValueChange = vi.fn();
      render(
        <Tabs items={defaultItems} defaultValue="tab1" disabled onValueChange={onValueChange} />,
      );

      fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));

      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('item individual desabilitado tem data-disabled', () => {
      const items = [
        { value: 'tab1', label: 'Tab 1', content: <div>C1</div> },
        { value: 'tab2', label: 'Tab 2', content: <div>C2</div>, disabled: true },
      ];
      render(<Tabs items={items} defaultValue="tab1" />);
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-disabled', '');
    });
  });

  // ── Botões de scroll ─────────────────────────────────────────────────────

  describe('Botões de scroll', () => {
    it('botão esquerdo começa oculto (sem scroll à esquerda)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const { left } = getScrollButtons();
      expect(left.className).toContain('ScrollButtonHidden');
    });

    it('botão direito começa oculto (sem overflow)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const { right } = getScrollButtons();
      expect(right.className).toContain('ScrollButtonHidden');
    });

    it('botão direito aparece quando há overflow à direita', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      expect(right).not.toHaveClass('ScrollButtonHidden');
    });

    it('botão esquerdo aparece quando há scroll à esquerda', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 100, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { left } = getScrollButtons();
      expect(left).not.toHaveClass('ScrollButtonHidden');
    });

    it('botão direito oculta quando não há mais overflow à direita (threshold)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);

      // Primeiro cria overflow
      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      // Depois scroll até o fim (scrollLeft + clientWidth >= scrollWidth - btnW)
      act(() => {
        Object.defineProperty(scrollEl, 'scrollLeft', {
          value: 500,
          writable: true,
          configurable: true,
        });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      expect(right.className).toContain('ScrollButtonHidden');
    });

    it('clique no botão direito chama scrollBy com valor positivo', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollBySpy = vi.fn();
      scrollEl.scrollBy = scrollBySpy;

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollBySpy).toHaveBeenCalledWith({ left: 150, behavior: 'smooth' });
    });

    it('clique no botão esquerdo chama scrollBy com valor negativo', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollBySpy = vi.fn();
      scrollEl.scrollBy = scrollBySpy;

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 100, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { left } = getScrollButtons();
      fireEvent.click(left);

      expect(scrollBySpy).toHaveBeenCalledWith({ left: -150, behavior: 'smooth' });
    });

    it('scrollAmount customizado é passado para scrollBy', () => {
      const { container } = render(
        <Tabs items={defaultItems} defaultValue="tab1" scrollAmount={300} />,
      );
      const scrollEl = getScrollContainer(container);
      const scrollBySpy = vi.fn();
      scrollEl.scrollBy = scrollBySpy;

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollBySpy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
    });

    it('botões de scroll têm aria-hidden="true"', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const { left, right } = getScrollButtons();
      expect(left).toHaveAttribute('aria-hidden', 'true');
      expect(right).toHaveAttribute('aria-hidden', 'true');
    });

    it('botões de scroll têm tabIndex="-1"', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const { left, right } = getScrollButtons();
      expect(left).toHaveAttribute('tabindex', '-1');
      expect(right).toHaveAttribute('tabindex', '-1');
    });
  });

  // ── Drag com mouse ───────────────────────────────────────────────────────

  describe('Drag com mouse', () => {
    it('mousedown define cursor como grabbing', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);

      fireEvent.mouseDown(scrollEl, { clientX: 100 });

      expect(scrollEl.style.cursor).toBe('grabbing');
    });

    it('mouseup restaura o cursor', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);

      fireEvent.mouseDown(scrollEl, { clientX: 100 });
      expect(scrollEl.style.cursor).toBe('grabbing');

      fireEvent.mouseUp(document);

      expect(scrollEl.style.cursor).toBe('');
    });

    it('mousemove durante drag atualiza scrollLeft', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 50 });

      fireEvent.mouseDown(scrollEl, { clientX: 200 });
      fireEvent.mouseMove(document, { clientX: 180 }); // delta = -20, scrollLeft = 50 - (-20) = 70

      expect((scrollEl as any).scrollLeft).toBe(70);
    });

    it('arrastar além de 5px cancela o click subsequente na tab', () => {
      const onValueChange = vi.fn();
      const { container } = render(
        <Tabs items={defaultItems} defaultValue="tab1" onValueChange={onValueChange} />,
      );
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0 });

      // Simula drag maior que 5px → hasDragged.current = true
      fireEvent.mouseDown(scrollEl, { clientX: 200 });
      fireEvent.mouseMove(document, { clientX: 190 });

      // Clica na tab 2 — o onClickCapture no scrollEl intercepta e bloqueia
      fireEvent.click(screen.getAllByRole('tab')[1]);

      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('arrastar menos de 5px não marca hasDragged', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0 });

      fireEvent.mouseDown(scrollEl, { clientX: 200 });
      fireEvent.mouseMove(document, { clientX: 198 }); // delta de 2px → abaixo do threshold
      fireEvent.mouseUp(document);

      // Cursor deve ter sido resetado (drag encerrou normalmente)
      expect(scrollEl.style.cursor).toBe('');
    });
  });

  // ── ResizeObserver ───────────────────────────────────────────────────────

  describe('ResizeObserver', () => {
    it('cria e desconecta o ResizeObserver ao desmontar', () => {
      const disconnectSpy = vi.fn();
      const observeSpy = vi.fn();

      const OriginalRO = global.ResizeObserver;
      global.ResizeObserver = vi.fn().mockImplementation((cb) => ({
        observe: observeSpy,
        unobserve: vi.fn(),
        disconnect: disconnectSpy,
      }));

      const { unmount } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(observeSpy).toHaveBeenCalled();

      unmount();
      expect(disconnectSpy).toHaveBeenCalled();

      global.ResizeObserver = OriginalRO;
    });
  });

  // ── Acessibilidade ───────────────────────────────────────────────────────

  describe('Acessibilidade', () => {
    it('tabpanel é renderizado para a aba ativa', () => {
      render(<Tabs items={defaultItems} defaultValue="tab2" />);
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('apenas um tabpanel é exibido por vez', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
    });

    it('tablist é acessível por role', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });
});
