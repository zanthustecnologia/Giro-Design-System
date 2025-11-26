import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from '../Dropdown';
import type { DropdownItem, DropdownType } from '../Dropdown.types';

// Mock do Search component
jest.mock('../../Search/Search', () => {
  return function MockSearch({ 
    value, 
    onChange, 
    onKeyDown, 
    onFocus, 
    onBlur, 
    onClear, 
    placeholder,
    ...props 
  }: any) {
    return (
      <input
        data-testid="search-input"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        {...props}
      />
    );
  };
});

// Mock do Checkbox component
jest.mock('../../Checkbox/Checkbox', () => {
  return function MockCheckbox({ checked, onChange, disabled, label, ...props }: any) {
    return (
      <input
        type="checkbox"
        data-testid="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={label}
        {...props}
      />
    );
  };
});

// Mock do DropdownUtils
jest.mock('../DropdownUtils', () => ({
  validateItems: jest.fn((items) => items || [])
}));

describe('Dropdown Component', () => {
  const mockItems: DropdownItem[] = [
    { id: '1', text: 'Item 1', subText: 'Subtexto 1' },
    { id: '2', text: 'Item 2', subText: 'Subtexto 2', disabled: true },
    { id: '3', text: 'Item 3', subText: 'Subtexto 3' },
    { text: 'Item sem ID' }
  ];

  const iconMockItem: DropdownItem = {
    id: 'icon-item',
    text: 'Item com ícone',
    icon: <span data-testid="mock-icon">🔍</span>
  };

  const defaultProps = {
    items: mockItems,
    onSelectionChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    it('deve renderizar o dropdown com itens', () => {
      render(<Dropdown {...defaultProps} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('deve renderizar com className customizada', () => {
      render(<Dropdown {...defaultProps} className="custom-dropdown" />);

      const dropdown = screen.getByRole('combobox');
      expect(dropdown).toHaveClass('zds-dropdown__container', 'custom-dropdown');
    });

    it('deve renderizar com ID customizado', () => {
      render(<Dropdown {...defaultProps} id="dropdown-test" />);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('id', 'dropdown-test');
    });

    it('deve renderizar lista vazia quando não há itens', () => {
      render(<Dropdown items={[]} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
  });

  describe('Tipos de Dropdown', () => {
    it('deve renderizar dropdown tipo text por padrão', () => {
      render(<Dropdown {...defaultProps} />);

      const items = screen.getAllByRole('option');
      expect(items[0]).toHaveClass('zds-dropdown__item--text');
    });

    it('deve renderizar dropdown tipo checkbox', () => {
      render(<Dropdown {...defaultProps} type="checkbox" />);

      const items = screen.getAllByRole('option');
      expect(items[0]).toHaveClass('zds-dropdown__item--checkbox');
      
      const checkboxes = screen.getAllByTestId('checkbox');
      expect(checkboxes).toHaveLength(mockItems.length);
    });

    it('deve renderizar dropdown tipo icon', () => {
      const itemsWithIcon = [iconMockItem, ...mockItems];
      render(<Dropdown items={itemsWithIcon} type="icon" />);

      const items = screen.getAllByRole('option');
      expect(items[0]).toHaveClass('zds-dropdown__item--icon');
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter atributos ARIA corretos no container', () => {
      render(<Dropdown {...defaultProps} id="test-dropdown" />);

      const combobox = screen.getByRole('combobox');
      expect(combobox).toHaveAttribute('aria-expanded', 'true');
      expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
      expect(combobox).toHaveAttribute('aria-owns', 'test-dropdown');
      expect(combobox).toHaveAttribute('aria-label', 'Dropdown de seleção');
      expect(combobox).toHaveAttribute('tabIndex', '0');
    });

    it('deve ter atributos ARIA corretos na listbox', () => {
      render(<Dropdown {...defaultProps} type="checkbox" />);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('aria-label', 'Lista de opções');
      expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('deve ter atributos ARIA corretos nos itens', () => {
      render(<Dropdown {...defaultProps} showSubText />);

      const items = screen.getAllByRole('option');
      expect(items[0]).toHaveAttribute('aria-selected', 'false');
      expect(items[0]).toHaveAttribute('aria-labelledby', 'dropdown-item-1-label');
      expect(items[0]).toHaveAttribute('aria-describedby', 'dropdown-item-1-desc');
    });

    it('deve marcar item disabled corretamente', () => {
      render(<Dropdown {...defaultProps} />);

      const items = screen.getAllByRole('option');
      expect(items[1]).toHaveClass('zds-dropdown__item--disabled');
    });
  });

  describe('Campo de Busca', () => {
    it('deve mostrar campo de busca quando applySearch é true', () => {
      render(<Dropdown {...defaultProps} applySearch />);

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('deve mostrar campo de busca quando há mais de 4 itens', () => {
      const manyItems = Array.from({ length: 6 }, (_, i) => ({
        id: `item-${i}`,
        text: `Item ${i}`
      }));

      render(<Dropdown items={manyItems} />);

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('não deve mostrar campo de busca por padrão com poucos itens', () => {
      render(<Dropdown items={mockItems.slice(0, 3)} />);

      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('deve usar placeholder customizado', () => {
      render(<Dropdown {...defaultProps} applySearch placeholder="Buscar itens..." />);

      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toHaveAttribute('placeholder', 'Buscar itens...');
    });

    it('deve usar placeholder padrão quando não fornecido', () => {
      render(<Dropdown {...defaultProps} applySearch />);

      const searchInput = screen.getByTestId('search-input');
      expect(searchInput).toHaveAttribute('placeholder', 'Digite e pressione Enter para buscar...');
    });
  });

  describe('Interações de Seleção', () => {
    it('deve permitir múltipla seleção com checkbox', async () => {
      const onSelectionChange = jest.fn();
      const user = userEvent.setup();

      render(<Dropdown {...defaultProps} type="checkbox" onSelectionChange={onSelectionChange} />);

      const firstCheckbox = screen.getAllByTestId('checkbox')[0];
      const thirdCheckbox = screen.getAllByTestId('checkbox')[2];

      await user.click(firstCheckbox);
      expect(onSelectionChange).toHaveBeenCalledWith(['1']);

      await user.click(thirdCheckbox);
      expect(onSelectionChange).toHaveBeenCalledWith(['1', '3']);
    });


    it('não deve selecionar item disabled', async () => {
      const onSelectionChange = jest.fn();
      const user = userEvent.setup();

      render(<Dropdown {...defaultProps} onSelectionChange={onSelectionChange} />);

      const disabledItem = screen.getAllByRole('option')[1]; // Item 2 está disabled
      await user.click(disabledItem);

      expect(onSelectionChange).not.toHaveBeenCalled();
      expect(disabledItem).not.toHaveClass('zds-dropdown__item--selected');
    });
  });

  describe('Navegação por Teclado', () => {
    it('deve navegar com setas para baixo e cima', () => {
      render(<Dropdown {...defaultProps} />);

      const dropdown = screen.getByRole('combobox');
      const items = screen.getAllByRole('option');

      // Foco inicial
      fireEvent.keyDown(dropdown, { key: 'ArrowDown' });
      expect(items[0]).toHaveClass('zds-dropdown__item--focused');

      // Próximo item
      fireEvent.keyDown(dropdown, { key: 'ArrowDown' });
      expect(items[1]).toHaveClass('zds-dropdown__item--focused');

      // Item anterior
      fireEvent.keyDown(dropdown, { key: 'ArrowUp' });
      expect(items[0]).toHaveClass('zds-dropdown__item--focused');
    });

    it('deve circular na navegação por teclado', () => {
      render(<Dropdown {...defaultProps} />);

      const dropdown = screen.getByRole('combobox');
      const items = screen.getAllByRole('option');

      // Vai para o último item quando está no primeiro
      fireEvent.keyDown(dropdown, { key: 'ArrowUp' });
      expect(items[items.length - 1]).toHaveClass('zds-dropdown__item--focused');

      // Vai para o primeiro item quando está no último
      fireEvent.keyDown(dropdown, { key: 'ArrowDown' });
      expect(items[0]).toHaveClass('zds-dropdown__item--focused');
    });

    it('deve selecionar item ao pressionar Enter', () => {
      const onSelectionChange = jest.fn();
      render(<Dropdown {...defaultProps} onSelectionChange={onSelectionChange} />);

      const dropdown = screen.getByRole('combobox');

      // Navegar para o primeiro item
      fireEvent.keyDown(dropdown, { key: 'ArrowDown' });
      
      // Selecionar com Enter
      fireEvent.keyDown(dropdown, { key: 'Enter' });

      expect(onSelectionChange).toHaveBeenCalledWith(['1']);
    });

    it('deve limpar seleção ao pressionar Escape', () => {
      render(<Dropdown {...defaultProps} applySearch />);

      const dropdown = screen.getByRole('combobox');

      // Navegar para um item
      fireEvent.keyDown(dropdown, { key: 'ArrowDown' });
      
      // Limpar com Escape
      fireEvent.keyDown(dropdown, { key: 'Escape' });

      const items = screen.getAllByRole('option');
      expect(items.every(item => !item.classList.contains('zds-dropdown__item--focused'))).toBe(true);
    });
  });

  describe('Busca e Filtragem', () => {
    it('deve filtrar itens baseado na busca', async () => {
      const user = userEvent.setup();
      render(<Dropdown {...defaultProps} applySearch />);

      const searchInput = screen.getByTestId('search-input');

      // Simular entrada de texto
      await user.type(searchInput, 'Item 1');
      
      // Simular Enter para executar busca
      fireEvent.keyDown(searchInput, { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
      });
    });

    it('deve mostrar mensagem quando não há resultados', async () => {
      const user = userEvent.setup();
      render(<Dropdown {...defaultProps} applySearch />);

      const searchInput = screen.getByTestId('search-input');

      await user.type(searchInput, 'Item inexistente');
      fireEvent.keyDown(searchInput, { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Nenhum item corresponde à sua busca')).toBeInTheDocument();
      });
    });

    it('deve limpar busca ao pressionar Escape no campo de busca', async () => {
      const user = userEvent.setup();
      render(<Dropdown {...defaultProps} applySearch />);

      const searchInput = screen.getByTestId('search-input');

      await user.type(searchInput, 'busca');
      fireEvent.keyDown(searchInput, { key: 'Escape' });

      expect(searchInput).toHaveValue('');
    });

    it('deve buscar no subtexto também', async () => {
      const user = userEvent.setup();
      render(<Dropdown {...defaultProps} applySearch showSubText />);

      const searchInput = screen.getByTestId('search-input');

      await user.type(searchInput, 'Subtexto 1');
      fireEvent.keyDown(searchInput, { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
      });
    });
  });

  describe('Exibição de SubTexto', () => {
    it('deve mostrar subtexto quando showSubText é true', () => {
      render(<Dropdown {...defaultProps} showSubText />);

      expect(screen.getByText('Subtexto 1')).toBeInTheDocument();
      expect(screen.getByText('Subtexto 2')).toBeInTheDocument();
      expect(screen.getByText('Subtexto 3')).toBeInTheDocument();
    });

    it('não deve mostrar subtexto quando showSubText é false', () => {
      render(<Dropdown {...defaultProps} showSubText={false} />);

      expect(screen.queryByText('Subtexto 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Subtexto 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Subtexto 3')).not.toBeInTheDocument();
    });
  });

  describe('Geração de IDs', () => {
    it('deve usar ID do item quando fornecido', () => {
      render(<Dropdown {...defaultProps} showSubText />);

      expect(screen.getByText('Item 1')).toHaveAttribute('id', 'dropdown-item-1-label');
    });

    it('deve gerar ID automático quando não fornecido', () => {
      render(<Dropdown {...defaultProps} showSubText />);

      // Item sem ID deve ter ID gerado automaticamente
      const itemSemId = screen.getByText('Item sem ID');
      expect(itemSemId).toHaveAttribute('id');
      expect(itemSemId.id).toMatch(/dropdown-item-.+-label/);
    });
  });

  describe('Estados e Casos Extremos', () => {
    it('deve funcionar sem callback onSelectionChange', async () => {
      const user = userEvent.setup();
      render(<Dropdown items={mockItems} />);

      const firstItem = screen.getAllByRole('option')[0];
      
      // Não deve gerar erro ao clicar sem callback
      await user.click(firstItem);
      expect(firstItem).toHaveClass('zds-dropdown__item--selected');
    });

    it('deve lidar com items vazios', () => {
      render(<Dropdown items={[]} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('deve atualizar itens quando props mudam', () => {
      const { rerender } = render(<Dropdown items={mockItems.slice(0, 2)} />);

      expect(screen.getAllByRole('option')).toHaveLength(2);

      rerender(<Dropdown items={mockItems} />);

      expect(screen.getAllByRole('option')).toHaveLength(4);
    });

    it('deve manter foco no campo de busca durante navegação', () => {
      render(<Dropdown {...defaultProps} applySearch />);

      const dropdown = screen.getByRole('combobox');
      const searchInput = screen.getByTestId('search-input');

      // Simular foco no campo de busca
      fireEvent.focus(searchInput);

      // Tentar navegar com teclado não deve funcionar quando busca está focada
      fireEvent.keyDown(dropdown, { key: 'ArrowDown' });

      const items = screen.getAllByRole('option');
      expect(items.every(item => !item.classList.contains('zds-dropdown__item--focused'))).toBe(true);
    });
  });
});