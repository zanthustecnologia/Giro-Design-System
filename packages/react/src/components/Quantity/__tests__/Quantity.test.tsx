import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quantity from '../Quantity';
import type { QuantityProps } from '../Quantity.types';
describe('Quantity Component - Funcionalidades Expandidas', () => {
  describe('Incremento/Decremento - Edge Cases', () => {
    it('deve lidar com rapid fire clicks', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      // Simula 10 cliques rápidos
      for (let i = 0; i < 10; i++) {
        await user.click(incrementButton);
      }
      
      expect(onChange).toHaveBeenCalledTimes(10);
      expect(onChange).toHaveBeenLastCalledWith(10);
      expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    });

    it('deve preservar performance com valores grandes', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={9990} onChange={onChange} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      
      const startTime = performance.now();
      await user.click(incrementButton);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100); // Deve ser rápido
      expect(onChange).toHaveBeenCalledWith(9991);
    });

    it('deve lidar com step decimal de alta precisão', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0.1} decimal step={0.001} decimalPlaces={3} onChange={onChange} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);
      
      expect(onChange).toHaveBeenCalledWith(0.101);
      expect(screen.getByDisplayValue('0.101')).toBeInTheDocument();
    });

    it('deve prevenir overflow com valores JavaScript extremos', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={Number.MAX_SAFE_INTEGER - 1} onChange={onChange} />);
      
      const incrementButton = screen.getByLabelText('Aumentar quantidade');
      await user.click(incrementButton);
      
      // Deve incrementar normalmente dentro do limite seguro
      expect(onChange).toHaveBeenCalledWith(Number.MAX_SAFE_INTEGER);
    });
  });

  describe('Entrada Manual - Edge Cases', () => {
    it('deve sanitizar copy/paste com conteúdo inválido', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      
      // Simula paste de conteúdo complexo
      await user.clear(input);
      fireEvent.paste(input, {
        clipboardData: {
          getData: () => '  000123abc456.789  '
        }
      });
      
      // Deve manter apenas números válidos
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    it('deve lidar com múltiplos pontos decimais', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} decimal onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '1.2.3.4');
      
      // Deve aceitar apenas o primeiro ponto
      expect(screen.getByDisplayValue('1.2')).toBeInTheDocument();
    });

    it('deve normalizar zeros à esquerda', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={0} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '000123');
      
      expect(screen.getByDisplayValue('123')).toBeInTheDocument();
      expect(onChange).toHaveBeenLastCalledWith(123);
    });

    it('deve validar onBlur para normalização', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={5} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '  '); // Apenas espaços
      fireEvent.blur(input);
      
      // Deve voltar ao valor anterior ou 0
      await waitFor(() => {
        expect(screen.getByDisplayValue('5')).toBeInTheDocument();
      });
    });
  });

  describe('Navegação por Teclado - Completa', () => {
    it('deve suportar todas as teclas do padrão spinbutton', () => {
      const onChange = jest.fn();
      render(<Quantity defaultValue={5} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      
      // ArrowUp deve incrementar
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      expect(onChange).toHaveBeenCalledWith(6);
      
      // ArrowDown deve decrementar
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(onChange).toHaveBeenCalledWith(4);
      
      // Home deve ir para mínimo
      fireEvent.keyDown(input, { key: 'Home' });
      expect(onChange).toHaveBeenCalledWith(0);
      
      // End deve ir para máximo (apenas inteiros)
      fireEvent.keyDown(input, { key: 'End' });
      expect(onChange).toHaveBeenCalledWith(9999);
    });

    it('deve confirmar edição com Enter', async () => {
      const user = userEvent.setup();
      render(<Quantity defaultValue={5} />);
      
      const input = screen.getByRole('spinbutton');
      input.focus();
      
      fireEvent.keyDown(input, { key: 'Enter' });
      
      // Deve perder foco
      await waitFor(() => {
        expect(input).not.toHaveFocus();
      });
    });

    it('deve cancelar edição com Escape', async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Quantity defaultValue={5} onChange={onChange} />);
      
      const input = screen.getByRole('spinbutton');
      await user.clear(input);
      await user.type(input, '999');
      
      fireEvent.keyDown(input, { key: 'Escape' });
      
      // Deve voltar ao valor original
      await waitFor(() => {
        expect(screen.getByDisplayValue('5')).toBeInTheDocument();
        expect(input).not.toHaveFocus();
      });
    });
  });
});