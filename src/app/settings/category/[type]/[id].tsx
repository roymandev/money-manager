import { useState } from 'react';
import { Keyboard } from 'react-native';
import {
  Appbar,
  Button,
  Dialog,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { parse, pick } from 'valibot';

import PaperStackHeader from '@/components/PaperStackHeader';
import CategoryForm from '@/modules/categories/CategoryForm';
import {
  useCategoryDelete,
  useCategoryDetail,
  useCategoryEdit,
} from '@/modules/categories/queries';
import { TCategoryInput, schemaCategory } from '@/modules/categories/schema';
import { promiseHandler } from '@/utils';
import { capitalize } from '@/utils/formatter';

export { ErrorBoundary } from '@/components/utils/ErrorBoundary';

function AddCategoryPage() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { type, id } = parse(pick(schemaCategory, ['id', 'type']), {
    ...params,
    id: Number(params.id),
  });

  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    Keyboard.dismiss();
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  const { data } = useCategoryDetail(id);

  const { mutateAsync } = useCategoryEdit();
  const { mutateAsync: mutateAsyncDelete } = useCategoryDelete();

  const handleOnSubmit = async (newData: TCategoryInput) => {
    const [, error] = await promiseHandler(mutateAsync(newData));

    if (error) return;

    router.back();
  };

  const handleDelete = async () => {
    if (!data) return;

    const [, error] = await promiseHandler(mutateAsyncDelete(data));

    if (error) return;

    hideDialog();
    router.back();
  };

  return (
    <>
      <PaperStackHeader
        options={{ title: `Edit ${capitalize(type)} Category` }}
        withBackButton
      >
        <Appbar.Action
          icon="delete"
          color={theme.colors.error}
          onPress={showDialog}
        />
      </PaperStackHeader>

      {data && (
        <CategoryForm
          type={type}
          defaultValues={data}
          onSubmit={handleOnSubmit}
        />
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Delete Category</Dialog.Title>
          <Dialog.Content>
            <Text>
              This action will delete this category, and cannot be undone. Are
              you sure?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              onPress={hideDialog}
              contentStyle={{ paddingHorizontal: 8 }}
            >
              Cancel
            </Button>
            <Button
              onPress={handleDelete}
              contentStyle={{ paddingHorizontal: 8 }}
              textColor={theme.colors.onError}
              buttonColor={theme.colors.error}
              mode="contained"
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

export default AddCategoryPage;
