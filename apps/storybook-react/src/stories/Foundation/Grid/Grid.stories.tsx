import { Meta } from '@storybook/react';
import '@zanthus/utilities';
import './Grid.module.scss';

const meta: Meta = {
  title: 'Foundation/Grid',
  parameters: {
    docs: {
      description: {
        component: 'Utilitários Grid para layouts em grade responsivos.',
      },
    },
  },
}

export default meta;

export const Grid = () => (
  <>
    <h1>📚 Utilitários – Grid</h1>
    <p className="muted">
      Inspirado na documentação do Tailwind, adaptado ao Design System da Zanthus.
    </p>
    <hr />

    {/* --- Exemplo 1 --- */}
    <section>
      <h2>1. Grid Básico Responsivo</h2>
      <p>
        Defina colunas com <code>grid-cols-N</code>. O exemplo abaixo usa
        <code>grid-cols-2</code> no mobile, <code>sm:grid-cols-6</code> no small,
        e <code>lg:grid-cols-12</code>.
      </p>

      <div className="example">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="demo-box">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <pre>{`
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12">
  <div className="demo-box">1</div>
  <div className="demo-box">2</div>
  <div className="demo-box">3</div>
  <div className="demo-box">4</div>
  <div className="demo-box">5</div>
  <div className="demo-box">6</div>
  <div className="demo-box">7</div>
  <div className="demo-box">8</div>
  <div className="demo-box">9</div>
  <div className="demo-box">10</div>
  <div className="demo-box">11</div>
  <div className="demo-box">12</div>
</div>
      `}</pre>
    </section>
    <hr />

    {/* --- Exemplo 2 --- */}
    <section>
      <h2>2. Grid com <code>col-span</code></h2>
      <p>
        O utilitário <code>col-span-N</code> permite que elementos ocupem múltiplas colunas.
        No exemplo, o header ocupa 12 colunas, enquanto conteúdo e sidebar se ajustam em breakpoints.
      </p>

      <div className="example">
        <div className="grid grid-cols-12 gap-4">
          <div className="card col-span-12">Header</div>
          <div className="card col-span-12 md:col-span-8">Conteúdo</div>
          <div className="card col-span-12 md:col-span-4">Sidebar</div>
          <div className="card col-span-12 sm:col-span-6 lg:col-span-6">Card Content</div>
          <div className="card col-span-12 sm:col-span-6 lg:col-span-6">Card Content</div>
          <div className="card col-span-12 sm:col-span-6 lg:col-span-6">Card Content</div>
          <div className="card col-span-12 sm:col-span-6 lg:col-span-6">Card Content</div>
        </div>
      </div>

      <pre>{`
<div className="grid grid-cols-12 gap-4">
  <div className="card col-span-12">Header</div>
  <div className="card col-span-12 md:col-span-8">Conteúdo</div>
  <div className="card col-span-12 md:col-span-4">Sidebar</div>
  <div className="card col-span-12 sm:col-span-6 lg:col-span-6">Card Content</div>
  <div className="card col-span-12 sm:col-span-6 lg:col-span-6">Card Content</div>
  <div className="card col-span-12 sm:col-span-6 lg:col-span-6">Card Content</div>
  <div className="card col-span-12 sm:col-span-6 lg:col-span-6">Card Content</div>
</div>
      `}</pre>
    </section>
    <hr />

    {/* --- Exemplo 3 --- */}
    <section>
      <h2>3. Grid com Sobrescrita de Gap</h2>
      <p>
        Além do gap padrão definido por breakpoint, você pode sobrescrevê-lo:
        <code>gap-24</code> (base), <code>md:gap-40</code>, <code>xl:gap-64</code>.
      </p>

      <div className="example">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 md:gap-40 xl:gap-64">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card">
              Produto {i + 1}
            </div>
          ))}
        </div>
      </div>

      <pre>{`
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 md:gap-40 xl:gap-64">
  <div className="card">Produto 1</div>
  <div className="card">Produto 2</div>
  <div className="card">Produto 3</div>
  <div className="card">Produto 4</div>
  <div className="card">Produto 5</div>
  <div className="card">Produto 6</div>
  <div className="card">Produto 7</div>
  <div className="card">Produto 8</div>
</div>
      `}</pre>
    </section>
  </>
);
