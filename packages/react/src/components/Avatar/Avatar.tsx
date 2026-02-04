import clsx from 'clsx';
import React, { useId } from 'react';

import styles from './Avatar.module.scss';

import type { AvatarProps } from './Avatar.types';

const Avatar = ({ 
  id = '', 
  icon, 
  size = 'small', 
  className = '', 
  ...rest 
}: AvatarProps) => {
  const componentId = id || useId();
  const AvatarClass = clsx(
    styles['zds-avatar__circle'],
    {
      [styles['zds-avatar__large']]: size === 'large',
      [styles['zds-avatar__small']]: size === 'small',
    },
    className
  );

  return (
    <div className={AvatarClass} id={componentId} role="img" aria-label={`Avatar ${size}`} {...rest}>
      <div className={styles['zds-avatar__circle__icon']}>
        {icon}
      </div>
    </div>
  );
};

export default Avatar;
