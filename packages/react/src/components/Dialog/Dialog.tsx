import { AlertDialog } from "radix-ui";
import * as React from "react";


import styles from './Dialog.module.scss';
import { DialogProps } from "./Dialog.types";
import Button from '../Button/Button';

const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  text,
  textPrimaryAction,
  textSecondaryAction,
	onPrimaryAction,
	onSecondaryAction,
  ...restProps
}) => (
	<AlertDialog.Root {...restProps}>
		<AlertDialog.Trigger asChild>
			{children}
		</AlertDialog.Trigger>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className={styles.DialogOverlay} />
			<AlertDialog.Content className={styles.DialogContent}>
				<AlertDialog.Title className={styles.DialogTitle}>
					{title}
				</AlertDialog.Title>
				<AlertDialog.Description className={styles.DialogDescription}>
					{text}
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
