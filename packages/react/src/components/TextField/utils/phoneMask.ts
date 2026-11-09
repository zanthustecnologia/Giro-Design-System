/** Formata um telefone brasileiro: (XX)XXXX-XXXX (10 dígitos) ou (XX)XXXXX-XXXX (11 dígitos) */
export function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length === 0) {
    return '';
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  const ddd = digits.slice(0, 2);
  const remainder = digits.slice(2);
  const splitAt = digits.length > 10 ? 5 : 4;

  if (remainder.length <= splitAt) {
    return `(${ddd})${remainder}`;
  }

  const firstPart = remainder.slice(0, splitAt);
  const secondPart = remainder.slice(splitAt);

  return `(${ddd})${firstPart}-${secondPart}`;
}
