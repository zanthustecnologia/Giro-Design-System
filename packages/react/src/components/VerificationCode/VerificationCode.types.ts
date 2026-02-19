import * as React from 'react';

export type InputType = 'numeric' | 'alpha' | 'alphanumeric';

export interface VerificationCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
  inputType?: InputType;
  onComplete?: (value: string) => void;
  hasError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}
