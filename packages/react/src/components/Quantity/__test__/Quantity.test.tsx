import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { describe, it, expect, vi } from 'vitest';

import Quantity from '../Quantity';

import type { QuantityProps } from '../Quantity.types';

const ControlledQuantity = ({ initialValue = 0, onChange, ...props }: { initialValue?: number; onChange?: QuantityProps['onChange'] } & Omit<QuantityProps, 'value' | 'onChange'>) => {
  const [value, setValue] = useState<number>(initialValue);
  return (
    <Quantity
      value={value}
      onChange={(v) => { setValue(v); onChange?.(v); }}
      {...props}
    />
  );
};

describe('Quantity', () => {
  describe('Renderização básica', () => {
    it('renderiza o input e os dois botões', () => {
      render(<Quantity />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
      expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
      expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
    });

    it('exibe o value no input', () => {
      render(<Quantity value={5} />);
      expect(screen.getByRole('spinbutton')).toHaveValue('5');
    });

    it('exibe 0 quando nenhum value é passado', () => {
      render(<Quantity />);
      expect(screen.getByRole('spinbutton')).toHaveValue('0');
    });

    it('aplica a className passada via prop', () => {
      const { container } = render(<Quantity className="minha-classe" />);
      expect(container.firstChild).toHaveClass('minha-classe');
    });

    it('aplica o id passado ao input', () => {
      render(<Quantity id="campo-qty" />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('id', 'campo-qty');
    });
  });

  describe('Acessibilidade', () => {
    it('usa os aria-labels padrão em inglês', () => {
      render(<Quantity />);
      expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
      expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
      expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    });

    it('aceita aria-labels customizados', () => {
      render(
        <Quantity
          decrementAriaLabel="Diminuir"
          incrementAriaLabel="Aumentar"
          inputAriaLabel="Quantidade"
        />
      );
      expect(screen.getByLabelText('Diminuir')).toBeInTheDocument();
      expect(screen.getByLabelText('Aumentar')).toBeInTheDocument();
      expect(screen.getByLabelText('Quantidade')).toBeInTheDocument();
    });

    it('input tem role spinbutton', () => {
      render(<Quantity />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('input tem aria-valuenow, aria-valuemin e aria-valuemax corretos', () => {
      render(<Quantity value={3} minValue={1} maxValue={10} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('aria-valuenow', '3');
      expect(input).toHaveAttribute('aria-valuemin', '1');
      expect(input).toHaveAttribute('aria-valuemax', '10');
    });
  });

  describe('Interação com botões', () => {
    it('incrementa o valor ao clicar no botão de aumentar', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={1} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(screen.getByRole('spinbutton')).toHaveValue('2');
    });

    it('decrementa o valor ao clicar no botão de diminuir', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={5} />);
      await user.click(screen.getByLabelText('Decrease quantity'));
      expect(screen.getByRole('spinbutton')).toHaveValue('4');
    });

    it('chama onChange ao incrementar', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Quantity value={2} onChange={onChange} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(onChange).toHaveBeenCalledWith(3);
    });

    it('chama onChange ao decrementar', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Quantity value={5} onChange={onChange} />);
      await user.click(screen.getByLabelText('Decrease quantity'));
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('respeita a prop step no incremento', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={0} valueIncrement={5} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(screen.getByRole('spinbutton')).toHaveValue('5');
    });

    it('respeita a prop step no decremento', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={10} valueIncrement={3} />);
      await user.click(screen.getByLabelText('Decrease quantity'));
      expect(screen.getByRole('spinbutton')).toHaveValue('7');
    });
  });

  describe('Limites min/max', () => {
    it('botão de decrementar é desabilitado quando valor está no mínimo', () => {
      render(<Quantity value={0} minValue={0} />);
      expect(screen.getByLabelText('Decrease quantity')).toBeDisabled();
    });

    it('botão de incrementar é desabilitado quando valor está no máximo', () => {
      render(<Quantity value={9999} maxValue={9999} />);
      expect(screen.getByLabelText('Increase quantity')).toBeDisabled();
    });

    it('não decrementa abaixo do minValue', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={1} minValue={1} />);
      await user.click(screen.getByLabelText('Decrease quantity'));
      expect(screen.getByRole('spinbutton')).toHaveValue('1');
    });

    it('não incrementa acima do maxValue', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={10} maxValue={10} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(screen.getByRole('spinbutton')).toHaveValue('10');
    });

    it('clampeia valor digitado acima do maxValue no blur', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={0} maxValue={10} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '50');
      await user.tab();
      expect(input).toHaveValue('10');
    });

    it('clampeia valor digitado abaixo do minValue no blur', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={5} minValue={5} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '2');
      await user.tab();
      expect(input).toHaveValue('5');
    });
  });

  describe('Estado desabilitado', () => {
    it('botão de incrementar é desabilitado', () => {
      render(<Quantity disabled />);
      expect(screen.getByLabelText('Increase quantity')).toBeDisabled();
    });

    it('botão de decrementar é desabilitado', () => {
      render(<Quantity disabled value={5} />);
      expect(screen.getByLabelText('Decrease quantity')).toBeDisabled();
    });

    it('input é desabilitado', () => {
      render(<Quantity disabled />);
      expect(screen.getByRole('spinbutton')).toBeDisabled();
    });

    it('não chama onChange ao tentar incrementar quando desabilitado', async () => {
      // pointer-events: none é aplicado pelo CSS Modules quando disabled=true,
      // então desabilitamos a verificação de pointer-events para testar o guard interno.
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      const onChange = vi.fn();
      render(<Quantity disabled value={5} onChange={onChange} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Modo controlado', () => {
    it('exibe o value controlado passado via prop', () => {
      render(<Quantity value={7} onChange={vi.fn()} />);
      expect(screen.getByRole('spinbutton')).toHaveValue('7');
    });

    it('chama onChange com o novo valor ao incrementar', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Quantity value={3} onChange={onChange} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('chama onChange com o novo valor ao decrementar', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Quantity value={5} onChange={onChange} />);
      await user.click(screen.getByLabelText('Decrease quantity'));
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('atualiza o input quando o value controlado muda externamente', async () => {
      const { rerender } = render(<Quantity value={1} onChange={vi.fn()} />);
      expect(screen.getByRole('spinbutton')).toHaveValue('1');
      rerender(<Quantity value={8} onChange={vi.fn()} />);
      expect(screen.getByRole('spinbutton')).toHaveValue('8');
    });
  });

  describe('Digitação no input', () => {
    it('permite digitar um valor numérico', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={0} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '42');
      expect(input).toHaveValue('42');
    });

    it('filtra caracteres não numéricos', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={0} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, 'abc12def');
      expect(input).toHaveValue('12');
    });

    it('chama onChange ao digitar', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Quantity value={0} onChange={onChange} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '7');
      expect(onChange).toHaveBeenCalledWith(7);
    });

    it('normaliza o input para 0 ao apagar tudo e sair do campo', async () => {
      // filterInput retorna '0' para string vazia no modo inteiro,
      // portanto o valor resultante é '0', não o valor anterior.
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={5} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.tab();
      expect(input).toHaveValue('0');
    });
  });

  describe('Teclado', () => {
    it('incrementa com ArrowUp', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={3} />);
      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowUp}');
      expect(input).toHaveValue('4');
    });

    it('decrementa com ArrowDown', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={3} />);
      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{ArrowDown}');
      expect(input).toHaveValue('2');
    });

    it('vai para minValue com Home', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={10} minValue={2} />);
      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{Home}');
      expect(input).toHaveValue('2');
    });

    it('vai para maxValue com End', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity initialValue={0} maxValue={50} />);
      const input = screen.getByRole('spinbutton');
      await user.click(input);
      await user.keyboard('{End}');
      expect(input).toHaveValue('50');
    });

    it('descarta a edição e restaura o valor com Escape', async () => {
      // Em modo decimal, clear deixa inputValue=''. O handler do Escape
      // e o do blur ambos restauram o value quando encontram a string vazia.
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Quantity value={5} onChange={onChange} decimal decimalPlaces={2} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.keyboard('{Escape}');
      expect(input).toHaveValue('5.00');
    });

    it('não reage ao teclado quando desabilitado', async () => {
      const user = userEvent.setup();
      render(<Quantity value={5} disabled />);
      const input = screen.getByRole('spinbutton');
      await user.keyboard('{ArrowUp}');
      expect(input).toHaveValue('5');
    });
  });

  describe('Modo decimal', () => {
    it('exibe o valor com casas decimais via value', () => {
      render(<Quantity decimal decimalPlaces={2} value={1} />);
      expect(screen.getByRole('spinbutton')).toHaveValue('1.00');
    });

    it('incrementa por 1 no modo decimal quando step não é especificado', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity decimal decimalPlaces={2} initialValue={1} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(screen.getByRole('spinbutton')).toHaveValue('2.00');
    });

    it('formata o valor no blur respeitando decimalPlaces', async () => {
      const user = userEvent.setup();
      render(<Quantity decimal decimalPlaces={2} value={0} onChange={vi.fn()} />);
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '3.5');
      await user.tab();
      expect(input).toHaveValue('3.50');
    });

    it('usa inputMode decimal no input', () => {
      render(<Quantity decimal />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('inputmode', 'decimal');
    });

    it('usa inputMode numeric quando não decimal', () => {
      render(<Quantity />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('inputmode', 'numeric');
    });

    it('respeita step customizado no modo decimal', async () => {
      const user = userEvent.setup();
      render(<ControlledQuantity decimal decimalPlaces={1} valueIncrement={0.5} initialValue={1} />);
      await user.click(screen.getByLabelText('Increase quantity'));
      expect(screen.getByRole('spinbutton')).toHaveValue('1.5');
    });
  });
});
