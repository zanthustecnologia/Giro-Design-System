import * as React from "react";
import clsx from 'clsx';
import { Switch } from "radix-ui";
import "./SwitchRadix.modules.scss";
import { SwitchRadixProps } from './SwitchRadix.types';

const SwitchRadix: React.FC<SwitchRadixProps> = ({
	text, 
	
}) => (
	<form>
		<div style={{ display: "flex", alignItems: "center" }}>
			<label className="Label" htmlFor="airplane-mode" style={{ paddingRight: 15 }}>
				{text}
			</label>
			<Switch.Root className="SwitchRoot">
				<Switch.Thumb className="SwitchThumb" />
			</Switch.Root>
		</div>
	</form>
);

export default SwitchRadix;