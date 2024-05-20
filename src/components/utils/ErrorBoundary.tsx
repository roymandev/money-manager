import { View } from 'react-native';
import { Button, Title } from 'react-native-paper';

import { ErrorBoundaryProps, useRouter } from 'expo-router';

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <Title>Error: {error.message}</Title>
      <Button mode="contained" onPress={() => router.back()}>
        Go Back
      </Button>
    </View>
  );
}
