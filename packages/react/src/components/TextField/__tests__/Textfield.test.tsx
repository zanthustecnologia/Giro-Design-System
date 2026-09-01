import { render, screen, fireEvent } from '@testing-library/react';

import TextField from '../TextField';

// Mock parcial do ícone do Fluent UI
vi.mock('@fluentui/react-icons', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@fluentui/react-icons')>();

  return {
    ...actual,
    Dismiss16Regular: () => <span data-testid="dismiss-icon">×</span>,
  };
});

describe('TextField', () => {
  describe('Renderização', () => {
    it('renderiza input básico', () => {
      render(<TextField />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renderiza com label', () => {
      render(<TextField label="Nome" />);
      expect(screen.getByText('Nome')).toBeInTheDocument();
    });

    it('renderiza com placeholder', () => {
      render(<TextField placeholder="Digite aqui" />);
      expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument();
    });

    it('renderiza com valor inicial', () => {
      render(<TextField value="teste" />);
      expect(screen.getByRole('textbox')).toHaveValue('teste');
    });

    it('renderiza com helperText', () => {
      render(<TextField helperText="Ajuda" />);
      expect(screen.getByText('Ajuda')).toBeInTheDocument();
    });

    it('aplica escala 1.0 por padrão', () => {
      const { container } = render(<TextField />);
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.style.getPropertyValue('--giro-scale')).toBe('1');
    });

    it('aplica escala 1.5 quando informado', () => {
      const { container } = render(<TextField scale={1.5} />);
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.style.getPropertyValue('--giro-scale')).toBe('1.5');
    });

    it('aplica escala 2.0 quando informado', () => {
      const { container } = render(<TextField scale={2} />);
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.style.getPropertyValue('--giro-scale')).toBe('2');
    });
  });

  describe('Interações', () => {
    it('chama onChange ao digitar', () => {
      const onChange = vi.fn();
      render(<TextField onChange={onChange} />);
      
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
      
      expect(onChange).toHaveBeenCalledWith('test');
    });

    it('respeita maxLength', () => {
      const onChange = vi.fn();
      render(<TextField onChange={onChange} maxLength={5} />);
      
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'muito longo' } });
      
      expect(onChange).not.toHaveBeenCalled();
    });

    it('mostra botão limpar quando focado com texto', () => {
      render(<TextField value="texto" />);
      const input = screen.getByRole('textbox');
      
      fireEvent.focus(input);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('limpa o campo ao clicar no botão', () => {
      const onChange = vi.fn();
      render(<TextField value="texto" onChange={onChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.focus(input);
      fireEvent.mouseDown(screen.getByRole('button'));
      
      expect(onChange).toHaveBeenCalledWith('');
    });

    it('chama onFocus ao focar', () => {
      const onFocus = vi.fn();
      render(<TextField onFocus={onFocus} />);
      
      fireEvent.focus(screen.getByRole('textbox'));
      
      expect(onFocus).toHaveBeenCalled();
    });

    it('chama onBlur ao desfocar', () => {
      const onBlur = vi.fn();
      render(<TextField onBlur={onBlur} />);
      
      fireEvent.blur(screen.getByRole('textbox'));
      
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('Validação', () => {
    it('mostra erro quando campo obrigatório está vazio', () => {
      render(<TextField required />);
      
      fireEvent.blur(screen.getByRole('textbox'));
      
      expect(screen.getByText('Campo obrigatório.')).toBeInTheDocument();
    });

    it('usa mensagem de erro customizada para campo obrigatório', () => {
      render(<TextField required errorMessage="Preencha este campo" />);
      
      fireEvent.blur(screen.getByRole('textbox'));
      
      expect(screen.getByText('Preencha este campo')).toBeInTheDocument();
    });

    it('não mostra erro quando campo obrigatório tem valor', () => {
      render(<TextField required value="valor" />);
      
      fireEvent.blur(screen.getByRole('textbox'));
      
      expect(screen.queryByText('Campo obrigatório.')).not.toBeInTheDocument();
    });

    it('não mostra erro quando validação passa', () => {
      render(<TextField maxLength={10} required />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'teste' } });
      fireEvent.blur(input);
      
      expect(screen.queryByText(/Campo deve ter no máximo/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Campo obrigatório/)).not.toBeInTheDocument();
    });

    it('exibe erro externo via prop error sem necessidade de blur', () => {
      render(<TextField error errorMessage="Erro do formulário" />);

      expect(screen.getByText('Erro do formulário')).toBeInTheDocument();
    });

    it('prop error ativa aria-invalid diretamente', () => {
      render(<TextField error errorMessage="Erro do formulário" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('prop error tem prioridade sobre helperText', () => {
      render(<TextField error errorMessage="Erro do formulário" helperText="Texto de ajuda" />);

      expect(screen.getByText('Erro do formulário')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ajuda')).not.toBeInTheDocument();
    });

    it('não exibe estado de erro quando error é undefined', () => {
      render(<TextField error={undefined} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Estado Disabled', () => {
    it('desabilita o input', () => {
      render(<TextField disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('não chama onChange quando disabled', () => {
      const onChange = vi.fn();
      render(<TextField disabled onChange={onChange} />);
      
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
      
      expect(onChange).not.toHaveBeenCalled();
    });

    it('não limpa campo quando disabled e botão é clicado', () => {
      const onChange = vi.fn();
      render(<TextField disabled value="texto" onChange={onChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.focus(input);
      const clearButton = screen.queryByRole('button');
      
      if (clearButton) {
        fireEvent.mouseDown(clearButton);
        expect(onChange).not.toHaveBeenCalled();
      }
    });
  });

  describe('Ícone Customizado', () => {
    it('mostra ícone quando campo está vazio', () => {
      render(<TextField icon={<span data-testid="icon">🔍</span>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('esconde ícone quando campo tem texto', () => {
      render(<TextField icon={<span data-testid="icon">🔍</span>} value="texto" />);
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });
  });
});
