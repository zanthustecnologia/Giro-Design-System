import React from 'react';

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'accept' | 'multiple'> {

  /** Tipos de arquivo aceitos pelo seletor nativo (ex: "image/*", ".pdf,.docx") */
  accept?: string;

  /** Permite selecionar múltiplos arquivos */
  multiple?: boolean;
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

  /** Mensagem de erro exibida abaixo do icone de erro, caso não tenha a mensagem não ira aparecer nada */
  alertErrorMessage?: string;

  /** Mensagem exibida quando um arquivo excede o tamanho máximo (maxSize) */
  maxSizeErrorMessage?: string;

  /** Mensagem exibida quando a quantidade de arquivos excede o limite (maxFiles) */
  maxFilesErrorMessage?: string;

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
