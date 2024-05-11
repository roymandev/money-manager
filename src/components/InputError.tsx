import { TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { capitalize } from '@/utils/formatter';

type Props = {
  message?: string;
  style?: TextStyle;
};

function InputError({ message, style }: Props) {
  const theme = useTheme();

  return message ? (
    <Text
      style={[
        theme.fonts.bodySmall,
        {
          color: theme.colors.error,
          paddingHorizontal: 16,
          paddingVertical: 4,
        },
        style,
      ]}
    >
      {capitalize(message)}
    </Text>
  ) : null;
}

export default InputError;
