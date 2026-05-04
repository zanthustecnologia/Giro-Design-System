import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Table2 from '../Table';

import type { ColumnDef } from '@tanstack/react-table';

// ─── Mocks de sub-componentes ───────────────────────────────────────────────

vi.mock('@fluentui/react-icons', () => ({
  ChevronLeft16Regular: () => <span data-testid="chevron-left" />,
  ChevronRight16Regular: () => <span data-testid="chevron-right" />,
}));

vi.mock('../../Checkbox/Checkbox', () => ({
  default: ({ checked, indeterminate, onCheckedChange }: any) => (
    <input
      type="checkbox"
      data-testid="row-checkbox"
      checked={!!checked}
      aria-checked={indeterminate ? 'mixed' : (checked ? 'true' : 'false')}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
    />
  ),
}));

vi.mock('../../Search/Search', () => ({
  default: ({ value, onChange, placeholder, className }: any) => (
    <input
      data-testid="search-input"
      value={value ?? ''}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  ),
}));

vi.mock('../../Filter/Filter', () => ({
  default: ({ buttonText, type }: any) => (
    <button data-testid={`filter-${type}`}>{buttonText}</button>
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

describe('Table2', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o elemento table', () => {
      render(<Table2 columns={columns} data={data} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('deve ter aria-label na tabela', () => {
      render(<Table2 columns={columns} data={data} />);
      expect(screen.getByRole('table')).toHaveAttribute('aria-label', 'Tabela de dados');
    });

    it('deve renderizar os cabeçalhos das colunas', () => {
      render(<Table2 columns={columns} data={data} />);
      expect(screen.getByRole('columnheader', { name: 'Nome' })).toBeInTheDocument();
      expect(screen.getByRole('columnheader', { name: 'Idade' })).toBeInTheDocument();
    });

    it('deve renderizar as linhas de dados', () => {
      render(<Table2 columns={columns} data={data} />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Carol')).toBeInTheDocument();
    });

    it('deve renderizar o número correto de linhas', () => {
      render(<Table2 columns={columns} data={data} />);
      // 3 linhas de dados + 1 linha de cabeçalho
      expect(screen.getAllByRole('row')).toHaveLength(data.length + 1);
    });

    it('deve aplicar className customizado no wrapper', () => {
      const { container } = render(<Table2 columns={columns} data={data} className="my-custom-class" />);
      expect(container.firstChild).toHaveClass('my-custom-class');
    });
  });

  describe('Estado de carregamento', () => {
    it('deve exibir "Carregando..." quando loading=true', () => {
      render(<Table2 columns={columns} data={data} loading />);
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('não deve renderizar a tabela quando loading=true', () => {
      render(<Table2 columns={columns} data={data} loading />);
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });

    it('deve renderizar a tabela normalmente quando loading=false', () => {
      render(<Table2 columns={columns} data={data} loading={false} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    });
  });

  describe('Estado vazio', () => {
    it('deve exibir texto padrão quando não há dados', () => {
      render(<Table2 columns={columns} data={emptyData} />);
      expect(screen.getByText('Nenhum registro encontrado')).toBeInTheDocument();
    });

    it('deve exibir texto customizado via locale.emptyText', () => {
      render(
        <Table2
          columns={columns}
          data={emptyData}
          locale={{ emptyText: 'Nada a exibir por aqui' }}
        />
      );
      expect(screen.getByText('Nada a exibir por aqui')).toBeInTheDocument();
      expect(screen.queryByText('Nenhum registro encontrado')).not.toBeInTheDocument();
    });

    it('deve exibir emptyText como ReactNode', () => {
      render(
        <Table2
          columns={columns}
          data={emptyData}
          locale={{ emptyText: <span data-testid="empty-node">Sem resultados</span> }}
        />
      );
      expect(screen.getByTestId('empty-node')).toBeInTheDocument();
    });

    it('deve renderizar célula vazia ocupando todas as colunas', () => {
      render(<Table2 columns={columns} data={emptyData} />);
      const emptyCell = screen.getByText('Nenhum registro encontrado').closest('td');
      expect(emptyCell).toHaveAttribute('colspan', String(columns.length));
    });
  });

  describe('Header (busca e filtros)', () => {
    it('deve renderizar campo de busca quando header é fornecido', () => {
      render(<Table2 columns={columns} data={data} header={{}} />);
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('deve usar placeholder padrão no campo de busca', () => {
      render(<Table2 columns={columns} data={data} header={{}} />);
      expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'Pesquisar...');
    });

    it('deve usar placeholder customizado no campo de busca', () => {
      render(
        <Table2 columns={columns} data={data} header={{ searchPlaceholder: 'Buscar usuário...' }} />
      );
      expect(screen.getByTestId('search-input')).toHaveAttribute('placeholder', 'Buscar usuário...');
    });

    it('não deve renderizar campo de busca quando showSearch=false', () => {
      render(<Table2 columns={columns} data={data} header={{ showSearch: false }} />);
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('não deve renderizar header quando a prop não é fornecida', () => {
      render(<Table2 columns={columns} data={data} />);
      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('deve filtrar linhas ao digitar no campo de busca', () => {
      render(<Table2 columns={columns} data={data} header={{}} />);
      fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'Alice' } });
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });

    it('deve renderizar filtros do tipo checkbox', () => {
      render(
        <Table2
          columns={columns}
          data={data}
          header={{
            showSearch: false,
            filterItems: [
              {
                type: 'checkbox',
                buttonText: 'Status',
                items: [{ id: '1', text: 'Ativo' }],
              },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-checkbox')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('deve renderizar filtros do tipo calendar', () => {
      render(
        <Table2
          columns={columns}
          data={data}
          header={{
            showSearch: false,
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
        <Table2
          columns={columns}
          data={data}
          header={{
            showSearch: false,
            filterItems: [
              { type: 'checkbox', buttonText: 'Status', items: [] },
              { type: 'calendar', buttonText: 'Data' },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-checkbox')).toBeInTheDocument();
      expect(screen.getByTestId('filter-calendar')).toBeInTheDocument();
    });

    it('deve renderizar filtro do tipo custom com conteúdo arbitrário', () => {
      render(
        <Table2
          columns={columns}
          data={data}
          header={{
            showSearch: false,
            filterItems: [
              {
                type: 'custom',
                content: <button data-testid="custom-filter-btn">Filtro especial</button>,
              },
            ],
          }}
        />
      );
      expect(screen.getByTestId('custom-filter-btn')).toBeInTheDocument();
      expect(screen.getByText('Filtro especial')).toBeInTheDocument();
    });

    it('deve renderizar filtro custom junto com filtros nativos', () => {
      render(
        <Table2
          columns={columns}
          data={data}
          header={{
            showSearch: false,
            filterItems: [
              { type: 'checkbox', buttonText: 'Status', items: [] },
              {
                type: 'custom',
                id: 'meu-custom',
                content: <span data-testid="custom-inline">Extra</span>,
              },
            ],
          }}
        />
      );
      expect(screen.getByTestId('filter-checkbox')).toBeInTheDocument();
      expect(screen.getByTestId('custom-inline')).toBeInTheDocument();
    });
  });

  describe('Seleção de linhas', () => {
    it('deve adicionar coluna de checkbox quando enableRowSelection=true', () => {
      render(<Table2 columns={columns} data={data} enableRowSelection />);
      expect(screen.getAllByTestId('row-checkbox').length).toBeGreaterThan(0);
    });

    it('não deve adicionar coluna de checkbox quando enableRowSelection=false', () => {
      render(<Table2 columns={columns} data={data} enableRowSelection={false} />);
      expect(screen.queryAllByTestId('row-checkbox')).toHaveLength(0);
    });

    it('deve renderizar um checkbox por linha mais o do cabeçalho', () => {
      render(<Table2 columns={columns} data={data} enableRowSelection />);
      // 1 checkbox no cabeçalho + 1 por linha de dado
      expect(screen.getAllByTestId('row-checkbox')).toHaveLength(data.length + 1);
    });

    it('deve chamar onRowSelectionChange ao selecionar uma linha', () => {
      const onRowSelectionChange = vi.fn();
      render(
        <Table2
          columns={columns}
          data={data}
          enableRowSelection
          onRowSelectionChange={onRowSelectionChange}
        />
      );
      const checkboxes = screen.getAllByTestId('row-checkbox');
      // checkboxes[0] = cabeçalho, checkboxes[1] = primeira linha
      fireEvent.click(checkboxes[1]);
      expect(onRowSelectionChange).toHaveBeenCalledTimes(1);
    });

    it('checkbox do cabeçalho deve estar com indeterminate quando parte das linhas está selecionada', () => {
      render(<Table2 columns={columns} data={data} enableRowSelection />);
      const checkboxes = screen.getAllByTestId('row-checkbox');
      // Seleciona apenas a primeira linha
      fireEvent.click(checkboxes[1]);
      const headerCheckbox = screen.getAllByTestId('row-checkbox')[0];
      expect(headerCheckbox).toHaveAttribute('aria-checked', 'mixed');
    });
  });

  describe('Filtros por coluna', () => {
    it('deve renderizar inputs de filtro nos cabeçalhos quando enableFilters=true', () => {
      render(<Table2 columns={columns} data={data} enableFilters />);
      const filterInputs = screen.getAllByPlaceholderText('Filtrar...');
      expect(filterInputs.length).toBeGreaterThan(0);
    });

    it('não deve renderizar inputs de filtro quando enableFilters=false', () => {
      render(<Table2 columns={columns} data={data} enableFilters={false} />);
      expect(screen.queryByPlaceholderText('Filtrar...')).not.toBeInTheDocument();
    });

    it('deve filtrar dados ao digitar no input de filtro por coluna', () => {
      render(<Table2 columns={columns} data={data} enableFilters />);
      const [nameFilter] = screen.getAllByPlaceholderText('Filtrar...');
      fireEvent.change(nameFilter, { target: { value: 'Alice' } });
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  describe('Paginação', () => {
    const footerProps = {
      totalItems: 20,
      defaultPageSize: 10,
    };

    it('deve renderizar controles de paginação quando footer é fornecido', () => {
      render(<Table2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByRole('button', { name: 'Página anterior' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Próxima página' })).toBeInTheDocument();
    });

    it('não deve renderizar paginação quando footer não é fornecido', () => {
      render(<Table2 columns={columns} data={data} />);
      expect(screen.queryByRole('button', { name: 'Página anterior' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Próxima página' })).not.toBeInTheDocument();
    });

    it('deve exibir "1 de 2" na primeira página com 2 páginas', () => {
      render(<Table2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByText('1 de 2')).toBeInTheDocument();
    });

    it('botão de página anterior deve estar desabilitado na primeira página', () => {
      render(<Table2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByRole('button', { name: 'Página anterior' })).toBeDisabled();
    });

    it('botão de próxima página deve estar habilitado na primeira página', () => {
      render(<Table2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByRole('button', { name: 'Próxima página' })).toBeEnabled();
    });

    it('deve navegar para a próxima página e exibir "2 de 2"', () => {
      render(<Table2 columns={columns} data={manyData} footer={footerProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }));
      expect(screen.getByText('2 de 2')).toBeInTheDocument();
    });

    it('deve chamar onPageChange ao navegar para a próxima página', () => {
      const onPageChange = vi.fn();
      render(
        <Table2
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
        <Table2
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
      render(<Table2 columns={columns} data={manyData} footer={footerProps} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('deve usar opções padrão de itens por página [10, 25, 50, 100]', () => {
      render(<Table2 columns={columns} data={manyData} footer={footerProps} />);
      const select = screen.getByRole('combobox');
      const options = within(select).getAllByRole('option');
      expect(options.map((o) => o.textContent)).toEqual(['10', '25', '50', '100']);
    });

    it('deve usar pageSizeOptions customizados', () => {
      render(
        <Table2
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
        <Table2
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
        <Table2
          columns={columns}
          data={emptyData}
          footer={{ totalItems: 0 }}
        />
      );
      expect(screen.getByText('0 páginas')).toBeInTheDocument();
    });
  });

  describe('Eventos por linha (onRow)', () => {
    it('deve chamar onClick ao clicar em uma linha', () => {
      const onClick = vi.fn();
      render(
        <Table2
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
        <Table2
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
        <Table2
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
      render(<Table2 columns={columns} data={data} onRow={onRow} />);
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
      render(<Table2 columns={columnsWithAlign} data={data} />);
      const firstCell = screen.getAllByRole('cell')[0];
      expect(firstCell).toHaveStyle({ textAlign: 'center' });
    });

    it('deve aplicar alinhamento "right" via column meta', () => {
      const columnsWithAlign: ColumnDef<Person>[] = [
        { accessorKey: 'name', header: 'Nome' },
        { accessorKey: 'age', header: 'Idade', meta: { align: 'right' } },
      ];
      render(<Table2 columns={columnsWithAlign} data={data} />);
      const secondCell = screen.getAllByRole('cell')[1];
      expect(secondCell).toHaveStyle({ textAlign: 'right' });
    });
  });
});
