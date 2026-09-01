import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import Drawer from '../Drawer';

const defaultProps = {
  isOpen: false,
  onClose: vi.fn(),
  title: 'Título do Drawer',
};

describe('Drawer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('Renderização básica', () => {
    it('deve renderizar o overlay', () => {
      render(<Drawer {...defaultProps} />);
      expect(screen.getByTestId('drawer-overlay')).toBeInTheDocument();
    });

    it('deve renderizar o painel', () => {
      render(<Drawer {...defaultProps} />);
      expect(screen.getByTestId('drawer-panel')).toBeInTheDocument();
    });

    it('deve renderizar o título padrão', () => {
      render(<Drawer {...defaultProps} title="Meu Drawer" />);
      expect(screen.getByText('Meu Drawer')).toBeInTheDocument();
    });

    it('deve renderizar o título "Título" quando não fornecido', () => {
      render(<Drawer isOpen={false} onClose={vi.fn()} />);
      expect(screen.getByText('Título')).toBeInTheDocument();
    });

    it('deve renderizar os children', () => {
      render(
        <Drawer {...defaultProps}>
          <p>Conteúdo interno</p>
        </Drawer>
      );
      expect(screen.getByText('Conteúdo interno')).toBeInTheDocument();
    });

    it('deve renderizar o conteúdo dentro do drawer-content', () => {
      render(
        <Drawer {...defaultProps}>
          <span>Filho</span>
        </Drawer>
      );
      const content = screen.getByTestId('drawer-content');
      expect(content).toContainElement(screen.getByText('Filho'));
    });

    it('deve renderizar o headerContent quando fornecido', () => {
      render(
        <Drawer {...defaultProps} headerContent={<button>Header Action</button>} />
      );
      expect(screen.getByText('Header Action')).toBeInTheDocument();
    });

    it('não deve renderizar headerContent quando não fornecido', () => {
      render(<Drawer {...defaultProps} />);
      const titleClose = document.body.querySelector('[class*="drawerTitleClose"]');
      // sem headerContent, a drawerTitleClose deve ter apenas 2 filhos: title div + button
      expect(titleClose?.childElementCount).toBe(2);
    });

    it('deve aplicar className customizada ao painel', () => {
      render(<Drawer {...defaultProps} className="minha-classe" />);
      expect(screen.getByTestId('drawer-panel')).toHaveClass('minha-classe');
    });

    it('deve aplicar o ID customizado ao painel', () => {
      render(<Drawer {...defaultProps} id="meu-drawer" />);
      expect(screen.getByTestId('drawer-panel')).toHaveAttribute('id', 'meu-drawer');
    });

    it('deve renderizar o botão de fechar', () => {
      render(<Drawer {...defaultProps} isOpen />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Estado isOpen', () => {
    it('deve definir aria-hidden="true" no painel quando fechado', () => {
      render(<Drawer {...defaultProps} isOpen={false} />);
      expect(screen.getByTestId('drawer-panel')).toHaveAttribute('aria-hidden', 'true');
    });

    it('deve definir aria-hidden="false" no painel quando aberto', () => {
      render(<Drawer {...defaultProps} isOpen />);
      expect(screen.getByTestId('drawer-panel')).toHaveAttribute('aria-hidden', 'false');
    });

    it('deve aplicar a classe de aberto no painel quando isOpen=true', () => {
      render(<Drawer {...defaultProps} isOpen />);
      expect(document.body.querySelector('[class*="drawerSidebar--open"]')).toBeInTheDocument();
    });

    it('não deve aplicar a classe de aberto no painel quando isOpen=false', () => {
      render(<Drawer {...defaultProps} isOpen={false} />);
      expect(document.body.querySelector('[class*="drawerSidebar--open"]')).toBeNull();
    });

    it('deve aplicar a classe de visível no overlay quando isOpen=true', () => {
      render(<Drawer {...defaultProps} isOpen />);
      expect(document.body.querySelector('[class*="drawerShadow--visible"]')).toBeInTheDocument();
    });

    it('não deve aplicar a classe de visível no overlay quando isOpen=false', () => {
      render(<Drawer {...defaultProps} isOpen={false} />);
      expect(document.body.querySelector('[class*="drawerShadow--visible"]')).toBeNull();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter role="dialog" no painel', () => {
      render(<Drawer {...defaultProps} />);
      expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
    });

    it('deve ter aria-modal="true" no painel', () => {
      render(<Drawer {...defaultProps} />);
      expect(screen.getByTestId('drawer-panel')).toHaveAttribute('aria-modal', 'true');
    });

    it('deve ter aria-labelledby="drawer-title" quando sem id', () => {
      render(<Drawer {...defaultProps} />);
      expect(screen.getByTestId('drawer-panel')).toHaveAttribute('aria-labelledby', 'drawer-title');
    });

    it('deve ter aria-labelledby com sufixo "-title" quando id fornecido', () => {
      render(<Drawer {...defaultProps} id="meu-drawer" />);
      expect(screen.getByTestId('drawer-panel')).toHaveAttribute('aria-labelledby', 'meu-drawer-title');
    });

    it('o overlay deve ter role="presentation"', () => {
      render(<Drawer {...defaultProps} />);
      expect(screen.getByTestId('drawer-overlay')).toHaveAttribute('role', 'presentation');
    });

    it('o overlay deve ter aria-hidden="true"', () => {
      render(<Drawer {...defaultProps} />);
      expect(screen.getByTestId('drawer-overlay')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Callback onClose', () => {
    it('deve chamar onClose ao clicar no botão de fechar', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen />);
      await user.click(screen.getByRole('button'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClose ao clicar no overlay quando closeOnOverlayClick=true', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen closeOnOverlayClick />);
      await user.click(screen.getByTestId('drawer-overlay'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar onClose ao clicar no overlay quando closeOnOverlayClick=false', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Drawer {...defaultProps} onClose={onClose} isOpen closeOnOverlayClick={false} />
      );
      await user.click(screen.getByTestId('drawer-overlay'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('deve chamar onClose ao pressionar ESC quando closeOnEscape=true e isOpen=true', () => {
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen closeOnEscape />);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar onClose ao pressionar ESC quando closeOnEscape=false', () => {
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen closeOnEscape={false} />);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('não deve chamar onClose ao pressionar ESC quando isOpen=false', () => {
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen={false} closeOnEscape />);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('não deve chamar onClose ao pressionar outra tecla', () => {
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen closeOnEscape />);
      fireEvent.keyDown(window, { key: 'Enter' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('deve remover o listener de teclado ao fechar o drawer', () => {
      const onClose = vi.fn();
      const { rerender } = render(<Drawer {...defaultProps} onClose={onClose} isOpen closeOnEscape />);
      rerender(<Drawer {...defaultProps} onClose={onClose} isOpen={false} closeOnEscape />);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Callback onOpen', () => {
    it('deve chamar onOpen quando isOpen=true e não está disabled', () => {
      const onOpen = vi.fn();
      render(<Drawer {...defaultProps} isOpen onOpen={onOpen} />);
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar onOpen quando disabled=true', () => {
      const onOpen = vi.fn();
      render(<Drawer {...defaultProps} isOpen onOpen={onOpen} disabled />);
      expect(onOpen).not.toHaveBeenCalled();
    });

    it('não deve chamar onOpen quando isOpen=false', () => {
      const onOpen = vi.fn();
      render(<Drawer {...defaultProps} isOpen={false} onOpen={onOpen} />);
      expect(onOpen).not.toHaveBeenCalled();
    });

    it('deve chamar onOpen novamente quando drawer reabre', () => {
      const onOpen = vi.fn();
      const { rerender } = render(<Drawer {...defaultProps} isOpen={false} onOpen={onOpen} />);
      rerender(<Drawer {...defaultProps} isOpen onOpen={onOpen} />);
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe('Callback onOverlayClick', () => {
    it('deve chamar onOverlayClick ao clicar no overlay', async () => {
      const user = userEvent.setup();
      const onOverlayClick = vi.fn();
      render(<Drawer {...defaultProps} isOpen onOverlayClick={onOverlayClick} />);
      await user.click(screen.getByTestId('drawer-overlay'));
      expect(onOverlayClick).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onOverlayClick mesmo com closeOnOverlayClick=false', async () => {
      const user = userEvent.setup();
      const onOverlayClick = vi.fn();
      render(
        <Drawer
          {...defaultProps}
          isOpen
          onOverlayClick={onOverlayClick}
          closeOnOverlayClick={false}
        />
      );
      await user.click(screen.getByTestId('drawer-overlay'));
      expect(onOverlayClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado disabled', () => {
    it('deve aplicar a classe disabled ao painel', () => {
      render(<Drawer {...defaultProps} disabled />);
      expect(document.body.querySelector('[class*="drawerSidebar--disabled"]')).toBeInTheDocument();
    });

    it('não deve chamar onClose ao clicar no botão de fechar quando disabled', () => {
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen disabled />);
      // pointer-events: none via CSS impede userEvent; fireEvent ignora restrições CSS
      fireEvent.click(screen.getByRole('button'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('não deve chamar onClose ao clicar no overlay quando disabled', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen disabled closeOnOverlayClick />);
      await user.click(screen.getByTestId('drawer-overlay'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('não deve chamar onClose ao pressionar ESC quando disabled', () => {
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen disabled closeOnEscape />);
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Scroll do body', () => {
    it('deve bloquear o scroll do body quando aberto', () => {
      render(<Drawer {...defaultProps} isOpen />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('deve liberar o scroll do body quando fechado', () => {
      const { rerender } = render(<Drawer {...defaultProps} isOpen />);
      rerender(<Drawer {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe('unset');
    });

    it('não deve bloquear o scroll quando disabled=true e isOpen=true', () => {
      render(<Drawer {...defaultProps} isOpen disabled />);
      expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('deve restaurar o scroll ao desmontar o componente', () => {
      const { unmount } = render(<Drawer {...defaultProps} isOpen />);
      unmount();
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('customWidth', () => {
    it('deve aplicar a CSS variable --drawer-custom-width com o valor fornecido', () => {
      render(<Drawer {...defaultProps} customWidth="600px" />);
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveStyle({ '--drawer-custom-width': '600px' });
    });

    it('deve usar 400px como largura padrão', () => {
      render(<Drawer {...defaultProps} />);
      const panel = screen.getByTestId('drawer-panel');
      expect(panel).toHaveStyle({ '--drawer-custom-width': '400px' });
    });
  });

  describe('Interação interna do painel', () => {
    it('clique no painel não deve propagar para o overlay', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Drawer {...defaultProps} onClose={onClose} isOpen closeOnOverlayClick />);
      await user.click(screen.getByTestId('drawer-panel'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('clique no conteúdo não deve fechar o drawer', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Drawer {...defaultProps} onClose={onClose} isOpen closeOnOverlayClick>
          <p>Conteúdo</p>
        </Drawer>
      );
      await user.click(screen.getByText('Conteúdo'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
