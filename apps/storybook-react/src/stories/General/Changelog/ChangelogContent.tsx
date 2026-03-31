import React from 'react';
import { Chips } from '@giro-ds/react';
import { reactChangelog, tokensChangelog, utilitiesChangelog, tagDates } from 'virtual:changelogs';
import styles from './Changelog.module.scss';

type Section = {
  type: 'major' | 'minor' | 'patch';
  label: string;
  items: string[];
  migrationUrl?: string;
};

type VersionEntry = {
  packageName: string;
  version: string;
  sections: Section[];
};

const SECTION_MAP: Record<string, { type: Section['type']; label: string }> = {
  'Major Changes': { type: 'major', label: 'Breaking Changes' },
  'Minor Changes': { type: 'minor', label: 'New Features' },
  'Patch Changes': { type: 'patch', label: 'Fixes & Improvements' },
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

      const rawType = sectionMatch[1].trim();
      const meta = SECTION_MAP[rawType];
      if (!meta) continue;

      const items: string[] = [];
      let current = '';
      let migrationUrl: string | undefined;

      for (const line of sLines.slice(1)) {
        if (line.match(/^- /)) {
          if (current) items.push(current.trim());
          const text = line.replace(/^- /, '').replace(/^[a-f0-9]{7,}: /, '').trim();
          const isHeader = /^\*\*[^*]+\*\*:?\s*$/.test(text) || text.startsWith('#');
          current = isHeader ? '' : text;
        } else if (line.match(/^  - /)) {
          if (current) items.push(current.trim());
          current = line.replace(/^  - /, '').trim();
        } else if (line.match(/^\s+\*\*[^*]+\*\*:?\s*$/)) {
          // Indented bold sub-header (e.g. "  **New Features:**") — flush and skip
          if (current) { items.push(current.trim()); current = ''; }
        } else if (line.match(/^\s+/) && current) {
          current += ' ' + line.trim();
        } else if (!line.trim()) {
          if (current) { items.push(current.trim()); current = ''; }
        }
      }
      if (current) items.push(current.trim());

      // Detect migration guide link
      const allText = items.join(' ');
      const migMatch = allText.match(/docs\/[^\s,)]+migration-guide[^\s,)]+\.md/);
      if (migMatch) migrationUrl = migMatch[0];

      if (items.length > 0) {
        sections.push({ type: meta.type, label: meta.label, items, migrationUrl });
      }
    }

    if (sections.length > 0) {
      entries.push({ packageName, version, sections });
    }
  }

  return entries;
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

const PACKAGE_CHIP_TYPE: Record<string, 'brand' | 'color' | 'neutral'> = {
  '@giro-ds/react': 'brand',
  '@giro-ds/tokens': 'color',
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
          e.sections.forEach((s) => { counts[s.type] += s.items.length; })
        );

        return (
          <div key={version} className={styles.versionGroup}>
            <div className={styles.versionHeadingBtn}>
              <div className={styles.versionLeft}>
                <span className={styles.versionNumber}>v{version}</span>
                {isLatest && <span className={styles.latestBadge}>Latest</span>}
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
                          <div className={styles.sectionHeaderRight}>
                          {section.migrationUrl && (
                            <a
                              href={`https://github.com/zanthustecnologia/Giro-Design-System/blob/main/${section.migrationUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.migrationLink}
                            >
                              Ver Migration Guide →
                            </a>
                          )}
                          {sectionIndex === 0 && (
                            <Chips
                              type={PACKAGE_CHIP_TYPE[entry.packageName]}
                              title={entry.packageName}
                            />
                          )}
                          </div>
                        </div>
                        <ul className={styles.list}>
                          {section.items.map((item, i) => (
                            <li
                              key={i}
                              dangerouslySetInnerHTML={{
                                __html: item
                                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/`(.+?)`/g, '<code>$1</code>'),
                              }}
                            />
                          ))}
                        </ul>
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
