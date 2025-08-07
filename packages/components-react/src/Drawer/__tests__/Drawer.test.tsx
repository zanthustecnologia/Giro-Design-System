import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from '../Drawer';
import type { DrawerProps } from '../Drawer';

// ✅ Mock para matchMedia (necessário para testes com media queries)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// ✅ Props padrão para os testes
const defaultProps: DrawerProps = {
  isOpen: false,
  onClose: jest.fn(),
  children: <div>Test Content</div>,
  title: 'Test Drawer',
};

// ✅ Helper para renderizar o componente com props customizadas
const renderDrawer = (props: Partial<DrawerProps> = {}) => {
  const mergedProps = { ...defaultProps, ...props };
  return render(<Drawer {...mergedProps} />);
};

describe('Drawer Component', () => {
  // ✅ Limpa mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
    // Restore body overflow
    document.body.style.overflow = 'unset';
  });

  // ✅ Testa renderização básica
  describe('Rendering', () => {
    it('should render correctly when closed', () => {
      renderDrawer({ isOpen: false });
      
      const overlay = screen.getByTestId('drawer-overlay');
      const panel = screen.getByTestId('drawer-panel');
      
      expect(overlay).toHaveStyle({ opacity: '0', display: 'none' });
      expect(panel).toHaveStyle({ opacity: '0' });
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render correctly when open', () => {
      renderDrawer({ isOpen: true });
      
      const overlay = screen.getByTestId('drawer-overlay');
      const panel = screen.getByTestId('drawer-panel');
      
      expect(overlay).toHaveStyle({ opacity: '1.0' });
      expect(panel).toHaveStyle({ opacity: '1.0' });
      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });

    it('should render title correctly', () => {
      renderDrawer({ isOpen: true, title: 'Custom Title' });
      
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should render children content', () => {
      renderDrawer({ 
        isOpen: true, 
        children: <div data-testid="custom-content">Custom Content</div> 
      });
      
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });

    it('should render with custom width', () => {
      renderDrawer({ isOpen: true, pWidth: '500px' });
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveStyle({ width: '500px' });
    });

    it('should apply no-padding class when noPadding is true', () => {
      renderDrawer({ isOpen: true, noPadding: true });
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveClass('zds-custom-drawer-sidebar--no-padding');
    });

    it('should apply custom className', () => {
      renderDrawer({ isOpen: true, className: 'custom-class' });
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveClass('custom-class');
    });

    it('should apply disabled state', () => {
      renderDrawer({ isOpen: true, disabled: true });
      
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveClass('zds-custom-drawer-sidebar--disabled');
    });
  });

  // ✅ Testa interações do usuário
  describe('User Interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ isOpen: true, onClose: onCloseMock });
      
      const closeButton = screen.getByTestId('drawer-close-button');
      await userEvent.click(closeButton);
      
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when overlay is clicked', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ isOpen: true, onClose: onCloseMock });
      
      const overlay = screen.getByTestId('drawer-overlay');
      await userEvent.click(overlay);
      
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should not close when overlay is clicked and closeOnOverlayClick is false', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ 
        isOpen: true, 
        onClose: onCloseMock, 
        closeOnOverlayClick: false 
      });
      
      const overlay = screen.getByTestId('drawer-overlay');
      await userEvent.click(overlay);
      
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('should not close when drawer content is clicked', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ isOpen: true, onClose: onCloseMock });
      
      const panel = screen.getByTestId('drawer-panel');
      await userEvent.click(panel);
      
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('should call onOverlayClick when overlay is clicked', async () => {
      const onOverlayClickMock = jest.fn();
      renderDrawer({ 
        isOpen: true, 
        onOverlayClick: onOverlayClickMock 
      });
      
      const overlay = screen.getByTestId('drawer-overlay');
      await userEvent.click(overlay);
      
      expect(onOverlayClickMock).toHaveBeenCalledTimes(1);
    });
  });

  // ✅ Testa navegação por teclado
  describe('Keyboard Navigation', () => {
    it('should close when Escape key is pressed', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ isOpen: true, onClose: onCloseMock });
      
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should not close on Escape when closeOnEscape is false', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ 
        isOpen: true, 
        onClose: onCloseMock, 
        closeOnEscape: false 
      });
      
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('should close when Enter is pressed on close button', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ isOpen: true, onClose: onCloseMock });
      
      const closeButton = screen.getByTestId('drawer-close-button');
      fireEvent.keyDown(closeButton, { key: 'Enter' });
      
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should close when Space is pressed on close button', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ isOpen: true, onClose: onCloseMock });
      
      const closeButton = screen.getByTestId('drawer-close-button');
      fireEvent.keyDown(closeButton, { key: ' ' });
      
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should not close on other keys', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ isOpen: true, onClose: onCloseMock });
      
      fireEvent.keyDown(window, { key: 'Tab' });
      fireEvent.keyDown(window, { key: 'Enter' });
      
      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });

  // ✅ Testa acessibilidade
  describe('Accessibility', () => {
    it('should have correct ARIA attributes when open', () => {
      renderDrawer({ isOpen: true, id: 'test-drawer' });
      
      const panel = screen.getByTestId('drawer-panel');
      
      expect(panel).toHaveAttribute('role', 'dialog');
      expect(panel).toHaveAttribute('aria-modal', 'true');
      expect(panel).toHaveAttribute('aria-labelledby', 'test-drawer-title');
      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });

    it('should have correct ARIA attributes when closed', () => {
      renderDrawer({ isOpen: false });
      
      const panel = screen.getByTestId('drawer-panel');
      
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have accessible close button', () => {
      renderDrawer({ isOpen: true });
      
      const closeButton = screen.getByTestId('drawer-close-button');
      
      expect(closeButton).toHaveAttribute('role', 'button');
      expect(closeButton).toHaveAttribute('tabIndex', '0');
      expect(closeButton).toHaveAttribute('aria-label', 'Fechar drawer');
    });

    it('should prevent body scroll when open', () => {
      renderDrawer({ isOpen: true });
      
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when closed', () => {
      const { rerender } = renderDrawer({ isOpen: true });
      expect(document.body.style.overflow).toBe('hidden');
      
      rerender(<Drawer {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  // ✅ Testa callbacks
  describe('Callbacks', () => {
    it('should call onOpen when drawer opens', async () => {
      const onOpenMock = jest.fn();
      const { rerender } = renderDrawer({ isOpen: false, onOpen: onOpenMock });
      
      rerender(<Drawer {...defaultProps} isOpen={true} onOpen={onOpenMock} />);
      
      await waitFor(() => {
        expect(onOpenMock).toHaveBeenCalledTimes(1);
      });
    });

    it('should not call onOpen when drawer is already open', () => {
      const onOpenMock = jest.fn();
      const { rerender } = renderDrawer({ isOpen: true, onOpen: onOpenMock });
      
      // Clear the initial call
      onOpenMock.mockClear();
      
      rerender(<Drawer {...defaultProps} isOpen={true} onOpen={onOpenMock} />);
      
      expect(onOpenMock).not.toHaveBeenCalled();
    });
  });

  // ✅ Testa estados de erro/disabled
  describe('Error States', () => {
    it('should not respond to interactions when disabled', async () => {
      const onCloseMock = jest.fn();
      renderDrawer({ isOpen: true, disabled: true, onClose: onCloseMock });
      
      const closeButton = screen.getByTestId('drawer-close-button');
      const overlay = screen.getByTestId('drawer-overlay');
      
      await userEvent.click(closeButton);
      await userEvent.click(overlay);
      fireEvent.keyDown(window, { key: 'Escape' });
      
      expect(onCloseMock).not.toHaveBeenCalled();
    });

    it('should handle missing children gracefully', () => {
      renderDrawer({ isOpen: true, children: undefined });
      
      const content = screen.getByTestId('drawer-content');
      expect(content).toBeInTheDocument();
    });
  });

  // ✅ Testa z-index customizado
  describe('Z-Index Configuration', () => {
    it('should apply custom z-index values', () => {
      renderDrawer({ 
        isOpen: true, 
        zIndex: 100, 
        overlayZIndex: 99 
      });
      
      const panel = screen.getByTestId('drawer-panel');
      const overlay = screen.getByTestId('drawer-overlay');
      
      expect(panel).toHaveStyle({ zIndex: '100' });
      expect(overlay).toHaveStyle({ zIndex: '99' });
    });
  });

  // ✅ Testa cleanup
  describe('Cleanup', () => {
    it('should cleanup event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
      const { unmount } = renderDrawer({ isOpen: true });
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(document.body.style.overflow).toBe('unset');
      
      removeEventListenerSpy.mockRestore();
    });
  });
});