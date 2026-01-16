import * as React from "react";
import clsx from 'clsx';
import { Switch as SwitchRadix} from "radix-ui";
import styles from './Switch.module.scss';
import { SwitchProps } from './Switch.types';

const Switch: React.FC<SwitchProps> = ({
	disabled = false,
	defaultChecked = false,
	checked,
	onCheckedChange,
	name,
	value
}) => (
		<div className={clsx(styles.container)}>
			<SwitchRadix.Root  
				className={styles.switchRoot} 
				disabled={disabled} 
				defaultChecked={defaultChecked} 
				onCheckedChange={onCheckedChange} 
				name={name} 
				value={value}
			>
				<SwitchRadix.Thumb className={styles.switchThumb} />
			</SwitchRadix.Root>
		</div>
);

export default Switch;