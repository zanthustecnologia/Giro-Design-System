import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Search from '../Search';
import type { SearchProps } from '../Search';

// Helper para renderizar o componente com props padrão
const renderSearch = (props: Partial<SearchProps> = {}) => {
  const defaultProps: SearchProps = {
    placeholder: 'Dica do que deve ser buscado',
    disabled: false,
    ...props,
  };

  return render(<Search {...defaultProps} />);
};

// Mock para callbacks
const mockOnChange = jest.fn();
const mockOnKeyDown = jest.fn();

describe('Search', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ TESTES BÁSICOS DE RENDERIZAÇÃO
  describe('Renderização', () => {
    it('deve renderizar o componente corretamente', () => {
      renderSearch();
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Dica do que deve ser buscado');
    });

    it('deve aplicar a classe CSS personalizada', () => {
      const { container } = renderSearch({ className: 'custom-search' });
      
      const searchContainer = container.querySelector('.zds-search');
      expect(searchContainer).toHaveClass('custom-search');
    });

    it('deve renderizar com placeholder personalizado', () => {
      renderSearch({ placeholder: 'Buscar produtos...' });
      
      const input = screen.getByPlaceholderText('Buscar produtos...');
      expect(input).toBeInTheDocument();
    });

    it('deve renderizar ícones de busca e limpar', () => {
      const { container } = renderSearch();
      
      const searchIcon = container.querySelector('.zds-leftIcon');
      const clearButton = container.querySelector('.zds-rightIcon');
      
      expect(searchIcon).toBeInTheDocument();
      expect(clearButton).toBeInTheDocument();
    });
  });

  // ✅ TESTES DE ENTRADA E MUDANÇAS
  describe('Entrada de Dados', () => {
    it('deve aceitar entrada de texto (modo não controlado)', async () => {
      const user = userEvent.setup();
      renderSearch();
      
      const input = screen.getByRole('textbox');
      
      await user.type(input, 'busca teste');
      
      expect(input).toHaveValue('busca teste');
    });

    it('deve chamar onChange quando fornecido (modo controlado)', async () => {
      const user = userEvent.setup();
      renderSearch({ 
        value: '', 
        onChange: mockOnChange 
      });
      
      const input = screen.getByRole('textbox');
      
      await user.type(input, 'a');
      
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('deve exibir valor controlado', () => {
      renderSearch({ 
        value: 'valor inicial',
        onChange: mockOnChange 
      });
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('valor inicial');
    });
  });

  // ✅ TESTES DE EVENTOS DE TECLADO
  describe('Eventos de Teclado', () => {
    it('deve chamar onKeyDown quando fornecido', async () => {
      const user = userEvent.setup();
      renderSearch({ onKeyDown: mockOnKeyDown });
      
      const input = screen.getByRole('textbox');
      
      await user.type(input, 'test');
      await user.keyboard('[Enter]');
      
      expect(mockOnKeyDown).toHaveBeenCalled();
    });

    it('deve detectar tecla Enter', async () => {
      const user = userEvent.setup();
      renderSearch({ onKeyDown: mockOnKeyDown });
      
      const input = screen.getByRole('textbox');
      
      await user.keyboard('[Enter]');
      
      const lastCall = mockOnKeyDown.mock.calls[mockOnKeyDown.mock.calls.length - 1];
      expect(lastCall[0].key).toBe('Enter');
    });
  });

  // ✅ TESTES DO BOTÃO LIMPAR
  describe('Botão Limpar', () => {
    it('deve limpar o campo quando clicado (modo não controlado)', async () => {
      const user = userEvent.setup();
      renderSearch();
      
      const input = screen.getByRole('textbox');
      const clearButton = screen.getByRole('button', { name: /limpar busca/i });
      
      // Digitar no campo
      await user.type(input, 'teste');
      expect(input).toHaveValue('teste');
      
      // Clicar no botão limpar
      await user.click(clearButton);
      expect(input).toHaveValue('');
    });

    it('deve chamar onChange com valor vazio (modo controlado)', async () => {
      const user = userEvent.setup();
      renderSearch({ 
        value: 'algum texto',
        onChange: mockOnChange 
      });
      
      const clearButton = screen.getByRole('button', { name: /limpar busca/i });
      
      await user.click(clearButton);
      
      expect(mockOnChange).toHaveBeenCalled();
    });

    it('deve mostrar botão limpar apenas quando há texto', () => {
      const { rerender } = renderSearch({ value: '', onChange: mockOnChange });
      
      let clearButton = screen.getByRole('button', { name: /limpar busca/i });
      expect(clearButton).toHaveStyle({ visibility: 'hidden' });
      
      // Re-renderizar com valor
      rerender(<Search value="texto" onChange={mockOnChange} />);
      
      clearButton = screen.getByRole('button', { name: /limpar busca/i });
      expect(clearButton).toHaveStyle({ visibility: 'visible' });
    });
  });

  // ✅ TESTES DE ESTADO DESABILITADO
  describe('Estado Desabilitado', () => {
    it('deve desabilitar o input quando disabled é true', () => {
      renderSearch({ disabled: true });
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('deve desabilitar o botão limpar quando disabled é true', () => {
      renderSearch({ 
        disabled: true,
        value: 'algum texto',
        onChange: mockOnChange 
      });
      
      const clearButton = screen.getByRole('button', { name: /limpar busca/i });
      expect(clearButton).toBeDisabled();
    });

    it('não deve aceitar entrada quando desabilitado', async () => {
      const user = userEvent.setup();
      renderSearch({ disabled: true });
      
      const input = screen.getByRole('textbox');
      
      await user.type(input, 'teste');
      
      expect(input).toHaveValue('');
    });

    it('deve aplicar classe disabled ao container', () => {
      const { container } = renderSearch({ disabled: true });
      
      const searchContainer = container.querySelector('.zds-search');
      expect(searchContainer).toHaveClass('disabled');
    });
  });

  // ✅ TESTES DE ID E ACESSIBILIDADE
  describe('Acessibilidade', () => {
    it('deve usar ID personalizado quando fornecido', () => {
      renderSearch({ id: 'search-custom' });
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'search-custom');
    });

    it('deve gerar ID automático quando não fornecido', () => {
      renderSearch();
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id');
      expect(input.getAttribute('id')).toBeTruthy();
    });

    it('deve ter aria-label apropriado', () => {
      renderSearch({ placeholder: 'Buscar produtos' });
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Buscar produtos');
    });

    it('deve ter button com aria-label descritivo', () => {
      renderSearch();
      
      const clearButton = screen.getByRole('button', { name: /limpar busca/i });
      expect(clearButton).toHaveAttribute('aria-label', 'Limpar busca');
    });
  });
});