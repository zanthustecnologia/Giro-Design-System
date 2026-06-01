// Fonte única de verdade para o código de boas-vindas do Playground.
// Usado em preview.jsx (introCode / Reset) e em manager.js (pre-popula localStorage
// para evitar o editor em branco na primeira abertura do browser).

export const PLAYGROUND_INTRO_JSX = `() => {
  const [timesClicked, setTimesClicked] = React.useState(0);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      fontFamily: 'var(--font-family-primary, Figtree, sans-serif)',
    }}>
      <img
        src="/images/giro-logo.svg"
        alt="Giro DS"
        style={{ width: '300px', height: 'auto', display: 'block', marginTop: '54px' }}
      />
      <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--color-neutral-low-default, #111119)' }}>
        Playground
      </div>
      <div style={{ fontSize: '16px', color: 'var(--color-neutral-low-medium, #3f3f3f)', textAlign: 'center' }}>
        Experimente, construa e explore os componentes do Giro DS.
      </div>
      <Button variant="outlined" size="sm" onClick={() => setTimesClicked(p => p + 1)}>
        Clicado {timesClicked} {timesClicked === 1 ? 'vez' : 'vezes'}
      </Button>
      <div style={{ fontSize: '14px', color: 'var(--color-neutral-low-medium, #3f3f3f)' }}>
        Não está vendo o editor? Pressione 'Alt + D' no teclado.
      </div>
    </div>
  );
}`;

export const PLAYGROUND_INTRO_CSS = `html, body, #storybook-root, #storybook-root > *, #storybook-root > * > * {
  height: 100%;
  margin: 0;
}`;

export const PLAYGROUND_INTRO_CODE = {
  jsx: PLAYGROUND_INTRO_JSX,
  css: PLAYGROUND_INTRO_CSS,
};
