import { useLocalSearchParams, useRouter } from 'expo-router';

import PaperStackHeader from '@/components/PaperStackHeader';
import TransactionForm from '@/modules/transactions/TransactionForm';
import {
  useTransactionById,
  useTransactionsEdit,
} from '@/modules/transactions/queries';
import { TTransactionInput } from '@/modules/transactions/types';
import { promiseHandler } from '@/utils';

function EditTransactionPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data } = useTransactionById(Number(id));
  const { mutateAsync } = useTransactionsEdit();

  const handleOnSubmit = async (newData: TTransactionInput) => {
    if (!data) return;

    const [, error] = await promiseHandler(
      mutateAsync({
        ...data,
        ...newData,
      })
    );

    if (error) return;

    router.back();
  };

  return (
    <>
      <PaperStackHeader options={{ title: 'Add Transaction' }} withBackButton />

      {data && (
        <TransactionForm onSubmit={handleOnSubmit} defaultValues={data} />
      )}
    </>
  );
}

export default EditTransactionPage;
