import React from 'react';
import styles from './styles.module.scss';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
  Canvas,
  Source,
} from '@storybook/addon-docs/blocks';

export const CustomAutoDoc = () => {
  return (
    <>
      <div className={styles.container}>
        <div >
          <div className={styles.header}>
            <div className={styles.title}>
              <Title />
            </div>
          </div>
          <div className={styles.description}>
            <Description />
          </div>
          <Primary />
        </div>

        <div>
          <h2 className={styles.subTitle}>Import</h2>
          <Source
            code={`import {nome do componente} from '@zanthus/componentes-react'`}
          />
        </div>

        <div
        
        >
          <h2 className={styles.subTitle}>
            Props
          </h2>
          <div className={styles.props}>
            <Controls />
          </div>
        </div>
        <div>
          <h2 className={styles.subTitle}>
            Accessibility
          </h2>
          <ul className={styles.accessibilityList}>
            <li> Navegação por teclado (Tab, Enter, Escape)</li>
            <li> ARIA labels e roles</li>
            <li> Contraste de cores (WCAG AA)</li>
            <li> Estados de foco visíveis</li>
          </ul>
        </div>
        <div className={styles.variants}>
          <h2 className={styles.subTitle}>
            Variantes
          </h2>
          <Stories />
        </div>
      </div>
    </>
  );
};
