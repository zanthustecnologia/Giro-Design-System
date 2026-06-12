import clsx from 'clsx';
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui';
import React from 'react';

import styles from './OneTimePassword.module.scss';

import type { OneTimePasswordProps } from './OneTimePassword.types';

const OneTimePassword: React.FC<OneTimePasswordProps> = ({
  length = 6,
  validationType = 'numeric',
  value,
  defaultValue,
  onValueChange,
  autoSubmit = false,
  onAutoSubmit,
  placeholder,
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
      <OneTimePasswordField.Root
        className={styles.inputGroup}
        validationType={validationType}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        autoSubmit={autoSubmit}
        onAutoSubmit={onAutoSubmit}
        placeholder={placeholder}
        name={name}
        form={form}
        disabled={disabled}
        readOnly={readOnly}
        data-error={hasError || undefined}
      >
        {Array.from({ length: validLength }, (_, i) => (
          <OneTimePasswordField.Input
            key={i}
            className={clsx(
              styles.input,
              hasError && styles.inputError,
              disabled && styles.inputDisabled,
            )}
          />
        ))}
        <OneTimePasswordField.HiddenInput />
      </OneTimePasswordField.Root>

      {hasError && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export default OneTimePassword;
