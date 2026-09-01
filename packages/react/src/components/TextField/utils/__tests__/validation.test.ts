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
