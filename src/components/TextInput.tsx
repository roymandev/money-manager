import { forwardRef } from 'react';
import { TextInput as RnTextInput, View } from 'react-native';
import {
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';

import InputError from './InputError';

type Props = Omit<TextInputProps, 'error'> & {
  error?: string;
};

const TextInput = forwardRef<RnTextInput, Props>(({ error, ...rest }, ref) => (
  <View>
    <PaperTextInput ref={ref} error={!!error} {...rest} />

    <InputError message={error} />
  </View>
));

TextInput.displayName = 'TextInput';

export default TextInput;
