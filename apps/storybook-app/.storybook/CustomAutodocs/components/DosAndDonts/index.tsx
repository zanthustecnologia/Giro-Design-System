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
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>✅</span>
                <h3 className={styles.cardTitle}>Do</h3>
              </div>
              <div className={styles.cardExample}>{item.do.example}</div>
              <p className={styles.cardDescription}>{item.do.description}</p>
            </div>
          )}
          {item.dont && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.icon}>❌</span>
                <h3 className={styles.cardTitle}>Don't</h3>
              </div>
              <div className={styles.cardExample}>{item.dont.example}</div>
              <p className={styles.cardDescription}>{item.dont.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
