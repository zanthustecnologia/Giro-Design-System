import React, { useId } from 'react';
import './Avatar.modules.scss';
import clsx from 'clsx';


interface AvatarProps {
  id?: string;
  icon: React.ElementType;
  size?: 'small' | 'large';
  className?: string;
}

let Avatar = ({ id = '', icon: Icon, size = 'small', className = '' }: AvatarProps) => {
  const componentId = id || useId();
  const AvatarClass = clsx(
    'zds-avatar__circle',
    {
      '__large': size === 'large',
      '__small': size === 'small',
    },
    { [className]: className }
  );

  return (
    <div className={AvatarClass} id={componentId} role="img" aria-label={`Avatar ${size}`}>
      <div className={`zds-avatar__circle__icon`}>
        <Icon />
      </div>
    </div>
  );
};

export default Avatar;
