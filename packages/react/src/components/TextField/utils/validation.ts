import type { TextFieldType } from '../TextField.types';

export interface ValidationParams {
  value: string;
  maxLength?: number;
  type?: TextFieldType;
  errorMessage?: string;
  required?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidUrl = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const validateInput = ({ 
  value, 
  maxLength, 
  type,
  errorMessage, 
  required 
}: ValidationParams): string => {
  if (required && value.trim() === '') {
    return errorMessage || 'Campo obrigatório.';
  }

  if (maxLength && value.length > maxLength) {
    return errorMessage || `Campo deve ter no máximo ${maxLength} caracteres.`;
  }

  if (value.trim() !== '') {
    if (type === 'email' && !EMAIL_REGEX.test(value)) {
      return errorMessage || 'E-mail inválido.';
    }

    if (type === 'url' && !isValidUrl(value)) {
      return errorMessage || 'URL inválida.';
    }

    if (type === 'number' && !Number.isFinite(Number(value))) {
      return errorMessage || 'Número inválido.';
    }

    if (type === 'tel') {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        return errorMessage || 'Telefone inválido.';
      }
    }
  }

  return '';
};
