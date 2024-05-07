import { FAB, SegmentedButtons } from 'react-native-paper';

import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from 'valibot';

import CurrencyInput from '@/components/CurrencyInput';
import PaperStackHeader from '@/components/PaperStackHeader';
import { schemaBaseTransaction } from '@/modules/transactions/schemas';
import { valibotResolver } from '@hookform/resolvers/valibot';

function AddTransactionPage() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<
    Input<typeof schemaBaseTransaction>
  >({
    resolver: valibotResolver(schemaBaseTransaction),
    defaultValues: {
      type: 'expense',
      amount: 0,
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
          gap: 24,
        }}
      >
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, ref, ...rest } }) => (
            <SegmentedButtons
              onValueChange={onChange}
              {...rest}
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
          name="amount"
          render={({ field: { onChange, ref, ...rest } }) => (
            <CurrencyInput label="Amount" onValueChange={onChange} {...rest} />
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
