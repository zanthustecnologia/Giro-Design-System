import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';

// Mock do Button component se necessário
jest.mock('../../Button/Button', () => {
  return function MockButton({ children, onClick, variant, ...props }: any) {
    return (
      <button onClick={onClick} data-variant={variant} {...props}>
        {children}
      </button>
    );
  };
});

describe('Dialog Component', () => {
  const defaultProps = {
    show: true,
    title: 'Test Dialog',
    text: 'This is a test dialog',
    textOk: 'OK',
    textCancel: 'Cancel',
    fnOk: jest.fn(),
    fnCancel: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Limpar event listeners do DOM
    document.removeEventListener('keydown', jest.fn());
  });

  describe('Renderização Básica', () => {
    it('deve renderizar o dialog quando show é true', () => {
      render(<Dialog {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Dialog')).toBeInTheDocument();
      expect(screen.getByText('This is a test dialog')).toBeInTheDocument();
    });

    it('não deve renderizar o dialog quando show é false', () => {
      render(<Dialog {...defaultProps} show={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('deve renderizar título e conteúdo corretamente', () => {
      render(<Dialog {...defaultProps} />);

      const title = screen.getByText('Test Dialog');
      const content = screen.getByText('This is a test dialog');

      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });

    it('deve aplicar ID customizado quando fornecido', () => {
      render(<Dialog {...defaultProps} id="custom-dialog" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('id', 'custom-dialog');
    });

    it('deve aplicar className customizada quando fornecida', () => {
      render(<Dialog {...defaultProps} className="custom-class" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('zds-dialog', 'custom-class');
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter atributos ARIA corretos', () => {
      render(<Dialog {...defaultProps} id="test-dialog" />);

      const dialog = screen.getByRole('dialog');
      
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'zds-dialog-title-test-dialog');
      expect(dialog).toHaveAttribute('aria-describedby', 'zds-dialog-desc-test-dialog');
      expect(dialog).toHaveAttribute('tabIndex', '-1');
    });

    it('deve focar o dialog ao abrir', () => {
      render(<Dialog {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveFocus();
    });

    it('deve ter overlay com z-index correto', () => {
      render(<Dialog {...defaultProps} />);

      const overlay = document.querySelector('.zds-dialog__overlay');
      expect(overlay).toBeInTheDocument();
    });

    it('deve ter wrapper com z-index correto', () => {
      render(<Dialog {...defaultProps} />);

      const wrapper = document.querySelector('.zds-dialog__wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Botões e Ações', () => {
    it('deve renderizar botão OK com texto customizado', () => {
      render(<Dialog {...defaultProps} textOk="Confirmar" />);

      const okButton = screen.getByText('Confirmar');
      expect(okButton).toBeInTheDocument();
    });

    it('deve renderizar botão Cancel quando textCancel é fornecido', () => {
      render(<Dialog {...defaultProps} textCancel="Cancelar" />);

      const cancelButton = screen.getByText('Cancelar');
      expect(cancelButton).toBeInTheDocument();
    });

    it('não deve renderizar botão Cancel quando textCancel é string vazia', () => {
      render(<Dialog {...defaultProps} textCancel="" />);

      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });

    it('não deve renderizar botão Cancel quando textCancel é apenas espaços', () => {
      render(<Dialog {...defaultProps} textCancel="   " />);

      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });

    it('deve chamar fnOk e onClose ao clicar no botão OK', async () => {
      const user = userEvent.setup();
      const fnOk = jest.fn();
      const onClose = jest.fn();

      render(<Dialog {...defaultProps} fnOk={fnOk} onClose={onClose} />);

      const okButton = screen.getByText('OK');
      await user.click(okButton);

      expect(fnOk).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('deve chamar fnCancel e onClose ao clicar no botão Cancel', async () => {
      const user = userEvent.setup();
      const fnCancel = jest.fn();
      const onClose = jest.fn();

      render(<Dialog {...defaultProps} fnCancel={fnCancel} onClose={onClose} />);

      const cancelButton = screen.getByText('Cancel');
      await user.click(cancelButton);

      expect(fnCancel).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('deve funcionar mesmo sem fnOk definido', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(<Dialog {...defaultProps} fnOk={undefined} onClose={onClose} />);

      const okButton = screen.getByText('OK');
      await user.click(okButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('deve funcionar mesmo sem fnCancel definido', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(<Dialog {...defaultProps} fnCancel={undefined} onClose={onClose} />);

      const cancelButton = screen.getByText('Cancel');
      await user.click(cancelButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Teclado e Eventos', () => {
    it('deve fechar dialog ao pressionar Escape', () => {
      const onClose = jest.fn();
      render(<Dialog {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('deve chamar fnCancel ao pressionar Escape', () => {
      const fnCancel = jest.fn();
      const onClose = jest.fn();
      
      render(<Dialog {...defaultProps} fnCancel={fnCancel} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(fnCancel).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('não deve reagir a outras teclas', () => {
      const onClose = jest.fn();
      render(<Dialog {...defaultProps} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });
      fireEvent.keyDown(document, { key: 'Tab' });

      expect(onClose).not.toHaveBeenCalled();
    });

    it('deve remover event listener ao desmontar', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      const { unmount } = render(<Dialog {...defaultProps} />);
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });

  describe('Conteúdo Dinâmico', () => {
    it('deve renderizar texto simples', () => {
      render(<Dialog {...defaultProps} text="Simple text content" />);

      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('deve renderizar JSX como conteúdo', () => {
      const jsxContent = (
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <strong>Bold text</strong>
        </div>
      );

      render(<Dialog {...defaultProps} text={jsxContent} />);

      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
      expect(screen.getByText('Bold text')).toBeInTheDocument();
    });

    it('deve renderizar lista como conteúdo', () => {
      const listContent = (
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      );

      render(<Dialog {...defaultProps} text={listContent} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('deve lidar com conteúdo null', () => {
      render(<Dialog {...defaultProps} text={null} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('deve lidar com conteúdo undefined', () => {
      render(<Dialog {...defaultProps} text={undefined} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Estados e Props Opcionais', () => {
    it('deve usar valores padrão para textOk e textCancel', () => {
      render(
        <Dialog 
          show={true} 
          title="Test" 
          text="Content" 
        />
      );

      expect(screen.getByText('OK')).toBeInTheDocument();
      expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });

    it('deve gerar ID automático quando não fornecido', () => {
      render(<Dialog {...defaultProps} id={undefined} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('id');
      expect(dialog.id).toMatch(/^:r/); // Padrão do useId()
    });

    it('deve funcionar sem funções de callback', () => {
      render(
        <Dialog 
          show={true}
          title="Test"
          text="Content"
          fnOk={undefined}
          fnCancel={undefined}
          onClose={undefined}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Integração com Button Component', () => {
    it('deve renderizar botões com variantes corretas', () => {
      render(<Dialog {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      
      // Botão Cancel (outlined)
      expect(buttons[0]).toHaveAttribute('data-variant', 'outlined');
      
      // Botão OK (filled)
      expect(buttons[1]).toHaveAttribute('data-variant', 'filled');
    });

    it('deve manter ordem dos botões (Cancel primeiro, OK segundo)', () => {
      render(<Dialog {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      
      expect(buttons[0]).toHaveTextContent('Cancel');
      expect(buttons[1]).toHaveTextContent('OK');
    });
  });

  describe('Performance e Memory Leaks', () => {
    it('deve limpar event listeners ao trocar show para false', () => {
      const { rerender } = render(<Dialog {...defaultProps} show={true} />);
      
      rerender(<Dialog {...defaultProps} show={false} />);
      
      // Dialog não deve estar no DOM
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('deve ser re-renderizável múltiplas vezes', () => {
      const { rerender } = render(<Dialog {...defaultProps} />);
      
      rerender(<Dialog {...defaultProps} title="New Title" />);
      expect(screen.getByText('New Title')).toBeInTheDocument();
      
      rerender(<Dialog {...defaultProps} text="New Content" />);
      expect(screen.getByText('New Content')).toBeInTheDocument();
    });
  });
})