import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Table from '../Table';
import type { TableColumn, TableRowData } from '../Table.types';

// 🧪 MOCK DATA
const mockColumns: TableColumn[] = [
  {
    key: 'id',
    label: 'ID',
    type: 'text',
    align: 'left'
  },
  {
    key: 'name',
    label: 'Nome',
    type: 'text',
    render: (row) => <span data-testid={`name-${row.id}`}>{row.name}</span>
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text'
  },
  {
    key: 'createdAt',
    label: 'Data Criação',
    type: 'datetime',
    format: 'dd/MM/yyyy'
  },
  {
    key: 'status',
    label: 'Status',
    type: 'custom',
    render: (row) => (
      <span 
        data-testid={`status-${row.id}`}
        className={`status-${row.status}`}
      >
        {row.status}
      </span>
    )
  }
];

const mockDataSource: TableRowData[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    createdAt: '2024-02-20T14:45:00Z',
    status: 'inactive'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    createdAt: '2024-03-10T09:15:00Z',
    status: 'pending'
  }
];

describe('Table Component', () => {
  
  // ✅ TESTE BÁSICO: Renderização
  describe('Basic Rendering', () => {
    test('renders table with correct structure', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource} 
        />
      );

      // Verificar se tabela existe
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveClass('zds-table');

      // Verificar headers
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('Nome')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Data Criação')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    test('renders correct number of rows', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource} 
        />
      );

      // 3 data rows + 1 header row = 4 total rows
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(4);
    });

    test('renders data correctly in cells', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource} 
        />
      );

      // Verificar dados específicos
      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText('joao@email.com')).toBeInTheDocument();
      expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    });
  });

  // ✅ TESTE: Empty State
  describe('Empty State', () => {
    test('renders empty state when no data', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={[]} 
        />
      );

      expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument();
    });

    test('renders custom empty state', () => {
      const customEmpty = <div>Custom empty message</div>;
      
      render(
        <Table 
          columns={mockColumns} 
          dataSource={[]} 
        //   emptyState={customEmpty}
        />
      );

      expect(screen.getByText('Custom empty message')).toBeInTheDocument();
    });
  });

  // ✅ TESTE: Loading State
  describe('Loading State', () => {
    test('renders loading state', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource}
          loading={true}
        />
      );

      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    test('renders custom loading state', () => {
      const customLoading = <div>Custom loading...</div>;
      
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource}
          loading={true}
        //   loadingState={customLoading}
        />
      );

      expect(screen.getByText('Custom loading...')).toBeInTheDocument();
    });
  });

  // ✅ TESTE: Row Selection
  describe('Row Selection', () => {
    test('renders checkboxes when rowSelection is provided', () => {
      const mockRowSelection = {
        selectedRowKeys: [],
        onChange: jest.fn()
      };

      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource}
          rowSelection={mockRowSelection}
        />
      );

      // Header checkbox + 3 row checkboxes = 4 total
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4);
    });

    test('calls onChange when row is selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();
      const mockRowSelection = {
        selectedRowKeys: [],
        onChange: mockOnChange
      };

      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource}
          rowSelection={mockRowSelection}
        />
      );

      // Clicar no primeiro checkbox de linha (index 1, pois 0 é header)
      const checkboxes = screen.getAllByRole('checkbox');
      await user.click(checkboxes[1]);

      expect(mockOnChange).toHaveBeenCalledWith([0], [mockDataSource[0]]);
    });

    test('selects all rows when header checkbox is clicked', async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();
      const mockRowSelection = {
        selectedRowKeys: [],
        onChange: mockOnChange
      };

      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource}
          rowSelection={mockRowSelection}
        />
      );

      // Clicar no checkbox do header (primeiro checkbox)
      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      await user.click(headerCheckbox);

      expect(mockOnChange).toHaveBeenCalledWith(
        [0, 1, 2], 
        mockDataSource
      );
    });

    test('shows correct selected state', () => {
      const mockRowSelection = {
        selectedRowKeys: [0, 1],
        onChange: jest.fn()
      };

      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource}
          rowSelection={mockRowSelection}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      
      // Primeiro e segundo checkbox de linha devem estar checked
      expect(checkboxes[1]).toBeChecked(); // Row 0
      expect(checkboxes[2]).toBeChecked(); // Row 1
      expect(checkboxes[3]).not.toBeChecked(); // Row 2
    });
  });

  // ✅ TESTE: Column Types
  describe('Column Types', () => {
    test('renders text columns correctly', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource} 
        />
      );

      expect(screen.getByText('João Silva')).toBeInTheDocument();
      expect(screen.getByText('joao@email.com')).toBeInTheDocument();
    });

    test('renders datetime columns with formatting', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource} 
        />
      );

      // Verificar se a data foi formatada corretamente
      expect(screen.getByText('15/01/2024')).toBeInTheDocument();
      expect(screen.getByText('20/02/2024')).toBeInTheDocument();
    });

    test('renders custom columns with render function', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource} 
        />
      );

      // Verificar elementos customizados pelos data-testid
      expect(screen.getByTestId('name-1')).toBeInTheDocument();
      expect(screen.getByTestId('status-1')).toBeInTheDocument();
      expect(screen.getByTestId('status-1')).toHaveTextContent('active');
    });
  });

  // ✅ TESTE: Edge Cases
  describe('Edge Cases', () => {
    test('handles null/undefined values gracefully', () => {
      const dataWithNulls = [
        {
          id: 1,
          name: null,
          email: undefined,
          createdAt: '',
          status: 'active'
        }
      ];

      render(
        <Table 
          columns={mockColumns} 
          dataSource={dataWithNulls} 
        />
      );

      // Não deve quebrar, deve renderizar células vazias
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });

    test('handles invalid date gracefully', () => {
      const dataWithInvalidDate = [
        {
          id: 1,
          name: 'Test',
          email: 'test@test.com',
          createdAt: 'invalid-date',
          status: 'active'
        }
      ];

      render(
        <Table 
          columns={mockColumns} 
          dataSource={dataWithInvalidDate} 
        />
      );

      // Deve mostrar o valor original quando data é inválida
      expect(screen.getByText('invalid-date')).toBeInTheDocument();
    });

    test('handles large dataset performance', () => {
      const largeDataset = Array.from({ length: 1000 }, (_, index) => ({
        id: index,
        name: `User ${index}`,
        email: `user${index}@test.com`,
        createdAt: '2024-01-01T00:00:00Z',
        status: 'active'
      }));

      const renderStart = performance.now();
      
      render(
        <Table 
          columns={mockColumns} 
          dataSource={largeDataset} 
        />
      );

      const renderTime = performance.now() - renderStart;
      
      // Render deve ser rápido (menos de 100ms para 1000 itens)
      expect(renderTime).toBeLessThan(100);
      
      // Verificar se primeiros e últimos itens estão presentes
      expect(screen.getByText('User 0')).toBeInTheDocument();
      expect(screen.getByText('User 999')).toBeInTheDocument();
    });
  });

  // ✅ TESTE: Accessibility
  describe('Accessibility', () => {
    test('has proper ARIA roles', () => {
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource} 
        />
      );

      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(4);
      expect(screen.getAllByRole('columnheader')).toHaveLength(5);
    });

    test('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      
      render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource} 
        />
      );

      const table = screen.getByRole('table');
      
      // Focar na tabela
      await user.click(table);
      expect(table).toHaveFocus();

      // TODO: Implementar testes de navegação por setas
      // quando funcionalidade for adicionada
    });
  });

  // ✅ TESTE: Styling
  describe('Styling', () => {
    test('applies custom className', () => {
      const { container } = render(
        <Table 
          columns={mockColumns} 
          dataSource={mockDataSource}
          className="custom-table-class"
        />
      );

      const tableContainer = container.firstChild;
      expect(tableContainer).toHaveClass('custom-table-class');
    });

    test('applies column alignment correctly', () => {
      const columnsWithAlignment: TableColumn[] = [
        { key: 'left', label: 'Left', align: 'left' },
        { key: 'center', label: 'Center', align: 'center' },
        { key: 'right', label: 'Right', align: 'right' }
      ];

      const data = [{ left: 'L', center: 'C', right: 'R' }];

      render(
        <Table 
          columns={columnsWithAlignment} 
          dataSource={data} 
        />
      );

      const headers = screen.getAllByRole('columnheader');
      expect(headers[0]).toHaveClass('text-left');
      expect(headers[1]).toHaveClass('text-center');
      expect(headers[2]).toHaveClass('text-right');
    });
  });

  // ✅ TESTE: Integration
  describe('Integration Tests', () => {
    test('works with complex data structures', () => {
      const complexData = [
        {
          id: 1,
          user: {
            name: 'João',
            profile: { avatar: 'avatar.jpg' }
          },
          metadata: {
            tags: ['admin', 'vip'],
            settings: { theme: 'dark' }
          }
        }
      ];

      const complexColumns: TableColumn[] = [
        {
          key: 'user',
          label: 'Usuário',
          render: (row) => row.user?.name || 'N/A'
        },
        {
          key: 'tags',
          label: 'Tags',
          render: (row) => row.metadata?.tags?.join(', ') || 'None'
        }
      ];

      render(
        <Table 
          columns={complexColumns} 
          dataSource={complexData} 
        />
      );

      expect(screen.getByText('João')).toBeInTheDocument();
      expect(screen.getByText('admin, vip')).toBeInTheDocument();
    });
  });
});

// ✅ TESTE DE SNAPSHOT (Opcional)
describe('Table Snapshots', () => {
  test('matches snapshot for basic table', () => {
    const { container } = render(
      <Table 
        columns={mockColumns.slice(0, 3)} // Apenas primeiras 3 colunas
        dataSource={mockDataSource.slice(0, 2)} // Apenas 2 linhas
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});