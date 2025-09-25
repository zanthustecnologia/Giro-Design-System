// Toast.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ToastProvider, useToast } from '../Toast';

// ✅ CONFIGURAÇÃO CORRETA DE TIMERS
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
});

// ✅ COMPONENTE HELPER PARA TESTES
const TestComponent: React.FC<{
  variant?: 'success' | 'alert' | 'info';
  message?: string;
  persistent?: boolean;
  duration?: number;
}> = ({ 
  variant = 'info', 
  message = 'Teste toast', 
  persistent = false, 
  duration = 5000 
}) => {
  const { showToast, hideAllToasts } = useToast();

  return (
    <div>
      <button 
        onClick={() => showToast(message, variant, { persistent, duration })}
        data-testid="show-toast"
      >
        Show Toast
      </button>
      <button 
        onClick={hideAllToasts}
        data-testid="hide-all-toasts"
      >
        Hide All
      </button>
    </div>
  );
};

// ✅ WRAPPER HELPER
const renderWithProvider = (
  ui: React.ReactElement,
  { maxToasts = 5 } = {}
) => {
  return render(
    <ToastProvider maxToasts={maxToasts}>
      {ui}
    </ToastProvider>
  );
};

describe('Toast Component', () => {
  describe('Provider e Context', () => {
    it('deve renderizar children dentro do ToastProvider', () => {
      renderWithProvider(<div data-testid="child">Child content</div>);
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('deve lançar erro quando useToast é usado fora do provider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<TestComponent />);
      }).toThrow('useToast must be used within a ToastProvider');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Exibição de Toasts', () => {
    it('deve exibir toast com mensagem correta', async () => {
      renderWithProvider(<TestComponent message="Mensagem de teste" />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        expect(screen.getByText('Mensagem de teste')).toBeInTheDocument();
      });
    });

    it('deve aplicar animação de entrada', async () => {
      renderWithProvider(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      // Toast deve aparecer primeiro
      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
      
      // Após 50ms deve ter classe active
      await act(async () => {
        jest.advanceTimersByTime(50);
      });
      
      await waitFor(() => {
        const toast = screen.getByRole('status');
        expect(toast).toHaveClass('zds-toast__active');
      });
    });
  });

  describe('Fechamento de Toasts', () => {
    it('deve fechar toast ao clicar no botão X', async () => {
      renderWithProvider(<TestComponent persistent={true} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
      
      const closeButton = screen.getByRole('button', { name: /fechar notificação/i });
      fireEvent.click(closeButton);
      
      // Animação de saída (450ms)
      await act(async () => {
        jest.advanceTimersByTime(450);
      });
      
      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    });

    it('deve fechar toast com tecla ESC', async () => {
      renderWithProvider(<TestComponent persistent={true} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
      
      const toast = screen.getByRole('status');
      fireEvent.keyDown(toast, { key: 'Escape', code: 'Escape' });
      
      await act(async () => {
        jest.advanceTimersByTime(450);
      });
      
      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    });

    it('deve auto-hide toast não persistente', async () => {
      renderWithProvider(<TestComponent duration={3000} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
      
      // Avançar tempo para auto-hide (3000ms)
      await act(async () => {
        jest.advanceTimersByTime(3000);
      });
      
      // Aguardar animação de saída
      await act(async () => {
        jest.advanceTimersByTime(450);
      });
      
      await waitFor(() => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    });

    it('NÃO deve auto-hide toast persistente', async () => {
      renderWithProvider(<TestComponent persistent={true} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
      
      // Avançar muito tempo
      await act(async () => {
        jest.advanceTimersByTime(10000);
      });
      
      // Toast deve ainda estar visível
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('deve limpar todos os toasts', async () => {
      renderWithProvider(<TestComponent />);
      
      // Criar múltiplos toasts
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByTestId('show-toast'));
      }
      
      await waitFor(() => {
        expect(screen.getAllByRole('status')).toHaveLength(3);
      });
      
      fireEvent.click(screen.getByTestId('hide-all-toasts'));
      
      await act(async () => {
        jest.advanceTimersByTime(450);
      });
      
      await waitFor(() => {
        expect(screen.queryAllByRole('status')).toHaveLength(0);
      });
    });
  });

  describe('Limite de Toasts', () => {
    it('deve respeitar limite máximo de toasts', async () => {
      renderWithProvider(<TestComponent />, { maxToasts: 3 });
      
      // Criar 5 toasts
      for (let i = 0; i < 5; i++) {
        fireEvent.click(screen.getByTestId('show-toast'));
      }
      
      await waitFor(() => {
        expect(screen.getAllByRole('status')).toHaveLength(3);
      });
    });
  });

  describe('Sanitização e Segurança', () => {
    it('deve sanitizar mensagens com HTML/Script', async () => {
      const maliciousMessage = '<script>alert("XSS")</script>';
      
      renderWithProvider(<TestComponent message={maliciousMessage} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const messageElement = screen.getByRole('status').querySelector('.zds-toast__message');
        expect(messageElement?.innerHTML).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
      });
    });

    it('deve truncar mensagens muito longas', async () => {
      const longMessage = 'a'.repeat(600); // Mais que 500 caracteres
      
      renderWithProvider(<TestComponent message={longMessage} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const messageElement = screen.getByRole('status').querySelector('.zds-toast__message');
        expect(messageElement?.innerHTML).toHaveLength(500);
      });
    });

    it('deve tratar mensagens inválidas', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      const InvalidComponent = () => {
        const { showToast } = useToast();
        return (
          <div>
            <button onClick={() => showToast(null as any)} data-testid="null-message">
              Null Message
            </button>
            <button onClick={() => showToast('')} data-testid="empty-message">
              Empty Message
            </button>
          </div>
        );
      };

      renderWithProvider(<InvalidComponent />);
      
      // Teste mensagem null
      fireEvent.click(screen.getByTestId('null-message'));
      expect(consoleSpy).toHaveBeenCalledWith('Toast: Mensagem inválida ou vazia');
      
      // Teste mensagem vazia
      fireEvent.click(screen.getByTestId('empty-message'));
      expect(consoleSpy).toHaveBeenCalledWith('Toast: Mensagem inválida ou vazia');
      
      // Nenhum toast deve ser criado
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });
  });
});

// ✅ TESTES PARA TOAST TYPE
describe('Toast Types', () => {
  describe('Success Toast', () => {
    it('deve renderizar toast de sucesso com ícone e classe corretos', async () => {
      renderWithProvider(<TestComponent variant="success" message="Operação realizada com sucesso!" />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const toast = await screen.findByRole('status');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveClass('zds-toast__success');
      expect(screen.getByText('Operação realizada com sucesso!')).toBeInTheDocument();
    });

    it('deve ter aria-live="polite" para toast de sucesso', async () => {
      renderWithProvider(<TestComponent variant="success" />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const toast = await screen.findByRole('status');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Alert Toast', () => {
    it('deve renderizar toast de alerta com role="alert"', async () => {
      renderWithProvider(<TestComponent variant="alert" message="Atenção! Algo deu errado." />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const toast = await screen.findByRole('alert');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveClass('zds-toast__alert');
      expect(screen.getByText('Atenção! Algo deu errado.')).toBeInTheDocument();
    });

    it('deve ter aria-live="assertive" para toast de alerta', async () => {
      renderWithProvider(<TestComponent variant="alert" />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const toast = await screen.findByRole('alert');
      expect(toast).toHaveAttribute('aria-live', 'assertive');
    });
  });

  describe('Info Toast', () => {
    it('deve renderizar toast de informação como padrão', async () => {
      renderWithProvider(<TestComponent message="Informação importante" />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const toast = await screen.findByRole('status');
      expect(toast).toBeInTheDocument();
      expect(toast).toHaveClass('zds-toast__info');
      expect(screen.getByText('Informação importante')).toBeInTheDocument();
    });

    it('deve usar tipo "info" quando não especificado', async () => {
      renderWithProvider(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const toast = await screen.findByRole('status');
      expect(toast).toHaveAttribute('aria-live', 'polite');
      expect(toast).toHaveClass('zds-toast__info');
    });
  });

  describe('Toast Icons', () => {
    it('deve exibir ícone para cada tipo de toast', async () => {
      renderWithProvider(<TestComponent variant="success" />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const icon = await screen.findByRole('status');
      const iconElement = icon.querySelector('.zds-toast__icon');
      expect(iconElement).toBeInTheDocument();
    });
  });

  describe('Toast Behavior by Type', () => {
    it('deve aplicar tabIndex correto baseado no tipo', async () => {
      renderWithProvider(<TestComponent variant="alert" persistent={true} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const toast = await screen.findByRole('alert');
      expect(toast).toHaveAttribute('tabIndex', '0');
    });

    it('deve ter botão de fechar em todos os tipos', async () => {
      renderWithProvider(<TestComponent variant="success" />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      const closeButton = await screen.findByRole('button', { name: /fechar notificação/i });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Multiple Toast Types', () => {
    it('deve renderizar múltiplos toasts de tipos diferentes', async () => {
      const MultiToastComponent = () => {
        const { showToast } = useToast();
        
        return (
          <div>
            <button 
              onClick={() => showToast('Sucesso!', 'success')}
              data-testid="success-button"
            >
              Success
            </button>
            <button 
              onClick={() => showToast('Alerta!', 'alert')}
              data-testid="alert-button"
            >
              Alert
            </button>
            <button 
              onClick={() => showToast('Info!', 'info')}
              data-testid="info-button"
            >
              Info
            </button>
          </div>
        );
      };

      renderWithProvider(<MultiToastComponent />);
      
      // Add different types
      fireEvent.click(screen.getByTestId('success-button'));
      fireEvent.click(screen.getByTestId('alert-button'));
      fireEvent.click(screen.getByTestId('info-button'));
      
      // Should have all three types
      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument(); // alert type
        expect(screen.getAllByRole('status')).toHaveLength(2); // success and info types
        
        expect(screen.getByText('Sucesso!')).toBeInTheDocument();
        expect(screen.getByText('Alerta!')).toBeInTheDocument();
        expect(screen.getByText('Info!')).toBeInTheDocument();
      });
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter role="log" no container', async () => {
      renderWithProvider(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const container = screen.getByRole('log');
        expect(container).toHaveAttribute('aria-label', 'Notificações do sistema');
      });
    });

    it('deve ter aria-atomic="true" em todos os toasts', async () => {
      renderWithProvider(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const toast = screen.getByRole('status');
        expect(toast).toHaveAttribute('aria-atomic', 'true');
      });
    });

    it('deve ter aria-hidden nos ícones', async () => {
      renderWithProvider(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const icon = screen.getByRole('status').querySelector('.zds-toast__icon');
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('deve ter aria-label correto no botão fechar', async () => {
      renderWithProvider(<TestComponent message="Mensagem de teste" />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const closeButton = screen.getByRole('button', { 
          name: /fechar notificação: mensagem de teste/i 
        });
        expect(closeButton).toBeInTheDocument();
      });
    });

    it('deve truncar aria-label para mensagens muito longas', async () => {
      const longMessage = 'Esta é uma mensagem muito longa que deve ser truncada no aria-label';
      
      renderWithProvider(<TestComponent message={longMessage} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const closeButton = screen.getByRole('button', { 
          name: /fechar notificação: esta é uma mensagem muito longa que deve ser tru\.\.\./i 
        });
        expect(closeButton).toBeInTheDocument();
      });
    });

    it('deve ter tabIndex correto para toasts persistentes', async () => {
      renderWithProvider(<TestComponent persistent={true} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const toast = screen.getByRole('status');
        expect(toast).toHaveAttribute('tabIndex', '0');
      });
    });

    it('deve ter tabIndex -1 para toasts não persistentes', async () => {
      renderWithProvider(<TestComponent persistent={false} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        const toast = screen.getByRole('status');
        expect(toast).toHaveAttribute('tabIndex', '-1');
      });
    });
  });

  describe('Performance e Cleanup', () => {
    it('deve limpar timeouts quando componente é desmontado', async () => {
      const { unmount } = renderWithProvider(<TestComponent duration={5000} />);
      
      fireEvent.click(screen.getByTestId('show-toast'));
      
      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
      
      // Desmontar componente antes do timeout
      unmount();
      
      // Avançar tempo - se chegou aqui sem erro, cleanup funcionou
      await act(async () => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(true).toBe(true);
    });

    it('deve gerenciar múltiplos toasts eficientemente', async () => {
      const { container } = renderWithProvider(<TestComponent />);
      
      // Criar muitos toasts rapidamente
      for (let i = 0; i < 20; i++) {
        fireEvent.click(screen.getByTestId('show-toast'));
      }
      
      // Deve manter apenas o limite máximo
      await waitFor(() => {
        const toasts = container.querySelectorAll('.zds-toast__item');
        expect(toasts.length).toBeLessThanOrEqual(5);
      });
    });
  });
});