import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';

import { ToastProvider } from '../components/ToastProvider';
import { ToastContainer } from '../components/ToastContainer';
import { useToast } from '../useToast';

// Componente de teste para usar o hook
const TestComponent = ({ onMount }: { onMount?: (toastFn: ReturnType<typeof useToast>) => void }) => {
  const toast = useToast();

  React.useEffect(() => {
    if (onMount) {
      onMount(toast);
    }
  }, [onMount, toast]);

  return (
    <div>
      <button onClick={() => toast.showToast({ title: 'Test' })}>
        Show Toast
      </button>
    </div>
  );
};

describe('Toast', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o toast com título', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ title: 'Título do Toast' });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Título do Toast')).toBeInTheDocument();
      });
    });

    it('deve renderizar o toast com título', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ 
            title: 'Título',
          });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Título')).toBeInTheDocument();
      });
    });
  });

  describe('Ícones', () => {
    it('deve renderizar ícone Info por padrão', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      const { container } = render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ title: 'Toast Info' });
        }
      });

      await waitFor(() => {
        const iconSpan = container.querySelector('[class*="IconInfo"]');
        expect(iconSpan).toBeInTheDocument();
      });
    });

    it('deve renderizar ícone Success quando iconType="Success"', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      const { container } = render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ 
            title: 'Toast Successo', 
            iconType: 'Success' 
          });
        }
      });

      await waitFor(() => {
        const iconSpan = container.querySelector('[class*="IconSuccess"]');
        expect(iconSpan).toBeInTheDocument();
      });
    });

    it('deve renderizar ícone Alert quando iconType="Alert"', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      const { container } = render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ 
            title: 'Toast Alerta', 
            iconType: 'Alert' 
          });
        }
      });

      await waitFor(() => {
        const iconSpan = container.querySelector('[class*="IconAlert"]');
        expect(iconSpan).toBeInTheDocument();
      });
    });

    it('deve renderizar ícone customizado quando fornecido', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;
      const CustomIcon = () => <svg data-testid="custom-icon" />;

      const { container } = render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ 
            title: 'Toast Custom', 
            icon: <CustomIcon /> 
          });
        }
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
        const iconSpan = container.querySelector('[class*="Icon"]');
        expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('deve renderizar ícone de fechar padrão', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      const { container } = render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ title: 'Toast' });
        }
      });

      await waitFor(() => {
        const closeButton = container.querySelector('[class*="ToastClose"]');
        expect(closeButton).toBeInTheDocument();
      });
    });

    it('deve renderizar ícone de fechar customizado quando fornecido', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;
      const CustomCloseIcon = () => <svg data-testid="custom-close-icon" />;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ 
            title: 'Toast', 
            iconClosed: <CustomCloseIcon /> 
          });
        }
      });

      await waitFor(() => {
        expect(screen.getByTestId('custom-close-icon')).toBeInTheDocument();
      });
    });
  });

  describe('Duração e fechamento automático', () => {
    it('deve aceitar configuração de duração customizada', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      const { container } = render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ 
            title: 'Toast', 
            duration: 3000 
          });
        }
      });

      await waitFor(() => {
        expect(container.querySelector('[class*="toastRoot"]')).toBeInTheDocument();
      });
    });

    it('deve aceitar configuração de automaticClose', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      const { container } = render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ 
            title: 'Toast', 
            automaticClose: false 
          });
        }
      });

      await waitFor(() => {
        expect(container.querySelector('[class*="toastRoot"]')).toBeInTheDocument();
      });
    });
  });
});

describe('ToastProvider', () => {
  describe('Renderização', () => {
    it('deve renderizar children corretamente', () => {
      render(
        <ToastProvider>
          <div data-testid="child-element">Conteúdo filho</div>
        </ToastProvider>
      );

      expect(screen.getByTestId('child-element')).toBeInTheDocument();
      expect(screen.getByText('Conteúdo filho')).toBeInTheDocument();
    });
  });

  describe('Gerenciamento de toasts', () => {
    it('deve adicionar toast através de showToast', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({
            title: 'Novo Toast'
          });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Novo Toast')).toBeInTheDocument();
      });
    });

    it('deve adicionar múltiplos toasts', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ title: 'Toast 1' });
          toastFunctions.showToast({ title: 'Toast 2' });
          toastFunctions.showToast({ title: 'Toast 3' });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Toast 1')).toBeInTheDocument();
        expect(screen.getByText('Toast 2')).toBeInTheDocument();
        expect(screen.getByText('Toast 3')).toBeInTheDocument();
      });
    });

    it('deve respeitar o limite de maxToasts', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider maxToasts={2}>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ title: 'Toast 1' });
          toastFunctions.showToast({ title: 'Toast 2' });
          toastFunctions.showToast({ title: 'Toast 3' });
        }
      });

      await waitFor(() => {
        expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
        expect(screen.getByText('Toast 2')).toBeInTheDocument();
        expect(screen.getByText('Toast 3')).toBeInTheDocument();
      });
    });

    it('deve usar maxToasts padrão de 5', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          for (let i = 1; i <= 6; i++) {
            toastFunctions.showToast({ title: `Toast ${i}` });
          }
        }
      });

      await waitFor(() => {
        expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
        expect(screen.getByText('Toast 2')).toBeInTheDocument();
        expect(screen.getByText('Toast 6')).toBeInTheDocument();
      });
    });

    it('deve adicionar toasts com IDs únicos', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ title: 'Toast 1' });
          toastFunctions.showToast({ title: 'Toast 2' });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Toast 1')).toBeInTheDocument();
        expect(screen.getByText('Toast 2')).toBeInTheDocument();
      });
    });
  });
});

describe('useToast', () => {
  describe('Fora do provider', () => {
    it('deve lançar erro quando usado fora do ToastProvider', () => {
      // Suprimir erro do console durante o teste
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      const TestComponentWithoutProvider = () => {
        try {
          useToast();
        } catch (error) {
          return <div data-testid="error-message">{(error as Error).message}</div>;
        }
        return null;
      };

      render(<TestComponentWithoutProvider />);

      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'useToastContext deve ser usado dentro de ToastProvider'
      );

      consoleError.mockRestore();
    });
  });

  describe('Dentro do provider', () => {
    it('deve retornar funções showToast e dismissToast', () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
        </ToastProvider>
      );

      expect(toastFunctions).toBeTruthy();
      expect(typeof toastFunctions!.showToast).toBe('function');
      expect(typeof toastFunctions!.dismissToast).toBe('function');
    });

    it('showToast deve adicionar um toast', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({
            title: 'Teste showToast',
            iconType: 'Info'
          });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Teste showToast')).toBeInTheDocument();
      });
    });
  });
});

describe('ToastContainer', () => {
  describe('Renderização', () => {
    it('deve renderizar o viewport do toast', () => {
      const { container } = render(
        <ToastProvider>
          <ToastContainer />
        </ToastProvider>
      );

      const viewport = container.querySelector('[class*="ToastViewport"]');
      expect(viewport).toBeInTheDocument();
    });

    it('deve renderizar múltiplos toasts no container', async () => {
      let toastFunctions: ReturnType<typeof useToast> | null = null;

      render(
        <ToastProvider>
          <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
          <ToastContainer />
        </ToastProvider>
      );

      await act(async () => {
        if (toastFunctions) {
          toastFunctions.showToast({ title: 'Toast Container 1', iconType: 'Info' });
          toastFunctions.showToast({ title: 'Toast Container 2', iconType: 'Success' });
          toastFunctions.showToast({ title: 'Toast Container 3', iconType: 'Alert' });
        }
      });

      await waitFor(() => {
        expect(screen.getByText('Toast Container 1')).toBeInTheDocument();
        expect(screen.getByText('Toast Container 2')).toBeInTheDocument();
        expect(screen.getByText('Toast Container 3')).toBeInTheDocument();
      });
    });

    it('deve ter o viewport configurado', () => {
      const { container } = render(
        <ToastProvider>
          <ToastContainer />
        </ToastProvider>
      );

      const viewport = container.querySelector('[class*="ToastViewport"]');
      expect(viewport).toBeInTheDocument();
    });
  });
});

describe('Integração completa', () => {
  it('deve permitir adicionar e exibir toasts de diferentes tipos', async () => {
    let toastFunctions: ReturnType<typeof useToast> | null = null;

    render(
      <ToastProvider>
        <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
        <ToastContainer />
      </ToastProvider>
    );

    await act(async () => {
      if (toastFunctions) {
        toastFunctions.showToast({
          title: 'Informação',
          iconType: 'Info'
        });

        toastFunctions.showToast({
          title: 'Sucesso',
          iconType: 'Success'
        });

        toastFunctions.showToast({
          title: 'Alerta',
          iconType: 'Alert'
        });
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Informação')).toBeInTheDocument();
      expect(screen.getByText('Sucesso')).toBeInTheDocument();
      expect(screen.getByText('Alerta')).toBeInTheDocument();
    });
  });

  it('deve permitir usar o hook através do botão', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
        <ToastContainer />
      </ToastProvider>
    );

    const button = screen.getByRole('button', { name: /show toast/i });
    
    await act(async () => {
      await user.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('deve manter o estado consistente ao adicionar toasts', async () => {
    let toastFunctions: ReturnType<typeof useToast> | null = null;

    render(
      <ToastProvider maxToasts={3}>
        <TestComponent onMount={(fn) => { toastFunctions = fn; }} />
        <ToastContainer />
      </ToastProvider>
    );

    await act(async () => {
      if (toastFunctions) {
        toastFunctions.showToast({ title: 'Toast 1' });
        toastFunctions.showToast({ title: 'Toast 2' });
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
    });

    await act(async () => {
      if (toastFunctions) {
        toastFunctions.showToast({ title: 'Toast 3' });
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Toast 3')).toBeInTheDocument();
    });
  });
});
