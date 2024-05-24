import { useState } from 'react';
import { Appbar, FAB, Text, Title, Tooltip } from 'react-native-paper';

import {
  addMonths,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { useRouter } from 'expo-router';

import Currency from '@/components/Currency';
import FlasListEmptyContainer from '@/components/FlasListEmptyContainer';
import ListItem from '@/components/ListItem';
import ListSubheader from '@/components/ListSubheader';
import PaperStackHeader from '@/components/PaperStackHeader';
import { useTransactionsByDate } from '@/modules/transactions/queries';
import { addTransSectionsHeader } from '@/modules/transactions/utils';
import { FlashList } from '@shopify/flash-list';

const today = new Date();

export default function HomeScreen() {
  const router = useRouter();
  const [month, setMonth] = useState(today);

  const { data } = useTransactionsByDate(
    startOfMonth(month),
    endOfMonth(month)
  );
  const transWithSections = addTransSectionsHeader(data || []);

  const prevMonth = () => setMonth(subMonths(month, 1));
  const nextMonth = () => setMonth(addMonths(month, 1));

  return (
    <>
      <PaperStackHeader options={{ title: 'Transactions' }}>
        <Tooltip title="Prev Month">
          <Appbar.Action icon="chevron-left" onPress={prevMonth} />
        </Tooltip>
        <Text>{format(month, 'MMMM yyyy')}</Text>
        <Tooltip title="Next Month">
          <Appbar.Action icon="chevron-right" onPress={nextMonth} />
        </Tooltip>
      </PaperStackHeader>

      <FlashList
        data={transWithSections}
        estimatedItemSize={48}
        ListEmptyComponent={() => (
          <FlasListEmptyContainer>
            <Title>No Transactions</Title>
          </FlasListEmptyContainer>
        )}
        renderItem={({ item }) => {
          if (Array.isArray(item)) {
            return (
              <ListSubheader
                title={format(item[0], 'dd MMM yyyy')}
                right={<Currency amount={item[1]} />}
              />
            );
          }

          return (
            <ListItem
              title={item.category.name || '(No Category)'}
              right={() => <Currency amount={item.amount} />}
              onPress={() => router.push(`/transaction/${item.id}/edit`)}
            />
          );
        }}
        contentContainerStyle={{
          paddingBottom: 88,
        }}
      />

      <FAB
        icon="plus"
        onPress={() => router.push('/transaction/add')}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      />
    </>
  );
}
