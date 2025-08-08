import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Menu, { MenuItem, MenuProps } from '../Menu';
import Button from '../../Button/Button';
import { Edit16Regular, Delete16Regular, Settings16Regular } from '@fluentui/react-icons';

describe('Menu Component - Testes Reais', () => {
  const user = userEvent.setup();
  
  const mockItems: MenuItem[] = [
    { 
      id: 'edit', 
      text: 'Editar usuário',
      value: 'edit',
      icon: <Edit16Regular />
    },
    { 
      id: 'delete', 
      text: 'Excluir usuário', 
      value: 'delete',
      icon: <Delete16Regular />
    },
    { 
      id: 'view', 
      text: 'Visualizar detalhes', 
      value: 'view',
      subText: 'Ver informações completas'
    },
  ];

  const defaultProps: MenuProps = {
    menuItems: mockItems,
  };

  const renderMenu = (props: Partial<MenuProps> = {}) => {
    return render(<Menu {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    // Limpar qualquer estado global entre testes
    document.body.innerHTML = '';
  });

  describe('Renderização Básica', () => {
    test('deve renderizar o componente', () => {
      renderMenu();
      
      // Procurar por um botão genérico (padrão do Menu)
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'menu');
    });

    test('deve aplicar className customizada', () => {
      renderMenu({ className: 'custom-menu' });
      
      const container = document.querySelector('.menu-container');
      expect(container).toHaveClass('custom-menu');
    });

    test('deve aplicar ID customizado', () => {
      renderMenu({ id: 'menu-test' });
      
      const menuContainer = document.querySelector('#menu-test');
      expect(menuContainer).toBeInTheDocument();
    });
  });

  describe('Interação com Menu', () => {
    test('deve abrir dropdown ao clicar no botão', async () => {
      renderMenu();
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Verificar se dropdown está visível
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      // Verificar se os itens estão visíveis
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
        expect(screen.getByText('Excluir usuário')).toBeInTheDocument();
        expect(screen.getByText('Visualizar detalhes')).toBeInTheDocument();
      });
    });

    test('deve fechar dropdown ao clicar novamente no botão', async () => {
      renderMenu();
      
      const button = screen.getByRole('button');
      
      // Abrir
      await user.click(button);
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
      });
      
      // Fechar
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      await waitFor(() => {
        expect(screen.queryByText('Editar usuário')).not.toBeInTheDocument();
      });
    });

    test('deve alternar menu múltiplas vezes', async () => {
      renderMenu();
      
      const button = screen.getByRole('button');
      
      // Ciclo: fechado -> aberto -> fechado -> aberto
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Callbacks', () => {
    test('deve chamar onMenuItemClick quando item é selecionado', async () => {
      const onMenuItemClick = jest.fn();
      renderMenu({ onMenuItemClick });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
      });
      
      const editItem = screen.getByText('Editar usuário');
      await user.click(editItem);
      
      expect(onMenuItemClick).toHaveBeenCalledWith(mockItems[0]);
    });

    test('deve chamar onToggle ao abrir/fechar menu', async () => {
      const onToggle = jest.fn();
      renderMenu({ onToggle });
      
      const button = screen.getByRole('button');
      
      // Abrir
      await user.click(button);
      expect(onToggle).toHaveBeenCalledWith(true);
      
      // Fechar
      await user.click(button);
      expect(onToggle).toHaveBeenCalledWith(false);
      
      expect(onToggle).toHaveBeenCalledTimes(2);
    });

    test('não deve quebrar sem callbacks fornecidos', async () => {
      renderMenu(); // Sem callbacks
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
      });
      
      const editItem = screen.getByText('Editar usuário');
      await user.click(editItem);
      
      // Não deve gerar erro
      expect(true).toBe(true);
    });
  });

  describe('Children Customizado', () => {
    test('deve renderizar children customizado como âncora', () => {
      const customButton = (
        <Button variant="outlined">
          Ações Personalizadas
        </Button>
      );
      
      renderMenu({ children: customButton });
      
      expect(screen.getByText('Ações Personalizadas')).toBeInTheDocument();
      
      // Não deve mostrar o botão padrão
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(1);
    });

    test('deve funcionar clique no children customizado', async () => {
      const onToggle = jest.fn();
      const customButton = (
        <Button variant="filled" icon={<Settings16Regular />}>
          Menu Customizado
        </Button>
      );
      
      renderMenu({ children: customButton, onToggle });
      
      const button = screen.getByText('Menu Customizado');
      await user.click(button);
      
      expect(onToggle).toHaveBeenCalledWith(true);
      
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
      });
    });
  });

  describe('Tipos de Menu', () => {
    test('deve renderizar menu tipo text por padrão', async () => {
      renderMenu({ type: 'text' });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
      });
      
      // No tipo text, deve fechar após seleção
      const editItem = screen.getByText('Editar usuário');
      await user.click(editItem);
      
      await waitFor(() => {
        expect(screen.queryByText('Editar usuário')).not.toBeInTheDocument();
      });
    });

    test('deve renderizar menu tipo checkbox', async () => {
      const checkboxItems: MenuItem[] = [
        { id: 'option1', text: 'Opção 1', value: 'opt1' },
        { id: 'option2', text: 'Opção 2', value: 'opt2' },
      ];
      
      renderMenu({ 
        type: 'checkbox',
        menuItems: checkboxItems 
      });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Opção 1')).toBeInTheDocument();
        expect(screen.getByText('Opção 2')).toBeInTheDocument();
      });
    });

    test('deve renderizar menu tipo icon com ícones', async () => {
      renderMenu({ 
        type: 'icon',
        showIcons: true 
      });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
        expect(screen.getByText('Excluir usuário')).toBeInTheDocument();
      });
    });
  });

  describe('Funcionalidades do Dropdown', () => {
    test('deve mostrar campo de busca quando applySearch é true', async () => {
      renderMenu({ applySearch: true });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        const searchInput = screen.getByRole('textbox');
        expect(searchInput).toBeInTheDocument();
      });
    });

    test('deve aplicar placeholder customizado', async () => {
      renderMenu({ 
        applySearch: true,
        placeholder: 'Buscar ações...' 
      });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        const searchInput = screen.getByPlaceholderText('Buscar ações...');
        expect(searchInput).toBeInTheDocument();
      });
    });

    test('deve mostrar subtexto quando showSubText é true', async () => {
      renderMenu({ showSubText: true });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Ver informações completas')).toBeInTheDocument();
      });
    });

    test('deve mostrar ícones quando showIcons é true', async () => {
      renderMenu({ showIcons: true });
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        // Verificar se os itens estão presentes (os ícones estão dentro)
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
        expect(screen.getByText('Excluir usuário')).toBeInTheDocument();
      });
    });
  });

  describe('Eventos de Teclado', () => {
    test('deve fechar menu ao pressionar Escape', async () => {
      renderMenu();
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
      });
      
      await user.keyboard('{Escape}');
      
      await waitFor(() => {
        expect(screen.queryByText('Editar usuário')).not.toBeInTheDocument();
      });
    });

    test('não deve reagir ao Escape quando menu está fechado', async () => {
      const onToggle = jest.fn();
      renderMenu({ onToggle });
      
      // Menu fechado, pressionar Escape
      await user.keyboard('{Escape}');
      
      // Não deve chamar onToggle
      expect(onToggle).not.toHaveBeenCalled();
    });
  });

  describe('Clique Fora do Menu', () => {
    test('deve fechar menu ao clicar fora', async () => {
      renderMenu();
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Editar usuário')).toBeInTheDocument();
      });
      
      // Clicar fora
      await user.click(document.body);
      
      await waitFor(() => {
        expect(screen.queryByText('Editar usuário')).not.toBeInTheDocument();
      });
    });
  });

  describe('Casos Extremos', () => {
    test('deve lidar com array de itens vazio', () => {
      renderMenu({ menuItems: [] });
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      // Não deve quebrar ao clicar
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    test('deve lidar com menuItems undefined', () => {
      renderMenu({ menuItems: undefined });
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      // Deve usar itens padrão
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    test('deve renderizar sem quebrar com props mínimas', () => {
      render(<Menu />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    test('deve ter atributos ARIA corretos no botão', () => {
      renderMenu();
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'menu');
    });

    test('deve atualizar aria-expanded quando menu abre', async () => {
      renderMenu();
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      await user.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });
});

// Teste de integração completo
describe('Menu - Integração Completa', () => {
  test('fluxo completo de uso do menu', async () => {
    const user = userEvent.setup();
    const onMenuItemClick = jest.fn();
    const onToggle = jest.fn();
    
    const items: MenuItem[] = [
      { id: 'action1', text: 'Primeira Ação', value: 'action1' },
      { id: 'action2', text: 'Segunda Ação', value: 'action2' },
    ];
    
    render(
      <Menu
        menuItems={items}
        onMenuItemClick={onMenuItemClick}
        onToggle={onToggle}
        applySearch={true}
        showSubText={false}
        placeholder="Buscar..."
      />
    );
    
    // 1. Verificar estado inicial
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    
    // 2. Abrir menu
    await user.click(button);
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    
    // 3. Verificar conteúdo do menu
    await waitFor(() => {
      expect(screen.getByText('Primeira Ação')).toBeInTheDocument();
      expect(screen.getByText('Segunda Ação')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
    });
    
    // 4. Selecionar um item
    const firstAction = screen.getByText('Primeira Ação');
    await user.click(firstAction);
    
    // 5. Verificar callback
    expect(onMenuItemClick).toHaveBeenCalledWith(items[0]);
    
    // 6. Menu deve fechar
    await waitFor(() => {
      expect(screen.queryByText('Primeira Ação')).not.toBeInTheDocument();
    });
    
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});