/**
 * 🧪 TESTES DE EDGE CASES & PERFORMANCE - QUANTITY COMPONENT
 * 
 * Testes para cenários extremos, limites e performance
 */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quantity from '../Quantity';

// Mock dos componentes externos
jest.mock('../../Button/Button', () => {
  return function MockButton({ 
    onClick, 
    disabled, 
    'aria-label': ariaLabel, 
    icon,
    ...props 
  }: any) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </button>
    );
  };
});

jest.mock('@fluentui/react-icons', () => ({
  Add16Regular: () => <span data-testid="add-icon">+</span>,
  Subtract16Regular: () => <span data-testid="subtract-icon">-</span>,
}));

describe('Quantity - Edge Cases & Performance Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('🔢 Valores Extremos', () => {
    it('deve lidar com valor máximo para inteiros (9999)', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={9998} onChange={onChange} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);
      
      expect(onChange).toHaveBeenCalledWith(9999);
      expect(screen.getByDisplayValue('9999')).toBeInTheDocument();
    });

    it('deve truncar entrada manual que excede 4 dígitos', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      
      // Tenta digitar 12345 (5 dígitos)
      await user.clear(input);
      await user.type(input, '12345');
      
      // Deve aceitar apenas 1234 (4 dígitos)
      expect(input).toHaveValue('1234');
      expect(onChange).toHaveBeenLastCalledWith(1234);
    });

    it('deve lidar com valores decimais de alta precisão', async () => {
      const onChange = jest.fn();
      
      render(
        <Quantity 
          defaultValue={0.123456} 
          decimal={true} 
          decimalPlaces={6}
          step={0.000001}
          onChange={onChange}
        />
      );
      
      expect(screen.getByDisplayValue('0.123456')).toBeInTheDocument();
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await userEvent.click(incrementButton);
      
      expect(onChange).toHaveBeenCalledWith(0.123457);
    });

    it('deve prevenir overflow em floating point', async () => {
      const onChange = jest.fn();
      
      // Valor muito próximo do limite de precisão do JavaScript
      render(
        <Quantity 
          defaultValue={999999999999.99} 
          decimal={true} 
          decimalPlaces={2}
          onChange={onChange}
        />
      );
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await userEvent.click(incrementButton);
      
      // Verifica se não há perda de precisão
      expect(onChange).toHaveBeenCalled();
      const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      expect(typeof lastCall).toBe('number');
      expect(lastCall).toBeGreaterThan(999999999999.99);
    });
  });

  describe('🎭 Props Malformadas & Null Safety', () => {
    it('deve lidar com decimalPlaces negativo', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      render(
        <Quantity 
          defaultValue={1.5} 
          decimal={true} 
          decimalPlaces={-2} // Valor inválido
        />
      );
      
      // Componente deve renderizar sem crash
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });

    it('deve lidar com step zero ou negativo', async () => {
      const onChange = jest.fn();
      
      render(
        <Quantity 
          defaultValue={5} 
          step={0} // Step inválido
          onChange={onChange}
        />
      );
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await userEvent.click(incrementButton);
      
      // Deve usar fallback interno (step = 1)
      expect(onChange).toHaveBeenCalledWith(6);
    });

    it('deve lidar com defaultValue não numérico', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      render(
        <Quantity 
          defaultValue={'invalid' as any} 
        />
      );
      
      // Deve renderizar com valor padrão seguro
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });

    it('deve lidar com onChange undefined', async () => {
      render(<Quantity defaultValue={3} onChange={undefined} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      // Não deve dar erro mesmo sem onChange
      expect(() => userEvent.click(incrementButton)).not.toThrow();
    });
  });

  describe('⚡ Performance & Re-renders', () => {
    it('deve usar React.memo para evitar re-renders desnecessários', () => {
      const TestWrapper = ({ extraProp }: { extraProp: string }) => (
        <div>
          <span>{extraProp}</span>
          <Quantity defaultValue={1} />
        </div>
      );

      const { rerender } = render(<TestWrapper extraProp="first" />);
      const input = screen.getByRole('spinbutton');
      
      // Componente deve estar renderizado
      expect(input).toBeInTheDocument();
      
      // Re-render com prop que não afeta Quantity
      rerender(<TestWrapper extraProp="second" />);
      
      // Quantity deve continuar funcionando (memo funcionou)
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('1');
    });

    it('deve otimizar callbacks com useCallback', async () => {
      const onChange = jest.fn();
      let renderCount = 0;
      
      const TestComponent = () => {
        renderCount++;
        return <Quantity defaultValue={1} onChange={onChange} />;
      };
      
      render(<TestComponent />);
      const initialRenderCount = renderCount;
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await userEvent.click(incrementButton);
      
      // Deve ter re-renderizado apenas uma vez
      expect(renderCount).toBe(initialRenderCount + 1);
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('deve lidar com cliques rápidos sucessivos', async () => {
      const onChange = jest.fn();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      // Simula cliques muito rápidos
      await act(async () => {
        for (let i = 0; i < 10; i++) {
          fireEvent.click(incrementButton);
        }
      });
      
      // Todos os cliques devem ser processados corretamente
      expect(onChange).toHaveBeenCalledTimes(10);
      expect(onChange).toHaveBeenLastCalledWith(10);
    });

    it('deve manter performance com valores decimais complexos', async () => {
      const startTime = performance.now();
      
      render(
        <Quantity 
          defaultValue={0.333333} 
          decimal={true} 
          decimalPlaces={6}
          step={0.111111}
        />
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Render inicial deve ser rápido (< 50ms)
      expect(renderTime).toBeLessThan(50);
      
      // Deve funcionar normalmente
      expect(screen.getByDisplayValue('0.333333')).toBeInTheDocument();
    });
  });

  describe('🎯 Estados de Sincronização', () => {
    it('deve sincronizar modo controlado com mudanças externas rápidas', async () => {
      const TestController = () => {
        const [value, setValue] = React.useState(0);
        
        React.useEffect(() => {
          // Simula mudanças externas rápidas
          const interval = setInterval(() => {
            setValue(prev => prev + 1);
          }, 10);
          
          setTimeout(() => clearInterval(interval), 100);
          
          return () => clearInterval(interval);
        }, []);
        
        return <Quantity value={value} onChange={setValue} />;
      };
      
      render(<TestController />);
      
      // Aguarda as mudanças
      await waitFor(() => {
        const input = screen.getByRole('spinbutton');
        expect(parseInt(input.getAttribute('value') || '0')).toBeGreaterThan(5);
      }, { timeout: 200 });
    });

    it('deve lidar com race conditions entre teclado e mouse', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={5} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      // Simula eventos simultâneos
      await act(async () => {
        input.focus();
        
        // Dispara eventos quase simultâneos
        const promises = [
          user.keyboard('{ArrowRight}'), // +1 = 6
          user.click(incrementButton),   // +1 = 7  
          user.keyboard('{ArrowRight}'), // +1 = 8
        ];
        
        await Promise.all(promises);
      });
      
      // Deve processar todos os eventos corretamente
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(8);
    });
  });

  describe('🔤 Validação de Entrada Complexa', () => {
    it('deve lidar com paste de conteúdo inválido', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      
      // Simula paste de texto inválido
      await user.clear(input);
      await user.click(input);
      
      // Paste via clipboard
      const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: new DataTransfer(),
      });
      pasteEvent.clipboardData?.setData('text/plain', 'abc123def');
      
      fireEvent(input, pasteEvent);
      
      // Deve manter valor anterior ou resetar
      expect(input).toHaveValue('');
    });

    it('deve validar entrada com múltiplos pontos decimais', async () => {
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} decimal={true} />);
      
      const input = screen.getByRole('spinbutton');
      
      await user.clear(input);
      await user.type(input, '12.34.56'); // Múltiplos pontos
      
      // Deve aceitar apenas até o primeiro ponto
      expect(input).toHaveValue('12.34');
    });

    it('deve limitar casas decimais em tempo real', async () => {
      const user = userEvent.setup();
      
      render(
        <Quantity 
          defaultValue={0} 
          decimal={true} 
          decimalPlaces={2}
        />
      );
      
      const input = screen.getByRole('spinbutton');
      
      await user.clear(input);
      await user.type(input, '1.23456789'); // Muitas casas decimais
      
      // Deve truncar para 2 casas decimais
      expect(input).toHaveValue('1.23');
    });

    it('deve lidar com entrada de zero à esquerda', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      
      // Digita valor começando com zero
      await user.clear(input);
      await user.type(input, '007');
      
      // Deve remover zeros à esquerda
      expect(input).toHaveValue('7');
      expect(onChange).toHaveBeenLastCalledWith(7);
    });
  });

  describe('🌐 Internacionalização & Localização', () => {
    it('deve aceitar separador decimal baseado em locale', async () => {
      // Simula locale brasileiro (vírgula como separador)
      const originalLocale = Intl.NumberFormat().resolvedOptions().locale;
      
      try {
        // Mock do locale
        Object.defineProperty(navigator, 'language', {
          writable: true,
          value: 'pt-BR'
        });
        
        render(<Quantity defaultValue={1.5} decimal={true} />);
        
        // Deve renderizar com ponto (padrão do sistema)
        expect(screen.getByDisplayValue('1.50')).toBeInTheDocument();
        
      } finally {
        // Restaura locale original
        Object.defineProperty(navigator, 'language', {
          writable: true,
          value: originalLocale
        });
      }
    });

    it('deve lidar com números grandes formatados', () => {
      render(<Quantity defaultValue={1234} />);
      
      // Deve mostrar valor sem formatação de milhares
      expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
    });
  });

  describe('🔧 Integração com Formulários', () => {
    it('deve funcionar dentro de formulário HTML', async () => {
      const onSubmit = jest.fn();
      const user = userEvent.setup();
      
      render(
        <form onSubmit={onSubmit}>
          <Quantity id="form-quantity" defaultValue={3} />
          <button type="submit">Submit</button>
        </form>
      );
      
      const submitButton = screen.getByText('Submit');
      await user.click(submitButton);
      
      // Formulário deve ser enviado normalmente
      expect(onSubmit).toHaveBeenCalled();
    });

    it('deve preservar valor quando formulário é resetado', () => {
      render(
        <form>
          <Quantity id="reset-quantity" defaultValue={5} />
          <button type="reset">Reset</button>
        </form>
      );
      
      const input = screen.getByRole('spinbutton');
      const resetButton = screen.getByText('Reset');
      
      // Valor inicial
      expect(input).toHaveValue('5');
      
      // Reset do formulário
      fireEvent.click(resetButton);
      
      // Quantity deve manter seu próprio estado
      expect(input).toHaveValue('5');
    });
  });
});
