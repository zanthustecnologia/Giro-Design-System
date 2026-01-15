import React from 'react';
import { CheckboxChecked24Filled, DismissSquare24Filled } from '@fluentui/react-icons';

import styles from './Rules.module.scss';


interface Rule {
  positive: {
    component: React.ReactNode;
    description: string;
  };
  negative: {
    component: React.ReactNode;
    description: string;
  };
}

interface ComponentRulesProps {
  rules: Rule[];
}

export const ComponentRules: React.FC<ComponentRulesProps> = ({ rules }) => {
  return (
    <div className={styles.componentRules}>
      {rules.map((rule, index) => (
        <div key={index} className={styles.ruleRow}>
          <div className={`${styles.ruleItem} ${styles.negative}`}>
            <div className={styles.ruleColumn}>
              <div className={styles.ruleExample}>{rule.negative.component}</div>
            </div>
            <div className={styles.ruleHeader}>
              <DismissSquare24Filled className={styles.icon} />
              <strong>Não recomendado</strong>
            </div>
            <p className={styles.ruleDescription}>{rule.negative.description}</p>
          </div>
          <div className={`${styles.ruleItem} ${styles.positive}`}>
            <div className={styles.ruleColumn}>
              <div className={styles.ruleExample}>{rule.positive.component}</div>
            </div>
            <div className={styles.ruleHeader}>
              <CheckboxChecked24Filled className={styles.icon} />
              <strong>Recomendado</strong>
            </div>
            <p className={styles.ruleDescription}>{rule.positive.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
