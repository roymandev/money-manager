import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import Currency, { CurrencyProps } from './Currency';

type Props = {
  items: {
    name: string;
    amount: number;
    type?: CurrencyProps;
  }[];
};

function TotalHeader({ items }: Props) {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.elevation.level3,
        paddingVertical: 8,
      }}
    >
      {items.map(({ name, amount }) => (
        <View
          key={name}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text variant="labelSmall">{name}</Text>
          <Currency amount={amount} type="neutral" />
        </View>
      ))}
    </View>
  );
}

export default TotalHeader;
