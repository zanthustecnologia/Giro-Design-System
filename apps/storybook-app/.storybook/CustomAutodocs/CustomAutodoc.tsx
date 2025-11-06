import React from 'react';
import styles from './styles.module.scss';
import { DosAndDonts, DosAndDontsItem } from './components/DosAndDonts';
import {
  Title,
  Description,
  Primary,
  Controls,
  Stories,
  Source,
  useOf,
} from '@storybook/addon-docs/blocks';

export const CustomAutoDoc = () => {
  const resolvedOf = useOf('meta');

  if (resolvedOf.type !== 'meta') {
    return null;
  }

  const { preparedMeta } = resolvedOf;
  const parameters = preparedMeta.parameters;

  const dosAndDontsData: DosAndDontsItem[] | undefined =
    parameters?.docs?.dosAndDonts;

  const componentName = preparedMeta.title?.split('/')?.pop() || 'Component';

  const accessibilityInfo: string[] = parameters?.docs?.accessibility || [];
  const usageInfo: string[] = parameters?.docs?.usage || [];
  const aditionalInformations: string[] =
    parameters?.docs?.aditionalInformations || [];

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
            code={`import ${componentName} from '@zanthus/components-react'`}
          />
        </div>
        <div>
          <h2 className={styles.subTitle}>Props</h2>
          <div className={styles.props}>
            <Controls />
          </div>
        </div>
        {usageInfo.length > 0 && (
          <div className={styles.section}>
            <h2>Usage</h2>
            <ul className={styles.uiList}>
              {usageInfo.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          {accessibilityInfo.length > 0 && (
            <div className={styles.section}>
              <h2> Accessibility</h2>
              <ul className={styles.uiList}>
                {accessibilityInfo.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.variants}>
            <h2 className={styles.subTitle}>Variants</h2>
            <Stories />
          </div>
          {dosAndDontsData && dosAndDontsData.length > 0 && (
            <div className={styles.section}>
              <h2>Do’s and Don’ts</h2>
              <DosAndDonts items={dosAndDontsData} />
            </div>
          )}
          {aditionalInformations.length > 0 && (
            <div className={styles.section}>
              <h2> Aditional Informations</h2>
              <ul className={styles.uiList}>
                {aditionalInformations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <footer className={styles.footer}>teste</footer>
    </>
  );
};
