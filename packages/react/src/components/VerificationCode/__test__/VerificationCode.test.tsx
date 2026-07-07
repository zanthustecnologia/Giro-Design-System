import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import VerificationCode from '../VerificationCode';

vi.mock('../VerificationCode.module.scss', () => ({
  default: {
    container: 'container',
    inputGroup: 'inputGroup',
    input: 'input',
    inputError: 'inputError',
    inputDisabled: 'inputDisabled',
    errorMessage: 'errorMessage',
  },
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Retorna apenas os inputs visíveis (exclui o HiddenInput do Radix). */
const getVisibleInputs = () =>
  screen
    .getAllByRole('textbox')
    .filter((el) => (el as HTMLInputElement).type !== 'hidden');

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('VerificationCode', () => {
  describe('Renderização básica', () => {
    it('renderiza 6 inputs por padrão', () => {
      render(<VerificationCode />);
      expect(getVisibleInputs()).toHaveLength(6);
    });

    it('renderiza o número correto de inputs conforme a prop length', () => {
      render(<VerificationCode length={4} />);
      expect(getVisibleInputs()).toHaveLength(4);
    });

    it('limita o length mínimo a 1 quando length=0 é passado', () => {
      render(<VerificationCode length={0} />);
      expect(getVisibleInputs()).toHaveLength(1);
    });

    it('limita o length máximo a 100 quando length=200 é passado', () => {
      render(<VerificationCode length={200} />);
      expect(getVisibleInputs()).toHaveLength(100);
    });

    it('aplica o id no container externo', () => {
      const { container } = render(<VerificationCode id="otp-root" />);
      expect(container.firstChild).toHaveAttribute('id', 'otp-root');
    });

    it('aplica a className no container externo', () => {
      const { container } = render(<VerificationCode className="custom-otp" />);
      expect(container.firstChild).toHaveClass('custom-otp');
    });

  });

  describe('Estado de erro', () => {
    it('não exibe a mensagem de erro por padrão', () => {
      render(<VerificationCode errorMessage="Código inválido" />);
      expect(screen.queryByText('Código inválido')).not.toBeInTheDocument();
    });

    it('exibe a mensagem de erro quando hasError e errorMessage são fornecidos', () => {
      render(<VerificationCode hasError errorMessage="Código inválido" />);
      expect(screen.getByText('Código inválido')).toBeInTheDocument();
    });

    it('não exibe a mensagem de erro quando hasError=false mesmo que errorMessage seja fornecido', () => {
      render(<VerificationCode hasError={false} errorMessage="Código inválido" />);
      expect(screen.queryByText('Código inválido')).not.toBeInTheDocument();
    });

    it('não exibe a mensagem de erro quando hasError=true mas errorMessage não é fornecido', () => {
      const { container } = render(<VerificationCode hasError />);
      expect(container.querySelector('.errorMessage')).not.toBeInTheDocument();
    });

    it('adiciona a classe inputError nos inputs quando hasError=true', () => {
      render(<VerificationCode hasError />);
      getVisibleInputs().forEach((input) => {
        expect(input).toHaveClass('inputError');
      });
    });

    it('não adiciona a classe inputError quando hasError=false', () => {
      render(<VerificationCode />);
      getVisibleInputs().forEach((input) => {
        expect(input).not.toHaveClass('inputError');
      });
    });

    it('adiciona data-error no Root quando hasError=true', () => {
      const { container } = render(<VerificationCode hasError />);
      const root = container.querySelector('.inputGroup');
      expect(root).toHaveAttribute('data-error');
    });

    it('não adiciona data-error no Root quando hasError=false', () => {
      const { container } = render(<VerificationCode />);
      const root = container.querySelector('.inputGroup');
      expect(root).not.toHaveAttribute('data-error');
    });
  });

  describe('Estado desabilitado', () => {
    it('desabilita todos os inputs quando disabled=true', () => {
      render(<VerificationCode disabled />);
      getVisibleInputs().forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it('não desabilita os inputs por padrão', () => {
      render(<VerificationCode />);
      getVisibleInputs().forEach((input) => {
        expect(input).not.toBeDisabled();
      });
    });

    it('adiciona a classe inputDisabled nos inputs quando disabled=true', () => {
      render(<VerificationCode disabled />);
      getVisibleInputs().forEach((input) => {
        expect(input).toHaveClass('inputDisabled');
      });
    });
  });

  describe('Estado readOnly', () => {
    it('torna os inputs somente leitura quando readOnly=true', () => {
      render(<VerificationCode readOnly />);
      getVisibleInputs().forEach((input) => {
        expect(input).toHaveAttribute('readonly');
      });
    });

    it('não aplica readOnly nos inputs por padrão', () => {
      render(<VerificationCode />);
      getVisibleInputs().forEach((input) => {
        expect(input).not.toHaveAttribute('readonly');
      });
    });
  });

  describe('Callbacks', () => {
    it('chama onValueChange ao digitar nos inputs', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<VerificationCode length={4} onValueChange={onValueChange} />);

      const [firstInput] = getVisibleInputs();
      await user.type(firstInput, '1');

      expect(onValueChange).toHaveBeenCalled();
    });

    it('chama onValueChange com o valor acumulado', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<VerificationCode length={4} onValueChange={onValueChange} />);

      const inputs = getVisibleInputs();
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');

      const lastCall = onValueChange.mock.calls[onValueChange.mock.calls.length - 1]?.[0] as string;
      expect(lastCall).toContain('2');
    });

    it('chama onAutoSubmit ao completar todos os campos com autoSubmit ativo', async () => {
      const user = userEvent.setup();
      const onAutoSubmit = vi.fn();
      render(
        <VerificationCode length={2} autoSubmit onAutoSubmit={onAutoSubmit} />,
      );

      const inputs = getVisibleInputs();
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');

      expect(onAutoSubmit).toHaveBeenCalledWith('12');
    });

    it('não chama onAutoSubmit quando autoSubmit=false', async () => {
      const user = userEvent.setup();
      const onAutoSubmit = vi.fn();
      render(
        <VerificationCode
          length={2}
          autoSubmit={false}
          onAutoSubmit={onAutoSubmit}
        />,
      );

      const inputs = getVisibleInputs();
      await user.type(inputs[0], '1');
      await user.type(inputs[1], '2');

      expect(onAutoSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Valor controlado e não controlado', () => {
    it('exibe o defaultValue nos inputs quando fornecido', () => {
      render(<VerificationCode length={4} defaultValue="1234" />);
      const inputs = getVisibleInputs();
      const filledValues = inputs.map(
        (el) => (el as HTMLInputElement).value,
      );
      expect(filledValues.join('')).toBe('1234');
    });

    it('exibe o value controlado nos inputs quando fornecido', () => {
      render(<VerificationCode length={3} value="123" />);
      const inputs = getVisibleInputs();
      const filledValues = inputs.map(
        (el) => (el as HTMLInputElement).value,
      );
      expect(filledValues.join('')).toBe('123');
    });
  });

  describe('Acessibilidade', () => {
    it('todos os inputs visíveis têm role textbox', () => {
      render(<VerificationCode length={4} />);
      expect(screen.getAllByRole('textbox')).toHaveLength(4);
    });

    it('o HiddenInput não aparece como textbox', () => {
      render(<VerificationCode length={4} name="otp" />);
      // getAllByRole('textbox') não deve incluir inputs hidden
      expect(screen.getAllByRole('textbox')).toHaveLength(4);
    });
  });
});
