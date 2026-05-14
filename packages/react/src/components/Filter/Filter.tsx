// Filter.tsx
import React from 'react';

import CombinedFilter from './components/CombinedFilter';
import SimpleFilter from './components/SimpleFilter';

import type { FilterProps } from './Filter.types';

const Filter: React.FC<FilterProps> = ({
  mode = 'simple',
  ...props
}) => {
  if (mode === 'combined') {
    return <CombinedFilter {...props} />;
  }

  return <SimpleFilter {...props} />;
};

export default Filter;

