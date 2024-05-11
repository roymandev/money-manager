import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { formatCurrency } from '@/utils/formatter';

type Props = {
  amount: number;
  locales?: string;
  withSymbol?: boolean;
  withSign?: boolean;
  type?: 'positive' | 'negative' | 'neutral';
  style?: TextStyle;
  reverse?: boolean;
};

function Currency({
  amount,
  locales,
  withSymbol,
  withSign = true,
  type,
  reverse,
  style,
}: Props) {
  const theme = useTheme();

  let transType = amount > 0 ? 'positive' : 'negative';
  if (reverse) transType = amount > 0 ? 'negative' : 'positive';
  if (type) transType = type;

  let color = '#fff';

  switch (transType) {
    case 'positive':
      color = theme.colors.primary;
      break;
    case 'negative':
      color = theme.colors.tertiary;
      break;
    default:
  }

  const display = useMemo(
    () => formatCurrency(amount, { locales, withSymbol, withSign }),
    [amount, locales, withSymbol, withSign]
  );

  return (
    <Text style={[{ color, fontFamily: 'Lato_400Regular' }, style]}>
      {display}
    </Text>
  );
}

export default Currency;
