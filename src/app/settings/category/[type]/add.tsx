import { useLocalSearchParams, useRouter } from 'expo-router';
import { parse } from 'valibot';

import PaperStackHeader from '@/components/PaperStackHeader';
import CategoryForm from '@/modules/categories/CategoryForm';
import { useCategoryAdd } from '@/modules/categories/queries';
import { TCategoryInput, schemaCategory } from '@/modules/categories/schema';
import { promiseHandler } from '@/utils';
import { capitalize } from '@/utils/formatter';

export { ErrorBoundary } from '@/components/utils/ErrorBoundary';

function AddCategoryPage() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const type = parse(schemaCategory.entries.type, params.type);

  const { mutateAsync } = useCategoryAdd();

  const handleOnSubmit = async (data: TCategoryInput) => {
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
