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
    activationMode,
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
        <div
          id={id}
          className={className}
          data-testid={testId}
          data-activation-mode={activationMode}
        >
          {children}
        </div>
      </Ctx.Provider>
    );
  };

  const List = React.forwardRef(
    ({ children, 'aria-label': ariaLabel, className, loop, onTransitionEnd }: any, ref: any) => (
      <div
        ref={ref}
        role="tablist"
        aria-label={ariaLabel}
        className={className}
        data-loop={String(loop)}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
    ),
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

/** Cria um DOMRect falso para simular posição/largura de elementos no cálculo de assistência de borda */
const rect = (left: number, width: number): DOMRect => ({
  left,
  width,
  right: left + width,
  top: 0,
  bottom: 0,
  height: 0,
  x: left,
  y: 0,
  toJSON: () => ({}),
});

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

      // Depois scroll até o fim (scrollLeft + clientWidth >= scrollWidth)
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

    it('clique no botão direito chama scrollTo com o alvo correto', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 150, behavior: 'smooth' });
    });

    it('clique no botão esquerdo chama scrollTo com o alvo correto', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 200, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { left } = getScrollButtons();
      fireEvent.click(left);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 50, behavior: 'smooth' });
    });

    it('scrollAmount customizado é usado no cálculo do alvo', () => {
      const { container } = render(
        <Tabs items={defaultItems} defaultValue="tab1" scrollAmount={300} />,
      );
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
    });

    it('ao clicar quando falta menos que scrollAmount para o fim, o alvo é travado exatamente no fim (sem undershoot)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        // max = 500; restam apenas 50px (< scrollAmount de 150) até o fim
        mockScrollProps(scrollEl, { scrollLeft: 450, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 500, behavior: 'smooth' });
    });

    it('ao clicar quando falta menos que scrollAmount para o início, o alvo é travado exatamente no início', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 50, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { left } = getScrollButtons();
      fireEvent.click(left);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
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

  // ── Bounce (overscroll elástico) ─────────────────────────────────────────

  describe('Bounce (overscroll elástico)', () => {
    it('aplica translateX positivo ao arrastar com mouse além do início da lista', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
      const tablist = screen.getByRole('tablist');

      fireEvent.mouseDown(scrollEl, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 }); // delta=50 → target=-50 (além do início)

      expect(tablist.style.transform).toBe('translateX(25px)'); // 50 * 0.5 de resistência
    });

    it('aplica translateX negativo ao arrastar com mouse além do fim da lista', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 500, scrollWidth: 800, clientWidth: 300 }); // max = 500
      const tablist = screen.getByRole('tablist');

      fireEvent.mouseDown(scrollEl, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 60 }); // delta=-40 → target=540 (além do fim)

      expect(tablist.style.transform).toBe('translateX(-20px)'); // 40 * 0.5 de resistência
    });

    it('não aplica translateX ao arrastar dentro dos limites', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 100, scrollWidth: 800, clientWidth: 300 });
      const tablist = screen.getByRole('tablist');

      fireEvent.mouseDown(scrollEl, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 90 }); // delta=-10 → target=110 (dentro dos limites)

      expect(tablist.style.transform).toBe('');
    });

    it('não aplica translateX ao arrastar com mouse quando não há overflow (abas cabem no container)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 300, clientWidth: 300 }); // sem overflow
      const tablist = screen.getByRole('tablist');

      fireEvent.mouseDown(scrollEl, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 }); // tentaria "puxar" além do início

      expect(tablist.style.transform).toBe('');
    });

    it('não aplica translateX ao deslizar (touch) quando não há overflow (abas cabem no container)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 300, clientWidth: 300 }); // sem overflow
      const tablist = screen.getByRole('tablist');

      fireEvent.touchStart(scrollEl, { touches: [{ clientX: 100 }] });
      fireEvent.touchMove(scrollEl, { touches: [{ clientX: 150 }] }); // tentaria "puxar" além do início

      expect(tablist.style.transform).toBe('');
    });

    it('limita o deslocamento elástico ao valor máximo (OVERSCROLL_MAX)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
      const tablist = screen.getByRole('tablist');

      fireEvent.mouseDown(scrollEl, { clientX: 500 });
      fireEvent.mouseMove(document, { clientX: 1000 }); // delta=500 → bem além do limite de resistência

      expect(tablist.style.transform).toBe('translateX(56px)');
    });

    it('ao soltar o mouse além do limite, reseta o transform e aplica a classe de animação de retorno', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
      const tablist = screen.getByRole('tablist');

      fireEvent.mouseDown(scrollEl, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 });
      expect(tablist.style.transform).toBe('translateX(25px)');

      fireEvent.mouseUp(document);

      expect(tablist.style.transform).toBe('');
      expect(tablist.className).toContain('Bounce');
    });

    it('remove a classe de animação de retorno ao final da transição', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
      const tablist = screen.getByRole('tablist');

      fireEvent.mouseDown(scrollEl, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 });
      fireEvent.mouseUp(document);
      expect(tablist.className).toContain('Bounce');

      fireEvent.transitionEnd(tablist, { propertyName: 'transform' });

      expect(tablist.className).not.toContain('Bounce');
    });

    it('aplica translateX ao tentar deslizar (touch) além do início da lista', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
      const tablist = screen.getByRole('tablist');

      fireEvent.touchStart(scrollEl, { touches: [{ clientX: 100 }] });
      fireEvent.touchMove(scrollEl, { touches: [{ clientX: 150 }] }); // delta=50 → além do início

      expect(tablist.style.transform).toBe('translateX(25px)');
    });

    it('ao soltar o toque além do limite, reseta o transform (spring-back)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
      const tablist = screen.getByRole('tablist');

      fireEvent.touchStart(scrollEl, { touches: [{ clientX: 100 }] });
      fireEvent.touchMove(scrollEl, { touches: [{ clientX: 150 }] });
      expect(tablist.style.transform).toBe('translateX(25px)');

      fireEvent.touchEnd(scrollEl);

      expect(tablist.style.transform).toBe('');
      expect(tablist.className).toContain('Bounce');
    });

    it('aplica translateX negativo ao tentar deslizar (touch) além do fim da lista', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 500, scrollWidth: 800, clientWidth: 300 }); // max = 500
      const tablist = screen.getByRole('tablist');

      fireEvent.touchStart(scrollEl, { touches: [{ clientX: 100 }] });
      fireEvent.touchMove(scrollEl, { touches: [{ clientX: 60 }] }); // delta=-40 → target=540 (além do fim)

      expect(tablist.style.transform).toBe('translateX(-20px)');
    });

    it('não aplica translateX ao deslizar (touch) dentro dos limites', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      mockScrollProps(scrollEl, { scrollLeft: 100, scrollWidth: 800, clientWidth: 300 });
      const tablist = screen.getByRole('tablist');

      fireEvent.touchStart(scrollEl, { touches: [{ clientX: 100 }] });
      fireEvent.touchMove(scrollEl, { touches: [{ clientX: 90 }] }); // delta=-10 → target=110 (dentro dos limites)

      expect(tablist.style.transform).toBe('');
    });

    it('dispara um micro-bounce ao atingir a borda direita clicando na seta', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();
      const tablist = screen.getByRole('tablist');

      act(() => {
        // max = 500; restam apenas 50px (< scrollAmount de 150) → clique encosta na borda
        mockScrollProps(scrollEl, { scrollLeft: 450, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      act(() => {
        fireEvent(scrollEl, new Event('scrollend'));
      });

      // Empurrão + volta acontecem de forma síncrona (reflow forçado); ao final, o transform
      // volta a '' com a classe de animação de retorno aplicada (ver teste de reflow abaixo
      // para a prova de que o empurrão é de fato pintado antes da volta)
      expect(tablist.style.transform).toBe('');
      expect(tablist.className).toContain('Bounce');
    });

    it('aplica o empurrão do micro-bounce antes de animar a volta (reflow forçado)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();
      const tablist = screen.getByRole('tablist');

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 450, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      // Captura o transform exatamente no momento em que o reflow é forçado (void el.offsetWidth),
      // provando que o empurrão é aplicado e pintado antes da volta ser agendada
      let transformDuringReflow: string | null = null;
      Object.defineProperty(tablist, 'offsetWidth', {
        configurable: true,
        get() {
          transformDuringReflow = tablist.style.transform;
          return 0;
        },
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);
      act(() => {
        fireEvent(scrollEl, new Event('scrollend'));
      });

      expect(transformDuringReflow).toBe('translateX(-14px)');
      expect(tablist.style.transform).toBe('');
    });

    it('não dispara micro-bounce quando o clique na seta não chega até a borda', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();
      const tablist = screen.getByRole('tablist');

      act(() => {
        // max = 500; restam 400px (> scrollAmount de 150) → clique não encosta na borda
        mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      act(() => {
        fireEvent(scrollEl, new Event('scrollend'));
      });

      expect(tablist.style.transform).toBe('');
      expect(tablist.className).not.toContain('Bounce');
    });

    it('força a seta a sumir ao atingir a borda mesmo se o scroll-snap deixar o scrollLeft um pouco aquém do limite real', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();

      act(() => {
        // max = 500; restam 50px (< scrollAmount de 150) → clique calcula alvo = 500 (borda real)
        mockScrollProps(scrollEl, { scrollLeft: 450, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      expect(right.className).not.toContain('ScrollButtonHidden');
      fireEvent.click(right);

      // Simula o scroll-snap assentando 5px antes da borda real (scrollLeft=495, não 500)
      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 495, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
        fireEvent(scrollEl, new Event('scrollend'));
      });

      expect(right.className).toContain('ScrollButtonHidden');
    });

    it('mantém a seta escondida mesmo com eventos de scroll espúrios repetidos após atingir a borda', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 450, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      act(() => {
        fireEvent(scrollEl, new Event('scrollend'));
      });
      expect(right.className).toContain('ScrollButtonHidden');

      // Vários eventos de scroll tardios (ex.: ajustes do navegador) não devem reabrir a seta
      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 498, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
        mockScrollProps(scrollEl, { scrollLeft: 497, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      expect(right.className).toContain('ScrollButtonHidden');
    });

    it('libera a trava e reexibe a seta quando há um movimento real para longe da borda', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();

      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 450, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      act(() => {
        fireEvent(scrollEl, new Event('scrollend'));
      });
      expect(right.className).toContain('ScrollButtonHidden');

      // Usuário arrasta de volta para longe da borda (movimento real, não ruído)
      act(() => {
        mockScrollProps(scrollEl, { scrollLeft: 300, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      expect(right.className).not.toContain('ScrollButtonHidden');
    });
  });

  // ── Assistência ao atingir a borda (edge assist) ─────────────────────────

  describe('Assistência ao atingir a borda', () => {
    it('assiste até o fim quando o passo normal deixaria a última aba pouco coberta (≤30%)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        // max = 650; passo normal levaria a 550 (400 + 150), não travaria no fim por si só
        mockScrollProps(scrollEl, { scrollLeft: 400, scrollWidth: 950, clientWidth: 300 });
        scrollEl.getBoundingClientRect = vi.fn(() => rect(0, 300));
        fireEvent.scroll(scrollEl);
      });

      // Posições relativas ao viewport na rolagem atual (scrollLeft=400):
      // conteúdo tab1 0–300, tab2 300–600, tab3 (última) 600–950
      const tabs = screen.getAllByRole('tab');
      tabs[0].getBoundingClientRect = vi.fn(() => rect(-400, 300));
      tabs[1].getBoundingClientRect = vi.fn(() => rect(-100, 300));
      tabs[2].getBoundingClientRect = vi.fn(() => rect(200, 350));

      // Janela após o passo normal: [550, 850] → última aba (600–950) ficaria coberta em
      // (950-850)/350 ≈ 28,6% (≤30%) → assiste indo direto ao fim (650)
      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 650, behavior: 'smooth' });
    });

    it('não assiste quando o passo normal deixaria a última aba bastante coberta (>30%)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        // max = 750; passo normal leva a 350 (200 + 150)
        mockScrollProps(scrollEl, { scrollLeft: 200, scrollWidth: 1050, clientWidth: 300 });
        scrollEl.getBoundingClientRect = vi.fn(() => rect(0, 300));
        fireEvent.scroll(scrollEl);
      });

      // conteúdo tab1 0–300, tab2 300–600, tab3 (última) 600–1050
      const tabs = screen.getAllByRole('tab');
      tabs[0].getBoundingClientRect = vi.fn(() => rect(-200, 300));
      tabs[1].getBoundingClientRect = vi.fn(() => rect(100, 300));
      tabs[2].getBoundingClientRect = vi.fn(() => rect(400, 450));

      // Janela após o passo normal: [350, 650] → última aba (600–1050) ficaria coberta em
      // (1050-650)/450 ≈ 88,9% (>30%) → não assiste, mantém o passo normal
      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 350, behavior: 'smooth' });
    });

    it('não assiste quando a aba pouco coberta é intermediária (não é a primeira nem a última)', () => {
      const items = [
        { value: 't1', label: 'T1', content: <div>C1</div> },
        { value: 't2', label: 'T2', content: <div>C2</div> },
        { value: 't3', label: 'T3', content: <div>C3</div> },
        { value: 't4', label: 'T4', content: <div>C4</div> },
      ];
      const { container } = render(<Tabs items={items} defaultValue="t1" />);
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        // max = 1450; passo normal leva a 1050 (900 + 150)
        mockScrollProps(scrollEl, { scrollLeft: 900, scrollWidth: 1750, clientWidth: 300 });
        scrollEl.getBoundingClientRect = vi.fn(() => rect(0, 300));
        fireEvent.scroll(scrollEl);
      });

      // conteúdo t1 0–300, t2 300–600, t3 (intermediária, bem larga) 600–1450, t4 (última) 1450–1750
      const tabs = screen.getAllByRole('tab');
      tabs[0].getBoundingClientRect = vi.fn(() => rect(-900, 300));
      tabs[1].getBoundingClientRect = vi.fn(() => rect(-600, 300));
      tabs[2].getBoundingClientRect = vi.fn(() => rect(-300, 850));
      tabs[3].getBoundingClientRect = vi.fn(() => rect(550, 300));

      // Janela após o passo normal: [1050, 1350] → t3 (intermediária) ficaria coberta em apenas
      // (1450-1350)/850 ≈ 11,8% (≤30%), mas como não é a última aba, a assistência não se aplica
      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 1050, behavior: 'smooth' });
    });

    it('assiste até o início quando o passo normal deixaria a primeira aba pouco coberta (≤30%)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const scrollToSpy = vi.fn();
      scrollEl.scrollTo = scrollToSpy;

      act(() => {
        // max = 650; passo normal levaria a 100 (250 - 150), não travaria no início por si só
        mockScrollProps(scrollEl, { scrollLeft: 250, scrollWidth: 950, clientWidth: 300 });
        scrollEl.getBoundingClientRect = vi.fn(() => rect(0, 300));
        fireEvent.scroll(scrollEl);
      });

      // conteúdo tab1 (primeira) 0–350, tab2 350–650, tab3 650–950
      const tabs = screen.getAllByRole('tab');
      tabs[0].getBoundingClientRect = vi.fn(() => rect(-250, 350));
      tabs[1].getBoundingClientRect = vi.fn(() => rect(100, 300));
      tabs[2].getBoundingClientRect = vi.fn(() => rect(400, 300));

      // Janela após o passo normal: início em 100 → primeira aba (0–350) ficaria coberta em
      // (100-0)/350 ≈ 28,6% (≤30%) → assiste indo direto ao início (0)
      const { left } = getScrollButtons();
      fireEvent.click(left);

      expect(scrollToSpy).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
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

  // ── Snap scrolling (isSnapScrolling) ─────────────────────────────────────

  describe('Snap scrolling', () => {
    const setupOverflow = (scrollEl: HTMLElement) => {
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
      act(() => {
        fireEvent.scroll(scrollEl);
      });
    };

    it('aplica a classe ListScrollSnap ao clicar em um botão de scroll', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();
      setupOverflow(scrollEl);

      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollEl.className).toContain('ListScrollSnap');
    });

    it('não aplica a classe ListScrollSnap quando o clique atinge a borda real (evita o navegador assentar antes do alvo)', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();

      act(() => {
        // max = 500; restam 50px (< scrollAmount de 150) → clique atinge a borda real
        mockScrollProps(scrollEl, { scrollLeft: 450, scrollWidth: 800, clientWidth: 300 });
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);

      expect(scrollEl.className).not.toContain('ListScrollSnap');
    });

    it('remove a classe ListScrollSnap automaticamente após 600ms', () => {
      vi.useFakeTimers();
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();
      setupOverflow(scrollEl);

      const { right } = getScrollButtons();
      fireEvent.click(right);
      expect(scrollEl.className).toContain('ListScrollSnap');

      act(() => {
        vi.advanceTimersByTime(600);
      });

      expect(scrollEl.className).not.toContain('ListScrollSnap');
      vi.useRealTimers();
    });

    it('remove a classe ListScrollSnap ao disparar o evento nativo scrollend', () => {
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();
      setupOverflow(scrollEl);

      const { right } = getScrollButtons();
      fireEvent.click(right);
      expect(scrollEl.className).toContain('ListScrollSnap');

      act(() => {
        fireEvent(scrollEl, new Event('scrollend'));
      });

      expect(scrollEl.className).not.toContain('ListScrollSnap');
    });

    it('reinicia o estado de snap ao iniciar um novo drag durante o scroll suave', () => {
      vi.useFakeTimers();
      const { container } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();
      setupOverflow(scrollEl);

      const { right } = getScrollButtons();
      fireEvent.click(right);
      expect(scrollEl.className).toContain('ListScrollSnap');

      fireEvent.mouseDown(scrollEl, { clientX: 100 });

      expect(scrollEl.className).not.toContain('ListScrollSnap');
      vi.useRealTimers();
    });
  });

  // ── Props repassadas ao Radix ────────────────────────────────────────────

  describe('Props repassadas ao Radix', () => {
    it('usa keyboardActivationMode "automatic" por padrão', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" data-testid="tabs-root" />);
      expect(screen.getByTestId('tabs-root')).toHaveAttribute(
        'data-activation-mode',
        'automatic',
      );
    });

    it('repassa keyboardActivationMode customizado para o Radix', () => {
      render(
        <Tabs
          items={defaultItems}
          defaultValue="tab1"
          keyboardActivationMode="manual"
          data-testid="tabs-root"
        />,
      );
      expect(screen.getByTestId('tabs-root')).toHaveAttribute('data-activation-mode', 'manual');
    });

    it('usa loop=true por padrão', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" />);
      expect(screen.getByRole('tablist')).toHaveAttribute('data-loop', 'true');
    });

    it('repassa loop=false para o Radix', () => {
      render(<Tabs items={defaultItems} defaultValue="tab1" loop={false} />);
      expect(screen.getByRole('tablist')).toHaveAttribute('data-loop', 'false');
    });
  });

  // ── Limpeza de listeners (unmount) ───────────────────────────────────────

  describe('Limpeza de listeners', () => {
    it('remove os listeners de scroll e scrollend do container ao desmontar', () => {
      const { container, unmount } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      const removeSpy = vi.spyOn(scrollEl, 'removeEventListener');

      unmount();

      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('scrollend', expect.any(Function));
    });

    it('remove os listeners de mousemove e mouseup do document ao desmontar', () => {
      const removeSpy = vi.spyOn(document, 'removeEventListener');
      const { unmount } = render(<Tabs items={defaultItems} defaultValue="tab1" />);

      unmount();

      expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('mouseup', expect.any(Function));
      removeSpy.mockRestore();
    });

    it('cancela o timeout de snap pendente ao desmontar', () => {
      vi.useFakeTimers();
      const { container, unmount } = render(<Tabs items={defaultItems} defaultValue="tab1" />);
      const scrollEl = getScrollContainer(container);
      scrollEl.scrollTo = vi.fn();
      mockScrollProps(scrollEl, { scrollLeft: 0, scrollWidth: 800, clientWidth: 300 });
      act(() => {
        fireEvent.scroll(scrollEl);
      });

      const { right } = getScrollButtons();
      fireEvent.click(right);
      expect(vi.getTimerCount()).toBeGreaterThan(0);

      unmount();

      expect(vi.getTimerCount()).toBe(0);
      vi.useRealTimers();
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

  // ── Casos extremos ───────────────────────────────────────────────────────

  describe('Casos extremos', () => {
    it('renderiza uma tablist vazia sem erros quando items=[]', () => {
      render(<Tabs items={[]} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
      expect(screen.queryAllByRole('tab')).toHaveLength(0);
      expect(screen.queryAllByRole('tabpanel')).toHaveLength(0);
    });
  });
});
