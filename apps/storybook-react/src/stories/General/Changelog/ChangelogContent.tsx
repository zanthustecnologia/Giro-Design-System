import React from 'react';
import { reactChangelog, tokensChangelog, utilitiesChangelog } from 'virtual:changelogs';
import styles from './Changelog.module.scss';

type Section = {
  type: 'major' | 'minor' | 'patch';
  label: string;
  items: string[];
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

      for (const line of sLines.slice(1)) {
        if (line.match(/^- /)) {
          if (current) items.push(current.trim());
          const text = line.replace(/^- /, '').replace(/^[a-f0-9]{7,}: /, '').trim();
          // Skip lines that are just section headers (bold text + colon, or markdown headings)
          const isHeader = /^\*\*[^*]+\*\*:?\s*$/.test(text) || text.startsWith('#');
          current = isHeader ? '' : text;
        } else if (line.match(/^  - /)) {
          // Indented sub-item → separate bullet
          if (current) items.push(current.trim());
          current = line.replace(/^  - /, '').trim();
        } else if (line.match(/^\s+/) && current) {
          current += ' ' + line.trim();
        } else if (!line.trim()) {
          if (current) { items.push(current.trim()); current = ''; }
        }
      }
      if (current) items.push(current.trim());

      if (items.length > 0) {
        sections.push({ type: meta.type, label: meta.label, items });
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

const PACKAGE_CLASS: Record<string, string> = {
  '@giro-ds/react': styles.badgeReact,
  '@giro-ds/tokens': styles.badgeTokens,
  '@giro-ds/utilities': styles.badgeUtilities,
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

  return (
    <div className={styles.changelog}>
      {sortedVersions.map((version) => (
        <div key={version} className={styles.versionGroup}>
          <h2 className={styles.versionHeading}>v{version}</h2>

          <div className={styles.cards}>
            {grouped[version].map((entry) => (
              <div key={entry.packageName} className={styles.entry}>
                <div className={styles.header}>
                  <span className={`${styles.badge} ${PACKAGE_CLASS[entry.packageName]}`}>
                    {entry.packageName}
                  </span>
                </div>

                {entry.sections.map((section) => (
                  <div key={section.type} className={`${styles.section} ${styles[section.type]}`}>
                    <span className={styles.sectionLabel}>{section.label}</span>
                    <ul className={styles.list}>
                      {section.items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item
                          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                          .replace(/`(.+?)`/g, '<code>$1</code>')
                        }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
