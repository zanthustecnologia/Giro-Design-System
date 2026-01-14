import * as React from "react";
import clsx from 'clsx';
import { Switch } from "radix-ui";
import styles from './Switch.module.scss';
import { SwitchProps } from './Switch.types';

const SwitchRadix: React.FC<SwitchProps> = ({
	disabled = false,
}) => (
		<div className={clsx(styles.container)}>
			<Switch.Root  className={styles.switchRoot} disabled={disabled}	>
				<Switch.Thumb className={styles.switchThumb} />
			</Switch.Root>
		</div>
);

export default SwitchRadix;