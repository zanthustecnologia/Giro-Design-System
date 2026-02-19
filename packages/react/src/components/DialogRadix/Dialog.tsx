import { AlertDialog } from "radix-ui";
import * as React from "react";
import './Dialog.module.scss';
import { DialogRadixProps } from "./Dialog.types";

const Dialog: React.FC<DialogRadixProps> = ({
  children,
}) => (
	<AlertDialog.Root>
		<AlertDialog.Trigger asChild>
			{children}
		</AlertDialog.Trigger>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className="AlertDialogOverlay" />
			<AlertDialog.Content className="AlertDialogContent">
				<AlertDialog.Title className="AlertDialogTitle">
					Ação do Dialog
				</AlertDialog.Title>
				<AlertDialog.Description className="AlertDialogDescription">
					Aplicação da ação
				</AlertDialog.Description>
				<div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
					<AlertDialog.Cancel asChild>
						<button className="Button mauve">Cancelar</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className="Button red">Ação</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

export default Dialog;
