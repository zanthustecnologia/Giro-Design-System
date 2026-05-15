// Filter.tsx
import React from 'react';

import Combined from './components/Combined';
import Simple from './components/Simple';

import type { FilterProps } from './Filter.types';

const Filter: React.FC<FilterProps> = ({
  mode = 'simple',
  ...props
}) => {
  if (mode === 'combined') {
    return <Combined {...props} />;
  }

  return <Simple {...props} />;
};

export default Filter;

