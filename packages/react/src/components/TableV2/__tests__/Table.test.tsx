import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import TableV2 from '../Table';

import type { ColumnDef } from '@tanstack/react-table';

// ─── Mocks de sub-componentes ───────────────────────────────────────────────

vi.mock('@fluentui/react-icons', () => ({
  ChevronLeft16Regular: () => <span data-testid="chevron-left" />,
  ChevronRight16Regular: () => <span data-testid="chevron-right" />,
  ArrowSort16Regular: () => <span data-testid="arrow-sort" />,
  ArrowSortUp16Regular: () => <span data-testid="arrow-sort-up" />,
  ArrowSortDown16Regular: () => <span data-testid="arrow-sort-down" />,
  Dismiss16Regular: () => <span data-testid="dismiss" />,
  SearchInfo20Regular: () => <span data-testid="search-info-icon" />,
}));

vi.mock('react-loading-skeleton', () => ({
  default: () => <span data-testid="skeleton" />,
}));

vi.mock('../../Checkbox/Checkbox', () => ({
  default: ({ checked, indeterminate, onCheckedChange, disabled }: any) => (
    <input
      type="checkbox"
      data-testid="row-checkbox"
      checked={!!checked}
      disabled={!!disabled}
      aria-checked={indeterminate ? 'mixed' : (checked ? 'true' : 'false')}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
    />
  ),
}));

vi.mock('../../Search/Search', () => ({
  default: ({ value, onChange, onSearch, onClear, placeholder, className }: any) => (
    <>
      <input
        data-testid="search-input"
        value={value ?? ''}
        onChange={onChange}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') onSearch?.(value ?? '');
        }}
        placeholder={placeholder}
        className={className}
      />
      <button data-testid="search-clear" type="button" onClick={() => onClear?.()}>
        Limpar busca
      </button>
    </>
  ),
}));

vi.mock('../../Filter/Filter', () => ({
  default: ({ buttonText, type, mode, appliedFilterCount }: any) => (
    <button data-testid={mode === 'combined' ? 'filter-combined' : `filter-${type}`}>
      {buttonText}
      {mode === 'combined' && appliedFilterCount > 0 && (
        <span data-testid="filter-combined-badge">{appliedFilterCount}</span>
      )}
    </button>
  ),
}));

vi.mock('../../ToggleButton/ToggleButton', () => ({
  default: ({ items, value, onValueChange }: any) => (
    <div data-testid="view-toggle">
      {items?.map((item: any) => (
        <button
          key={item.value}
          data-testid={`toggle-item-${item.value}`}
          aria-pressed={value === item.value}
          onClick={() => onValueChange?.(item.value)}
        >
          {item.value}
        </button>
      ))}
    </div>
  ),
}));

// ─── Dados de teste ──────────────────────────────────────────────────────────

type Person = { id: number; name: string; age: number };

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Nome' },
  { accessorKey: 'age', header: 'Idade' },
];

const data: Person[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Carol', age: 40 },
];

const emptyData: Person[] = [];

const manyData: Person[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Pessoa ${i + 1}`,
  age: 20 + i,
}));

// ─── Testes ───────────────────────────────────────────────────────────────────

describe('TableV2', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o elemento table', () => {
      render(<TableV2 columns={columns} data={data} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('deve ter aria-label na tabela', () => {
      render(<TableV2 columns={columns} data={data} />);
      expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'Tabela de dados');
    });

    it('deve renderizar os cabeçalhos das colunas', () => {
      render(<TableV2 columns={columns} data={data} />);
      expect(screen.getByRole('columnheader', { name: 'Nome' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Idade' })).toBeInTheDocument();
    });

    it('deve renderizar as linhas de dados', () => {
      render(<TableV2 columns={columns} data={data} />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Carol')).toBeInTheDocument();
    });

    it('deve renderizar o número correto de linhas', () => {
      render(<TableV2 columns={columns} data={data} />);
      // 3 linhas de dados + 1 linha de cabeçalho
      expect(screen.getAllByRole('row')).toHaveLength(data.length + 1);
    });

    it('deve aplicar className customizado no wrapper', () => {
      const { container } = render(<TableV2 columns={columns} data={data} className="my-custom-class" />);
      expect(container.firstChild).toHaveClass('my-custom-class');
    });
  });

  describe('Estado de carregamento', () => {
    it('deve renderizar a tabela quando loading=true', () => {
      render(<TableV2 columns={columns} data={data} loading />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('deve exibir células skeleton quando loading=true', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          loading
          footer={{ totalItems: 3, defaultPageSize: 3 }}
        />,
      );
      expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0);
    });

    it('não deve exibir os dados reais quando loading=true', () => {
      render(<TableV2 columns={columns} data={data} loading />);
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });

    it('deve renderizar os dados normalmente quando loading=false', () => {
      render(<TableV2 columns={columns} data={data} loading={false} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
  });

  describe('Estado vazio', () => {
    it('deve exibir título e caption padrão quando não há dados', () => {
      render(<TableV2 columns={columns} data={emptyData} />);
      expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument();
      expect(screen.getByText('Nenhum registro encontrado')).toBeInTheDocument();
    });

    it('deve exibir texto customizado via emptyText', () => {
      render(
        <TableV2
          columns={columns}
          data={emptyData}
          emptyText="Nada a exibir por aqui"
        />
      );
      expect(screen.getByText('Nada a exibir por aqui')).toBeInTheDocument();
      expect(screen.queryByText('Nenhum registro encontrado')).not.toBeInTheDocument();
    });

    it('deve exibir título customizado via emptyTitle', () => {
      render(
        <TableV2
          columns={columns}
          data={emptyData}
          emptyTitle="Título customizado"
        />
      );
      expect(screen.getByText('Título customizado')).toBeInTheDocument();
      expect(screen.queryByText('Nenhum dado encontrado')).not.toBeInTheDocument();
    });

    it('deve exibir emptyText como ReactNode', () => {
      render(
        <TableV2
          columns={columns}
          data={emptyData}
          emptyText={<span data-testid="empty-node">Sem resultados</span>}
        />
      );
      expect(screen.getByTestId('empty-node')).toBeInTheDocument();
    });

    it('deve renderizar célula vazia ocupando todas as colunas', () => {
      render(<TableV2 columns={columns} data={emptyData} />);
      const emptyCell = screen.getByText('Nenhum dado encontrado').closest('td');
      expect(emptyCell).toHaveAttribute('colspan', String(columns.length));
    });
  });

  describe('Header (busca e filtros)', () => {
    it('deve renderizar campo de busca quando header.onSearchChange é fornecido', () => {
      render(<TableV2 columns={columns} data={data} header={{ onSearchChange: vi.fn() }} />);
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('deve usar placeholder padrão no campo de busca', () => {
      render(<TableV2 columns={columns} data={data} header={{ onSearchChange: vi.fn() }} />);
      expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'Pesquisar...');
    });

    it('deve usar placeholder customizado no campo de busca', () => {
      render(
        <TableV2 columns={columns} data={data} header={{ onSearchChange: vi.fn(), searchPlaceholder: 'Buscar usuário...' }} />
      );
      expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'Buscar usuário...');
    });

    it('não deve renderizar campo de busca quando onSearchChange não é fornecido', () => {
      render(<TableV2 columns={columns} data={data} header={{}} />);
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('não deve renderizar header quando a prop não é fornecida', () => {
      render(<TableV2 columns={columns} data={data} />);
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('não deve chamar onSearchChange ao digitar sem pressionar Enter', () => {
      const onSearchChange = vi.fn();
      render(<TableV2 columns={columns} data={data} header={{ onSearchChange }} />);
      fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'Alice' } });
      expect(onSearchChange).not.toHaveBeenCalled();
    });

    it('deve chamar onSearchChange ao pressionar Enter', () => {
      const onSearchChange = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{ onSearchChange }}
        />
      );
      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'Carol' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onSearchChange).toHaveBeenCalledWith('Carol');
    });

    it('deve chamar onSearchChange com "" ao acionar onClear', () => {
      const onSearchChange = vi.fn();
      render(<TableV2 columns={columns} data={data} header={{ onSearchChange }} />);
      fireEvent.click(screen.getByTestId('search-clear'));
      expect(onSearchChange).toHaveBeenCalledWith('');
    });

    it('deve renderizar filtros do tipo multiple', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              {
                type: 'multiple',
                buttonText: 'Status',
                items: [{ id: '1', text: 'Ativo' }],
              },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-multiple')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('deve renderizar filtros do tipo calendar', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              {
                type: 'calendar',
                buttonText: 'Data de início',
              },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-calendar')).toBeInTheDocument();
      expect(screen.getByText('Data de início')).toBeInTheDocument();
    });

    it('deve renderizar múltiplos filtros', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              { type: 'multiple', buttonText: 'Status', items: [] },
              { type: 'calendar', buttonText: 'Data' },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-multiple')).toBeInTheDocument();
      expect(screen.getByTestId('filter-calendar')).toBeInTheDocument();
    });

    it('deve renderizar filtro combinado quando filterItems contém type combined', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              {
                type: 'combined',
                buttonText: 'Filtrar',
                children: <div>Conteúdo dos filtros</div>,
              },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-combined')).toBeInTheDocument();
      expect(screen.getByText('Filtrar')).toBeInTheDocument();
    });

    it('deve exibir badge com activeCount no filtro combinado', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              {
                type: 'combined',
                buttonText: 'Filtrar',
                activeCount: 3,
                children: <div>Conteúdo dos filtros</div>,
              },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-combined-badge')).toHaveTextContent('3');
    });

    it('não deve renderizar filtro combinado quando filterItems não possui type combined', () => {
      render(<TableV2 columns={columns} data={data} header={{}} />);
      expect(screen.queryByTestId('filter-combined')).not.toBeInTheDocument();
    });

    it('deve renderizar filtro combined junto com outros tipos em filterItems', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              { type: 'multiple', buttonText: 'Status', items: [] },
              { type: 'combined', buttonText: 'Filtros avançados' },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-multiple')).toBeInTheDocument();
      expect(screen.getByTestId('filter-combined')).toBeInTheDocument();
    });

    it('não deve exibir label "Filtros" quando todos os filterItems são do tipo combined', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              {
                type: 'combined',
                buttonText: 'Filtros',
                children: <div>Conteúdo</div>,
              },
            ],
          }}
        />
      );
      // O botão com texto "Filtros" existe, mas não o label estático
      const allWithText = screen.getAllByText('Filtros');
      // Apenas o botão do filtro deve ter "Filtros", sem o <span> de label adicional
      expect(allWithText).toHaveLength(1);
    });

    it('deve exibir label "Filtros" quando há filtros não-combined', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              { type: 'multiple', buttonText: 'Status', items: [] },
            ],
          }}
        />
      );
      expect(screen.getByText('Filtros')).toBeInTheDocument();
    });

    it('deve exibir label "Filtros" quando há mistura de combined e não-combined', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            filterItems: [
              { type: 'multiple', buttonText: 'Status', items: [] },
              { type: 'combined', buttonText: 'Filtros avançados' },
            ],
          }}
        />
      );
      expect(screen.getByText('Filtros')).toBeInTheDocument();
    });
  });

  describe('Seleção de linhas', () => {
    it('deve adicionar coluna de checkbox quando rowSelection está definido', () => {
      render(<TableV2 columns={columns} data={data} rowSelection={{}} />);
      expect(screen.getAllByTestId('row-checkbox').length).toBeGreaterThan(0);
    });

    it('não deve adicionar coluna de checkbox quando rowSelection não está definido', () => {
      render(<TableV2 columns={columns} data={data} />);
      expect(screen.queryAllByTestId('row-checkbox')).toHaveLength(0);
    });

    it('deve renderizar um checkbox por linha mais o do cabeçalho', () => {
      render(<TableV2 columns={columns} data={data} rowSelection={{}} />);
      // 1 checkbox no cabeçalho + 1 por linha de dado
      expect(screen.getAllByTestId('row-checkbox')).toHaveLength(data.length + 1);
    });

    it('deve chamar rowSelection.onRowChange ao selecionar uma linha', () => {
      const onRowChange = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={data}
          rowSelection={{ onRowChange }}
        />
      );
      const checkboxes = screen.getAllByTestId('row-checkbox');
      // checkboxes[0] = cabeçalho, checkboxes[1] = primeira linha
      fireEvent.click(checkboxes[1]);
      expect(onRowChange).toHaveBeenCalledTimes(1);
    });

    it('checkbox do cabeçalho deve estar com indeterminate quando parte das linhas está selecionada', () => {
      render(<TableV2 columns={columns} data={data} rowSelection={{}} />);
      const checkboxes = screen.getAllByTestId('row-checkbox');
      // Seleciona apenas a primeira linha
      fireEvent.click(checkboxes[1]);
      const headerCheckbox = screen.getAllByTestId('row-checkbox')[0];
      expect(headerCheckbox).toHaveAttribute('aria-checked', 'mixed');
    });

    it('deve adicionar coluna de checkbox quando rowSelection.disabled é uma função', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          rowSelection={{ disabled: () => false }}
        />
      );
      expect(screen.getAllByTestId('row-checkbox').length).toBeGreaterThan(0);
    });

    it('deve desabilitar checkbox da linha quando rowSelection.disabled retorna true para ela', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          rowSelection={{ disabled: (row) => (row as Person).id === 1 }}
        />
      );
      const checkboxes = screen.getAllByTestId('row-checkbox');
      // checkboxes[0] = cabeçalho, checkboxes[1] = Alice (id=1 → desabilitado)
      expect(checkboxes[1]).toBeDisabled();
      expect(checkboxes[2]).not.toBeDisabled();
    });

    it('não deve desabilitar checkboxes quando rowSelection.disabled retorna false para todas as linhas', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          rowSelection={{ disabled: () => false }}
        />
      );
      const checkboxes = screen.getAllByTestId('row-checkbox');
      // Pula o checkbox do cabeçalho
      checkboxes.slice(1).forEach((cb) => {
        expect(cb).not.toBeDisabled();
      });
    });

    it('deve renderizar linhas pré-selecionadas quando selectedRowKeys é fornecido', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          rowSelection={{ selectedRowKeys: [0] }}
        />
      );
      const checkboxes = screen.getAllByTestId('row-checkbox');
      // checkboxes[1] = primeira linha (índice 0) deve estar marcada
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();
    });

    it('deve atualizar seleção quando selectedRowKeys externo muda (modo controlado)', () => {
      const { rerender } = render(
        <TableV2
          columns={columns}
          data={data}
          rowSelection={{ selectedRowKeys: [0] }}
        />
      );
      let checkboxes = screen.getAllByTestId('row-checkbox');
      expect(checkboxes[1]).toBeChecked();
      expect(checkboxes[2]).not.toBeChecked();

      rerender(
        <TableV2
          columns={columns}
          data={data}
          rowSelection={{ selectedRowKeys: [1] }}
        />
      );
      checkboxes = screen.getAllByTestId('row-checkbox');
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[2]).toBeChecked();
    });

    it('deve chamar onRowChange em modo controlado sem alterar estado interno', () => {
      const onRowChange = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={data}
          rowSelection={{ selectedRowKeys: [], onRowChange }}
        />
      );
      const checkboxes = screen.getAllByTestId('row-checkbox');
      fireEvent.click(checkboxes[1]);
      expect(onRowChange).toHaveBeenCalledTimes(1);
      // Em modo controlado a seleção visual não muda sem o pai atualizar selectedRowKeys
      expect(checkboxes[1]).not.toBeChecked();
    });
  });

  describe('Paginação', () => {
    const footerProps = {
      totalItems: 20,
      defaultPageSize: 10,
    };

    it('deve renderizar controles de paginação quando footer é fornecido', () => {
      render(<TableV2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByRole('button', { name: 'Página anterior' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Próxima página' })).toBeInTheDocument();
    });

    it('não deve renderizar paginação quando footer não é fornecido', () => {
      render(<TableV2 columns={columns} data={data} />);
      expect(screen.queryByRole('button', { name: 'Página anterior' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Próxima página' })).not.toBeInTheDocument();
    });

    it('deve exibir "1 de 2" na primeira página com 2 páginas', () => {
      render(<TableV2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByText('1 de 2')).toBeInTheDocument();
    });

    it('botão de página anterior deve estar desabilitado na primeira página', () => {
      render(<TableV2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled();
    });

    it('botão de próxima página deve estar habilitado na primeira página', () => {
      render(<TableV2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByRole('button', { name: 'Próxima página' })).toBeEnabled();
    });

    it('deve navegar para a próxima página e exibir "2 de 2"', () => {
      render(<TableV2 columns={columns} data={manyData} footer={footerProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));
      expect(screen.getByText('2 de 2')).toBeInTheDocument();
    });

    it('deve chamar onPageChange ao navegar para a próxima página', () => {
      const onPageChange = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ ...footerProps, onPageChange }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('deve navegar para a página anterior e chamar onPageChange', () => {
      const onPageChange = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ ...footerProps, onPageChange }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));
      fireEvent.click(screen.getByRole('button', { name: 'Página anterior' }));
      expect(onPageChange).toHaveBeenLastCalledWith(1);
    });

    it('deve renderizar seletor de itens por página', () => {
      render(<TableV2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('deve usar opções padrão de itens por página [10, 25, 50, 100]', () => {
      render(<TableV2 columns={columns} data={manyData} footer={footerProps} />);
      const select = screen.getByRole('combobox');
      const options = within(select).getAllByRole('option');
      expect(options.map((o) => o.textContent)).toEqual(['10', '25', '50', '100']);
    });

    it('deve usar pageSizeOptions customizados', () => {
      render(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ ...footerProps, pageSizeOptions: [5, 10, 20] }}
        />
      );
      const select = screen.getByRole('combobox');
      const options = within(select).getAllByRole('option');
      expect(options.map((o) => o.textContent)).toEqual(['5', '10', '20']);
    });

    it('deve chamar onPageSizeChange ao alterar itens por página', () => {
      const onPageSizeChange = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ ...footerProps, onPageSizeChange, pageSizeOptions: [10, 25] }}
        />
      );
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '25' } });
      expect(onPageSizeChange).toHaveBeenCalledWith(25);
    });

    it('deve exibir "0 páginas" quando totalItems é 0', () => {
      render(
        <TableV2
          columns={columns}
          data={emptyData}
          footer={{ totalItems: 0 }}
        />
      );
      expect(screen.getByText('0 páginas')).toBeInTheDocument();
    });
  });

  describe('Paginação controlada (currentPage)', () => {
    it('deve iniciar na página correta quando currentPage é fornecido', () => {
      render(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ totalItems: 20, defaultPageSize: 10, currentPage: 2 }}
        />
      );
      expect(screen.getByText('2 de 2')).toBeInTheDocument();
    });

    it('deve sincronizar pageIndex quando currentPage externo muda', () => {
      const { rerender } = render(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ totalItems: 20, defaultPageSize: 10, currentPage: 1 }}
        />
      );
      expect(screen.getByText('1 de 2')).toBeInTheDocument();

      rerender(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ totalItems: 20, defaultPageSize: 10, currentPage: 2 }}
        />
      );
      expect(screen.getByText('2 de 2')).toBeInTheDocument();
    });

    it('deve resetar para a página 1 quando currentPage externo muda para 1', () => {
      const { rerender } = render(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ totalItems: 20, defaultPageSize: 10, currentPage: 2 }}
        />
      );
      expect(screen.getByText('2 de 2')).toBeInTheDocument();

      rerender(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ totalItems: 20, defaultPageSize: 10, currentPage: 1 }}
        />
      );
      expect(screen.getByText('1 de 2')).toBeInTheDocument();
    });
  });

  describe('Eventos por linha (onRow)', () => {
    it('deve chamar onClick ao clicar em uma linha', () => {
      const onClick = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={data}
          onRow={() => ({ onClick })}
        />
      );
      const rows = screen.getAllByRole('row');
      // rows[0] = cabeçalho, rows[1] = primeira linha de dado
      fireEvent.click(rows[1]);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onDoubleClick ao dar dois cliques em uma linha', () => {
      const onDoubleClick = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={data}
          onRow={() => ({ onDoubleClick })}
        />
      );
      const rows = screen.getAllByRole('row');
      fireEvent.dblClick(rows[1]);
      expect(onDoubleClick).toHaveBeenCalledTimes(1);
    });

    it('deve aplicar className customizado na linha via onRow', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          onRow={() => ({ className: 'linha-especial' })}
        />
      );
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveClass('linha-especial');
    });

    it('deve passar os dados corretos da linha para o callback onRow', () => {
      const onRow = vi.fn().mockReturnValue({});
      render(<TableV2 columns={columns} data={data} onRow={onRow} />);
      expect(onRow).toHaveBeenCalledWith(data[0], 0);
      expect(onRow).toHaveBeenCalledWith(data[1], 1);
      expect(onRow).toHaveBeenCalledWith(data[2], 2);
    });
  });

  describe('Alinhamento de colunas', () => {
    it('deve aplicar alinhamento "center" via column meta', () => {
      const columnsWithAlign: ColumnDef<Person>[] = [
        { accessorKey: 'name', header: 'Nome', meta: { align: 'center' } },
        { accessorKey: 'age', header: 'Idade' },
      ];
      render(<TableV2 columns={columnsWithAlign} data={data} />);
      const firstCell = screen.getAllByRole('cell')[0];
      expect(firstCell).toHaveStyle({ textAlign: 'center' });
    });

    it('deve aplicar alinhamento "right" via column meta', () => {
      const columnsWithAlign: ColumnDef<Person>[] = [
        { accessorKey: 'name', header: 'Nome' },
        { accessorKey: 'age', header: 'Idade', meta: { align: 'right' } },
      ];
      render(<TableV2 columns={columnsWithAlign} data={data} />);
      const secondCell = screen.getAllByRole('cell')[1];
      expect(secondCell).toHaveStyle({ textAlign: 'right' });
    });
  });

  describe('Header — viewToggle', () => {
    const viewToggleItems: [any, any] = [
      { value: 'list', icon: <span>List</span>, tooltipText: 'Lista' },
      { value: 'grid', icon: <span>Grid</span>, tooltipText: 'Grade' },
    ];

    it('deve renderizar o ToggleButton quando header.viewToggle é fornecido', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{ viewToggle: { items: viewToggleItems } }}
        />
      );
      expect(screen.getByTestId('view-toggle')).toBeInTheDocument();
    });

    it('não deve renderizar o ToggleButton quando header.viewToggle não é fornecido', () => {
      render(<TableV2 columns={columns} data={data} header={{}} />);
      expect(screen.queryByTestId('view-toggle')).not.toBeInTheDocument();
    });

    it('deve selecionar o primeiro item por padrão quando defaultValue não é fornecido', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{ viewToggle: { items: viewToggleItems } }}
        />
      );
      expect(screen.getByTestId('toggle-item-list')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByTestId('toggle-item-grid')).toHaveAttribute('aria-pressed', 'false');
    });

    it('deve usar defaultValue como vista inicial (modo não controlado)', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{ viewToggle: { items: viewToggleItems, defaultValue: 'grid' } }}
        />
      );
      expect(screen.getByTestId('toggle-item-grid')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByTestId('toggle-item-list')).toHaveAttribute('aria-pressed', 'false');
    });

    it('deve respeitar value externo (modo controlado)', () => {
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{ viewToggle: { items: viewToggleItems, value: 'grid' } }}
        />
      );
      expect(screen.getByTestId('toggle-item-grid')).toHaveAttribute('aria-pressed', 'true');
    });

    it('deve sincronizar quando value externo muda (modo controlado)', () => {
      const { rerender } = render(
        <TableV2
          columns={columns}
          data={data}
          header={{ viewToggle: { items: viewToggleItems, value: 'list' } }}
        />
      );
      expect(screen.getByTestId('toggle-item-list')).toHaveAttribute('aria-pressed', 'true');

      rerender(
        <TableV2
          columns={columns}
          data={data}
          header={{ viewToggle: { items: viewToggleItems, value: 'grid' } }}
        />
      );
      expect(screen.getByTestId('toggle-item-grid')).toHaveAttribute('aria-pressed', 'true');
    });

    it('deve chamar onValueChange ao clicar em um item do toggle', () => {
      const onValueChange = vi.fn();
      render(
        <TableV2
          columns={columns}
          data={data}
          header={{ viewToggle: { items: viewToggleItems, onValueChange } }}
        />
      );
      fireEvent.click(screen.getByTestId('toggle-item-grid'));
      expect(onValueChange).toHaveBeenCalledWith('grid');
    });

    it('deve alternar colunas/dados conforme a vista selecionada via views', () => {
      const columnsGrid: ColumnDef<Person>[] = [
        { accessorKey: 'name', header: 'Nome (Grid)' },
      ];
      const dataGrid: Person[] = [{ id: 10, name: 'GridPessoa', age: 99 }];

      render(
        <TableV2
          columns={columns}
          data={data}
          header={{
            viewToggle: {
              items: viewToggleItems,
              views: {
                list: { columns, data },
                grid: { columns: columnsGrid, data: dataGrid },
              },
            },
          }}
        />
      );

      // Vista inicial: list
      expect(screen.getByRole('columnheader', { name: 'Nome' })).toBeInTheDocument();
      expect(screen.getByText('Alice')).toBeInTheDocument();

      // Troca para grid
      fireEvent.click(screen.getByTestId('toggle-item-grid'));
      expect(screen.getByRole('columnheader', { name: 'Nome (Grid)' })).toBeInTheDocument();
      expect(screen.getByText('GridPessoa')).toBeInTheDocument();
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });

    it('deve resetar a paginação para a página 1 ao trocar de vista', () => {
      const columnsGrid: ColumnDef<Person>[] = [{ accessorKey: 'name', header: 'Nome (Grid)' }];
      const dataGrid: Person[] = Array.from({ length: 15 }, (_, i) => ({
        id: 100 + i,
        name: `Grid ${i + 1}`,
        age: i,
      }));
      const onPageChange = vi.fn();

      render(
        <TableV2
          columns={columns}
          data={manyData}
          footer={{ totalItems: 30, defaultPageSize: 10, onPageChange }}
          header={{
            viewToggle: {
              items: viewToggleItems,
              views: {
                list: { columns, data: manyData },
                grid: { columns: columnsGrid, data: dataGrid },
              },
            },
          }}
        />
      );

      // Navega para a segunda página
      fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));
      expect(screen.getByText('2 de 3')).toBeInTheDocument();

      // Troca de vista → deve voltar para página 1
      fireEvent.click(screen.getByTestId('toggle-item-grid'));
      expect(onPageChange).toHaveBeenLastCalledWith(1);
    });
  });
});
