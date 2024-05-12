import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { Text } from 'react-native-paper';

import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import { db } from '@/utils/database';
import NetInfo from '@react-native-community/netinfo';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';

import migrations from '../../../drizzle/migrations';

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  })
);
const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

function DatabaseProvider({ children }: Props) {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  if (error) return <Text>Migration error: {error.message}</Text>;
  if (!success) return <Text>Migration is in progress...</Text>;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default DatabaseProvider;
