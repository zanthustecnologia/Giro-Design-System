import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock do Radix UI AlertDialog
vi.mock('radix-ui', () => {
  const React = require('react');

  const Root = ({ children, open: openProp, defaultOpen, ...props }: any) => {
    const open = openProp !== undefined ? openProp : (defaultOpen || false);

    return React.createElement(
      'div',
      { 'data-testid': 'alert-dialog-root', 'data-state': open ? 'open' : 'closed', ...props },
      React.Children.map(children, (child: any) =>
        React.cloneElement(child, { open })
      )
    );
  };

  const Trigger = ({ children, asChild, open, ...props }: any) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        'data-testid': 'alert-dialog-trigger'
      });
    }
    return React.createElement(
      'button',
      { 'data-testid': 'alert-dialog-trigger', ...props },
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

  const Cancel = ({ children, asChild, open, ...props }: any) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        'data-testid': 'alert-dialog-cancel'
      });
    }
    return React.createElement(
      'button',
      { 'data-testid': 'alert-dialog-cancel', ...props },
      children
    );
  };

  const Action = ({ children, asChild, open, ...props }: any) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        'data-testid': 'alert-dialog-action'
      });
    }
    return React.createElement(
      'button',
      { 'data-testid': 'alert-dialog-action', ...props },
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
import Dialog from '../Dialog';

describe('Dialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Renderização', () => {
    it('renderiza com data-state="closed" quando show=false', () => {
      render(
        <Dialog
          title="Título de teste"
          bodyContent="Texto de teste"
          textPrimaryAction="Confirmar"
          show={false}
        />
      );

      const root = screen.getByTestId('alert-dialog-root');
      expect(root).toHaveAttribute('data-state', 'closed');
    });

    it('renderiza o título quando fornecido', () => {
      render(
        <Dialog
          title="Título de teste"
          bodyContent="Texto de teste"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent('Título de teste');
    });

    it('renderiza o texto/descrição quando fornecido', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Descrição de teste"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent('Descrição de teste');
    });

    it('renderiza o bodyContent como ReactNode', () => {
      render(
        <Dialog
          title="Título"
          bodyContent={<span data-testid="custom-text">Texto customizado</span>}
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      expect(screen.getByTestId('custom-text')).toHaveTextContent('Texto customizado');
    });

    it('renderiza o botão de confirmação', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar Ação"
          show={true}
        />
      );

      expect(screen.getByText('Confirmar Ação')).toBeInTheDocument();
    });

    it('renderiza o botão de cancelamento quando textSecondaryAction é fornecido', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          textSecondaryAction="Cancelar Ação"
          show={true}
        />
      );

      expect(screen.getByText('Cancelar Ação')).toBeInTheDocument();
    });

    it('NÃO renderiza o botão de cancelamento quando textSecondaryAction não é fornecido', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      expect(screen.queryByTestId('alert-dialog-cancel')).not.toBeInTheDocument();
    });

    it('NÃO renderiza o botão de cancelamento quando textSecondaryAction é string vazia', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          textSecondaryAction=""
          show={true}
        />
      );

      expect(screen.queryByTestId('alert-dialog-cancel')).not.toBeInTheDocument();
    });

    it('NÃO renderiza o botão de cancelamento quando textSecondaryAction é apenas espaços em branco', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          textSecondaryAction="   "
          show={true}
        />
      );

      expect(screen.queryByTestId('alert-dialog-cancel')).not.toBeInTheDocument();
    });

    it('renderiza o overlay', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      expect(screen.getByTestId('alert-dialog-overlay')).toBeInTheDocument();
    });

    it('renderiza o conteúdo do dialog dentro do portal', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      const portal = screen.getByTestId('alert-dialog-portal');
      expect(portal).toBeInTheDocument();
      expect(screen.getByTestId('alert-dialog-content')).toBeInTheDocument();
    });
  });

  describe('Interações', () => {
    it('abre o dialog quando show=true', () => {
      const { rerender } = render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          show={false}
        />
      );

      // Dialog não está aberto
      expect(screen.queryByTestId('alert-dialog-portal')).not.toBeInTheDocument();

      // Abre via prop
      rerender(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      // Dialog está aberto
      expect(screen.getByTestId('alert-dialog-portal')).toBeInTheDocument();
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('mantém o conteúdo visível com show=true', () => {
      render(
        <Dialog
          title="Título Persistente"
          bodyContent="Descrição Persistente"
          textPrimaryAction="OK"
          textSecondaryAction="Fechar"
          show={true}
        />
      );

      expect(screen.getByText('Título Persistente')).toBeInTheDocument();
      expect(screen.getByText('Descrição Persistente')).toBeInTheDocument();
      expect(screen.getByText('OK')).toBeInTheDocument();
      expect(screen.getByText('Fechar')).toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('possui role="alertdialog" no conteúdo', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('renderiza o título como heading', () => {
      render(
        <Dialog
          title="Título do Dialog"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      const title = screen.getByTestId('alert-dialog-title');
      expect(title.tagName).toBe('H2');
    });
  });

  describe('Props e Customização', () => {
    it('aceita props adicionais via restProps', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction="Confirmar"
          data-custom-prop="valor-customizado"
          show={false}
        />
      );

      const root = screen.getByTestId('alert-dialog-root');
      expect(root).toHaveAttribute('data-custom-prop', 'valor-customizado');
    });

    it('funciona sem título', () => {
      render(
        <Dialog
          bodyContent="Apenas texto"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      const title = screen.getByTestId('alert-dialog-title');
      expect(title).toBeEmptyDOMElement();
    });

    it('funciona sem bodyContent', () => {
      render(
        <Dialog
          show={true}
          title="Apenas título"
          textPrimaryAction="Confirmar"
        />
      );

      const description = screen.getByTestId('alert-dialog-description');
      expect(description.textContent).toBe('');
    });

    it('funciona com diferentes tipos de bodyContent', () => {
      const { rerender } = render(
        <Dialog
          title="Título"
          bodyContent="Texto simples"
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent('Texto simples');

      rerender(
        <Dialog
          title="Título"
          bodyContent={<span data-testid="body-span">Conteúdo span</span>}
          textPrimaryAction="Confirmar"
          show={true}
        />
      );

      expect(screen.getByTestId('body-span')).toBeInTheDocument();
    });
  });

  describe('Casos extremos', () => {
    it('lida com textPrimaryAction vazio', () => {
      render(
        <Dialog
          title="Título"
          bodyContent="Texto"
          textPrimaryAction=""
          show={true}
        />
      );

      const actionButton = screen.getByTestId('alert-dialog-action');
      expect(actionButton).toBeEmptyDOMElement();
    });

    it('lida com strings longas no título', () => {
      const longTitle = 'Este é um título muito longo que pode quebrar o layout se não for tratado adequadamente';

      render(
        <Dialog
          title={longTitle}
          bodyContent="Texto"
          textPrimaryAction="OK"
          show={true}
        />
      );

      expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent(longTitle);
    });

    it('lida com conteúdo complexo no bodyContent', () => {
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
          bodyContent={complexContent}
          textPrimaryAction="OK"
          show={true}
        />
      );

      expect(screen.getByText('Parágrafo 1')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});
