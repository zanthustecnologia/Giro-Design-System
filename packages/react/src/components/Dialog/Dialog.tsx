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
}) => {
  const descriptionRef = React.useRef<HTMLDivElement>(null);
  const [scrollbarWidth, setScrollbarWidth] = React.useState(0);

  React.useEffect(() => {
    const descriptionEl = descriptionRef.current;
    if (!descriptionEl) return;

    const measureScrollbar = (): void => {
      setScrollbarWidth(descriptionEl.offsetWidth - descriptionEl.clientWidth);
    };

    measureScrollbar();

    const resizeObserver = new ResizeObserver(measureScrollbar);
    resizeObserver.observe(descriptionEl);

    const mutationObserver = new MutationObserver(measureScrollbar);
    mutationObserver.observe(descriptionEl, { childList: true, subtree: true, characterData: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [show, bodyContent]);

  // Container próprio reanexado ao final do body a cada abertura, para que o
  // overlay/conteúdo fiquem visualmente acima de outros Drawer/Modal/Dialog
  // já abertos, já que o empilhamento depende da ordem no DOM (sem z-index).
  const [portalContainer] = React.useState<HTMLDivElement | null>(() =>
    typeof document !== 'undefined' ? document.createElement('div') : null
  );

  React.useEffect(() => {
    if (show && portalContainer) {
      document.body.appendChild(portalContainer);
    }
  }, [show, portalContainer]);

  React.useEffect(() => {
    return () => {
      portalContainer?.remove();
    };
  }, [portalContainer]);

  return (
    <AlertDialog.Root open={show} {...rest}>
      <AlertDialog.Portal container={portalContainer ?? undefined}>
        <AlertDialog.Overlay className={styles.DialogOverlay} />
			<AlertDialog.Content
				className={clsx(styles.DialogContent, className)}
				style={{ '--dialog-scrollbar-width': `${scrollbarWidth}px` } as React.CSSProperties}
			>
				<AlertDialog.Title className={styles.DialogTitle}>
					{title}
				</AlertDialog.Title>
				<AlertDialog.Description asChild className={styles.DialogDescription}>
					<div ref={descriptionRef}>{bodyContent}</div>
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
};

export default Dialog;
