import assert from 'node:assert/strict';
import { test } from 'node:test';
import { Project } from 'ts-morph';
import { collectProps } from './lib/collect-props.js';
import { COMPONENTS } from '../src/data/components.generated.js';

test('unions include branch-only props without making them globally required', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const source = project.createSourceFile('props.ts', `
    interface Base { id: string; }
    type Props = Base & ({ mode: 'a'; value: string; onlyA: number } | { mode: 'b'; value?: number; onlyA?: never });
  `);
  const { props } = collectProps(source.getTypeAliasOrThrow('Props'));
  assert.equal(props.get('id')?.required, true);
  assert.equal(props.get('mode')?.required, true);
  assert.equal(props.get('value')?.required, false);
  assert.equal(props.get('value')?.type, '(string) | (number)');
  assert.equal(props.get('onlyA')?.required, false);
  assert.equal(props.get('onlyA')?.type, 'number');
});

test('local inheritance preserves overrides and avoids expanding external types', () => {
  const project = new Project({ useInMemoryFileSystem: true });
  const source = project.createSourceFile('props.ts', `
    interface Base { value?: string; }
    interface Props extends Base, External { value: 'fixed'; }
  `);
  const { props } = collectProps(source.getInterfaceOrThrow('Props'));
  assert.equal(props.size, 1);
  assert.equal(props.get('value')?.type, "'fixed'");
  assert.equal(props.get('value')?.required, true);
});

test('all five previously skipped components have generated props', () => {
  for (const name of ['Button', 'Select', 'TextArea', 'TextField', 'ToggleButton']) {
    const component = COMPONENTS.find(c => c.name === name);
    assert.ok(component, name);
    assert.ok(component.props.length > 0, name);
    const tooltip = component.props.find(p => p.name === 'tooltipText');
    assert.equal(tooltip?.required, false, name);
    assert.equal(tooltip?.type, 'string', name);
  }
  const button = COMPONENTS.find(c => c.name === 'Button')!;
  assert.ok(button.examples.length > 0);
  assert.ok(COMPONENTS.find(c => c.name === 'TextField')!.examples.length > 0);
  assert.equal(button.props.find(p => p.name === 'icon')?.required, false);
  assert.equal(button.props.find(p => p.name === 'as')?.required, false);
  assert.ok(button.props.find(p => p.name === 'iconOnly')?.type.includes('true'));
  assert.ok(button.props.find(p => p.name === 'iconOnly')?.type.includes('false'));
  assert.equal(button.props.find(p => p.name === 'iconOnly')?.defaultValue, 'false');
});
