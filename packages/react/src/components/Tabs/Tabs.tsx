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
	orientation = "horizontal",
	activationMode = "automatic",
	dir,
	loop = true,
	className,
	disabled,
	id,
	"aria-label": ariaLabel,
	"data-testid": testId,
}) => (
	<TabsRadix.Root
		id={id}
		defaultValue={defaultValue}
		value={value}
		onValueChange={onValueChange}
		orientation={orientation}
		activationMode={activationMode}
		dir={dir}
		className={clsx(styles.Root, className)}
		data-testid={testId}
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

		{items.map((item) => (
			<TabsRadix.Content key={item.value} value={item.value} className={styles.Content}>
				{item.content}
			</TabsRadix.Content>
		))}
	</TabsRadix.Root>
);

export default Tabs;
