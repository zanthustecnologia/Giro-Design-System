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
	activationMode = "automatic",
	dir,
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

	const checkScroll = React.useCallback(() => {
		const el = listRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 0);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
	}, []);

	React.useEffect(() => {
		const el = listRef.current;
		if (!el) return;
		checkScroll();
		el.addEventListener("scroll", checkScroll);
		const ro = new ResizeObserver(checkScroll);
		ro.observe(el);
		return () => {
			el.removeEventListener("scroll", checkScroll);
			ro.disconnect();
		};
	}, [checkScroll]);

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
			activationMode={activationMode}
			dir={dir}
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

				<div ref={listRef} className={styles.ListScroll}>
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

