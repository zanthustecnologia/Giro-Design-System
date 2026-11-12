import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";
import clsx from "clsx";
import { Tabs as TabsRadix } from "radix-ui";
import * as React from "react";

import { useTabsScroll } from "./hooks/useTabsScroll";
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
	const {
		listRef,
		innerListRef,
		canScrollLeft,
		canScrollRight,
		isSnapScrolling,
		handleScroll,
		handleMouseDown,
		handleClickCapture,
		handleBounceTransitionEnd,
	} = useTabsScroll({ scrollAmount });

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
					className={clsx(styles.ListScroll, { [styles.ListScrollSnap]: isSnapScrolling })}
					onMouseDown={handleMouseDown}
					onClickCapture={handleClickCapture}
				>
					<TabsRadix.List
						ref={innerListRef}
						loop={loop}
						aria-label={ariaLabel}
						className={styles.List}
						onTransitionEnd={handleBounceTransitionEnd}
					>
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

