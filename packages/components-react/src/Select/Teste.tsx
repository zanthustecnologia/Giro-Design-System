// Example usage in a component
const InfiniteSelectExample = () => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [selectedValue, setSelectedValue] = useState<SelectOption[]>([]);
  
  const totalPages = 20;

  const handleLoadMore = useCallback(async () => {
    if (loadingStatus === 'loading' || currentPage >= totalPages) {
      return;
    }

    setLoadingStatus('loading');

    try {
      // Simular API call
      const response = await fetch(`/api/options?page=${currentPage + 1}`);
      const newOptions = await response.json();

      // Adicionar novas opções às existentes
      setOptions(prev => [...prev, ...newOptions]);
      setCurrentPage(prev => prev + 1);
      setLoadingStatus('succeeded');
    } catch (error) {
      console.error('Erro ao carregar mais opções:', error);
      setLoadingStatus('failed');
    }
  }, [currentPage, loadingStatus, totalPages]);

  const handleSelectionChange = (selectedItems: SelectOption[]) => {
    setSelectedValue(selectedItems);
    console.log('Opções selecionadas:', selectedItems);
  };

  return (
    <Select
      options={options}
      type="checkbox" // ou "text" para seleção única
      placeholder="Selecione opções..."
      onChange={handleSelectionChange}
      value={selectedValue.map(item => item.id!)}
      showSubText={true}
      infiniteScroll={{
        status: loadingStatus,
        page: currentPage,
        lastPage: totalPages,
        onLoadMore: handleLoadMore,
        threshold: 0.1,
        rootMargin: '50px',
        debug: process.env.NODE_ENV === 'development'
      }}
    />
  );
};