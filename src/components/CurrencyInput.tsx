import { useMemo } from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

import { formatCurrency, formatStrToNumber } from '@/utils/formatter';
import { useUncontrolled } from '@mantine/hooks';

type Props = Omit<
  TextInputProps,
  'mode' | 'left' | 'right' | 'keyboardType' | 'value' | 'onChangeText'
> & {
  value?: number;
  onValueChange?: (value: number) => void;
};

function CurrencyInput({ value, onValueChange, ...rest }: Props) {
  const [_value, handleChange] = useUncontrolled({
    value,
    finalValue: 0,
    onChange: onValueChange,
  });

  const formattedValue = useMemo(() => {
    // if (isFocused) return String(_value);
    return formatCurrency(_value, { withSign: true });
  }, [_value]);

  const handleOnChangeText = (newValue: string) => {
    const newNumber = formatStrToNumber(newValue);
    handleChange(newNumber);
  };

  return (
    <TextInput
      {...rest}
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
    />
  );
}

export default CurrencyInput;
