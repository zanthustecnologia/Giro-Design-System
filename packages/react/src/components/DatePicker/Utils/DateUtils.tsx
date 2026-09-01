import { Locale } from '../../../types/common.types';

export function formatDate(date: Date, locale: Locale = 'pt-br'): string {
  if (!date || !(date instanceof Date)) {
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  if (locale === 'en-us') {
    return `${month}/${day}/${year}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}

export function applyDateMask(value: string, locale: Locale = 'pt-br'): string {
  const digitsOnly = value.replace(/\D/g, '');
  
  const limitedDigits = digitsOnly.slice(0, 8);
  
  let masked = '';
  
  for (let i = 0; i < limitedDigits.length; i++) {
    if (i === 2 || i === 4) {
      masked += '/';
    }
    masked += limitedDigits[i];
  }
  
  return masked;
}

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

  const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = dateString.trim().match(dateRegex);
  
  if (!match) {
    return null;
  }

  const [, first, second, yearStr] = match;
  let day: number;
  let month: number;
  const year = parseInt(yearStr, 10);

  if (locale === 'en-us') {
    month = parseInt(first, 10);
    day = parseInt(second, 10);
  } else {
    day = parseInt(first, 10);
    month = parseInt(second, 10);
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  
  if (date.getFullYear() !== year || 
      date.getMonth() !== month - 1 || 
      date.getDate() !== day) {
    return null;
  }

  return date;
}

export function validatePartialDate(value: string, locale: Locale = 'pt-br'): 'valid' | 'invalid' | 'incomplete' {
  if (value.length === 0) return 'valid';

  if (value.length === 2) {
    const n = parseInt(value, 10);
    const isValid = locale === 'en-us' ? n >= 1 && n <= 12 : n >= 1 && n <= 31;
    return isValid ? 'valid' : 'invalid';
  }

  if (value.length === 5) {
    const parts = value.split('/');
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);
    const isValid = locale === 'en-us'
      ? a >= 1 && a <= 12 && b >= 1 && b <= 31
      : a >= 1 && a <= 31 && b >= 1 && b <= 12;
    return isValid ? 'valid' : 'invalid';
  }

  if (value.length === 10) {
    if (!isValidDateFormat(value, locale)) return 'invalid';
    const parsed = parseDate(value, locale);
    return parsed ? 'valid' : 'invalid';
  }

  return 'incomplete';
}