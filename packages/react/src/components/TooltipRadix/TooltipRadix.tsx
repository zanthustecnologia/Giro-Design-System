import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './TooltipRadix.module.scss';
import { Tooltip } from "radix-ui";
import { TooltipRadixProps } from './TooltipRadix.types';
import clsx from 'clsx';

const TooltipRadix: React.FC<TooltipRadixProps> = ({ id, text, children, position = 'top-right' }) => {
	const [visible, setVisible] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const tooltipRadixRef = useRef<HTMLDivElement | null>(null);
	const tooltipRadixId = id || useId();

	//Função para quando o mouse estar em cima do icone
	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setVisible(true);
  	};

	//Função para quando o mouse sair de cima do icone
	const handleMouseLeave = (): void => {
		timeoutRef.current = setTimeout(() => {
			setVisible(false);
		}, 800);
	};

	//Função para ativar pelas teclas
	const handleKeyDown = (e: React.KeyboardEvent) => {
		switch (e.key) {
			case 'Escape':
				setVisible(false);
				break;
			case 'Enter':
			case ' ': 
				e.preventDefault();
				setVisible(!visible);
				break;
			default:
				break;
		}
	};

	//Aplicação dos estilos com o clsx
	const tooltipRadixClass = clsx(
		styles['zds-tooltip__content'],
		styles[`zds-tooltip__${position}`]
	)

	//Limpando o timeoutRef
	//Ver com o Falcone se essa função não é redundante já que no handleMouseEnter ele já faz o clearTimeout
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);
	
	//TolltipRadix
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<div
						className={clsx(styles['zds-tooltip__wrapper'])}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						onFocus={handleMouseEnter}
						onBlur={handleMouseLeave}
						onKeyDown={handleKeyDown}
						tabIndex={0}
						aria-describedby={visible ? tooltipRadixId : undefined}
					>
						{children}
						{visible && (
							<div
							ref={tooltipRadixRef}
							className={tooltipRadixClass}
							role='tooltip'
							id={tooltipRadixId}
							aria-describedby={tooltipRadixId}
							aria-hidden={!visible}
							>
								{text}
							</div>
						)}
					</div>
				</Tooltip.Trigger>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};

export default TooltipRadix;



