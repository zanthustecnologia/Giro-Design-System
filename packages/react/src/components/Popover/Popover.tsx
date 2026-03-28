import { Popover as PopoverRadix } from "radix-ui";
import * as React from "react";

import styles from "./Popover.module.scss";
import { PopoverProps } from "./Popover.types";

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  side = "left",
  align = "end",
  sideOffset = 5,
  open,
  onOpenChange,
  onOpenAutoFocus,
}) => {
  return (
    <PopoverRadix.Root open={open} onOpenChange={onOpenChange}>
      <PopoverRadix.Trigger asChild>
        {trigger}
      </PopoverRadix.Trigger>
      <PopoverRadix.Portal>
        <PopoverRadix.Content
          className={styles.Content}
          sideOffset={sideOffset}
          side={side}
          align={align}
          onOpenAutoFocus={onOpenAutoFocus}
        >
            {content}
        </PopoverRadix.Content>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};

export default Popover;
