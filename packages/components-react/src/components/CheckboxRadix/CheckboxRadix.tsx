import * as React from "react";
import { Checkbox } from "radix-ui";
// import { CheckIcon } from "@radix-ui/react-icons";
import styles from "./CheckboxRadix.module.scss";
import CheckSmall from "../Checkbox/CheckSmall";

const CheckboxRadix = () => (
		<div style={{ display: "flex", alignItems: "center" }}>
			<Checkbox.Root className={styles.Root} defaultChecked id="c1">
				<Checkbox.Indicator className={styles.Indicator}>
          <CheckSmall></CheckSmall>
				</Checkbox.Indicator>
			</Checkbox.Root>
			<label className={styles.Label} htmlFor="c1">
				Accept terms and conditions.
			</label>
		</div>

);

export default CheckboxRadix;
