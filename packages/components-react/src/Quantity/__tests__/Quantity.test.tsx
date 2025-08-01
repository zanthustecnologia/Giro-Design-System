import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quantity, { QuantityProps } from '../Quantity';

// Mock do Button component
jest.mock('../../Button/Button', () => {
  return function MockButton({ 
    onClick, 
    disabled, 
    'aria-label': ariaLabel, 
    icon,
    variant,
    size,
    type,
    ...props 
  }: any) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        data-variant={variant}
        data-size={size}
        type={type}
        {...props}
      >
        {icon}
      </button>
    );
  };
});

// Mock dos ícones
jest.mock('@fluentui/react-icons', () => ({
  Add16Regular: () => <span data-testid="add-icon">+</span>,
  Subtract16Regular: () => <span data-testid="subtract-icon">-</span>,
}));

describe('Quantity Component', () => {
  const defaultProps: Partial<QuantityProps> = {
    defaultValue: 0,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização Básica', () => {
    it('deve renderizar o componente com valor padrão', () => {
      render(<Quantity {...defaultProps} />);

      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
      expect(screen.getByDisplayValue('0')).toBeInTheDocument();
      expect(screen.getByLabelText('Diminuir quantidade')).toBeInTheDocument();
      expect(screen.getByLabelText('Aumentar quantidade')).toBeInTheDocument();
    });

    it('deve renderizar com valor inicial customizado', () => {
      render(<Quantity defaultValue={5} />);

      expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    });

    it('deve renderizar com className customizada', () => {
      render(<Quantity {...defaultProps} className="custom-quantity" />);

      const container = screen.getByRole('spinbutton').closest('.zds-quantity');
      expect(container).toHaveClass('zds-quantity', 'custom-quantity');
    });

    it('deve renderizar com ID customizado', () => {
      render(<Quantity {...defaultProps} id="quantity-test" />);

      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('id', 'quantity-test');
    });

    it('deve gerar ID único quando não fornecido', () => {
      render(<Quantity {...defaultProps} />);

      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('id');
      expect(input.id).toMatch(/^:r[0-9]+:$/); // Padrão do useId()
    });
  });

  describe('Modos Controlado vs Não Controlado', () => {
    it('deve funcionar em modo não controlado', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(1);
      expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    });

    it('deve funcionar em modo controlado', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      const ControlledQuantity = () => {
        const [value, setValue] = React.useState(3);
        return (
          <Quantity 
            value={value} 
            onChange={(newValue) => {
              setValue(newValue);
              onChange(newValue);
            }} 
          />
        );
      };

      render(<ControlledQuantity />);

      expect(screen.getByDisplayValue('3')).toBeInTheDocument();

      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(4);
      expect(screen.getByDisplayValue('4')).toBeInTheDocument();
    });

    it('deve sincronizar com mudanças externas no modo controlado', () => {
      const TestComponent = ({ value }: { value: number }) => (
        <Quantity value={value} />
      );

      const { rerender } = render(<TestComponent value={5} />);
      expect(screen.getByDisplayValue('5')).toBeInTheDocument();

      rerender(<TestComponent value={10} />);
      expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    });
  });

  describe('Incremento e Decremento', () => {
    it('deve incrementar valor ao clicar no botão +', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={2} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(3);
      expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    });

    it('deve decrementar valor ao clicar no botão -', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={5} onChange={onChange} />);

      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      await user.click(decrementButton);

      expect(onChange).toHaveBeenCalledWith(4);
      expect(screen.getByDisplayValue('4')).toBeInTheDocument();
    });

    it('não deve permitir valores negativos', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={0} onChange={onChange} />);

      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      await user.click(decrementButton);

      expect(onChange).toHaveBeenCalledWith(0);
      expect(screen.getByDisplayValue('0')).toBeInTheDocument();
    });

    it('deve desabilitar botão - quando valor é 0', () => {
      render(<Quantity defaultValue={0} />);

      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      expect(decrementButton).toBeDisabled();
    });

    it('deve habilitar botão - quando valor é maior que 0', () => {
      render(<Quantity defaultValue={1} />);

      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      expect(decrementButton).not.toBeDisabled();
    });
  });

  describe('Step Customizado', () => {
    it('deve incrementar com step customizado', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={0} step={5} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(5);
      expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    });

    it('deve decrementar com step customizado', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={10} step={3} onChange={onChange} />);

      const decrementButton = screen.getByLabelText('Diminuir quantidade');
      await user.click(decrementButton);

      expect(onChange).toHaveBeenCalledWith(7);
      expect(screen.getByDisplayValue('7')).toBeInTheDocument();
    });
  });

  describe('Navegação por Teclado', () => {
    it('deve incrementar com seta direita', () => {
      const onChange = jest.fn();
      render(<Quantity defaultValue={1} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.keyDown(input, { key: 'ArrowRight' });

      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('deve decrementar com seta esquerda', () => {
      const onChange = jest.fn();
      render(<Quantity defaultValue={3} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.keyDown(input, { key: 'ArrowLeft' });

      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('não deve navegar quando desabilitado', () => {
      const onChange = jest.fn();
      render(<Quantity defaultValue={1} disabled onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      fireEvent.keyDown(input, { key: 'ArrowRight' });
      fireEvent.keyDown(input, { key: 'ArrowLeft' });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Entrada Manual no Input', () => {
    it('deve aceitar entrada numérica válida', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={0} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '25');

      expect(onChange).toHaveBeenLastCalledWith(25);
      expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    });

    it('deve permitir limpar o campo', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={5} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.clear(input);

      expect(onChange).toHaveBeenCalledWith(0);
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    it('deve rejeitar entrada não numérica', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={5} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, 'abc');

      expect(screen.getByDisplayValue('5')).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledWith(0); // Só quando limpa
    });

    it('deve limitar entrada a 4 dígitos para inteiros', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={0} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '12345');

      expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
    });

    it('deve remover zero inicial', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={0} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.type(input, '5');

      expect(screen.getByDisplayValue('5')).toBeInTheDocument();
      expect(onChange).toHaveBeenLastCalledWith(5);
    });
  });

  describe('Modo Decimal', () => {
    it('deve renderizar valor decimal formatado', () => {
      render(<Quantity defaultValue={2.5} decimal decimalPlaces={2} />);

      expect(screen.getByDisplayValue('2.50')).toBeInTheDocument();
    });

    it('deve incrementar com step decimal', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={1.0} decimal step={0.1} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(1.1);
    });

    it('deve aceitar entrada decimal válida', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={0} decimal decimalPlaces={2} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '3.14');

      expect(onChange).toHaveBeenLastCalledWith(3.14);
      expect(screen.getByDisplayValue('3.14')).toBeInTheDocument();
    });

    it('deve limitar casas decimais', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={0} decimal decimalPlaces={2} onChange={onChange} />);

      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '1.123');

      expect(screen.getByDisplayValue('1.12')).toBeInTheDocument();
    });

    it('deve usar step padrão baseado em decimalPlaces', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Quantity defaultValue={1.0} decimal decimalPlaces={3} onChange={onChange} />);

      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(1.001);
    });
  });
});