import { Meta, StoryObj } from '@storybook/react';
import '../dist/ui.css'
import './css/styles.css';

const meta: Meta = {
  title: 'Utilities/Flexbox',
  parameters: {
    docs: {
      description: {
        component: 'Componente Flex para layouts flexbox.',
      },
    },
  },
}

export default meta;

export const Flexbox = () => (
  <>
    <h1>📚 Utilitários – Flexbox</h1>
    <p className="muted">Inspirado na documentação do Tailwind, adaptado ao Design System da Zanthus.</p>
    <hr/>

    <section>
      <h2>1. Flex Responsivo</h2>
      <p>
        A utilidade <code>flex</code> transforma um container em flexbox.
        Com <code>flex-col</code> (coluna) e <code>sm:flex-row</code> (linha em telas maiores), 
        é possível alternar layouts conforme os breakpoints.
      </p>
      <div className="example">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="demo-box">Item 1</div>
          <div className="demo-box">Item 2</div>
          <div className="demo-box">Item 3</div>
        </div>
      </div>
      <pre>{`<div class="flex flex-col sm:flex-row items-center justify-between">
  <div class="demo-box">Item 1</div>
  <div class="demo-box">Item 2</div>
  <div class="demo-box">Item 3</div>
</div>`}</pre>
    </section>
    <hr />
    <section>
      <h2>2. Flex Col com Alinhamentos</h2>
      <p>
        Quando usamos <code>flex-col</code>, o <code>justify-*</code> controla a posição vertical,
        enquanto <code>items-*</code> controla a posição horizontal dos itens.
      </p>
      <h3>a) Justify Start + Items Center</h3>
      <div className="example" style={{ height: 160 }}>
        <div className="flex flex-col justify-start items-center h-full gap-2">
          <div className="demo-box">Item A</div>
          <div className="demo-box">Item B</div>
          <div className="demo-box">Item C</div>
        </div>
      </div>
      <pre>{`<div class="flex flex-col justify-start items-center h-full gap-2">
  <div class="demo-box">Item A</div>
  <div class="demo-box">Item B</div>
  <div class="demo-box">Item C</div>
</div>`}</pre>
      <h3>b) Justify Center + Items End</h3>
      <div className="example" style={{ height: 160 }}>
        <div className="flex flex-col justify-center items-end h-full gap-2">
          <div className="demo-box">Item A</div>
          <div className="demo-box">Item B</div>
          <div className="demo-box">Item C</div>
        </div>
      </div>
      <pre>{`<div class="flex flex-col justify-center items-end h-full gap-2">
  <div class="demo-box">Item A</div>
  <div class="demo-box">Item B</div>
  <div class="demo-box">Item C</div>
</div>`}</pre>
      <h3>c) Justify Between + Items Start</h3>
      <div className="example" style={{ height: 160 }}>
        <div className="flex flex-col justify-between items-start h-full gap-2">
          <div className="demo-box">Topo</div>
          <div className="demo-box">Meio</div>
          <div className="demo-box">Fundo</div>
        </div>
      </div>
      <pre>{`<div class="flex flex-col justify-between items-start h-full gap-2">
  <div class="demo-box">Topo</div>
  <div class="demo-box">Meio</div>
  <div class="demo-box">Fundo</div>
</div>`}</pre>
      <h3>d) Justify Around + Items Center</h3>
      <div className="example" style={{ height: 160 }}>
        <div className="flex flex-col justify-around items-center h-full gap-2">
          <div className="demo-box">Item 1</div>
          <div className="demo-box">Item 2</div>
          <div className="demo-box">Item 3</div>
        </div>
      </div>
      <pre>{`<div class="flex flex-col justify-around items-center h-full gap-2">
  <div class="demo-box">Item 1</div>
  <div class="demo-box">Item 2</div>
  <div class="demo-box">Item 3</div>
</div>`}</pre>
    </section>
  </>
);
