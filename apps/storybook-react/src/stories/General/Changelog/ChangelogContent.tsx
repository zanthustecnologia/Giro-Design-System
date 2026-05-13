import React from 'react';
import { Chips } from '@giro-ds/react';
import { reactChangelog, tokensChangelog, utilitiesChangelog, tagDates } from 'virtual:changelogs';
import styles from './Changelog.module.scss';

type Section = {
  type: 'major' | 'minor' | 'patch';
  label: string;
  rawContent: string;
};

type VersionEntry = {
  packageName: string;
  version: string;
  sections: Section[];
};

const SECTION_TYPES: Record<string, Section['type']> = {
  'Major Changes': 'major',
  'Minor Changes': 'minor',
  'Patch Changes': 'patch',
};

function parseChangelog(raw: string, packageName: string): VersionEntry[] {
  const entries: VersionEntry[] = [];
  const withoutTitle = raw.replace(/^#[^\n]*\n+/, '').trim();
  const versionBlocks = withoutTitle.split(/\n(?=## )/);

  for (const block of versionBlocks) {
    const lines = block.split('\n');
    const versionMatch = lines[0].match(/^## (.+)/);
    if (!versionMatch) continue;

    const version = versionMatch[1].trim();
    const rest = lines.slice(1).join('\n');
    const sectionBlocks = rest.split(/\n(?=### )/);
    const sections: Section[] = [];

    for (const sBlock of sectionBlocks) {
      const sLines = sBlock.split('\n');
      const sectionMatch = sLines[0].match(/^### (.+)/);
      if (!sectionMatch) continue;

      const label = sectionMatch[1].trim();
      const type = SECTION_TYPES[label] ?? 'patch';
      const rawContent = sLines.slice(1).join('\n').trim().replace(/^- [a-f0-9]{7,}: /gm, '- ');

      if (rawContent) {
        sections.push({ type, label, rawContent });
      }
    }

    if (sections.length > 0) {
      entries.push({ packageName, version, sections });
    }
  }

  return entries;
}

function renderInline(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function RawContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // Code fence
    if (line.trimStart().startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(
        <pre key={i} className={styles.codeBlock}><code>{codeLines.join('\n')}</code></pre>
      );
      continue;
    }

    // Bullet at any indent level
    const bulletMatch = line.match(/^(\s*)- (.*)/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      const text = bulletMatch[2].replace(/^[a-f0-9]{7,}: /, '');
      elements.push(
        <div key={i} className={styles.bulletItem} style={{ paddingLeft: `${indent * 10}px` }}>
          <span dangerouslySetInnerHTML={{ __html: renderInline(text) }} />
        </div>
      );
      i++;
      continue;
    }

    // Plain / indented text
    const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
    elements.push(
      <p key={i} className={styles.paragraph} style={{ paddingLeft: `${indent * 10}px` }}
        dangerouslySetInnerHTML={{ __html: renderInline(line.trim()) }}
      />
    );
    i++;
  }

  return <div className={styles.rawContent}>{elements}</div>;
}

function semverToNum(v: string) {
  const [major = 0, minor = 0, patch = 0] = v.split('.').map(Number);
  return major * 1_000_000 + minor * 1_000 + patch;
}

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun',
                  'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
}

const PACKAGE_CHIP_TYPE: Record<string, 'brand' | 'success' | 'neutral'> = {
  '@giro-ds/react': 'brand',
  '@giro-ds/tokens': 'success',
  '@giro-ds/utilities': 'neutral',
};

export function ChangelogContent() {
  const all = [
    ...parseChangelog(reactChangelog, '@giro-ds/react'),
    ...parseChangelog(tokensChangelog, '@giro-ds/tokens'),
    ...parseChangelog(utilitiesChangelog, '@giro-ds/utilities'),
  ];

  const grouped = all.reduce<Record<string, VersionEntry[]>>((acc, entry) => {
    if (!acc[entry.version]) acc[entry.version] = [];
    acc[entry.version].push(entry);
    return acc;
  }, {});

  const sortedVersions = Object.keys(grouped).sort(
    (a, b) => semverToNum(b) - semverToNum(a)
  );

  const latestVersion = sortedVersions[0];

  return (
    <div className={styles.changelog}>
      {sortedVersions.map((version) => {
        const entries = grouped[version];

        const isLatest = version === latestVersion;

        // Date: most recent release date across packages in this version
        const date = ['@giro-ds/react', '@giro-ds/tokens', '@giro-ds/utilities'].map((pkg) => tagDates[`${pkg}@${version}`])
          .filter(Boolean)
          .sort()
          .reverse()[0];

        // Change counts
        const counts = { major: 0, minor: 0, patch: 0 };
        entries.forEach((e) =>
          e.sections.forEach((s) => { counts[s.type]++; })
        );

        return (
          <div key={version} className={styles.versionGroup}>
            <div className={styles.versionHeadingBtn}>
              <div className={styles.versionLeft}>
                <span className={styles.versionNumber}>v{version}</span>
                {isLatest && <span className={styles.latestBadge}>Mais recente</span>}
                {date && <span className={styles.versionDate}>{formatDate(date)}</span>}
              </div>
              <div className={styles.versionRight}>
                {counts.major > 0 && (
                  <span className={`${styles.countChip} ${styles.countMajor}`}>
                    {counts.major} breaking
                  </span>
                )}
                {counts.minor > 0 && (
                  <span className={`${styles.countChip} ${styles.countMinor}`}>
                    {counts.minor} {counts.minor === 1 ? 'feature' : 'features'}
                  </span>
                )}
                {counts.patch > 0 && (
                  <span className={`${styles.countChip} ${styles.countPatch}`}>
                    {counts.patch} {counts.patch === 1 ? 'fix' : 'fixes'}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.cards}>
                {entries.map((entry) => (
                  <div key={entry.packageName} className={styles.entry}>
                    {entry.sections.map((section, sectionIndex) => (
                      <div key={section.type} className={`${styles.section} ${styles[section.type]}`}>
                        <div className={styles.sectionHeader}>
                          <span className={styles.sectionLabel}>{section.label}</span>
                          {sectionIndex === 0 && (
                            <Chips variant={PACKAGE_CHIP_TYPE[entry.packageName]}>
                              {entry.packageName}
                            </Chips>
                          )}
                        </div>
                        <RawContent content={section.rawContent} />
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
