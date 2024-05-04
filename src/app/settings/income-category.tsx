import { View } from 'react-native';
import { Appbar, List, Tooltip } from 'react-native-paper';

import { Link } from 'expo-router';

import PaperStackHeader from '@/components/PaperStackHeader';

function IncomeCategorySettings() {
  return (
    <View style={{ flex: 1 }}>
      <PaperStackHeader options={{ title: 'Income Category' }}>
        <Tooltip title="Add Category">
          <Link asChild href="/(accounts)/add-account">
            <Appbar.Action icon="plus" />
          </Link>
        </Tooltip>
      </PaperStackHeader>

      <List.Section style={{ marginVertical: 0 }}>
        <List.Item title="RDS" />
        <List.Item title="Platon" />
        <List.Item title="Trade Gain" />
      </List.Section>
    </View>
  );
}

export default IncomeCategorySettings;
