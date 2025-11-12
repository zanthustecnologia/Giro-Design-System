import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Menu from '../Menu';
import type { MenuItem } from '../Menu.types';
import Button from '../../Button';

// 🎭 Dados de teste simples
const testMenuItems: MenuItem[] = [
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3', disabled: true }
];

// 📝 Helper para renderizar menu básico
const renderMenu = (props = {}) => {
  const defaultProps = {
    menuItems: testMenuItems,
    children: <Button>Menu</Button>,
    ...props
  };
  return render(<Menu {...defaultProps} />);
};

describe('Menu Component', () => {
  
  // ✅ TESTE 1: Renderização básica
  test('renders menu trigger', () => {
    renderMenu();
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  // ✅ TESTE 2: Abrir/fechar menu
  test('opens and closes menu on click', async () => {
    const user = userEvent.setup();
    renderMenu();
    
    const trigger = screen.getByText('Menu');
    
    // Menu fechado inicialmente
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    
    // Abre menu
    await user.click(trigger);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    
    // Fecha menu
    await user.click(trigger);
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  // ✅ TESTE 3: Callback de item clicado
  test('calls onMenuItemClick when item is clicked', async () => {
    const onMenuItemClick = jest.fn();
    const user = userEvent.setup();
    
    renderMenu({ onMenuItemClick });
    
    // Abre menu e clica no item
    await user.click(screen.getByText('Menu'));
    await user.click(screen.getByText('Item 1'));
    
    expect(onMenuItemClick).toHaveBeenCalledWith(testMenuItems[0]);
  });

  // ✅ TESTE 4: Fechar com ESC
  test('closes menu with Escape key', async () => {
    const user = userEvent.setup();
    renderMenu();
    
    // Abre menu
    await user.click(screen.getByText('Menu'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    
    // Fecha com ESC
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  // ✅ TESTE 5: Fechar clicando fora
  test('closes menu when clicking outside', async () => {
    const user = userEvent.setup();
    renderMenu();
    
    // Abre menu
    await user.click(screen.getByText('Menu'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    
    // Clica fora
    await user.click(document.body);
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  // ✅ TESTE 6: ARIA attributes
  test('has correct accessibility attributes', async () => {
    const user = userEvent.setup();
    renderMenu();
    
    const trigger = screen.getByText('Menu');
    
    // Menu fechado
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    
    // Menu aberto
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  // ✅ TESTE 7: Preservar onClick original
  test('preserves original onClick handler', async () => {
    const originalClick = jest.fn();
    const user = userEvent.setup();
    
    render(
      <Menu menuItems={testMenuItems}>
        <Button onClick={originalClick}>Custom Button</Button>
      </Menu>
    );
    
    await user.click(screen.getByText('Custom Button'));
    
    // Ambos devem ser chamados
    expect(originalClick).toHaveBeenCalled();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  // ✅ TESTE 8: Menu vazio
  test('handles empty menu items', async () => {
    const user = userEvent.setup();
    renderMenu({ menuItems: [] });
    
    // Deve abrir mesmo sem itens
    await user.click(screen.getByText('Menu'));
    
    const trigger = screen.getByText('Menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  // ✅ TESTE 9: Tipo checkbox
  test('checkbox type keeps menu open after selection', async () => {
    const user = userEvent.setup();
    renderMenu({ type: 'checkbox' });
    
    await user.click(screen.getByText('Menu'));
    await user.click(screen.getByText('Item 1'));
    
    // Menu deve permanecer aberto
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  // ✅ TESTE 10: Props opcionais
  test('renders with optional props', async () => {
    const user = userEvent.setup();
    
    renderMenu({ 
      showSubText: true,
      applySearch: true,
      placeholder: 'Buscar...',
      className: 'custom-class'
    });
    
    const { container } = render(
      <Menu 
        menuItems={testMenuItems}
        className="custom-class"
        applySearch={true}
        placeholder="Buscar..."
      >
        <Button>Menu</Button>
      </Menu>
    );
    
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});