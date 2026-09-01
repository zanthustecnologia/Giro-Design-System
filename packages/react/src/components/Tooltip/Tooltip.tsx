import clsx from 'clsx';
import { Tooltip as TooltipRadix} from "radix-ui";
import React from 'react';

import styles from './Tooltip.module.scss';
import { TooltipProps } from './Tooltip.types';


const Tooltip: React.FC<TooltipProps> = ({
	children,
	text,
	side = 'bottom',
	align = 'start',
	maxWidth,
	sideOffset = 10,
	className,
	...rest
}) => {
	return (
		<TooltipRadix.Provider>
			<TooltipRadix.Root>
				<TooltipRadix.Trigger asChild>
					<span className={styles.triggerWrapper}>
						{children}
					</span>
				</TooltipRadix.Trigger>
				<TooltipRadix.Portal>
					<TooltipRadix.Content
					className={clsx(styles.tooltipContent, className)}
						side={side}
						align={align}
						sideOffset={sideOffset}
						style={{ maxWidth: maxWidth ? `${maxWidth}px` : 'auto' }}
						{...rest}
					>
						{text}
					</TooltipRadix.Content>
				</TooltipRadix.Portal>
			</TooltipRadix.Root>
		</TooltipRadix.Provider>
	);
};

export default Tooltip


