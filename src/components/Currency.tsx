import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

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
  locales = 'id-ID',
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

  const display = useMemo(() => {
    return new Intl.NumberFormat(locales, {
      style: withSymbol ? 'currency' : 'decimal',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      signDisplay: withSign ? 'auto' : 'never',
    }).format(amount);
  }, [amount, locales, withSymbol, withSign]);

  return (
    <Text style={[{ color, fontFamily: 'Lato_400Regular' }, style]}>
      {display}
    </Text>
  );
}

export default Currency;
