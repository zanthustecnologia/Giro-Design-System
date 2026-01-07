import * as React from "react";
import { Switch } from "radix-ui";
import styles from "./SwitchRadix.modules.scss";
import { SwitchRadixProps } from './SwitchRadix.types';

const SwitchRadix: React.FC<SwitchRadixProps> = ({
  children,
	text ,
}) => (
	<form>
		<div>
			<label
				className={styles["Label"]}
			>
				{text}
			</label>
			<Switch.Root className={styles["SwitchRoot"]} >
				<Switch.Thumb className={styles["SwitchThumb"]} />
			</Switch.Root>
		</div>
	</form>
);

export default SwitchRadix;