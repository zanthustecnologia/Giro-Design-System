import styles from './index.module.scss';
import {
  CheckboxCheckedRegular,
  CheckmarkCircleColor,
  DismissCircleColor,
} from '@fluentui/react-icons';

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
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <div key={index} className={styles.comparisonRow}>
          {item.do && (
            <div className={`${styles.wrapperContent} ${styles.do}`}>
              <div className={styles.card}>{item.do.example}</div>
              <div className={styles.header}>
                <span className={styles.icon}>✅</span>
                <h3>Do</h3>
              </div>
              <p className={styles.description}>{item.do.description}</p>
            </div>
          )}
          {item.dont && (
            <div className={`${styles.wrapperContent} ${styles.dont}`}>
              <div className={styles.card}>{item.dont.example}</div>
              <div className={styles.header}>
                <span className={styles.icon}>❌</span>
                <h3>Don't</h3>
              </div>
              <p className={styles.description}>{item.dont.description}</p>
            </div>
          )}
        </div>
      ))}
      
    </div>
  );
};
