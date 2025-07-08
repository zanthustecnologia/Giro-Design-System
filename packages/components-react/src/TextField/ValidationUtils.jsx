import React from 'react';

export const validateInput = ({ value, maxLength, type, errorMessage, required}) => {
    if (required && value.trim() === '') {
        return errorMessage || 'Campo obrigatório.';
    }

    if (required && maxLength && value.length > maxLength) {
        return errorMessage || `Campo deve ter no máximo ${maxLength} caracteres.`;
    }
    return '';
};