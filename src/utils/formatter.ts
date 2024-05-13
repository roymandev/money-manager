export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions & {
    locales?: string;
  }
) => {
  return new Intl.NumberFormat(options?.locales || 'id-ID', {
    currency: 'IDR',
    ...options,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatStrToNumber = (str: string) => {
  const isNegative = str.includes('-');

  const number = Number(str.replace(/[^0-9]/g, ''));

  return isNegative ? -number : number;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
