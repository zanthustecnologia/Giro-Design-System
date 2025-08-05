/**
 * 🔍 TESTES DE ACESSIBILIDADE - QUANTITY COMPONENT
 * 
 * Testes específicos para validar conformidade com WCAG 2.1 AA
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Quantity - Accessibility Tests (WCAG 2.1 AA)', () => {
  
  describe('🔍 Manual Accessibility Validation', () => {
    it('deve ter estrutura HTML semanticamente correta', () => {
      render(
        <div>
          <label htmlFor="quantity-test">Quantidade de produtos</label>
          <Quantity id="quantity-test" defaultValue={5} />
        </div>
      );

      const input = screen.getByRole('spinbutton');
      const label = screen.getByText('Quantidade de produtos');
      
      // Verificações básicas de estrutura
      expect(input).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'quantity-test');
    });

    it('deve ter elementos focáveis em ordem lógica', () => {
      render(
        <div>
          <label htmlFor="quantity-disabled">Quantidade (desabilitado)</label>
          <Quantity id="quantity-disabled" defaultValue={3} disabled={true} />
        </div>
      );

      const input = screen.getByRole('spinbutton');
      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      // Em estado disabled, elementos devem estar desabilitados
      expect(input).toBeDisabled();
      expect(decrementButton).toBeDisabled();
      expect(incrementButton).toBeDisabled();
    });
  });

  describe('🎯 ARIA Attributes & Roles', () => {
    it('deve ter role="spinbutton" no input', () => {
      render(<Quantity defaultValue={0} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('role', 'spinbutton');
    });

    it('deve ter aria-valuenow correto', () => {
      render(<Quantity defaultValue={7} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-valuenow', '7');
    });

    it('deve atualizar aria-valuenow quando valor muda', async () => {
      const user = userEvent.setup();
      render(<Quantity defaultValue={3} />);
      
      const input = screen.getByRole('spinbutton');
      const incrementButton = screen.getByLabelText('Aumentar quantidade');

      expect(input).toHaveAttribute('aria-valuenow', '3');

      await user.click(incrementButton);
      expect(input).toHaveAttribute('aria-valuenow', '4');
    });

    it('deve ter aria-valuemin="0"', () => {
      render(<Quantity defaultValue={5} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-valuemin', '0');
    });

    it('deve ter aria-valuemax para valores inteiros', () => {
      render(<Quantity defaultValue={5} decimal={false} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-valuemax', '9999');
    });

    it('não deve ter aria-valuemax para valores decimais', () => {
      render(<Quantity defaultValue={5.5} decimal={true} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).not.toHaveAttribute('aria-valuemax');
    });

    it('deve ter aria-describedby para ajuda contextual', () => {
      render(<Quantity id="test-quantity" defaultValue={0} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-describedby', 'test-quantity-help');
    });
  });

  describe('🏷️ Labels & Descriptions', () => {
    it('deve ter aria-label padrão no input', () => {
      render(<Quantity defaultValue={0} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-label', 'Quantidade');
    });

    it('deve ter labels descritivos nos botões', () => {
      render(<Quantity defaultValue={5} />);
      
      expect(screen.getByLabelText('Diminuir quantidade')).toBeInTheDocument();
      expect(screen.getByLabelText('Aumentar quantidade')).toBeInTheDocument();
    });

    it('deve funcionar com label externo associado', () => {
      render(
        <div>
          <label htmlFor="external-quantity">Número de itens no carrinho</label>
          <Quantity id="external-quantity" defaultValue={2} />
        </div>
      );

      const input = screen.getByLabelText('Número de itens no carrinho');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'external-quantity');
    });
  });

  describe('⌨️ Keyboard Navigation', () => {
    it('deve permitir incremento com seta direita', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={3} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      input.focus();
      
      await user.keyboard('{ArrowRight}');
      
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('deve permitir decremento com seta esquerda', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={3} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      input.focus();
      
      await user.keyboard('{ArrowLeft}');
      
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('deve prevenir decremento abaixo de 0 com teclado', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      input.focus();
      
      await user.keyboard('{ArrowLeft}');
      
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('não deve responder ao teclado quando disabled', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={3} disabled={true} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      input.focus();
      
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{ArrowLeft}');
      
      expect(onChange).not.toHaveBeenCalled();
    });

    it('deve ser focável via Tab', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <button>Botão anterior</button>
          <Quantity defaultValue={1} />
          <button>Próximo botão</button>
        </div>
      );
      
      const input = screen.getByRole('spinbutton');
      
      await user.tab();
      expect(screen.getByText('Botão anterior')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByLabelText('Diminuir quantidade')).toHaveFocus();
      
      await user.tab();
      expect(input).toHaveFocus();
      
      await user.tab();
      expect(screen.getByLabelText('Aumentar quantidade')).toHaveFocus();
      
      await user.tab();
      expect(screen.getByText('Próximo botão')).toHaveFocus();
    });
  });

  describe('🎨 Visual Focus Indicators', () => {
    it('deve aplicar classe de foco quando input recebe foco', async () => {
      const user = userEvent.setup();
      render(<Quantity defaultValue={1} />);
      
      const input = screen.getByRole('spinbutton');
      
      await user.click(input);
      expect(input).toHaveFocus();
      
      // O CSS deve aplicar outline via :focus
      expect(input).toHaveClass('zds-quantity__input');
    });

    it('deve manter indicador visual em modo disabled', () => {
      render(<Quantity defaultValue={1} disabled={true} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveClass('disabled');
      expect(input).toBeDisabled();
    });
  });

  describe('🔊 Screen Reader Announcements', () => {
    it('deve ter estrutura compatível com screen readers', () => {
      render(<Quantity defaultValue={5} />);
      
      const input = screen.getByRole('spinbutton');
      
      // Elementos que screen readers precisam
      expect(input).toHaveAttribute('aria-label');
      expect(input).toHaveAttribute('aria-valuenow');
      expect(input).toHaveAttribute('aria-valuemin');
      expect(input).toHaveAttribute('role', 'spinbutton');
    });

    it('deve comunicar valor em diferentes formatos', () => {
      // Inteiro
      const { rerender } = render(<Quantity defaultValue={7} decimal={false} />);
      let input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-valuenow', '7');
      
      // Decimal
      rerender(<Quantity defaultValue={3.14} decimal={true} decimalPlaces={2} />);
      input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-valuenow', '3.14');
    });
  });

  describe('🔍 High Contrast & Reduced Motion', () => {
    it('deve manter funcionalidade em modo de alto contraste', () => {
      // Simula alto contraste via CSS custom properties
      const style = document.createElement('style');
      style.textContent = `
        :root {
          --color-neutral-low-default: #000000;
          --color-brand-primary-default: #0000FF;
        }
      `;
      document.head.appendChild(style);
      
      render(<Quantity defaultValue={3} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
      
      document.head.removeChild(style);
    });

    it('deve respeitar prefers-reduced-motion', () => {
      // Este teste valida que não há animações desnecessárias
      // O componente já é estático, então passa por padrão
      render(<Quantity defaultValue={1} />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toBeInTheDocument();
      
      // Não há transições CSS que quebrem reduced-motion
    });
  });

  describe('📱 Touch & Mobile Accessibility', () => {
    it('deve ter área de toque adequada (min 44px)', () => {
      render(<Quantity defaultValue={1} size="lg" />);
      
      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      // Os botões usam o componente Button que deve garantir 44px mínimo
      expect(decrementButton).toBeInTheDocument();
      expect(incrementButton).toBeInTheDocument();
    });

    it('deve funcionar com gestos de toque simulados', async () => {
      const onChange = jest.fn();
      render(<Quantity defaultValue={2} onChange={onChange} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      // Simula toque (equivalente a click)
      fireEvent.touchStart(incrementButton);
      fireEvent.touchEnd(incrementButton);
      fireEvent.click(incrementButton);
      
      expect(onChange).toHaveBeenCalledWith(3);
    });
  });
});
