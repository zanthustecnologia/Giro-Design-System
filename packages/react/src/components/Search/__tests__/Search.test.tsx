import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import Search from '../Search';

// Mock dos ícones do Fluent UI
vi.mock('@fluentui/react-icons', () => ({
  Search16Regular: () => <span data-testid="search-icon">🔍</span>,
  Dismiss16Regular: () => <span data-testid="dismiss-icon">×</span>,
}));

describe('Search', () => {
  describe('Renderização básica', () => {
    it('deve renderizar o componente de busca', () => {
      render(<Search />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('deve renderizar com placeholder padrão', () => {
      render(<Search />);
      expect(screen.getByPlaceholderText('Dica do que deve ser buscado')).toBeInTheDocument();
    });

    it('deve renderizar com placeholder customizado', () => {
      render(<Search placeholder="Buscar produtos..." />);
      expect(screen.getByPlaceholderText('Buscar produtos...')).toBeInTheDocument();
    });

    it('deve renderizar o ícone de busca', () => {
      render(<Search />);
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('não deve renderizar o ícone de limpar quando vazio', () => {
      render(<Search />);
      expect(screen.queryByTestId('dismiss-icon')).not.toBeInTheDocument();
    });

    it('deve renderizar o ícone de limpar quando há texto', () => {
      render(<Search value="texto" onChange={vi.fn()} />);
      expect(screen.getByTestId('dismiss-icon')).toBeInTheDocument();
    });

    it('deve aplicar className customizada', () => {
      const { container } = render(<Search className="custom-class" />);
      const searchContainer = container.firstChild;
      expect(searchContainer).toHaveClass('custom-class');
    });

    it('deve aplicar data-testid', () => {
      render(<Search data-testid="search-input" />);
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    it('deve aplicar ID customizado', () => {
      render(<Search id="custom-search" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-search');
    });

    it('deve gerar ID automático quando não fornecido', () => {
      render(<Search />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id');
      expect(input.getAttribute('id')).toBeTruthy();
    });
  });

  describe('Modo controlado', () => {
    it('deve exibir valor controlado', () => {
      render(<Search value="termo de busca" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toHaveValue('termo de busca');
    });

    it('deve chamar onChange ao digitar', () => {
      const onChange = vi.fn();
      render(<Search value="" onChange={onChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'teste' } });
      
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: input
        })
      );
    });

    it('deve atualizar valor quando prop value muda', () => {
      const { rerender } = render(<Search value="inicial" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toHaveValue('inicial');

      rerender(<Search value="atualizado" onChange={vi.fn()} />);
      expect(screen.getByRole('textbox')).toHaveValue('atualizado');
    });

    it('deve limpar valor ao clicar no ícone de limpar', () => {
      const onChange = vi.fn();
      render(<Search value="texto" onChange={onChange} />);
      
      const clearIcon = screen.getByTestId('dismiss-icon');
      fireEvent.click(clearIcon);
      
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '' })
        })
      );
    });
  });

  describe('Modo não-controlado', () => {
    it('deve gerenciar estado interno', async () => {
      const user = userEvent.setup();
      render(<Search />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'teste');
      
      expect(input).toHaveValue('teste');
    });

    it('deve mostrar ícone de limpar ao digitar', async () => {
      const user = userEvent.setup();
      render(<Search />);
      
      expect(screen.queryByTestId('dismiss-icon')).not.toBeInTheDocument();
      
      await user.type(screen.getByRole('textbox'), 'texto');
      
      expect(screen.getByTestId('dismiss-icon')).toBeInTheDocument();
    });

    it('deve limpar valor interno ao clicar no ícone', async () => {
      const user = userEvent.setup();
      render(<Search />);
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'texto');
      expect(input).toHaveValue('texto');
      
      const clearIcon = screen.getByTestId('dismiss-icon');
      await user.click(clearIcon);
      
      expect(input).toHaveValue('');
      expect(screen.queryByTestId('dismiss-icon')).not.toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('deve chamar onKeyDown ao pressionar tecla', () => {
      const onKeyDown = vi.fn();
      render(<Search onKeyDown={onKeyDown} />);
      
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      
      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onFocus ao focar', () => {
      const onFocus = vi.fn();
      render(<Search onFocus={onFocus} />);
      
      fireEvent.focus(screen.getByRole('textbox'));
      
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onBlur ao desfocar', () => {
      const onBlur = vi.fn();
      render(<Search onBlur={onBlur} />);
      
      fireEvent.blur(screen.getByRole('textbox'));
      
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClear ao limpar campo', () => {
      const onClear = vi.fn();
      render(<Search value="texto" onChange={vi.fn()} onClear={onClear} />);
      
      fireEvent.click(screen.getByTestId('dismiss-icon'));
      
      expect(onClear).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onClick no container', () => {
      const onClick = vi.fn();
      render(<Search onClick={onClick} />);
      
      const container = screen.getByRole('textbox').parentElement;
      fireEvent.click(container!);
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onMouseDown no container', () => {
      const onMouseDown = vi.fn();
      render(<Search onMouseDown={onMouseDown} />);
      
      const container = screen.getByRole('textbox').parentElement;
      fireEvent.mouseDown(container!);
      
      expect(onMouseDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('Estado disabled', () => {
    it('deve desabilitar o input', () => {
      render(<Search disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('não deve chamar onChange quando disabled', () => {
      const onChange = vi.fn();
      render(<Search disabled value="" onChange={onChange} />);
      
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'teste' } });
      
      expect(onChange).not.toHaveBeenCalled();
    });

    it('não deve chamar onFocus quando disabled', () => {
      const onFocus = vi.fn();
      render(<Search disabled onFocus={onFocus} />);
      
      fireEvent.focus(screen.getByRole('textbox'));
      
      expect(onFocus).not.toHaveBeenCalled();
    });

    it('não deve chamar onBlur quando disabled', () => {
      const onBlur = vi.fn();
      render(<Search disabled onBlur={onBlur} />);
      
      fireEvent.blur(screen.getByRole('textbox'));
      
      expect(onBlur).not.toHaveBeenCalled();
    });

    it('não deve chamar onKeyDown quando disabled', () => {
      const onKeyDown = vi.fn();
      render(<Search disabled onKeyDown={onKeyDown} />);
      
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      
      expect(onKeyDown).not.toHaveBeenCalled();
    });

    it('não deve limpar quando disabled', () => {
      const onChange = vi.fn();
      const onClear = vi.fn();
      render(<Search disabled value="texto" onChange={onChange} onClear={onClear} />);
      
      const clearIcon = screen.getByTestId('dismiss-icon');
      fireEvent.click(clearIcon);
      
      expect(onChange).not.toHaveBeenCalled();
      expect(onClear).not.toHaveBeenCalled();
    });

    it('deve aplicar classe disabled no container', () => {
      const { container } = render(<Search disabled />);
      const searchContainer = container.firstChild as HTMLElement;
      expect(searchContainer.className).toContain('disabled');
    });
  });

  describe('Ref', () => {
    it('deve encaminhar ref para o input', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Search ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    it('deve permitir focar via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Search ref={ref} />);
      
      ref.current?.focus();
      
      expect(ref.current).toHaveFocus();
    });

    it('deve permitir acessar valor via ref', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Search ref={ref} value="teste" onChange={vi.fn()} />);
      
      expect(ref.current?.value).toBe('teste');
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter aria-label igual ao placeholder', () => {
      render(<Search placeholder="Buscar produtos" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Buscar produtos');
    });

    it('deve ter role button no container quando há onClick', () => {
      const { container } = render(<Search onClick={vi.fn()} />);
      const searchContainer = container.firstChild;
      expect(searchContainer).toHaveAttribute('role', 'button');
    });

    it('deve ter role button no container quando há onMouseDown', () => {
      const { container } = render(<Search onMouseDown={vi.fn()} />);
      const searchContainer = container.firstChild;
      expect(searchContainer).toHaveAttribute('role', 'button');
    });

    it('não deve ter role button quando não há onClick ou onMouseDown', () => {
      const { container } = render(<Search />);
      const searchContainer = container.firstChild;
      expect(searchContainer).not.toHaveAttribute('role', 'button');
    });

    it('deve ter tabIndex quando há onClick', () => {
      const { container } = render(<Search onClick={vi.fn()} />);
      const searchContainer = container.firstChild;
      expect(searchContainer).toHaveAttribute('tabIndex', '0');
    });

    it('deve permitir ativação por teclado quando há onClick', () => {
      const onClick = vi.fn();
      const { container } = render(<Search onClick={onClick} />);
      const searchContainer = container.firstChild;
      
      fireEvent.keyDown(searchContainer!, { key: 'Enter' });
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('deve permitir ativação por espaço quando há onClick', () => {
      const onClick = vi.fn();
      const { container } = render(<Search onClick={onClick} />);
      const searchContainer = container.firstChild;
      
      fireEvent.keyDown(searchContainer!, { key: ' ' });
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('ícones devem ter aria-hidden', () => {
      const { container } = render(<Search value="texto" />);
      const icons = container.querySelectorAll('[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('ícone de busca deve ter role presentation', () => {
      const { container } = render(<Search />);
      const searchIconContainer = screen.getByTestId('search-icon').parentElement;
      expect(searchIconContainer).toHaveAttribute('role', 'presentation');
    });
  });

  describe('Comportamentos complexos', () => {
    it('deve atualizar ícone de limpar dinamicamente ao digitar', async () => {
      const user = userEvent.setup();
      render(<Search />);
      
      expect(screen.queryByTestId('dismiss-icon')).not.toBeInTheDocument();
      
      const input = screen.getByRole('textbox');
      await user.type(input, 'a');
      expect(screen.getByTestId('dismiss-icon')).toBeInTheDocument();
      
      await user.clear(input);
      expect(screen.queryByTestId('dismiss-icon')).not.toBeInTheDocument();
    });

    it('deve permitir múltiplas limpezas', async () => {
      const user = userEvent.setup();
      const onClear = vi.fn();
      render(<Search onClear={onClear} />);
      
      const input = screen.getByRole('textbox');
      
      await user.type(input, 'texto1');
      await user.click(screen.getByTestId('dismiss-icon'));
      expect(onClear).toHaveBeenCalledTimes(1);
      
      await user.type(input, 'texto2');
      await user.click(screen.getByTestId('dismiss-icon'));
      expect(onClear).toHaveBeenCalledTimes(2);
    });

    it('deve passar props adicionais para o input', () => {
      render(<Search name="search-field" autoComplete="off" />);
      const input = screen.getByRole('textbox');
      
      expect(input).toHaveAttribute('name', 'search-field');
      expect(input).toHaveAttribute('autoComplete', 'off');
    });
  });

  describe('searchMode', () => {
    describe('modo instant (padrão)', () => {
      it('deve chamar onSearch a cada mudança de valor', () => {
        const onSearch = vi.fn();
        render(<Search onSearch={onSearch} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'a' } });
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ab' } });

        expect(onSearch).toHaveBeenCalledTimes(2);
        expect(onSearch).toHaveBeenNthCalledWith(1, 'a');
        expect(onSearch).toHaveBeenNthCalledWith(2, 'ab');
      });

      it('não deve chamar onSearch ao pressionar Enter no modo instant', () => {
        const onSearch = vi.fn();
        render(<Search searchMode="instant" onSearch={onSearch} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        expect(onSearch).not.toHaveBeenCalled();
      });

      it('não deve chamar onSearch quando disabled', () => {
        const onSearch = vi.fn();
        render(<Search disabled onSearch={onSearch} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'teste' } });

        expect(onSearch).not.toHaveBeenCalled();
      });
    });

    describe('modo on-enter', () => {
      it('não deve chamar onSearch ao digitar', () => {
        const onSearch = vi.fn();
        render(<Search searchMode="on-enter" onSearch={onSearch} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'teste' } });

        expect(onSearch).not.toHaveBeenCalled();
      });

      it('deve chamar onSearch ao pressionar Enter com o valor atual', () => {
        const onSearch = vi.fn();
        render(<Search searchMode="on-enter" value="notebook" onChange={vi.fn()} onSearch={onSearch} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        expect(onSearch).toHaveBeenCalledTimes(1);
        expect(onSearch).toHaveBeenCalledWith('notebook');
      });

      it('não deve chamar onSearch ao pressionar outra tecla', () => {
        const onSearch = vi.fn();
        render(<Search searchMode="on-enter" value="notebook" onChange={vi.fn()} onSearch={onSearch} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Tab' });
        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'a' });

        expect(onSearch).not.toHaveBeenCalled();
      });

      it('deve chamar onSearch com string vazia quando campo está vazio e Enter é pressionado', () => {
        const onSearch = vi.fn();
        render(<Search searchMode="on-enter" onSearch={onSearch} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        expect(onSearch).toHaveBeenCalledWith('');
      });

      it('ainda deve chamar onChange ao digitar no modo on-enter', () => {
        const onChange = vi.fn();
        render(<Search searchMode="on-enter" value="" onChange={onChange} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'teste' } });

        expect(onChange).toHaveBeenCalledTimes(1);
      });

      it('ainda deve chamar onKeyDown ao pressionar Enter', () => {
        const onKeyDown = vi.fn();
        render(<Search searchMode="on-enter" onKeyDown={onKeyDown} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        expect(onKeyDown).toHaveBeenCalledTimes(1);
      });

      it('não deve chamar onSearch quando disabled', () => {
        const onSearch = vi.fn();
        render(<Search disabled searchMode="on-enter" value="teste" onChange={vi.fn()} onSearch={onSearch} />);

        fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

        expect(onSearch).not.toHaveBeenCalled();
      });
    });
  });
});
