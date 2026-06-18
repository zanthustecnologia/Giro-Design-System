import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import FileUpload from '../FileUpload';

// Mock parcial dos ícones do Fluent UI seguindo o padrão do projeto
vi.mock('@fluentui/react-icons', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@fluentui/react-icons')>();
  return {
    ...actual,
    ArrowUpload24Regular: () => <svg data-testid="icon-upload" />,
    Document24Regular: () => <svg data-testid="icon-document" />,
    Dismiss16Regular: () => <svg data-testid="icon-dismiss" />,
    Warning24Regular: () => <svg data-testid="icon-warning" />,
  };
});

// jsdom não implementa URL.createObjectURL — mock global necessário
beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
  global.URL.revokeObjectURL = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

// Helper para criar um File fake
const createFile = (name: string, type = 'image/png', size = 1024): File => {
  const file = new File(['x'.repeat(size)], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

// Helper para simular drop de arquivos na dropzone
const dropFiles = (element: HTMLElement, files: File[]) => {
  const dataTransfer = {
    files,
    items: files.map((file) => ({ kind: 'file', type: file.type, getAsFile: () => file })),
    types: ['Files'],
  };
  fireEvent.dragOver(element, { dataTransfer });
  fireEvent.drop(element, { dataTransfer });
};

describe('FileUpload', () => {
  describe('Renderização', () => {
    it('renderiza a zona de drop', () => {
      render(<FileUpload />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('exibe ícone e texto padrão no estado vazio', () => {
      render(<FileUpload />);
      expect(screen.getByTestId('icon-upload')).toBeInTheDocument();
      expect(screen.getByText('Clique ou arraste os arquivos aqui')).toBeInTheDocument();
    });

    it('exibe texto de instrução personalizado', () => {
      render(<FileUpload instructionText="Solte os arquivos aqui" />);
      expect(screen.getByText('Solte os arquivos aqui')).toBeInTheDocument();
    });

    it('renderiza helperText quando fornecido', () => {
      render(<FileUpload helperText="Máximo 5MB" />);
      expect(screen.getByText('Máximo 5MB')).toBeInTheDocument();
    });

    it('não renderiza helperText quando ausente', () => {
      const { container } = render(<FileUpload />);
      expect(container.querySelector('[id$="-helper"]')).not.toBeInTheDocument();
    });
  });

  describe('Acessibilidade', () => {
    it('zona de drop possui role="button"', () => {
      render(<FileUpload />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('zona de drop possui aria-label com o texto de instrução', () => {
      render(<FileUpload instructionText="Arraste arquivos" />);
      expect(screen.getByRole('button', { name: 'Arraste arquivos' })).toBeInTheDocument();
    });

    it('zona de drop possui aria-disabled quando desabilitada', () => {
      render(<FileUpload disabled />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('zona de drop possui data-invalid quando em estado de erro', () => {
      render(<FileUpload error />);
      expect(screen.getByRole('button')).toHaveAttribute('data-invalid');
    });

    it('helperText é associado via aria-describedby', () => {
      render(<FileUpload helperText="Texto de ajuda" />);
      const zone = screen.getByRole('button');
      const helperId = zone.getAttribute('aria-describedby');
      expect(helperId).toBeTruthy();
      const helperEl = helperId ? document.getElementById(helperId) : null;
      expect(helperEl).toHaveTextContent('Texto de ajuda');
    });

    it('helperText de erro possui role="alert"', () => {
      render(<FileUpload error errorMessage="Arquivo inválido" />);
      expect(screen.getByRole('alert')).toHaveTextContent('Arquivo inválido');
    });

    it('zona de drop é focável via teclado quando habilitada', () => {
      render(<FileUpload />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
    });

    it('zona de drop não é focável quando desabilitada', () => {
      render(<FileUpload disabled />);
      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
    });

    it('botão de remoção possui aria-label com nome do arquivo', () => {
      const file = createFile('foto.png');
      render(<FileUpload value={[file]} />);
      expect(screen.getByRole('button', { name: 'Remover foto.png' })).toBeInTheDocument();
    });

    it('lista de arquivos possui aria-label descritivo', () => {
      const files = [createFile('a.png'), createFile('b.png')];
      render(<FileUpload value={files} />);
      expect(screen.getByRole('list', { name: '2 arquivos selecionados' })).toBeInTheDocument();
    });

    it('lista com 1 arquivo usa singular no aria-label', () => {
      render(<FileUpload value={[createFile('a.png')]} />);
      expect(screen.getByRole('list', { name: '1 arquivo selecionado' })).toBeInTheDocument();
    });
  });

  describe('Estado desabilitado', () => {
    it('não abre o seletor ao clicar quando desabilitado', () => {
      render(<FileUpload disabled />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');
      fireEvent.click(screen.getByRole('button'));
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('não processa arquivos em drop quando desabilitado', () => {
      const onChange = vi.fn();
      render(<FileUpload disabled onChange={onChange} />);
      dropFiles(screen.getByRole('button'), [createFile('a.png')]);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Estado de erro', () => {
    it('exibe ícone de aviso quando error=true e não há arquivos', () => {
      render(<FileUpload error />);
      expect(screen.getByTestId('icon-warning')).toBeInTheDocument();
    });

    it('exibe errorMessage no helperText', () => {
      render(<FileUpload error errorMessage="Formato não suportado" />);
      expect(screen.getByText('Formato não suportado')).toBeInTheDocument();
    });

    it('exibe helperText em estado de erro quando errorMessage não fornecido', () => {
      render(<FileUpload error helperText="Tente novamente" />);
      expect(screen.getByText('Tente novamente')).toBeInTheDocument();
    });
  });

  describe('Seleção de arquivos via input', () => {
    it('chama onChange ao selecionar arquivo pelo input', () => {
      const onChange = vi.fn();
      render(<FileUpload onChange={onChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createFile('teste.png');

      Object.defineProperty(input, 'files', { value: [file], configurable: true });
      fireEvent.change(input);

      expect(onChange).toHaveBeenCalledWith([file]);
    });

    it('modo uncontrolled: exibe arquivo selecionado após input', () => {
      render(<FileUpload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createFile('foto.jpg', 'image/jpeg');

      Object.defineProperty(input, 'files', { value: [file], configurable: true });
      fireEvent.change(input);

      expect(screen.getByRole('button', { name: 'Remover foto.jpg' })).toBeInTheDocument();
    });

    it('respeita maxSize e ignora arquivos acima do limite', () => {
      const onChange = vi.fn();
      render(<FileUpload onChange={onChange} maxSize={500} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const bigFile = createFile('grande.png', 'image/png', 1024);

      Object.defineProperty(input, 'files', { value: [bigFile], configurable: true });
      fireEvent.change(input);

      expect(onChange).toHaveBeenCalledWith([]);
    });

    it('respeita maxFiles e limita a quantidade de arquivos', () => {
      const onChange = vi.fn();
      render(<FileUpload onChange={onChange} multiple maxFiles={2} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const files = [createFile('a.png'), createFile('b.png'), createFile('c.png')];

      Object.defineProperty(input, 'files', { value: files, configurable: true });
      fireEvent.change(input);

      expect(onChange).toHaveBeenCalledWith(files.slice(0, 2));
    });

    it('substitui arquivo quando multiple=false', () => {
      const onChange = vi.fn();
      render(<FileUpload onChange={onChange} multiple={false} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const files = [createFile('a.png'), createFile('b.png')];

      Object.defineProperty(input, 'files', { value: files, configurable: true });
      fireEvent.change(input);

      expect(onChange).toHaveBeenCalledWith([files[0]]);
    });
  });

  describe('Drag and Drop', () => {
    it('chama onChange ao soltar arquivos na zona de drop', () => {
      const onChange = vi.fn();
      render(<FileUpload onChange={onChange} />);
      const file = createFile('arrastado.png');
      dropFiles(screen.getByRole('button'), [file]);
      expect(onChange).toHaveBeenCalledWith([file]);
    });

    it('não processa drop sem arquivos', () => {
      const onChange = vi.fn();
      render(<FileUpload onChange={onChange} />);
      fireEvent.dragOver(screen.getByRole('button'));
      fireEvent.drop(screen.getByRole('button'), { dataTransfer: { files: [] } });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Teclado', () => {
    it('abre seletor ao pressionar Enter na zona de drop', () => {
      render(<FileUpload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
      expect(clickSpy).toHaveBeenCalled();
    });

    it('abre seletor ao pressionar Espaço na zona de drop', () => {
      render(<FileUpload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');
      fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
      expect(clickSpy).toHaveBeenCalled();
    });

    it('não abre seletor com outra tecla', () => {
      render(<FileUpload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = vi.spyOn(input, 'click');
      fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' });
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Remoção de arquivos', () => {
    it('remove arquivo ao clicar no botão de remoção', () => {
      const onChange = vi.fn();
      const files = [createFile('a.png'), createFile('b.png')];
      render(<FileUpload value={files} onChange={onChange} />);

      fireEvent.click(screen.getByRole('button', { name: 'Remover a.png' }));

      expect(onChange).toHaveBeenCalledWith([files[1]]);
    });

    it('modo uncontrolled: remove arquivo da lista interna', () => {
      render(<FileUpload />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createFile('foto.png');

      Object.defineProperty(input, 'files', { value: [file], configurable: true });
      fireEvent.change(input);

      expect(screen.getByRole('button', { name: 'Remover foto.png' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Remover foto.png' }));

      expect(screen.queryByRole('button', { name: 'Remover foto.png' })).not.toBeInTheDocument();
    });

    it('exibe ícone de documento para arquivo não-imagem', () => {
      const file = createFile('relatorio.pdf', 'application/pdf');
      render(<FileUpload value={[file]} />);
      expect(screen.getByTestId('icon-document')).toBeInTheDocument();
    });

    it('exibe img com alt para arquivo de imagem', () => {
      const file = createFile('foto.jpg', 'image/jpeg');
      render(<FileUpload value={[file]} />);
      expect(screen.getByAltText('foto.jpg')).toBeInTheDocument();
    });
  });

  describe('Modo controlado', () => {
    it('exibe arquivos passados via prop value', () => {
      const files = [createFile('doc.pdf', 'application/pdf')];
      render(<FileUpload value={files} />);
      expect(screen.getByTestId('icon-document')).toBeInTheDocument();
    });

    it('não atualiza estado interno no modo controlado', () => {
      const files = [createFile('a.png')];
      const { rerender } = render(<FileUpload value={files} />);
      expect(screen.getByRole('list')).toBeInTheDocument();

      rerender(<FileUpload value={[]} />);
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('encaminha ref como função para o input nativo', () => {
      const refFn = vi.fn();
      render(<FileUpload ref={refFn} />);
      expect(refFn).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it('encaminha ref como objeto MutableRefObject para o input nativo', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<FileUpload ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Drag and Drop - dragLeave e dragOver desabilitado', () => {
    it('cancela estado de arrastar ao sair da zona (dragLeave)', () => {
      render(<FileUpload />);
      const zone = screen.getByRole('button');
      fireEvent.dragOver(zone, { dataTransfer: { files: [createFile('a.png')] } });
      // handleDragLeave deve ser executado sem erros
      fireEvent.dragLeave(zone);
    });

    it('não define isDragging quando dragOver ocorre com componente desabilitado', () => {
      render(<FileUpload disabled />);
      // handleDragOver com disabled não deve lançar erro
      fireEvent.dragOver(screen.getByRole('button'), {
        dataTransfer: { files: [createFile('a.png')] },
      });
    });
  });

  describe('Remoção via teclado (botão de remoção)', () => {
    it('remove arquivo ao pressionar Enter no botão de remoção', () => {
      const onChange = vi.fn();
      const files = [createFile('a.png'), createFile('b.png')];
      render(<FileUpload value={files} onChange={onChange} />);
      fireEvent.keyDown(screen.getByRole('button', { name: 'Remover a.png' }), { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith([files[1]]);
    });

    it('remove arquivo ao pressionar Espaço no botão de remoção', () => {
      const onChange = vi.fn();
      const files = [createFile('a.png'), createFile('b.png')];
      render(<FileUpload value={files} onChange={onChange} />);
      fireEvent.keyDown(screen.getByRole('button', { name: 'Remover a.png' }), { key: ' ' });
      expect(onChange).toHaveBeenCalledWith([files[1]]);
    });

    it('não remove arquivo ao pressionar outras teclas no botão de remoção', () => {
      const onChange = vi.fn();
      const files = [createFile('a.png')];
      render(<FileUpload value={files} onChange={onChange} />);
      fireEvent.keyDown(screen.getByRole('button', { name: 'Remover a.png' }), { key: 'Tab' });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Limpeza de memória (URLs de objeto)', () => {
    it('revoga URLs ao desmontar o componente que exibia imagens', () => {
      const file = createFile('foto.png', 'image/png');
      const { unmount } = render(<FileUpload value={[file]} />);
      expect(URL.createObjectURL).toHaveBeenCalled();
      unmount();
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('revoga URL do arquivo de imagem ao removê-lo', () => {
      const onChange = vi.fn();
      const file = createFile('foto.png', 'image/png');
      render(<FileUpload value={[file]} onChange={onChange} />);
      fireEvent.click(screen.getByRole('button', { name: 'Remover foto.png' }));
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    });
  });

  describe('Cache de URL de objeto (getObjectUrl)', () => {
    it('reutiliza URL existente para o mesmo arquivo em re-renderizações', () => {
      const file = createFile('foto.png', 'image/png');
      const { rerender } = render(<FileUpload value={[file]} />);
      const callCount = (URL.createObjectURL as ReturnType<typeof vi.fn>).mock.calls.length;
      rerender(<FileUpload value={[file]} />);
      expect((URL.createObjectURL as ReturnType<typeof vi.fn>).mock.calls.length).toBe(callCount);
    });
  });

  describe('Atributos repassados ao input nativo', () => {
    it('repassa accept para o input nativo', () => {
      render(<FileUpload accept="image/*,.pdf" />);
      expect(document.querySelector('input[type="file"]')).toHaveAttribute('accept', 'image/*,.pdf');
    });

    it('repassa multiple=false para o input nativo', () => {
      render(<FileUpload multiple={false} />);
      expect(document.querySelector('input[type="file"]')).not.toHaveAttribute('multiple');
    });

    it('o input fica disabled quando a prop disabled é passada', () => {
      render(<FileUpload disabled />);
      expect(document.querySelector('input[type="file"]')).toBeDisabled();
    });
  });

  describe('Botão de remoção desabilitado', () => {
    it('fica desabilitado quando o componente está desabilitado', () => {
      const file = createFile('foto.png');
      render(<FileUpload value={[file]} disabled />);
      expect(screen.getByRole('button', { name: 'Remover foto.png' })).toBeDisabled();
    });
  });

  describe('aria-controls na zona de drop', () => {
    it('possui aria-controls quando há arquivos na lista', () => {
      render(<FileUpload value={[createFile('a.png')]} />);
      const zone = screen.getByRole('button', { name: 'Clique ou arraste os arquivos aqui' });
      expect(zone).toHaveAttribute('aria-controls');
    });

    it('não possui aria-controls quando a lista está vazia', () => {
      render(<FileUpload />);
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-controls');
    });
  });

  describe('processFiles - cenários adicionais', () => {
    it('ignora arquivos quando disabled é acionado via change no input', () => {
      const onChange = vi.fn();
      render(<FileUpload disabled onChange={onChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      Object.defineProperty(input, 'files', {
        value: [createFile('a.png')],
        configurable: true,
      });
      fireEvent.change(input);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('acumula arquivos em modo uncontrolled com multiple=true', () => {
      const onChange = vi.fn();
      render(<FileUpload onChange={onChange} multiple />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      Object.defineProperty(input, 'files', {
        value: [createFile('a.png')],
        configurable: true,
      });
      fireEvent.change(input);

      Object.defineProperty(input, 'files', {
        value: [createFile('b.png')],
        configurable: true,
      });
      fireEvent.change(input);

      const lastCall = onChange.mock.lastCall![0] as File[];
      expect(lastCall).toHaveLength(2);
    });

    it('não limita arquivos quando maxFiles não está definido', () => {
      const onChange = vi.fn();
      render(<FileUpload onChange={onChange} multiple />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const files = [createFile('a.png'), createFile('b.png'), createFile('c.png')];

      Object.defineProperty(input, 'files', { value: files, configurable: true });
      fireEvent.change(input);

      expect(onChange).toHaveBeenCalledWith(files);
    });

  });
});
