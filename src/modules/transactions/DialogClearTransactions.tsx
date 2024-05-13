import { useState } from 'react';
import {
  Button,
  Dialog,
  Portal,
  Snackbar,
  Text,
  useTheme,
} from 'react-native-paper';

import { promiseHandler } from '@/utils';

import { useTransactionsDeleteAll } from './queries';

type Props = {
  renderTrigger: (props: { onPress: () => void }) => JSX.Element;
};

function DialogClearTransactions({ renderTrigger }: Props) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Snackbar
  const [snackContent, setSnackContent] = useState('');
  const [snackVisible, setSnackVisible] = useState(false);

  const mutation = useTransactionsDeleteAll();

  const handleClear = async () => {
    const [, error] = await promiseHandler(mutation.mutateAsync());

    setSnackContent(
      error
        ? 'Failed to clear transactions'
        : 'Successfully cleared transactions'
    );

    setSnackVisible(true);
    hideDialog();
  };

  return (
    <>
      {renderTrigger({ onPress: showDialog })}

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Clear Transactions</Dialog.Title>
          <Dialog.Content>
            <Text>
              This action will delete all transactions, and cannot be undone.
              Are you sure?
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
              onPress={handleClear}
              contentStyle={{ paddingHorizontal: 8 }}
              textColor={theme.colors.onError}
              buttonColor={theme.colors.error}
              mode="contained"
            >
              Clear All
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Snackbar
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
          style={{ marginBottom: 98, marginHorizontal: 16 }}
        >
          {snackContent}
        </Snackbar>
      </Portal>
    </>
  );
}

export default DialogClearTransactions;
