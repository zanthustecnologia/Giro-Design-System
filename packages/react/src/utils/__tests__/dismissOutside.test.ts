import { describe, it, expect } from 'vitest';

import { DISMISS_OUTSIDE_IGNORE_ATTRIBUTE, isDismissOutsideIgnored } from '../dismissOutside';

describe('dismissOutside', () => {
  describe('DISMISS_OUTSIDE_IGNORE_ATTRIBUTE', () => {
    it('deve expor o nome do atributo esperado', () => {
      expect(DISMISS_OUTSIDE_IGNORE_ATTRIBUTE).toBe('data-dismiss-outside-ignore');
    });
  });

  describe('isDismissOutsideIgnored', () => {
    it('deve retornar false quando o target é null', () => {
      expect(isDismissOutsideIgnored(null)).toBe(false);
    });

    it('deve retornar false quando o target não é uma instância de Element', () => {
      expect(isDismissOutsideIgnored({} as EventTarget)).toBe(false);
      expect(isDismissOutsideIgnored(document as unknown as EventTarget)).toBe(false);
    });

    it('deve retornar false quando o target não possui o atributo e nenhum ancestral também', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      expect(isDismissOutsideIgnored(div)).toBe(false);

      document.body.removeChild(div);
    });

    it('deve retornar true quando o próprio target possui o atributo', () => {
      const div = document.createElement('div');
      div.setAttribute(DISMISS_OUTSIDE_IGNORE_ATTRIBUTE, 'true');
      document.body.appendChild(div);

      expect(isDismissOutsideIgnored(div)).toBe(true);

      document.body.removeChild(div);
    });

    it('deve retornar true quando um ancestral do target possui o atributo', () => {
      const root = document.createElement('div');
      root.setAttribute(DISMISS_OUTSIDE_IGNORE_ATTRIBUTE, 'true');
      const child = document.createElement('span');
      root.appendChild(child);
      document.body.appendChild(root);

      expect(isDismissOutsideIgnored(child)).toBe(true);

      document.body.removeChild(root);
    });

    it('deve retornar false quando o atributo existe em um elemento fora da árvore de ancestrais', () => {
      const ignored = document.createElement('div');
      ignored.setAttribute(DISMISS_OUTSIDE_IGNORE_ATTRIBUTE, 'true');
      const unrelated = document.createElement('span');
      document.body.appendChild(ignored);
      document.body.appendChild(unrelated);

      expect(isDismissOutsideIgnored(unrelated)).toBe(false);

      document.body.removeChild(ignored);
      document.body.removeChild(unrelated);
    });
  });
});
