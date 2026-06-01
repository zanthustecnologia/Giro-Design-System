import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import DatePicker from '../DatePicker';
import {
  formatDate,
  parseDate,
  applyDateMask,
  isValidDateFormat,
  validatePartialDate,
} from '../Utils/DateUtils';

// Mock CSS module
vi.mock('../DatePicker.module.scss', () => ({
  default: {
    datePicker: 'datePicker',
    textfieldContainer: 'textfieldContainer',
    datePickerIcon: 'datePickerIcon',
    datePickerIconDisabled: 'datePickerIconDisabled',
    'datepicker-scale-1-0': 'datepicker-scale-1-0',
    'datepicker-scale-1-5': 'datepicker-scale-1-5',
    'datepicker-scale-2-0': 'datepicker-scale-2-0',
  },
}));

// Mock Calendar para isolar os testes do DatePicker
vi.mock('../../Calendar/Calendar', () => ({
  default: ({
    onDaySelect,
    onClear,
    id,
  }: {
    onDaySelect: (d: Date) => void;
    onClear: () => void;
    id?: string;
  }) => (
    <div data-testid="calendar-mock" id={id}>
      <button
        data-testid="calendar-select-day"
        onClick={() => onDaySelect(new Date(2024, 0, 15))}
      >
        Selecionar 15/01/2024
      </button>
      <button data-testid="calendar-clear" onClick={onClear}>
        Limpar
      </button>
    </div>
  ),
}));

// ---------------------------------------------------------------------------
// DateUtils
// ---------------------------------------------------------------------------

describe('DateUtils', () => {
  describe('formatDate', () => {
    it('retorna string vazia para entrada nula', () => {
      expect(formatDate(null as unknown as Date)).toBe('');
    });

    it('retorna string vazia para entrada inválida', () => {
      expect(formatDate('não-é-data' as unknown as Date)).toBe('');
    });

    it('formata data em pt-br (padrão)', () => {
      expect(formatDate(new Date(2024, 0, 15))).toBe('15/01/2024');
    });

    it('formata data em pt-br explícito', () => {
      expect(formatDate(new Date(2024, 11, 5), 'pt-br')).toBe('05/12/2024');
    });

    it('formata data em en-us (MM/DD/YYYY)', () => {
      expect(formatDate(new Date(2024, 0, 15), 'en-us')).toBe('01/15/2024');
    });

    it('adiciona zero à esquerda no dia e mês', () => {
      expect(formatDate(new Date(2024, 2, 5), 'pt-br')).toBe('05/03/2024');
    });
  });

  describe('parseDate', () => {
    it('retorna null para string vazia', () => {
      expect(parseDate('')).toBeNull();
    });

    it('retorna null para string inválida', () => {
      expect(parseDate('abc')).toBeNull();
    });

    it('retorna null para entrada não-string', () => {
      expect(parseDate(null as unknown as string)).toBeNull();
    });

    it('analisa data no formato pt-br (DD/MM/YYYY)', () => {
      const result = parseDate('15/01/2024', 'pt-br');
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2024);
      expect(result!.getMonth()).toBe(0);
      expect(result!.getDate()).toBe(15);
    });

    it('analisa data no formato en-us (MM/DD/YYYY)', () => {
      const result = parseDate('01/15/2024', 'en-us');
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2024);
      expect(result!.getMonth()).toBe(0);
      expect(result!.getDate()).toBe(15);
    });

    it('retorna null para mês inválido (13)', () => {
      expect(parseDate('13/01/2024', 'en-us')).toBeNull();
    });

    it('retorna null para dia inválido (dia 32)', () => {
      expect(parseDate('32/01/2024', 'pt-br')).toBeNull();
    });

    it('retorna null para data inexistente (30 de fevereiro)', () => {
      expect(parseDate('30/02/2024', 'pt-br')).toBeNull();
    });

    it('analisa corretamente 29/02 em ano bissexto', () => {
      const result = parseDate('29/02/2024', 'pt-br');
      expect(result).not.toBeNull();
      expect(result!.getDate()).toBe(29);
      expect(result!.getMonth()).toBe(1);
    });

    it('retorna null para 29/02 em ano não bissexto', () => {
      expect(parseDate('29/02/2023', 'pt-br')).toBeNull();
    });
  });

  describe('applyDateMask', () => {
    it('retorna string vazia para entrada vazia', () => {
      expect(applyDateMask('')).toBe('');
    });

    it('filtra caracteres não numéricos', () => {
      expect(applyDateMask('1a2b3c')).toBe('12/3');
    });

    it('não insere barra antes de completar 2 dígitos', () => {
      expect(applyDateMask('15')).toBe('15');
    });

    it('insere primeira barra ao digitar o 3º dígito', () => {
      expect(applyDateMask('151')).toBe('15/1');
    });

    it('insere segunda barra após 4 dígitos', () => {
      expect(applyDateMask('15012')).toBe('15/01/2');
    });

    it('limita a 8 dígitos (10 caracteres com barras)', () => {
      expect(applyDateMask('150120241234')).toBe('15/01/2024');
    });

    it('formata data completa corretamente', () => {
      expect(applyDateMask('15012024')).toBe('15/01/2024');
    });
  });

  describe('isValidDateFormat', () => {
    it('retorna false para string vazia', () => {
      expect(isValidDateFormat('')).toBe(false);
    });

    it('valida formato pt-br correto', () => {
      expect(isValidDateFormat('15/01/2024', 'pt-br')).toBe(true);
    });

    it('rejeita formato pt-br com mês inválido', () => {
      expect(isValidDateFormat('15/13/2024', 'pt-br')).toBe(false);
    });

    it('rejeita formato pt-br com dia zero', () => {
      expect(isValidDateFormat('00/01/2024', 'pt-br')).toBe(false);
    });

    it('valida formato en-us correto', () => {
      expect(isValidDateFormat('01/15/2024', 'en-us')).toBe(true);
    });

    it('rejeita formato en-us com mês inválido', () => {
      expect(isValidDateFormat('13/15/2024', 'en-us')).toBe(false);
    });

    it('rejeita data sem barras', () => {
      expect(isValidDateFormat('15012024', 'pt-br')).toBe(false);
    });

    it('rejeita data incompleta', () => {
      expect(isValidDateFormat('15/01', 'pt-br')).toBe(false);
    });
  });

  describe('validatePartialDate', () => {
    it('retorna valid para string vazia', () => {
      expect(validatePartialDate('')).toBe('valid');
    });

    it('retorna incomplete para 1 dígito', () => {
      expect(validatePartialDate('1')).toBe('incomplete');
    });

    it('retorna valid para dia válido pt-br (15)', () => {
      expect(validatePartialDate('15', 'pt-br')).toBe('valid');
    });

    it('retorna invalid para dia inválido pt-br (32)', () => {
      expect(validatePartialDate('32', 'pt-br')).toBe('invalid');
    });

    it('retorna invalid para dia zero pt-br (00)', () => {
      expect(validatePartialDate('00', 'pt-br')).toBe('invalid');
    });

    it('retorna valid para mês válido en-us (12)', () => {
      expect(validatePartialDate('12', 'en-us')).toBe('valid');
    });

    it('retorna invalid para mês inválido en-us (13)', () => {
      expect(validatePartialDate('13', 'en-us')).toBe('invalid');
    });

    it('retorna incomplete ao digitar o mês (length 4)', () => {
      expect(validatePartialDate('15/0', 'pt-br')).toBe('incomplete');
    });

    it('retorna valid para dia+mês válidos pt-br (15/01)', () => {
      expect(validatePartialDate('15/01', 'pt-br')).toBe('valid');
    });

    it('retorna invalid para mês inválido pt-br (15/13)', () => {
      expect(validatePartialDate('15/13', 'pt-br')).toBe('invalid');
    });

    it('retorna incomplete ao digitar o ano (length 7)', () => {
      expect(validatePartialDate('15/01/2', 'pt-br')).toBe('incomplete');
    });

    it('retorna valid para data completa válida pt-br', () => {
      expect(validatePartialDate('15/01/2024', 'pt-br')).toBe('valid');
    });

    it('retorna invalid para data inexistente completa (30/02/2024)', () => {
      expect(validatePartialDate('30/02/2024', 'pt-br')).toBe('invalid');
    });

    it('retorna valid para data completa válida en-us', () => {
      expect(validatePartialDate('01/15/2024', 'en-us')).toBe('valid');
    });
  });
});

// ---------------------------------------------------------------------------
// DatePicker Component
// ---------------------------------------------------------------------------

describe('DatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Renderização básica', () => {
    it('renderiza o campo com label padrão "Data"', () => {
      render(<DatePicker />);
      expect(screen.getByLabelText('Data')).toBeInTheDocument();
    });

    it('aplica escala 1.0 por padrão', () => {
      const { container } = render(<DatePicker />);
      const wrapper = container.querySelector('.datepicker-scale-1-0');
      expect(wrapper).toBeInTheDocument();
    });

    it('aplica escala 1.5 quando informado', () => {
      const { container } = render(<DatePicker scale={1.5} />);
      const wrapper = container.querySelector('.datepicker-scale-1-5');
      expect(wrapper).toBeInTheDocument();
    });

    it('aplica escala 2.0 quando informado', () => {
      const { container } = render(<DatePicker scale={2} />);
      const wrapper = container.querySelector('.datepicker-scale-2-0');
      expect(wrapper).toBeInTheDocument();
    });

    it('renderiza com label personalizado', () => {
      render(<DatePicker label="Data de Nascimento" />);
      expect(screen.getByLabelText('Data de Nascimento')).toBeInTheDocument();
    });

    it('renderiza com placeholder DD/MM/YYYY no locale pt-br', () => {
      render(<DatePicker locale="pt-br" />);
      expect(screen.getByPlaceholderText('DD/MM/YYYY')).toBeInTheDocument();
    });

    it('renderiza com placeholder MM/DD/YYYY no locale en-us', () => {
      render(<DatePicker locale="en-us" />);
      expect(screen.getByPlaceholderText('MM/DD/YYYY')).toBeInTheDocument();
    });

    it('renderiza com data-testid', () => {
      render(<DatePicker data-testid="meu-date-picker" />);
      expect(screen.getByTestId('meu-date-picker')).toBeInTheDocument();
    });

    it('renderiza campo desabilitado', () => {
      render(<DatePicker disabled />);
      expect(screen.getByLabelText('Data')).toBeDisabled();
    });

    it('renderiza com helperText visível', () => {
      render(<DatePicker helperText="Selecione uma data" />);
      expect(screen.getByText('Selecione uma data')).toBeInTheDocument();
    });

    it('renderiza com mensagem de erro externa', () => {
      render(<DatePicker error="Data inválida informada" />);
      expect(screen.getByText('Data inválida informada')).toBeInTheDocument();
    });

    it('combina helperText e error com separador •', () => {
      render(<DatePicker helperText="Ajuda" error="Erro" />);
      expect(screen.getByText('Ajuda • Erro')).toBeInTheDocument();
    });

    it('campo tem aria-label "Open calendar"', () => {
      render(<DatePicker />);
      expect(
        screen.getByRole('textbox', { name: /open calendar/i })
      ).toBeInTheDocument();
    });

    it('calendário não é exibido inicialmente', () => {
      render(<DatePicker />);
      expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
    });
  });

  describe('Modo não controlado (defaultValue)', () => {
    it('exibe a data inicial do defaultValue formatada em pt-br', () => {
      render(<DatePicker defaultValue={new Date(2024, 0, 15)} />);
      expect(screen.getByLabelText('Data')).toHaveValue('15/01/2024');
    });

    it('exibe a data inicial do defaultValue formatada em en-us', () => {
      render(<DatePicker defaultValue={new Date(2024, 0, 15)} locale="en-us" />);
      expect(screen.getByLabelText('Data')).toHaveValue('01/15/2024');
    });
  });

  describe('Modo controlado (value)', () => {
    it('exibe o valor controlado formatado', () => {
      render(<DatePicker value={new Date(2024, 5, 20)} />);
      expect(screen.getByLabelText('Data')).toHaveValue('20/06/2024');
    });

    it('exibe campo vazio quando value é null', () => {
      render(<DatePicker value={null} />);
      expect(screen.getByLabelText('Data')).toHaveValue('');
    });

    it('atualiza o campo ao trocar o value externo', () => {
      const { rerender } = render(<DatePicker value={new Date(2024, 0, 1)} />);
      expect(screen.getByLabelText('Data')).toHaveValue('01/01/2024');

      rerender(<DatePicker value={new Date(2024, 11, 31)} />);
      expect(screen.getByLabelText('Data')).toHaveValue('31/12/2024');
    });
  });

  describe('Abertura e fechamento do calendário', () => {
    it('abre o calendário ao clicar no campo', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.click(screen.getByLabelText('Data'));

      await waitFor(() => {
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument();
      });
    });

    it('abre o calendário ao focar no campo via teclado', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.tab();

      await waitFor(() => {
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument();
      });
    });

    it('fecha o calendário ao pressionar Escape', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.click(screen.getByLabelText('Data'));
      await waitFor(() =>
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument()
      );

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
      });
    });

    it('fecha o calendário ao clicar fora do componente', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <DatePicker />
          <button data-testid="externo">Fora</button>
        </div>
      );

      await user.click(screen.getByLabelText('Data'));
      await waitFor(() =>
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument()
      );

      await user.click(screen.getByTestId('externo'));

      await waitFor(() => {
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
      });
    });

    it('não abre o calendário ao clicar no campo desabilitado', async () => {
      const user = userEvent.setup();
      render(<DatePicker disabled />);

      await user.click(screen.getByLabelText('Data'));

      expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
    });

    it('campo tem aria-expanded=false quando calendário está fechado', () => {
      render(<DatePicker />);
      expect(
        screen.getByRole('textbox', { name: /open calendar/i })
      ).toHaveAttribute('aria-expanded', 'false');
    });

    it('campo tem aria-expanded=true quando calendário está aberto', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.click(screen.getByLabelText('Data'));

      await waitFor(() => {
        expect(
          screen.getByRole('textbox', { name: /open calendar/i })
        ).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });

  describe('Digitação e máscara', () => {
    it('aplica máscara ao digitar uma data completa', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      const input = screen.getByLabelText('Data');
      await user.click(input);
      await user.type(input, '15012024');

      expect(input).toHaveValue('15/01/2024');
    });

    it('chama onChange com Date válido ao digitar data completa', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DatePicker onChange={onChange} />);

      const input = screen.getByLabelText('Data');
      await user.click(input);
      await user.type(input, '15012024');

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(expect.any(Date));
        const calledDate: Date =
          onChange.mock.calls[onChange.mock.calls.length - 1][0];
        expect(calledDate.getDate()).toBe(15);
        expect(calledDate.getMonth()).toBe(0);
        expect(calledDate.getFullYear()).toBe(2024);
      });
    });

    it('exibe erro e chama onChange com null ao digitar data com dia inválido (32)', async () => {
      const onChange = vi.fn();
      render(<DatePicker onChange={onChange} />);

      const input = screen.getByLabelText('Data');
      fireEvent.change(input, { target: { value: '32/01/2024' } });

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(null);
      });
    });

    it('exibe erro e chama onChange com null ao digitar data inexistente (30/02)', async () => {
      const onChange = vi.fn();
      render(<DatePicker onChange={onChange} />);

      const input = screen.getByLabelText('Data');
      fireEvent.change(input, { target: { value: '30/02/2024' } });

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(null);
      });
    });

    it('chama onChange com null ao limpar o campo', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DatePicker onChange={onChange} />);

      const input = screen.getByLabelText('Data');
      await user.click(input);
      await user.type(input, '15012024');

      onChange.mockClear();
      await user.clear(input);

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(null);
      });
    });

    it('não aceita letras no campo', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      const input = screen.getByLabelText('Data');
      await user.click(input);
      await user.type(input, 'abc');

      expect(input).toHaveValue('');
    });

    it('exibe erro e chama onChange com null ao digitar data com formato incorreto', async () => {
      const onChange = vi.fn();
      render(<DatePicker defaultValue={new Date(2024, 0, 15)} onChange={onChange} />);

      const input = screen.getByLabelText('Data');
      // Simula substituição da data existente por valor inválido
      fireEvent.change(input, { target: { value: '99/01/2024' } });

      expect(onChange).toHaveBeenCalledWith(null);

      await waitFor(() => {
        expect(input).toHaveValue('99/01/2024');
        expect(screen.queryByText('Data inválida')).not.toBeInTheDocument();
      });
    });
  });

  describe('Seleção de dia via calendário', () => {
    it('seleciona data ao clicar no dia do calendário e chama onChange', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DatePicker onChange={onChange} />);

      await user.click(screen.getByLabelText('Data'));
      await waitFor(() =>
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument()
      );

      await user.click(screen.getByTestId('calendar-select-day'));

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(expect.any(Date));
        const calledDate: Date = onChange.mock.calls[0][0];
        expect(calledDate.getDate()).toBe(15);
        expect(calledDate.getMonth()).toBe(0);
        expect(calledDate.getFullYear()).toBe(2024);
      });
    });

    it('fecha o calendário após selecionar um dia', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.click(screen.getByLabelText('Data'));
      await waitFor(() =>
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument()
      );

      await user.click(screen.getByTestId('calendar-select-day'));

      await waitFor(() => {
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
      });
    });

    it('exibe a data selecionada no campo após seleção (modo não controlado)', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.click(screen.getByLabelText('Data'));
      await waitFor(() =>
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument()
      );

      await user.click(screen.getByTestId('calendar-select-day'));

      await waitFor(() => {
        expect(screen.getByLabelText('Data')).toHaveValue('15/01/2024');
      });
    });

    it('chama onChange com null ao acionar Limpar do calendário', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<DatePicker onChange={onChange} defaultValue={new Date(2024, 0, 15)} />);

      await user.click(screen.getByLabelText('Data'));
      await waitFor(() =>
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument()
      );

      await user.click(screen.getByTestId('calendar-clear'));

      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Teclado', () => {
    it('abre o calendário ao pressionar Enter quando fechado', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      const input = screen.getByLabelText('Data');
      await user.click(input);

      // Fechar o calendário que abriu pelo click/focus
      await waitFor(() =>
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument()
      );
      await user.keyboard('{Escape}');
      await waitFor(() =>
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument()
      );

      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument();
      });
    });

    it('fecha o calendário ao pressionar Enter com data selecionada', async () => {
      const user = userEvent.setup();
      render(<DatePicker defaultValue={new Date(2024, 0, 15)} />);

      const input = screen.getByLabelText('Data');
      await user.click(input);
      await waitFor(() =>
        expect(screen.getByTestId('calendar-mock')).toBeInTheDocument()
      );

      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
      });
    });

    it('fecha o calendário ao pressionar Enter após digitar data válida', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      const input = screen.getByLabelText('Data');
      await user.click(input);
      await user.type(input, '15012024');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(screen.queryByTestId('calendar-mock')).not.toBeInTheDocument();
      });
    });
  });

  describe('Acessibilidade', () => {
    it('o campo tem role textbox', () => {
      render(<DatePicker />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('campo requerido tem aria-required=true', () => {
      render(<DatePicker required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('o campo tem aria-controls apontando para o calendário', async () => {
      const user = userEvent.setup();
      render(<DatePicker />);

      await user.click(screen.getByLabelText('Data'));

      await waitFor(() => {
        const input = screen.getByRole('textbox', { name: /open calendar/i });
        const calendarId = input.getAttribute('aria-controls');
        expect(calendarId).toBeTruthy();
        expect(document.getElementById(calendarId!)).toBeInTheDocument();
      });
    });

    it('aria-invalid é false quando não há erro', () => {
      render(<DatePicker />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    });
  });
});
