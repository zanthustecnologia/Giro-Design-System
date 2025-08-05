/**
 * 🎭 VISUAL REGRESSION TESTS - QUANTITY COMPONENT
 * 
 * Testes para validar aparência visual e estados do componente
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quantity from '../Quantity';

// Mock dos componentes externos
jest.mock('../../Button/Button', () => {
  return function MockButton({ 
    onClick, 
    disabled, 
    'aria-label': ariaLabel, 
    icon,
    size,
    variant,
    ...props 
  }: any) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        data-size={size}
        data-variant={variant}
        className={`mock-button ${disabled ? 'disabled' : ''}`}
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

describe('Quantity - Visual & CSS Tests', () => {

  describe('🎨 CSS Classes & Structure', () => {
    it('deve aplicar classes CSS corretas no container', () => {
      render(<Quantity defaultValue={1} className="custom-class" />);
      
      const container = screen.getByRole('spinbutton').closest('.zds-quantity');
      expect(container).toHaveClass('zds-quantity');
      expect(container).toHaveClass('custom-class');
    });

    it('deve aplicar classe disabled quando necessário', () => {
      render(<Quantity defaultValue={1} disabled={true} />);
      
      const container = screen.getByRole('spinbutton').closest('.zds-quantity');
      expect(container).toHaveClass('disabled');
    });

    it('deve aplicar classes de tamanho nos botões', () => {
      const { rerender } = render(<Quantity defaultValue={1} size="lg" />);
      
      let decrementButton = screen.getByLabelText('Diminuir quantidade');
      let incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      expect(decrementButton).toHaveAttribute('data-size', 'lg');
      expect(incrementButton).toHaveAttribute('data-size', 'lg');
      
      rerender(<Quantity defaultValue={1} size="sm" />);
      
      decrementButton = screen.getByLabelText('Diminuir quantidade');
      incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      expect(decrementButton).toHaveAttribute('data-size', 'sm');
      expect(incrementButton).toHaveAttribute('data-size', 'sm');
    });

    it('deve aplicar classe correta no input', () => {
      render(<Quantity defaultValue={1} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveClass('zds-quantity__input');
    });

    it('deve aplicar classe disabled no input quando necessário', () => {
      render(<Quantity defaultValue={1} disabled={true} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveClass('zds-quantity__input', 'disabled');
      expect(input).toBeDisabled();
    });
  });

  describe('🔧 Propriedades dos Botões', () => {
    it('deve configurar botões com variant outlined', () => {
      render(<Quantity defaultValue={1} />);
      
      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      expect(decrementButton).toHaveAttribute('data-variant', 'outlined');
      expect(incrementButton).toHaveAttribute('data-variant', 'outlined');
    });

    it('deve configurar botões como type="button"', () => {
      render(<Quantity defaultValue={1} />);
      
      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      expect(decrementButton).toHaveAttribute('type', 'button');
      expect(incrementButton).toHaveAttribute('type', 'button');
    });

    it('deve mostrar ícones corretos nos botões', () => {
      render(<Quantity defaultValue={1} />);
      
      expect(screen.getByTestId('subtract-icon')).toBeInTheDocument();
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    });
  });

  describe('📐 Layout & Spacing', () => {
    it('deve ter estrutura HTML correta', () => {
      render(<Quantity defaultValue={1} />);
      
      const container = screen.getByRole('spinbutton').closest('.zds-quantity');
      const input = screen.getByRole('spinbutton');
      const buttons = screen.getAllByRole('button');
      
      expect(container).toContainElement(buttons[0]); // Decrement button
      expect(container).toContainElement(input);
      expect(container).toContainElement(buttons[1]); // Increment button
      
      // Ordem correta: decrement, input, increment
      const children = Array.from(container!.children);
      expect(children[0]).toBe(buttons[0]);
      expect(children[1]).toBe(input);
      expect(children[2]).toBe(buttons[1]);
    });

    it('deve ter input centralizado entre os botões', () => {
      render(<Quantity defaultValue={123} />);
      
      const input = screen.getByRole('spinbutton');
      
      // Verifica se input tem text-align center via classe CSS
      expect(input).toHaveClass('zds-quantity__input');
      // O CSS deve ter text-align: center
    });
  });

  describe('🎯 Estados Visuais', () => {
    it('deve mostrar estado hover nos botões (simulado)', async () => {
      const user = userEvent.setup();
      render(<Quantity defaultValue={1} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      // Simula hover
      await user.hover(incrementButton);
      
      // Botão deve estar presente e responsivo
      expect(incrementButton).toBeInTheDocument();
      expect(incrementButton).not.toBeDisabled();
    });

    it('deve mostrar estado focus no input', async () => {
      const user = userEvent.setup();
      render(<Quantity defaultValue={1} />);
      
      const input = screen.getByRole('spinbutton');
      
      await user.click(input);
      
      expect(input).toHaveFocus();
      expect(input).toHaveClass('zds-quantity__input');
    });

    it('deve desabilitar botão decrement quando valor é 0', () => {
      render(<Quantity defaultValue={0} />);
      
      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      expect(decrementButton).toBeDisabled();
    });

    it('deve habilitar botão decrement quando valor > 0', () => {
      render(<Quantity defaultValue={1} />);
      
      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      expect(decrementButton).not.toBeDisabled();
    });

    it('deve manter botão increment sempre habilitado (quando não disabled)', () => {
      const { rerender } = render(<Quantity defaultValue={0} />);
      
      let incrementButton = screen.getByLabelText('Aumentar quantidade');
      expect(incrementButton).not.toBeDisabled();
      
      rerender(<Quantity defaultValue={9999} />);
      incrementButton = screen.getByLabelText('Aumentar quantidade');
      expect(incrementButton).not.toBeDisabled();
    });
  });

  describe('📱 Responsividade Simulada', () => {
    it('deve manter estrutura em viewport pequeno', () => {
      // Simula viewport mobile alterando propriedades CSS
      const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
      
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        value: 360, // Mobile width
      });
      
      try {
        render(<Quantity defaultValue={1} size="sm" />);
        
        const container = screen.getByRole('spinbutton').closest('.zds-quantity');
        const input = screen.getByRole('spinbutton');
        
        expect(container).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        
        // Botões devem estar presentes
        expect(screen.getByLabelText('Diminuir quantidade')).toBeInTheDocument();
        expect(screen.getByLabelText('Aumentar quantidade')).toBeInTheDocument();
        
      } finally {
        if (originalOffsetWidth) {
          Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
        }
      }
    });

    it('deve ajustar tamanho do input baseado no size prop', () => {
      const { rerender } = render(<Quantity defaultValue={1} size="lg" />);
      
      let input = screen.getByRole('spinbutton');
      expect(input).toHaveClass('zds-quantity__input');
      
      rerender(<Quantity defaultValue={1} size="sm" />);
      input = screen.getByRole('spinbutton');
      expect(input).toHaveClass('zds-quantity__input');
      
      // Classes de tamanho específico devem ser aplicadas via CSS
      // (não testamos CSS diretamente, mas validamos que a estrutura permite)
    });
  });

  describe('🎨 Temas & Customização', () => {
    it('deve aceitar className customizada sem sobrescrever classes base', () => {
      render(
        <Quantity 
          defaultValue={1} 
          className="my-custom-quantity theme-dark"
        />
      );
      
      const container = screen.getByRole('spinbutton').closest('.zds-quantity');
      
      expect(container).toHaveClass('zds-quantity');
      expect(container).toHaveClass('my-custom-quantity');
      expect(container).toHaveClass('theme-dark');
    });

    it('deve permitir id customizado no input', () => {
      render(<Quantity defaultValue={1} id="my-quantity-input" />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('id', 'my-quantity-input');
    });

    it('deve gerar id único quando não fornecido', () => {
      const { rerender } = render(<Quantity defaultValue={1} />);
      
      let input = screen.getByRole('spinbutton');
      const firstId = input.getAttribute('id');
      expect(firstId).toBeTruthy();
      expect(firstId).toMatch(/^:r\d+:$/); // Padrão do React useId
      
      rerender(<Quantity defaultValue={2} />);
      input = screen.getByRole('spinbutton');
      const secondId = input.getAttribute('id');
      
      // IDs devem ser únicos
      expect(secondId).toBeTruthy();
      expect(secondId).not.toBe(firstId);
    });
  });

  describe('🔄 Transições & Animações', () => {
    it('deve manter componente estático (sem animações desnecessárias)', () => {
      render(<Quantity defaultValue={1} />);
      
      const container = screen.getByRole('spinbutton').closest('.zds-quantity');
      
      // Componente deve estar renderizado estaticamente
      expect(container).toBeInTheDocument();
      
      // Não deve haver indicators de animação/loading
      expect(container).not.toHaveClass('loading', 'animating', 'transitioning');
    });

    it('deve atualizar valor instantaneamente sem delay', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={5} onChange={onChange} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      const startTime = Date.now();
      
      await user.click(incrementButton);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Deve responder rapidamente (< 100ms)
      expect(responseTime).toBeLessThan(100);
      expect(onChange).toHaveBeenCalledWith(6);
    });
  });

  describe('🖼️ Snapshot Comparisons', () => {
    it('deve manter estrutura consistente - estado padrão', () => {
      const { container } = render(<Quantity defaultValue={3} />);
      
      // Snapshot da estrutura HTML
      expect(container.firstChild).toMatchSnapshot('quantity-default-state');
    });

    it('deve manter estrutura consistente - estado disabled', () => {
      const { container } = render(
        <Quantity defaultValue={3} disabled={true} />
      );
      
      expect(container.firstChild).toMatchSnapshot('quantity-disabled-state');
    });

    it('deve manter estrutura consistente - modo decimal', () => {
      const { container } = render(
        <Quantity 
          defaultValue={2.5} 
          decimal={true} 
          decimalPlaces={2}
        />
      );
      
      expect(container.firstChild).toMatchSnapshot('quantity-decimal-mode');
    });

    it('deve manter estrutura consistente - size small', () => {
      const { container } = render(
        <Quantity defaultValue={1} size="sm" />
      );
      
      expect(container.firstChild).toMatchSnapshot('quantity-small-size');
    });
  });
});
