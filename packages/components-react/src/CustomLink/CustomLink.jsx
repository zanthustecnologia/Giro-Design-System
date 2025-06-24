import clsx from 'clsx';
import React, { forwardRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './CustomLink.scss';

const CustomLink = forwardRef(({ children, variant = 'filled', className = null, icon = null, iconPosition = 'left', to = null, disabled = false, onClick = null, size = 'lg', ariaLabel = '', ...props }) => {
    const handleClick = useCallback((e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        if (onClick) {
            onClick(e);
        }
    }, [onClick, disabled])
    const customLinkClasses = clsx(
        'zds-button-link',
        `zds-button-link--${variant}`,
        `zds-button-link--${size}`,
        {
            'zds-button-link--with-icon': icon,
            [`zds-button-link--icon-position-${iconPosition}`]: icon,
            'zds-button-link--no-content': !children,
            [`zds-button-link--${variant}--disabled`]: disabled,
            [className]: className
        }
    )
    return (
        <Link
            to={disabled ? '#' : to}
            aria-disabled={disabled}
            aria-label={ariaLabel}
            tabIndex={disabled ? -1 : 0}
            className={customLinkClasses}
            onClick={(e) => handleClick(e)}
            {...props}
        >
            {icon && iconPosition === 'left' && (
                <span className='zds-button-link--icon zds-button-link--icon--left'>{icon}</span>
            )}

            {children}
            {icon && iconPosition === 'right' && (
                <span className='zds-button-link--icon zds-button-link--icon--right'>{icon}</span>
            )}

        </Link>
    );
});
export default React.memo(CustomLink);