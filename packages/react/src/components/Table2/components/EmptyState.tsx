import { SearchInfo20Regular } from '@fluentui/react-icons';
import React from 'react';

import styles from '../Table.module.scss';

import type { EmptyStateProps } from '../Table.types';

const EmptyState = ({ emptyIcon, emptyTitle, emptyText }: EmptyStateProps) => (
  <div className={styles.tableEmpty}>
    <div className={styles.tableEmptyContent}>
      {emptyIcon ?? <SearchInfo20Regular />}
    </div>
    <div className={styles.tableEmptyText}>
      <>
        {emptyTitle ?? (
          <h3 className={styles.tableEmptyTitle}>Nenhum dado encontrado</h3>
        )}
        {emptyText ?? (
          <p className={styles.tableEmptyCaption}>Nenhum registro encontrado</p>
        )}
      </>
    </div>
  </div>
);

export default EmptyState;
