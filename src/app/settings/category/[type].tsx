import { FAB, List } from 'react-native-paper';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { parse } from 'valibot';

import ListItem from '@/components/ListItem';
import PaperStackHeader from '@/components/PaperStackHeader';
import { useCategoriesByType } from '@/modules/categories/queries';
import { schemaCategory } from '@/modules/categories/schema';
import { capitalize } from '@/utils/formatter';
import { FlashList } from '@shopify/flash-list';

export { ErrorBoundary } from '@/components/utils/ErrorBoundary';

function IncomeCategorySettings() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const type = parse(schemaCategory.entries.type, params.type);
  const { data } = useCategoriesByType(type);

  return (
    <>
      <PaperStackHeader
        options={{ title: `${capitalize(type)} Category` }}
        withBackButton
      />

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
        onPress={() => router.push(`./${type}/add`)}
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
