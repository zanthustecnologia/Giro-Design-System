import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Filter from '../Filter';
import type { FilterItem } from '../Filter.types';

// ── Mocks ────────────────────────────────────────────────────────────────────

vi.mock('@fluentui/react-icons', () => ({
  ChevronDownRegular: () => <span data-testid="chevron-down-icon" />,
  Calendar16Regular: () => <span data-testid="calendar-icon" />,
  FilterRegular: () => <span data-testid="filter-icon" />,
}));

vi.mock('../../Popover/Popover', () => ({
  default: ({ open, onOpenChange, trigger, content }: any) => (
    <div>
      <div data-testid="popover-trigger" onClick={() => onOpenChange(!open)}>
        {trigger}
      </div>
      {open && <div data-testid="popover-content">{content}</div>}
    </div>
  ),
}));

vi.mock('../../Drawer/Drawer', () => ({
  default: ({ isOpen, onClose, title, children, footer }: any) =>
    isOpen ? (
      <div role="dialog" aria-label={title} data-testid="drawer">
        <h2>{title}</h2>
        <div data-testid="drawer-content">{children}</div>
        <div data-testid="drawer-footer">{footer}</div>
        <button onClick={onClose} aria-label="Fechar drawer">×</button>
      </div>
    ) : null,
}));

vi.mock('../../Calendar/Calendar', () => ({
  default: ({ onDaySelect, onClear }: any) => (
    <div data-testid="calendar">
      <button
        data-testid="calendar-select-day"
        onClick={() => onDaySelect(new Date('2024-06-15'))}
      >
        Selecionar dia
      </button>
      <button data-testid="calendar-clear" onClick={onClear}>
        Limpar data
      </button>
    </div>
  ),
}));

vi.mock('../../Badge', () => ({
  default: ({ badgeValue }: any) => (
    <span data-testid="badge">{badgeValue}</span>
  ),
}));

vi.mock('../../Search', () => ({
  default: ({ value, onChange, placeholder, onKeyDown }: any) => (
    <input
      data-testid="search-input"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  ),
}));

vi.mock('../../Checkbox', () => ({
  default: ({ checked, disabled }: any) => (
    <input
      type="checkbox"
      checked={checked ?? false}
      disabled={disabled}
      readOnly
    />
  ),
}));

// ── Dados de teste ────────────────────────────────────────────────────────────

const mockItems: FilterItem[] = [
  { id: 'item-1', text: 'Opção 1' },
  { id: 'item-2', text: 'Opção 2' },
  { id: 'item-3', text: 'Opção 3', disabled: true },
];

// ── Testes ────────────────────────────────────────────────────────────────────

describe('Filter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Roteamento de modo ──────────────────────────────────────────────────────
  describe('Roteamento de modo', () => {
    it('renderiza modo simple por padrão', () => {
      const { container } = render(<Filter items={mockItems} />);
      expect(container.querySelector('[class*="container"]')).toBeInTheDocument();
    });

    it('renderiza modo combined quando mode="combined"', () => {
      render(<Filter mode="combined" />);
      expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    });
  });

  // ── Simple: Renderização básica ─────────────────────────────────────────────
  describe('Simple - Renderização básica', () => {
    it('renderiza com texto padrão "Filter"', () => {
      render(<Filter />);
      expect(screen.getByText('Filter')).toBeInTheDocument();
    });

    it('renderiza com buttonText customizado', () => {
      render(<Filter buttonText="Filtrar status" />);
      expect(screen.getByText('Filtrar status')).toBeInTheDocument();
    });

    it('aplica className customizada no container', () => {
      const { container } = render(<Filter className="minha-classe" />);
      expect(container.firstChild).toHaveClass('minha-classe');
    });

    it('aplica id customizado no container', () => {
      const { container } = render(<Filter id="filtro-principal" />);
      expect(container.firstChild).toHaveAttribute('id', 'filtro-principal');
    });

    it('renderiza ícone chevron por padrão (tipo checkbox)', () => {
      render(<Filter />);
      expect(screen.getByTestId('chevron-down-icon')).toBeInTheDocument();
    });

    it('renderiza ícone de calendário quando type="calendar"', () => {
      render(<Filter type="calendar" />);
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    });
  });

  // ── Simple: Abertura e fechamento do popover ────────────────────────────────
  describe('Simple - Abertura e fechamento do popover', () => {
    it('não exibe conteúdo do popover inicialmente', () => {
      render(<Filter items={mockItems} />);
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });

    it('exibe conteúdo ao clicar no trigger', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });

    it('oculta conteúdo ao clicar no trigger novamente', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} />);

      const trigger = screen.getByTestId('popover-trigger');
      await user.click(trigger);
      await user.click(trigger);
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });

    it('chama onOpen ao abrir o popover', async () => {
      const onOpen = vi.fn();
      const user = userEvent.setup();
      render(<Filter items={mockItems} onOpen={onOpen} />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('chama onClose ao fechar o popover', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      render(<Filter items={mockItems} onClose={onClose} />);

      const trigger = screen.getByTestId('popover-trigger');
      await user.click(trigger);
      await user.click(trigger);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('não abre o popover quando disabled=true', async () => {
      const onOpen = vi.fn();
      const user = userEvent.setup();
      render(<Filter items={mockItems} disabled onOpen={onOpen} />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(onOpen).not.toHaveBeenCalled();
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });
  });

  // ── Simple: Lista de itens ──────────────────────────────────────────────────
  describe('Simple - Lista de itens', () => {
    it('renderiza todos os itens ao abrir o popover', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
      expect(screen.getByText('Opção 2')).toBeInTheDocument();
      expect(screen.getByText('Opção 3')).toBeInTheDocument();
    });

    it('renderiza checkboxes para cada item no tipo checkbox', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} type="checkbox" />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    });

    it('não renderiza checkboxes no tipo text', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} type="text" />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    });

    it('item desabilitado tem aria-disabled=true', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} />);

      await user.click(screen.getByTestId('popover-trigger'));
      const disabledItem = screen.getByText('Opção 3').closest('[role="option"]');
      expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    });

    it('lista tem role="listbox"', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('exibe mensagem quando nenhum item é encontrado na busca', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} enableSearch />);

      await user.click(screen.getByTestId('popover-trigger'));
      fireEvent.change(screen.getByTestId('search-input'), {
        target: { value: 'inexistente' },
      });
      expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
    });

    it('renderiza ícone do item quando type="icon"', async () => {
      const itemsWithIcon: FilterItem[] = [
        { id: 'i1', text: 'Home', icon: <span data-testid="home-icon">🏠</span> },
      ];
      const user = userEvent.setup();
      render(<Filter items={itemsWithIcon} type="icon" />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });
  });

  // ── Simple: Seleção e aplicação de filtro ───────────────────────────────────
  describe('Simple - Seleção e aplicação de filtro', () => {
    it('seleciona item e chama onApplyFilter com o id ao aplicar', async () => {
      const onApplyFilter = vi.fn();
      const user = userEvent.setup();
      render(
        <Filter items={mockItems} type="checkbox" onApplyFilter={onApplyFilter} />
      );

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByText('Opção 1'));
      await user.click(screen.getByText('Aplicar'));

      expect(onApplyFilter).toHaveBeenCalledWith(['item-1']);
    });

    it('deseleciona item ao clicar novamente (toggle)', async () => {
      const onApplyFilter = vi.fn();
      const user = userEvent.setup();
      render(
        <Filter items={mockItems} type="checkbox" onApplyFilter={onApplyFilter} />
      );

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByText('Opção 1'));
      await user.click(screen.getByText('Opção 1'));
      await user.click(screen.getByText('Aplicar'));

      expect(onApplyFilter).toHaveBeenCalledWith([]);
    });

    it('seleciona múltiplos itens no tipo checkbox', async () => {
      const onApplyFilter = vi.fn();
      const user = userEvent.setup();
      render(
        <Filter items={mockItems} type="checkbox" onApplyFilter={onApplyFilter} />
      );

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByText('Opção 1'));
      await user.click(screen.getByText('Opção 2'));
      await user.click(screen.getByText('Aplicar'));

      expect(onApplyFilter).toHaveBeenCalledWith(['item-1', 'item-2']);
    });

    it('tipo text seleciona apenas um item por vez', async () => {
      const onApplyFilter = vi.fn();
      const user = userEvent.setup();
      render(
        <Filter items={mockItems} type="text" onApplyFilter={onApplyFilter} />
      );

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByText('Opção 1'));
      await user.click(screen.getByText('Opção 2'));
      await user.click(screen.getByText('Aplicar'));

      expect(onApplyFilter).toHaveBeenCalledWith(['item-2']);
    });

    it('não seleciona item desabilitado ao clicar', async () => {
      const onApplyFilter = vi.fn();
      const user = userEvent.setup();
      render(
        <Filter items={mockItems} type="checkbox" onApplyFilter={onApplyFilter} />
      );

      await user.click(screen.getByTestId('popover-trigger'));
      // item desabilitado tem pointer-events: none, usar fireEvent no <li>
      const disabledItem = screen.getByText('Opção 3').closest('[role="option"]')!;
      fireEvent.click(disabledItem);
      await user.click(screen.getByText('Aplicar'));

      expect(onApplyFilter).toHaveBeenCalledWith([]);
    });

    it('inicializa com selectedIds pré-marcados ao abrir', async () => {
      const user = userEvent.setup();
      render(
        <Filter
          items={mockItems}
          type="checkbox"
          selectedIds={['item-1', 'item-2']}
        />
      );

      await user.click(screen.getByTestId('popover-trigger'));
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
    });

    it('chama onApplyFilter com [] ao clicar em Limpar', async () => {
      const onApplyFilter = vi.fn();
      const user = userEvent.setup();
      render(
        <Filter items={mockItems} type="checkbox" onApplyFilter={onApplyFilter} />
      );

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByText('Opção 1'));
      await user.click(screen.getByText('Limpar'));

      expect(onApplyFilter).toHaveBeenCalledWith([]);
    });

    it('fecha o popover e chama onClose ao aplicar', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      render(<Filter items={mockItems} onClose={onClose} />);

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByText('Aplicar'));

      expect(onClose).toHaveBeenCalled();
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });
  });

  // ── Simple: Busca ───────────────────────────────────────────────────────────
  describe('Simple - Busca', () => {
    it('exibe campo de busca quando enableSearch=true', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} enableSearch />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('exibe campo de busca automaticamente quando há mais de 4 itens', async () => {
      const manyItems: FilterItem[] = Array.from({ length: 5 }, (_, i) => ({
        id: `item-${i}`,
        text: `Item ${i}`,
      }));
      const user = userEvent.setup();
      render(<Filter items={manyItems} />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('não exibe campo de busca com 4 itens ou menos sem enableSearch', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('filtra itens ao digitar na busca', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} enableSearch />);

      await user.click(screen.getByTestId('popover-trigger'));
      fireEvent.change(screen.getByTestId('search-input'), {
        target: { value: 'Opção 1' },
      });

      expect(screen.getByText('Opção 1')).toBeInTheDocument();
      expect(screen.queryByText('Opção 2')).not.toBeInTheDocument();
    });

    it('renderiza placeholder customizado no campo de busca', async () => {
      const user = userEvent.setup();
      render(<Filter items={mockItems} enableSearch placeholder="Buscar opção..." />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getByPlaceholderText('Buscar opção...')).toBeInTheDocument();
    });
  });

  // ── Simple: Tipo calendar ───────────────────────────────────────────────────
  describe('Simple - Tipo calendar', () => {
    it('exibe Calendar ao abrir o popover', async () => {
      const user = userEvent.setup();
      render(<Filter type="calendar" />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.getByTestId('calendar')).toBeInTheDocument();
    });

    it('chama onDateSelect ao selecionar uma data', async () => {
      const onDateSelect = vi.fn();
      const user = userEvent.setup();
      render(<Filter type="calendar" onDateSelect={onDateSelect} />);

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByTestId('calendar-select-day'));

      expect(onDateSelect).toHaveBeenCalledWith(new Date('2024-06-15'));
    });

    it('fecha o popover ao selecionar uma data', async () => {
      const user = userEvent.setup();
      render(<Filter type="calendar" onDateSelect={vi.fn()} />);

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByTestId('calendar-select-day'));

      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();
    });

    it('chama onClearDate ao limpar a data', async () => {
      const onClearDate = vi.fn();
      const user = userEvent.setup();
      render(<Filter type="calendar" onClearDate={onClearDate} />);

      await user.click(screen.getByTestId('popover-trigger'));
      await user.click(screen.getByTestId('calendar-clear'));

      expect(onClearDate).toHaveBeenCalled();
    });

    it('exibe data formatada no texto do botão quando selectedDate é fornecido', () => {
      // Usar new Date(ano, mês, dia) para evitar problemas de fuso horário
      const selectedDate = new Date(2024, 5, 15);
      render(<Filter type="calendar" selectedDate={selectedDate} />);

      expect(screen.getByText('15/06/2024')).toBeInTheDocument();
    });

    it('não renderiza a lista de itens no tipo calendar', async () => {
      const user = userEvent.setup();
      render(<Filter type="calendar" items={mockItems} />);

      await user.click(screen.getByTestId('popover-trigger'));
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  // ── Simple: Badge com múltiplas seleções ────────────────────────────────────
  describe('Simple - Badge de contagem', () => {
    it('exibe badge "+2" quando há 3 itens selecionados', () => {
      render(
        <Filter
          items={mockItems}
          type="checkbox"
          selectedIds={['item-1', 'item-2', 'item-3']}
        />
      );
      expect(screen.getByTestId('badge')).toHaveTextContent('+2');
    });

    it('não exibe badge quando apenas um item está selecionado', () => {
      render(
        <Filter items={mockItems} type="checkbox" selectedIds={['item-1']} />
      );
      expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
    });

    it('exibe o texto do primeiro item selecionado no botão', () => {
      render(
        <Filter
          items={mockItems}
          type="checkbox"
          selectedIds={['item-1', 'item-2']}
        />
      );
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
    });
  });

  // ── Combined: Renderização básica ───────────────────────────────────────────
  describe('Combined - Renderização básica', () => {
    it('renderiza com texto padrão "Filtrar"', () => {
      render(<Filter mode="combined" />);
      expect(screen.getByText('Filtrar')).toBeInTheDocument();
    });

    it('renderiza com buttonText customizado', () => {
      render(<Filter mode="combined" buttonText="Mais filtros" />);
      expect(screen.getByText('Mais filtros')).toBeInTheDocument();
    });

    it('renderiza ícone padrão FilterRegular', () => {
      render(<Filter mode="combined" />);
      expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    });

    it('renderiza ícone customizado quando fornecido', () => {
      render(
        <Filter
          mode="combined"
          icon={<span data-testid="custom-icon">★</span>}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('não renderiza o drawer inicialmente', () => {
      render(<Filter mode="combined" />);
      expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
    });

    it('botão está desabilitado quando disabled=true', () => {
      render(<Filter mode="combined" disabled />);
      expect(screen.getByRole('button', { name: /filtrar/i })).toBeDisabled();
    });
  });

  // ── Combined: Abertura e fechamento do drawer ───────────────────────────────
  describe('Combined - Abertura e fechamento do drawer', () => {
    it('abre o drawer ao clicar no botão', async () => {
      const user = userEvent.setup();
      render(<Filter mode="combined" />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      expect(screen.getByTestId('drawer')).toBeInTheDocument();
    });

    it('chama onOpen ao abrir o drawer', async () => {
      const onOpen = vi.fn();
      const user = userEvent.setup();
      render(<Filter mode="combined" onOpen={onOpen} />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('fecha o drawer ao clicar no botão de fechar', async () => {
      const user = userEvent.setup();
      render(<Filter mode="combined" />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      await user.click(screen.getByLabelText('Fechar drawer'));
      expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
    });

    it('chama onClose ao fechar o drawer', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      render(<Filter mode="combined" onClose={onClose} />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      await user.click(screen.getByLabelText('Fechar drawer'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  // ── Combined: Ações do drawer ───────────────────────────────────────────────
  describe('Combined - Ações do drawer', () => {
    it('chama onApply e fecha o drawer ao clicar em Aplicar', async () => {
      const onApply = vi.fn();
      const user = userEvent.setup();
      render(<Filter mode="combined" onApply={onApply} />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      await user.click(screen.getByRole('button', { name: /aplicar/i }));

      expect(onApply).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
    });

    it('chama onClear ao clicar em Limpar', async () => {
      const onClear = vi.fn();
      const user = userEvent.setup();
      render(<Filter mode="combined" onClear={onClear} />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      await user.click(screen.getByRole('button', { name: /limpar/i }));

      expect(onClear).toHaveBeenCalledTimes(1);
    });

    it('mantém o drawer aberto ao clicar em Limpar', async () => {
      const user = userEvent.setup();
      render(<Filter mode="combined" onClear={vi.fn()} />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      await user.click(screen.getByRole('button', { name: /limpar/i }));

      expect(screen.getByTestId('drawer')).toBeInTheDocument();
    });

    it('renderiza children no conteúdo do drawer', async () => {
      const user = userEvent.setup();
      render(
        <Filter mode="combined">
          <div data-testid="conteudo-customizado">Filtros personalizados</div>
        </Filter>
      );

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      expect(screen.getByTestId('conteudo-customizado')).toBeInTheDocument();
      expect(screen.getByText('Filtros personalizados')).toBeInTheDocument();
    });
  });

  // ── Combined: Título e badge ────────────────────────────────────────────────
  describe('Combined - Título e badge', () => {
    it('exibe título padrão "Filtrar" no drawer', async () => {
      const user = userEvent.setup();
      render(<Filter mode="combined" />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      expect(screen.getByRole('heading', { name: /filtrar/i })).toBeInTheDocument();
    });

    it('exibe título customizado no drawer', async () => {
      const user = userEvent.setup();
      // title afeta o drawer, buttonText continua sendo o padrão "Filtrar"
      render(<Filter mode="combined" title="Filtros avançados" />);

      await user.click(screen.getByRole('button', { name: /filtrar/i }));
      expect(screen.getByRole('heading', { name: /filtros avançados/i })).toBeInTheDocument();
    });

    it('exibe badge com activeCount quando maior que 0', () => {
      render(<Filter mode="combined" activeCount={3} />);
      expect(screen.getByTestId('badge')).toHaveTextContent('3');
    });

    it('não exibe badge quando activeCount=0', () => {
      render(<Filter mode="combined" activeCount={0} />);
      expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
    });

    it('não exibe badge quando activeCount não é fornecido', () => {
      render(<Filter mode="combined" />);
      expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
    });
  });
});
