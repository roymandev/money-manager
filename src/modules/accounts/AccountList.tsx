import { useMemo } from 'react';
import { View } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';

import Currency from '@/components/Currency';

import { TAccount } from './types';

type Props = {
  title: string;
  accounts: TAccount[];
};

function AccountList({ title, accounts }: Props) {
  const theme = useTheme();

  const total = useMemo(() => {
    return accounts.reduce((acc, item) => {
      return acc + item.balance;
    }, 0);
  }, [accounts]);

  return (
    <List.Section>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 8,
          paddingLeft: 16,
          paddingRight: 24,
          justifyContent: 'space-between',
        }}
      >
        <Text>{title}</Text>
        <Currency amount={total} />
      </View>

      {accounts.map(({ id, name, balance }) => (
        <List.Item
          key={id}
          title={name}
          onPress={() => console.log('Pressed')}
          style={{
            backgroundColor: theme.colors.elevation.level1,
          }}
          right={() => (
            <Currency amount={balance} style={{ alignSelf: 'center' }} />
          )}
        />
      ))}
    </List.Section>
  );
}

export default AccountList;
