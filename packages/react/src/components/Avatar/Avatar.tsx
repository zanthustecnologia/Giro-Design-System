import clsx from 'clsx';
import { Avatar as AvatarRadix } from "radix-ui";
import React from 'react';

import styles from './Avatar.module.scss';


import type { AvatarProps } from './Avatar.types';

const Avatar: React.FC<AvatarProps> = ({
  icon,
  size = 'lg',
  src,
  className,
  text,
  ...rest
}) => {
  const AvatarClass = clsx(
    styles.AvatarRoot,
    {
      [styles['AvatarRoot--lg']]: size === 'lg',
      [styles['AvatarRoot--sm']]: size === 'sm',
    },
    className
  );

  const truncatedText = text ? text.slice(0, 2) : undefined;

  return (
      <AvatarRadix.Root className={AvatarClass} {...rest}>
        {src && (
            <AvatarRadix.Image
              className={styles.AvatarImage}
              src={src}
              alt="Avatar"
            />
        )}
        <AvatarRadix.Fallback className={styles.AvatarFallback}>
          {icon || truncatedText}
        </AvatarRadix.Fallback>
      </AvatarRadix.Root>
  );
};

export default Avatar;
