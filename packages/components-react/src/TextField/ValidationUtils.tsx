import React from 'react';

export interface ValidationParams {
  value: string;
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
  if (required && value.trim() === '') {
    return errorMessage || 'Campo obrigatório.';
  }

  if (required && maxLength && value.length > maxLength) {
    return errorMessage || `Campo deve ter no máximo ${maxLength} caracteres.`;
  }

  return '';
};