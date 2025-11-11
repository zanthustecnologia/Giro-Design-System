import React from 'react';

interface UsageGuidelinesProps {
  guidelines: React.ReactNode[];
}

export const UsageGuidelines: React.FC<UsageGuidelinesProps> = ({ guidelines }) => {
  return (
    <div className="usage-guidelines">
      <h2>Usage Guidelines</h2>
      <ul>
        {guidelines.map((guideline, index) => (
          <li key={index}>{guideline}</li>
        ))}
      </ul>
      <style>{`
        .usage-guidelines {
          margin: var(--spacing-24) 0;
          border-radius: var(--border-radius-8);
          border-left: 4px solid var(--color-primary-default);
        }
        .usage-guidelines h2 {
          font-size: var(--font-size-20);
          font-weight: var(--font-weight-bold);
          margin: 0 0 var(--spacing-16) 0;
          color: var(--color-neutral-low-default);
        }
        
        .usage-guidelines li {
          padding: var(--spacing-8) 0;
          font-size: var(--font-size-16);
          line-height: 1.6;
        }
        .usage-guidelines li code {
          background-color: var(--color-neutral-high-medium);
          padding: 2px 6px;
          border-radius: var(--border-radius-4);
          font-family: monospace;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};
