import { FAB, SegmentedButtons } from 'react-native-paper';

import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';

import ButtonDatePicker from '@/components/ButtonDatePicker';
import CurrencyInput from '@/components/CurrencyInput';
import { schemaTransactionInsert } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import CategorySelector from '../categories/CategorySelector';
import { TTransactionInsert } from './types';

type Props = {
  onSubmit: (data: TTransactionInsert) => void;
  defaultValues?: Partial<TTransactionInsert>;
};

function TransactionForm({ onSubmit, defaultValues }: Props) {
  const { control, handleSubmit, setFocus, watch } =
    useForm<TTransactionInsert>({
      resolver: zodResolver(schemaTransactionInsert),
      shouldFocusError: false,
      defaultValues: {
        type: 'expense',
        amount: 0,
        date: new Date().toISOString(),
        ...defaultValues,
      },
    });

  const type = watch('type');

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
                setTimeout(() => setFocus('categoryId'), 300);
              }}
              error={fieldState.error?.message}
              {...rest}
            />
          )}
        />

        {type !== 'transfer' && (
          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, ...rest }, fieldState }) => (
              <CategorySelector
                label="Category"
                type={type}
                error={fieldState.error?.message}
                onChange={(value) => {
                  onChange(value);
                  setTimeout(() => setFocus('amount'), 300);
                }}
                {...rest}
              />
            )}
          />
        )}

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
