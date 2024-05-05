import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { formatCurrency } from '@/utils/formatter';

type Props = {
  amount: number;
  locales?: string;
  withSymbol?: boolean;
  withSign?: boolean;
  white?: boolean;
  style?: TextStyle;
};

function Currency({
  amount,
  locales,
  withSymbol,
  withSign,
  white,
  style,
}: Props) {
  const theme = useTheme();

  let color = '#fff';
  if (!white && amount < 0) {
    color = theme.colors.tertiary;
  } else if (!white && amount > 0) {
    color = theme.colors.primary;
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
