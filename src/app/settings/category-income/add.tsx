import { useRouter } from 'expo-router';

import PaperStackHeader from '@/components/PaperStackHeader';
import CategoryForm from '@/modules/categories/CategoryForm';
import { useCategoryAdd } from '@/modules/categories/queries';
import { TCategoryInput } from '@/modules/categories/schema';
import { promiseHandler } from '@/utils';

function AddCategoryPage() {
  const router = useRouter();
  const { mutateAsync } = useCategoryAdd();

  const handleOnSubmit = async (data: TCategoryInput) => {
    const [, error] = await promiseHandler(mutateAsync(data));

    if (error) return;

    router.back();
  };

  return (
    <>
      <PaperStackHeader
        options={{ title: 'Add Income Category' }}
        withBackButton
      />

      <CategoryForm type="income" onSubmit={handleOnSubmit} />
    </>
  );
}

export default AddCategoryPage;
