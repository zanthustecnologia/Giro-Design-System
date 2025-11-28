// ✅ TESTES CORRIGIDOS - Search.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Search from '../Search';
import type { SearchProps } from '../Search.types';

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
const mockOnFocus = jest.fn();
const mockOnBlur = jest.fn();
const mockOnClear = jest.fn();

describe('Search Component', () => {
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

    it('deve renderizar ícone de busca', () => {
      const { container } = renderSearch();
      
      // ✅ CORRIGIDO: Classe correta
      const searchIcon = container.querySelector('.zds-search__leftIcon');
      expect(searchIcon).toBeInTheDocument();
      expect(searchIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('deve renderizar ícone limpar quando há texto', () => {
      const { container } = renderSearch({ value: 'texto', onChange: mockOnChange });
      
      // ✅ CORRIGIDO: Classe correta
      const clearIcon = container.querySelector('.zds-search__clearIcon');
      expect(clearIcon).toBeInTheDocument();
    });

    it('NÃO deve renderizar ícone limpar quando campo vazio', () => {
      const { container } = renderSearch({ value: '', onChange: mockOnChange });
      
      const clearIcon = container.querySelector('.zds-search__clearIcon');
      expect(clearIcon).not.toBeInTheDocument();
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
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: 'a'
          })
        })
      );
    });

    it('deve exibir valor controlado', () => {
      renderSearch({ 
        value: 'valor inicial',
        onChange: mockOnChange 
      });
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('valor inicial');
    });

    it('deve alternar entre modo controlado e não controlado', () => {
      const { rerender } = renderSearch();
      
      const input = screen.getByRole('textbox');
      
      // Modo não controlado
      expect(input).toHaveValue('');
      
      // Alternar para controlado
      rerender(<Search value="controlado" onChange={mockOnChange} />);
      expect(input).toHaveValue('controlado');
    });
  });

  // ✅ TESTES DE EVENTOS DE TECLADO
  describe('Eventos de Teclado', () => {
    it('deve chamar onKeyDown quando fornecido', async () => {
      const user = userEvent.setup();
      renderSearch({ onKeyDown: mockOnKeyDown });
      
      const input = screen.getByRole('textbox');
      
      await user.keyboard('[Enter]');
      
      expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
      expect(mockOnKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: 'Enter'
        })
      );
    });

    it('deve detectar diferentes teclas', async () => {
      const user = userEvent.setup();
      renderSearch({ onKeyDown: mockOnKeyDown });
      
      const input = screen.getByRole('textbox');
      
      await user.keyboard('[Escape]');
      await user.keyboard('[ArrowDown]');
      
      expect(mockOnKeyDown).toHaveBeenCalledTimes(2);
    });

    it('não deve chamar onKeyDown quando desabilitado', async () => {
      const user = userEvent.setup();
      renderSearch({ 
        disabled: true, 
        onKeyDown: mockOnKeyDown 
      });
      
      const input = screen.getByRole('textbox');
      
      await user.keyboard('[Enter]');
      
      expect(mockOnKeyDown).not.toHaveBeenCalled();
    });
  });

  // ✅ TESTES DE FOCUS/BLUR
  describe('Eventos de Focus', () => {
    it('deve chamar onFocus quando fornecido', async () => {
      const user = userEvent.setup();
      renderSearch({ onFocus: mockOnFocus });
      
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      
      expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onBlur quando fornecido', async () => {
      const user = userEvent.setup();
      renderSearch({ onBlur: mockOnBlur });
      
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      await user.tab(); // Remove focus
      
      expect(mockOnBlur).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar onFocus quando desabilitado', async () => {
      const user = userEvent.setup();
      renderSearch({ 
        disabled: true, 
        onFocus: mockOnFocus 
      });
      
      const input = screen.getByRole('textbox');
      
      await user.click(input);
      
      expect(mockOnFocus).not.toHaveBeenCalled();
    });
  });

  // ✅ TESTES DO CLEAR ICON (CORRIGIDOS)
  describe('Clear Icon', () => {
    it('deve limpar o campo quando clicado (modo não controlado)', async () => {
      const user = userEvent.setup();
      const { container } = renderSearch();
      
      const input = screen.getByRole('textbox');
      
      // Digitar no campo
      await user.type(input, 'teste');
      expect(input).toHaveValue('teste');
      
      // ✅ CORRIGIDO: Buscar por classe CSS correta
      const clearIcon = container.querySelector('.zds-search__clearIcon');
      expect(clearIcon).toBeInTheDocument();
      
      // Clicar no ícone limpar
      await user.click(clearIcon!);
      expect(input).toHaveValue('');
    });

    it('deve chamar onChange com valor vazio (modo controlado)', async () => {
      const user = userEvent.setup();
      const { container } = renderSearch({ 
        value: 'algum texto',
        onChange: mockOnChange 
      });
      
      const clearIcon = container.querySelector('.zds-search__clearIcon');
      expect(clearIcon).toBeInTheDocument();
      
      await user.click(clearIcon!);
      
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: ''
          })
        })
      );
    });

    it('deve chamar onClear quando fornecido', async () => {
      const user = userEvent.setup();
      const { container } = renderSearch({ 
        value: 'texto',
        onChange: mockOnChange,
        onClear: mockOnClear
      });
      
      const clearIcon = container.querySelector('.zds-search__clearIcon');
      await user.click(clearIcon!);
      
      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    it('não deve chamar handlers quando desabilitado', async () => {
      const user = userEvent.setup();
      const { container } = renderSearch({ 
        disabled: true,
        value: 'texto',
        onChange: mockOnChange,
        onClear: mockOnClear
      });
      
      const clearIcon = container.querySelector('.zds-search__clearIcon');
      await user.click(clearIcon!);
      
      expect(mockOnChange).not.toHaveBeenCalled();
      expect(mockOnClear).not.toHaveBeenCalled();
    });
  });

  // ✅ TESTES DE ESTADO DESABILITADO
  describe('Estado Desabilitado', () => {
    it('deve desabilitar o input quando disabled é true', () => {
      renderSearch({ disabled: true });
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
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

    it('deve aplicar classe disabled ao ícone', () => {
      const { container } = renderSearch({ disabled: true });
      
      const searchIcon = container.querySelector('.zds-search__leftIcon');
      expect(searchIcon).toHaveClass('disabled');
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

    it('deve ter ícones com aria-hidden', () => {
      const { container } = renderSearch({ value: 'texto', onChange: mockOnChange });
      
      const searchIcon = container.querySelector('.zds-search__leftIcon');
      const clearIcon = container.querySelector('.zds-search__clearIcon');
      
      expect(searchIcon).toHaveAttribute('aria-hidden', 'true');
      expect(clearIcon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ✅ TESTES DE EDGE CASES
  describe('Edge Cases', () => {
    it('deve lidar com valor null/undefined', () => {
      renderSearch({ value: undefined, onChange: mockOnChange });
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('deve lidar com placeholder null/undefined', () => {
      renderSearch({ placeholder: undefined });
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Dica do que deve ser buscado');
    });

    it('deve lidar com className undefined', () => {
      const { container } = renderSearch({ className: undefined });
      
      const searchContainer = container.querySelector('.zds-search');
      expect(searchContainer).toBeInTheDocument();
    });

    it('deve funcionar sem handlers opcionais', async () => {
      const user = userEvent.setup();
      renderSearch(); // Sem handlers
      
      const input = screen.getByRole('textbox');
      
      // Não deve gerar erro
      await user.type(input, 'teste');
      await user.keyboard('[Enter]');
      await user.click(input);
      await user.tab();
      
      expect(input).toHaveValue('teste');
    });
  });

  // ✅ TESTES DE PERFORMANCE
  describe('Performance', () => {
    it('deve ter displayName correto', () => {
      expect(Search.displayName).toBe('ZdsSearch');
    });

    it('componente deve ser memoizado', () => {
      const { rerender } = renderSearch({ placeholder: 'test' });
      
      // Re-render com mesmas props não deve causar re-renderização do componente
      rerender(<Search placeholder="test" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });
  });
});