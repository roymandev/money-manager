import { useRouter } from 'expo-router';

import PaperStackHeader from '@/components/PaperStackHeader';
import TransactionForm from '@/modules/transactions/TransactionForm';
import { useTransactionsAdd } from '@/modules/transactions/queries';
import { TTransactionInsert } from '@/modules/transactions/types';

function AddTransactionPage() {
  const router = useRouter();
  const mutation = useTransactionsAdd();

  const handleOnSubmit = async (data: TTransactionInsert) => {
    await mutation.mutateAsync(data);
    router.back();
  };

  return (
    <>
      <PaperStackHeader options={{ title: 'Add Transaction' }} withBackButton />

      <TransactionForm onSubmit={handleOnSubmit} />
    </>
  );
}

export default AddTransactionPage;
