import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Drawer from '../Drawer';

// Mock do componente Button para isolar testes
jest.mock('../../Button/Button', () => {
  return function MockButton({ onClick, icon, variant, size, ...props }: any) {
    return (
      <button 
        onClick={onClick} 
        data-testid="drawer-close-button"
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {icon} Close
      </button>
    );
  };
});

describe('Drawer Component', () => {
  const defaultProps = {
    isOpen: false,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Limpar estilos do body antes de cada teste
    document.body.style.overflow = '';
  });

  afterEach(() => {
    // Restaurar estilos do body após cada teste
    document.body.style.overflow = '';
  });

  // ✅ GRUPO 1: Renderização Básica
  describe('Renderização Básica', () => {
    test('deve renderizar drawer fechado por padrão', () => {
      render(<Drawer {...defaultProps} />);
      
      const overlay = screen.getByTestId('drawer-overlay');
      const panel = screen.getByTestId('drawer-panel');
      
      expect(overlay).toBeInTheDocument();
      expect(panel).toBeInTheDocument();
      expect(overlay).not.toHaveClass('zds-custom__drawer-shadow--visible');
      expect(panel).not.toHaveClass('zds-custom__drawer-sidebar--open');
    });

    test('deve renderizar drawer aberto quando isOpen=true', () => {
      render(<Drawer {...defaultProps} isOpen={true} />);
      
      const overlay = screen.getByTestId('drawer-overlay');
      const panel = screen.getByTestId('drawer-panel');
      
      expect(overlay).toHaveClass('zds-custom__drawer-shadow--visible');
      expect(panel).toHaveClass('zds-custom__drawer-sidebar--open');
    });

    test('deve renderizar título padrão', () => {
      render(<Drawer {...defaultProps} isOpen={true} />);
      
      const title = screen.getByText('Título');
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('zds-drawer__title');
    });

    test('deve renderizar título customizado', () => {
      render(<Drawer {...defaultProps} isOpen={true} title="Custom Title" />);
      
      const title = screen.getByText('Custom Title');
      expect(title).toBeInTheDocument();
    });

    test('deve renderizar children quando fornecido', () => {
      render(
        <Drawer {...defaultProps} isOpen={true}>
          <div data-testid="drawer-child">Child Content</div>
        </Drawer>
      );
      
      const child = screen.getByTestId('drawer-child');
      const content = screen.getByTestId('drawer-content');
      
      expect(child).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(content).toContainElement(child);
    });

    test('deve aplicar className customizada', () => {
      render(<Drawer {...defaultProps} className="custom-class" />);
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveClass('custom-class');
    });

    test('deve aplicar ID customizado', () => {
      render(<Drawer {...defaultProps} id="custom-drawer" />);
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveAttribute('id', 'custom-drawer');
    });
  });

  // ✅ GRUPO 2: Funcionalidades de Clique
  describe('Funcionalidades de Clique', () => {
    test('deve chamar onClose quando clica no botão fechar', async () => {
      const onClose = jest.fn();
      render(<Drawer {...defaultProps} isOpen={true} onClose={onClose} />);
      
      const closeButton = screen.getByTestId('drawer-close-button');
      await userEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('deve chamar onClose quando clica no overlay', async () => {
      const onClose = jest.fn();
      render(<Drawer {...defaultProps} isOpen={true} onClose={onClose} />);
      
      const overlay = screen.getByTestId('drawer-overlay');
      await userEvent.click(overlay);
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('não deve fechar quando clica no overlay se closeOnOverlayClick=false', async () => {
      const onClose = jest.fn();
      render(
        <Drawer 
          {...defaultProps} 
          isOpen={true} 
          onClose={onClose} 
          closeOnOverlayClick={false}
        />
      );
      
      const overlay = screen.getByTestId('drawer-overlay');
      await userEvent.click(overlay);
      
      expect(onClose).not.toHaveBeenCalled();
    });

    test('deve chamar onOverlayClick quando clica no overlay', async () => {
      const onOverlayClick = jest.fn();
      const onClose = jest.fn();
      render(
        <Drawer 
          {...defaultProps} 
          isOpen={true} 
          onClose={onClose}
          onOverlayClick={onOverlayClick}
        />
      );
      
      const overlay = screen.getByTestId('drawer-overlay');
      await userEvent.click(overlay);
      
      expect(onOverlayClick).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('não deve fechar quando clica no conteúdo do drawer', async () => {
      const onClose = jest.fn();
      render(
        <Drawer {...defaultProps} isOpen={true} onClose={onClose}>
          <div data-testid="drawer-content-child">Content</div>
        </Drawer>
      );
      
      const content = screen.getByTestId('drawer-content-child');
      await userEvent.click(content);
      
      expect(onClose).not.toHaveBeenCalled();
    });

    test('não deve fechar quando clica no panel do drawer', async () => {
      const onClose = jest.fn();
      render(<Drawer {...defaultProps} isOpen={true} onClose={onClose} />);
      
      const panel = screen.getByTestId('drawer-panel');
      await userEvent.click(panel);
      
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // ✅ GRUPO 3: Navegação por Teclado
  describe('Navegação por Teclado', () => {
    test('deve fechar com tecla ESC', async () => {
      const onClose = jest.fn();
      render(<Drawer {...defaultProps} isOpen={true} onClose={onClose} />);
      
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('não deve fechar com ESC quando closeOnEscape=false', async () => {
      const onClose = jest.fn();
      render(
        <Drawer 
          {...defaultProps} 
          isOpen={true} 
          onClose={onClose}
          closeOnEscape={false}
        />
      );
      
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(onClose).not.toHaveBeenCalled();
    });

    test('não deve fechar com ESC quando drawer está fechado', async () => {
      const onClose = jest.fn();
      render(<Drawer {...defaultProps} isOpen={false} onClose={onClose} />);
      
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(onClose).not.toHaveBeenCalled();
    });

    test('não deve fechar com outras teclas', async () => {
      const onClose = jest.fn();
      render(<Drawer {...defaultProps} isOpen={true} onClose={onClose} />);
      
      fireEvent.keyDown(window, { key: 'Enter' });
      fireEvent.keyDown(window, { key: 'Space' });
      fireEvent.keyDown(window, { key: 'Tab' });
      
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // ✅ GRUPO 4: Estados do Componente
  describe('Estados do Componente', () => {
    test('deve aplicar classe disabled quando disabled=true', () => {
      render(<Drawer {...defaultProps} disabled={true} />);
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveClass('zds-custom__drawer-sidebar--disabled');
    });

    test('não deve fechar quando disabled=true e clica no overlay', async () => {
      const onClose = jest.fn();
      render(
        <Drawer 
          {...defaultProps} 
          isOpen={true} 
          onClose={onClose} 
          disabled={true}
        />
      );
      
      const overlay = screen.getByTestId('drawer-overlay');
      await userEvent.click(overlay);
      
      expect(onClose).not.toHaveBeenCalled();
    });

    test('não deve fechar quando disabled=true e clica no botão fechar', async () => {
      const onClose = jest.fn();
      render(
        <Drawer 
          {...defaultProps} 
          isOpen={true} 
          onClose={onClose} 
          disabled={true}
        />
      );
      
      const closeButton = screen.getByTestId('drawer-close-button');
      await userEvent.click(closeButton);
      
      expect(onClose).not.toHaveBeenCalled();
    });

    test('não deve fechar com ESC quando disabled=true', async () => {
      const onClose = jest.fn();
      render(
        <Drawer 
          {...defaultProps} 
          isOpen={true} 
          onClose={onClose} 
          disabled={true}
        />
      );
      
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // ✅ GRUPO 5: Largura Customizável
  describe('Largura Customizável', () => {
    test('deve aplicar largura padrão 400px', () => {
      render(<Drawer {...defaultProps} />);
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveStyle({ '--drawer-custom-width': '400px' });
    });

    test('deve aplicar largura customizada', () => {
      render(<Drawer {...defaultProps} customWidth="600px" />);
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveStyle({ '--drawer-custom-width': '600px' });
    });

    test('deve aceitar larguras em diferentes unidades', () => {
      const { rerender } = render(<Drawer {...defaultProps} customWidth="50%" />);
      
      let panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveStyle({ '--drawer-custom-width': '50%' });
      
      rerender(<Drawer {...defaultProps} customWidth="20rem" />);
      panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveStyle({ '--drawer-custom-width': '20rem' });
    });
  });

  // ✅ GRUPO 6: Callbacks e Lifecycle
  describe('Callbacks e Lifecycle', () => {
    test('deve chamar onOpen quando drawer abre', async () => {
      const onOpen = jest.fn();
      const { rerender } = render(
        <Drawer {...defaultProps} isOpen={false} onOpen={onOpen} />
      );
      
      rerender(<Drawer {...defaultProps} isOpen={true} onOpen={onOpen} />);
      
      await waitFor(() => {
        expect(onOpen).toHaveBeenCalledTimes(1);
      });
    });

    test('não deve chamar onOpen quando disabled=true', async () => {
      const onOpen = jest.fn();
      const { rerender } = render(
        <Drawer {...defaultProps} isOpen={false} onOpen={onOpen} disabled={true} />
      );
      
      rerender(<Drawer {...defaultProps} isOpen={true} onOpen={onOpen} disabled={true} />);
      
      expect(onOpen).not.toHaveBeenCalled();
    });

    test('deve gerenciar overflow do body quando abre', async () => {
      const { rerender } = render(<Drawer {...defaultProps} isOpen={false} />);
      
      expect(document.body.style.overflow).toBe('');
      
      rerender(<Drawer {...defaultProps} isOpen={true} />);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    test('deve restaurar overflow do body quando fecha', async () => {
      const { rerender } = render(<Drawer {...defaultProps} isOpen={true} />);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
      
      rerender(<Drawer {...defaultProps} isOpen={false} />);
      
      await waitFor(() => {
        expect(document.body.style.overflow).toBe('unset');
      });
    });

    test('deve limpar overflow do body no unmount', () => {
      const { unmount } = render(<Drawer {...defaultProps} isOpen={true} />);
      
      unmount();
      
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  // ✅ GRUPO 7: Acessibilidade
  describe('Acessibilidade', () => {
    test('deve ter atributos ARIA corretos quando aberto', () => {
      render(<Drawer {...defaultProps} isOpen={true} />);
      
      const panel = screen.getByTestId('drawer-panel');
      
      expect(panel).toHaveAttribute('role', 'dialog');
      expect(panel).toHaveAttribute('aria-modal', 'true');
      expect(panel).toHaveAttribute('aria-hidden', 'false');
      expect(panel).toHaveAttribute('aria-labelledby', 'drawer-title');
    });

    test('deve ter atributos ARIA corretos quando fechado', () => {
      render(<Drawer {...defaultProps} isOpen={false} />);
      
      const panel = screen.getByTestId('drawer-panel');
      
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });

    test('deve usar ID customizado para aria-labelledby', () => {
      render(<Drawer {...defaultProps} isOpen={true} id="custom-drawer" />);
      
      const panel = screen.getByTestId('drawer-panel');
      const title = screen.getByText('Título');
      
      expect(panel).toHaveAttribute('aria-labelledby', 'custom-drawer-title');
      expect(title).toHaveAttribute('id', 'custom-drawer-title');
    });

    test('overlay deve ter role presentation', () => {
      render(<Drawer {...defaultProps} />);
      
      const overlay = screen.getByTestId('drawer-overlay');
      
      expect(overlay).toHaveAttribute('role', 'presentation');
      expect(overlay).toHaveAttribute('aria-hidden', 'true');
    });

    test('botão fechar deve estar acessível', () => {
      render(<Drawer {...defaultProps} isOpen={true} />);
      
      const closeButton = screen.getByTestId('drawer-close-button');
      
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute('data-variant', 'outlined');
      expect(closeButton).toHaveAttribute('data-size', 'lg');
    });
  });

  // ✅ GRUPO 8: Casos Extremos e Edge Cases
  describe('Casos Extremos', () => {
    test('deve renderizar sem children', () => {
      render(<Drawer {...defaultProps} isOpen={true} />);
      
      const content = screen.getByTestId('drawer-content');
      expect(content).toBeInTheDocument();
      expect(content).toBeEmptyDOMElement();
    });

    test('deve lidar com título muito longo', () => {
      const longTitle = 'A'.repeat(100);
      render(<Drawer {...defaultProps} isOpen={true} title={longTitle} />);
      
      const title = screen.getByText(longTitle);
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('zds-drawer__title');
    });

    test('deve lidar com múltiplas mudanças de estado rapidamente', async () => {
      const onOpen = jest.fn();
      const onClose = jest.fn();
      const { rerender } = render(
        <Drawer {...defaultProps} isOpen={false} onOpen={onOpen} onClose={onClose} />
      );
      
      // Abrir e fechar rapidamente
      rerender(<Drawer {...defaultProps} isOpen={true} onOpen={onOpen} onClose={onClose} />);
      rerender(<Drawer {...defaultProps} isOpen={false} onOpen={onOpen} onClose={onClose} />);
      rerender(<Drawer {...defaultProps} isOpen={true} onOpen={onOpen} onClose={onClose} />);
      
      await waitFor(() => {
        expect(onOpen).toHaveBeenCalledTimes(2);
      });
    });

    test('deve prevenir comportamentos inesperados com event.stopPropagation', async () => {
      const onClose = jest.fn();
      const outerClick = jest.fn();
      
      render(
        <div onClick={outerClick}>
          <Drawer {...defaultProps} isOpen={true} onClose={onClose}>
            <button data-testid="inner-button">Inner Button</button>
          </Drawer>
        </div>
      );
      
      const innerButton = screen.getByTestId('inner-button');
      await userEvent.click(innerButton);
      
      // Drawer não deve fechar e evento não deve propagar
      expect(onClose).not.toHaveBeenCalled();
      expect(outerClick).not.toHaveBeenCalled();
    });

    test('deve lidar com larguras inválidas graciosamente', () => {
      render(<Drawer {...defaultProps} customWidth="invalid-width" />);
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveStyle({ '--drawer-custom-width': 'invalid-width' });
      // CSS irá usar fallback 400px
    });
  });

  // ✅ GRUPO 9: Integração e Performance
  describe('Integração e Performance', () => {
    test('deve remover event listeners corretamente', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      
      const { rerender } = render(<Drawer {...defaultProps} isOpen={true} />);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      rerender(<Drawer {...defaultProps} isOpen={false} />);
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });

    test('não deve adicionar event listeners quando closeOnEscape=false', () => {
      const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      
      render(<Drawer {...defaultProps} isOpen={true} closeOnEscape={false} />);
      
      expect(addEventListenerSpy).not.toHaveBeenCalledWith('keydown', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
    });

    test('deve funcionar com múltiplos drawers', () => {
      render(
        <>
          <Drawer {...defaultProps} isOpen={true} id="drawer1" />
          <Drawer {...defaultProps} isOpen={false} id="drawer2" />
        </>
      );
      
      const drawer1 = screen.getByTestId('drawer-panel');
      expect(drawer1).toHaveAttribute('id', 'drawer1');
      
      const overlays = screen.getAllByTestId('drawer-overlay');
      expect(overlays).toHaveLength(2);
    });
  });
});