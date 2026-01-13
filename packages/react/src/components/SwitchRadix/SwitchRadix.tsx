import * as React from "react";
import clsx from 'clsx';
import { Switch } from "radix-ui";
import styles from './SwitchRadix.module.scss';
import { SwitchRadixProps } from './SwitchRadix.types';

const SwitchRadix: React.FC<SwitchRadixProps> = ({
	text,
	disabled = false,
}) => (
		<div className={clsx(styles.container)}>
			<label className={styles.label}>
				{text}
			</label>
			<Switch.Root  className={styles.SwitchRoot} disabled={disabled}	>
				<Switch.Thumb className={styles.SwitchThumb} disabled={disabled}/>
			</Switch.Root>
		</div>
);

export default SwitchRadix;