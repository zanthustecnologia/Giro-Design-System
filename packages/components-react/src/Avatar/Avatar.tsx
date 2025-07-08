import React, { useId } from 'react';
import './avatar.scss';
import clsx from 'clsx';


interface AvatarProps {
  id?: string;
  icon: React.ReactNode;
  size?: 'small' | 'large';
  className?: string;
}

let Avatar = ({ id = '', icon, size = 'small', className = '' }: AvatarProps) => {
  const componentId = id || useId();
  const AvatarClass = clsx(
    'zds-avatar__circle',
    {
      'zds-avatar__large': size === 'large',
      'zds-avatar__small': size === 'small',
    },
    { [className]: className }
  );

  return (
    <div className={AvatarClass} id={componentId} role="img" aria-label={`Avatar ${size}`}>
      <div className={`zds-avatar__circle__icon`}>
        {icon}
      </div>
    </div>
  );
};

export default Avatar;
