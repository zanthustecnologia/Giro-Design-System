export const normalizeText = (text: React.ReactNode): string => {
    if (typeof text === 'string') return text.toLowerCase();
    if (typeof text === 'number') return text.toString().toLowerCase();
    if (typeof text === 'bigint') return text.toString().toLowerCase();
    if (typeof text === 'boolean') return text.toString().toLowerCase();
    return '';
  };

