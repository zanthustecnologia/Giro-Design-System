import clsx from 'clsx';
import { Avatar as AvatarRadix } from "radix-ui";
import React, { useId } from 'react';

import styles from './Avatar.module.scss';

import type { AvatarRadixProps } from './Avatar.types';

const Avatar: React.FC<AvatarRadixProps> = ({
  icon,
  size = 'lg',
  src,
  className 
}) => {
  const AvatarClass = clsx(
    styles.AvatarRoot,
    {
      [styles['AvatarRoot--lg']]: size === 'lg',
      [styles['AvatarRoot--sm']]: size === 'sm',
    },
    className
  );

  return (
    <div>
      <AvatarRadix.Root className={AvatarClass}>
        {src && (
            <AvatarRadix.Image
              className={styles.AvatarImage}
              src={src}
              alt="Avatar"
            />
        )}
        <AvatarRadix.Fallback className={styles.AvatarFallback}>
          {icon}
        </AvatarRadix.Fallback>
      </AvatarRadix.Root>
    </div>
  );
};

export default Avatar;
