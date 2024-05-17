import { View } from 'react-native';
import { List } from 'react-native-paper';

import { useRouter } from 'expo-router';

import ListItem from '@/components/ListItem';
import PaperStackHeader from '@/components/PaperStackHeader';
import DialogClearTransactions from '@/modules/transactions/DialogClearTransactions';

export default function OthersScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <PaperStackHeader options={{ title: 'Others' }} />

      <List.Section style={{ marginVertical: 0, flex: 1 }}>
        <ListItem
          title="Accounts"
          description="Group, create, edit"
          left={() => <List.Icon icon="credit-card-multiple-outline" />}
          style={{ paddingHorizontal: 18 }}
        />

        <DialogClearTransactions
          renderTrigger={({ onPress }) => (
            <ListItem
              title="Clear Transaction"
              left={() => <List.Icon icon="delete-outline" />}
              onPress={onPress}
            />
          )}
        />

        <List.Subheader>Income and Expense Settings</List.Subheader>

        <ListItem
          title="Income Category"
          left={() => <List.Icon icon="swap-vertical-bold" />}
          onPress={() => router.push('/settings/category-income')}
        />
      </List.Section>
    </View>
  );
}
