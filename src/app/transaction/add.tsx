import { FAB, SegmentedButtons } from 'react-native-paper';

import { formatISO } from 'date-fns';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'valibot';

import ButtonDatePicker from '@/components/ButtonDatePicker';
import CurrencyInput from '@/components/CurrencyInput';
import PaperStackHeader from '@/components/PaperStackHeader';
import TextInput from '@/components/TextInput';
import { schemaTransactionInsert } from '@/schema';
import { valibotResolver } from '@hookform/resolvers/valibot';

function AddTransactionPage() {
  const router = useRouter();

  const { control, handleSubmit, setFocus } = useForm<
    Input<typeof schemaTransactionInsert>
  >({
    resolver: valibotResolver(schemaTransactionInsert),
    shouldFocusError: false,
    defaultValues: {
      type: 'expense',
      amount: 0,
      date: formatISO(new Date()),
      // category: '',
    },
  });

  const handleOnSubmit = handleSubmit((data) => {
    console.log(data);
    router.back();
  });

  return (
    <>
      <PaperStackHeader options={{ title: 'Add Transaction' }} withBackButton />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 88,
          paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <SegmentedButtons
              value={value}
              onValueChange={onChange}
              buttons={[
                {
                  value: 'expense',
                  label: 'Expense',
                },
                {
                  value: 'income',
                  label: 'Income',
                },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, ...rest }, fieldState }) => (
            <ButtonDatePicker
              label="Date"
              onChange={(value) => {
                onChange(value);
                setTimeout(() => setFocus('amount'), 200);
              }}
              error={fieldState.error?.message}
              {...rest}
            />
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, ...rest }, fieldState }) => (
            <TextInput
              label="Category"
              mode="outlined"
              onChangeText={onChange}
              error={fieldState.error?.message}
              {...rest}
            />
          )}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, ...rest }, fieldState }) => (
            <CurrencyInput
              label="Amount"
              onValueChange={onChange}
              error={fieldState.error?.message}
              {...rest}
            />
          )}
        />
      </ScrollView>

      <FAB
        icon="content-save"
        label="Save"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onPress={handleOnSubmit}
      />
    </>
  );
}

export default AddTransactionPage;
