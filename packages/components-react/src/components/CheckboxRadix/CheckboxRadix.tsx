import * as React from 'react';
import { Checkbox } from 'radix-ui';
// import { CheckIcon } from "@radix-ui/react-icons";
import styles from './CheckboxRadix.module.scss';
import CheckSmall from '../Checkbox/CheckSmall';
import { CheckboxRadixProps } from './CheckboxRadix.types';
import clsx from 'clsx';
import CheckHalf from '../Checkbox/CheckHalf';

const CheckboxRadix: React.FC<CheckboxRadixProps> = ({
  id,
  label,
  onCheckedChange,
  checked,
  defaultChecked,
  disabled,
	className,
	indeterminate
}) => {
		const checkboxRef = React.useRef<HTMLButtonElement>(null);


		const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
				if (e.target !== checkboxRef.current && !disabled) {
						checkboxRef.current?.click();
				}
		};
	return (
    <div className={clsx(styles.container, className)}>
      <div
        className={clsx(styles.wrapperCheckbox, {
          [styles.disabled]: disabled,
        })}
				 onClick={handleWrapperClick}
				 role='presentation'
      >
        <Checkbox.Root
					ref={checkboxRef}
          className={styles.root}
          defaultChecked={defaultChecked}
          checked={checked}
          id={id}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          data-disabled={disabled}
        >
          <Checkbox.Indicator className={styles.indicator}>
            {indeterminate ? <CheckHalf /> : <CheckSmall />}
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label
        className={clsx(styles.label, { [styles.disabled]: disabled })}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxRadix;
