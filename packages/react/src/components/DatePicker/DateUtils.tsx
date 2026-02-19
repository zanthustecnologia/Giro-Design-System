import { Locale } from '../../types/common.types';

/**
 * Formata uma data para string conforme o locale.
 * @param date - Data a ser formatada
 * @param locale - Locale para formatação ('pt-br' ou 'en-us')
 * @returns String formatada da data
 */
export function formatDate(date: Date, locale: Locale = 'pt-br'): string {
  if (!date || !(date instanceof Date)) {
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  // Formatação baseada no locale
  if (locale === 'en-us') {
    return `${month}/${day}/${year}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}

/**
 * Aplica máscara de data conforme o usuário digita.
 * @param value - Valor atual do input
 * @param locale - Locale para determinar o formato da máscara
 * @returns String com a máscara aplicada
 */
export function applyDateMask(value: string, locale: Locale = 'pt-br'): string {
  // Remove todos os caracteres que não são dígitos
  const digitsOnly = value.replace(/\D/g, '');
  
  // Limita a 8 dígitos (DDMMAAAA ou MMDDAAAA)
  const limitedDigits = digitsOnly.slice(0, 8);
  
  // Aplica a máscara baseada no locale
  let masked = '';
  
  for (let i = 0; i < limitedDigits.length; i++) {
    // Adiciona barras nas posições corretas
    if (i === 2 || i === 4) {
      masked += '/';
    }
    masked += limitedDigits[i];
  }
  
  return masked;
}

/**
 * Valida se uma string está no formato correto de data para o locale.
 * @param value - String a ser validada
 * @param locale - Locale para validação
 * @returns true se o formato está correto
 */
export function isValidDateFormat(value: string, locale: Locale = 'pt-br'): boolean {
  const dateRegex = locale === 'en-us'
    ? /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/
    : /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  
  return dateRegex.test(value);
}
export function parseDate(dateString: string, locale: Locale = 'pt-br'): Date | null {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  // Regex para validação básica dd/mm/yyyy ou mm/dd/yyyy
  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = dateString.trim().match(dateRegex);
  
  if (!match) {
    return null;
  }

  const [, first, second, yearStr] = match;
  let day: number;
  let month: number;
  const year = parseInt(yearStr, 10);

  // Interpretação baseada no locale
  if (locale === 'en-us') {
    month = parseInt(first, 10);
    day = parseInt(second, 10);
  } else {
    day = parseInt(first, 10);
    month = parseInt(second, 10);
  }

  // Validação básica de ranges
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  // Criar e validar a data
  const date = new Date(year, month - 1, day);
  
  // Verificar se a data criada corresponde aos componentes originais
  if (date.getFullYear() !== year || 
      date.getMonth() !== month - 1 || 
      date.getDate() !== day) {
    return null;
  }

  return date;
}