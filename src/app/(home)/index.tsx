import { FAB } from 'react-native-paper';

import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 88, flex: 1 }}>
      <FAB
        icon="plus"
        onPress={() => router.push('/transaction/add')}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      />
    </ScrollView>
  );
}
