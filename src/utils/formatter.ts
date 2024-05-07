export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions & {
    locales?: string;
    withSymbol?: boolean;
    withSign?: boolean;
  }
) =>
  new Intl.NumberFormat(options?.locales || 'id-ID', {
    currency: 'IDR',
    ...options,
    style: options?.withSymbol ? 'currency' : options?.style,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    signDisplay: options?.withSign ? options?.signDisplay : 'never',
  }).format(value);

export const formatStrToNumber = (str: string) => {
  const isNegative = str.includes('-');

  const number = Number(str.replace(/[^0-9]/g, ''));

  return isNegative ? -number : number;
};
