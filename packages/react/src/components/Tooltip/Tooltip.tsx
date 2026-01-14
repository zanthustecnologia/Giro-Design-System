import React from 'react';
import styles from './Tooltip.module.scss';
import { Tooltip } from "radix-ui";
import { TooltipProps } from './Tooltip.types';


const TooltipRadix: React.FC<TooltipProps> = ({
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



