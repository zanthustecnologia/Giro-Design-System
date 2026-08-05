import React from 'react';

import Toggle from './components/Toggle';
import ToggleGroup from './components/ToggleGroup';

import type { ToggleButtonProps } from './ToggleButton.types';

const ToggleButton: React.FC<ToggleButtonProps> = ({
  mode = 'simple',
  ...props
}) => {
  if (mode === 'combined') {
    return <ToggleGroup {...props} />;
  }

  return <Toggle {...props} />;
};

export default ToggleButton;

