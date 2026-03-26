import React from 'react';

import styles from './Footer.module.scss';

interface FooterProps {
  title?: string;
  description?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  title = "Feedback", 
  description = "Conte para nós o que você achou do nosso design system" 
}) => {
  return (
    <div className={styles.docsFooter}>
      <div className={styles.docsFooterContent}>
        <div className={styles.docsFooterTitles}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
