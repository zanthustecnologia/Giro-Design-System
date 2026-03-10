import { Popover as PopoverRadix } from "radix-ui";
import * as React from "react";

import styles from "./Popover.module.scss";
import { PopoverProps } from "./Popover.types";

const Popover: React.FC<PopoverProps> = ({
  children
}) => {
   const [trigger, content] = React.Children.toArray(children);

  return (
    <PopoverRadix.Root>
      <PopoverRadix.Trigger asChild>
        {trigger}
      </PopoverRadix.Trigger>
      <PopoverRadix.Portal>
        <PopoverRadix.Content className={styles.Content} sideOffset={5}>
            {content}
          <PopoverRadix.Arrow className={styles.Arrow} />
        </PopoverRadix.Content>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};

export default Popover;
