import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, toast, useToast } from '../Toast';

// Mock dos ícones para evitar problemas de import
jest.mock('@fluentui/react-icons', () => ({
  CheckmarkCircle20Filled: () => <div data-testid="success-icon">✓</div>,
  Warning20Filled: () => <div data-testid="alert-icon">⚠</div>,
  Info20Filled: () => <div data-testid="info-icon">ℹ</div>,
  Dismiss16Regular: () => <div data-testid="close-icon">✕</div>,
}));

// Helper component para testar hooks
const TestComponent: React.FC<{ onToast?: () => void }> = ({ onToast }) => {
  const { toast: contextToast } = useToast();
  
  return (
    <div>
      <button 
        onClick={() => contextToast('Test message', 'info')}
        data-testid="toast-trigger"
      >
        Trigger Toast
      </button>
      {onToast && (
        <button onClick={onToast} data-testid="external-toast">
          External Toast
        </button>
      )}
    </div>
  );
};

describe('Toast Component', () => {
  beforeEach(() => {
    // Limpar timers antes de cada teste
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restaurar timers e limpar DOM
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    
    // Limpar event listeners
    const events = ['toast', 'zds-toast-event'];
    events.forEach(event => {
      window.removeEventListener(event as any, () => {});
    });
  });

  describe('Renderização Básica', () => {
    it('deve renderizar ToastProvider sem erros', () => {
      render(
        <ToastProvider>
          <div>Test content</div>
        </ToastProvider>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('deve renderizar container de toast com classes corretas', () => {
      render(
        <ToastProvider>
          <div>Content</div>
        </ToastProvider>
      );

      const container = document.querySelector('.zds-toast__container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute('role', 'status');
      expect(container).toHaveAttribute('aria-live', 'polite');
    });

    it('deve exibir toast com mensagem inicial via props', () => {
      render(
        <ToastProvider message="Initial message" variant="info">
          <div>Content</div>
        </ToastProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.getByText('Initial message')).toBeInTheDocument();
    });
  });

  describe('Funcionalidade de Toast', () => {
    it('deve criar toast usando hook useToast', async () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      const triggerButton = screen.getByTestId('toast-trigger');
      fireEvent.click(triggerButton);

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('deve criar toast usando função global', async () => {
      render(
        <ToastProvider>
          <TestComponent onToast={() => toast('Global toast', 'success')} />
        </ToastProvider>
      );

      const externalButton = screen.getByTestId('external-toast');
      fireEvent.click(externalButton);

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(screen.getByText('Global toast')).toBeInTheDocument();
    });

    it('deve exibir ícone correto para cada tipo de toast', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      // Toast success
      act(() => {
        toast('Success message', 'success');
        jest.advanceTimersByTime(200);
      });
      expect(screen.getByTestId('success-icon')).toBeInTheDocument();

      // Toast alert
      act(() => {
        toast('Alert message', 'alert');
        jest.advanceTimersByTime(200);
      });
      expect(screen.getByTestId('alert-icon')).toBeInTheDocument();

      // Toast info
      act(() => {
        toast('Info message', 'info');
        jest.advanceTimersByTime(200);
      });
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('deve aplicar classes CSS corretas para cada tipo', () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      act(() => {
        toast('Success message', 'success');
        jest.advanceTimersByTime(200);
      });

      const successToast = screen.getByText('Success message').closest('.zds-toast__item');
      expect(successToast).toHaveClass('zds-toast__success');
    });
  });
});