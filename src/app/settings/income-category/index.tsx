import { FAB, List } from 'react-native-paper';

import { useRouter } from 'expo-router';

import ListItem from '@/components/ListItem';
import PaperStackHeader from '@/components/PaperStackHeader';
import { useCategoriesByType } from '@/modules/categories/queries';
import { FlashList } from '@shopify/flash-list';

function IncomeCategorySettings() {
  const router = useRouter();
  const { data } = useCategoriesByType('income');

  return (
    <>
      <PaperStackHeader options={{ title: 'Income Category' }} withBackButton />

      <List.Section style={{ marginVertical: 0, flex: 1 }}>
        <FlashList
          data={data}
          renderItem={({ item }) => <ListItem title={item.name} />}
          estimatedItemSize={48}
          contentContainerStyle={{
            paddingBottom: 88,
          }}
        />
      </List.Section>

      <FAB
        icon="plus"
        onPress={() => router.push('./add')}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      />
    </>
  );
}

export default IncomeCategorySettings;
