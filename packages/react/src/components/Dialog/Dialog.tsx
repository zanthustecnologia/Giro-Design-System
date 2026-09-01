import { AlertDialog } from "radix-ui";
import clsx from "clsx";
import * as React from "react";


import styles from './Dialog.module.scss';
import { DialogProps } from "./Dialog.types";
import Button from '../Button/Button';

const Dialog: React.FC<DialogProps> = ({
	show = false,
  title,
  bodyContent,
  textPrimaryAction,
  textSecondaryAction,
	onPrimaryAction,
	onSecondaryAction,
	className,
  ...rest
}) => (
	<AlertDialog.Root open={show} {...rest}>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className={styles.DialogOverlay} />
			<AlertDialog.Content className={clsx(styles.DialogContent, className)}>
				<AlertDialog.Title className={styles.DialogTitle}>
					{title}
				</AlertDialog.Title>
				<AlertDialog.Description asChild className={styles.DialogDescription}>
					<div>{bodyContent}</div>
				</AlertDialog.Description>
				<div className={styles.DivButtons}>
					{!!(textSecondaryAction && textSecondaryAction.trim()) && (
						<AlertDialog.Cancel asChild>
							<Button variant="outlined" {...(onSecondaryAction && { onClick: onSecondaryAction })}>{textSecondaryAction}</Button>
						</AlertDialog.Cancel>
					)}
					<AlertDialog.Action asChild>
						<Button variant="filled" {...(onPrimaryAction && { onClick: onPrimaryAction })}>{textPrimaryAction}</Button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

export default Dialog;
