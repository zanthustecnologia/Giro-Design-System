import clsx from 'clsx';
import { Switch as SwitchRadix} from "radix-ui";
import * as React from "react";

import styles from './Switch.module.scss';
import { SwitchProps } from './Switch.types';

const Switch: React.FC<SwitchProps> = ({
	disabled = false,
	defaultChecked = false,
	checked,
	onCheckedChange,
	scale = 1,
	className,
	...rest
}) => {
	const scaleClass = {
		1: 'scale-1-0',
		1.5: 'scale-1-5',
		2: 'scale-2-0',
	}[scale];

	return (
		<div className={clsx(styles.container, scaleClass, className)}>
			<SwitchRadix.Root  
				className={styles.switchRoot} 
				disabled={disabled} 
				defaultChecked={defaultChecked} 
				checked={checked}
				onCheckedChange={onCheckedChange}
				{...rest}
			>
				<SwitchRadix.Thumb className={styles.switchThumb} />
			</SwitchRadix.Root>
		</div>
	);
};

export default Switch;