import { FAB, SegmentedButtons } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';

import ButtonDatePicker from '@/components/ButtonDatePicker';
import CurrencyInput from '@/components/CurrencyInput';
import TextInput from '@/components/TextInput';
import { schemaTransactionInsert } from '@/schemas';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { TTransactionInsert } from './types';

type Props = {
  onSubmit: (data: TTransactionInsert) => void;
  defaultValues?: Partial<TTransactionInsert>;
};

function TransactionForm({ onSubmit, defaultValues }: Props) {
  const { control, handleSubmit, setFocus } = useForm<TTransactionInsert>({
    resolver: valibotResolver(schemaTransactionInsert),
    shouldFocusError: false,
    defaultValues: {
      type: 'expense',
      amount: 0,
      date: new Date().toISOString(),
      categoryId: 0,
      ...defaultValues,
    },
  });

  const handleOnSubmit = handleSubmit(onSubmit);

  return (
    <>
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
          name="categoryId"
          render={({ field: { value, onChange, ...rest }, fieldState }) => (
            <TextInput
              label="Category"
              mode="outlined"
              value={value?.toString()}
              onChangeText={(newVal) => onChange(Number(newVal))}
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

export default TransactionForm;
