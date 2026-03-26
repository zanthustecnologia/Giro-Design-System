import { ArrowSquareUpRightRegular } from '@fluentui/react-icons';
import React from 'react';

import styles from './Footer.module.scss';

interface FooterProps {
  title?: string;
  description?: string;
  bugReportUrl?: string;
  generalContactUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
  title = "Feedback", 
  description = "Gostaríamos de saber sua opinião sobre o Giro",
  bugReportUrl = "https://github.com/zanthustecnologia/design-system-monorepo/issues/new?template=bug_report.yml",
  generalContactUrl = "https://docs.google.com/forms/d/e/1FAIpQLSecghffIsNo6ux2Op5lgTLzJ62ZQyyNpRRg5vYmiH4F5aAjvA/viewform?usp=dialog",
}) => {
  return (
    <div className={styles.docsFooter}>
      <div className={styles.docsFooterContent}>
        <div className={styles.docsFooterTitles}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className={styles.docsFooterCards}>
          <a
            className={styles.docsFooterCard}
            href={bugReportUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <strong>Reportar bug</strong>
              <p>Encontrou um problema em algum componente?</p>
            </div>
            <span className={styles.docsFooterCardLink}>Ver mais <ArrowSquareUpRightRegular /></span>
          </a>
          <a
            className={styles.docsFooterCard}
            href={generalContactUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <strong>Contato geral</strong>
              <p>Dúvidas, sugestões, pedidos de funcionalidades...</p>
            </div>
            <span className={styles.docsFooterCardLink}>Ver mais <ArrowSquareUpRightRegular /></span>
          </a>
        </div>
      </div>
    </div>
  );
};
