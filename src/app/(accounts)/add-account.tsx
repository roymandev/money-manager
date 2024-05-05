import { View } from 'react-native';
import { Divider, FAB, TextInput } from 'react-native-paper';

import { ScrollView } from 'react-native-gesture-handler';

import CurrencyInput from '@/components/CurrencyInput';
import ListItemSwitch from '@/components/ListItemSwitch';
import PaperStackHeader from '@/components/PaperStackHeader';
import PaperStack from '@/components/utils/PaperStack';

function AccountsAddAccount() {
  return (
    <>
      <PaperStack.Screen
        options={{
          presentation: 'modal',
        }}
      />

      <PaperStackHeader options={{ title: 'Add Account' }} withBackButton />

      <ScrollView contentContainerStyle={{ paddingBottom: 88 }}>
        <View style={{ paddingHorizontal: 16, marginBottom: 16, gap: 12 }}>
          <TextInput label="Groups" mode="outlined" returnKeyType="next" />
          <TextInput label="Name" mode="outlined" returnKeyType="next" />
          <CurrencyInput label="Amount" />
          <TextInput label="Description" mode="outlined" returnKeyType="go" />
        </View>

        <Divider />

        <ListItemSwitch title="Include in totals" />
      </ScrollView>

      <FAB
        icon="content-save"
        label="Save"
        onPress={() => console.log('Pressed')}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      />
    </>
  );
}

export default AccountsAddAccount;
