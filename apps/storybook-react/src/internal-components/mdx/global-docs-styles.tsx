import React from 'react';

export const GlobalDocsStyles: React.FC = () => {
  return (
    <style>{`
      h1 {
        font-size: var(--font-size-32) !important;
        font-weight: var(--font-weight-bold) !important;
      }
      
      h2 {
        margin-top: 64px !important;
      }
      
      h2:first-of-type {
        margin-top: 40px !important;
      }
      
      h3 {
        margin-top: 64px !important;
      }
    `}</style>
  );
};
