import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/utils/database';

import migrations from '../../../drizzle/migrations';

type Props = {
  children: React.ReactNode;
};

function DatabaseProvider({ children }: Props) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return children;
}

export default DatabaseProvider;
