import React from 'react';
import styles from './Tooltip.module.scss';
import { Tooltip as TooltipRadix} from "radix-ui";
import { TooltipProps } from './Tooltip.types';


const Tooltip: React.FC<TooltipProps> = ({
	children,
	text ,
	side = 'bottom',
	align = 'start',
	maxWidth,
	sideOffset = 10
}) => {
	return (
		<TooltipRadix.Provider >
			<TooltipRadix.Root>
				<TooltipRadix.Trigger asChild>
					<span className={styles.triggerWrapper}>
						{children}
					</span>
				</TooltipRadix.Trigger>
				<TooltipRadix.Portal>
					<TooltipRadix.Content
						className={styles.tooltipContent}
						side={side}
						align={align}
						sideOffset={sideOffset}
						style={{ maxWidth: maxWidth ? `${maxWidth}px` : 'auto' }}
					>
						{text}
					</TooltipRadix.Content>
				</TooltipRadix.Portal>
			</TooltipRadix.Root>
		</TooltipRadix.Provider>
	);
};

export default Tooltip


