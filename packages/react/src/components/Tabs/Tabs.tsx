import * as React from "react";
import { Tabs as TabsRadix } from "radix-ui";
import styles from "./styles.module.css";

const Tabs = () => (
	<TabsRadix.Root>
		<TabsRadix.List>
			<TabsRadix.Trigger />
		</TabsRadix.List>
		<TabsRadix.Content />
	</TabsRadix.Root>
);

export default Tabs;
