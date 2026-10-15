import { describe, it, expect } from 'vitest';
import { validateInput } from '../validation';

describe('validateInput', () => {
  describe('Campo obrigatório', () => {
    it('retorna erro padrão quando campo obrigatório está vazio', () => {
      const result = validateInput({
        value: '',
        required: true,
      });
      
      expect(result).toBe('Campo obrigatório.');
    });

    it('retorna erro padrão quando campo obrigatório tem apenas espaços', () => {
      const result = validateInput({
        value: '   ',
        required: true,
      });
      
      expect(result).toBe('Campo obrigatório.');
    });

    it('retorna mensagem customizada quando campo obrigatório está vazio', () => {
      const result = validateInput({
        value: '',
        required: true,
        errorMessage: 'Este campo é necessário',
      });
      
      expect(result).toBe('Este campo é necessário');
    });

    it('não retorna erro quando campo obrigatório tem valor', () => {
      const result = validateInput({
        value: 'teste',
        required: true,
      });
      
      expect(result).toBe('');
    });
  });

  describe('MaxLength', () => {
    it('retorna erro padrão quando excede maxLength', () => {
      const result = validateInput({
        value: 'texto muito longo',
        maxLength: 5,
      });
      
      expect(result).toBe('Campo deve ter no máximo 5 caracteres.');
    });

    it('retorna mensagem customizada quando excede maxLength', () => {
      const result = validateInput({
        value: 'texto muito longo',
        maxLength: 5,
        errorMessage: 'Texto muito grande',
      });
      
      expect(result).toBe('Texto muito grande');
    });

    it('não retorna erro quando está dentro do maxLength', () => {
      const result = validateInput({
        value: 'teste',
        maxLength: 10,
      });
      
      expect(result).toBe('');
    });

    it('não retorna erro quando valor tem exatamente maxLength', () => {
      const result = validateInput({
        value: 'teste',
        maxLength: 5,
      });
      
      expect(result).toBe('');
    });
  });

  describe('Validações combinadas', () => {
    it('prioriza erro de campo obrigatório sobre maxLength', () => {
      const result = validateInput({
        value: '',
        required: true,
        maxLength: 5,
      });
      
      expect(result).toBe('Campo obrigatório.');
    });

    it('valida maxLength quando campo obrigatório está preenchido', () => {
      const result = validateInput({
        value: 'texto muito longo',
        required: true,
        maxLength: 5,
      });
      
      expect(result).toBe('Campo deve ter no máximo 5 caracteres.');
    });
  });

  describe('Tipo email', () => {
    it('retorna erro padrão quando o e-mail é inválido', () => {
      const result = validateInput({
        value: 'nao-e-email',
        type: 'email',
      });

      expect(result).toBe('E-mail inválido.');
    });

    it('retorna mensagem customizada quando o e-mail é inválido', () => {
      const result = validateInput({
        value: 'nao-e-email',
        type: 'email',
        errorMessage: 'Informe um e-mail válido',
      });

      expect(result).toBe('Informe um e-mail válido');
    });

    it('não retorna erro quando o e-mail é válido', () => {
      const result = validateInput({
        value: 'teste@exemplo.com',
        type: 'email',
      });

      expect(result).toBe('');
    });
  });

  describe('Tipo url', () => {
    it('retorna erro padrão quando a url é inválida', () => {
      const result = validateInput({
        value: 'nao-e-url',
        type: 'url',
      });

      expect(result).toBe('URL inválida.');
    });

    it('não retorna erro quando a url é válida', () => {
      const result = validateInput({
        value: 'https://exemplo.com',
        type: 'url',
      });

      expect(result).toBe('');
    });
  });

  describe('Tipo number', () => {
    it('retorna erro padrão quando o valor não é um número válido', () => {
      const result = validateInput({
        value: 'abc',
        type: 'number',
      });

      expect(result).toBe('Número inválido.');
    });

    it('não retorna erro quando o valor é um número válido', () => {
      const result = validateInput({
        value: '123.45',
        type: 'number',
      });

      expect(result).toBe('');
    });
  });

  describe('Tipo tel', () => {
    it('retorna erro padrão quando o valor não casa com o telPattern informado', () => {
      const result = validateInput({
        value: 'abc123',
        type: 'tel',
        telPattern: '[0-9]{11}',
      });

      expect(result).toBe('Telefone inválido.');
    });

    it('não retorna erro quando o valor casa com o telPattern informado', () => {
      const result = validateInput({
        value: '11987654321',
        type: 'tel',
        telPattern: '[0-9]{11}',
      });

      expect(result).toBe('');
    });

    it('retorna erro padrão quando o valor tem menos de 10 dígitos', () => {
      const result = validateInput({
        value: '(11)987-654',
        type: 'tel',
      });

      expect(result).toBe('Telefone inválido.');
    });

    it('retorna erro padrão quando o valor tem mais de 11 dígitos', () => {
      const result = validateInput({
        value: '(11)98765-43210',
        type: 'tel',
      });

      expect(result).toBe('Telefone inválido.');
    });

    it('não retorna erro quando o valor tem 10 dígitos e não há telPattern informado', () => {
      const result = validateInput({
        value: '(11)3456-7890',
        type: 'tel',
      });

      expect(result).toBe('');
    });

    it('não retorna erro quando o valor tem 11 dígitos e não há telPattern informado', () => {
      const result = validateInput({
        value: '(11)98765-4321',
        type: 'tel',
      });

      expect(result).toBe('');
    });
  });

  describe('Sem validações', () => {
    it('retorna string vazia quando não há validações', () => {
      const result = validateInput({
        value: 'qualquer texto',
      });
      
      expect(result).toBe('');
    });

    it('retorna string vazia quando campo vazio sem ser obrigatório', () => {
      const result = validateInput({
        value: '',
        required: false,
      });
      
      expect(result).toBe('');
    });

    it('retorna string vazia quando maxLength não está definido', () => {
      const result = validateInput({
        value: 'texto muito longo que não tem limite',
      });
      
      expect(result).toBe('');
    });
  });
});
