import { Add16Regular, Checkmark16Regular } from '@fluentui/react-icons';
import { Button } from '@giro-ds/react';
import React, { useEffect, useState } from 'react';

const INITIAL_BRAND = {
  primary100: '#CADAFF',
  primary300: '#4F83FB',
  primary500: '#3B45F2',
  primary700: '#0D1874',
  secondary100: '#EEFFD8',
  secondary300: '#D3FF9A',
  secondary500: '#8CD92A',
  secondary700: '#3C7A2C',
};

function App() {
  const [theme, setTheme] = useState('light');
  const [brandEnabled, setBrandEnabled] = useState(false);
  const [brandName, setBrandName] = useState('pay');
  const [brand, setBrand] = useState({
    ...INITIAL_BRAND,
    primary300: '#FF8A3D',
    primary500: '#F25C05',
    primary700: '#A63B00',
    secondary300: '#FFE580',
    secondary500: '#F2C200',
    secondary700: '#996F00',
  });

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', theme);

    if (brandEnabled) {
      root.setAttribute('data-brand', brandName);
      root.style.setProperty('--color-brand-primary-100', brand.primary100);
      root.style.setProperty('--color-brand-primary-300', brand.primary300);
      root.style.setProperty('--color-brand-primary-500', brand.primary500);
      root.style.setProperty('--color-brand-primary-700', brand.primary700);
      root.style.setProperty('--color-brand-secondary-100', brand.secondary100);
      root.style.setProperty('--color-brand-secondary-300', brand.secondary300);
      root.style.setProperty('--color-brand-secondary-500', brand.secondary500);
      root.style.setProperty('--color-brand-secondary-700', brand.secondary700);
      return;
    }

    root.removeAttribute('data-brand');
    root.style.removeProperty('--color-brand-primary-100');
    root.style.removeProperty('--color-brand-primary-300');
    root.style.removeProperty('--color-brand-primary-500');
    root.style.removeProperty('--color-brand-primary-700');
    root.style.removeProperty('--color-brand-secondary-100');
    root.style.removeProperty('--color-brand-secondary-300');
    root.style.removeProperty('--color-brand-secondary-500');
    root.style.removeProperty('--color-brand-secondary-700');
  }, [brand, brandEnabled, brandName, theme]);

  return (
    <div className="playgroundShell" data-theme={theme} data-brand={brandEnabled ? brandName : undefined}>
      <aside className="controlPanel">
        <div>
          <p className="eyebrow">Theme Lab</p>
          <h1>Teste claro, escuro e marca</h1>
          <p className="lede">
            App temporario para validar a cascata <strong>core → semantic → component</strong>
            {' '}com alternancia de tema e sobrescrita de marca em runtime.
          </p>
        </div>

        <section className="controlGroup">
          <span className="controlLabel">Tema</span>
          <div className="segmentedControl">
            <button type="button" className={theme === 'light' ? 'isActive' : ''} onClick={() => setTheme('light')}>
              Light
            </button>
            <button type="button" className={theme === 'dark' ? 'isActive' : ''} onClick={() => setTheme('dark')}>
              Dark
            </button>
          </div>
        </section>

        <section className="controlGroup">
          <label className="toggleRow">
            <input type="checkbox" checked={brandEnabled} onChange={(event) => setBrandEnabled(event.target.checked)} />
            <span>Ativar sobrescrita de marca no app consumidor</span>
          </label>
          <label className="fieldLabel">
            Nome do brand selector
            <input value={brandName} onChange={(event) => setBrandName(event.target.value || 'brand')} />
          </label>
        </section>

        <section className="controlGroup">
          <div className="controlGroupHeader">
            <span className="controlLabel">Brand override</span>
            <p className="controlHint">
              Este bloco simula a sobrescrita que o produto consumidor faria nos tokens core da marca.
              Ele nao muda o contrato do componente; muda apenas a base que os tokens semanticos leem.
            </p>
          </div>

          <div className="impactCard">
            <span className="impactTitle">O que vai ser modificado</span>
            <ul className="impactList">
              <li>color.brand.primary.100, 300, 500, 700</li>
              <li>color.brand.secondary.100, 300, 500, 700</li>
            </ul>
            <span className="impactTitle">Exemplos que reagem a isso</span>
            <ul className="impactList">
              <li>color.text.brand</li>
              <li>color.interactive.primary.default, hover e pressed</li>
              <li>color.focus.ring.default</li>
            </ul>
          </div>

          <div className="brandSections">
            <BrandTokenGroup
              title="Primary brand scale"
              basePath="color.brand.primary"
              fields={[
                ['primary100', '100'],
                ['primary300', '300'],
                ['primary500', '500'],
                ['primary700', '700'],
              ]}
              brand={brand}
              setBrand={setBrand}
            />

            <BrandTokenGroup
              title="Secondary brand scale"
              basePath="color.brand.secondary"
              fields={[
                ['secondary100', '100'],
                ['secondary300', '300'],
                ['secondary500', '500'],
                ['secondary700', '700'],
              ]}
              brand={brand}
              setBrand={setBrand}
            />
          </div>
        </section>
      </aside>

      <main className="previewPanel">
        <section className="surfaceCard heroCard">
          <div>
            <p className="eyebrow">Runtime snapshot</p>
            <h2>Estado atual</h2>
          </div>
          <div className="tokenChips">
            <span>theme.{theme}</span>
            <span>{brandEnabled ? `brand.${brandName}` : 'brand.giro'}</span>
            <span>surface.default</span>
          </div>
        </section>

        <section className="surfaceCard">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Buttons</p>
              <h2>Contrato do componente</h2>
            </div>
          </div>
          <div className="buttonGrid">
            <Button variant="filled" size="lg">Filled</Button>
            <Button variant="outlined" size="lg">Outlined</Button>
            <Button variant="text" size="lg">Text</Button>
            <Button variant="filled" size="sm" icon={<Add16Regular />}>Small</Button>
            <Button variant="outlined" size="sm" icon={<Checkmark16Regular />}>Confirm</Button>
            <Button variant="text" size="sm" icon={<Add16Regular />}>Action</Button>
            <Button variant="filled" size="lg" disabled>Disabled</Button>
            <Button variant="outlined" size="lg" loading>Loading</Button>
            <Button variant="text" size="lg" iconOnly ariaLabel="Adicionar" icon={<Add16Regular />} />
          </div>
        </section>

        <section className="surfaceCard">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">Semantic colors</p>
              <h2>Leitura visual da cascata</h2>
            </div>
          </div>
          <div className="swatchGrid">
            <Swatch name="background.default" style={{ background: 'var(--color-background-default)', color: 'var(--color-text-primary)' }} />
            <Swatch name="surface.default" style={{ background: 'var(--color-surface-default)', color: 'var(--color-text-primary)' }} />
            <Swatch name="surface.subtle" style={{ background: 'var(--color-surface-subtle)', color: 'var(--color-text-primary)' }} />
            <Swatch name="text.brand" style={{ background: 'var(--color-surface-subtle)', color: 'var(--color-text-brand)' }} />
            <Swatch name="interactive.primary" style={{ background: 'var(--color-interactive-primary-default)', color: 'var(--color-text-on-brand)' }} />
            <Swatch name="focus.ring" style={{ background: 'var(--color-surface-default)', color: 'var(--color-focus-ring-default)', border: '2px solid var(--color-focus-ring-default)' }} />
          </div>
        </section>
      </main>
    </div>
  );
}

function Swatch({ name, style }) {
  return (
    <div className="swatch" style={style}>
      <span>{name}</span>
    </div>
  );
}

function BrandTokenGroup({ title, basePath, fields, brand, setBrand }) {
  return (
    <section className="brandTokenGroup">
      <div className="brandTokenGroupHeader">
        <span className="impactTitle">{title}</span>
        <span className="groupPath">{basePath}.*</span>
      </div>

      <div className="fieldGrid">
        {fields.map(([token, step]) => (
          <label key={token} className="fieldLabel fieldLabelColor">
            <span className="fieldTokenPath">{basePath}.{step}</span>
            <input
              type="color"
              value={brand[token]}
              onChange={(event) => {
                setBrand((current) => ({ ...current, [token]: event.target.value }));
              }}
            />
          </label>
        ))}
      </div>
    </section>
  );
}

export default App;