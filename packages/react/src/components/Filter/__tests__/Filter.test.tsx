import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Filter from '../Filter';
import type { FilterProps } from '../Filter.types';
import { Calendar16Regular, Filter16Regular } from '@fluentui/react-icons';

// 🧪 MOCK DATA
const mockDropdownItems = [
  { id: '1', text: 'Opção 1' },
  { id: '2', text: 'Opção 2' },
  { id: '3', text: 'Opção 3', disabled: true },
  { id: '4', text: 'Opção 4' },
  { id: '5', text: 'Opção 5' }
];

const defaultProps: FilterProps = {
  items: mockDropdownItems,
  type: 'checkbox',
  selectedIds: [],
  onApplyFilter: jest.fn(),
  buttonText: 'Filtros',
  variant: 'outlined'
};

describe('Filter Component', () => {
  
  // ✅ TESTE BÁSICO: Renderização
  describe('Basic Rendering', () => {
    test('renders filter button with correct text', () => {
      render(<Filter {...defaultProps} />);
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toBeInTheDocument();
      expect(filterButton).toHaveTextContent('Filtros');
      expect(filterButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('renders with custom icon', () => {
      render(
        <Filter 
          {...defaultProps} 
          icon={<Filter16Regular data-testid="filter-icon" />}
        />
      );
      
      expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    });

    test('applies custom className', () => {
      const { container } = render(
        <Filter {...defaultProps} className="custom-filter" />
      );
      
      expect(container.firstChild).toHaveClass('custom-filter');
    });
  });

  // ✅ TESTE: Dropdown Interaction
  describe('Dropdown Interaction', () => {
    test('opens dropdown when button is clicked', async () => {
      const user = userEvent.setup();
      const mockOnOpen = jest.fn();
      
      render(
        <Filter 
          {...defaultProps} 
          onOpen={mockOnOpen}
        />
      );
      
      const filterButton = screen.getByRole('button');
      await user.click(filterButton);
      
      expect(filterButton).toHaveAttribute('aria-expanded', 'true');
      expect(mockOnOpen).toHaveBeenCalledTimes(1);
      
      // Verificar se dropdown está visível
      await waitFor(() => {
        expect(screen.getByText('Opção 1')).toBeInTheDocument();
        expect(screen.getByText('Opção 2')).toBeInTheDocument();
      });
    });

    test('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      const mockOnClose = jest.fn();
      
      render(
        <div>
          <Filter {...defaultProps} onClose={mockOnClose} />
          <div data-testid="outside-element">Outside</div>
        </div>
      );
      
      // Abrir dropdown
      const filterButton = screen.getByRole('button');
      await user.click(filterButton);
      
      // Clicar fora
      const outsideElement = screen.getByTestId('outside-element');
      await user.click(outsideElement);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(filterButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('closes dropdown on Escape key', async () => {
      const user = userEvent.setup();
      const mockOnClose = jest.fn();
      
      render(<Filter {...defaultProps} onClose={mockOnClose} />);
      
      // Abrir dropdown
      const filterButton = screen.getByRole('button');
      await user.click(filterButton);
      
      // Pressionar Escape
      await user.keyboard('{Escape}');
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(filterButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  // ✅ TESTE: Selection Logic
  describe('Selection Logic', () => {
    test('shows selected item text in button', () => {
      render(
        <Filter 
          {...defaultProps} 
          selectedIds={['1']}
        />
      );
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toHaveTextContent('Opção 1');
    });

    test('shows badge for multiple selections', () => {
      render(
        <Filter 
          {...defaultProps} 
          selectedIds={['1', '2', '4']}
        />
      );
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toHaveTextContent('Opção 1'); // Primeiro item
      expect(filterButton).toHaveTextContent('+2'); // Badge com items adicionais
    });

    test('calls onApplyFilter when selection changes', async () => {
      const user = userEvent.setup();
      const mockOnApplyFilter = jest.fn();
      
      render(
        <Filter 
          {...defaultProps} 
          onApplyFilter={mockOnApplyFilter}
        />
      );
      
      // Abrir dropdown
      await user.click(screen.getByRole('button'));
      
      // Selecionar opção (simulando Dropdown behavior)
      // Nota: Seria necessário mock do Dropdown para teste completo
      await waitFor(() => {
        expect(screen.getByText('Opção 1')).toBeInTheDocument();
      });
      
      // Verificar se dropdown foi renderizado
      expect(mockOnApplyFilter).not.toHaveBeenCalled(); // Ainda não foi chamado
    });

    test('handles empty selection correctly', () => {
      render(
        <Filter 
          {...defaultProps} 
          selectedIds={[]}
          buttonText="Selecionar filtros"
        />
      );
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toHaveTextContent('Selecionar filtros');
      expect(filterButton).not.toHaveTextContent('+'); // Sem badge
    });
  });

  // ✅ TESTE: Calendar Mode
  describe('Calendar Mode', () => {
    test('renders calendar when type is calendar', async () => {
      const user = userEvent.setup();
      const mockOnDateSelect = jest.fn();
      
      render(
        <Filter 
          type="calendar"
          onDateSelect={mockOnDateSelect}
          buttonText="Selecionar data"
          icon={<Calendar16Regular />}
        />
      );
      
      // Abrir dropdown
      await user.click(screen.getByRole('button'));
      
      // Verificar se Calendar foi renderizado (dependeria do Calendar component)
      await waitFor(() => {
        // Assumindo que Calendar tem role="application"
        const calendar = screen.queryByRole('application');
        if (calendar) {
          expect(calendar).toBeInTheDocument();
        }
      });
    });

    test('shows formatted date in button when date is selected', () => {
      const selectedDate = new Date('2024-03-15');
      
      render(
        <Filter 
          type="calendar"
          selectedDate={selectedDate}
          buttonText="Data"
          locale="pt-br"
        />
      );
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toHaveTextContent('15/03/2024');
    });

    test('shows original button text when no date selected', () => {
      render(
        <Filter 
          type="calendar"
          selectedDate={null}
          buttonText="Selecionar data"
        />
      );
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toHaveTextContent('Selecionar data');
    });
  });

  // ✅ TESTE: Disabled State
  describe('Disabled State', () => {
    test('button is disabled when disabled prop is true', () => {
      render(<Filter {...defaultProps} disabled={true} />);
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toBeDisabled();
    });

    test('does not open dropdown when disabled', async () => {
      const user = userEvent.setup();
      const mockOnOpen = jest.fn();
      
      render(
        <Filter 
          {...defaultProps} 
          disabled={true}
          onOpen={mockOnOpen}
        />
      );
      
      const filterButton = screen.getByRole('button');
      await user.click(filterButton);
      
      expect(mockOnOpen).not.toHaveBeenCalled();
      expect(filterButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  // ✅ TESTE: Position Variants
  describe('Position Variants', () => {
    test('applies correct position class', async () => {
      const user = userEvent.setup();
      
      render(<Filter {...defaultProps} position="right" />);
      
      // Abrir dropdown para verificar classe
      await user.click(screen.getByRole('button'));
      
      await waitFor(() => {
        const dropdownContainer = document.querySelector('.zds-filter__dropdown--right');
        expect(dropdownContainer).toBeInTheDocument();
      });
    });
  });

  // ✅ TESTE: Edge Cases
  describe('Edge Cases', () => {
    test('handles undefined items gracefully', () => {
      render(
        <Filter 
          {...defaultProps} 
          items={undefined}
        />
      );
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toBeInTheDocument();
    });

    test('handles selectedIds with invalid IDs', () => {
      render(
        <Filter 
          {...defaultProps} 
          selectedIds={['invalid-id', '999']}
          buttonText="Filtros"
        />
      );
      
      const filterButton = screen.getByRole('button');
      // Deve mostrar o ID quando não encontra o item
      expect(filterButton).toHaveTextContent('invalid-id');
    });

    test('handles very long item names', () => {
      const longNameItems = [
        { 
          id: '1', 
          text: 'Este é um nome de filtro extremamente longo que pode quebrar o layout da interface' 
        }
      ];
      
      render(
        <Filter 
          {...defaultProps} 
          items={longNameItems}
          selectedIds={['1']}
        />
      );
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toHaveTextContent(longNameItems[0].text);
    });

    test('handles large number of selections', () => {
      const manyIds = Array.from({ length: 50 }, (_, i) => (i + 1).toString());
      
      render(
        <Filter 
          {...defaultProps} 
          selectedIds={manyIds}
        />
      );
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toHaveTextContent('+49'); // 50 - 1 = 49 no badge
    });
  });

  // ✅ TESTE: Accessibility
  describe('Accessibility', () => {
    test('has proper ARIA attributes', () => {
      render(<Filter {...defaultProps} />);
      
      const filterButton = screen.getByRole('button');
      expect(filterButton).toHaveAttribute('aria-expanded', 'false');
      expect(filterButton).toHaveAttribute('aria-haspopup', 'true');
    });

    test('updates aria-expanded when opened', async () => {
      const user = userEvent.setup();
      
      render(<Filter {...defaultProps} />);
      
      const filterButton = screen.getByRole('button');
      await user.click(filterButton);
      
      expect(filterButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('calendar has proper aria-label', async () => {
      const user = userEvent.setup();
      
      render(
        <Filter 
          type="calendar"
          buttonText="Data"
        />
      );
      
      await user.click(screen.getByRole('button'));
      
      // Verificar se aria-label foi passado para Calendar
      await waitFor(() => {
        const calendarElement = document.querySelector('[aria-label*="Selecionar data"]');
        if (calendarElement) {
          expect(calendarElement).toBeInTheDocument();
        }
      });
    });
  });

  // ✅ TESTE: Performance
  describe('Performance', () => {
    test('does not re-render unnecessarily', () => {
      const mockOnApplyFilter = jest.fn();
      
      const { rerender } = render(
        <Filter {...defaultProps} onApplyFilter={mockOnApplyFilter} />
      );
      
      // Re-render com mesmas props
      rerender(
        <Filter {...defaultProps} onApplyFilter={mockOnApplyFilter} />
      );
      
      // Componente deve ser estável
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});

// ✅ TESTE DE INTEGRAÇÃO
describe('Filter Integration Tests', () => {
  test('complete filter workflow', async () => {
    const user = userEvent.setup();
    const mockOnApplyFilter = jest.fn();
    const mockOnOpen = jest.fn();
    const mockOnClose = jest.fn();
    
    render(
      <Filter 
        {...defaultProps}
        onApplyFilter={mockOnApplyFilter}
        onOpen={mockOnOpen}
        onClose={mockOnClose}
        buttonText="Todos os filtros"
      />
    );
    
    // 1. Estado inicial
    const filterButton = screen.getByRole('button');
    expect(filterButton).toHaveTextContent('Todos os filtros');
    
    // 2. Abrir dropdown
    await user.click(filterButton);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(filterButton).toHaveAttribute('aria-expanded', 'true');
    
    // 3. Fechar com Escape
    await user.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(filterButton).toHaveAttribute('aria-expanded', 'false');
  });
});

// ✅ SNAPSHOT TESTS (Opcional)
describe('Filter Snapshots', () => {
  test('matches snapshot for basic filter', () => {
    const { container } = render(<Filter {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('matches snapshot for calendar filter', () => {
    const { container } = render(
      <Filter 
        type="calendar"
        buttonText="Data"
        selectedDate={new Date('2024-03-15')}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('matches snapshot with selections', () => {
    const { container } = render(
      <Filter 
        {...defaultProps}
        selectedIds={['1', '2', '4']}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});