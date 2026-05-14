// Filter.tsx
import React from 'react';

import SimpleFilter from './components/SimpleFilter';

import type { FilterProps } from './Filter.types';

const Filter: React.FC<FilterProps> = ({
  mode = 'simple',
  ...props
}) => {
  if (mode === 'combined') {
    // CombinedFilter será implementado futuramente
    return <SimpleFilter {...props} />;
  }

  return <SimpleFilter {...props} />;
};

export default Filter;

