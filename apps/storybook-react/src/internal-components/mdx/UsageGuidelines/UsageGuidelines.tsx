import React from 'react';

import styles from './UsageGuidelines.module.scss'

interface UsageGuidelinesProps {
  guidelines: React.ReactNode[];
}

export const UsageGuidelines: React.FC<UsageGuidelinesProps> = ({ guidelines }) => {
  return (
    <div className={styles.usageGuidelines}>
      <h2>Usage Guidelines</h2>
      <ul>
        {guidelines.map((guideline, index) => (
          <li key={index}>{guideline}</li>
        ))}
      </ul>
    </div>
  );
};
