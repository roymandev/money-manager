import { useLocalSearchParams, useRouter } from 'expo-router';

import PaperStackHeader from '@/components/PaperStackHeader';
import CategoryForm from '@/modules/categories/CategoryForm';
import { useCategoryAdd } from '@/modules/categories/queries';
import { TCategoryInsert } from '@/modules/categories/types';
import { schemaCategory } from '@/schemas';
import { promiseHandler } from '@/utils';
import { capitalize } from '@/utils/formatter';

export { ErrorBoundary } from '@/components/utils/ErrorBoundary';

function AddCategoryPage() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const type = schemaCategory.shape.type.parse(params.type);

  const { mutateAsync } = useCategoryAdd();

  const handleOnSubmit = async (data: TCategoryInsert) => {
    const [, error] = await promiseHandler(mutateAsync(data));

    if (error) return;

    router.back();
  };

  return (
    <>
      <PaperStackHeader
        options={{ title: `Add ${capitalize(type)} Category` }}
        withBackButton
      />

      <CategoryForm type={type} onSubmit={handleOnSubmit} />
    </>
  );
}

export default AddCategoryPage;
