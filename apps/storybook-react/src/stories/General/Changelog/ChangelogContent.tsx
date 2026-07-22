import React from 'react';
import { Chips } from '@giro-ds/react';
import { changelogs, tagDates } from 'virtual:changelogs';
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
  inlineDate?: string;
};

const SECTION_TYPES: Record<string, Section['type']> = {
  'Major Changes': 'major',
  'Minor Changes': 'minor',
  'Patch Changes': 'patch',
  'Added': 'minor',
  'Changed': 'minor',
  'Removed': 'major',
  'Fixed': 'patch',
};

function parseChangelog(raw: string, packageName: string): VersionEntry[] {
  const entries: VersionEntry[] = [];
  const withoutTitle = raw.replace(/^#[^\n]*\n+/, '').trim();
  const versionBlocks = withoutTitle.split(/\n(?=## )/);

  for (const block of versionBlocks) {
    const lines = block.split('\n');
    const versionMatch = lines[0].match(/^## (?:\[?)(\d+\.\d+\.\d+)(?:\])?(?:\s+-\s+(\d{4}-\d{2}-\d{2}))?/);
    if (!versionMatch) continue;

    const version = versionMatch[1];
    const inlineDate = versionMatch[2] as string | undefined;
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
      entries.push({ packageName, version, sections, inlineDate });
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

function renderTable(rows: string[], baseKey: number): React.ReactNode {
  const dataRows = rows.filter(r => !r.match(/^\|[\s\-:|]+\|$/));
  if (dataRows.length === 0) return null;

  const headers = dataRows[0].split('|').filter(Boolean).map(h => h.trim());
  const body = dataRows.slice(1);

  return (
    <table key={baseKey} className={styles.table}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} dangerouslySetInnerHTML={{ __html: renderInline(h) }} />
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row, ri) => (
          <tr key={ri}>
            {row.split('|').filter(Boolean).map((cell, ci) => (
              <td key={ci} dangerouslySetInnerHTML={{ __html: renderInline(cell.trim()) }} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function RawContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

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
        <pre key={key++} className={styles.codeBlock}><code>{codeLines.join('\n')}</code></pre>
      );
      continue;
    }

    // Table row
    if (line.trimStart().startsWith('|')) {
      const tableRows: string[] = [line];
      i++;
      while (i < lines.length && lines[i].trimStart().startsWith('|')) {
        tableRows.push(lines[i]);
        i++;
      }
      const tbl = renderTable(tableRows, key);
      if (tbl) elements.push(tbl);
      key += tableRows.length + 1;
      continue;
    }

    // ## Sub-version heading (e.g. "## [11.0.0]" inside Major Changes)
    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      elements.push(
        <span key={key++} className={styles.subVersionHeading}
          dangerouslySetInnerHTML={{ __html: renderInline(h2Match[1].trim()) }}
        />
      );
      i++;
      continue;
    }

    // ### Sub-section heading (e.g. "### Changed" inside Major Changes)
    const h3Match = line.match(/^### (.+)/);
    if (h3Match) {
      elements.push(
        <span key={key++} className={styles.subSectionHeading}
          dangerouslySetInnerHTML={{ __html: renderInline(h3Match[1].trim()) }}
        />
      );
      i++;
      continue;
    }

    // #### Scope heading (conventional format: Added/Changed/Removed/Fixed)
    const headingMatch = line.match(/^#### (.+)/);
    if (headingMatch) {
      elements.push(
        <span key={key++} className={styles.scopeHeading}
          dangerouslySetInnerHTML={{ __html: renderInline(headingMatch[1].trim()) }}
        />
      );
      i++;
      continue;
    }

    // Bullet (legacy format: Major/Minor/Patch Changes)
    const bulletMatch = line.match(/^(\s*)- (.*)/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      const text = bulletMatch[2].replace(/^[a-f0-9]{7,}: /, '');

      // Collect sub-items (indented bullets, code fences, continuation text)
      const sub: React.ReactNode[] = [];
      let j = i + 1;

      while (j < lines.length) {
        const nl = lines[j];
        if (!nl.trim()) { j++; continue; }

        const subMatch = nl.match(/^(\s*)- /);
        if (subMatch && subMatch[1].length > indent) {
          const subText = nl.slice(subMatch[0].length).replace(/^[a-f0-9]{7,}: /, '');
          sub.push(
            <div key={key++} className={styles.detailLine}>
              <span dangerouslySetInnerHTML={{ __html: renderInline(subText) }} />
            </div>
          );
          j++;
          continue;
        }

        if (nl.trimStart().startsWith('```')) {
          const cl: string[] = [];
          j++;
          while (j < lines.length && !lines[j].trimStart().startsWith('```')) {
            cl.push(lines[j]);
            j++;
          }
          j++;
          sub.push(
            <pre key={key++} className={styles.codeBlock}><code>{cl.join('\n')}</code></pre>
          );
          continue;
        }

        const nlIndent = nl.match(/^(\s*)/)?.[1].length ?? 0;
        if (nlIndent > indent) {
          const trimmed = nl.trim();
          if (trimmed.startsWith('#### ')) {
            sub.push(<span key={key++} className={styles.scopeHeading} dangerouslySetInnerHTML={{ __html: renderInline(trimmed.slice(5)) }} />);
            j++;
          } else if (trimmed.startsWith('### ')) {
            sub.push(<span key={key++} className={styles.subSectionHeading} dangerouslySetInnerHTML={{ __html: renderInline(trimmed.slice(4)) }} />);
            j++;
          } else if (trimmed.startsWith('## ')) {
            sub.push(<span key={key++} className={styles.subVersionHeading} dangerouslySetInnerHTML={{ __html: renderInline(trimmed.slice(3)) }} />);
            j++;
          } else if (trimmed.startsWith('|')) {
            const tableRows: string[] = [trimmed];
            j++;
            while (j < lines.length) {
              const next = lines[j].trim();
              if (next.startsWith('|')) { tableRows.push(next); j++; }
              else if (!next) { j++; break; }
              else { break; }
            }
            const tbl = renderTable(tableRows, key);
            if (tbl) sub.push(tbl);
            key += tableRows.length + 1;
          } else {
            sub.push(<p key={key++} className={styles.continuationText} dangerouslySetInnerHTML={{ __html: renderInline(trimmed) }} />);
            j++;
          }
          continue;
        }

        break;
      }

      elements.push(
        <div key={key++} className={indent === 0 ? styles.changeEntry : styles.detailLine}
          style={indent > 0 ? { paddingLeft: `${indent * 10}px` } : undefined}>
          <span dangerouslySetInnerHTML={{ __html: renderInline(text) }} />
        </div>
      );

      if (sub.length > 0) {
        elements.push(<div key={key++} className={styles.subGroup}>{sub}</div>);
      }

      i = j;
      continue;
    }

    // Plain paragraph
    elements.push(
      <p key={key++} className={styles.paragraph}
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

const PACKAGE_CHIP_TYPE: Record<string, 'brand' | 'success' | 'neutral' | 'alert'> = {
  '@giro-ds/react': 'brand',
  '@giro-ds/tokens': 'success',
  '@giro-ds/utilities': 'neutral',
  '@giro-ds/mcp': 'alert',
};

function getChipType(packageName: string): 'brand' | 'success' | 'neutral' | 'alert' {
  return PACKAGE_CHIP_TYPE[packageName] ?? 'neutral';
}

const PACKAGE_ORDER = ['@giro-ds/react', '@giro-ds/tokens', '@giro-ds/utilities', '@giro-ds/mcp'];

export function ChangelogContent() {
  const all = Object.entries(changelogs).flatMap(([name, content]) =>
    parseChangelog(content, name)
  );

  // Latest version per package
  const latestPerPackage = all.reduce<Record<string, string>>((acc, entry) => {
    if (!acc[entry.packageName] || semverToNum(entry.version) > semverToNum(acc[entry.packageName])) {
      acc[entry.packageName] = entry.version;
    }
    return acc;
  }, {});

  // Get date for an entry
  const getEntryDate = (entry: VersionEntry): string | undefined =>
    tagDates[`${entry.packageName}@${entry.version}`] ?? entry.inlineDate;

  // Group by date
  const grouped = all.reduce<Record<string, VersionEntry[]>>((acc, entry) => {
    const date = getEntryDate(entry) ?? 'undated';
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  // Sort dates descending (undated at end)
  const sortedDates = Object.keys(grouped).sort((a, b) => {
    if (a === 'undated') return 1;
    if (b === 'undated') return -1;
    return b.localeCompare(a);
  });

  return (
    <div className={styles.changelog}>
      {sortedDates.map((date) => {
        const entries = [...grouped[date]].sort((a, b) => {
          const pkgA = PACKAGE_ORDER.indexOf(a.packageName);
          const pkgB = PACKAGE_ORDER.indexOf(b.packageName);
          const pkgDiff =
            (pkgA === -1 ? PACKAGE_ORDER.length : pkgA) -
            (pkgB === -1 ? PACKAGE_ORDER.length : pkgB);
          if (pkgDiff !== 0) return pkgDiff;
          return semverToNum(b.version) - semverToNum(a.version);
        });

        return (
          <div key={date} className={styles.dateGroup}>
            <div className={styles.dateHeading}>
              {date === 'undated' ? 'Sem data de release' : formatDate(date)}
              {date === sortedDates[0] && <span className={styles.latestBadge}>Mais recente</span>}
            </div>

            <div className={styles.cards}>
              {entries.map((entry) => {
                const isLatest = latestPerPackage[entry.packageName] === entry.version;
                const counts = { major: 0, minor: 0, patch: 0 };
                entry.sections.forEach(s => { counts[s.type]++; });

                return (
                  <div key={`${entry.packageName}@${entry.version}`} className={styles.entry}>
                    <div className={styles.entryHeader}>
                      <div className={styles.entryHeaderLeft}>
                        <Chips variant={getChipType(entry.packageName)}>
                          {entry.packageName}
                        </Chips>
                        <span className={styles.entryVersion}>v{entry.version}</span>
                      </div>
                      <div className={styles.entryHeaderRight}>
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

                    <div className={styles.sections}>
                      {entry.sections.map((section) => (
                        <div key={section.label} className={`${styles.section} ${styles[section.type]}`}>
                          <span className={styles.sectionLabel}>{section.label}</span>
                          <RawContent content={section.rawContent} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
