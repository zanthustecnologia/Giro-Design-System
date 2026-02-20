import { AlertDialog } from "radix-ui";
import * as React from "react";


import styles from './Dialog.module.scss';
import { DialogProps } from "./Dialog.types";
import Button from '../Button/Button';

const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  text,
  textConfirm,
  textCancel,
	onConfirm,
	onCancel,
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
					{!!(textCancel && textCancel.trim()) && (
						<AlertDialog.Cancel asChild>
							<Button variant="outlined" {...(onCancel && { onClick: onCancel })}>{textCancel}</Button>
						</AlertDialog.Cancel>
					)}
					<AlertDialog.Action asChild>
						<Button variant="filled" {...(onConfirm && { onClick: onConfirm })}>{textConfirm}</Button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

export default Dialog;
