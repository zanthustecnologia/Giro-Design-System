import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock do Radix UI Dialog
vi.mock('radix-ui', () => {
  const React = require('react');

  // Estado compartilhado entre os componentes do mock (simula o contexto do Radix)
  const state = { onOpenChange: undefined as any, open: false };

  const Root = ({ children, open, onOpenChange, ...props }: any) => {
    state.open = open;
    state.onOpenChange = onOpenChange;
    return React.createElement(
      'div',
      { 'data-testid': 'dialog-root', 'data-state': open ? 'open' : 'closed', ...props },
      children
    );
  };

  // Portal renderiza apenas quando o modal está aberto
  const Portal = ({ children }: any) => {
    if (!state.open) return null;
    return React.createElement('div', { 'data-testid': 'dialog-portal' }, children);
  };

  const Overlay = ({ className, ...props }: any) => {
    return React.createElement('div', {
      'data-testid': 'dialog-overlay',
      className,
      ...props,
    });
  };

  const Content = ({
    children,
    className,
    id,
    style,
    onInteractOutside,
    'aria-labelledby': ariaLabelledBy,
    ...props
  }: any) => {
    return React.createElement(
      'div',
      {
        role: 'dialog',
        'data-testid': 'dialog-content',
        className,
        id,
        style,
        'aria-labelledby': ariaLabelledBy,
      },
      // Botão auxiliar para simular interação fora do content (testa closeOnOverlayClick)
      React.createElement('button', {
        'data-testid': 'simulate-outside-click',
        onClick: () => {
          let defaultPrevented = false;
          const evt = { preventDefault: () => { defaultPrevented = true; } };
          if (onInteractOutside) onInteractOutside(evt);
          if (!defaultPrevented && state.onOpenChange) state.onOpenChange(false);
        },
      }),
      children
    );
  };

  const Title = ({ children, className, id, ...props }: any) => {
    return React.createElement(
      'h2',
      { 'data-testid': 'dialog-title', className, id, ...props },
      children
    );
  };

  // Close sempre renderiza um botão simples que dispara onOpenChange(false)
  const Close = ({ children, asChild, ...props }: any) => {
    return React.createElement('button', {
      'data-testid': 'dialog-close',
      onClick: () => {
        if (state.onOpenChange) state.onOpenChange(false);
      },
    });
  };

  return {
    Dialog: {
      Root,
      Portal,
      Overlay,
      Content,
      Title,
      Close,
    },
  };
});

import Modal from '../Modal';

const defaultProps = {
  isOpen: false,
  onClose: vi.fn(),
};

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Renderização básica', () => {
    it('renderiza com data-state="closed" quando isOpen=false', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.getByTestId('dialog-root')).toHaveAttribute('data-state', 'closed');
    });

    it('renderiza com data-state="open" quando isOpen=true', () => {
      render(<Modal {...defaultProps} isOpen />);
      expect(screen.getByTestId('dialog-root')).toHaveAttribute('data-state', 'open');
    });

    it('não renderiza o portal quando isOpen=false', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.queryByTestId('dialog-portal')).not.toBeInTheDocument();
    });

    it('renderiza o portal quando isOpen=true', () => {
      render(<Modal {...defaultProps} isOpen />);
      expect(screen.getByTestId('dialog-portal')).toBeInTheDocument();
    });

    it('renderiza o overlay quando isOpen=true', () => {
      render(<Modal {...defaultProps} isOpen />);
      expect(screen.getByTestId('dialog-overlay')).toBeInTheDocument();
    });

    it('não renderiza o overlay quando isOpen=false', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.queryByTestId('dialog-overlay')).not.toBeInTheDocument();
    });

    it('renderiza o content quando isOpen=true', () => {
      render(<Modal {...defaultProps} isOpen />);
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });

    it('não renderiza o content quando isOpen=false', () => {
      render(<Modal {...defaultProps} />);
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    });

    it('renderiza o botão de fechar quando isOpen=true', () => {
      render(<Modal {...defaultProps} isOpen />);
      expect(screen.getByTestId('dialog-close')).toBeInTheDocument();
    });

    it('renderiza os children no corpo do modal', () => {
      render(
        <Modal {...defaultProps} isOpen>
          <p>Conteúdo de teste</p>
        </Modal>
      );
      expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument();
    });

    it('aplica className customizada ao content', () => {
      render(<Modal {...defaultProps} isOpen className="minha-classe" />);
      expect(screen.getByTestId('dialog-content')).toHaveClass('minha-classe');
    });

    it('aplica id customizado ao content', () => {
      render(<Modal {...defaultProps} isOpen id="meu-modal" />);
      expect(screen.getByTestId('dialog-content')).toHaveAttribute('id', 'meu-modal');
    });

    it('abre o modal ao alterar isOpen de false para true', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);
      expect(screen.queryByTestId('dialog-portal')).not.toBeInTheDocument();

      rerender(<Modal {...defaultProps} isOpen={true} />);
      expect(screen.getByTestId('dialog-portal')).toBeInTheDocument();
    });

    it('fecha o modal ao alterar isOpen de true para false', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={true} />);
      expect(screen.getByTestId('dialog-portal')).toBeInTheDocument();

      rerender(<Modal {...defaultProps} isOpen={false} />);
      expect(screen.queryByTestId('dialog-portal')).not.toBeInTheDocument();
    });
  });

  describe('Título', () => {
    it('renderiza o título quando fornecido', () => {
      render(<Modal {...defaultProps} isOpen title="Meu Título" />);
      expect(screen.getByTestId('dialog-title')).toHaveTextContent('Meu Título');
    });

    it('não renderiza o título quando não fornecido', () => {
      render(<Modal {...defaultProps} isOpen />);
      expect(screen.queryByTestId('dialog-title')).not.toBeInTheDocument();
    });
  });

  describe('headerContent', () => {
    it('renderiza headerContent quando fornecido', () => {
      render(
        <Modal
          {...defaultProps}
          isOpen
          headerContent={<button>Ação Header</button>}
        />
      );
      expect(screen.getByText('Ação Header')).toBeInTheDocument();
    });

    it('não renderiza a div de headerContent quando não fornecido', () => {
      const { container } = render(<Modal {...defaultProps} isOpen />);
      expect(container.querySelector('[class*="ModalHeaderContent"]')).toBeNull();
    });
  });

  describe('Footer', () => {
    it('renderiza o footer quando fornecido', () => {
      render(
        <Modal
          {...defaultProps}
          isOpen
          footer={<button>Confirmar</button>}
        />
      );
      expect(screen.getByText('Confirmar')).toBeInTheDocument();
    });

    it('não renderiza a div de footer quando não fornecido', () => {
      const { container } = render(<Modal {...defaultProps} isOpen />);
      expect(container.querySelector('[class*="ModalFooter"]')).toBeNull();
    });
  });

  describe('Acessibilidade', () => {
    it('o content tem role="dialog"', () => {
      render(<Modal {...defaultProps} isOpen />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('aria-labelledby usa "modal-title" quando id não é fornecido', () => {
      render(<Modal {...defaultProps} isOpen title="Título" />);
      expect(screen.getByTestId('dialog-content')).toHaveAttribute(
        'aria-labelledby',
        'modal-title'
      );
    });

    it('aria-labelledby usa "${id}-title" quando id é fornecido', () => {
      render(<Modal {...defaultProps} isOpen title="Título" id="meu-modal" />);
      expect(screen.getByTestId('dialog-content')).toHaveAttribute(
        'aria-labelledby',
        'meu-modal-title'
      );
    });

    it('o título tem id "modal-title" quando id não é fornecido', () => {
      render(<Modal {...defaultProps} isOpen title="Título" />);
      expect(screen.getByTestId('dialog-title')).toHaveAttribute('id', 'modal-title');
    });

    it('o título tem id "${id}-title" quando id é fornecido', () => {
      render(<Modal {...defaultProps} isOpen title="Título" id="meu-modal" />);
      expect(screen.getByTestId('dialog-title')).toHaveAttribute('id', 'meu-modal-title');
    });
  });

  describe('Callback onClose', () => {
    it('chama onClose ao clicar no botão de fechar', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal isOpen onClose={onClose} />);
      await user.click(screen.getByTestId('dialog-close'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('não chama onClose ao apenas renderizar o modal aberto', () => {
      const onClose = vi.fn();
      render(<Modal isOpen onClose={onClose} />);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('não chama onClose quando isOpen muda de false para true', () => {
      const onClose = vi.fn();
      const { rerender } = render(<Modal isOpen={false} onClose={onClose} />);
      rerender(<Modal isOpen={true} onClose={onClose} />);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('closeOnOverlayClick', () => {
    it('chama onClose ao interagir fora do content quando closeOnOverlayClick=true (padrão)', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal isOpen onClose={onClose} />);
      await user.click(screen.getByTestId('simulate-outside-click'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('chama onClose ao interagir fora do content quando closeOnOverlayClick=true explícito', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal isOpen onClose={onClose} closeOnOverlayClick={true} />);
      await user.click(screen.getByTestId('simulate-outside-click'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('não chama onClose ao interagir fora do content quando closeOnOverlayClick=false', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal isOpen onClose={onClose} closeOnOverlayClick={false} />);
      await user.click(screen.getByTestId('simulate-outside-click'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('customWidth', () => {
    it('aplica --modal-custom-width no style quando customWidth é fornecido', () => {
      render(<Modal {...defaultProps} isOpen customWidth="500px" />);
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveStyle({ '--modal-custom-width': '500px' });
    });

    it('não define --modal-custom-width quando customWidth não é fornecido', () => {
      render(<Modal {...defaultProps} isOpen />);
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveStyle({ '--modal-custom-width': '' });
    });
  });

  describe('customHeight', () => {
    it('aplica --modal-custom-height no style quando customHeight é fornecido', () => {
      render(<Modal {...defaultProps} isOpen customHeight="400px" />);
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveStyle({ '--modal-custom-height': '400px' });
    });

    it('não define --modal-custom-height quando customHeight não é fornecido', () => {
      render(<Modal {...defaultProps} isOpen />);
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveStyle({ '--modal-custom-height': '' });
    });

    it('aceita valor percentual em customHeight', () => {
      render(<Modal {...defaultProps} isOpen customHeight="80%" />);
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveStyle({ '--modal-custom-height': '80%' });
    });
  });

  describe('fullscreen', () => {
    it('aplica a classe ModalContent--fullscreen quando fullscreen=true', () => {
      render(<Modal {...defaultProps} isOpen fullscreen />);
      expect(screen.getByTestId('dialog-content').className).toMatch(/modalContent--fullscreen/);
    });

    it('não aplica a classe ModalContent--fullscreen quando fullscreen=false (padrão)', () => {
      render(<Modal {...defaultProps} isOpen />);
      expect(screen.getByTestId('dialog-content').className).not.toMatch(/modalContent--fullscreen/);
    });

    it('fullscreen tem prioridade: aplica a classe fullscreen mesmo com customWidth definido', () => {
      render(<Modal {...defaultProps} isOpen fullscreen customWidth="500px" />);
      const content = screen.getByTestId('dialog-content');
      expect(content.className).toMatch(/modalContent--fullscreen/);
    });
  });
});
