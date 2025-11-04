import React from 'react';
import styles from './styles.module.scss';

export interface DosAndDontsItem {
  do?: {
    example: React.ReactElement;
    description: string;
  };
  dont?: {
    example: React.ReactElement;
    description: string;
  };
}

interface DosAndDontsProps {
  items: DosAndDontsItem[];
}

export const DosAndDonts: React.FC<DosAndDontsProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null; // ✅ Não renderiza se não houver exemplos
  }

  return (
    <div className={styles.dosAndDontsContainer}>
      {items.map((item, index) => (
        <div key={index} className={styles.comparisonRow}>
          {/* ✅ DO */}
          {item.do && (
            <div className={styles.doCard}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>✅</span>
                <h3 className={styles.cardTitle}>Do</h3>
              </div>
              <div className={styles.cardExample}>
                {item.do.example}
              </div>
              <p className={styles.cardDescription}>
                {item.do.description}
              </p>
            </div>
          )}

          {/* ❌ DON'T */}
          {item.dont && (
            <div className={styles.dontCard}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>❌</span>
                <h3 className={styles.cardTitle}>Don't</h3>
              </div>
              <div className={styles.cardExample}>
                {item.dont.example}
              </div>
              <p className={styles.cardDescription}>
                {item.dont.description}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};