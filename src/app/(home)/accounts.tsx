import { SectionList, View } from 'react-native';
import { Appbar, List, Text, Tooltip, useTheme } from 'react-native-paper';

import { Link } from 'expo-router';

import Currency from '@/components/Currency';
import PaperStackHeader from '@/components/PaperStackHeader';
import TotalHeader from '@/components/TotalHeader';
import { DUMMY_ACCOUNTS } from '@/modules/accounts/dummyData';

export default function TransactionsScreen() {
  const theme = useTheme();

  return (
    <>
      <PaperStackHeader options={{ title: 'Accounts' }}>
        <Tooltip title="Add Account">
          <Link asChild href="/(accounts)/add-account">
            <Appbar.Action icon="plus" />
          </Link>
        </Tooltip>
      </PaperStackHeader>

      <TotalHeader
        items={[
          {
            name: 'Assets',
            amount: 7931616,
          },
          {
            name: 'Liabilities',
            amount: -6974391,
          },
          {
            name: 'Total',
            amount: 1957225,
            white: true,
          },
        ]}
      />

      <List.Section style={{ flex: 1, marginVertical: 0 }}>
        <SectionList
          sections={DUMMY_ACCOUNTS}
          keyExtractor={({ id }) => String(id)}
          // style={{ flex: 1 }}
          renderSectionHeader={({ section: { title, data } }) => {
            const total = data.reduce((acc, item) => {
              return acc + item.balance;
            }, 0);

            return (
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 8,
                  paddingTop: 24,
                  paddingLeft: 16,
                  paddingRight: 24,
                  justifyContent: 'space-between',
                }}
              >
                <Text>{title}</Text>
                <Currency amount={total} />
              </View>
            );
          }}
          renderItem={({ item }) => (
            <List.Item
              key={item.id}
              title={item.name}
              onPress={() => console.log('Pressed')}
              style={{
                backgroundColor: theme.colors.elevation.level1,
              }}
              right={() => (
                <Currency
                  amount={item.balance}
                  withSymbol
                  style={{ alignSelf: 'center' }}
                />
              )}
            />
          )}
        />
      </List.Section>
    </>
  );
}
