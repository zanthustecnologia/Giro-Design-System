import clsx from "clsx";
import { Popover as PopoverRadix } from "radix-ui";
import * as React from "react";

import styles from "./Popover.module.scss";
import { PopoverProps } from "./Popover.types";

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  side = "left",
  align = "start",  
  sideOffset = 8,  
  open,
  onOpenChange,
  asAnchor = false,
  onOpenAutoFocus,
  onCloseAutoFocus,
  showArrow = false,
  className,
  ...rest
}) => {
  return (
    <PopoverRadix.Root open={open} onOpenChange={onOpenChange} {...rest}>
      {asAnchor ? (
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
          className={clsx(styles.Content, className)}
          sideOffset={sideOffset}
          side={side}
          align={align}
          onOpenAutoFocus={asAnchor ? (e) => e.preventDefault() : onOpenAutoFocus}
          onCloseAutoFocus={asAnchor ? (e) => e.preventDefault() : onCloseAutoFocus}
          onInteractOutside={asAnchor ? (e) => e.preventDefault() : undefined}
        >
          {content}
          {showArrow && <PopoverRadix.Arrow className={styles.Arrow} />}
        </PopoverRadix.Content>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};

export default Popover;
