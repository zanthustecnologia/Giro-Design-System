import { Popover as PopoverRadix } from "radix-ui";
import * as React from "react";

import styles from "./Popover.module.scss";
import { PopoverProps } from "./Popover.types";

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  side = "left",
  align = "start",  
  sideOffset = 5,  
  open,
  onOpenChange,
}) => {
  const isControlled = open !== undefined;

  return (
    <PopoverRadix.Root
      {...(isControlled ? { open, onOpenChange } : {})}
    >
      {isControlled ? (
        <PopoverRadix.Anchor asChild>
          {trigger}
        </PopoverRadix.Anchor>
      ) : (
        <PopoverRadix.Trigger asChild>
          {trigger}
        </PopoverRadix.Trigger>
      )}
      <PopoverRadix.Portal>
        <PopoverRadix.Content
          className={styles.Content}
          sideOffset={sideOffset}
          side={side}
          align={align}
          onOpenAutoFocus={isControlled ? (e) => e.preventDefault() : undefined}
          onCloseAutoFocus={isControlled ? (e) => e.preventDefault() : undefined}
          onInteractOutside={isControlled ? (e) => e.preventDefault() : undefined}
        >
            {content}
        </PopoverRadix.Content>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};

export default Popover;
