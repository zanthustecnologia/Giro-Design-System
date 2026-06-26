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
	style,
	...rest
}) => {

	return (
		<div
			className={clsx(styles.container, className)}
			style={{ '--switch-scale': scale, ...style } as React.CSSProperties}
		>
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