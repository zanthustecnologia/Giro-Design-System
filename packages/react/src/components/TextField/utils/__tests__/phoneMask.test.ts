import { describe, it, expect } from 'vitest';
import { applyPhoneMask } from '../phoneMask';

describe('applyPhoneMask', () => {
  it('retorna string vazia quando não há dígitos', () => {
    expect(applyPhoneMask('')).toBe('');
    expect(applyPhoneMask('abc')).toBe('');
  });

  it('mantém apenas o parêntese de abertura com 1 ou 2 dígitos', () => {
    expect(applyPhoneMask('1')).toBe('(1');
    expect(applyPhoneMask('11')).toBe('(11');
  });

  it('fecha o DDD sem hífen enquanto o restante é curto', () => {
    expect(applyPhoneMask('119')).toBe('(11)9');
    expect(applyPhoneMask('1198765')).toBe('(11)9876-5');
  });

  it('formata como (XX)XXXX-XXXX quando o total é 10 dígitos', () => {
    expect(applyPhoneMask('1134567890')).toBe('(11)3456-7890');
  });

  it('formata como (XX)XXXXX-XXXX quando o total é 11 dígitos', () => {
    expect(applyPhoneMask('11987654321')).toBe('(11)98765-4321');
  });

  it('ignora caracteres não numéricos na entrada', () => {
    expect(applyPhoneMask('(11) 98765-4321')).toBe('(11)98765-4321');
  });

  it('limita a 11 dígitos, ignorando o excedente', () => {
    expect(applyPhoneMask('119876543219999')).toBe('(11)98765-4321');
  });
});
