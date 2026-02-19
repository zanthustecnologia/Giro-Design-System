import { AlertDialog } from "radix-ui";
import * as React from "react";

import styles from './Dialog.module.scss';
import { DialogRadixProps } from "./Dialog.types";

const Dialog: React.FC<DialogRadixProps> = ({
  children,
  title,
  text,
  textConfirm,
  textCancel,
}) => (
	<AlertDialog.Root>
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
				<div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
					<AlertDialog.Cancel asChild>
						<button className={styles.Button + ' ' + styles.mauve}>{textCancel}</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className={styles.Button + ' ' + styles.red}>{textConfirm}</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

export default Dialog;
