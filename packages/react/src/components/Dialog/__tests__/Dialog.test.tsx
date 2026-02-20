import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock do Radix UI AlertDialog
vi.mock('radix-ui', () => {
  const React = require('react');
  const [isOpen, setIsOpen] = [false, () => {}] as any;

  const Root = ({ children, ...props }: any) => {
    const [open, setOpen] = React.useState(props.defaultOpen || false);
    
    return React.createElement(
      'div',
      { 'data-testid': 'alert-dialog-root', 'data-state': open ? 'open' : 'closed', ...props },
      React.Children.map(children, (child: any) =>
        React.cloneElement(child, { open, setOpen })
      )
    );
  };

  const Trigger = ({ children, asChild, open, setOpen, ...props }: any) => {
    const handleClick = () => setOpen?.(true);
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, { 
        onClick: handleClick,
        'data-testid': 'alert-dialog-trigger'
      });
    }
    
    return React.createElement(
      'button',
      { onClick: handleClick, 'data-testid': 'alert-dialog-trigger', ...props },
      children
    );
  };

  const Portal = ({ children, open }: any) => {
    if (!open) return null;
    return React.createElement('div', { 'data-testid': 'alert-dialog-portal' }, children);
  };

  const Overlay = ({ className, ...props }: any) => {
    return React.createElement('div', {
      'data-testid': 'alert-dialog-overlay',
      className,
      ...props
    });
  };

  const Content = ({ children, className, ...props }: any) => {
    return React.createElement(
      'div',
      {
        role: 'alertdialog',
        'data-testid': 'alert-dialog-content',
        className,
        ...props
      },
      children
    );
  };

  const Title = ({ children, className, ...props }: any) => {
    return React.createElement(
      'h2',
      {
        'data-testid': 'alert-dialog-title',
        className,
        ...props
      },
      children
    );
  };

  const Description = ({ children, className, ...props }: any) => {
    return React.createElement(
      'p',
      {
        'data-testid': 'alert-dialog-description',
        className,
        ...props
      },
      children
    );
  };

  const Cancel = ({ children, asChild, open, setOpen, ...props }: any) => {
    const handleClick = () => setOpen?.(false);
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, { 
        onClick: handleClick,
        'data-testid': 'alert-dialog-cancel'
      });
    }
    
    return React.createElement(
      'button',
      { onClick: handleClick, 'data-testid': 'alert-dialog-cancel', ...props },
      children
    );
  };

  const Action = ({ children, asChild, open, setOpen, ...props }: any) => {
    const handleClick = () => setOpen?.(false);
    
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, { 
        onClick: handleClick,
        'data-testid': 'alert-dialog-action'
      });
    }
    
    return React.createElement(
      'button',
      { onClick: handleClick, 'data-testid': 'alert-dialog-action', ...props },
      children
    );
  };

  return {
    AlertDialog: {
      Root,
      Trigger,
      Portal,
      Overlay,
      Content,
      Title,
      Description,
      Cancel,
      Action
    }
  };
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';

describe('Dialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Renderização', () => {
    it('renderiza o trigger (children) corretamente', () => {
      render(
        <Dialog
          title="Título de teste"
          text="Texto de teste"
          textConfirm="Confirmar"
        >
          <button>Abrir Dialog</button>
        </Dialog>
      );

      expect(screen.getByText('Abrir Dialog')).toBeInTheDocument();
    });

    it('renderiza o título quando fornecido', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título de teste"
          text="Texto de teste"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent('Título de teste');
    });

    it('renderiza o texto/descrição quando fornecido', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Descrição de teste"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent('Descrição de teste');
    });

    it('renderiza o texto como ReactNode', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text={<span data-testid="custom-text">Texto customizado</span>}
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByTestId('custom-text')).toHaveTextContent('Texto customizado');
    });

    it('renderiza o botão de confirmação', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar Ação"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByText('Confirmar Ação')).toBeInTheDocument();
    });

    it('renderiza o botão de cancelamento quando textCancel é fornecido', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
          textCancel="Cancelar Ação"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByText('Cancelar Ação')).toBeInTheDocument();
    });

    it('NÃO renderiza o botão de cancelamento quando textCancel não é fornecido', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.queryByTestId('alert-dialog-cancel')).not.toBeInTheDocument();
    });

    it('NÃO renderiza o botão de cancelamento quando textCancel é string vazia', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
          textCancel=""
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.queryByTestId('alert-dialog-cancel')).not.toBeInTheDocument();
    });

    it('NÃO renderiza o botão de cancelamento quando textCancel é apenas espaços em branco', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
          textCancel="   "
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.queryByTestId('alert-dialog-cancel')).not.toBeInTheDocument();
    });

    it('renderiza o overlay', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByTestId('alert-dialog-overlay')).toBeInTheDocument();
    });

    it('renderiza o conteúdo do dialog dentro do portal', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      
      const portal = screen.getByTestId('alert-dialog-portal');
      expect(portal).toBeInTheDocument();
      expect(screen.getByTestId('alert-dialog-content')).toBeInTheDocument();
    });
  });

  describe('Interações', () => {
    it('abre o dialog quando o trigger é clicado', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
        >
          <button>Abrir Dialog</button>
        </Dialog>
      );

      // Dialog não está aberto inicialmente
      expect(screen.queryByTestId('alert-dialog-portal')).not.toBeInTheDocument();

      // Clica no trigger
      await user.click(screen.getByText('Abrir Dialog'));

      // Dialog está aberto
      expect(screen.getByTestId('alert-dialog-portal')).toBeInTheDocument();
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('mantém o conteúdo visível após abertura', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título Persistente"
          text="Descrição Persistente"
          textConfirm="OK"
          textCancel="Fechar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));

      expect(screen.getByText('Título Persistente')).toBeInTheDocument();
      expect(screen.getByText('Descrição Persistente')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
      expect(screen.getByText('Fechar')).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('possui role="alertdialog" no conteúdo', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('renderiza o título como heading', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título do Dialog"
          text="Texto"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      const title = screen.getByTestId('alert-dialog-title');
      expect(title.tagName).toBe('H2');
    });
  });

  describe('Props e Customização', () => {
    it('aceita props adicionais via restProps', () => {
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
          data-custom-prop="valor-customizado"
        >
          <button>Abrir</button>
        </Dialog>
      );

      const root = screen.getByTestId('alert-dialog-root');
      expect(root).toHaveAttribute('data-custom-prop', 'valor-customizado');
    });

    it('funciona sem título', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          text="Apenas texto"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      
      const title = screen.getByTestId('alert-dialog-title');
      expect(title).toBeEmptyDOMElement();
    });

    it('funciona sem texto/descrição', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Apenas título"
          textConfirm="Confirmar"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      
      const description = screen.getByTestId('alert-dialog-description');
      expect(description).toBeEmptyDOMElement();
    });

    it('permite diferentes tipos de children como trigger', () => {
      const { rerender } = render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
        >
          <div>Custom Trigger</div>
        </Dialog>
      );

      expect(screen.getByText('Custom Trigger')).toBeInTheDocument();

      rerender(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm="Confirmar"
        >
          <span>Span Trigger</span>
        </Dialog>
      );

      expect(screen.getByText('Span Trigger')).toBeInTheDocument();
    });
  });

  describe('Casos extremos', () => {
    it('lida com textConfirm vazio', async () => {
      const user = userEvent.setup();
      
      render(
        <Dialog
          title="Título"
          text="Texto"
          textConfirm=""
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      const actionButton = screen.getByTestId('alert-dialog-action');
      expect(actionButton).toBeEmptyDOMElement();
    });

    it('lida com strings longas no título', async () => {
      const user = userEvent.setup();
      const longTitle = 'Este é um título muito longo que pode quebrar o layout se não for tratado adequadamente';
      
      render(
        <Dialog
          title={longTitle}
          text="Texto"
          textConfirm="OK"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent(longTitle);
    });

    it('lida com conteúdo complexo no text', async () => {
      const user = userEvent.setup();
      
      const complexContent = (
        <div>
          <p>Parágrafo 1</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      );
      
      render(
        <Dialog
          title="Título"
          text={complexContent}
          textConfirm="OK"
        >
          <button>Abrir</button>
        </Dialog>
      );

      await user.click(screen.getByText('Abrir'));
      expect(screen.getByText('Parágrafo 1')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});
