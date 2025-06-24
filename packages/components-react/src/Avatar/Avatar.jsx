import React from 'react';
import './Avatar.scss';
import PropTypes from 'prop-types';

let Avatar = ({ icon, size = 'small', className = null, ...props }) => {
  return (
    <div className={'zds-avatar__circle' + (size === 'large' ? '__large' : '__small') + (className ? ' ' + className : '')}>
      <div className={`zds-avatar__circle__${size}__icon`} {...props}>{icon}</div>
    </div>
  );
};

Avatar.propTypes = {
  /** icone React que deve ser importado da Lib FluentUI */
  icon: PropTypes.elementType.isRequired,
  /** Define o tamanho do avatar entre as opções: */
  size: PropTypes.oneOf(['large', 'small']),
};
export default Avatar;
