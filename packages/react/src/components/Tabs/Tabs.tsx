import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";
import clsx from "clsx";
import { Tabs as TabsRadix } from "radix-ui";
import * as React from "react";

import styles from "./Tabs.module.scss";
import { TabsProps } from "./Tabs.types";

const Tabs: React.FC<TabsProps> = ({
	items,
	defaultValue,
	value,
	onValueChange,
	keyboardActivationMode = "automatic",
	loop = true,
	scrollAmount = 150,
	className,
	disabled,
	id,
	"aria-label": ariaLabel,
	"data-testid": testId,
}) => {
	const listRef = React.useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(false);

	// Drag-to-scroll (mouse)
	const isDragging = React.useRef(false);
	const dragStartX = React.useRef(0);
	const scrollStartLeft = React.useRef(0);
	const hasDragged = React.useRef(false);

	const checkScroll = React.useCallback(() => {
		const el = listRef.current;
		if (!el) return;
		const btnW = 24;
		setCanScrollLeft(el.scrollLeft > btnW);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - btnW);
	}, []);

	React.useEffect(() => {
		const el = listRef.current;
		if (!el) return;
		checkScroll();
		el.addEventListener("scroll", checkScroll);
		const ro = new ResizeObserver(checkScroll);
		ro.observe(el);

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging.current || !listRef.current) return;
			const delta = e.clientX - dragStartX.current;
			if (Math.abs(delta) > 5) hasDragged.current = true;
			listRef.current.scrollLeft = scrollStartLeft.current - delta;
		};

		const handleMouseUp = () => {
			if (!isDragging.current || !listRef.current) return;
			isDragging.current = false;
			listRef.current.style.cursor = "";
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			el.removeEventListener("scroll", checkScroll);
			ro.disconnect();
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [checkScroll]);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const el = listRef.current;
		if (!el) return;
		isDragging.current = true;
		hasDragged.current = false;
		dragStartX.current = e.clientX;
		scrollStartLeft.current = el.scrollLeft;
		el.style.cursor = "grabbing";
	};

	const handleClickCapture = (e: React.MouseEvent) => {
		if (hasDragged.current) {
			e.stopPropagation();
			hasDragged.current = false;
		}
	};

	const handleScroll = (direction: "left" | "right") => {
		listRef.current?.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	return (
		<TabsRadix.Root
			id={id}
			defaultValue={defaultValue}
			value={value}
			onValueChange={onValueChange}
			orientation="horizontal"
			activationMode={keyboardActivationMode}
			className={clsx(styles.Root, className)}
			data-testid={testId}
		>
			<div className={styles.ListWrapper}>
				<button
					type="button"
					aria-hidden="true"
					tabIndex={-1}
					className={clsx(styles.ScrollButton, {
						[styles.ScrollButtonHidden]: !canScrollLeft,
					})}
					onClick={() => handleScroll("left")}
				>
					<ChevronLeftRegular />
				</button>

				<div
					ref={listRef}
					role="none"
					className={styles.ListScroll}
					onMouseDown={handleMouseDown}
					onClickCapture={handleClickCapture}
				>
					<TabsRadix.List loop={loop} aria-label={ariaLabel} className={styles.List}>
						{items.map((item) => (
							<TabsRadix.Trigger
								key={item.value}
								value={item.value}
								disabled={disabled || item.disabled}
								className={styles.Trigger}
							>
								{item.icon}
								{item.label}
							</TabsRadix.Trigger>
						))}
					</TabsRadix.List>
				</div>

				<button
					type="button"
					aria-hidden="true"
					tabIndex={-1}
					className={clsx(styles.ScrollButton, {
						[styles.ScrollButtonHidden]: !canScrollRight,
					})}
					onClick={() => handleScroll("right")}
				>
					<ChevronRightRegular />
				</button>
			</div>

			{items.map((item) => (
				<TabsRadix.Content key={item.value} value={item.value} className={styles.Content}>
					{item.content}
				</TabsRadix.Content>
			))}
		</TabsRadix.Root>
	);
};

export default Tabs;

