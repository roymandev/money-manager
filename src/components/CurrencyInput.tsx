import { forwardRef, useMemo } from 'react';
import { TextInput as RnTextInput, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

import { formatCurrency, formatStrToNumber } from '@/utils/formatter';
import { useUncontrolled } from '@mantine/hooks';

import InputError from './InputError';

type Props = Omit<
  TextInputProps,
  | 'mode'
  | 'left'
  | 'right'
  | 'keyboardType'
  | 'value'
  | 'onChangeText'
  | 'error'
> & {
  value?: number;
  onValueChange?: (value: number) => void;
  error?: string;
};

const CurrencyInput = forwardRef<RnTextInput, Props>(
  ({ value, onValueChange, error, ...rest }: Props, ref) => {
    const [_value, handleChange] = useUncontrolled({
      value,
      finalValue: 0,
      onChange: onValueChange,
    });

    const formattedValue = useMemo(() => {
      // if (isFocused) return String(_value);
      return formatCurrency(_value);
    }, [_value]);

    const handleOnChangeText = (newValue: string) => {
      const newNumber = formatStrToNumber(newValue);
      handleChange(newNumber);
    };

    return (
      <View>
        <TextInput
          {...rest}
          ref={ref}
          value={formattedValue}
          onChangeText={handleOnChangeText}
          mode="outlined"
          left={<TextInput.Affix text="Rp" />}
          right={
            _value && (
              <TextInput.Icon
                icon="close-circle-outline"
                onPress={() => handleChange(0)}
              />
            )
          }
          inputMode="decimal"
          error={!!error}
        />

        <InputError message={error} />
      </View>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
