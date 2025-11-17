import React from 'react';
import { CheckboxChecked24Filled, DismissSquare24Filled } from '@fluentui/react-icons';

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
    <div className="component-rules">
      {rules.map((rule, index) => (
        <div key={index} className="rule-row">
          <div className="rule-item positive">
            <div className="rule-column">
              <div className="rule-example">{rule.positive.component}</div>
            </div>
            <div className="rule-header">
              <CheckboxChecked24Filled className="icon" />
              <strong>Do</strong>
            </div>
            <p className="rule-description">{rule.positive.description}</p>
          </div>
          <div className="rule-item negative">
            <div className="rule-column">
              <div className="rule-example">{rule.negative.component}</div>
            </div>
            <div className="rule-header">
              <DismissSquare24Filled className="icon" />
              <strong>Don't</strong>
            </div>
            <p className="rule-description">{rule.negative.description}</p>
          </div>
        </div>
      ))}
      <style>{`
        .component-rules {
          margin: var(--spacing-32) 0;
        }
        .rule-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-24);
          margin-bottom: 56px;
        }
        .rule-item {
          display: flex;
          flex-direction: column;
        }
        .rule-column {
          display: flex;
          flex-direction: column;
          padding: var(--spacing-16);
          border-radius: var(--border-radius-8);
          background-color: var(--color-neutral-high-light);
          margin-bottom: var(--spacing-12);
        }
        .rule-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-8);
          margin-bottom: var(--spacing-8);
          font-size: var(--font-size-16);
          font-weight: var(--font-weight-bold);
        }
        .rule-item.positive .icon {
          color: #22c55e;
        }
        .rule-item.negative .icon {
          color: #ef4444;
        }
        .rule-example {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-12);
          padding: var(--spacing-24);
          border-radius: var(--border-radius-4);
          min-height: 80px;
        }
        .rule-description {
          font-size: var(--font-size-16);
          line-height: 1.6;
          color: var(--color-neutral-low-default);
          margin: 0;
        }
        @media (max-width: 768px) {
          .rule-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
