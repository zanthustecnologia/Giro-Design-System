import React from 'react';
import styles from './styles.module.scss';
import { DosAndDonts, DosAndDontsItem } from './components/DosAndDonts';
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
  const teste = [
    { do: { example: <button>Do this</button>, description: 'Description for do' } },
    { dont: { example: <button>Don't do this</button>, description: 'Description for dont' } },
  ]
  // const dosAndDontsData: DosAndDontsItem[] | undefined =
  //   parameters?.docs?.dosAndDonts;

  // ✅ Pegar accessibility info (vem dos parameters)
  // const accessibilityInfo: string[] = docs?.accessibility || [
  //   'Navegação por teclado (Tab, Enter, Escape)',
  //   'ARIA labels e roles',
  //   'Contraste de cores (WCAG AA)',
  //   'Estados de foco visíveis',
  // ];
  return (
    <>
      <div className={styles.container}>
        <div>
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

        <div>
          <h2 className={styles.subTitle}>Props</h2>
          <div className={styles.props}>
            <Controls />
          </div>
        </div>
        <div>
          <h2 className={styles.subTitle}>Accessibility</h2>
          <ul className={styles.accessibilityList}>
            <li> Navegação por teclado (Tab, Enter, Escape)</li>
            <li> ARIA labels e roles</li>
            <li> Contraste de cores (WCAG AA)</li>
            <li> Estados de foco visíveis</li>
          </ul>
        </div>
        <div className={styles.variants}>
          <h2 className={styles.subTitle}>Variantes</h2>
          <Stories />
        </div>
        <div>
          <h2 className={styles.subTitle}>Exemplos de uso</h2>
          <DosAndDonts
            items={teste}
          />
        </div>
      </div>
    </>
  );
};
