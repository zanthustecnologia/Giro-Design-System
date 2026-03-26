import { render, screen, fireEvent } from '@testing-library/react';

import TextArea from '../TextArea';

describe('TextArea', () => {
  describe('Renderização', () => {
    it('renderiza textarea básico', () => {
      render(<TextArea />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renderiza com label', () => {
      render(<TextArea label="Descrição" />);
      expect(screen.getByText('Descrição')).toBeInTheDocument();
    });

    it('renderiza com placeholder', () => {
      render(<TextArea placeholder="Digite aqui" />);
      expect(screen.getByPlaceholderText('Digite aqui')).toBeInTheDocument();
    });

    it('renderiza com valor inicial', () => {
      render(<TextArea value="texto inicial" />);
      expect(screen.getByRole('textbox')).toHaveValue('texto inicial');
    });

    it('renderiza com helperText', () => {
      render(<TextArea helperText="Texto de ajuda" />);
      expect(screen.getByText('Texto de ajuda')).toBeInTheDocument();
    });

    it('renderiza com número de linhas personalizado', () => {
      render(<TextArea rows={6} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
    });

    it('exibe contador de caracteres quando showCharCount e maxLength informados', () => {
      render(<TextArea showCharCount maxLength={100} value="olá" />);
      expect(screen.getByText('3/100')).toBeInTheDocument();
    });

    it('não exibe contador de caracteres quando showCharCount é false', () => {
      render(<TextArea maxLength={100} value="olá" />);
      expect(screen.queryByText('3/100')).not.toBeInTheDocument();
    });
  });

  describe('Interações', () => {
    it('chama onChange ao digitar', () => {
      const onChange = vi.fn();
      render(<TextArea onChange={onChange} />);

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'novo texto' } });

      expect(onChange).toHaveBeenCalledWith('novo texto');
    });

    it('respeita maxLength e não chama onChange quando excede limite', () => {
      const onChange = vi.fn();
      render(<TextArea onChange={onChange} maxLength={5} />);

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'texto longo demais' } });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('chama onFocus ao focar', () => {
      const onFocus = vi.fn();
      render(<TextArea onFocus={onFocus} />);

      fireEvent.focus(screen.getByRole('textbox'));

      expect(onFocus).toHaveBeenCalled();
    });

    it('chama onBlur ao desfocar', () => {
      const onBlur = vi.fn();
      render(<TextArea onBlur={onBlur} />);

      fireEvent.blur(screen.getByRole('textbox'));

      expect(onBlur).toHaveBeenCalled();
    });

    it('não chama onChange quando desabilitado', () => {
      const onChange = vi.fn();
      render(<TextArea onChange={onChange} disabled />);

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'texto' } });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Validação', () => {
    it('mostra erro quando campo obrigatório está vazio ao desfocar', () => {
      render(<TextArea required />);

      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByText('Campo obrigatório.')).toBeInTheDocument();
    });

    it('mostra mensagem de erro customizada', () => {
      render(<TextArea required errorMessage="Preenchimento obrigatório" />);

      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByText('Preenchimento obrigatório')).toBeInTheDocument();
    });

    it('não mostra erro quando campo obrigatório tem valor', () => {
      render(<TextArea required value="texto preenchido" />);

      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.queryByText('Campo obrigatório.')).not.toBeInTheDocument();
    });

    it('exibe erro externo via prop error sem necessidade de blur', () => {
      render(<TextArea error="Erro do formulário" />);

      expect(screen.getByText('Erro do formulário')).toBeInTheDocument();
    });

    it('prop error ativa aria-invalid diretamente', () => {
      render(<TextArea error="Erro do formulário" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('prop error tem prioridade sobre helperText', () => {
      render(<TextArea error="Erro do formulário" helperText="Texto de ajuda" />);

      expect(screen.getByText('Erro do formulário')).toBeInTheDocument();
      expect(screen.queryByText('Texto de ajuda')).not.toBeInTheDocument();
    });

    it('não exibe estado de erro quando error é undefined', () => {
      render(<TextArea error={undefined} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });
  });

  describe('Acessibilidade', () => {
    it('associa o label ao textarea via htmlFor', () => {
      render(<TextArea label="Descrição" id="desc-field" />);
      const label = screen.getByText('Descrição').closest('label');
      expect(label).toHaveAttribute('for', 'desc-field');
    });

    it('define aria-required quando required', () => {
      render(<TextArea required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('define aria-invalid quando há erro', () => {
      render(<TextArea required />);

      fireEvent.blur(screen.getByRole('textbox'));

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('textarea fica desabilitado quando disabled', () => {
      render(<TextArea disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });
});
