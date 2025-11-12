import React from 'react';

export interface ValidationParams {
  value: string | number;
  maxLength?: number;
  type?: string;
  errorMessage?: string;
  required?: boolean;
}

export const validateInput = ({ 
  value, 
  maxLength, 
  type, 
  errorMessage, 
  required 
}: ValidationParams): string => {
  if (required && (typeof value === 'string' ? value.trim() === '' : value === undefined)) {
    return errorMessage || 'Campo obrigatório.';
  }

  if (required && maxLength && (typeof value === 'string' ? value.length > maxLength : String(value).length > maxLength)) {
    return errorMessage || `Campo deve ter no máximo ${maxLength} caracteres.`;
  }

  return '';
};