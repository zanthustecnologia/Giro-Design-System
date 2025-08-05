// ✅ Types básicos
export type Locale = 'pt-br' | 'en-us';

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
 * Converte uma string de data para objeto Date conforme o locale.
 * @param dateString - String da data no formato dd/mm/yyyy ou mm/dd/yyyy
 * @param locale - Locale para interpretação ('pt-br' ou 'en-us')
 * @returns Date object ou null se inválida
 */
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