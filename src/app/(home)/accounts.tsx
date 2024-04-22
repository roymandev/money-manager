import { Appbar } from 'react-native-paper';

import PaperStackHeader from '@/components/PaperStackHeader';
import TotalHeader from '@/components/TotalHeader';

export default function TransactionsScreen() {
  return (
    <>
      <PaperStackHeader options={{ title: 'Accounts' }}>
        <Appbar.Action icon="plus" onPress={() => {}} />
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
    </>
  );
}
