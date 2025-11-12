import React from 'react';

export interface CheckboxProps {
  /** Unique identifier for the checkbox input */
  id?: string;
  /** Name attribute for the checkbox, used for form identification */
  name?: string;
  /** Controlled value indicating whether the checkbox is checked */
  checked?: boolean;
  /** Callback function triggered when the checkbox value changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Label text displayed next to the checkbox */
  label?: string | React.ReactNode;
  /** Additional CSS classes for custom styling */
  className?: string;
  /** Value attribute for the checkbox input element */
  value?: string;
  /** AriaDescribedBy for the checkbox input element */
  ariaDescribedby?: string;
  /** Disables the checkbox, preventing user interaction */
  disabled?: boolean;
  /** Sets the checkbox to an indeterminate state (useful for parent-child relationships) */
  indeterminate?: boolean;
  /** Additional props passed to the checkbox input element */
  [key: string]: any;
}
