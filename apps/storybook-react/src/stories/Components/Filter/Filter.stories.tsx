// Filter.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker, Filter, Select } from '@giro-ds/react';
import type { FilterProps } from '@giro-ds/react';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    docs: {
      description: {
        component: 'Componente de filtro que encapsula o Dropdown com modo filter automático.',
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
    type: {
      control: 'select',
      options: ['multiple', 'single', 'icon'],
      description: 'Tipo do dropdown',
      table: {
        type: { summary: "'multiple' | 'single' | 'icon'" },
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

// ✅ Dados de exemplo para os filtros
const statusItems = [
  { id: 'ativo', text: 'Ativo' },
  { id: 'inativo', text: 'Inativo' },
  { id: 'pendente', text: 'Pendente' },
  { id: 'bloqueado', text: 'Bloqueado' },
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

// Template básico com Dropdown integrado
const FilterTemplate = (args: FilterProps) => {
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const handleApplyFilter = (selectedIds: string[]) => {
    setAppliedFilters(selectedIds);
    console.log('✅ Filtros APLICADOS e GUARDADOS:', selectedIds);
  };

  return (
      <Filter
        {...args}
        selectedIds={appliedFilters}
        onApplyFilter={handleApplyFilter}
      />
  );
};

// ✅ STORIES ATUALIZADAS

export const Default: Story = {
  render: FilterTemplate,
  args: {
    items: statusItems,
    buttonText: 'Status',
    type: 'multiple',
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
    disabled: false,
  },
};

export const WithSearch: Story = {
  render: FilterTemplate,
  args: {
    items: categoryItems,
    buttonText: 'Categoria',
    type: 'multiple',
    enableSearch: true,
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
  },
};

export const Disabled: Story = {
  render: FilterTemplate,
  args: {
    items: statusItems,
    buttonText: 'Status',
    type: 'multiple',
    disabled: true,
    side: 'bottom',
    align: 'start',
    variant: 'outlined',
  },
};

// ✅ NOVO: Story para testar o filtro de calendário
export const CalendarFilter: Story = {
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
          type="calendar"
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

// ✅ EXEMPLO AVANÇADO - Múltiplos filtros trabalhando juntos
export const MultipleFilters: Story = {
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
            type="multiple"
            variant="outlined"
          />
          <Filter
            items={categoryItems}
            buttonText='Categoria'
            selectedIds={categoryFilters}
            onApplyFilter={setCategoryFilters}
            type="multiple"
            variant="outlined"
            enableSearch={true}
          />
        </div>
      </div>
    );
  },
};

// ✅ Filtro combinado — painel lateral com componentes compostos via children
export const CombinedFilter: Story = {
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

    const activeCount = [
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

    const chipStyle = (active: boolean): React.CSSProperties => ({
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 16px',
      borderRadius: '24px',
      border: `1px solid ${active ? 'var(--color-brand-primary-default, #1a6ce8)' : 'var(--color-neutral-high-dark, #d0d0d0)'}`,
      background: active ? 'var(--color-brand-primary-light, #e8f0fd)' : 'transparent',
      color: active ? 'var(--color-brand-primary-default, #1a6ce8)' : 'inherit',
      font: 'inherit',
      fontSize: '14px',
      cursor: 'pointer',
    });

    const ChipGroup = ({
      label,
      options,
      selected,
      onToggle,
    }: {
      label: string;
      options: { id: string; text: string }[];
      selected: string[];
      onToggle: (id: string) => void;
    }) => (
      <div>
        <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 500 }}>{label}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected.includes(opt.id)}
              style={chipStyle(selected.includes(opt.id))}
              onClick={() => onToggle(opt.id)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    );

    return (
      <div style={{ padding: '2rem' }}>
        <Filter
          mode="combined"
          buttonText="Filtrar"
          title="Filtrar"
          variant="outlined"
          activeCount={activeCount}
          onApply={handleApply}
          onClear={handleClear}
        >
          {/* Datas — 2 colunas */}
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

          {/* Selects — 2 colunas */}
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

          {/* Chips de seleção */}
          <ChipGroup
            label="Conferência"
            options={[
              { id: 'pendente', text: 'Pendente' },
              { id: 'conferido', text: 'Conferido' },
              { id: 'revalidar', text: 'Revalidar' },
            ]}
            selected={conferencia}
            onToggle={(id) => toggleChip(conferencia, setConferencia, id)}
          />
          <ChipGroup
            label="Diferença"
            options={[
              { id: 'exata', text: 'Exata' },
              { id: 'sobra', text: 'Sobra' },
              { id: 'falta', text: 'Falta' },
            ]}
            selected={diferenca}
            onToggle={(id) => toggleChip(diferenca, setDiferenca, id)}
          />
        </Filter>
      </div>
    );
  },
};

export const RightPosition: Story = {
  render: FilterTemplate,
  args: {
    items: categoryItems,
    buttonText: 'Categoria',
    type: 'multiple',
    side: 'bottom',
    align: 'end',
    variant: 'outlined',
  },
};