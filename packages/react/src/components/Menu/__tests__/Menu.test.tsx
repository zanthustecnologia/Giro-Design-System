import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../Menu';
import { MenuItemProps } from '../Menu.types';

// Mock dos ícones do Fluent UI
vi.mock('@fluentui/react-icons', () => ({
  ChevronRight16Filled: () => <span data-testid="chevron-icon">→</span>,
}));

// Mock do componente Search
vi.mock('../../Search', () => ({
  default: ({ placeholder, onChange, value, onKeyDown }: any) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  ),
}));

describe('Menu', () => {
  const mockItems: MenuItemProps[] = [
    { id: '1', text: 'Item 1', value: 'item-1' },
    { id: '2', text: 'Item 2', value: 'item-2', subText: 'Subtexto 2'},
    { id: '3', text: 'Item 3', value: 'item-3', disabled: true },
  ];

  const mockItemsWithIcon: MenuItemProps[] = [
    { id: '1', text: 'Item 1', value: 'item-1', icon: <span>🏠</span>},
    { id: '2', text: 'Item 2', value: 'item-2', icon: <span>⚙️</span>},
  ];

  const mockItemsWithChildren: MenuItemProps[] = [
    {
      id: '1',
      text: 'Parent 1',
      value: 'parent-1',
      children: [
        { id: '1-1', text: 'Child 1-1', value: 'child-1-1' },
        { id: '1-2', text: 'Child 1-2', value: 'child-1-2' },
      ],
    },
    { id: '2', text: 'Item 2', value: 'item-2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    it('renderiza o trigger corretamente', () => {
      render(
        <Menu items={mockItems}>
          <button>Abrir Menu</button>
        </Menu>
      );

      expect(screen.getByText('Abrir Menu')).toBeInTheDocument();
    });

    it('não renderiza o conteúdo do menu quando está fechado', () => {
      render(
        <Menu items={mockItems}>
          <button>Abrir Menu</button>
        </Menu>
      );

      expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('renderiza os itens do menu ao abrir', async () => {
      const user = userEvent.setup();
      render(
        <Menu items={mockItems}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
      });
    });

    it('renderiza subtexto quando habilitado', async () => {
      const user = userEvent.setup();
      render(
        <Menu items={mockItems}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByText('Subtexto 2')).toBeInTheDocument();
      });
    });

    it('renderiza ícones quando habilitados', async () => {
      const user = userEvent.setup();
      render(
        <Menu items={mockItemsWithIcon}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByText('🏠')).toBeInTheDocument();
        expect(screen.getByText('⚙️')).toBeInTheDocument();
      });
    });
  });

  describe('Funcionalidade de Busca', () => {
    it('renderiza campo de busca quando search=true', async () => {
      const user = userEvent.setup();
      render(
        <Menu items={mockItems} search>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByTestId('search-input')).toBeInTheDocument();
      });
    });

    it('não renderiza campo de busca quando search=false', async () => {
      const user = userEvent.setup();
      render(
        <Menu items={mockItems}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
      });
    });

    it('filtra itens ao buscar', async () => {
      const user = userEvent.setup();
      render(
        <Menu items={mockItems} search>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      const searchInput = await screen.findByTestId('search-input');
      await user.type(searchInput, 'Item 1');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
      });
    });

    it('mostra mensagem quando não há resultados', async () => {
      const user = userEvent.setup();
      render(
        <Menu items={mockItems} search>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      const searchInput = await screen.findByTestId('search-input');
      await user.type(searchInput, 'Item inexistente');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
      });
    });

    it('limpa o termo de busca quando o input é esvaziado', async () => {
      const user = userEvent.setup();
      render(
        <Menu items={mockItems} search>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      const searchInput = await screen.findByTestId('search-input');
      await user.type(searchInput, 'Item 1');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
      });

      // Limpa o campo de busca
      await user.clear(searchInput);
      fireEvent.change(searchInput, { target: { value: '' } });

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
      });
    });
  });

  describe('Seleção de Itens', () => {
    it('chama onItemSelect ao clicar em um item', async () => {
      const onItemSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Menu items={mockItems} onItemSelect={onItemSelect}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));
      
      const item1 = await screen.findByText('Item 1');
      await user.click(item1);

      expect(onItemSelect).toHaveBeenCalledWith(mockItems[0]);
    });

    it('renderiza item desabilitado com atributo correto', async () => {
      const onItemSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Menu items={mockItems} onItemSelect={onItemSelect}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));
      
      const item3 = await screen.findByText('Item 3');
      const menuItem = item3.closest('div[role="menuitem"]');
      
      expect(menuItem).toHaveAttribute('aria-disabled', 'true');
      expect(menuItem).toHaveAttribute('data-disabled');
    });

    it('marca itens selecionados corretamente', async () => {
      const user = userEvent.setup();
      const selectedItems = [mockItems[0]];

      render(
        <Menu items={mockItems} selectedItems={selectedItems}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        const item1 = screen.getByText('Item 1').closest('div[role="menuitem"]');
        expect(item1).toHaveAttribute('data-selected', 'true');
      });
    });

    it('fecha o menu após selecionar um item', async () => {
      const onItemSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Menu items={mockItems} onItemSelect={onItemSelect}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));
      
      const item1 = await screen.findByText('Item 1');
      await user.click(item1);

      await waitFor(() => {
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
      });
    });
  });

  describe('Menu com Subitens', () => {
    it('renderiza itens com children como submenu', async () => {
      const user = userEvent.setup();
      
      render(
        <Menu items={mockItemsWithChildren}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByText('Parent 1')).toBeInTheDocument();
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
      });
    });

    it('renderiza submenu com ícone e subtexto', async () => {
      const itemsWithSubMenu: MenuItemProps[] = [
        {
          id: '1',
          text: 'Parent com detalhes',
          value: 'parent',
          icon: <span>📁</span>,
          subText: 'Subtexto do parent',
          children: [
            { id: '1-1', text: 'Child 1', value: 'child-1' },
          ],
        },
      ];
      const user = userEvent.setup();
      
      render(
        <Menu items={itemsWithSubMenu}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByText('Parent com detalhes')).toBeInTheDocument();
        expect(screen.getByText('Subtexto do parent')).toBeInTheDocument();
        expect(screen.getByText('📁')).toBeInTheDocument();
      });
    });

    it('renderiza submenu desabilitado', async () => {
      const itemsWithDisabledSubMenu: MenuItemProps[] = [
        {
          id: '1',
          text: 'Parent desabilitado',
          value: 'parent-disabled',
          disabled: true,
          children: [
            { id: '1-1', text: 'Child 1', value: 'child-1' },
          ],
        },
      ];
      const user = userEvent.setup();
      
      render(
        <Menu items={itemsWithDisabledSubMenu}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        const parentItem = screen.getByText('Parent desabilitado').closest('[role="menuitem"]');
        expect(parentItem).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  describe('Callbacks e Eventos', () => {
    it('chama onOpenChange quando o menu abre', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Menu items={mockItems} onOpenChange={onOpenChange}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(true);
      });
    });

    it('chama onOpenChange quando o menu fecha', async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Menu items={mockItems} onOpenChange={onOpenChange}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));
      
      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      // Fecha o menu usando a tecla Escape
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Infinite Scroll', () => {
    it('renderiza sentinel quando enableInfiniteScroll=true', async () => {
      const onScrollEnd = vi.fn();
      const user = userEvent.setup();

      render(
        <Menu 
          items={mockItems} 
          enableInfiniteScroll 
          onScrollEnd={onScrollEnd}
        >
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        const sentinel = document.querySelector('[data-scroll-sentinel]');
        expect(sentinel).toBeInTheDocument();
      });
    });

    it('mostra indicador de loading quando isLoadingMore=true', async () => {
      const user = userEvent.setup();

      render(
        <Menu 
          items={mockItems} 
          enableInfiniteScroll 
          isLoadingMore
          onScrollEnd={vi.fn()}
        >
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByText('Carregando mais itens...')).toBeInTheDocument();
      });
    });
  });

  describe('API Search', () => {
    it('chama onApiSearch com termo de busca ao pressionar Enter', async () => {
      const onApiSearch = vi.fn();
      const user = userEvent.setup();

      render(
        <Menu 
          items={mockItems} 
          search 
          enableApiSearch
          onApiSearch={onApiSearch}
        >
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      const searchInput = await screen.findByTestId('search-input');
      await user.type(searchInput, 'teste');
      fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

      await waitFor(() => {
        expect(onApiSearch).toHaveBeenCalled();
      }, { timeout: 3000 });
    });
  });

  describe('Propriedades de Estilo e Layout', () => {
    it('aplica className customizada', async () => {
      const user = userEvent.setup();

      render(
        <Menu items={mockItems} className="custom-menu">
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        const content = document.querySelector('.custom-menu');
        expect(content).toBeInTheDocument();
      });
    });

    it('aplica maxHeight como número', async () => {
      const user = userEvent.setup();

      render(
        <Menu items={mockItems} maxHeight={300}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        const wrapper = document.querySelector('[style*="max-height"]');
        expect(wrapper).toHaveStyle({ maxHeight: '300px' });
      });
    });

    it('aplica maxHeight como string', async () => {
      const user = userEvent.setup();

      render(
        <Menu items={mockItems} maxHeight="50vh">
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        const wrapper = document.querySelector('[style*="max-height"]');
        expect(wrapper).toHaveStyle({ maxHeight: '50vh' });
      });
    });
  });

  describe('Casos Extremos', () => {
    it('renderiza corretamente com lista vazia', async () => {
      const user = userEvent.setup();

      render(
        <Menu items={[]}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByText('Nenhum item encontrado')).toBeInTheDocument();
      });
    });

    it('lida com itens sem value ou id', async () => {
      const itemsWithoutId = [{ text: 'Item sem ID' }];
      const user = userEvent.setup();

      render(
        <Menu items={itemsWithoutId}>
          <button>Abrir Menu</button>
        </Menu>
      );

      await user.click(screen.getByText('Abrir Menu'));

      await waitFor(() => {
        expect(screen.getByText('Item sem ID')).toBeInTheDocument();
      });
    });

    it('lida com múltiplas aberturas e fechamentos', async () => {
      const user = userEvent.setup();

      render(
        <Menu items={mockItems}>
          <button>Abrir Menu</button>
        </Menu>
      );

      // Abre e fecha 3 vezes
      for (let i = 0; i < 3; i++) {
        await user.click(screen.getByText('Abrir Menu'));
        
        await waitFor(() => {
          expect(screen.getByText('Item 1')).toBeInTheDocument();
        });

        await user.keyboard('{Escape}');
        
        await waitFor(() => {
          expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
        });
      }
    });
  });
});
