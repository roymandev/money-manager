import { View } from 'react-native';
import { List } from 'react-native-paper';

import { useRouter } from 'expo-router';

import PaperStackHeader from '@/components/PaperStackHeader';

export default function OthersScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <PaperStackHeader options={{ title: 'Others' }} />

      <List.Section style={{ marginVertical: 0 }}>
        <List.Item
          title="Accounts"
          description="Group, create, edit"
          left={() => <List.Icon icon="credit-card-multiple-outline" />}
          style={{ paddingHorizontal: 18 }}
        />

        <List.Subheader>Income and Expense Settings</List.Subheader>

        <List.Item
          title="Income Category"
          left={() => <List.Icon icon="swap-vertical-bold" />}
          style={{ paddingHorizontal: 18 }}
          onPress={() => router.push('/settings/income-category')}
        />
      </List.Section>
    </View>
  );
}
