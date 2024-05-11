import { Fragment } from 'react';
import { FAB, List } from 'react-native-paper';

import { format, formatISO } from 'date-fns';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Currency from '@/components/Currency';
import ListItem from '@/components/ListItem';
import ListSubheader from '@/components/ListSubheader';
import { groupTransByDate } from '@/modules/transactions/utils';

const dummyTransactions = groupTransByDate([
  {
    id: '1',
    date: formatISO(new Date()),
    amount: 100000,
    type: 'income',
    category: 'RDS Salary',
  },
  {
    id: '2',
    date: formatISO(new Date()),
    amount: -24500,
    type: 'expense',
    category: 'Food',
  },
  {
    id: '3',
    date: formatISO(new Date()),
    amount: 500000,
    type: 'income',
    category: 'Platon Salary',
  },
]);

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 88, flex: 1 }}>
        <List.Section title="Transactions">
          {dummyTransactions.map(({ date, items, total }) => (
            <Fragment key={date}>
              <ListSubheader
                title={format(date, 'dd MMM yyyy')}
                right={<Currency amount={total} />}
              />

              {items.map(({ id, category, amount }) => (
                <ListItem
                  key={id}
                  title={category}
                  right={() => <Currency amount={amount} />}
                />
              ))}
            </Fragment>
          ))}
        </List.Section>

        <FAB
          icon="plus"
          onPress={() => router.push('/transaction/add')}
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
