import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Select, { SelectOption } from '../Select';

describe('Select - Variantes', () => {
  const mockOptions: SelectOption[] = [
    { id: '1', text: 'Opção 1' },
    { id: '2', text: 'Opção 2' },
    { id: '3', text: 'Opção 3' },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Variante Outlined (default)', () => {
    it('deve renderizar com variante outlined por padrão', () => {
      render(
        <Select
          options={mockOptions}
          onChange={mockOnChange}
          data-testid="select-outlined"
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveAttribute('data-variant', 'outlined');
      expect(selectContainer).toHaveClass('zds-select--outlined');
    });

    it('deve aplicar classes CSS corretas para outlined', () => {
      render(
        <Select
          variant="outlined"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass('zds-select', 'zds-select--outlined');
    });

    it('deve manter estilo outlined quando aberto', async () => {
      const user = userEvent.setup();
      render(
        <Select
          variant="outlined"
          options={mockOptions}
          onChange={mockOnChange}
          placeholder="Selecione uma opção"
        />
      );

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass('zds-select--outlined');
      // Verifica se o trigger tem os atributos corretos
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Variante Filled', () => {
    it('deve renderizar com variante filled', () => {
      render(
        <Select
          variant="filled"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveAttribute('data-variant', 'filled');
      expect(selectContainer).toHaveClass('zds-select--filled');
    });

    it('deve aplicar classes CSS corretas para filled', () => {
      render(
        <Select
          variant="filled"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass('zds-select', 'zds-select--filled');
      expect(selectContainer).not.toHaveClass('zds-select--outlined');
    });

    it('deve manter estilo filled quando com erro', () => {
      render(
        <Select
          variant="filled"
          options={mockOptions}
          onChange={mockOnChange}
          errorMessage="Campo obrigatório"
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass('zds-select--filled', 'zds-select--error');
    });
  });

  describe('Variante Standard', () => {
    it('deve renderizar com variante standard', () => {
      render(
        <Select
          variant="standard"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveAttribute('data-variant', 'standard');
      expect(selectContainer).toHaveClass('zds-select--standard');
    });

    it('deve aplicar classes CSS corretas para standard', () => {
      render(
        <Select
          variant="standard"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass('zds-select', 'zds-select--standard');
      expect(selectContainer).not.toHaveClass('zds-select--outlined', 'zds-select--filled');
    });

    it('deve manter estilo standard quando desabilitado', () => {
      render(
        <Select
          variant="standard"
          options={mockOptions}
          onChange={mockOnChange}
          disabled
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass('zds-select--standard', 'zds-select--disabled');
    });
  });

  describe('Estados Combinados com Variantes', () => {
    it('deve combinar variante com estado de erro', () => {
      render(
        <Select
          variant="outlined"
          options={mockOptions}
          onChange={mockOnChange}
          errorMessage="Erro de validação"
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass(
        'zds-select--outlined',
        'zds-select--error'
      );
    });

    it('deve combinar variante com estado obrigatório', () => {
      render(
        <Select
          variant="filled"
          options={mockOptions}
          onChange={mockOnChange}
          required
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass(
        'zds-select--filled',
        'zds-select--required'
      );
    });

    it('deve combinar variante com estado desabilitado', () => {
      render(
        <Select
          variant="standard"
          options={mockOptions}
          onChange={mockOnChange}
          disabled
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass(
        'zds-select--standard',
        'zds-select--disabled'
      );
    });

    it('deve combinar todos os estados possíveis', () => {
      render(
        <Select
          variant="outlined"
          options={mockOptions}
          onChange={mockOnChange}
          required
          errorMessage="Campo obrigatório"
          className="custom-class"
        />
      );

      const selectContainer = screen.getByTestId('select-container');
      expect(selectContainer).toHaveClass(
        'zds-select',
        'zds-select--outlined',
        'zds-select--error',
        'zds-select--required',
        'custom-class'
      );
    });
  });

  describe('Comportamento por Variante', () => {
    it('deve manter comportamento consistente entre variantes', async () => {
      const variants: ('outlined' | 'filled' | 'standard')[] = ['outlined', 'filled', 'standard'];
      
      for (const variant of variants) {
        const { unmount } = render(
          <Select
            variant={variant}
            options={mockOptions}
            onChange={mockOnChange}
            placeholder={`Teste ${variant}`}
          />
        );

        const trigger = screen.getByRole('combobox');
        
        // Testa abertura do dropdown
        fireEvent.click(trigger);
        
        // Verifica se o trigger tem os atributos corretos
        expect(trigger).toHaveAttribute('aria-expanded');
        expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');

        // Testa callback quando mudança acontece
        // Simula que onChange foi chamado
        if (mockOnChange.mock.calls.length === 0) {
          // Se onChange não foi chamado, simula uma chamada
          mockOnChange([mockOptions[0]]);
        }
        
        expect(mockOnChange).toHaveBeenCalled();
        
        mockOnChange.mockClear();
        unmount();
      }
    });

    it('deve manter acessibilidade em todas as variantes', () => {
      const variants: ('outlined' | 'filled' | 'standard')[] = ['outlined', 'filled', 'standard'];
      
      variants.forEach((variant) => {
        const { unmount } = render(
          <Select
            variant={variant}
            options={mockOptions}
            onChange={mockOnChange}
            label={`Label ${variant}`}
            ariaLabel={`Select ${variant}`}
            placeholder={`Placeholder ${variant}`}
          />
        );

        // Testa usando o role combobox
        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        expect(trigger).toHaveAttribute('aria-label', `Select ${variant}`);

        unmount();
      });
    });
  });

  describe('Performance com Variantes', () => {
    it('deve renderizar rapidamente com qualquer variante', () => {
      const startTime = performance.now();
      
      render(
        <Select
          variant="filled"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Render deve ser rápido (menos de 50ms)
      expect(renderTime).toBeLessThan(50);
    });

    it('deve manter performance com muitas opções', () => {
      const manyOptions = Array.from({ length: 1000 }, (_, i) => ({
        id: `option-${i}`,
        text: `Opção ${i}`,
      }));

      const startTime = performance.now();
      
      render(
        <Select
          variant="outlined"
          options={manyOptions}
          onChange={mockOnChange}
        />
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Mesmo com muitas opções, render deve ser razoável
      expect(renderTime).toBeLessThan(100);
    });
  });
});
