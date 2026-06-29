import {
  CheckmarkCircleRegular,
  DismissCircleRegular,
  ClockRegular,
  LockClosedRegular,
} from '@fluentui/react-icons';
import { Chips, DatePicker, Filter, Select } from '@giro-ds/react';
import { useState } from 'react';

import type { FilterProps } from '@giro-ds/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    docs: {
      description: {
        component: 'O Filter é um botão que expande um painel de seleção de opções. Permite ao usuário aplicar filtros em listas, tabelas ou qualquer conjunto de dados, com suporte a seleção múltipla, busca e integração com calendário.',
      },
    },
  },
  argTypes: {
    buttonText: {
      control: { type: 'text' },
      description: 'Texto exibido no botão do filtro',
      table: {
        type: { summary: 'string | ReactNode' },
        defaultValue: { summary: 'Filter' },
      },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Lado de abertura do popover em relação ao botão',
      table: {
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
        defaultValue: { summary: 'bottom' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Alinhamento do popover em relação ao botão',
      table: {
        type: { summary: "'start' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'Variante do botão',
      table: {
        type: { summary: "'filled' | 'outlined' | 'text'" },
        defaultValue: { summary: 'outlined' },
      },
    },
    filterType: {
      control: 'select',
      options: ['multiple', 'single', 'calendar'],
      description: 'Tipo do filtro',
      table: {
        type: { summary: "'multiple' | 'single' | 'calendar'" },
        defaultValue: { summary: 'multiple' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Se o filtro está desabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    enableSearch: {
      control: { type: 'boolean' },
      description: 'Habilita busca no dropdown',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onApplyFilter: {
      action: 'filter-applied',
      description: 'Callback quando filtros são aplicados',
      table: {
        type: { summary: '(selectedIds: string[]) => void' },
      },
    },
    onOpen: {
      action: 'opened',
      description: 'Callback quando abre',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback quando fecha',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

const statusItems = [
  { id: 'ativo', text: 'Ativo' },
  { id: 'inativo', text: 'Inativo' },
  { id: 'pendente', text: 'Pendente' },
  { id: 'bloqueado', text: 'Bloqueado' },
];

const statusItemsWithIcons = [
  { id: 'ativo', text: 'Ativo', icon: <CheckmarkCircleRegular /> },
  { id: 'inativo', text: 'Inativo', icon: <DismissCircleRegular /> },
  { id: 'pendente', text: 'Pendente', icon: <ClockRegular /> },
  { id: 'bloqueado', text: 'Bloqueado', icon: <LockClosedRegular /> },
];

const categoryItems = [
  { id: 'tecnologia', text: 'Tecnologia', subText: 'Produtos de tecnologia' },
  { id: 'casa', text: 'Casa e Jardim', subText: 'Itens para o lar' },
  { id: 'moda', text: 'Moda', subText: 'Roupas e acessórios' },
  { id: 'esportes', text: 'Esportes', subText: 'Equipamentos esportivos' },
  { id: 'livros', text: 'Livros', subText: 'Literatura e educação' },
  { id: 'alimentacao', text: 'Alimentação', subText: 'Produtos alimentícios' },
  { id: 'beleza', text: 'Beleza', subText: 'Cosméticos e cuidados' },
  { id: 'eletronicos', text: 'Eletrônicos', subText: 'Gadgets e acessórios' },
  { id: 'automotivo', text: 'Automotivo', subText: 'Peças e acessórios' },
];

const FilterTemplate = (args: FilterProps) => {
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const handleApplyFilter = (selectedIds: string[]) => {
    setAppliedFilters(selectedIds);
  };

  return (
      <Filter
        {...args}
        selectedIds={appliedFilters}
        onApplyFilter={handleApplyFilter}
      />
  );
};

export const Default: Story = {
  render: FilterTemplate,
  args: {
    items: statusItems,
    buttonText: 'Status',
    filterType: 'multiple',
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
    disabled: false,
  },
};

export const ComBusca: Story = {
  render: FilterTemplate,
  args: {
    items: categoryItems,
    buttonText: 'Categoria',
    filterType: 'multiple',
    enableSearch: true,
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
  },
};

export const ComIcones: Story = {
  render: (args) => {
    const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

    return (
      <Filter
        {...args}
        items={statusItemsWithIcons}
        selectedIds={appliedFilters}
        onApplyFilter={setAppliedFilters}
      />
    );
  },
  args: {
    buttonText: 'Status',
    filterType: 'single',
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
    disabled: false,
  },
};

export const Desabilitado: Story = {
  render: FilterTemplate,
  args: {
    items: statusItems,
    buttonText: 'Status',
    filterType: 'multiple',
    disabled: true,
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
  },
};

export const FiltroCalendario: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
    };

    const handleClearDate = () => {
      setSelectedDate(null);
    };

    return (
      <div style={{ padding: '2rem' }}>
        <Filter
          filterType="calendar"
          buttonText={selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Selecionar Data'}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          locale="pt-br"
          variant="outlined"
          side="bottom"
          onClearDate={handleClearDate}
        />
      </div>
    );
  },
};

export const MultiplosFiltros: Story = {
  render: () => {
    const [statusFilters, setStatusFilters] = useState<string[]>([]);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Filter
            items={statusItems}
            buttonText='Status'
            selectedIds={statusFilters}
            onApplyFilter={setStatusFilters}
            filterType="multiple"
            variant="outlined"
          />
          <Filter
            items={categoryItems}
            buttonText='Categoria'
            selectedIds={categoryFilters}
            onApplyFilter={setCategoryFilters}
            filterType="multiple"
            variant="outlined"
            enableSearch={true}
          />
        </div>
      </div>
    );
  },
};

export const FiltrosCombinados: Story = {
  render: () => {
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);
    const [pdv, setPdv] = useState<string>('');
    const [tipoMovimento, setTipoMovimento] = useState<string>('');
    const [funcionario, setFuncionario] = useState<string>('');
    const [finalizadora, setFinalizadora] = useState<string>('');
    const [conferencia, setConferencia] = useState<string[]>([]);
    const [diferenca, setDiferenca] = useState<string[]>([]);

    const [applied, setApplied] = useState({
      dataInicio: null as Date | null,
      dataFim: null as Date | null,
      pdv: '',
      tipoMovimento: '',
      funcionario: '',
      finalizadora: '',
      conferencia: [] as string[],
      diferenca: [] as string[],
    });

    const appliedFilterCount = [
      applied.dataInicio !== null,
      applied.dataFim !== null,
      applied.pdv !== '',
      applied.tipoMovimento !== '',
      applied.funcionario !== '',
      applied.finalizadora !== '',
      applied.conferencia.length > 0,
      applied.diferenca.length > 0,
    ].filter(Boolean).length;

    const handleApply = () => {
      setApplied({ dataInicio, dataFim, pdv, tipoMovimento, funcionario, finalizadora, conferencia, diferenca });
    };

    const handleClear = () => {
      setDataInicio(null); setDataFim(null);
      setPdv(''); setTipoMovimento('');
      setFuncionario(''); setFinalizadora('');
      setConferencia([]); setDiferenca([]);
      setApplied({ dataInicio: null, dataFim: null, pdv: '', tipoMovimento: '', funcionario: '', finalizadora: '', conferencia: [], diferenca: [] });
    };

    const toggleChip = (
      selected: string[],
      setter: (v: string[]) => void,
      id: string,
    ) => {
      setter(selected.includes(id) ? selected.filter((v) => v !== id) : [...selected, id]);
    };

    return (
      <div style={{ padding: '2rem' }}>
        <Filter
          mode="combined"
          buttonText="Filtrar"
          title="Filtrar"
          variant="outlined"
          appliedFilterCount={appliedFilterCount}
          onApply={handleApply}
          onClear={handleClear}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <DatePicker
              label="Data inicial"
              value={dataInicio}
              onChange={setDataInicio}
              locale="pt-br"
              calendarSide="bottom"
            />
            <DatePicker
              label="Data final"
              value={dataFim}
              onChange={setDataFim}
              locale="pt-br"
              calendarSide="bottom"
              minDate={dataInicio ?? undefined}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Select
              label="PDV"
              items={[
                { value: 'pdv1', text: 'PDV 01' },
                { value: 'pdv2', text: 'PDV 02' },
                { value: 'pdv3', text: 'PDV 03' },
              ]}
              variant="text"
              placeholder="Selecione"
              value={pdv}
              onValueChange={(val) => setPdv(val as string)}
            />
            <Select
              label="Tipo de movimento"
              items={[
                { value: 'entrada', text: 'Entrada' },
                { value: 'saida', text: 'Saída' },
                { value: 'transferencia', text: 'Transferência' },
              ]}
              variant="text"
              placeholder="Selecione"
              value={tipoMovimento}
              onValueChange={(val) => setTipoMovimento(val as string)}
            />
            <Select
              label="Funcionário"
              items={[
                { value: 'ana', text: 'Ana Lima' },
                { value: 'carlos', text: 'Carlos Souza' },
                { value: 'julia', text: 'Júlia Mendes' },
              ]}
              variant="text"
              placeholder="Selecione"
              value={funcionario}
              onValueChange={(val) => setFuncionario(val as string)}
            />
            <Select
              label="Finalizadora"
              items={[
                { value: 'dinheiro', text: 'Dinheiro' },
                { value: 'cartao', text: 'Cartão' },
                { value: 'pix', text: 'Pix' },
              ]}
              variant="text"
              placeholder="Selecione"
              value={finalizadora}
              onValueChange={(val) => setFinalizadora(val as string)}
            />
          </div>

          <div>
            <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 500 }}>Conferência</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { id: 'pendente', text: 'Pendente' },
                { id: 'conferido', text: 'Conferido' },
                { id: 'revalidar', text: 'Revalidar' },
              ].map((opt) => (
                <Chips
                  key={opt.id}
                  variant={conferencia.includes(opt.id) ? 'success' : 'neutral'}
                  onClick={() => toggleChip(conferencia, setConferencia, opt.id)}
                  style={{ cursor: 'pointer' }}
                  role="checkbox"
                  aria-checked={conferencia.includes(opt.id)}
                >
                  {opt.text}
                </Chips>
              ))}
            </div>
          </div>
          <div>
            <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 500 }}>Diferença</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { id: 'exata', text: 'Exata' },
                { id: 'sobra', text: 'Sobra' },
                { id: 'falta', text: 'Falta' },
              ].map((opt) => (
                <Chips
                  key={opt.id}
                  variant={diferenca.includes(opt.id) ? 'success' : 'neutral'}
                  onClick={() => toggleChip(diferenca, setDiferenca, opt.id)}
                  style={{ cursor: 'pointer' }}
                  role="checkbox"
                  aria-checked={diferenca.includes(opt.id)}
                >
                  {opt.text}
                </Chips>
              ))}
            </div>
          </div>
        </Filter>
      </div>
    );
  },
};

export const PosicaoDireita: Story = {
  render: FilterTemplate,
  args: {
    items: categoryItems,
    buttonText: 'Categoria',
    filterType: 'multiple',
    side: 'bottom',
    align: 'end',
    variant: 'outlined',
  },
};
PosicaoDireita.storyName = 'Posição Direita';