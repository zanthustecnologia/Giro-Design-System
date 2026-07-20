import clsx from 'clsx';
import { unstable_OneTimePasswordField as OneTimePasswordFieldRadix } from 'radix-ui';
import React from 'react';

import styles from './VerificationCode.module.scss';

import type { VerificationCodeProps } from './VerificationCode.types';

const VerificationCode: React.FC<VerificationCodeProps> = ({
  length = 6,
  validationType = 'numeric',
  value,
  defaultValue,
  onValueChange,
  autoSubmit = false,
  onAutoSubmit,
  name,
  form,
  hasError = false,
  errorMessage,
  disabled = false,
  readOnly = false,
  className,
  id,
}) => {
  const validLength = Math.min(Math.max(length, 1), 100);

  return (
    <div id={id} className={clsx(styles.container, className)}>
      <OneTimePasswordFieldRadix.Root
        className={styles.inputGroup}
        validationType={validationType}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        autoSubmit={autoSubmit}
        onAutoSubmit={onAutoSubmit}
        name={name}
        form={form}
        disabled={disabled}
        readOnly={readOnly}
        data-error={hasError || undefined}
      >
        {Array.from({ length: validLength }, (_, i) => (
          <OneTimePasswordFieldRadix.Input
            key={i}
            className={clsx(
              styles.input,
              hasError && styles.inputError,
              disabled && styles.inputDisabled,
            )}
          />
        ))}
        <OneTimePasswordFieldRadix.HiddenInput />
      </OneTimePasswordFieldRadix.Root>

      {hasError && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default VerificationCode;
