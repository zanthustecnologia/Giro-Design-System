import React from 'react';
import styles from './TooltipRadix.module.scss';
import { Tooltip } from "radix-ui";
import { TooltipRadixProps } from './TooltipRadix.types';


const TooltipRadix: React.FC<TooltipRadixProps> = ({
	children,
	text ,
	side = 'bottom',
	align = 'start',
	sideOffset = 10,
	alignOffset = 10
}) => {
	return (
		<Tooltip.Provider >
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<span className={styles['triggerWrapper']}>
						{children}
					</span>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className={styles['tooltipContent']}
						side={side}
						align={align}
						sideOffset={sideOffset}
						alignOffset={alignOffset}
					>
						{text}
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};

export default TooltipRadix;



