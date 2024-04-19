import { View } from 'react-native';
import { Button } from 'react-native-paper';

export default function ModalScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button mode="outlined">About</Button>
    </View>
  );
}
