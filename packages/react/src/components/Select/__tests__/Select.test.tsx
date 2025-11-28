import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';
import type { SelectOption, SelectProps } from '../Select.types';

// 📋 Mock data simplificado
const mockOptions: SelectOption[] = [
  { id: 'item-1', text: 'Opção 1', subText: 'Descrição 1' },
  { id: 'item-2', text: 'Opção 2', disabled: true },
  { id: 'item-3', text: 'Opção 3', subText: 'Descrição 3' }
];

// Helper para renderizar
const renderSelect = (props: Partial<SelectProps> = {}) => {
  const defaultProps: SelectProps = {
    options: mockOptions,
    placeholder: 'Selecione',
    ...props
  };
  return render(<Select {...defaultProps} />);
};

describe('Select Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ✅ 1. RENDERIZAÇÃO BÁSICA
  it('deve renderizar corretamente', () => {
    renderSelect();

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Selecione')).toBeInTheDocument();
  });

  // ✅ 2. ABRIR/FECHAR DROPDOWN
  it('deve abrir dropdown ao clicar', async () => {
    renderSelect();

    const input = screen.getByRole('combobox');
    await user.click(input);

    await waitFor(() => {
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
    });
  });

  it('deve fechar dropdown com Escape', async () => {
    renderSelect();

    const input = screen.getByRole('combobox');
    await user.click(input);

    await waitFor(() => {
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
    });

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('Opção 1')).not.toBeInTheDocument();
    });
  });

  // ✅ 3. SELEÇÃO DE OPÇÃO
  it('deve selecionar opção e chamar onChange', async () => {
    const mockOnChange = jest.fn();
    renderSelect({ onChange: mockOnChange });

    const input = screen.getByRole('combobox');
    await user.click(input);

    await waitFor(() => {
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Opção 1'));

    expect(mockOnChange).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 'item-1',
        text: 'Opção 1'
      })
    ]);
  });

  // ✅ 4. NAVEGAÇÃO POR TECLADO
  it('deve abrir dropdown com Enter', async () => {
    renderSelect();

    const input = screen.getByRole('combobox');
    input.focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Opção 1')).toBeInTheDocument();
    });
  });

  // ✅ 5. ESTADOS BÁSICOS
  it('deve mostrar valor inicial', () => {
    renderSelect({ value: ['item-1'] });

    const input = screen.getByRole('combobox') as HTMLInputElement;
    expect(input.value).toBe('Opção 1');
  });

  it('deve mostrar erro quando fornecido', () => {
    renderSelect({ errorMessage: 'Campo obrigatório' });

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  // ✅ 6. ACESSIBILIDADE BÁSICA
  it('deve ter atributos ARIA corretos', () => {
    renderSelect({ required: true });

    const input = screen.getByRole('combobox');

    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('deve atualizar aria-expanded ao abrir', async () => {
    renderSelect();

    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-expanded', 'false');

    await user.click(input);

    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
  });

  // ✅ 7. VALIDAÇÃO DE DADOS CRÍTICA
  it('deve lidar com dados inválidos', async () => {
    const corruptedOptions = [
      null,
      { id: 'valid', text: 'Válida' },
      { id: 'invalid', text: null },
      { text: 'Sem ID' }
    ] as SelectOption[];

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    renderSelect({ options: corruptedOptions });

    const input = screen.getByRole('combobox');
    await user.click(input);

    await waitFor(() => {
      expect(screen.getByText('Válida')).toBeInTheDocument();
      expect(screen.queryByText('Sem ID')).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  // ✅ 8. PERFORMANCE BÁSICA
  it('deve renderizar 50 opções sem lag', () => {
    const largeOptions = Array.from({ length: 50 }, (_, i) => ({
      id: `item-${i}`,
      text: `Opção ${i + 1}`
    }));

    const startTime = performance.now();
    renderSelect({ options: largeOptions });
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(50); // menos de 50ms
  });

  it('deve limpar event listeners ao desmontar', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = renderSelect();
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});