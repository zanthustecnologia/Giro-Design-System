import { Popover as PopoverRadix } from "radix-ui";
import * as React from "react";

import styles from "./Popover.module.scss";
import { PopoverProps } from "./Popover.types";

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  side = "left",
  align = "end",
}) => {
  return (
    <PopoverRadix.Root>
      <PopoverRadix.Trigger asChild>
        {trigger}
      </PopoverRadix.Trigger>
      <PopoverRadix.Portal>
        <PopoverRadix.Content className={styles.Content} sideOffset={5} side={side} align={align}>
            {content}
          <PopoverRadix.Arrow className={styles.Arrow} />
        </PopoverRadix.Content>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};

export default Popover;
