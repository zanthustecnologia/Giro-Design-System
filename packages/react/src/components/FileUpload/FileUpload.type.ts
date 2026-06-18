import React from 'react';

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /** Lista controlada de arquivos */
  value?: File[];

  /** Callback disparado quando a lista de arquivos muda */
  onChange?: (files: File[]) => void;

  /** Texto auxiliar exibido abaixo da zona de drop */
  helperText?: string;

  /** Sinaliza estado de erro */
  error?: boolean;

  /** Mensagem de erro exibida no helperText quando em estado de erro */
  errorMessage?: string;

  /** Tamanho máximo em bytes por arquivo */
  maxSize?: number;

  /** Número máximo de arquivos permitidos (exige multiple=true para mais de 1) */
  maxFiles?: number;

  /** Quando true, o componente está desabilitado */
  disabled?: boolean;

  /** Classes CSS adicionais */
  className?: string;

  /** Identificador único */
  id?: string;

  /** Texto de instrução exibido na zona vazia */
  instructionText?: string;
}
